import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import VideoShowcase from "../components/VideoShowcase";

gsap.registerPlugin(ScrollTrigger);

const ShowCaseSection = () => {
  const sectionRef = useRef(null);
  const project0Ref = useRef(null);
  const project1Ref = useRef(null);
  const project3Ref = useRef(null);
  const project4Ref = useRef(null);

  useGSAP(() => {
    const projects = [
      project0Ref.current,
      project4Ref.current,
      project1Ref.current,
      project3Ref.current,
    ];

    projects.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          overwrite: "auto",
          scrollTrigger: {
            trigger: card,
            start: "top bottom -=100",
            once: true,
            toggleActions: "play none none none",
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
        {/* Media Manager Dashboard — featured on top */}
        <div className="w-full mb-10 md:mb-14" ref={project0Ref}>
          <div className="card-border rounded-2xl p-4 md:p-8 flex flex-col gap-8">
            <VideoShowcase
              src="./videos/media-manager-demo.mp4"
              poster="./images/media-manager-poster.webp"
              alt="Media Manager Dashboard demo"
            />
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {[
                  "Python",
                  "FastAPI",
                  "SQLite",
                  "React",
                  "Tailwind CSS",
                  "yt-dlp",
                  "Docker",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="bg-black-200 py-1 px-3 rounded-full text-sm text-white-50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">
                <span className="hover:underline">
                  <a href="https://github.com/Needleeeeeeee/media-manager">
                    Media Manager Dashboard
                  </a>
                </span>
                : Self-Hosted Video Downloads with a Smart Library
              </h2>
              <p className="text-white-50 md:text-xl">
                A self-hosted download manager that queues URLs and playlists
                from most video sites, downloads them in parallel with metadata
                embedded and auto-resume on interruptions, and organizes
                everything into a searchable dark-themed library. A React +
                FastAPI dashboard tracks live progress while scheduled channel
                checks auto-queue new uploads.
              </p>
            </div>
          </div>
        </div>

        {/* Job Scraper Dashboard — second feature */}
        <div className="w-full mb-10 md:mb-14" ref={project4Ref}>
          <div className="card-border rounded-2xl p-4 md:p-8 flex flex-col gap-8">
            <VideoShowcase
              src="./videos/job-scraper-demo.mp4"
              poster="./images/job-scraper-poster.webp"
              alt="Job Scraper Dashboard demo"
            />
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {[
                  "Python",
                  "FastAPI",
                  "PostgreSQL",
                  "React",
                  "Tailwind CSS",
                  "Playwright",
                  "systemd",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="bg-black-200 py-1 px-3 rounded-full text-sm text-white-50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">
                <span className="hover:underline">
                  <a href="https://github.com/Needleeeeeeee/job-scraper">
                    Job Scraper Dashboard
                  </a>
                </span>
                : Local Job-Search Pipeline with One-Click Apply
              </h2>
              <p className="text-white-50 md:text-xl">
                A locally-run pipeline that scrapes Indeed, LinkedIn, and
                JobStreet for junior/entry-level roles in Metro Manila,
                dedupes leads, and tracks them in PostgreSQL. A React + FastAPI
                dashboard surfaces the postings and triggers Playwright-powered
                apply automation from the browser.
              </p>
            </div>
          </div>
        </div>

        <div className="showcaselayout">
          {/* left */}
          <div className="first-project-wrapper" ref={project1Ref}>
            <div className="image-wrapper p-4">
              <picture>
                <source srcSet="./images/project1.avif" type="image/avif" />
                <source srcSet="./images/project1.webp" type="image/webp" />
                <img
                  src="./images/project1.png"
                  alt="Glowpoint Dashboard"
                  width="808"
                  height="568"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain"
                />
              </picture>
            </div>
            <div className="text-content">
              <h2>
                <span className="hover:underline"><a href="https://github.com/Needleeeeeeee/glowpoint-dashboard">Glowpoint Dashboard</a></span>: Appointments and Queuing Management Made
                Simple
              </h2>
              <p className="text-white-50 md:text-xl">
                A full-stack web application built with NEXT.js, ShadCN, and Tailwind CSS
                to manage beauty lounge appointments & queuing with email/SMS notifications for the customers.
              </p>
            </div>
          </div>

          {/* right */}
          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={project3Ref}>
              <div className="image-wrapper bg-[#ffe7db] p-2.5 rounded-2xl overflow-hidden">
                <picture>
                  <source srcSet="./images/project3.avif" type="image/avif" />
                  <source srcSet="./images/project3.webp" type="image/webp" />
                  <img
                    src="./images/project3.png"
                    alt="GoGoGhost"
                    width="908"
                    height="681"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              <div className="text-content">
                <h2> <span className="hover:underline"><a href="https://github.com/Needleeeeeeee/go-go-ghost">GoGoGhost</a></span>: GODOT 2D Pixel Puzzle-Platformer Game</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowCaseSection;
