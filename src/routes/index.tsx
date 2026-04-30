import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Header } from "@/components/Header";
import { LoadingScreen } from "@/components/LoadingScreen";
import { LandingSection } from "@/components/LandingSection";
import { AboutSection } from "@/components/AboutSection";
import { USPSection } from "@/components/USPSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SkillsOrbitSection } from "@/components/SkillsOrbitSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { EducationSection } from "@/components/EducationSection";
import { CoursesSection } from "@/components/CoursesSection";
import { ContactSection } from "@/components/ContactSection";
import { FRAME_COUNT, FRAME_URLS } from "@/config/frames";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(0);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const arr: HTMLImageElement[] = new Array(FRAME_COUNT);
    let count = 0;
    const finish = () => {
      count++;
      if (cancelled) return;
      setLoaded(count);
      if (count >= FRAME_COUNT) {
        setImages(arr);
        setDone(true);
      }
    };
    FRAME_URLS.forEach((url, i) => {
      const img = new Image();
      img.onload = () => { arr[i] = img; finish(); };
      img.onerror = () => { arr[i] = img; finish(); }; // count missing as done
      img.src = url;
    });
    // safety timeout: never hang the app
    const t = setTimeout(() => {
      if (!cancelled && count < FRAME_COUNT) {
        setImages(arr);
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
          <AboutSection />
          <USPSection />
          <ExperienceSection />
          <SkillsOrbitSection />
          <ProjectsSection />
          <EducationSection />
          <CoursesSection />
          <ContactSection />
        </main>
      )}
      <Analytics />
    </>
  );
}
