import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FRAME_COUNT } from "@/config/frames";
import { heroBlocks } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export function FrameSequence({ images }: { images: HTMLImageElement[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ frame: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const wrap = wrapRef.current!;
    const ctx = canvas.getContext("2d")!;
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.imageSmoothingQuality = isMobile ? "low" : "high";
      draw(stateRef.current.frame);
    };

    const drawImg = (img: HTMLImageElement, alpha = 1) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const ir = img.naturalWidth / img.naturalHeight;
      const cr = cw / ch;
      let dw, dh;
      // Cover the full canvas so the image fills the screen
      if (ir > cr) {
        dw = cw;
        dh = cw / ir;
      } else {
        dh = ch;
        dw = ch * ir;
      }
      const dx = (cw - dw) / 2;
      // Shift image up slightly so face/eyes/eyebrows are visible
      const dy = isMobile ? (ch - dh) / 2 - dh * 0.05 : (ch - dh) / 2;
      ctx.globalAlpha = alpha;
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.globalAlpha = 1;
    };

    const draw = (frameFloat: number) => {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const i = Math.floor(frameFloat);
      const t = frameFloat - i;
      const a = images[Math.max(0, Math.min(FRAME_COUNT - 1, i))];
      const b = images[Math.max(0, Math.min(FRAME_COUNT - 1, i + 1))];
      drawImg(a, 1);
      if (b && t > 0) drawImg(b, t);
    };

    setSize();
    window.addEventListener("resize", setSize);

    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: "top top",
      end: "bottom bottom",
      scrub: isMobile ? 2.5 : 1,
      onUpdate: (self) => {
        stateRef.current.frame = self.progress * (FRAME_COUNT - 1);
        draw(stateRef.current.frame);
      },
    });

    return () => {
      window.removeEventListener("resize", setSize);
      trigger.kill();
    };
  }, [images]);

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height: "400vh" }}>
      <div className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-black">
        <canvas ref={canvasRef} className="absolute inset-0" style={{ willChange: "transform" }} />
        {/* desktop overlays */}
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa]/10 to-transparent" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 0% 50%, rgba(0,212,170,0.18), transparent 60%)" }} />
        </div>
        {/* mobile bottom mask */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-black via-black/80 to-transparent md:hidden" />
      </div>
    </div>
  );
}

function TextContentBlock({ block, index }: { block: typeof heroBlocks[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top bottom", toggleActions: "play none none reverse" },
    });
    tl.from(el.querySelector(".hb-title"), { y: 36, opacity: 0, duration: 0.8, ease: "power3.out" })
      .from(el.querySelector(".hb-sub"), { y: 22, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .from(el.querySelector(".hb-desc"), { y: 16, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.5");
  }, []);

  return (
    <section
      ref={ref}
      className="relative z-20 flex h-screen w-full items-center px-6 text-center md:z-10 md:snap-start md:justify-start md:pl-20 md:text-left lg:pl-28"
      style={index === 0 ? { marginTop: "-400vh" } : undefined}
    >
      <div className="max-w-4xl">
        <h2 className="hb-title font-display text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl" style={{ textShadow: "0 4px 30px rgba(0,0,0,0.8)" }}>
          {block.title}
        </h2>
        <p className="hb-sub mt-4 text-lg font-medium text-white md:text-2xl" style={{ textShadow: "0 2px 14px rgba(0,0,0,0.7)" }}>
          {block.subtitle}
        </p>
        {block.description && (
          <p className="hb-desc mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/90 md:mx-0 md:text-base" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.7)" }}>
            {block.description}
          </p>
        )}
      </div>
    </section>
  );
}

export function LandingSection({ images }: { images: HTMLImageElement[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showNav, setShowNav] = useState(true);

  // up/down buttons
  const navTo = (dir: "up" | "down") => {
    const anchors = ["hero-0", "hero-1", "hero-2", "hero-3", "about"];
    const positions = anchors.map((id) => {
      const el = document.getElementById(id);
      return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
    });
    const cur = window.scrollY + window.innerHeight * 0.3;
    let target;
    if (dir === "down") {
      target = positions.find((p) => p > cur);
    } else {
      target = [...positions].reverse().find((p) => p < cur - 10);
    }
    if (target == null || !isFinite(target)) return;
    const isMobile = window.innerWidth < 768;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: target, behavior: isMobile || reduce ? "auto" : "smooth" });
  };

  // hide nav buttons when about is near top
  useEffect(() => {
    const onScroll = () => {
      const about = document.getElementById("about");
      if (!about) return;
      const top = about.getBoundingClientRect().top;
      setShowNav(top > window.innerHeight * 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // mobile wheel/touch debounced section nav while in landing
  useEffect(() => {
    if (window.innerWidth >= 768) return;
    let last = 0;
    const targets = ["hero-0", "hero-1", "hero-2", "hero-3", "about"];

    const beforeAbout = () => {
      const a = document.getElementById("about");
      return !a || a.getBoundingClientRect().top > window.innerHeight * 0.5;
    };
    const goDir = (dir: 1 | -1) => {
      const now = Date.now();
      if (now - last < 550) return;
      last = now;
      const positions = targets.map((id) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top + window.scrollY : Infinity;
      });
      const cur = window.scrollY + window.innerHeight * 0.3;
      const next = dir > 0
        ? positions.find((p) => p > cur)
        : [...positions].reverse().find((p) => p < cur - 10);
      if (next != null && isFinite(next)) {
        window.scrollTo({ top: next, behavior: "auto" });
      }
    };

    let ts = 0;
    const onTouchStart = (e: TouchEvent) => { ts = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      if (!beforeAbout()) return;
      const dy = ts - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) { e.preventDefault(); goDir(dy > 0 ? 1 : -1); }
    };
    const onWheel = (e: WheelEvent) => {
      if (!beforeAbout()) return;
      if (Math.abs(e.deltaY) < 5) return;
      e.preventDefault();
      goDir(e.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: false });
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd as any);
      window.removeEventListener("wheel", onWheel as any);
    };
  }, []);

  return (
    <div ref={containerRef} id="top" className="relative">
      <FrameSequence images={images} />
      {/* The four content blocks come AFTER the 400vh wrapper */}
      <div className="relative">
        {heroBlocks.map((b, i) => (
          <div id={`hero-${i}`} key={i}>
            <TextContentBlock block={b} index={i} />
          </div>
        ))}
      </div>

      {showNav && (
        <div className="fixed right-4 top-1/2 z-30 flex -translate-y-1/2 flex-col gap-3">
          <button onClick={() => navTo("up")} aria-label="Previous section" className="grid h-10 w-10 place-items-center rounded-full border border-[#00d4aa]/40 bg-black/60 text-[#00d4aa] backdrop-blur transition hover:bg-[#00d4aa]/10">▲</button>
          <button onClick={() => navTo("down")} aria-label="Next section" className="grid h-10 w-10 place-items-center rounded-full border border-[#00d4aa]/40 bg-black/60 text-[#00d4aa] backdrop-blur transition hover:bg-[#00d4aa]/10">▼</button>
        </div>
      )}

      {showNav && (
        <div className="pointer-events-none fixed inset-x-0 bottom-6 z-30 hidden flex-col items-center gap-1 text-xs uppercase tracking-widest text-[#00d4aa] md:flex" style={{ animation: "pulse-soft 2s ease-in-out infinite" }}>
          <span>Scroll to explore</span>
          <span style={{ animation: "bounce-chevron 1.4s ease-in-out infinite" }}>▼</span>
        </div>
      )}
    </div>
  );
}

