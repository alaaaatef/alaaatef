import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

function CompanyLogo({ src, name }: { src: string; name: string }) {
  const [err, setErr] = useState(false);
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  if (err) {
    return (
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[#00d4aa]/15 text-xs font-bold text-[#00d4aa]">
        {initials}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      onError={() => setErr(true)}
      loading="lazy"
      decoding="async"
      className="h-8 w-8 shrink-0 rounded-md object-cover"
    />
  );
}

export function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-anim", {
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
        y: 30, opacity: 0, duration: 0.7, stagger: 0.08, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const dotTop = `${(active / (experiences.length - 1)) * 100}%`;

  return (
    <section id="experience" ref={ref} className="relative min-h-[90vh] bg-black px-6 py-24 md:snap-start md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <h2 className="exp-anim text-center font-display text-5xl font-bold md:text-7xl">
          <span className="text-gray-400">Work </span>
          <span className="text-gradient-teal">Experience</span>
        </h2>

        {/* Mobile pills */}
        <div className="mt-10 flex gap-3 overflow-x-auto pb-2 lg:hidden snap-x">
          {experiences.map((e, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`shrink-0 snap-start rounded-full px-4 py-2 text-xs uppercase tracking-widest transition ${
                active === i ? "bg-[#00d4aa] text-black" : "border border-gray-700 text-gray-300"
              }`}
            >
              {e.company.split(" ")[0]}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          {/* Left list */}
          <div className="exp-anim hidden lg:col-span-4 lg:block">
            <ul className="space-y-5">
              {experiences.map((e, i) => (
                <li
                  key={i}
                  onMouseEnter={() => setActive(i)}
                  className={`flex cursor-pointer items-start gap-3 rounded-lg p-3 transition ${
                    active === i ? "bg-white/5" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <CompanyLogo src={e.logo} name={e.company} />
                  <div>
                    <div className={`text-sm font-semibold ${active === i ? "text-[#00d4aa]" : "text-white"}`}>{e.role}</div>
                    <div className="text-xs text-gray-500">{e.company}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Center line */}
          <div className="relative hidden lg:col-span-1 lg:block">
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[#00d4aa]/40 to-transparent" />
            <div
              className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#00d4aa] shadow-[0_0_20px_#00d4aa] transition-all duration-500"
              style={{ top: dotTop }}
            />
          </div>

          {/* Right panel */}
          <div className="relative min-h-[400px] lg:col-span-7">
            {experiences.map((e, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-500 ${
                  active === i ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-4"
                }`}
              >
                <div className="text-sm uppercase tracking-widest text-gray-500">{e.company}</div>
                <div className="font-display text-7xl font-bold text-gradient-teal md:text-8xl">{e.year}</div>
                <div className="mt-2 text-lg font-semibold text-white">{e.role}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-gray-500">{e.period}</div>
                <ul className="mt-6 space-y-3 text-sm text-gray-300 md:text-base">
                  {e.bullets.map((b, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00d4aa]" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
