"use client";

import { useEffect, useRef } from "react";

interface FlameCanvasProps {
  className?: string;
  intensity?: number; // 0-1
}

/**
 * Canvas de partículas de fuego lime/verde — decorativo, no bloquea interacción.
 * Pausa automáticamente cuando el elemento sale del viewport.
 */
export function FlameCanvas({ className = "", intensity = 0.7 }: FlameCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let animId: number | null = null;
    const particles: Particle[] = [];

    function resize() {
      W = canvas!.width = Math.max(canvas!.offsetWidth, window.innerWidth || 1200);
      H = canvas!.height = Math.max(canvas!.offsetHeight, window.innerHeight || 800);
    }
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Flame particle — lime/green palette
    class Particle {
      x = 0; y = 0; vx = 0; vy = 0;
      life = 0; maxLife = 0; r = 0; hue = 0;

      constructor() { this.reset(true); }

      reset(stagger = false) {
        const count = intensity;
        this.x = W * 0.1 + Math.random() * W * 0.8;
        this.y = H + Math.random() * 80;
        this.vx = (Math.random() - 0.5) * 1.6;
        this.vy = -(1.2 + Math.random() * 3.2) * count;
        this.life = stagger ? Math.random() * 100 : 0;
        this.maxLife = 90 + Math.random() * 130;
        this.r = 2 + Math.random() * 12;
        // lime-green-yellow range: hue 60-110
        this.hue = 62 + Math.random() * 48;
      }

      update() {
        this.life++;
        this.x += this.vx + Math.sin(this.life * 0.05) * 0.8;
        this.y += this.vy;
        this.vy *= 0.993;
        this.r *= 0.994;
        if (this.life >= this.maxLife || this.r < 0.4) this.reset();
      }

      draw(ctx: CanvasRenderingContext2D) {
        const alpha = (1 - this.life / this.maxLife) * 0.75;
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        grad.addColorStop(0, `hsla(${this.hue + 20}, 100%, 92%, ${alpha})`);
        grad.addColorStop(0.3, `hsla(${this.hue}, 100%, 70%, ${alpha * 0.9})`);
        grad.addColorStop(0.7, `hsla(${this.hue - 15}, 95%, 38%, ${alpha * 0.55})`);
        grad.addColorStop(1, `hsla(${this.hue - 30}, 80%, 15%, 0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
    }

    // Ember sparks
    class Ember {
      x = 0; y = 0; vx = 0; vy = 0; life = 0; maxLife = 0; r = 0;

      constructor() { this.reset(true); }

      reset(stagger = false) {
        this.x = W * 0.15 + Math.random() * W * 0.7;
        this.y = H * 0.5 + Math.random() * H * 0.4;
        this.vx = (Math.random() - 0.5) * 2.5;
        this.vy = -(2.5 + Math.random() * 5);
        this.life = stagger ? Math.random() * 50 : 0;
        this.maxLife = 35 + Math.random() * 55;
        this.r = 0.8 + Math.random() * 2;
      }

      update() {
        this.life++;
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05;
        if (this.life >= this.maxLife) this.reset();
      }

      draw(ctx: CanvasRenderingContext2D) {
        const alpha = 1 - this.life / this.maxLife;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 255, 0, ${alpha * 0.9})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#c8ff00";
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Ember is duck-typed as Particle for the pool — cast is safe
    type PoolItem = { update(): void; draw(c: CanvasRenderingContext2D): void };
    const pool: PoolItem[] = [];
    const n = Math.round(60 * intensity);
    const e = Math.round(25 * intensity);
    for (let i = 0; i < n; i++) pool.push(new Particle());
    for (let i = 0; i < e; i++) pool.push(new Ember());

    function loop() {
      ctx!.clearRect(0, 0, W, H);
      for (const p of pool) {
        p.update();
        p.draw(ctx!);
      }
      animId = requestAnimationFrame(loop);
    }
    loop();

    // Pause when out of viewport
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          if (!animId) loop();
        } else {
          if (animId) { cancelAnimationFrame(animId); animId = null; }
        }
      }, { threshold: 0.01 });
      io.observe(canvas);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (animId) cancelAnimationFrame(animId);
      io?.disconnect();
    };
  }, [intensity]);

  return (
    <canvas
      ref={ref}
      className={`absolute inset-0 w-full h-full pointer-events-none mix-blend-screen ${className}`}
      style={{ opacity: 0.55 }}
      aria-hidden="true"
    />
  );
}
