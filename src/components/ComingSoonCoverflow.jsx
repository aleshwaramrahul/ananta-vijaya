import React, { useState, useEffect, useCallback, useRef } from "react";

const PERSPECTIVE = 1400;
const SCALE_STEP = 0.14;
const MAX_VISIBLE = 2;
const DEPTH = 200;

function cssTransition(t) {
  const dur = t && typeof t.duration === "number" ? t.duration : 0.6;
  let ease = "cubic-bezier(0.22, 1, 0.36, 1)";
  const e = t?.ease;
  if (Array.isArray(e) && e.length === 4) {
    ease = `cubic-bezier(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`;
  }
  return { dur, ease };
}

export default function ComingSoonCoverflow({
  items = [],
  autoplay = true,
  autoplayDelay = 3.5,
  autoplayDirection = "rightToLeft",
  tilt = 12,
  sideTilt = 5,
  gap = 7,
  opacity = 75,
  transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1000);
  const containerRef = useRef(null);

  // Responsive card size based on container width
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const cardWidth = Math.min(320, Math.max(260, containerWidth * 0.72));
  const cardHeight = Math.min(390, Math.max(340, cardWidth * 1.25));

  // Lock to avoid jitter when clicking rapidly
  const moveDur = transition?.duration || 0.6;
  const lockRef = useRef(false);
  const lock = useCallback(() => {
    lockRef.current = true;
    window.setTimeout(() => {
      lockRef.current = false;
    }, Math.max(50, moveDur * 1000));
  }, [moveDur]);

  const step = useCallback(
    (dir) => {
      if (lockRef.current || n <= 1) return;
      lock();
      setActive((a) => (((a + dir) % n) + n) % n);
    },
    [n, lock]
  );

  const handleCardClick = useCallback(
    (i) => {
      if (lockRef.current) return;
      lock();
      setActive(i);
    },
    [lock]
  );

  // Autoplay
  useEffect(() => {
    if (!autoplay || n < 2) return;
    const ms = Math.max(1, autoplayDelay) * 1000;
    const dir = autoplayDirection === "leftToRight" ? -1 : 1;
    const timer = window.setInterval(() => step(dir), ms);
    return () => window.clearInterval(timer);
  }, [autoplay, autoplayDelay, autoplayDirection, n, step]);

  // Keyboard navigation
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    },
    [step]
  );

  // Touch swipe support
  const touchStartX = useRef(null);
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 40) {
      step(deltaX > 0 ? -1 : 1);
    }
    touchStartX.current = null;
  };

  const { dur, ease } = cssTransition(transition);
  const transitionCss = `transform ${dur}s ${ease}, opacity ${dur}s ${ease}, box-shadow ${dur}s ${ease}`;

  return (
    <div className="w-full flex flex-col items-center select-none" ref={containerRef}>
      {/* 3D Stage */}
      <div
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label="Future Offerings Coverflow"
        onKeyDown={onKeyDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="relative w-full overflow-hidden flex items-center justify-center outline-none py-6"
        style={{
          perspective: `${PERSPECTIVE}px`,
          minHeight: cardHeight + 40,
        }}
      >
        <div
          style={{
            position: "relative",
            width: cardWidth,
            height: cardHeight,
            transformStyle: "preserve-3d",
          }}
        >
          {items.map((item, i) => {
            let rel = i - active;
            if (rel > n / 2) rel -= n;
            if (rel < -n / 2) rel += n;

            const ax = Math.abs(rel);
            const visible = ax <= MAX_VISIBLE;
            const isActive = rel === 0;
            const sc = Math.max(0.65, 1 - ax * SCALE_STEP);

            // Responsive horizontal spacing
            const gapSpacing = Math.min(gap * 28, cardWidth * 0.58);
            const tx = rel * gapSpacing;
            const tz = -ax * DEPTH;
            const ry = -rel * tilt;
            const rz = rel * sideTilt;

            return (
              <div
                key={i}
                onClick={() => handleCardClick(i)}
                aria-hidden={!visible}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: cardWidth,
                  height: cardHeight,
                  borderRadius: "20px",
                  overflow: "hidden",
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                  transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
                  transition: transitionCss,
                  opacity: visible ? (isActive ? 1 : opacity / 100) : 0,
                  cursor: isActive ? "default" : "pointer",
                  pointerEvents: visible ? "auto" : "none",
                  boxShadow: isActive
                    ? "0 22px 45px -10px rgba(197, 154, 69, 0.22), 0 12px 24px -8px rgba(23, 61, 50, 0.15)"
                    : "0 10px 25px -6px rgba(0, 0, 0, 0.08)",
                }}
                className={`p-6 sm:p-7 bg-[#FFFDF9] border flex flex-col justify-between text-center items-center transition-colors ${
                  isActive
                    ? "border-[#C59A45] ring-1 ring-[#C59A45]/30"
                    : "border-[#E8D4B5]/80 hover:border-[#C59A45]/70"
                }`}
              >
                {/* Top Sacred Decorative Icon */}
                <div
                  className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? "bg-[#173D32] text-[#ffdea6] border-[#173D32] shadow-md"
                      : "bg-[#FDF9F3] text-[#7B5802] border-[#E8D4B5]/70"
                  }`}
                >
                  <span className="material-symbols-outlined text-[28px]">
                    {item.icon}
                  </span>
                </div>

                {/* Body Content */}
                <div className="my-auto px-2">
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#173D32] mb-1.5 leading-snug">
                    {item.title}
                  </h4>
                  <span className="font-label-sm text-[10.5px] uppercase tracking-wider text-[#7B5802] block mb-3 font-semibold">
                    {item.tagline}
                  </span>
                  <p className="text-xs sm:text-[13px] text-[#414845] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="w-full pt-3 flex items-center justify-center">
                  <span
                    className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border transition-colors ${
                      isActive
                        ? "text-[#173D32] bg-[#E8D4B5]/30 border-[#C59A45]"
                        : "text-[#7B5802] bg-white border-[#E8D4B5]"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive ? "bg-[#C59A45] animate-pulse" : "bg-[#7B5802]/60"
                      }`}
                    />
                    In Development
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls: Dots & Arrows */}
      <div className="flex items-center gap-4 mt-3">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous offering"
          className="w-8 h-8 rounded-full border border-[#E8D4B5] bg-white text-[#173D32] hover:bg-[#173D32] hover:text-[#ffdea6] hover:border-[#173D32] flex items-center justify-center transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>

        <div className="flex items-center gap-1.5">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleCardClick(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                active === idx
                  ? "w-6 h-2 bg-[#C59A45]"
                  : "w-2 h-2 bg-[#E8D4B5] hover:bg-[#C59A45]/60"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next offering"
          className="w-8 h-8 rounded-full border border-[#E8D4B5] bg-white text-[#173D32] hover:bg-[#173D32] hover:text-[#ffdea6] hover:border-[#173D32] flex items-center justify-center transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
