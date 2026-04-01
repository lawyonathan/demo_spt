"use client";

import * as React from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { GripVertical, Plus, MoreHorizontal } from "lucide-react";

export interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  labels?: { text: string; color: string }[];
  assignee?: { name: string; avatar?: string };
  priority?: "low" | "medium" | "high" | "urgent";
  [key: string]: unknown;
}

export interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
  color?: string;
  limit?: number;
}

export interface KanbanProps {
  columns: KanbanColumn[];
  onColumnsChange: (columns: KanbanColumn[]) => void;
  onCardClick?: (card: KanbanCard, columnId: string) => void;
  onAddCard?: (columnId: string) => void;
  renderCard?: (card: KanbanCard) => React.ReactNode;
  className?: string;
  variant?: "default" | "compact" | "minimal";
}

const priorityColors = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-info/10 text-info",
  high: "bg-warning/10 text-warning",
  urgent: "bg-destructive/10 text-destructive",
};

function SortableCard({
  card,
  columnId,
  onCardClick,
  renderCard,
  variant,
}: {
  card: KanbanCard;
  columnId: string;
  onCardClick?: (card: KanbanCard, columnId: string) => void;
  renderCard?: (card: KanbanCard) => React.ReactNode;
  variant?: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id, data: { type: "card", columnId } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (renderCard) {
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {renderCard(card)}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-lg border bg-card p-3 shadow-sm cursor-grab active:cursor-grabbing",
        isDragging && "opacity-50",
        variant === "compact" && "p-2"
      )}
      onClick={() => onCardClick?.(card, columnId)}
      {...attributes}
      {...listeners}
    >
      {card.labels && card.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {card.labels.map((label, i) => (
            <span
              key={i}
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ backgroundColor: `${label.color}20`, color: label.color }}
            >
              {label.text}
            </span>
          ))}
        </div>
      )}
      <h4 className={cn("font-medium", variant === "compact" ? "text-xs" : "text-sm")}>
        {card.title}
      </h4>
      {card.description && (
        <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
          {card.description}
        </p>
      )}
      <div className="mt-2 flex items-center justify-between">
        {card.priority && (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-medium capitalize",
              priorityColors[card.priority]
            )}
          >
            {card.priority}
          </span>
        )}
        {card.assignee && (
          <div className="flex items-center gap-1">
            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-medium">
              {card.assignee.name.charAt(0)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Kanban({
  columns,
  onColumnsChange,
  onCardClick,
  onAddCard,
  renderCard,
  className,
  variant = "default",
}: KanbanProps) {
  const [activeCard, setActiveCard] = React.useState<KanbanCard | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const findColumn = (cardId: string) => {
    return columns.find((col) => col.cards.some((c) => c.id === cardId));
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const col = findColumn(active.id as string);
    if (col) {
      const card = col.cards.find((c) => c.id === active.id);
      if (card) setActiveCard(card);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeCol = findColumn(active.id as string);
    const overCol = findColumn(over.id as string) || columns.find((c) => c.id === over.id);

    if (!activeCol || !overCol || activeCol.id === overCol.id) return;

    const newColumns = columns.map((col) => {
      if (col.id === activeCol.id) {
        return { ...col, cards: col.cards.filter((c) => c.id !== active.id) };
      }
      if (col.id === overCol.id) {
        const card = activeCol.cards.find((c) => c.id === active.id);
        if (!card) return col;
        const overIndex = col.cards.findIndex((c) => c.id === over.id);
        const newCards = [...col.cards];
        if (overIndex >= 0) {
          newCards.splice(overIndex, 0, card);
        } else {
          newCards.push(card);
        }
        return { ...col, cards: newCards };
      }
      return col;
    });
    onColumnsChange(newColumns);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCard(null);

    if (!over || active.id === over.id) return;

    const activeCol = findColumn(active.id as string);
    if (!activeCol) return;

    const oldIndex = activeCol.cards.findIndex((c) => c.id === active.id);
    const newIndex = activeCol.cards.findIndex((c) => c.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      const newCards = [...activeCol.cards];
      const [moved] = newCards.splice(oldIndex, 1);
      newCards.splice(newIndex, 0, moved);

      onColumnsChange(
        columns.map((col) =>
          col.id === activeCol.id ? { ...col, cards: newCards } : col
        )
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className={cn("flex gap-4 overflow-x-auto pb-4", className)}>
        {columns.map((column) => (
          <div
            key={column.id}
            className={cn(
              "flex w-72 shrink-0 flex-col rounded-lg bg-muted/50",
              variant === "compact" && "w-60"
            )}
          >
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2">
                {column.color && (
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: column.color }}
                  />
                )}
                <h3 className="text-sm font-semibold">{column.title}</h3>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {column.cards.length}
                  {column.limit && `/${column.limit}`}
                </span>
              </div>
              <button type="button" className="rounded p-1 hover:bg-accent">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <div className="flex-1 space-y-2 p-2 pt-0 min-h-[100px]">
              <SortableContext
                items={column.cards.map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                {column.cards.map((card) => (
                  <SortableCard
                    key={card.id}
                    card={card}
                    columnId={column.id}
                    onCardClick={onCardClick}
                    renderCard={renderCard}
                    variant={variant}
                  />
                ))}
              </SortableContext>
            </div>
            {onAddCard && (
              <button
                type="button"
                className="flex items-center gap-1 border-t p-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground rounded-b-lg"
                onClick={() => onAddCard(column.id)}
              >
                <Plus className="h-4 w-4" /> Add card
              </button>
            )}
          </div>
        ))}
      </div>
      <DragOverlay>
        {activeCard && (
          <div className="rounded-lg border bg-card p-3 shadow-lg rotate-3 opacity-90">
            <h4 className="text-sm font-medium">{activeCard.title}</h4>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

export { Kanban };
