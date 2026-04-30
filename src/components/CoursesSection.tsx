import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { courses } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

function CourseImg({ src, title }: { src: string; title: string }) {
  const [err, setErr] = useState(false);
  const initials = title.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  if (err) {
    return (
      <div className="grid aspect-video w-full place-items-center rounded-t-xl bg-gradient-to-br from-[#00d4aa] to-[#00b894] font-display text-5xl font-bold text-black">
        {initials}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={title}
      onError={() => setErr(true)}
      className="aspect-video w-full rounded-t-xl object-cover"
    />
  );
}

export function CoursesSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".course-card", {
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="courses" ref={ref} className="relative min-h-[70vh] bg-[#0a0a0a] px-6 py-24 md:snap-start md:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center font-display text-5xl font-bold md:text-6xl">
          <span className="text-white">Courses & </span>
          <span className="text-gradient-teal">Certifications</span>
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <div key={c.id} className="course-card glass overflow-hidden rounded-xl transition hover:-translate-y-1">
              <CourseImg src={c.image} title={c.title} />
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#00d4aa]">{c.provider}</p>
                <h3 className="mt-2 text-base font-bold text-white">{c.title}</h3>
                <p className="mt-1 text-xs text-gray-500">{c.date}</p>
                {c.skills && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.skills.map((s) => (
                      <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-gray-300">{s}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
