// src/sections/MoreProjects.jsx
import { useEffect, useState } from "react";

const EXCLUDE = ["3d-portfolio" , "glowpoint-client", "glowpoint-dashboard", "go-go-ghost" , "nasa-react-app", "TPWeb", "job-scraper"];

const MoreProjects = () => {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch("https://api.github.com/users/Needleeeeeeee/repos?sort=updated&per_page=100")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data
          .filter((r) => !r.fork && !EXCLUDE.includes(r.name))
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
        setRepos(filtered);
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  }, []);

  if (status === "error") return null;

  return (
    <section id="more-projects" className="w-full mt-20 px-5 md:px-20 py-10">
      <h2 className="text-3xl font-semibold mb-10">More Projects</h2>
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
    </section>
  );
};

export default MoreProjects;
