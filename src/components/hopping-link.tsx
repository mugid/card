"use client";

import { useEffect, useEffectEvent, useMemo, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";

import styles from "./hopping-link.module.css";

const SPRING = 260;
const DAMPING = 2 * 0.34 * Math.sqrt(SPRING);

function mulberry32(seed: number) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = Math.imul(value ^ (value >>> 15), 1 | value);
    result ^= result + Math.imul(result ^ (result >>> 7), 61 | result);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

type Letter = {
  char: string;
  index: number;
  mass: number;
  magic: boolean;
};

function build(label: string, playId: number) {
  const highlight = mulberry32(playId + 1);
  const mass = mulberry32(17);
  let index = 0;

  const words = label.split(" ").map((word) => {
    const letters: Letter[] = [...word].map((char) => ({
      char,
      index: index++,
      mass: 0.45 + 0.85 * mass(),
      magic: false,
    }));

    const count = Math.round(letters.length / 2);
    for (let pair = 0; pair < count; pair++) {
      const from = Math.floor((pair * letters.length) / count);
      const to = Math.floor(((pair + 1) * letters.length) / count);
      letters[from + Math.floor(highlight() * Math.max(1, to - from))].magic =
        true;
    }

    return letters;
  });

  return { words, count: index };
}

type Simulation = {
  y: Float32Array;
  v: Float32Array;
  heat: Float32Array;
  raf: number;
  last: number;
  base: string;
  reduced: boolean;
  px: number;
  py: number;
  pt: number;
};

export function HoppingLink({ label, href }: { label: string; href: string }) {
  const [playId, setPlayId] = useState(0);
  const [landed, setLanded] = useState(-1);
  const [kerns, setKerns] = useState<number[]>([]);
  const entered = landed === playId;
  const model = useMemo(() => build(label, playId), [label, playId]);

  const rootRef = useRef<HTMLAnchorElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const sim = useRef<Simulation>({
    y: new Float32Array(0),
    v: new Float32Array(0),
    heat: new Float32Array(0),
    raf: 0,
    last: 0,
    base: "",
    reduced: false,
    px: NaN,
    py: NaN,
    pt: 0,
  });

  useEffect(() => {
    const state = sim.current;
    if (state.raf) cancelAnimationFrame(state.raf);
    state.y = new Float32Array(model.count);
    state.v = new Float32Array(model.count);
    state.heat = new Float32Array(model.count);
    state.raf = 0;
    state.last = 0;
    state.base = "";
    state.px = NaN;
    state.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, [model]);

  useEffect(() => {
    const duration = 90 + (model.count - 1) * 14 + 720 + 40;
    const timer = window.setTimeout(() => setLanded(playId), duration);
    return () => window.clearTimeout(timer);
  }, [model.count, playId]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled) return;
      const computed = getComputedStyle(root);
      const size = parseFloat(computed.fontSize);
      const context = document.createElement("canvas").getContext("2d");
      if (!context || !size) return;
      context.font = `${computed.fontStyle} ${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;

      const measured = new Array<number>(model.count).fill(0);
      for (const word of model.words) {
        for (let i = 0; i < word.length - 1; i++) {
          const first = word[i].char;
          const second = word[i + 1].char;
          measured[word[i].index] =
            (context.measureText(first + second).width -
              context.measureText(first).width -
              context.measureText(second).width) /
            size;
        }
      }
      setKerns(measured);
    });

    return () => {
      cancelled = true;
    };
  }, [model]);

  const step = (now: number) => {
    const state = sim.current;
    const dt = state.last ? Math.min((now - state.last) / 1000, 1 / 30) : 1 / 60;
    state.last = now;
    const substeps = Math.max(1, Math.ceil(dt * 240));
    const h = dt / substeps;
    let moving = false;

    for (let i = 0; i < state.y.length; i++) {
      let y = state.y[i];
      let v = state.v[i];
      for (let n = 0; n < substeps; n++) {
        v += (-SPRING * y - DAMPING * v) * h;
        y += v * h;
      }
      const heat = state.heat[i] * Math.exp(-dt / 0.9);
      const element = letterRefs.current[i];

      if (Math.abs(y) < 0.05 && Math.abs(v) < 0.5 && heat < 0.01) {
        state.y[i] = 0;
        state.v[i] = 0;
        state.heat[i] = 0;
        if (element) {
          element.style.transform = "";
          element.style.color = "";
        }
        continue;
      }

      moving = true;
      state.y[i] = y;
      state.v[i] = v;
      state.heat[i] = heat;
      if (element) {
        element.style.transform = `translateY(${y.toFixed(2)}px)`;
        element.style.color = `color-mix(in oklab, black ${(heat * 100).toFixed(1)}%, ${state.base})`;
      }
    }

    state.raf = moving ? requestAnimationFrame(step) : 0;
    if (!moving) state.last = 0;
  };

  const kick = () => {
    const state = sim.current;
    if (!state.raf) state.raf = requestAnimationFrame(step);
  };

  useEffect(() => {
    const state = sim.current;
    return () => {
      if (state.raf) cancelAnimationFrame(state.raf);
    };
  }, []);

  const hop = (index: number, speed: number, size: number) => {
    const state = sim.current;
    const element = letterRefs.current[index];
    if (!element) return;
    const mass = Number(element.dataset.mass) || 1;
    const height =
      (size * Math.min(0.3, 0.035 + (speed / 4000) * 0.22)) / mass;
    state.v[index] = Math.min(
      state.v[index],
      -height * Math.sqrt(SPRING) * 1.25,
    );
    state.heat[index] = Math.max(
      state.heat[index],
      Math.min(1, 0.45 + speed / 2500),
    );
  };

  const sweep = useEffectEvent((index: number) => {
    const root = rootRef.current;
    if (!root) return;
    if (!sim.current.base) sim.current.base = getComputedStyle(root).color;
    hop(index, 1800, parseFloat(getComputedStyle(root).fontSize));
    kick();
  });

  useEffect(() => {
    if (!entered || sim.current.reduced) return;
    if (!rootRef.current?.closest("[inert]")) return;

    let timers: number[] = [];
    const wave = () => {
      timers = [];
      for (let i = 0; i < model.count; i++) {
        timers.push(window.setTimeout(() => sweep(i), i * 18));
      }
      timers.push(window.setTimeout(wave, model.count * 18 + 1000));
    };
    timers.push(window.setTimeout(wave, 300));
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [entered, model.count]);

  const onPointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    const state = sim.current;
    const root = rootRef.current;
    if (!entered || state.reduced || !root) return;
    const x = event.clientX;
    const y = event.clientY;
    const time = event.timeStamp;

    if (!Number.isNaN(state.px)) {
      const dt = Math.max((time - state.pt) / 1000, 1 / 240);
      const speed = Math.hypot(x - state.px, y - state.py) / dt;
      const size = parseFloat(getComputedStyle(root).fontSize);
      if (!state.base) state.base = getComputedStyle(root).color;
      let struck = false;

      letterRefs.current.forEach((element, index) => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const crossed =
          (state.px < center && x >= center) ||
          (state.px > center && x <= center);
        if (!crossed) return;
        if (y < rect.top - rect.height * 0.15 || y > rect.bottom + rect.height * 0.15)
          return;
        hop(index, speed, size);
        struck = true;
      });
      if (struck) kick();
    }

    state.px = x;
    state.py = y;
    state.pt = time;
  };

  return (
    <a
      ref={rootRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cuelume-select
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        sim.current.px = NaN;
      }}
      onClick={() => setPlayId((current) => current + 1)}
      className="text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ touchAction: "pan-y" }}
    >
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" key={playId}>
        {model.words.map((word, wordIndex) => (
          <span key={wordIndex}>
            {wordIndex > 0 && " "}
            <span className="whitespace-nowrap">
              {word.map((letter) => (
                <span
                  key={letter.index}
                  ref={(element) => {
                    letterRefs.current[letter.index] = element;
                  }}
                  data-mass={letter.mass}
                  className="inline-block"
                  style={{ marginRight: `${kerns[letter.index] ?? 0}em` }}
                >
                  <span
                    className={entered ? "inline-block" : styles.letter}
                    data-magic={letter.magic ? "" : undefined}
                    style={{ "--i": letter.index } as CSSProperties}
                  >
                    {letter.char}
                  </span>
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </a>
  );
}
