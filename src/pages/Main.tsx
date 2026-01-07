
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";

import HeroSection from "../components/main/HeroSection/HeroSection";
import CoreValuesSection from "../components/main/CoreValuesSection/CoreValuesSection";
import CurriculumSection from "../components/main/CurriculumSection/CurriculumSection";
import ProjectsSection from "../components/main/ProjectSection/ProjectSection";

import useRevealOnScroll from "../hooks/useRevealOnScroll";
import "../styles/scrollReveal.css";

const MainPage = () => {
  const hero = useRevealOnScroll({ threshold: 0.2 });
  const core = useRevealOnScroll({ threshold: 0.15 });
  const curriculum = useRevealOnScroll({ threshold: 0.15 });
  const projects = useRevealOnScroll({ threshold: 0.15 });

  return (
    <>
      <Navbar />
      <main>
        <section
          ref={hero.ref}
          className={`scroll-reveal delay-1 ${hero.isVisible ? "is-visible" : ""}`}
        >
          <HeroSection />
        </section>

        <section
          ref={core.ref}
          className={`scroll-reveal delay-2 ${core.isVisible ? "is-visible" : ""}`}
        >
          <CoreValuesSection />
        </section>

        <section
          ref={curriculum.ref}
          className={`scroll-reveal delay-3 ${
            curriculum.isVisible ? "is-visible" : ""
          }`}
        >
          <CurriculumSection />
        </section>

        <section
          ref={projects.ref}
          className={`scroll-reveal delay-4 ${
            projects.isVisible ? "is-visible" : ""
          }`}
        >
          <ProjectsSection />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MainPage;
