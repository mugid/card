"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const links = {
  github: { href: "https://github.com/mugid", label: "github", icon: "github" },
  linkedin: {
    href: "https://linkedin.com/in/sbek22",
    label: "linkedin",
    icon: "linkedin",
  },
  twitter: { href: "https://x.com/bekslambek", label: "twitter", icon: "x" },
  designPortfolio: {
    href: "https://contra.com/bek_slambek_exnck1xg",
    label: "design portfolio",
    icon: "contra",
  },
  telegram: {
    href: "https://t.me/wanderbeck",
    label: "telegram",
    icon: "telegram",
  },
} as const;

type LinkIcon = (typeof links)[keyof typeof links]["icon"];

function LinkIconMark({ icon }: { icon: LinkIcon }) {
  const className = "size-[0.9em] shrink-0";

  if (icon === "github") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2C6.48 2 2 6.59 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.22-3.37-1.22-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.63-1.38-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0 1 12 6.98c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.38-.01 2.49-.01 2.82 0 .27.18.59.69.49A10.08 10.08 0 0 0 22 12.25C22 6.59 17.52 2 12 2Z" />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M5.34 8.98H2.4v12.16h2.94V8.98ZM3.88 3.25A1.72 1.72 0 1 0 3.86 6.7a1.72 1.72 0 0 0 .02-3.45Zm17.72 10.9c0-3.26-1.74-5.44-4.57-5.44-1.6 0-2.67.86-3.16 1.69h-.04V8.98h-2.82v12.16h2.94v-6.52c0-1.72.32-3.38 2.45-3.38 2.1 0 2.13 1.96 2.13 3.49v6.41h2.94v-6.99Z" />
      </svg>
    );
  }

  if (icon === "x") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M13.68 10.62 21.25 2h-1.8l-6.57 7.48L7.64 2H1.58l7.94 11.33L1.58 22h1.8l6.94-7.55L15.86 22h6.06l-8.24-11.38Zm-2.46 2.8-.8-1.12L4.02 3.36h2.76l5.16 7.22.8 1.12 6.72 9.39h-2.76l-5.48-7.67Z" />
      </svg>
    );
  }

  if (icon === "telegram") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M21.65 4.36 18.8 17.78c-.21.95-.77 1.18-1.56.73l-4.34-3.2-2.1 2.02c-.23.23-.43.43-.88.43l.31-4.43 8.06-7.28c.35-.31-.08-.49-.54-.18L7.8 12.14l-4.28-1.34c-.93-.29-.95-.93.19-1.38L20.45 2.97c.78-.28 1.46.18 1.2 1.39Z" />
      </svg>
    );
  }

  return (
    <span className={`${className} flex items-center justify-center font-semibold leading-none`}>
      c
    </span>
  );
}

function HighlightLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: LinkIcon;
}) {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playHapticSound = useCallback(async () => {
    const AudioContextClass =
      window.AudioContext ||
      (
        window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }
      ).webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    const context = audioContextRef.current ?? new AudioContextClass();
    audioContextRef.current = context;

    if (context.state === "suspended") {
      try {
        await context.resume();
      } catch {
        return;
      }
    }

    if (context.state !== "running") {
      return;
    }

    const firstOscillator = context.createOscillator();
    const secondOscillator = context.createOscillator();
    const firstGain = context.createGain();
    const secondGain = context.createGain();
    const now = context.currentTime;

    firstOscillator.type = "sine";
    firstOscillator.frequency.setValueAtTime(260, now);
    firstOscillator.frequency.exponentialRampToValueAtTime(190, now + 0.028);

    secondOscillator.type = "triangle";
    secondOscillator.frequency.setValueAtTime(520, now + 0.012);
    secondOscillator.frequency.exponentialRampToValueAtTime(360, now + 0.04);

    firstGain.gain.setValueAtTime(0.0001, now);
    firstGain.gain.exponentialRampToValueAtTime(0.018, now + 0.004);
    firstGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);

    secondGain.gain.setValueAtTime(0.0001, now + 0.012);
    secondGain.gain.exponentialRampToValueAtTime(0.01, now + 0.016);
    secondGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.044);

    firstOscillator.connect(firstGain);
    secondOscillator.connect(secondGain);
    firstGain.connect(context.destination);
    secondGain.connect(context.destination);

    firstOscillator.start(now);
    firstOscillator.stop(now + 0.035);
    secondOscillator.start(now + 0.012);
    secondOscillator.stop(now + 0.045);
  }, []);

  return (
    <Link
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      onFocus={() => void playHapticSound()}
      onPointerDown={() => void playHapticSound()}
      onPointerEnter={() => void playHapticSound()}
      className="group inline-block h-[1.35em] overflow-hidden align-[-0.24em] font-medium text-foreground transition-colors duration-200 hover:text-primary"
    >
      <span className="flex h-[2.7em] flex-col transition-transform duration-300 ease-out group-hover:translate-y-[-1.35em]">
        {[0, 1].map((item) => (
          <span
            key={item}
            className="flex h-[1.35em] shrink-0 items-center gap-1 whitespace-nowrap leading-[1.35]"
          >
            <LinkIconMark icon={icon} />
            {label}
          </span>
        ))}
      </span>
    </Link>
  );
}

function HighlightText({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-medium text-foreground underline decoration-primary/50 underline-offset-4">
      {children}
    </span>
  );
}

function TooltipHighlight({
  children,
  tooltip,
}: {
  children: React.ReactNode;
  tooltip: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipId = useId();
  const wrapperRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <span
      ref={wrapperRef}
      className="group relative inline-block font-medium text-foreground underline decoration-primary/50 underline-offset-4"
    >
      <button
        type="button"
        aria-describedby={tooltipId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="inline cursor-help appearance-none bg-transparent p-0 font-inherit text-inherit underline decoration-primary/50 underline-offset-4"
      >
        {children}
      </button>
      <span
        id={tooltipId}
        role="tooltip"
        className={`pointer-events-none absolute left-1/2 bottom-full z-10 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md border border-foreground/15 bg-background px-2.5 py-1 font-sans text-[14px] leading-[1.35] tracking-normal text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.34)] transition-[opacity,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-1 scale-95 opacity-0"
        }`}
      >
        {tooltip}
        <span
          aria-hidden
          className="absolute left-1/2 top-full size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[1px] border-r border-b border-foreground/15 bg-background"
        />
      </span>
    </span>
  );
}

export default function About() {
  return (
    <div className="mt-6">
      <div className="font-content tracking-[-0.03em] text-left text-md leading-[1.7] space-y-4 text-foreground/60 rounded-lg">
        <p>
          I&apos;m a{" "}
          <TooltipHighlight
            tooltip={
              <>
                focused on making sure design decisions
                <br />
                meet technical implementation
              </>
            }
          >
            design engineer
          </TooltipHighlight>{" "}
          exploring what AI can unlock in real products. I study computer science at{" "}
          <TooltipHighlight tooltip="top 23% in THE WUR, 2026">
            Nazarbayev University
          </TooltipHighlight>{" "}
          and try to stay visible on <HighlightLink {...links.github} /> and{" "}
          <HighlightLink {...links.linkedin} /> for people who might want to
          work with me. I also like posting thoughts on{" "}
          <HighlightLink {...links.twitter} />.
        </p>
        <p>
          Right now, I&apos;m working with the{" "}
          <TooltipHighlight tooltip="176 users">Hireke</TooltipHighlight>{" "}
          team to rethink how hiring workflows should feel. You can explore the
          design side of my work in my{" "}
          <HighlightLink {...links.designPortfolio} />. For a quick hello,
          message me on <HighlightLink {...links.telegram} />.
        </p>
      </div>
    </div>
  );
}
