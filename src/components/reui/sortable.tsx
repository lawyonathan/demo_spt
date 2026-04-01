"use client";

import * as React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

export interface SortableItem {
  id: string;
  [key: string]: unknown;
}

export interface SortableProps<T extends SortableItem> {
  items: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  orientation?: "vertical" | "horizontal";
  className?: string;
  handle?: boolean;
  variant?: "default" | "bordered" | "cards" | "compact" | "ghost";
}

function SortableItemWrapper({
  id,
  children,
  handle,
  variant,
}: {
  id: string;
  children: React.ReactNode;
  handle?: boolean;
  variant?: string;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const variantClasses = {
    default: "rounded-md border bg-background p-3",
    bordered: "rounded-md border-2 bg-background p-3",
    cards: "rounded-lg border bg-card shadow-sm p-4",
    compact: "border-b bg-background px-3 py-2 last:border-b-0",
    ghost: "rounded-md p-3",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        variantClasses[variant as keyof typeof variantClasses] || variantClasses.default,
        isDragging && "opacity-50 shadow-lg ring-2 ring-primary",
        "flex items-center gap-2"
      )}
      {...(!handle ? { ...attributes, ...listeners } : {})}
    >
      {handle && (
        <button
          className="cursor-grab touch-none active:cursor-grabbing text-muted-foreground hover:text-foreground"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>
      )}
      <div className="flex-1">{children}</div>
    </div>
  );
}

function Sortable<T extends SortableItem>({
  items,
  onReorder,
  renderItem,
  orientation = "vertical",
  className,
  handle = true,
  variant = "default",
}: SortableProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      onReorder(arrayMove(items, oldIndex, newIndex));
    }
  };

  const strategy =
    orientation === "horizontal"
      ? horizontalListSortingStrategy
      : verticalListSortingStrategy;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={strategy}>
        <div
          className={cn(
            orientation === "horizontal" ? "flex gap-2" : "space-y-2",
            className
          )}
        >
          {items.map((item, index) => (
            <SortableItemWrapper
              key={item.id}
              id={item.id}
              handle={handle}
              variant={variant}
            >
              {renderItem(item, index)}
            </SortableItemWrapper>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export { Sortable };
