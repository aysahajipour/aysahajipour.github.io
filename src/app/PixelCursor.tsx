"use client";

import { useEffect, useRef } from "react";

export default function PixelCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let active = false;
    let opacity = 0;
    let targetX = -200;
    let targetY = -200;
    let x = -200;
    let y = -200;
    let color = window.localStorage.getItem("yeksel-pixel-color") || "#AD5CFF";
    let enabled = window.localStorage.getItem("yeksel-pixel-enabled") !== "off";
    const trail: { x: number; y: number; time: number }[] = [];
    const noise = (column: number, row: number) => {
      const value = Math.sin(column * 127.1 + row * 311.7) * 43758.5453;
      return value - Math.floor(value);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      x += (targetX - x) * .32;
      y += (targetY - y) * .32;
      opacity += ((active ? 1 : 0) - opacity) * .19;
      const now = performance.now();
      while (trail.length && now - trail[0].time > 340) trail.shift();
      const pitch = 13;
      const radius = 104;
      const startX = Math.floor((x - radius) / pitch) * pitch;
      const startY = Math.floor((y - radius) / pitch) * pitch;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      for (let py = startY; py <= y + radius; py += pitch) {
        for (let px = startX; px <= x + radius; px += pitch) {
          const column = Math.round(px / pitch);
          const row = Math.round(py / pitch);
          const distance = Math.hypot(px - x, py - y);
          const variation = .76 + noise(column, row) * .38;
          const closeness = Math.max(0, 1 - distance / (radius * variation));
          if (!closeness || noise(column + 17, row - 9) > .26 + closeness * .74) continue;
          const size = 1 + 8.8 * Math.pow(closeness, 1.4);
          ctx.globalAlpha = opacity * (.07 + .58 * closeness);
          ctx.shadowBlur = closeness > .68 ? 8 : 0;
          ctx.fillRect(Math.round(px - size / 2), Math.round(py - size / 2), size, size);
        }
      }
      ctx.shadowBlur = 0;
      trail.forEach((point, index) => {
        const life = 1 - (now - point.time) / 340;
        if (life <= 0) return;
        for (let pixel = 0; pixel < 3; pixel++) {
          const offsetX = (noise(index + pixel * 7, 3) - .5) * 27;
          const offsetY = (noise(index + pixel * 11, 8) - .5) * 27;
          const size = 1.2 + life * (2 + noise(index, pixel) * 2);
          ctx.globalAlpha = opacity * life * .24;
          ctx.fillRect(Math.round(point.x + offsetX), Math.round(point.y + offsetY), size, size);
        }
      });
      ctx.globalAlpha = 1;
      const moving = Math.abs(targetX - x) + Math.abs(targetY - y) > .25;
      const fading = Math.abs((active ? 1 : 0) - opacity) > .015;
      if (moving || fading || trail.length) frame = window.requestAnimationFrame(draw);
      else frame = 0;
    };
    const start = () => { if (!frame) frame = window.requestAnimationFrame(draw); };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !enabled) return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!active) { x = targetX; y = targetY; }
      const last = trail[trail.length - 1];
      if (!last || Math.hypot(targetX - last.x, targetY - last.y) > 16) {
        trail.push({ x: targetX, y: targetY, time: performance.now() });
        if (trail.length > 18) trail.shift();
      }
      active = true;
      start();
    };
    const onLeave = () => { active = false; start(); };
    const onColor = (event: Event) => {
      const next = (event as CustomEvent<string>).detail;
      if (/^#[0-9a-fA-F]{6}$/.test(next)) color = next;
      start();
    };
    const onEnabled = (event: Event) => {
      enabled = (event as CustomEvent<boolean>).detail;
      if (!enabled) {
        active = false;
        opacity = 0;
        trail.length = 0;
        window.cancelAnimationFrame(frame);
        frame = 0;
        ctx.clearRect(0, 0, width, height);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("yeksel-pixel-color", onColor);
    window.addEventListener("yeksel-pixel-enabled", onEnabled);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("yeksel-pixel-color", onColor);
      window.removeEventListener("yeksel-pixel-enabled", onEnabled);
    };
  }, []);

  return <canvas ref={canvasRef} className="pixel-cursor" aria-hidden="true" />;
}
