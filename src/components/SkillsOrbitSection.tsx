import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { innerOrbit, middleOrbit, outerOrbit, type OrbitIcon } from "@/data/skillsOrbit";

gsap.registerPlugin(ScrollTrigger);

function Ring({
  icons, radius, duration, reverse, paused, onPick,
}: {
  icons: OrbitIcon[]; radius: number; duration: number; reverse?: boolean; paused: boolean; onPick: (i: OrbitIcon) => void;
}) {
  return (
    <div
      className="absolute inset-0"
      style={{
        animation: `${reverse ? "orbit-rotate-rev" : "orbit-rotate"} ${duration}s linear infinite`,
        animationPlayState: paused ? "paused" : "running",
      }}
    >
      {icons.map((ic, i) => {
        const angle = (i / icons.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return (
          <button
            key={ic.name + i}
            onMouseEnter={() => onPick(ic)}
            onClick={() => onPick(ic)}
            className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/60 backdrop-blur transition hover:scale-110 hover:border-[#00d4aa]"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              animation: `${reverse ? "orbit-rotate" : "orbit-rotate-rev"} ${duration}s linear infinite`,
              animationPlayState: paused ? "paused" : "running",
            }}
            aria-label={ic.name}
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" style={{ fill: ic.color }}>
              <path d={ic.path} />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

export function SkillsOrbitSection() {
  const ref = useRef<HTMLElement>(null);
  const [picked, setPicked] = useState<OrbitIcon | null>(null);
  const paused = picked !== null;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".skills-head", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        y: 30, scale: 0.95, opacity: 0, duration: 0.8, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Generate stars (desktop only)
  const [stars] = useState(() => {
    if (typeof window === "undefined" || window.innerWidth < 768) return [];
    return Array.from({ length: 100 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      d: 2 + Math.random() * 4,
      delay: Math.random() * 3,
    }));
  });

  return (
    <section
      id="skills"
      ref={ref}
      onClick={() => setPicked(null)}
      className="relative min-h-[90vh] overflow-hidden px-6 py-24 md:min-h-screen md:snap-start md:py-32"
      style={{ background: "#020608" }}
    >
      {/* Background blurs */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-[#00d4aa]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-blue-900/30 blur-3xl" />

      {/* Stars */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: 1,
              height: 1,
              animation: `twinkle ${s.d}s ease-in-out ${s.delay}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl">
        <h2 className="skills-head text-center font-display text-5xl font-bold md:text-7xl">
          <span className="text-gradient-white">Tech </span>
          <span className="text-gradient-teal">Stack</span>
        </h2>
        <p className="skills-head mt-3 text-center text-sm text-gray-500">
          <span className="hidden md:inline">Hover</span>
          <span className="md:hidden">Tap</span>
          {" "}an icon to learn more
        </p>

        <div className="relative mx-auto mt-16 aspect-square w-full max-w-[720px]" style={{ transform: "scale(var(--orbit-scale,1))" }}>
          {/* Decorative dashed rings */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#00d4aa]/20" style={{ width: 280, height: 280, animation: "orbit-rotate 60s linear infinite" }} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#00d4aa]/15" style={{ width: 460, height: 460, animation: "orbit-rotate-rev 90s linear infinite" }} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" style={{ width: 680, height: 680 }} />

          <Ring icons={innerOrbit} radius={140} duration={40} paused={paused} onPick={setPicked} />
          <Ring icons={middleOrbit} radius={230} duration={60} reverse paused={paused} onPick={setPicked} />
          <Ring icons={outerOrbit} radius={340} duration={90} paused={paused} onPick={setPicked} />

          {/* Center node */}
          <div className="absolute left-1/2 top-1/2 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center overflow-hidden rounded-full border border-white/15 bg-black/70 backdrop-blur">
            {picked ? (
              <div className="flex flex-col items-center" style={{ filter: `drop-shadow(0 0 12px ${picked.color})` }}>
                <svg viewBox="0 0 24 24" className="h-12 w-12" style={{ fill: picked.color }}>
                  <path d={picked.path} />
                </svg>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-white">{picked.name}</div>
              </div>
            ) : (
              <img src="/profile.png" alt="Alaa Atef" className="h-full w-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
            )}
          </div>
        </div>
      </div>

      <style>{`@media(max-width:640px){#skills{--orbit-scale:0.55}}@media(min-width:641px) and (max-width:900px){#skills{--orbit-scale:0.75}}`}</style>
    </section>
  );
}
