import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ShowCaseSection = () => {
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);

  useGSAP(() => {
    const projects = [
      project1Ref.current,
      project2Ref.current,
      project3Ref.current,
    ];

    projects.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom -=100",
          },
        }
      );
    });

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1.5,
      }
    );
  }, []);

  return (
    <section id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          {/* left */}
          <div className="first-project-wrapper" ref={project1Ref}>
            <div className="image-wrapper p-4">
              <img
                src="./images/project1.png"
                alt="Glowpoint Dashboard"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-content">
              <h2>
                Glowpoint Dashboard: Appointments and Queuing Management Made
                Simple
              </h2>
              <p className="text-white-50 md:text-xl">
                A web application built with NEXT.js, ShadCN, and Tailwind CSS
                to manage beauty lounge appointments & queuing.
              </p>
            </div>
          </div>

          {/* right */}
          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={project2Ref}>
              <div className="image-wrapper bg-[#ffefdb] p-2.5 rounded-2xl overflow-hidden">
                <img src="./images/project2.png" alt="Glowpoint" />
              </div>
              <div className="text-content">
                <h2>
                  Glowpoint.org: Booking Beauty Lounge Services with
                  Elegance
                </h2>
              </div>
            </div>

            <div className="project" ref={project3Ref}>
              <div className="image-wrapper bg-[#ffe7db] p-2.5 rounded-2xl overflow-hidden">
                <img src="./images/project3.png" alt="GoGoGhost" />
              </div>
              <div className="text-content">
                <h2>GoGoGhost: GODOT 2D Pixel Puzzle-Platformer Game</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowCaseSection;
