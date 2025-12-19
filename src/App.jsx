import LogoSection from "./components/LogoSection";
import Navbar from "./components/Navbar";
import Contact from "./sections/Contact";
import FeatureCards from "./sections/FeatureCards";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import ShowCaseSection from "./sections/ShowCaseSection";
import TechStack from "./sections/TechStack";

const App = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <ShowCaseSection/>
      <LogoSection/>
      <FeatureCards/>
      <TechStack/>
      <Contact/>
      <Footer/>
    </>
  );
};

export default App;
