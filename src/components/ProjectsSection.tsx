import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { projects } from "@/data/content";

export function ProjectsSection() {
  const [idx, setIdx] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const proj = projects[idx];

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );
  }, [idx]);

  const next = () => setIdx((i) => (i + 1) % projects.length);
  const prev = () => setIdx((i) => (i - 1 + projects.length) % projects.length);

  // touch swipe
  const startX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 50) prev();
    else if (dx < -50) next();
  };

  return (
    <section id="projects" className="relative min-h-screen bg-black px-6 py-24 md:snap-start md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-display text-5xl font-bold md:text-7xl">
          <span className="text-white">My </span>
          <span className="text-gradient-teal">Projects</span>
        </h2>

        <div className="mt-12 flex items-center justify-center gap-6">
          <button onClick={prev} aria-label="Previous project" className="grid h-11 w-11 place-items-center rounded-full border border-[#00d4aa]/40 text-[#00d4aa] transition hover:bg-[#00d4aa]/10">←</button>
          <span className="font-mono text-sm text-gray-400">{proj.id} / {String(projects.length).padStart(2, "0")}</span>
          <button onClick={next} aria-label="Next project" className="grid h-11 w-11 place-items-center rounded-full border border-[#00d4aa]/40 text-[#00d4aa] transition hover:bg-[#00d4aa]/10">→</button>
        </div>

        <div
          ref={cardRef}
          className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div>
            <div className="font-display text-7xl font-bold text-gray-700 md:text-8xl">{proj.id}</div>
            <h3 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">{proj.title}</h3>
            <p className="mt-2 text-sm font-medium uppercase tracking-widest" style={{ color: proj.accent }}>{proj.tagline}</p>
            <p className="mt-5 text-base leading-relaxed text-gray-300">{proj.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {proj.skills.map((s) => (
                <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300">{s}</span>
              ))}
            </div>
            {proj.githubUrl && (
              <a
                href={proj.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#00d4aa] px-5 py-2.5 text-sm font-medium text-[#00d4aa] transition hover:bg-[#00d4aa] hover:text-black"
              >
                View on GitHub →
              </a>
            )}
          </div>

          <div className="relative">
            <div
              className="absolute inset-0 -m-6 rounded-3xl opacity-40 blur-3xl"
              style={{ background: proj.accent }}
            />
            <div
              className="relative aspect-video overflow-hidden rounded-2xl border bg-white/5 backdrop-blur"
              style={{ borderColor: `${proj.accent}66`, boxShadow: `0 20px 80px ${proj.accent}33` }}
            >
              <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 20%, ${proj.accent}22, transparent 60%)` }} />
              <ProjectImage src={proj.image} accent={proj.accent} number={proj.id} />
            </div>
            <div className="mt-5 flex justify-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  aria-label={`Project ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-[#00d4aa]" : "w-2 bg-gray-700"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectImage({ src, accent, number }: { src: string; accent: string; number: string }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className="grid h-full w-full place-items-center font-display text-9xl font-bold" style={{ color: accent }}>
        {number}
      </div>
    );
  }
  return (
    <img
      src={src}
      onError={() => setErr(true)}
      alt=""
      loading="lazy"
      decoding="async"
      className="relative h-full w-full object-cover transition-transform duration-500 hover:scale-105"
    />
  );
}
