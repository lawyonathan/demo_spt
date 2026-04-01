"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type AnimationType =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "slideInLeft"
  | "slideInRight"
  | "blurIn"
  | "scaleUp"
  | "letterPull"
  | "wordPull"
  | "staggered";

export interface TextAnimateProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  type?: AnimationType;
  delay?: number;
  duration?: number;
  by?: "character" | "word" | "line";
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  staggerDelay?: number;
  once?: boolean;
}

function TextAnimate({
  text,
  type = "fadeInUp",
  delay = 0,
  duration = 0.5,
  by = "word",
  as: Component = "div",
  staggerDelay = 0.05,
  once = true,
  className,
  ...props
}: TextAnimateProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once]);

  const getSegments = (): string[] => {
    if (by === "character") return text.split("");
    if (by === "word") return text.split(" ");
    return text.split("\n");
  };

  const getAnimationStyle = (index: number): React.CSSProperties => {
    const totalDelay = delay + index * staggerDelay;

    const base: React.CSSProperties = {
      display: "inline-block",
      transition: `all ${duration}s ease`,
      transitionDelay: `${totalDelay}s`,
    };

    if (!isVisible) {
      switch (type) {
        case "fadeIn":
          return { ...base, opacity: 0 };
        case "fadeInUp":
          return { ...base, opacity: 0, transform: "translateY(20px)" };
        case "fadeInDown":
          return { ...base, opacity: 0, transform: "translateY(-20px)" };
        case "slideInLeft":
          return { ...base, opacity: 0, transform: "translateX(-20px)" };
        case "slideInRight":
          return { ...base, opacity: 0, transform: "translateX(20px)" };
        case "blurIn":
          return { ...base, opacity: 0, filter: "blur(10px)" };
        case "scaleUp":
          return { ...base, opacity: 0, transform: "scale(0.5)" };
        case "letterPull":
          return { ...base, opacity: 0, transform: "translateY(100%)" };
        case "wordPull":
          return { ...base, opacity: 0, transform: "translateY(100%) rotateX(90deg)" };
        case "staggered":
          return { ...base, opacity: 0, transform: "translateY(10px) scale(0.95)" };
        default:
          return { ...base, opacity: 0 };
      }
    }

    return {
      ...base,
      opacity: 1,
      transform: "none",
      filter: "none",
    };
  };

  const segments = getSegments();

  return (
    <Component
      ref={ref as React.Ref<HTMLDivElement> & React.Ref<HTMLHeadingElement>}
      className={cn("overflow-hidden", className)}
      {...props}
    >
      {segments.map((segment, i) => (
        <React.Fragment key={i}>
          <span style={getAnimationStyle(i)}>
            {segment}
          </span>
          {by === "word" && i < segments.length - 1 && (
            <span style={{ display: "inline-block", width: "0.25em" }}> </span>
          )}
        </React.Fragment>
      ))}
    </Component>
  );
}

export { TextAnimate };
