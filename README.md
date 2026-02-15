# suchema.com

Personal website and blog built with [Astro](https://astro.build). Static, fast, zero client-side JavaScript (except a tiny theme toggle).

## Quick Start

```bash
npm install
npm run dev        # Start dev server at localhost:4321
npm run build      # Build for production into dist/
npm run preview    # Preview production build locally
```

## Tech Stack

- **Astro** — static site generator, zero JS by default
- **Vanilla CSS** — custom properties, no framework
- **Newsreader + Inter** — self-hosted variable fonts
- **Content Collections** — Markdown with Zod-validated frontmatter

## Directory Structure

```
src/
├── components/          # Reusable Astro components
├── content/
│   ├── posts/           # Blog posts (Markdown)
│   └── projects/        # Project showcases (Markdown)
├── data/
│   ├── cv.json          # Structured CV data (single source of truth)
│   └── links.json       # Social links
├── layouts/             # Page layout templates
├── pages/               # File-based routing
├── styles/
│   ├── global.css       # Typography, layout, prose styles
│   ├── theme.css        # Light/dark color tokens
│   └── cv-print.css     # Print-optimised CV styles
└── content.config.ts    # Content collection schemas
```

## Adding Content

### New Blog Post

1. Create a folder under `src/content/posts/`:

```
src/content/posts/my-new-post/
├── index.md          # Your post content
├── thumbnail.jpg     # 800x450 — used for social sharing / OG
└── header.jpg        # 1400x700 — displayed at top of post
```

2. Write frontmatter + Markdown:

```markdown
---
title: "My Post Title"
description: "A brief description for listings and SEO"
pubDate: 2026-03-01
thumbnail: ./thumbnail.jpg
headerImage: ./header.jpg
tags: ["technology", "music"]
draft: false
---

Your content here. Standard Markdown — headings, links, images, code blocks, etc.
```

3. Run `npm run dev` — the post appears at `/posts/my-new-post/`.

### New Project

Same pattern, under `src/content/projects/`:

```markdown
---
title: "Project Name"
description: "What this project is"
pubDate: 2026-03-01
thumbnail: ./thumbnail.jpg
headerImage: ./header.jpg
url: "https://example.com"          # optional: live URL
repo: "https://github.com/you/repo" # optional: source code
tags: ["web", "react"]
featured: true                       # show on home page
draft: false
---
```

### Draft Posts

Set `draft: true` in frontmatter — the post won't appear in production builds but will show during development.

## CV Management

The CV uses a single-source-of-truth approach: edit `src/data/cv.json` and all three formats update.

- **HTML** — rendered at `/cv` with download buttons
- **PDF** — open `/cv-print` in the browser and use Print > Save as PDF
- **Word** — generated programmatically from `cv.json`

To regenerate the Word document:

```bash
npm run generate:cv-docx
```

This runs automatically as part of `npm run build`.

## Analytics

Edit `src/components/Analytics.astro` — it contains commented examples for:

- Google Analytics (GA4)
- Plausible Analytics
- Fathom Analytics
- Umami (self-hosted)

Uncomment your provider and add your tracking ID. Analytics only load in production builds.

## Dark/Light Mode

- Respects system preference by default
- Manual toggle persists via `localStorage`
- Colors defined as CSS custom properties in `src/styles/theme.css`
- Inline script in `<head>` prevents flash of wrong theme

To adjust colours, edit the custom properties in `theme.css`.

## Deployment

`npm run build` produces a `dist/` folder of static HTML, CSS, and images. Deploy anywhere:

- **Vercel** — `npx vercel` or connect your Git repo
- **Netlify** — `npx netlify deploy` or connect your Git repo
- **Cloudflare Pages** — connect Git repo, build command: `npm run build`, output: `dist`
- **Any static host** — upload the `dist/` folder

## Image Recommendations

| Image | Size | Ratio | Used for |
|-------|------|-------|----------|
| Post thumbnail | 800x450 | 16:9 | OG/social sharing |
| Post header | 1400x700 | 2:1 | Hero image on post page |
| Project thumbnail | 800x450 | 16:9 | Project card on listings |
| Project header | 1400x700 | 2:1 | Hero image on project page |

Astro optimises images automatically (WebP/AVIF, responsive srcset, lazy loading).
