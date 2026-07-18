"use client";

import { useEffect, useRef } from "react";

/**
 * Cinematic "creation in progress" canvas animation.
 * Renders: terminal typing, code blocks materializing, build logs,
 * deploy progress, UI components emerging.
 * GPU-light, loop-perfect, no MP4 needed.
 * Disabled if prefers-reduced-motion.
 */
export function CreationCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // ── Scenes content ────────────────────────────────────────────────
    const codeBlocks = [
      // Scene 0: Terminal — npm create
      {
        kind: "terminal" as const,
        lines: [
          { t: "$ ", c: "muted", body: "pnpm create next-app jupafi-app", c2: "fg" },
          { t: "", c: "muted", body: "✓ Creating a new Next.js app in jupafi-app", c2: "ok" },
          { t: "", c: "muted", body: "✓ Installing dependencies...", c2: "ok" },
          { t: "", c: "muted", body: "✓ Initialized git repository", c2: "ok" },
          { t: "$ ", c: "muted", body: "cd jupafi-app && code .", c2: "fg" },
        ],
      },
      // Scene 1: Code editor — TSX
      {
        kind: "code" as const,
        title: "app/page.tsx",
        lines: [
          { s: "kw", t: "import" }, { s: "fg", t: " { " }, { s: "var", t: "motion" }, { s: "fg", t: " } " }, { s: "kw", t: "from" }, { s: "str", t: " 'motion/react'" }, { s: "fg", t: ";" },
          { s: "kw", t: "\nexport default function" }, { s: "fn", t: " Hero" }, { s: "fg", t: "() {" },
          { s: "kw", t: "\n  return" }, { s: "fg", t: " (" },
          { s: "tag", t: "\n    <motion.h1" }, { s: "attr", t: "\n      initial" }, { s: "fg", t: "={{ " }, { s: "prop", t: "opacity" }, { s: "fg", t: ": " }, { s: "num", t: "0" }, { s: "fg", t: ", " }, { s: "prop", t: "y" }, { s: "fg", t: ": " }, { s: "num", t: "20" }, { s: "fg", t: " }}" },
          { s: "attr", t: "\n      animate" }, { s: "fg", t: "={{ " }, { s: "prop", t: "opacity" }, { s: "fg", t: ": " }, { s: "num", t: "1" }, { s: "fg", t: ", " }, { s: "prop", t: "y" }, { s: "fg", t: ": " }, { s: "num", t: "0" }, { s: "fg", t: " }}" },
          { s: "tag", t: "\n    >" },
          { s: "fg", t: "\n      Productos que escalan" },
          { s: "tag", t: "\n    </motion.h1>" },
          { s: "fg", t: "\n  );\n}" },
        ],
      },
      // Scene 2: Build log
      {
        kind: "build" as const,
        lines: [
          { t: "▲", c: "accent", body: " Next.js 14.2.18", c2: "fg" },
          { t: "", c: "muted", body: "  Creating an optimized production build...", c2: "muted" },
          { t: "✓", c: "ok", body: " Compiled successfully", c2: "fg" },
          { t: "✓", c: "ok", body: " Linting and checking validity of types", c2: "fg" },
          { t: "✓", c: "ok", body: " Generating static pages (4/4)", c2: "fg" },
          { t: "", c: "muted", body: "  Route (app)        Size     First Load JS", c2: "muted" },
          { t: "○", c: "muted", body: " /                 76.5 kB  164 kB", c2: "fg" },
          { t: "", c: "ok", body: " ✓ Build completed in 18s", c2: "fg" },
        ],
      },
      // Scene 3: Deploy
      {
        kind: "deploy" as const,
        lines: [
          { t: "$ ", c: "muted", body: "vercel --prod", c2: "fg" },
          { t: "", c: "muted", body: "🔗  Linked to fierrojuanpablorenovado/jupafi-app", c2: "fg" },
          { t: "", c: "muted", body: "🔍  Inspect: vercel.com/.../deployments", c2: "fg" },
          { t: "", c: "ok", body: "✓  Building...", c2: "fg" },
          { t: "", c: "ok", body: "✓  Production: https://jupaficonsultores.com", c2: "accent" },
          { t: "", c: "ok", body: "🚀  Live in 23s", c2: "accent" },
        ],
      },
    ];

    type Theme = {
      bg: string;
      panel: string;
      panelBorder: string;
      mac: { red: string; yellow: string; green: string };
      fg: string;
      muted: string;
      accent: string;
      ok: string;
      kw: string;
      str: string;
      tag: string;
      attr: string;
      prop: string;
      num: string;
      fn: string;
      var: string;
    };

    const theme: Theme = {
      bg: "rgba(9, 9, 11, 0)",
      panel: "rgba(24, 24, 27, 0.85)",
      panelBorder: "rgba(63, 63, 70, 0.6)",
      mac: { red: "#ff5f57", yellow: "#febc2e", green: "#28c840" },
      fg: "#e4e4e7",
      muted: "#71717a",
      accent: "#c8ff00",
      ok: "#86efac",
      kw: "#c084fc",
      str: "#fde68a",
      tag: "#7dd3fc",
      attr: "#fca5a5",
      prop: "#a5f3fc",
      num: "#fdba74",
      fn: "#fcd34d",
      var: "#e4e4e7",
    };

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };

    const SCENE_MS = 4200;
    const FADE_MS = 700;
    let start = performance.now();
    let rafId = 0;

    const drawPanel = (
      x: number,
      y: number,
      w: number,
      h: number,
      title: string
    ) => {
      // Shadow
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.shadowColor = "rgba(0,0,0,0.7)";
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 20;
      // Panel
      ctx.fillStyle = theme.panel;
      roundRect(ctx, x, y, w, h, 14);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      // Border
      ctx.strokeStyle = theme.panelBorder;
      ctx.lineWidth = 1;
      roundRect(ctx, x, y, w, h, 14);
      ctx.stroke();
      // Header bar
      ctx.fillStyle = "rgba(39,39,42,0.9)";
      roundRect(ctx, x, y, w, 34, 14, 14, 0, 0);
      ctx.fill();
      // Mac dots
      [theme.mac.red, theme.mac.yellow, theme.mac.green].forEach((c, i) => {
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.arc(x + 18 + i * 16, y + 17, 5.5, 0, Math.PI * 2);
        ctx.fill();
      });
      // Title
      ctx.fillStyle = theme.muted;
      ctx.font = "11px ui-monospace, Menlo, monospace";
      ctx.textAlign = "center";
      ctx.fillText(title, x + w / 2, y + 21);
      ctx.textAlign = "left";
    };

    const renderTerminal = (
      lines: { t: string; c: string; body: string; c2: string }[],
      progress: number,
      x: number,
      y: number,
      w: number,
      h: number,
      title: string
    ) => {
      drawPanel(x, y, w, h, title);
      ctx.font = "13px ui-monospace, Menlo, monospace";
      const lineHeight = 22;
      let cy = y + 60;
      const totalChars = lines.reduce((s, l) => s + l.t.length + l.body.length, 0);
      let charsToShow = Math.floor(progress * totalChars * 1.1);
      for (const line of lines) {
        if (charsToShow <= 0) break;
        const showPrompt = Math.min(line.t.length, charsToShow);
        ctx.fillStyle = colorFor(line.c, theme);
        ctx.fillText(line.t.slice(0, showPrompt), x + 24, cy);
        charsToShow -= showPrompt;
        if (charsToShow > 0) {
          const showBody = Math.min(line.body.length, charsToShow);
          ctx.fillStyle = colorFor(line.c2, theme);
          ctx.fillText(line.body.slice(0, showBody), x + 24 + line.t.length * 7.8, cy);
          charsToShow -= showBody;
        }
        cy += lineHeight;
      }
      // Blinking cursor on last visible line
      const time = performance.now();
      if (Math.floor(time / 500) % 2 === 0 && progress < 1.0) {
        ctx.fillStyle = theme.accent;
        ctx.fillRect(x + 24 + ((charsToShow < 0 ? 0 : 0)), cy - 12, 8, 14);
      }
    };

    const renderCode = (
      title: string,
      tokens: { s: string; t: string }[],
      progress: number,
      x: number,
      y: number,
      w: number,
      h: number
    ) => {
      drawPanel(x, y, w, h, title);
      ctx.font = "13px ui-monospace, Menlo, monospace";
      const totalChars = tokens.reduce((s, t) => s + t.t.length, 0);
      let charsToShow = Math.floor(progress * totalChars * 1.1);
      const startX = x + 28;
      let cx = startX;
      let cy = y + 60;
      const lineHeight = 22;

      for (const tok of tokens) {
        if (charsToShow <= 0) break;
        const seg = tok.t.slice(0, charsToShow);
        ctx.fillStyle = colorFor(tok.s, theme);
        for (const ch of seg) {
          if (ch === "\n") {
            cx = startX;
            cy += lineHeight;
          } else {
            ctx.fillText(ch, cx, cy);
            cx += 7.8;
          }
        }
        charsToShow -= tok.t.length;
      }
      // Cursor
      if (Math.floor(performance.now() / 500) % 2 === 0 && progress < 1.0) {
        ctx.fillStyle = theme.accent;
        ctx.fillRect(cx, cy - 12, 8, 14);
      }
    };

    const renderBuild = (
      lines: { t: string; c: string; body: string; c2: string }[],
      progress: number,
      x: number,
      y: number,
      w: number,
      h: number
    ) => {
      drawPanel(x, y, w, h, "build · pnpm");
      ctx.font = "13px ui-monospace, Menlo, monospace";
      const lineHeight = 24;
      let cy = y + 60;
      const totalLines = lines.length;
      const linesToShow = Math.floor(progress * totalLines * 1.1);
      for (let i = 0; i < Math.min(linesToShow, lines.length); i++) {
        const line = lines[i];
        ctx.fillStyle = colorFor(line.c, theme);
        ctx.font = "bold 13px ui-monospace, Menlo, monospace";
        ctx.fillText(line.t, x + 24, cy);
        ctx.font = "13px ui-monospace, Menlo, monospace";
        ctx.fillStyle = colorFor(line.c2, theme);
        ctx.fillText(line.body, x + 24 + (line.t.length > 0 ? line.t.length * 8 + 4 : 0), cy);
        cy += lineHeight;
      }
      // Progress bar at bottom
      const barY = y + h - 30;
      ctx.fillStyle = "rgba(63,63,70,0.6)";
      roundRect(ctx, x + 24, barY, w - 48, 4, 2);
      ctx.fill();
      ctx.fillStyle = theme.accent;
      const barProgress = Math.min(progress * 1.1, 1);
      roundRect(ctx, x + 24, barY, (w - 48) * barProgress, 4, 2);
      ctx.fill();
    };

    const renderDeploy = (
      lines: { t: string; c: string; body: string; c2: string }[],
      progress: number,
      x: number,
      y: number,
      w: number,
      h: number
    ) => {
      drawPanel(x, y, w, h, "deploy · vercel");
      ctx.font = "13px ui-monospace, Menlo, monospace";
      const lineHeight = 26;
      let cy = y + 60;
      const linesToShow = Math.floor(progress * lines.length * 1.1);
      for (let i = 0; i < Math.min(linesToShow, lines.length); i++) {
        const line = lines[i];
        ctx.fillStyle = colorFor(line.c, theme);
        ctx.fillText(line.t, x + 24, cy);
        ctx.fillStyle = colorFor(line.c2, theme);
        ctx.fillText(line.body, x + 24 + 18, cy);
        cy += lineHeight;
      }
      // "Ready" pulsing dot for last line
      if (progress > 0.85) {
        const time = performance.now();
        const pulse = Math.sin(time / 200) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(200, 255, 0, ${0.5 + pulse * 0.5})`;
        ctx.beginPath();
        ctx.arc(x + w - 40, y + h - 26, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawScene = (sceneIdx: number, progress: number, alpha: number) => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const panelW = Math.min(w * 0.62, 760);
      const panelH = Math.min(h * 0.58, 380);
      const px = (w - panelW) / 2;
      const py = (h - panelH) / 2;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.scale(dpr, dpr);

      const scene = codeBlocks[sceneIdx];
      if (scene.kind === "terminal") {
        renderTerminal(scene.lines, progress, px, py, panelW, panelH, "zsh · jupafi-app");
      } else if (scene.kind === "code") {
        renderCode(scene.title, scene.lines, progress, px, py, panelW, panelH);
      } else if (scene.kind === "build") {
        renderBuild(scene.lines, progress, px, py, panelW, panelH);
      } else if (scene.kind === "deploy") {
        renderDeploy(scene.lines, progress, px, py, panelW, panelH);
      }
      ctx.restore();
    };

    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const elapsed = performance.now() - start;
      const totalDuration = codeBlocks.length * SCENE_MS;
      const cycleTime = elapsed % totalDuration;
      const sceneIdx = Math.floor(cycleTime / SCENE_MS);
      const sceneTime = cycleTime - sceneIdx * SCENE_MS;
      const progress = Math.min(sceneTime / (SCENE_MS - FADE_MS), 1);

      // Cross-fade
      const fadeInProgress = Math.min(sceneTime / FADE_MS, 1);
      const fadeOutStart = SCENE_MS - FADE_MS;
      const fadeOut = sceneTime > fadeOutStart ? 1 - (sceneTime - fadeOutStart) / FADE_MS : 1;
      const alpha = fadeInProgress * fadeOut;

      drawScene(sceneIdx, progress, alpha);

      // Draw next scene fading in during last FADE_MS
      if (sceneTime > fadeOutStart) {
        const nextIdx = (sceneIdx + 1) % codeBlocks.length;
        const nextAlpha = (sceneTime - fadeOutStart) / FADE_MS;
        drawScene(nextIdx, 0.02, nextAlpha);
      }

      rafId = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      aria-hidden="true"
    />
  );
}

// Helpers
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  rTL: number,
  rTR?: number,
  rBR?: number,
  rBL?: number
) {
  const r1 = rTL;
  const r2 = rTR ?? rTL;
  const r3 = rBR ?? rTL;
  const r4 = rBL ?? rTL;
  ctx.beginPath();
  ctx.moveTo(x + r1, y);
  ctx.lineTo(x + w - r2, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r2);
  ctx.lineTo(x + w, y + h - r3);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r3, y + h);
  ctx.lineTo(x + r4, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r4);
  ctx.lineTo(x, y + r1);
  ctx.quadraticCurveTo(x, y, x + r1, y);
  ctx.closePath();
}

function colorFor(key: string, theme: Record<string, unknown>): string {
  const palette = theme as Record<string, string>;
  return palette[key] || palette.fg || "#e4e4e7";
}
