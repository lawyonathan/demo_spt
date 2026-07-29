"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react";

export interface TreeNode {
  id: string;
  label: string;
  icon?: React.ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
  data?: Record<string, unknown>;
}

export interface TreeProps {
  data: TreeNode[];
  onSelect?: (node: TreeNode) => void;
  selectedId?: string;
  defaultExpandedIds?: string[];
  expandAll?: boolean;
  showIcons?: boolean;
  showLines?: boolean;
  className?: string;
  checkable?: boolean;
  checkedIds?: string[];
  onCheck?: (ids: string[]) => void;
}

function Tree({
  data,
  onSelect,
  selectedId,
  defaultExpandedIds = [],
  expandAll = false,
  showIcons = true,
  showLines = false,
  className,
  checkable = false,
  checkedIds = [],
  onCheck,
}: TreeProps) {
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(
    new Set(expandAll ? getAllIds(data) : defaultExpandedIds)
  );

  function getAllIds(nodes: TreeNode[]): string[] {
    return nodes.flatMap((n) => [n.id, ...(n.children ? getAllIds(n.children) : [])]);
  }

  const toggle = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCheck = (node: TreeNode) => {
    if (!onCheck) return;
    const allDescendants = getAllIds(node.children || []);
    const isChecked = checkedIds.includes(node.id);
    if (isChecked) {
      onCheck(checkedIds.filter((id) => id !== node.id && !allDescendants.includes(id)));
    } else {
      onCheck([...new Set([...checkedIds, node.id, ...allDescendants])]);
    }
  };

  const renderNode = (node: TreeNode, depth: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedIds.has(node.id);
    const isSelected = selectedId === node.id;
    const isChecked = checkedIds.includes(node.id);

    return (
      <div key={node.id}>
        <div
          className={cn(
            "flex items-center gap-1 rounded-sm px-2 py-1 text-sm hover:bg-accent cursor-pointer select-none",
            isSelected && "bg-accent font-medium",
            node.disabled && "opacity-50 cursor-not-allowed"
          )}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (node.disabled) return;
            if (hasChildren) toggle(node.id);
            onSelect?.(node);
          }}
        >
          {hasChildren ? (
            <ChevronRight
              className={cn(
                "h-4 w-4 shrink-0 transition-transform",
                isExpanded && "rotate-90"
              )}
            />
          ) : (
            <span className="w-4" />
          )}
          {checkable && (
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => handleCheck(node)}
              onClick={(e) => e.stopPropagation()}
              className="h-4 w-4 rounded border-input"
              disabled={node.disabled}
            />
          )}
          {showIcons && (
            <span className="shrink-0">
              {node.icon ||
                (hasChildren ? (
                  isExpanded ? (
                    <FolderOpen className="h-4 w-4 text-warning" />
                  ) : (
                    <Folder className="h-4 w-4 text-warning" />
                  )
                ) : (
                  <File className="h-4 w-4 text-muted-foreground" />
                ))}
            </span>
          )}
          <span className="truncate">{node.label}</span>
        </div>
        {hasChildren && isExpanded && (
          <div className={cn(showLines && "ml-[11px] border-l border-border pl-0")}>
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn("rounded-md", className)} role="tree">
      {data.map((node) => renderNode(node))}
    </div>
  );
}

export { Tree };
