import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";

const ShowCaseSection = lazy(() => import("./sections/ShowCaseSection"));
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
      <Suspense fallback={null}>
        <ShowCaseSection />
        <MoreProjects />
        <LogoSection />
        <FeatureCards />
        <TechStack />
        <Contact />
        <Footer />
      </Suspense>
    </>
  );
};

export default App;
