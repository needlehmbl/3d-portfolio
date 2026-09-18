# 3D Portfolio

Personal portfolio site for **Ernest** — a React-based single-page app with 3D scenes, GSAP scroll animations, and a dark theme.

Live: [needlehmbl.github.io/3d-portfolio](https://needlehmbl.github.io/3d-portfolio/)

## Featured Projects

| Project | Description | Links |
|---------|-------------|-------|
| **Job Scraper Dashboard** | Local job pipeline scraping Indeed/LinkedIn/JobStreet, with a React + FastAPI dashboard and one-click Playwright apply automation | [GitHub](https://github.com/needlehmbl/job-scraper) |
| **Media Manager** | Self-hosted media download manager: parallel yt-dlp queue with playlist recursion, metadata embedding and auto-resume, searchable library (FastAPI + React, Docker Compose) | [GitHub](https://github.com/needlehmbl/media-manager) |
| **Doc Pipeline** | Local offline document intelligence pipeline: ingest PDFs/images/CSVs, extract structured data with Ollama, validate schema + confidence, load into SQLite | [GitHub](https://github.com/needlehmbl/doc-pipeline) |
| **GoGoGhost** | 2D pixel puzzle-platformer (GODOT) | [GitHub](https://github.com/needlehmbl/go-go-ghost) |

Plus additional public repos auto-fetched from the GitHub API.

## Tech Stack

- **React 19** + **Vite**
- **Three.js** / **React Three Fiber** / **Drei** — 3D room scene & floating tech logos
- **GSAP** + **ScrollTrigger** — scroll-triggered reveals and word carousel
- **Tailwind CSS v4**
- **EmailJS** — contact form
- **react-countup** — animated stat counters

## Getting Started

```bash
git clone https://github.com/needlehmbl/3d-portfolio.git
cd 3d-portfolio
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Deployment

The site is deployed to **GitHub Pages** via a GitHub Actions workflow (`.github/workflows/deploy.yaml`). Push to `main` triggers an automatic build and deploy. The `base` path in `vite.config.js` is set to `/3d-portfolio/` for the GitHub Pages subdirectory.

## Project Structure

```
src/
├── components/       Reusable UI (Navbar, CertificatesModal, VideoShowcase, etc.)
├── constants/        Data arrays (nav links, credentials, tech stack icons)
├── sections/         Page sections (Hero, ShowCaseSection, MoreProjects, Contact, Footer)
└── main.jsx          Entry point
public/
├── images/           Project screenshots, icons, certificates
├── models/           GLB files for 3D scenes
└── videos/           Demo video files
```
