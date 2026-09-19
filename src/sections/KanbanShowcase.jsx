import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const DEMO_URL = "https://needlehmbl.github.io/kanban-demo/";
const REPO_URL = "https://github.com/needlehmbl/kanban";

const TECHS = [
  "Node.js",
  "Express",
  "Socket.io",
  "Prisma",
  "PostgreSQL",
  "React",
  "Docker",
];

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

// Standalone full-width feature section for the kanban board.
// Lives outside ShowCaseSection so it is not constrained by the
// app-showcase / showcaselayout boxes.
const KanbanShowcase = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom -=100",
          once: true,
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="w-full px-5 md:px-20 py-10 md:py-14">
      <div ref={cardRef} className="card-border rounded-2xl p-4 md:p-8 flex flex-col gap-8">
        <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-black-100 border border-black-50">
          <div className="absolute inset-0 flex-col-center gap-4 text-center px-4">
            <p className="text-white-50 text-sm uppercase tracking-widest">
              Real-time Kanban
            </p>
            <p className="text-white text-2xl md:text-4xl font-semibold">
              Drag, drop &amp; sync — no login needed
            </p>
            <a
              href={DEMO_URL}
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
            {TECHS.map((tech) => (
              <span
                key={tech}
                className="bg-black-200 py-1 px-3 rounded-full text-sm text-white-50"
              >
                {tech}
              </span>
            ))}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            <TitleLink href={REPO_URL}>Kanban Board</TitleLink>
            : Real-Time Collaborative Board with Demo Mode
          </h2>
          <p className="text-white-50 md:text-xl">
            A multi-user kanban board with GitHub OAuth, drag-and-drop columns,
            and live updates across clients via Socket.io rooms, backed by
            Postgres and Prisma. The live demo runs entirely in the browser —
            a seeded board with simulated collaborators and presence, no login
            required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default KanbanShowcase;
