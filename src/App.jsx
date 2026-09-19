import { lazy } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import LazySection from "./components/LazySection";

const ShowCaseSection = lazy(() => import("./sections/ShowCaseSection"));
const KanbanShowcase = lazy(() => import("./sections/KanbanShowcase"));
const MoreProjects = lazy(() => import("./sections/MoreProjects"));
const LogoSection = lazy(() => import("./components/LogoSection"));
const FeatureCards = lazy(() => import("./sections/FeatureCards"));
const TechStack = lazy(() => import("./sections/TechStack"));
const Contact = lazy(() => import("./sections/Contact"));
const Footer = lazy(() => import("./sections/Footer"));

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <LazySection minHeight="80vh">
        <ShowCaseSection />
      </LazySection>
      <LazySection minHeight="80vh">
        <KanbanShowcase />
      </LazySection>
      <LazySection minHeight="40vh">
        <MoreProjects />
      </LazySection>
      <LazySection minHeight="30vh">
        <LogoSection />
      </LazySection>
      <LazySection minHeight="50vh">
        <FeatureCards />
      </LazySection>
      <LazySection minHeight="60vh">
        <TechStack />
      </LazySection>
      <LazySection minHeight="80vh">
        <Contact />
      </LazySection>
      <LazySection minHeight="20vh">
        <Footer />
      </LazySection>
    </>
  );
};

export default App;
