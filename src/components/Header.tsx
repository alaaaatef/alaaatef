import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { navLinks } from "@/data/content";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const header = document.querySelector(".site-header");
    const navItems = document.querySelectorAll(".nav-item");
    if (header) {
      gsap.fromTo(header, { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
    }
    if (navItems.length) {
      gsap.fromTo(navItems, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.06, delay: 0.2, ease: "power3.out" });
    }
  }, []);

  return (
    <header className={`site-header fixed inset-x-0 top-0 z-50 ${open ? "bg-[#0a0a0a]" : "bg-transparent"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <a
          href="#top"
          className="font-display text-xl font-bold tracking-tight md:text-2xl"
        >
          <span className="text-gradient-white transition-all hover:[background-image:linear-gradient(90deg,#00d4aa,#fff)]">
            Alaa Atef
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-item group relative text-xs font-medium uppercase tracking-[0.2em] text-gray-300 transition-colors hover:text-[#00d4aa]"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#00d4aa] transition-transform group-hover:scale-x-100" />
            </a>
          ))}
          <a
            href="/Alaa CV.pdf"
            download="Alaa CV.pdf"
            type="application/pdf"
            className="nav-item rounded-full border border-[#00d4aa]/60 bg-transparent px-4 py-2 text-xs font-medium uppercase tracking-widest text-white transition hover:bg-[#00d4aa]/10"
          >
            Download CV →
          </a>
        </nav>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-white"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-b border-gray-800 bg-[#0a0a0a] md:hidden">
          <nav className="flex flex-col px-6 py-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-gray-900 py-3 text-sm uppercase tracking-widest text-gray-300 hover:text-[#00d4aa]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="/Alaa CV.pdf"
              download="Alaa CV.pdf"
              type="application/pdf"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full border border-[#00d4aa]/60 bg-transparent px-4 py-3 text-center text-xs uppercase tracking-widest text-white"
            >
              Download CV →
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
