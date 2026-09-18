// scripts/fetch-repos.mjs
// Fetches the GitHub repo list at build/refresh time and snapshots it to
// public/data/repos.json, so the site renders statically instead of relying
// on the unauthenticated GitHub API at runtime (60 req/hr per IP).
//
// Usage:
//   npm run fetch-repos
//   GITHUB_TOKEN=ghp_xxx npm run fetch-repos   # higher rate limit
//
// Re-run whenever you want the "More Projects" section refreshed, then commit.

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const USER = "Needleeeeeeee";
const EXCLUDE = [
  "3d-portfolio",
  "glowpoint-client",
  "glowpoint-dashboard",
  "go-go-ghost",
  "nasa-react-app",
  "TPWeb",
  "job-scraper",
  "media-manager",
];

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = join(root, "public", "data", "repos.json");

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "3d-portfolio-fetch-repos",
};
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

try {
  const res = await fetch(
    `https://api.github.com/users/${USER}/repos?sort=updated&per_page=100`,
    { headers }
  );
  if (!res.ok) {
    throw new Error(`GitHub API responded with HTTP ${res.status}`);
  }
  const data = await res.json();
  if (!Array.isArray(data)) {
    throw new Error(`Unexpected GitHub API response: ${JSON.stringify(data).slice(0, 200)}`);
  }

  const repos = data
    .filter((r) => !r.fork && !EXCLUDE.includes(r.name))
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .map((r) => ({
      id: r.id,
      name: r.name,
      html_url: r.html_url,
      description: r.description,
      language: r.language,
      stargazers_count: r.stargazers_count,
      pushed_at: r.pushed_at,
    }));

  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, JSON.stringify(repos, null, 2) + "\n");
  console.log(`Wrote ${repos.length} repos to public/data/repos.json`);
} catch (err) {
  // Never break a build/deploy over a refresh failure if we have a snapshot.
  try {
    await readFile(outPath);
    console.warn(`fetch-repos: ${err.message}. Keeping existing public/data/repos.json.`);
    process.exit(0);
  } catch {
    console.error(`fetch-repos: ${err.message}. No existing snapshot to fall back on.`);
    process.exit(1);
  }
}
