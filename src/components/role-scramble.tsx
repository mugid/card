"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const WORDS = ["designer", "engineer"] as const;
const CHAR_POOL = Array.from(
  new Set(`${WORDS[0]}${WORDS[1]}`.split("")),
).join("");

function pickRandomChar() {
  return CHAR_POOL[Math.floor(Math.random() * CHAR_POOL.length)] ?? "e";
}

function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  );
}

type RoleScrambleProps = {
  className?: string;
};

export function RoleScramble({ className }: RoleScrambleProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [text, setText] = useState<string>(WORDS[0]);
  const wordIndexRef = useRef(0);
  const rafRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const runCycle = useCallback(() => {
    const target = WORDS[wordIndexRef.current];
    const len = target.length;
    const start = performance.now();
    const scrambleMs = 320;
    const staggerMs = 32;
    const locks = Array.from({ length: len }, (_, i) => {
      return start + scrambleMs + i * staggerMs + Math.random() * 40;
    });

    const tick = (now: number) => {
      let out = "";
      for (let i = 0; i < len; i++) {
        out += now >= locks[i]! ? target[i]! : pickRandomChar();
      }
      setText(out);

      if (now < locks[len - 1]! + 20) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        timeoutRef.current = setTimeout(() => {
          wordIndexRef.current = (wordIndexRef.current + 1) % WORDS.length;
          runCycle();
        }, 1700);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    runCycle();
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [reducedMotion, runCycle]);

  if (reducedMotion) {
    return (
      <p className={className}>
        designer<span className="text-foreground/35 not-italic"> & </span>
        engineer
      </p>
    );
  }

  return (
    <p className={className} aria-label="Designer and engineer">
      <span aria-hidden="true">{text}</span>
    </p>
  );
}
