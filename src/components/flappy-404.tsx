"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type GamePhase = "idle" | "playing" | "ended";

type Pipe = {
  x: number;
  gapY: number;
  counted: boolean;
};

const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 460;
const PLAYER_X = 150;
const PLAYER_SIZE = 28;
const PIPE_WIDTH = 64;
const PIPE_GAP = 172;
const GRAVITY = 0.34;
const FLAP_FORCE = -6.4;
const PIPE_SPEED = 2.15;
const PIPE_DISTANCE = 290;
const BEST_SCORE_STORAGE_KEY = "flappy-404-best-score";

function createPipe(x: number): Pipe {
  return {
    x,
    gapY: 100 + Math.random() * (CANVAS_HEIGHT - 220),
    counted: false,
  };
}

export function Flappy404() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef(0);
  const phaseRef = useRef<GamePhase>("idle");
  const playerYRef = useRef(CANVAS_HEIGHT * 0.45);
  const velocityRef = useRef(0);
  const pipesRef = useRef<Pipe[]>([
    createPipe(CANVAS_WIDTH + 80),
    createPipe(CANVAS_WIDTH + 80 + PIPE_DISTANCE),
    createPipe(CANVAS_WIDTH + 80 + PIPE_DISTANCE * 2),
  ]);
  const scoreRef = useRef(0);
  const bestRef = useRef(0);
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  const syncPhase = useCallback((nextPhase: GamePhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }, []);

  const resetGame = useCallback(() => {
    playerYRef.current = CANVAS_HEIGHT * 0.45;
    velocityRef.current = FLAP_FORCE;
    pipesRef.current = [
      createPipe(CANVAS_WIDTH + 80),
      createPipe(CANVAS_WIDTH + 80 + PIPE_DISTANCE),
      createPipe(CANVAS_WIDTH + 80 + PIPE_DISTANCE * 2),
    ];
    scoreRef.current = 0;
    setScore(0);
    syncPhase("playing");
  }, [syncPhase]);

  const flap = useCallback(() => {
    if (phaseRef.current !== "playing") {
      resetGame();
      return;
    }

    velocityRef.current = FLAP_FORCE;
  }, [resetGame]);

  const endGame = useCallback(() => {
    if (phaseRef.current === "ended") {
      return;
    }

    const nextBest = Math.max(bestRef.current, scoreRef.current);
    if (nextBest > bestRef.current) {
      bestRef.current = nextBest;
      setBest(nextBest);
      localStorage.setItem(BEST_SCORE_STORAGE_KEY, String(nextBest));
    }
    syncPhase("ended");
  }, [syncPhase]);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.fillStyle = "#101010";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      ctx.strokeStyle = "rgba(237,237,237,0.06)";
      ctx.lineWidth = 1;
      for (let x = 0; x <= CANVAS_WIDTH; x += 36) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_HEIGHT);
        ctx.stroke();
      }
      for (let y = 0; y <= CANVAS_HEIGHT; y += 36) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(CANVAS_WIDTH, y);
        ctx.stroke();
      }

      ctx.fillStyle = "#fff3b0";
      for (const pipe of pipesRef.current) {
        const topHeight = pipe.gapY - PIPE_GAP / 2;
        const bottomY = pipe.gapY + PIPE_GAP / 2;
        ctx.fillRect(pipe.x, 0, PIPE_WIDTH, topHeight);
        ctx.fillRect(pipe.x, bottomY, PIPE_WIDTH, CANVAS_HEIGHT - bottomY);

        ctx.fillStyle = "rgba(255,243,176,0.42)";
        ctx.fillRect(pipe.x - 4, topHeight - 10, PIPE_WIDTH + 8, 10);
        ctx.fillRect(pipe.x - 4, bottomY, PIPE_WIDTH + 8, 10);
        ctx.fillStyle = "#fff3b0";
      }

      const playerY = playerYRef.current;
      const tilt = Math.max(-0.45, Math.min(0.65, velocityRef.current / 12));

      ctx.save();
      ctx.translate(PLAYER_X, playerY);
      ctx.rotate(tilt);
      ctx.fillStyle = "#ededed";
      ctx.fillRect(-PLAYER_SIZE / 2, -PLAYER_SIZE / 2, PLAYER_SIZE, PLAYER_SIZE);
      ctx.fillStyle = "#101010";
      ctx.fillRect(2, -7, 5, 5);
      ctx.fillStyle = "#fff3b0";
      ctx.fillRect(-20, -3, 14, 6);
      ctx.restore();

      ctx.fillStyle = "#ededed";
      ctx.font = "700 24px var(--font-dm-sans), sans-serif";
      ctx.fillText(String(scoreRef.current), 28, 42);

      if (phaseRef.current !== "playing") {
        ctx.fillStyle = "rgba(16,16,16,0.72)";
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        ctx.fillStyle = "#ededed";
        ctx.font = "700 54px var(--font-dm-sans), sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
          `${phaseRef.current === "idle" ? "start" : "restart"} [space]`,
          CANVAS_WIDTH / 2,
          CANVAS_HEIGHT / 2 + 8,
        );
        ctx.textAlign = "start";
      }
    },
    [],
  );

  useEffect(() => {
    const savedBest = Number(localStorage.getItem(BEST_SCORE_STORAGE_KEY));

    if (Number.isFinite(savedBest) && savedBest > 0) {
      bestRef.current = savedBest;
      setBest(savedBest);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) {
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_WIDTH * dpr;
    canvas.height = CANVAS_HEIGHT * dpr;
    ctx.scale(dpr, dpr);

    const tick = () => {
      if (phaseRef.current === "playing") {
        velocityRef.current += GRAVITY;
        playerYRef.current += velocityRef.current;

        const pipes = pipesRef.current;
        for (const pipe of pipes) {
          pipe.x -= PIPE_SPEED;

          if (!pipe.counted && pipe.x + PIPE_WIDTH < PLAYER_X) {
            pipe.counted = true;
            scoreRef.current += 1;
            setScore(scoreRef.current);
          }
        }

        const firstPipe = pipes[0];
        const lastPipe = pipes[pipes.length - 1];
        if (firstPipe && lastPipe && firstPipe.x + PIPE_WIDTH < -20) {
          pipes.shift();
          pipes.push(createPipe(lastPipe.x + PIPE_DISTANCE));
        }

        const playerTop = playerYRef.current - PLAYER_SIZE / 2;
        const playerBottom = playerYRef.current + PLAYER_SIZE / 2;
        const playerLeft = PLAYER_X - PLAYER_SIZE / 2;
        const playerRight = PLAYER_X + PLAYER_SIZE / 2;

        const hitBounds = playerTop < 0 || playerBottom > CANVAS_HEIGHT;
        const hitPipe = pipes.some((pipe) => {
          const overlapsX = playerRight > pipe.x && playerLeft < pipe.x + PIPE_WIDTH;
          const outsideGap =
            playerTop < pipe.gapY - PIPE_GAP / 2 ||
            playerBottom > pipe.gapY + PIPE_GAP / 2;

          return overlapsX && outsideGap;
        });

        if (hitBounds || hitPipe) {
          endGame();
        }
      }

      draw(ctx);
      rafRef.current = requestAnimationFrame(tick);
    };

    draw(ctx);
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [draw, endGame]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        flap();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [flap]);

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-10">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <Link
            href="/"
            className="font-mono text-xs tracking-normal text-foreground/40 transition-colors hover:text-primary"
          >
            &larr; return back
          </Link>
          <h1 className="mt-1 text-2xl font-bold text-primary">404</h1>
        </div>
        <div className="text-right font-mono text-sm leading-snug text-foreground/55">
          <div>current: {score}</div>
          <div>highest score: {best}</div>
        </div>
      </div>

      <button
        type="button"
        onClick={flap}
        className="group relative aspect-[720/460] w-full overflow-hidden border border-foreground/10 bg-[#101010] text-left outline-none transition-colors hover:border-primary/50 active:scale-[0.995]"
        aria-label={phase === "playing" ? "Flap" : "Start 404 game"}
      >
        <canvas
          ref={canvasRef}
          className="block h-full w-full"
          style={{ width: "100%", height: "100%" }}
        />
      </button>
    </main>
  );
}
