"use client";

import { useEffect, useRef } from "react";

/**
 * PremiumCursor
 * ─────────────
 * • Center dot   → lerp-trails with high speed (stays close to ring)
 * • Outer ring   → lerp-trails the mouse (fluid premium feel)
 * • Progress arc → SVG strokeDashoffset driven by PAGE scroll position,
 *                  NOT by mouse position. The arc fills clockwise as the
 *                  user scrolls from top (0%) to bottom (100%).
 *
 * All state changes (hover / click / scroll-progress) are applied directly
 * to DOM nodes inside the RAF loop — zero React re-renders per frame.
 *
 * Hidden on touch / coarse-pointer devices.
 * Respects prefers-reduced-motion.
 */

// ── SVG geometry constants ─────────────────────────────────────────────────
// Ring SVG viewBox is 34×34, center at 17,17. Radius chosen so the stroke
// sits inside the viewBox with a 1.5px strokeWidth.
const R_DEFAULT = 14;                        // radius in SVG user-units
const CIRC      = 2 * Math.PI * R_DEFAULT;  // full circumference ≈ 87.96

export default function PremiumCursor() {
  const dotRef      = useRef(null); // small center dot
  const ringRef     = useRef(null); // SVG wrapper (positioned by lerp)
  const progressRef = useRef(null); // <circle> progress arc inside SVG

  useEffect(() => {
    /* ── Guard: touch / coarse-pointer / mobile (< 1024px) ────────────── */
    if (typeof window === "undefined") return;

    const checkIsMobile = () =>
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      window.innerWidth < 1024;

    const dot      = dotRef.current;
    const ring     = ringRef.current;
    const progress = progressRef.current;
    if (!dot || !ring || !progress) return;

    if (checkIsMobile()) {
      dot.style.display = "none";
      ring.style.display = "none";
    }

    /* ── Reduced-motion ──────────────────────────────────────────────── */
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* ── Initialise SVG arc to empty (top of page = 0% progress) ─────── */
    progress.style.strokeDasharray  = `${CIRC}`;
    progress.style.strokeDashoffset = `${CIRC}`;

    /* ── Mutable state — no React state → no re-renders per frame ────── */
    let mouseX = -100, mouseY = -100;
    let ringX  = -100, ringY  = -100;
    let dotX   = -100, dotY   = -100;
    let rafId  = null;
    let clickTimer        = null;
    let currentHoverState = "";

    const LERP     = prefersReduced ? 1 : 0.13; // Ring lerp (slower = more lag)
    const DOT_LERP = prefersReduced ? 1 : 0.8;  // Dot lerp (faster = less lag)

    /* ── Scroll-progress helper ──────────────────────────────────────── */
    const getScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      return Math.min(1, Math.max(0, scrollTop / maxScroll));
    };

    /* ── RAF loop: cursor movement + scroll progress in one pass ─────── */
    const tick = () => {
      // 1. Lerp ring towards mouse (slower, more trailing)
      ringX += (mouseX - ringX) * LERP;
      ringY += (mouseY - ringY) * LERP;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

      // 2. Lerp dot towards mouse (faster, stays closer to ring)
      dotX += (mouseX - dotX) * DOT_LERP;
      dotY += (mouseY - dotY) * DOT_LERP;
      dot.style.transform = `translate(${dotX}px, ${dotY}px)`;

      // 3. Update progress arc (reading scrollY every frame is cheap)
      const p = getScrollProgress();
      progress.style.strokeDashoffset = `${CIRC * (1 - p)}`;

      rafId = requestAnimationFrame(tick);
    };
    tick();

    /* ── Mouse move ──────────────────────────────────────────────────── */
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Note: No direct positioning here - both dot and ring use lerp in tick()
    };

    /* ── Hover state resolution ──────────────────────────────────────── */
    const resolveState = (target) => {
      if (!target) return "";
      if (target.closest("a, button, [role='button'], label, select, .kips-card, [data-cursor='link']")) return "link";
      if (target.closest("img, figure, video, [data-cursor='image']"))  return "image";
      return "";
    };

    const onMouseOver = (e) => {
      const state = resolveState(e.target);
      if (state === currentHoverState) return;
      currentHoverState  = state;
      ring.dataset.state = state;
      dot.dataset.state  = state;
    };

    /* ── Click ───────────────────────────────────────────────────────── */
    const onMouseDown = () => {
      clearTimeout(clickTimer);
      ring.dataset.clicking = "true";
      dot.dataset.clicking  = "true";
      clickTimer = setTimeout(() => {
        delete ring.dataset.clicking;
        delete dot.dataset.clicking;
      }, 280);
    };

    /* ── Viewport leave / enter ──────────────────────────────────────── */
    const onDocLeave = () => {
      dot.style.opacity  = "0";
      ring.style.opacity = "0";
    };
    const onDocEnter = () => {
      dot.style.opacity  = "1";
      ring.style.opacity = "1";
    };

    const onResize = () => {
      if (checkIsMobile()) {
        dot.style.display = "none";
        ring.style.display = "none";
      } else {
        dot.style.display = "";
        ring.style.display = "";
      }
    };

    /* ── Attach listeners ────────────────────────────────────────────── */
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("resize", onResize, { passive: true });
    document.documentElement.addEventListener("mouseleave", onDocLeave);
    document.documentElement.addEventListener("mouseenter", onDocEnter);

    /* ── Cleanup ─────────────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(clickTimer);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseover",  onMouseOver);
      window.removeEventListener("mousedown",  onMouseDown);
      window.removeEventListener("resize",     onResize);
      document.documentElement.removeEventListener("mouseleave", onDocLeave);
      document.documentElement.removeEventListener("mouseenter", onDocEnter);
    };
  }, []);

  return (
    <>
      {/* ── Center dot: lerp-trails with high speed (stays close to ring) ── */}
      <div ref={dotRef} className="kips-cursor-dot" aria-hidden="true" />

      {/*
        ── SVG ring: lerp-trails + scroll-progress arc ──────────────
        34×34 matches the default ring size. JS sets transform: translate()
        on the SVG element itself. margin-top/left of -17px centres it.
      */}
      <svg
        ref={ringRef}
        className="kips-cursor-ring"
        width="34"
        height="34"
        viewBox="0 0 34 34"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Always-visible faint track (the circular outline) */}
        <circle
          className="kips-cursor-track"
          cx="17"
          cy="17"
          r={R_DEFAULT}
          fill="none"
          strokeWidth="1.5"
        />
        {/*
          Progress arc — strokeDashoffset drives fill amount.
          rotate(-90) starts the arc at 12-o'clock (top).
          JS updates strokeDashoffset every frame.
        */}
        <circle
          ref={progressRef}
          className="kips-cursor-progress"
          cx="17"
          cy="17"
          r={R_DEFAULT}
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform="rotate(-90 17 17)"
        />
      </svg>
    </>
  );
}