import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { uspItems } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

const icons: Record<string, React.ReactNode> = {
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
      <path d="M3 3v18h18M7 14l4-4 4 4 5-6" />
    </svg>
  ),
  stack: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-7 w-7">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  ),
};

export function USPSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".usp-card", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        y: 40, scale: 0.95, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="usp" ref={ref} className="relative min-h-[60vh] bg-black px-6 py-24 md:snap-start md:px-10">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="font-display text-5xl font-bold text-white md:text-7xl lg:text-[5rem]">Why Me?</h2>
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {uspItems.map((u) => (
            <div
              key={u.title}
              className="usp-card glass rounded-xl border-t-2 border-[#00d4aa] p-7 text-left transition-transform hover:-translate-y-2"
            >
              <div className="text-[#00d4aa]">{icons[u.icon]}</div>
              <h3 className="mt-4 font-display text-xl font-bold text-white">{u.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">{u.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
