// src/sections/MoreProjects.jsx
import { useEffect, useRef, useState } from "react";

const EXCLUDE = ["3d-portfolio" , "glowpoint-client", "glowpoint-dashboard", "go-go-ghost" , "nasa-react-app", "TPWeb", "job-scraper"];

const SkeletonGrid = () => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="block p-5 rounded-xl bg-white/5 animate-pulse min-h-36"
      >
        <div className="h-5 w-2/3 rounded bg-white/10" />
        <div className="h-3 w-full rounded bg-white/10 mt-4" />
        <div className="h-3 w-5/6 rounded bg-white/10 mt-2" />
      </div>
    ))}
  </div>
);

const MoreProjects = () => {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("loading");
  const sectionRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || startedRef.current) return;

    const load = (signal) => {
      startedRef.current = true;
      fetch("https://api.github.com/users/Needleeeeeeee/repos?sort=updated&per_page=100", { signal })
        .then((res) => res.json())
        .then((data) => {
          const filtered = Array.isArray(data)
            ? data
                .filter((r) => !r.fork && !EXCLUDE.includes(r.name))
                .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
            : [];
          setRepos(filtered);
          setStatus("done");
        })
        .catch((err) => {
          if (err?.name === "AbortError") return;
          setStatus("error");
        });
    };

    // Only hit the network once this section is near the viewport,
    // so scrolling to it doesn't jank on initial page load.
    if (typeof IntersectionObserver === "undefined") {
      const controller = new AbortController();
      load(controller.signal);
      return () => controller.abort();
    }

    const controller = new AbortController();
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          load(controller.signal);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      controller.abort();
    };
  }, []);

  if (status === "error") return null;

  return (
    <section id="more-projects" ref={sectionRef} className="w-full mt-20 px-5 md:px-20 py-10 min-h-[40vh]">
      <h2 className="text-3xl font-semibold mb-10">More Projects</h2>
      {status === "loading" ? (
        <SkeletonGrid />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="block p-5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <h3 className="text-lg font-medium">{repo.name}</h3>
              <p className="text-white-50 text-sm mt-2 line-clamp-3">
                {repo.description || "No description provided."}
              </p>
              <div className="flex gap-4 mt-4 text-xs text-white-50">
                {repo.language && <span>{repo.language}</span>}
                <span>★ {repo.stargazers_count}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default MoreProjects;
