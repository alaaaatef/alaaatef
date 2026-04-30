import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutText, aboutStats } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-anim", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-[90vh] bg-[#0a0a0a] px-6 py-24 md:snap-start md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="about-anim font-display text-5xl font-bold md:text-6xl lg:text-7xl">
          <span className="text-gradient-teal">About</span>
        </h2>
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="about-anim space-y-5 text-base leading-relaxed text-gray-300 md:text-lg">
            {aboutText.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {aboutStats.map((s, i) => (
              <div
                key={i}
                className="about-anim glass rounded-xl border-l-2 border-[#00d4aa] p-6 transition-transform hover:-translate-y-1"
              >
                <div className="font-display text-4xl font-bold text-gradient-teal md:text-5xl">{s.value}</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-gray-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
