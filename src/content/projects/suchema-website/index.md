---
title: "suchema.com"
description: "My personal website — built with Astro, vanilla CSS, and a love for good typography."
pubDate: 2026-02-15
thumbnail: ./thumbnail.jpg
headerImage: ./header.jpg
url: "https://www.suchema.com"
tags: ["astro", "web", "design"]
featured: true
draft: false
---

The site you're looking at right now. Built from scratch as a place to write, share projects, and have a proper home on the web.

## Goals

- **Speed first** — static HTML, zero client-side JavaScript (except a tiny theme toggle)
- **Beautiful typography** — Newsreader + Inter, carefully scaled
- **Easy content authoring** — drop a Markdown file in a folder and it appears
- **Dark mode** — respects system preference, with a manual toggle
- **Flexible analytics** — not locked into any provider

## Tech stack

- **Astro** — static site generator
- **Vanilla CSS** — custom properties, no framework
- **Self-hosted fonts** — no external requests
- **Content collections** — Zod-validated Markdown with co-located images

## What I learned

Building your own site from scratch is a great way to explore new tools. Astro's content collections with Zod validation are excellent — they catch frontmatter errors at build time, and the co-located image pattern means each post is a self-contained folder.
