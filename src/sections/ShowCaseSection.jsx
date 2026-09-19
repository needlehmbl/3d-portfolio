import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import VideoShowcase from "../components/VideoShowcase";

gsap.registerPlugin(ScrollTrigger);

// Project title link: always subtly underlined with a small external-link
// glyph so titles read as links at a glance, staying monochrome to match
// the theme. Underline and glyph brighten on hover/focus.
const TitleLink = ({ href, children }) => (
  <a
    href={href}
    title="Open GitHub repository"
    className="group/link underline decoration-1 decoration-white/25 underline-offset-4 transition-colors hover:text-white hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-sm"
  >
    {children}
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="inline-block size-[0.75em] ml-1.5 -mt-0.5 opacity-40 transition-opacity group-hover/link:opacity-100"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  </a>
);

const ShowCaseSection = () => {
  const sectionRef = useRef(null);
  const project1Ref = useRef(null);
  const project2Ref = useRef(null);
  const project3Ref = useRef(null);
  const project4Ref = useRef(null);
  const project5Ref = useRef(null);

  useGSAP(() => {
    const projects = [
      project4Ref.current,
      project1Ref.current,
      project2Ref.current,
      project3Ref.current,
      project5Ref.current,
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
                <TitleLink href="https://github.com/needlehmbl/job-scraper">
                  Job Scraper Dashboard
                </TitleLink>
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
            <VideoShowcase
              src="./videos/media-manager-demo.mp4"
              poster="./images/media-manager-poster.webp"
              alt="Media Manager Dashboard demo"
            />
            <div className="text-content">
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
              <h2>
                <TitleLink href="https://github.com/needlehmbl/media-manager">Media Manager Dashboard</TitleLink>: Self-Hosted Video Downloads with a Smart Library
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

          {/* right */}
          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={project2Ref}>
              <div className="image-wrapper p-2.5 rounded-2xl overflow-hidden">
                <picture>
                  <source srcSet="./images/doc-pipeline.avif" type="image/avif" />
                  <source srcSet="./images/doc-pipeline.webp" type="image/webp" />
                  <img
                    src="./images/doc-pipeline.png"
                    alt="Doc Pipeline dashboard"
                    width="1299"
                    height="660"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </div>
              <div className="text-content">
                <h2>
                  <TitleLink href="https://github.com/needlehmbl/doc-pipeline">Doc Pipeline</TitleLink>: Offline Document Intelligence with Ollama
                </h2>
              </div>
            </div>

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
                <h2> <TitleLink href="https://github.com/needlehmbl/go-go-ghost">GoGoGhost</TitleLink>: GODOT 2D Pixel Puzzle-Platformer Game</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Kanban Board — full-width feature below the showcase cards */}
        <div className="w-full mt-10 md:mt-14" ref={project5Ref}>
          <div className="card-border rounded-2xl p-4 md:p-8 flex flex-col gap-8">
            <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-black-100 border border-black-50">
              <div className="absolute inset-0 flex-col-center gap-4 text-center px-4">
                <p className="text-white-50 text-sm uppercase tracking-widest">
                  Real-time Kanban
                </p>
                <p className="text-white text-2xl md:text-3xl font-semibold">
                  Drag, drop &amp; sync — no login needed
                </p>
                <a
                  href="https://needlehmbl.github.io/kanban-demo/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-white/25 bg-white/10 px-6 py-2.5 text-sm text-white transition-colors hover:bg-white/20"
                >
                  Try live demo
                </a>
              </div>
            </div>
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {[
                  "Node.js",
                  "Express",
                  "Socket.io",
                  "Prisma",
                  "PostgreSQL",
                  "React",
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
                <TitleLink href="https://github.com/needlehmbl/kanban">
                  Kanban Board
                </TitleLink>
                : Real-Time Collaborative Board with Demo Mode
              </h2>
              <p className="text-white-50 md:text-xl">
                A multi-user kanban board with GitHub OAuth, drag-and-drop
                columns, and live updates across clients via Socket.io rooms,
                backed by Postgres and Prisma. The live demo runs entirely in
                the browser — a seeded board with simulated collaborators and
                presence, no login required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowCaseSection;
