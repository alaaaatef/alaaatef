import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { education } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export function EducationSection() {
  const ref = useRef<HTMLElement>(null);
  const [err, setErr] = useState(false);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".edu-anim", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={ref} className="relative min-h-[50vh] bg-black px-6 py-24 md:snap-start md:px-10">
      <div className="mx-auto max-w-5xl">
        <h2 className="edu-anim text-center font-display text-5xl font-bold md:text-6xl">
          <span className="text-gradient-teal">Education</span>
        </h2>

        <div className="edu-anim mt-12 glass rounded-2xl border-l-2 border-[#00d4aa] p-8 transition hover:shadow-[inset_0_0_60px_#00d4aa11] md:p-10">
          <div className="flex flex-col items-start gap-6 md:flex-row">
            {err ? (
              <div className="grid h-20 w-20 place-items-center rounded-xl bg-[#00d4aa]/10 text-4xl">🎓</div>
            ) : (
              <img
                src={education.logo}
                alt={education.university}
                onError={() => setErr(true)}
                className="h-20 w-20 rounded-xl object-cover"
              />
            )}
            <div className="flex-1">
              <h3 className="font-display text-2xl font-bold text-white">{education.degree}</h3>
              <p className="mt-1 text-base text-[#00d4aa]">{education.faculty}</p>
              <p className="mt-1 text-sm text-gray-400">{education.university} · {education.year}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full border border-[#00d4aa]/30 bg-[#00d4aa]/5 px-3 py-1 text-[#00d4aa]">Grade: {education.grade}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-400">{education.note}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
