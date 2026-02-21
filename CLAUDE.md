# CLAUDE.md — Academic Pages Jekyll Template

## Overview

This is an **Academic Pages** personal portfolio website built with **Jekyll** and hosted on **GitHub Pages**. It is forked from the [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/) Jekyll theme and extended with academic-specific content types: publications, talks, teaching, portfolio, blog posts, and a dynamically-generated CV.

**Repository:** `ruthfriedlander.github.io`
**URL pattern:** `https://ruthfriedlander.github.io/`
**Engine:** Jekyll (Ruby) with GitHub Pages deployment
**Theme base:** Minimal Mistakes (customized)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Static site generator | Jekyll |
| Language | Ruby (Gemfile), Liquid templates, Markdown, HTML |
| Styling | SCSS/Sass (in `_sass/`, compiled to CSS) |
| JavaScript | Vanilla JS + plugins (in `assets/js/`) |
| Deployment | GitHub Pages via GitHub Actions (`.github/workflows/jekyll-gh-pages.yml`) |
| Content format | Markdown with YAML front matter |
| Math rendering | MathJax (delimiters: `$$...$$` and `\\[...\\]`) |
| Diagrams | Mermaid |
| Plotting | Plotly.js |
| Package manager | Bundler (Ruby), npm (JS tooling) |

### Key Dependencies (Gemfile)

- `jekyll` — core static site generator
- `jekyll-feed` — Atom/RSS feed generation
- `jekyll-sitemap` — automatic sitemap.xml
- `jekyll-redirect-from` — redirect pages
- `jemoji` — GitHub-style emoji support
- `github-pages` — GitHub Pages compatibility gem
- `webrick` — local dev server

---

## Directory Structure

```
├── _config.yml          # Master site configuration (RESTART Jekyll on change)
├── _config_docker.yml   # Docker override config
├── _data/               # Structured data files
│   ├── navigation.yml   # Header nav menu links
│   ├── cv.json          # JSON Resume format for CV page
│   ├── authors.yml      # Author metadata
│   ├── ui-text.yml      # UI string translations
│   └── comments/        # Staticman comment data
├── _includes/           # Reusable HTML/Liquid partials (35+ files)
├── _layouts/            # Page layout templates (8 layouts)
├── _pages/              # Standalone pages (19 pages)
├── _posts/              # Blog posts (date-prefixed markdown)
├── _publications/       # Publication entries (date-prefixed markdown)
├── _talks/              # Talk/presentation entries
├── _teaching/           # Teaching experience entries
├── _portfolio/          # Portfolio project entries
├── _drafts/             # Unpublished draft posts
├── _sass/               # SCSS stylesheets (121 files)
├── assets/              # Compiled CSS, JS, fonts, webfonts
├── files/               # Downloadable files (PDFs, BibTeX, etc.)
├── images/              # Site images (profile pics, screenshots)
├── markdown_generator/  # Python/Jupyter scripts for bulk content generation
├── scripts/             # Utility scripts
├── talkmap/             # Talk map visualization files
└── .github/workflows/   # GitHub Actions (jekyll-gh-pages.yml, scrape_talks.yml)
```

---

## Configuration (`_config.yml`)

The master config is `_config.yml`. **Jekyll must be restarted** (not just refreshed) when this file changes.

### Key Settings to Customize

| Setting | Purpose |
|---------|---------|
| `title` | Site title in browser tab and header |
| `name` | Used as YAML anchor `&name` throughout |
| `description` | Default meta description for SEO |
| `url` | Base URL (e.g. `https://ruthfriedlander.github.io`) |
| `repository` | GitHub repo path for edit links |
| `author.*` | Sidebar profile: avatar, name, bio, location, social links |
| `site_theme` | Theme variant: `default`, `air`, `sunrise`, `mint`, `dirt`, `contrast` |
| `publication_category` | Groups publications by category heading |

### Author Profile Social Links

The `author:` block in `_config.yml` controls sidebar icons. Fields include:
- **Academic:** `googlescholar`, `orcid`, `arxiv`, `pubmed`, `researchgate`, `scopus`, `academia`, `ssrn`, `semantic`, `zotero`
- **Dev:** `github`, `bitbucket`, `codepen`, `kaggle`, `stackoverflow`
- **Social:** `linkedin`, `twitter`, `bluesky`, `mastodon`, `instagram`, `youtube`, `medium`, `facebook`

Leave a field blank/commented to hide its icon.

### Collections

Four custom collections are defined (in addition to `_posts`):

```yaml
collections:
  teaching:    { output: true, permalink: /:collection/:path/ }
  publications: { output: true, permalink: /:collection/:path/ }
  portfolio:   { output: true, permalink: /:collection/:path/ }
  talks:       { output: true, permalink: /:collection/:path/ }
```

### Publication Categories

Publications can be grouped by category header on the publications page:

```yaml
publication_category:
  books:        { title: 'Books' }
  manuscripts:  { title: 'Journal Articles' }
  conferences:  { title: 'Conference Papers' }
```

Each publication's `category` front matter field must match a key here.

---

## Layout Hierarchy

```
compress.html          ← HTML minification wrapper
  └── default.html     ← Base HTML shell (head, masthead, footer, scripts)
        ├── single.html      ← Individual content pages (posts, publications, etc.)
        ├── archive.html     ← List/archive pages
        ├── talk.html        ← Talk-specific single page
        ├── splash.html      ← Splash/landing page
        ├── cv-layout.html   ← JSON Resume CV renderer
        └── archive-taxonomy.html  ← Tag/category archive
```

### Default Layout Chain

`default.html` includes: `head.html` → `head/custom.html` → `browser-upgrade.html` → `masthead.html` → `{{ content }}` → `footer/custom.html` → `footer.html` → `scripts.html`

---

## Navigation

Header navigation is configured in `_data/navigation.yml`:

```yaml
main:
  - title: "Publications"  → /publications/
  - title: "Talks"         → /talks/
  - title: "Teaching"      → /teaching/
  - title: "Portfolio"     → /portfolio/
  - title: "Blog Posts"    → /year-archive/
  - title: "CV"            → /cv/
  - title: "Guide"         → /markdown/
```

Remove entries to hide them from the header. The page files still exist but won't be linked.

---

## Content Collections & Front Matter

### Blog Posts (`_posts/`)

**Filename pattern:** `YYYY-MM-DD-slug.md`
**Default layout:** `single`

```yaml
---
title: 'Post Title'
date: 2012-08-14
permalink: /posts/2012/08/blog-post-1/
tags:
  - tag1
  - tag2
---
```

### Publications (`_publications/`)

**Filename pattern:** `YYYY-MM-DD-slug.md`
**Default layout:** `single`

```yaml
---
title: "Paper Title"
collection: publications
category: manuscripts          # Must match a key in publication_category
permalink: /publication/YYYY-MM-DD-slug
excerpt: 'Short description'
date: 2009-10-01
venue: 'Journal Name'
slidesurl: 'https://example.com/slides.pdf'    # optional
paperurl: 'https://example.com/paper.pdf'       # optional
bibtexurl: 'https://example.com/bibtex.bib'     # optional
citation: 'Author. (Year). &quot;Title.&quot; <i>Journal</i>. 1(1).'
---
```

### Talks (`_talks/`)

**Filename pattern:** `YYYY-MM-DD-slug.md`
**Default layout:** `talk`

```yaml
---
title: "Talk Title"
collection: talks
type: "Talk"                   # or "Tutorial", "Conference Proceeding"
permalink: /talks/YYYY-MM-DD-slug
venue: "Institution, Department"
date: 2012-03-01
location: "City, State, Country"
---
```

### Teaching (`_teaching/`)

**Filename pattern:** `YYYY-term-slug.md`
**Default layout:** `single`

```yaml
---
title: "Course Title"
collection: teaching
type: "Undergraduate course"   # or "Workshop", "Graduate course"
permalink: /teaching/YYYY-term-slug
venue: "University, Department"
date: 2014-01-01
location: "City, Country"
---
```

### Portfolio (`_portfolio/`)

**Filename:** `portfolio-N.md` or `.html`
**Default layout:** `single`

```yaml
---
title: "Project Title"
excerpt: "Short description<br/><img src='/images/thumbnail.png'>"
collection: portfolio
---
```

---

## Key Pages (`_pages/`)

| File | URL | Purpose |
|------|-----|---------|
| `about.md` | `/` | **Homepage** (also redirects from `/about/`) |
| `publications.html` | `/publications/` | Lists all publications, grouped by category |
| `talks.html` | `/talks/` | Lists all talks |
| `teaching.html` | `/teaching/` | Lists all teaching entries |
| `portfolio.html` | `/portfolio/` | Grid of portfolio items |
| `cv.md` | `/cv/` | Manual CV (Markdown) with Liquid loops for collections |
| `cv-json.md` | `/cv-json/` | Auto-generated CV from `_data/cv.json` (JSON Resume) |
| `year-archive.html` | `/year-archive/` | Blog posts by year |
| `markdown.md` | `/markdown/` | Markdown formatting guide/reference |
| `404.md` | `/404.html` | Custom 404 page |
| `sitemap.md` | `/sitemap/` | HTML sitemap |
| `talkmap.html` | `/talkmap/` | Interactive map of talk locations |

---

## CV System

Two CV options exist (only one should be active in navigation):

1. **Markdown CV** (`_pages/cv.md`) — Manually written with Liquid includes that loop through `site.publications`, `site.talks`, `site.teaching` to auto-list those items.

2. **JSON Resume CV** (`_pages/cv-json.md`) — Uses `cv-layout` layout to render `_data/cv.json` (follows [JSON Resume](https://jsonresume.org/) schema) with the `_includes/cv-template.html` partial.

---

## Key Include Files

| Include | Purpose |
|---------|---------|
| `author-profile.html` | Sidebar with avatar, name, bio, social links |
| `archive-single.html` | Renders a single item in a collection list |
| `archive-single-cv.html` | Compact version for CV page lists |
| `archive-single-talk.html` | Talk-specific list item |
| `archive-single-talk-cv.html` | Talk item for CV lists |
| `masthead.html` | Top navigation bar |
| `head.html` | `<head>` tag contents (meta, CSS) |
| `footer.html` | Site footer |
| `seo.html` | SEO meta tags, Open Graph, JSON-LD |
| `comments.html` | Comment system integration |
| `cv-template.html` | JSON Resume renderer |
| `social-share.html` | Social sharing buttons |
| `post_pagination.html` | Previous/next post navigation |

---

## Downloadable Files (`files/`)

Static files served at `https://[username].github.io/files/filename`:
- PDFs: `paper1.pdf`, `paper2.pdf`, `paper3.pdf`
- Slides: `slides1.pdf`, `slides2.pdf`, `slides3.pdf`
- BibTeX: `bibtex1.bib`

Upload any file here for direct URL access.

---

## Markdown Generator (`markdown_generator/`)

Python/Jupyter tools for bulk content generation from spreadsheets:

| File | Purpose |
|------|---------|
| `publications.ipynb` / `.py` | Generate `_publications/` entries from `publications.tsv` / `.csv` |
| `talks.ipynb` / `.py` | Generate `_talks/` entries from `talks.tsv` |
| `PubsFromBib.ipynb` / `.py` | Generate publications from BibTeX files |
| `OrcidToBib.ipynb` | Fetch bibliography from ORCID |

---

## Styling (`_sass/`)

121 SCSS files organized by the Minimal Mistakes theme structure. Main entry point is `assets/css/main.scss` which imports from `_sass/`. The config controls Sass compilation:

```yaml
sass:
  sass_dir: _sass
  style: compressed
```

---

## Deployment

### GitHub Actions

- **`.github/workflows/jekyll-gh-pages.yml`** — Builds and deploys the site to GitHub Pages on push.
- **`.github/workflows/scrape_talks.yml`** — Scrapes talk data (utility workflow).

### Docker (Local Dev)

```bash
docker compose up    # Serves at localhost:4000
```

### Local Dev (Without Docker)

```bash
bundle install
jekyll serve -l -H localhost    # or: bundle exec jekyll serve -l -H localhost
# Serves at localhost:4000, live-reloads on .md/.html changes
```

---

## Important Conventions

1. **Filename dates matter** — Collection items use `YYYY-MM-DD-` prefix for sorting.
2. **Permalinks are explicit** — Each content file defines its own `permalink` in front matter.
3. **`collection:` front matter** — Collection items should declare their collection name.
4. **Leave fields blank to hide** — Empty author profile fields hide their sidebar icons.
5. **HTML in excerpts** — Portfolio excerpts support inline HTML (`<br/>`, `<img>`).
6. **MathJax delimiters** — Use `$$...$$` (not `$...$`) for inline/display math.
7. **`future: true`** — Posts with future dates are still published (set in `_config.yml`).
8. **HTML compression** — The `compress` layout minifies HTML output in production.
9. **Comments** — Supports Disqus, Discourse, Facebook, Staticman, or custom providers (configured in `_config.yml`).
