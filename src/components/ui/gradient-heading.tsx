import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const gradientHeadingVariants = cva(
  "bg-clip-text text-transparent font-bold tracking-tight",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-foreground to-foreground/70",
        pink: "bg-gradient-to-r from-pink-500 via-rose-500 to-red-500",
        blue: "bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400",
        purple: "bg-gradient-to-r from-purple-600 via-violet-500 to-indigo-500",
        sunset: "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500",
        ocean: "bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600",
        forest: "bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500",
        gold: "bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500",
        rainbow: "bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500",
        mono: "bg-gradient-to-b from-foreground to-muted-foreground/60",
      },
      size: {
        xs: "text-lg md:text-xl",
        sm: "text-xl md:text-2xl",
        default: "text-2xl md:text-4xl",
        lg: "text-3xl md:text-5xl",
        xl: "text-4xl md:text-6xl",
        "2xl": "text-5xl md:text-7xl",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
        black: "font-black",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      weight: "bold",
    },
  }
);

export interface GradientHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof gradientHeadingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  animate?: boolean;
}

function GradientHeading({
  className,
  variant,
  size,
  weight,
  as: Component = "h2",
  animate = false,
  children,
  ...props
}: GradientHeadingProps) {
  return (
    <Component
      className={cn(
        gradientHeadingVariants({ variant, size, weight }),
        animate && "animate-gradient bg-[length:200%_auto]",
        className
      )}
      {...props}
    >
      {children}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </Component>
  );
}

export { GradientHeading, gradientHeadingVariants };
