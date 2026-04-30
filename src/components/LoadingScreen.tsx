import { useEffect, useState } from "react";

export function LoadingScreen({ progress, done }: { progress: number; done: boolean }) {
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (done) {
      const t1 = setTimeout(() => setFading(true), 600);
      const t2 = setTimeout(() => setHidden(true), 1200);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [done]);

  if (hidden) return null;
  const pct = Math.round(progress * 100);

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black transition-opacity duration-500 ${fading ? "pointer-events-none opacity-0" : "opacity-100"}`}
    >
      <h1 className="font-display text-5xl font-bold uppercase tracking-widest md:text-7xl">
        <span className="text-gradient-teal">Loading</span>
      </h1>
      <div className="mt-8 h-1.5 w-64 overflow-hidden rounded-full bg-[#0a0a0a] md:w-96">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#00d4aa] to-[#00b894] transition-[width] duration-150"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-4 font-mono text-sm text-[#00d4aa]">{pct}%</p>
    </div>
  );
}
