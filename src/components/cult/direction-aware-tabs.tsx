"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface DirectionAwareTab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface DirectionAwareTabsProps {
  tabs: DirectionAwareTab[];
  defaultTab?: string;
  onChange?: (id: string) => void;
  className?: string;
  variant?: "default" | "pill" | "underline" | "enclosed";
}

function DirectionAwareTabs({
  tabs,
  defaultTab,
  onChange,
  className,
  variant = "default",
}: DirectionAwareTabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab || tabs[0]?.id || "");
  const [direction, setDirection] = React.useState<"left" | "right">("right");
  const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({});
  const tabRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());

  const updateIndicator = React.useCallback((tabId: string) => {
    const tabEl = tabRefs.current.get(tabId);
    if (tabEl) {
      setIndicatorStyle({
        left: tabEl.offsetLeft,
        width: tabEl.offsetWidth,
      });
    }
  }, []);

  React.useEffect(() => {
    updateIndicator(activeTab);
  }, [activeTab, updateIndicator]);

  React.useEffect(() => {
    const handleResize = () => updateIndicator(activeTab);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab, updateIndicator]);

  const handleTabClick = (id: string) => {
    const currentIdx = tabs.findIndex((t) => t.id === activeTab);
    const newIdx = tabs.findIndex((t) => t.id === id);
    setDirection(newIdx > currentIdx ? "right" : "left");
    setActiveTab(id);
    onChange?.(id);
  };

  const variantStyles = {
    default: {
      list: "relative bg-muted rounded-lg p-1",
      indicator: "absolute top-1 h-[calc(100%-8px)] rounded-md bg-background shadow transition-all duration-300 ease-out",
      tab: "relative z-10 px-3 py-1.5 text-sm font-medium transition-colors",
      active: "text-foreground",
      inactive: "text-muted-foreground hover:text-foreground",
    },
    pill: {
      list: "relative flex gap-1",
      indicator: "absolute top-0 h-full rounded-full bg-primary transition-all duration-300 ease-out",
      tab: "relative z-10 px-4 py-1.5 text-sm font-medium rounded-full transition-colors",
      active: "text-primary-foreground",
      inactive: "text-muted-foreground hover:text-foreground",
    },
    underline: {
      list: "relative border-b",
      indicator: "absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-out",
      tab: "relative z-10 px-4 py-2 text-sm font-medium transition-colors -mb-px",
      active: "text-foreground",
      inactive: "text-muted-foreground hover:text-foreground",
    },
    enclosed: {
      list: "relative bg-muted/50 rounded-t-lg",
      indicator: "absolute top-0 h-full rounded-t-lg bg-background border border-b-0 border-border transition-all duration-300 ease-out",
      tab: "relative z-10 px-4 py-2 text-sm font-medium transition-colors",
      active: "text-foreground",
      inactive: "text-muted-foreground hover:text-foreground",
    },
  };

  const style = variantStyles[variant];
  const activeContent = tabs.find((t) => t.id === activeTab);

  return (
    <div className={cn("w-full", className)}>
      <div className={cn("inline-flex items-center", style.list)}>
        <div className={style.indicator} style={indicatorStyle} />
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el);
            }}
            type="button"
            disabled={tab.disabled}
            className={cn(
              style.tab,
              tab.id === activeTab ? style.active : style.inactive,
              tab.disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => handleTabClick(tab.id)}
          >
            <span className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-4 overflow-hidden">
        <div
          key={activeTab}
          className={cn(
            "transition-all duration-300 ease-out",
            direction === "right"
              ? "animate-slideInRight"
              : "animate-slideInLeft"
          )}
        >
          {activeContent?.content}
        </div>
        <style jsx>{`
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-slideInRight { animation: slideInRight 0.3s ease-out; }
          .animate-slideInLeft { animation: slideInLeft 0.3s ease-out; }
        `}</style>
      </div>
    </div>
  );
}

export { DirectionAwareTabs };
