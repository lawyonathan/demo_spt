"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollspySection {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

export interface ScrollspyProps {
  sections: ScrollspySection[];
  offset?: number;
  className?: string;
  variant?: "default" | "line" | "pill" | "minimal" | "dots" | "bordered";
  orientation?: "vertical" | "horizontal";
}

function Scrollspy({
  sections,
  offset = 100,
  className,
  variant = "default",
  orientation = "vertical",
}: ScrollspyProps) {
  const [activeId, setActiveId] = React.useState<string>(
    sections[0]?.id || ""
  );

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + offset;
      let current = sections[0]?.id || "";

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollY) {
          current = section.id;
        }
      }

      setActiveId(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections, offset]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - offset + 1,
        behavior: "smooth",
      });
    }
  };

  const variantStyles = {
    default: {
      nav: "space-y-1",
      item: "block rounded-md px-3 py-2 text-sm transition-colors",
      active: "bg-accent text-accent-foreground font-medium",
      inactive: "text-muted-foreground hover:text-foreground hover:bg-accent/50",
    },
    line: {
      nav: "border-l-2 border-border space-y-0",
      item: "block border-l-2 -ml-[2px] px-4 py-2 text-sm transition-colors",
      active: "border-primary text-foreground font-medium",
      inactive: "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground",
    },
    pill: {
      nav: "space-y-1",
      item: "block rounded-full px-4 py-1.5 text-sm transition-colors",
      active: "bg-primary text-primary-foreground font-medium",
      inactive: "text-muted-foreground hover:bg-accent",
    },
    minimal: {
      nav: "space-y-0.5",
      item: "block px-2 py-1 text-sm transition-colors",
      active: "text-foreground font-medium",
      inactive: "text-muted-foreground hover:text-foreground",
    },
    dots: {
      nav: "space-y-2",
      item: "flex items-center gap-2 text-sm transition-colors",
      active: "text-foreground font-medium",
      inactive: "text-muted-foreground hover:text-foreground",
    },
    bordered: {
      nav: "space-y-0 divide-y rounded-md border",
      item: "block px-4 py-2.5 text-sm transition-colors",
      active: "bg-accent text-accent-foreground font-medium",
      inactive: "text-muted-foreground hover:bg-accent/50",
    },
  };

  const style = variantStyles[variant];

  return (
    <nav
      className={cn(
        orientation === "horizontal" ? "flex gap-1" : style.nav,
        className
      )}
    >
      {sections.map((section) => {
        const isActive = activeId === section.id;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollTo(section.id)}
            className={cn(
              style.item,
              isActive ? style.active : style.inactive
            )}
          >
            {variant === "dots" && (
              <span
                className={cn(
                  "h-2 w-2 rounded-full shrink-0",
                  isActive ? "bg-primary" : "bg-border"
                )}
              />
            )}
            {section.icon}
            {section.label}
          </button>
        );
      })}
    </nav>
  );
}

export { Scrollspy };
