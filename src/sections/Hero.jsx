import AnimatedCounter from "../components/AnimatedCounter.jsx";
import Button from "../components/Button.jsx";
import HeroExperience from "../components/Models/HeroModels/HeroExperience.jsx";
import { words } from "../constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Hero = () => {

  useGSAP(() => {
    gsap.fromTo('.hero-text h1',
        {
            y: 50,
            opacity: 0
        },{
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
        })
  })

  return (
    <section id="hero" className="relative">
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="Hero Background" />
      </div>

      <div className="hero-layout">
        {/* Left - Content */}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <div className="hero-text">
              <h1>
                Transforming
                <span className="slide">
                  <span className="wrapper">
                    {words.map((word) => (
                      <span
                        key={word.text}
                        className="flex items-center md:gap-3 gap-1 pb-2"
                      >
                        <img
                          src={word.imgPath}
                          alt={word.text}
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        />
                        <span>{word.text}</span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              <h1>Into Impactful Products</h1>
              <h1>That Drive Success</h1>
            </div>
            <p className="text-white-50 md:text-xl max-w-2xl relative z-10 pointer-events-none">
              Hi, I'm Ernest, a developer based in The Philippines. I specialize
              in building exceptional, high-performance web applications that bring ideas to life.
            </p>
            <Button
              className="md:w-80 md:h-16 w-60 h-12"
              id="button"
              text="See My Work!"
            />
          </div>
        </header>

        {/* Right - 3D Model */}
        <figure>
          <div className="hero-3d-layout">
            <HeroExperience />
          </div>
        </figure>
      </div>
      <AnimatedCounter />
    </section>
  );
};

export default Hero;
