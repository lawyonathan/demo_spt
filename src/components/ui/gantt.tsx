"use client";

import * as React from "react";
import {
  addDays,
  differenceInCalendarDays,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachQuarterOfInterval,
  eachWeekOfInterval,
  eachYearOfInterval,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  isWeekend,
  max as maxDate,
  min as minDate,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { ChevronDown, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type GanttScale = "day" | "week" | "month" | "quarter" | "year";

export interface GanttTask {
  id: string;
  name: string;
  /** Date, or a plain "YYYY-MM-DD" string (interpreted in local time). */
  start: Date | string;
  end: Date | string;
  /** 0-100 */
  progress?: number;
  /** Any CSS color; tasks without one cycle through the built-in palette. */
  color?: string;
  groupId?: string;
}

export interface GanttGroup {
  id: string;
  name: string;
}

export interface GanttProps {
  tasks: GanttTask[];
  groups?: GanttGroup[];
  defaultScale?: GanttScale;
  /** Full updated task list after a bar is dragged or resized. Omit for a read-only chart. */
  onTasksChange?: (tasks: GanttTask[]) => void;
  className?: string;
}

const ROW_HEIGHT = 36;
const HEADER_ROW_HEIGHT = 28;
const MIN_SIDEBAR = 160;
const MAX_SIDEBAR = 420;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.5;

const SCALES: GanttScale[] = ["day", "week", "month", "quarter", "year"];
const PX_PER_DAY: Record<GanttScale, number> = {
  day: 36,
  week: 12,
  month: 4.5,
  quarter: 1.8,
  year: 0.75,
};

const BAR_COLORS = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b", "#ec4899", "#8b5cf6"];

/** new Date("YYYY-MM-DD") would parse as UTC and shift a day in western timezones. */
function asLocalDate(value: Date | string): Date {
  if (value instanceof Date) return value;
  const plain = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (plain) return new Date(Number(plain[1]), Number(plain[2]) - 1, Number(plain[3]));
  return new Date(value);
}

type HeaderSegment = { start: Date; end: Date; label: string };

function headerRows(
  scale: GanttScale,
  from: Date,
  to: Date
): { top: HeaderSegment[]; bottom: HeaderSegment[] } {
  const interval = { start: from, end: to };
  const clamp = (start: Date, end: Date, label: string): HeaderSegment => ({
    start: maxDate([start, from]),
    end: minDate([end, to]),
    label,
  });
  const months = (label: string) =>
    eachMonthOfInterval(interval).map((m) => clamp(m, endOfMonth(m), format(m, label)));
  const years = () =>
    eachYearOfInterval(interval).map((y) => clamp(y, endOfYear(y), format(y, "yyyy")));
  const quarters = () =>
    eachQuarterOfInterval(interval).map((q) =>
      clamp(q, endOfMonth(addDays(startOfMonth(q), 70)), format(q, "QQQ"))
    );

  switch (scale) {
    case "day":
      return {
        top: months("MMMM yyyy"),
        bottom: eachDayOfInterval(interval).map((d) => ({ start: d, end: d, label: format(d, "d") })),
      };
    case "week":
      return {
        top: months("MMM yyyy"),
        bottom: eachWeekOfInterval(interval, { weekStartsOn: 1 }).map((w) =>
          clamp(w, endOfWeek(w, { weekStartsOn: 1 }), format(w, "'W'w"))
        ),
      };
    case "month":
      return { top: years(), bottom: months("MMM") };
    case "quarter":
      return { top: years(), bottom: quarters() };
    case "year":
      return { top: years(), bottom: quarters() };
  }
}

type Row =
  | { kind: "group"; group: GanttGroup; taskCount: number }
  | { kind: "task"; task: GanttTask; color: string };

/** Gesture in progress on a bar: whole-bar move or a single-edge resize, in whole days. */
type Draft = { taskId: string; startDelta: number; endDelta: number };

function Gantt({ tasks, groups, defaultScale = "month", onTasksChange, className }: GanttProps) {
  const [scale, setScale] = React.useState<GanttScale>(defaultScale);
  const [zoom, setZoom] = React.useState(1);
  const [sidebarWidth, setSidebarWidth] = React.useState(240);
  const [collapsed, setCollapsed] = React.useState<Set<string>>(new Set());
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [draft, setDraft] = React.useState<Draft | null>(null);
  // Today marker renders after mount only, so SSR output can't disagree with the client clock.
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const pxPerDay = PX_PER_DAY[scale] * zoom;

  const { rangeStart, rangeEnd } = React.useMemo(() => {
    const starts = tasks.map((t) => asLocalDate(t.start));
    const ends = tasks.map((t) => asLocalDate(t.end));
    const first = starts.length ? minDate(starts) : new Date();
    const last = ends.length ? maxDate(ends) : addDays(new Date(), 90);
    // Snap the visible range to clean header boundaries for the current scale.
    if (scale === "day" || scale === "week") {
      return { rangeStart: startOfMonth(first), rangeEnd: endOfMonth(last) };
    }
    return { rangeStart: startOfYear(first), rangeEnd: endOfYear(last) };
  }, [tasks, scale]);

  const totalDays = differenceInCalendarDays(rangeEnd, rangeStart) + 1;
  const chartWidth = totalDays * pxPerDay;
  const x = (date: Date) => differenceInCalendarDays(date, rangeStart) * pxPerDay;
  const { top, bottom } = React.useMemo(
    () => headerRows(scale, rangeStart, rangeEnd),
    [scale, rangeStart, rangeEnd]
  );

  const rows = React.useMemo<Row[]>(() => {
    const colorFor = (index: number, task: GanttTask) =>
      task.color ?? BAR_COLORS[index % BAR_COLORS.length];
    const taskRow = (task: GanttTask): Row => ({
      kind: "task",
      task,
      color: colorFor(tasks.indexOf(task), task),
    });
    if (!groups?.length) return tasks.map(taskRow);
    const result: Row[] = [];
    for (const group of groups) {
      const groupTasks = tasks.filter((t) => t.groupId === group.id);
      result.push({ kind: "group", group, taskCount: groupTasks.length });
      if (!collapsed.has(group.id)) result.push(...groupTasks.map(taskRow));
    }
    result.push(...tasks.filter((t) => !groups.some((g) => g.id === t.groupId)).map(taskRow));
    return result;
  }, [tasks, groups, collapsed]);

  const toggleGroup = (id: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const commitDraft = React.useCallback(
    (d: Draft) => {
      if (!onTasksChange || (d.startDelta === 0 && d.endDelta === 0)) return;
      onTasksChange(
        tasks.map((t) =>
          t.id === d.taskId
            ? {
                ...t,
                start: addDays(asLocalDate(t.start), d.startDelta),
                end: addDays(asLocalDate(t.end), d.endDelta),
              }
            : t
        )
      );
    },
    [tasks, onTasksChange]
  );

  const beginBarGesture = (
    e: React.PointerEvent,
    task: GanttTask,
    mode: "move" | "resize-start" | "resize-end"
  ) => {
    if (e.button !== 0 || !onTasksChange) return;
    e.preventDefault();
    e.stopPropagation();
    setSelectedId(task.id);
    const originX = e.clientX;
    const duration = differenceInCalendarDays(asLocalDate(task.end), asLocalDate(task.start));
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    const toDraft = (deltaDays: number): Draft => {
      switch (mode) {
        case "move":
          return { taskId: task.id, startDelta: deltaDays, endDelta: deltaDays };
        case "resize-start":
          // A bar always keeps at least one day.
          return { taskId: task.id, startDelta: Math.min(deltaDays, duration), endDelta: 0 };
        case "resize-end":
          return { taskId: task.id, startDelta: 0, endDelta: Math.max(deltaDays, -duration) };
      }
    };
    let latest = toDraft(0);
    const onMove = (ev: PointerEvent) => {
      latest = toDraft(Math.round((ev.clientX - originX) / pxPerDay));
      setDraft(latest);
    };
    const onUp = () => {
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerup", onUp);
      commitDraft(latest);
      setDraft(null);
    };
    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerup", onUp);
  };

  const beginSidebarResize = (e: React.PointerEvent) => {
    e.preventDefault();
    const originX = e.clientX;
    const originWidth = sidebarWidth;
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
    const onMove = (ev: PointerEvent) =>
      setSidebarWidth(
        Math.min(MAX_SIDEBAR, Math.max(MIN_SIDEBAR, originWidth + ev.clientX - originX))
      );
    const onUp = () => {
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerup", onUp);
    };
    target.addEventListener("pointermove", onMove);
    target.addEventListener("pointerup", onUp);
  };

  const today = new Date();
  const todayVisible = mounted && today >= rangeStart && today <= rangeEnd;
  const headerHeight = HEADER_ROW_HEIGHT * 2;

  return (
    <TooltipProvider delayDuration={300}>
      <div className={cn("overflow-hidden rounded-lg border bg-card text-card-foreground", className)}>
        <div className="flex items-center justify-between gap-2 border-b px-3 py-2">
          <div className="flex items-center gap-1">
            {SCALES.map((s) => (
              <Button
                key={s}
                type="button"
                variant={s === scale ? "secondary" : "ghost"}
                size="sm"
                className="h-7 px-2.5 capitalize"
                onClick={() => setScale(s)}
              >
                {s}
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              aria-label="Zoom out"
              disabled={zoom <= MIN_ZOOM}
              onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z - 0.25))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center text-xs tabular-nums text-muted-foreground">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              aria-label="Zoom in"
              disabled={zoom >= MAX_ZOOM}
              onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + 0.25))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex">
          <div style={{ width: sidebarWidth }} className="shrink-0">
            <div
              style={{ height: headerHeight }}
              className="flex items-end border-b bg-muted/40 px-3 pb-1.5 text-xs font-medium text-muted-foreground"
            >
              Task
            </div>
            {rows.map((row) =>
              row.kind === "group" ? (
                <button
                  key={`group-${row.group.id}`}
                  type="button"
                  onClick={() => toggleGroup(row.group.id)}
                  style={{ height: ROW_HEIGHT }}
                  className="flex w-full items-center gap-1 border-b bg-muted/30 px-2 text-left text-sm font-medium hover:bg-muted/60"
                >
                  {collapsed.has(row.group.id) ? (
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  )}
                  <span className="truncate">{row.group.name}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{row.taskCount}</span>
                </button>
              ) : (
                <div
                  key={row.task.id}
                  style={{ height: ROW_HEIGHT }}
                  className={cn(
                    "flex items-center justify-between gap-2 border-b px-3 text-sm",
                    groups?.length && "pl-7",
                    selectedId === row.task.id && "bg-accent/50"
                  )}
                >
                  <span className="truncate">{row.task.name}</span>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {format(asLocalDate(row.task.start), "MMM d")}
                  </span>
                </div>
              )
            )}
          </div>

          <div
            role="separator"
            aria-orientation="vertical"
            onPointerDown={beginSidebarResize}
            className="w-1 shrink-0 cursor-col-resize border-x bg-muted/40 transition-colors hover:bg-primary/30"
            style={{ touchAction: "none" }}
          />

          <div className="min-w-0 flex-1 overflow-x-auto">
            <div style={{ width: chartWidth }} className="relative">
              <div style={{ height: headerHeight }} className="border-b bg-muted/40 text-xs text-muted-foreground">
                <div className="flex" style={{ height: HEADER_ROW_HEIGHT }}>
                  {top.map((seg) => (
                    <div
                      key={seg.start.toISOString()}
                      style={{ width: (differenceInCalendarDays(seg.end, seg.start) + 1) * pxPerDay }}
                      className="truncate border-r px-2 leading-7 font-medium"
                    >
                      {seg.label}
                    </div>
                  ))}
                </div>
                <div className="flex" style={{ height: HEADER_ROW_HEIGHT }}>
                  {bottom.map((seg) => (
                    <div
                      key={seg.start.toISOString()}
                      style={{ width: (differenceInCalendarDays(seg.end, seg.start) + 1) * pxPerDay }}
                      className="truncate border-r px-1 text-center leading-7"
                    >
                      {seg.label}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div aria-hidden className="pointer-events-none absolute inset-0">
                  {bottom.map((seg) => (
                    <div
                      key={seg.start.toISOString()}
                      style={{ left: x(seg.start) }}
                      className="absolute inset-y-0 border-l border-border/60"
                    />
                  ))}
                  {scale === "day" &&
                    bottom
                      .filter((seg) => isWeekend(seg.start))
                      .map((seg) => (
                        <div
                          key={`weekend-${seg.start.toISOString()}`}
                          style={{ left: x(seg.start), width: pxPerDay }}
                          className="absolute inset-y-0 bg-muted/40"
                        />
                      ))}
                </div>

                {rows.map((row) => {
                  if (row.kind === "group") {
                    return (
                      <div
                        key={`group-${row.group.id}`}
                        style={{ height: ROW_HEIGHT }}
                        className="border-b bg-muted/30"
                      />
                    );
                  }
                  const { task, color } = row;
                  const isDrafting = draft?.taskId === task.id;
                  const start = addDays(asLocalDate(task.start), isDrafting ? draft.startDelta : 0);
                  const end = addDays(asLocalDate(task.end), isDrafting ? draft.endDelta : 0);
                  const barWidth = (differenceInCalendarDays(end, start) + 1) * pxPerDay;
                  const progress = Math.min(100, Math.max(0, task.progress ?? 0));
                  return (
                    <div key={task.id} style={{ height: ROW_HEIGHT }} className="relative border-b">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            role="button"
                            tabIndex={0}
                            onPointerDown={(e) => beginBarGesture(e, task, "move")}
                            onClick={() => setSelectedId(task.id)}
                            style={{
                              left: x(start),
                              width: Math.max(barWidth - 2, pxPerDay - 2, 6),
                              backgroundColor: `${color}33`,
                              borderColor: color,
                              touchAction: "none",
                            }}
                            className={cn(
                              "group absolute top-1.5 bottom-1.5 overflow-hidden rounded-md border",
                              onTasksChange && "cursor-grab active:cursor-grabbing",
                              selectedId === task.id && "ring-2 ring-ring ring-offset-1 ring-offset-background"
                            )}
                          >
                            <div
                              style={{ width: `${progress}%`, backgroundColor: color }}
                              className="h-full opacity-80"
                            />
                            {barWidth > 60 && (
                              <span className="absolute inset-y-0 left-2 flex items-center text-xs font-medium text-foreground/90">
                                <span className="truncate">{task.name}</span>
                              </span>
                            )}
                            {onTasksChange && (
                              <>
                                <div
                                  onPointerDown={(e) => beginBarGesture(e, task, "resize-start")}
                                  className="absolute inset-y-0 left-0 w-1.5 cursor-ew-resize opacity-0 transition-opacity group-hover:opacity-100"
                                  style={{ backgroundColor: color }}
                                />
                                <div
                                  onPointerDown={(e) => beginBarGesture(e, task, "resize-end")}
                                  className="absolute inset-y-0 right-0 w-1.5 cursor-ew-resize opacity-0 transition-opacity group-hover:opacity-100"
                                  style={{ backgroundColor: color }}
                                />
                              </>
                            )}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="text-xs">
                          <p className="font-medium">{task.name}</p>
                          <p className="text-muted-foreground">
                            {format(start, "MMM d, yyyy")} – {format(end, "MMM d, yyyy")}
                            {task.progress != null && ` · ${progress}%`}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  );
                })}

                {todayVisible && (
                  <div
                    aria-hidden
                    style={{ left: x(today) + pxPerDay / 2 }}
                    className="pointer-events-none absolute inset-y-0 w-px bg-destructive"
                  >
                    <div className="absolute -top-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-destructive" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

export { Gantt };
