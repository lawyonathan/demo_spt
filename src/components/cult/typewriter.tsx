"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TypewriterProps extends React.HTMLAttributes<HTMLDivElement> {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetween?: number;
  loop?: boolean;
  cursor?: boolean;
  cursorChar?: string;
  cursorClassName?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  onComplete?: () => void;
}

function Typewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 50,
  delayBetween = 1500,
  loop = true,
  cursor = true,
  cursorChar = "|",
  cursorClassName,
  as: Component = "span",
  onComplete,
  className,
  ...props
}: TypewriterProps) {
  const [displayText, setDisplayText] = React.useState("");
  const [wordIndex, setWordIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isWaiting, setIsWaiting] = React.useState(false);

  React.useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[wordIndex];

    if (isWaiting) {
      const timeout = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, delayBetween);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        const nextIndex = wordIndex + 1;
        if (nextIndex >= words.length) {
          if (loop) {
            setWordIndex(0);
          } else {
            onComplete?.();
            return;
          }
        } else {
          setWordIndex(nextIndex);
        }
        return;
      }

      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    }

    if (displayText === currentWord) {
      if (words.length === 1 && !loop) {
        onComplete?.();
        return;
      }
      setIsWaiting(true);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText(currentWord.slice(0, displayText.length + 1));
    }, typingSpeed);
    return () => clearTimeout(timeout);
  }, [displayText, wordIndex, isDeleting, isWaiting, words, typingSpeed, deletingSpeed, delayBetween, loop, onComplete]);

  return (
    <span className={cn("inline-flex", className)} {...props}>
      <Component>{displayText}</Component>
      {cursor && (
        <span
          className={cn(
            "ml-0.5 animate-blink inline-block",
            cursorClassName
          )}
        >
          {cursorChar}
          <style jsx>{`
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
            .animate-blink {
              animation: blink 1s step-end infinite;
            }
          `}</style>
        </span>
      )}
    </span>
  );
}

export { Typewriter };
