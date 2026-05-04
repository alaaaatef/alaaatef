import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, lazy, Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/Header";
import { LoadingScreen } from "@/components/LoadingScreen";
import { LandingSection } from "@/components/LandingSection";
import { FRAME_COUNT, FRAME_URLS } from "@/config/frames";

const AboutSection = lazy(() => import("@/components/AboutSection").then(m => ({ default: m.AboutSection })));
const USPSection = lazy(() => import("@/components/USPSection").then(m => ({ default: m.USPSection })));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection").then(m => ({ default: m.ExperienceSection })));
const SkillsOrbitSection = lazy(() => import("@/components/SkillsOrbitSection").then(m => ({ default: m.SkillsOrbitSection })));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection").then(m => ({ default: m.ProjectsSection })));
const EducationSection = lazy(() => import("@/components/EducationSection").then(m => ({ default: m.EducationSection })));
const CoursesSection = lazy(() => import("@/components/CoursesSection").then(m => ({ default: m.CoursesSection })));
const ContactSection = lazy(() => import("@/components/ContactSection").then(m => ({ default: m.ContactSection })));

export const Route = createFileRoute("/")({
  component: Index,
});

const PRIORITY_1 = 20;  // frames 1-20: must load before showing site
const PRIORITY_2 = 60;  // frames 21-60: load during loading screen
// frames 61-120: load after site is visible

function loadBatch(
  urls: string[],
  startIndex: number,
  arr: HTMLImageElement[],
  onProgress: () => void,
) {
  return new Promise<void>((resolve) => {
    let remaining = urls.length;
    if (remaining === 0) { resolve(); return; }
    urls.forEach((url, i) => {
      const img = new Image();
      const done = () => {
        arr[startIndex + i] = img;
        onProgress();
        remaining--;
        if (remaining <= 0) resolve();
      };
      img.onload = done;
      img.onerror = done;
      img.src = url;
    });
  });
}

function Index() {
  const [loaded, setLoaded] = useState(0);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const arr: HTMLImageElement[] = new Array(FRAME_COUNT);
    let count = 0;

    const tick = () => {
      count++;
      if (cancelled) return;
      setLoaded(count);
    };

    // Phase 1: frames 1-20 (critical)
    const batch1 = FRAME_URLS.slice(0, PRIORITY_1);
    loadBatch(batch1, 0, arr, tick).then(() => {
      if (cancelled) return;
      // Show the site as soon as batch 1 is ready
      setImages([...arr]);
      setDone(true);

      // Phase 2: frames 21-60 (background)
      const batch2 = FRAME_URLS.slice(PRIORITY_1, PRIORITY_2);
      return loadBatch(batch2, PRIORITY_1, arr, tick);
    }).then(() => {
      if (cancelled) return;
      setImages([...arr]);

      // Phase 3: frames 61-120 (low priority)
      const batch3 = FRAME_URLS.slice(PRIORITY_2);
      return loadBatch(batch3, PRIORITY_2, arr, tick);
    }).then(() => {
      if (cancelled) return;
      setImages([...arr]);
    });

    // Safety timeout
    const t = setTimeout(() => {
      if (!cancelled && !done) {
        setImages([...arr]);
        setDone(true);
      }
    }, 6000);

    return () => { cancelled = true; clearTimeout(t); };
  }, []);

  return (
    <>
      <LoadingScreen progress={loaded / FRAME_COUNT} done={done} />
      {done && (
        <main className="md:snap-y md:snap-mandatory">
          <Header />
          <LandingSection images={images} />
          <Suspense fallback={null}>
            <AboutSection />
            <USPSection />
            <ExperienceSection />
            <SkillsOrbitSection />
            <ProjectsSection />
            <EducationSection />
            <CoursesSection />
            <ContactSection />
          </Suspense>
        </main>
      )}
      <Analytics />
    </>
  );
}
