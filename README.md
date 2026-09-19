# Arooba Ali — Portfolio Website

A clean, recruiter-focused portfolio site built with plain HTML, CSS, and JavaScript
(plus Bootstrap 5 for layout/grid utilities and Bootstrap Icons).

## Project structure

```
portfolio/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── data.js      ← all your content lives here
│   └── script.js    ← renders data.js into the page + handles animations
├── assets/
│   └── images/
└── README.md
```

The site is **data-driven**: `index.html` contains empty containers (like
`<div id="skillsGrid">`), and `js/script.js` fills them in using the arrays and
objects defined in `js/data.js`. This means almost all routine edits — updating
a link, adding a project, adding a skill — happen in **one file**: `js/data.js`.

## 1. How to run it locally

No build tools or servers are required.

1. Open the `portfolio` folder in VS Code.
2. Open `index.html` directly in your browser (double-click it, or right-click →
   "Open with Live Server" if you have the Live Server VS Code extension installed).

That's it — the site is fully static.

## 2. Where to replace your personal links

Open `js/data.js` and edit the `PROFILE` object at the top:

| Field | Replace with |
|---|---|
| `github` | Your GitHub profile URL |
| `linkedin` | Your LinkedIn profile URL |
| `resume` | A link to your hosted resume (PDF) |
| `email` | Your email address |
| `portfolioUrl` | The final live URL of this site (used in the Open Graph tag in `index.html`) |

Every GitHub / LinkedIn / Resume / Email button or link across the whole site — hero,
"Explore My Work" banner, contact section, and footer — reads from this one object, so
you only edit it once and it updates everywhere automatically.

The only placeholder that still lives in `index.html` itself is `YOUR_PROFILE_IMAGE`
in the `<meta property="og:image">` tag (see point 4 below).

## 3. Where to add new projects, skills, or certifications

Everything lives in `js/data.js` — you do not need to touch `index.html` or write any
HTML. Each section has a commented example at the bottom of its array showing the shape
to copy:

- **New project** → add an object to the `PROJECTS` array (title, status, description,
  tags, implementation details, GitHub/demo links). Leave `demo: ""` to hide the demo
  button, e.g. for an Android project.
- **New skill category** → add an object to the `SKILLS` array (icon, title, list of items).
- **New certification** → add an object to the `CERTIFICATIONS` array.
- **New roadmap stage** → add an object to the `ROADMAP` array with `status` set to
  `"done"`, `"current"`, or `"upcoming"`.

The page rebuilds itself from these arrays on load — including the stats strip in the
hero (project count, completed count, skill areas, roadmap stages), which updates
automatically as you add items.

## 4. Where to add your certificate links

Also in `js/data.js`, inside the `CERTIFICATIONS` array — set the `link` field on each
entry to your certificate's verification URL.

## 5. Where to add your profile image

Place your image file inside `assets/images/` (e.g. `assets/images/profile.jpg`), then
reference it wherever you'd like it to appear — for example, you could add an `<img>` tag
to the hero section next to the code snippet card, or use it as the Open Graph image by
replacing `YOUR_PROFILE_IMAGE` in the `<meta property="og:image">` tag.

## 6. How to deploy with GitHub Pages

1. Create a new GitHub repository (e.g. `portfolio` or `yourusername.github.io`).
2. Push this folder's contents to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to "Deploy from a branch", choose the
   `main` branch and the `/ (root)` folder, then save.
5. GitHub will give you a live URL (usually `https://yourusername.github.io/portfolio/`
   or `https://yourusername.github.io/` if the repo is named `yourusername.github.io`).
6. Come back and set `portfolioUrl` in `js/data.js` (and `YOUR_PROFILE_IMAGE` in
   `index.html`, if used) to that link.

## Animations included

- Rotating "Focused on: Python / Machine Learning / ..." typewriter line in the hero
- A subtle scroll-progress bar at the top of the page
- Fade-and-rise reveal animations as sections scroll into view
- Count-up animation on the stats strip (project count, skills, roadmap stages)
- Project filter tabs (All / Completed / In Progress) with instant filtering
- Card lift-on-hover, button hover-shine, and smooth section scrolling
- All animations respect the OS-level "reduce motion" accessibility setting

## Notes

- All content reflects only what was provided — no fabricated statistics, testimonials,
  or work experience. The Experience section is intentionally left as an editable
  placeholder until real internship/work details are available. The stats strip numbers
  are computed live from your own data (project/skill counts), not invented figures.
- The design uses Space Grotesk (headings), IBM Plex Sans (body), and IBM Plex Mono
  (tags/labels/code), loaded from Google Fonts — an internet connection is needed the
  first time the page loads for fonts, Bootstrap, and Bootstrap Icons to load from their
  CDNs.
