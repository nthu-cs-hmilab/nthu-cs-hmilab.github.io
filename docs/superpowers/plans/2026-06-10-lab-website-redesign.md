# HMI Lab Website UI/UX Polish — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the HMI Lab website to professional, academic-grade quality — fix tech bugs, add design tokens, and upgrade every section's visual hierarchy without changing brand colors or content.

**Architecture:** All changes land in three files at the repo root: `index.html` (structure), `assets/css/creative-studio.css` (styles, edited directly — no Gulp build required), and `assets/js/creative-studio.js` (album filter). The Gulp config in `gulpfile.js` targets a `public_html/` directory that does not exist; ignore it entirely.

**Tech Stack:** Bootstrap 4 (local vendors at `assets/vendors/bootstrap/`), Fira Sans via Google Fonts, vanilla JS (jQuery already loaded for smooth scroll), GitHub Pages static hosting.

---

## Serving the site locally

Every verification step assumes the site is served over HTTP so backdrop-filter and font loading work correctly:

```bash
python3 -m http.server 8080 --directory /Users/kaixin/nthu-cs-hmilab.github.io
# open http://localhost:8080
```

Leave this running throughout all tasks.

---

## Task 1: Bug fixes — Fira Sans, duplicate Bootstrap JS, affix animation

**Files:**
- Modify: `index.html`
- Modify: `assets/css/creative-studio.css`

- [ ] **Step 1: Verify current broken state**

  Open `http://localhost:8080`. In DevTools → Network → Fonts tab: confirm no Fira Sans request fires (body text is system sans-serif). Scroll past the hero: confirm the navbar slides in from far off-screen (the overshoot bug). These are the things this task fixes.

- [ ] **Step 2: Add Google Fonts preconnect + Fira Sans link**

  In `index.html`, insert these three lines immediately before the `<link rel="stylesheet" href="assets/vendors/themify-icons/...">` line (currently line 17):

  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
  ```

- [ ] **Step 3: Remove the Bootstrap 5 CDN script tag**

  In `index.html`, delete this exact line (currently line 1118):

  ```html
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  ```

- [ ] **Step 4: Convert Bootstrap 5 data attributes → Bootstrap 4 throughout index.html**

  There are 6 occurrences of `data-bs-*` — the album collapse toggle and five team-group collapse toggles. Replace all of them:

  | Find | Replace |
  |------|---------|
  | `data-bs-toggle="collapse"` | `data-toggle="collapse"` |
  | `data-bs-target="#albumList"` | `data-target="#albumList"` |
  | `data-bs-target="#phdCollapse"` | `data-target="#phdCollapse"` |
  | `data-bs-target="#graduateCollapse"` | `data-target="#graduateCollapse"` |
  | `data-bs-target="#undergraduateCollapse"` | `data-target="#undergraduateCollapse"` |
  | `data-bs-target="#raCollapse"` | `data-target="#raCollapse"` |
  | `data-bs-target="#alumniCollapse"` | `data-target="#alumniCollapse"` |

- [ ] **Step 5: Fix the affix animation overshoot in CSS**

  In `assets/css/creative-studio.css`, find the `@keyframes affix` block (around line 9828) and replace it entirely:

  ```css
  @keyframes affix {
    from {
      top: -72px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
  ```

- [ ] **Step 6: Verify**

  Hard-reload `http://localhost:8080`. In DevTools → Network → Fonts: confirm `Fira+Sans` requests appear. Scroll past the hero: navbar slides in smoothly from just above the viewport. Click "PhD Student" in Team section: still expands/collapses. Click "HMI Gallery" in Album section: still expands/collapses.

- [ ] **Step 7: Commit**

  ```bash
  git -C /Users/kaixin/nthu-cs-hmilab.github.io add index.html assets/css/creative-studio.css
  git -C /Users/kaixin/nthu-cs-hmilab.github.io commit -m "fix: load Fira Sans, remove duplicate Bootstrap 5, fix affix animation"
  ```

---

## Task 2: Design tokens — add CSS custom properties to :root

**Files:**
- Modify: `assets/css/creative-studio.css` (`:root` block, currently lines 15–44)

- [ ] **Step 1: Add tokens to the existing `:root` block**

  In `creative-studio.css`, find the closing `}` of the `:root` block (after `--font-family-monospace: ...;` on line 43). Insert before that closing brace:

  ```css
    --primary-50:   #fff0f3;
    --primary-100:  #ffe4ea;
    --primary-200:  #ffc5d0;
    --border:       #e5e7eb;
    --border-light: #f0f0f4;
    --radius-card:  12px;
    --shadow-card:  0 1px 3px rgba(15,23,42,0.05), 0 1px 2px rgba(15,23,42,0.04);
    --shadow-hover: 0 4px 16px rgba(15,23,42,0.10);
  ```

- [ ] **Step 2: Verify**

  In DevTools → Elements → select `<html>` → Computed styles, confirm `--primary-50` appears with value `#fff0f3`.

- [ ] **Step 3: Commit**

  ```bash
  git -C /Users/kaixin/nthu-cs-hmilab.github.io add assets/css/creative-studio.css
  git -C /Users/kaixin/nthu-cs-hmilab.github.io commit -m "feat: add design tokens to CSS :root"
  ```

---

## Task 3: Navigation polish — frosted glass, CTA button, scroll progress

**Files:**
- Modify: `assets/css/creative-studio.css`
- Modify: `index.html` (scroll progress bar inline style)

- [ ] **Step 1: Frosted glass — floating state**

  In `creative-studio.css`, find the `.custom-navbar` rule that sets `min-height`, `position: absolute`, `top: 30px` etc. (around line 9743). Add `background`, `backdrop-filter`, and update the `border` to be subtler:

  Find:
  ```css
  .custom-navbar {
    min-height: 70px;
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    margin: auto;
    width: 95%;
    max-width: 1050px;
    border: 1px solid rgba(234, 240, 252, 0.15);
    border-radius: 0.2rem;
    z-index: 9999;
    transition: all, 0.33s;
  }
  ```

  Replace with:
  ```css
  .custom-navbar {
    min-height: 70px;
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    margin: auto;
    width: 95%;
    max-width: 1050px;
    background: rgba(12, 12, 24, 0.78);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 0.2rem;
    z-index: 9999;
    transition: all, 0.33s;
  }
  ```

- [ ] **Step 2: Frosted glass — affixed state**

  Find `.custom-navbar.affix` (around line 9802). Replace:

  ```css
  .custom-navbar.affix {
    position: fixed;
    width: 100%;
    max-width: 100%;
    background: #fff;
    animation-name: affix;
    animation-duration: 0.6s;
    top: 0;
    border-radius: 0;
    border-bottom: 1px solid #eaf0fc;
  }
  ```

  With:

  ```css
  .custom-navbar.affix {
    position: fixed;
    width: 100%;
    max-width: 100%;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    animation-name: affix;
    animation-duration: 0.6s;
    top: 0;
    border-radius: 0;
    border-bottom: 1px solid var(--border-light);
    box-shadow: 0 1px 0 var(--border-light), 0 2px 12px rgba(15, 23, 42, 0.06);
  }
  ```

- [ ] **Step 3: CTA button — rounded-rect + shadow**

  Find `.custom-navbar .nav-cta` (around line 9916). Replace:

  ```css
  .custom-navbar .nav-cta {
    background: #ff214f !important;
    color: #fff !important;
    border-radius: 999px;
    padding: 6px 18px !important;
    font-weight: 600;
    transition: background 0.2s ease;
    margin-left: 6px;
  }
  ```

  With:

  ```css
  .custom-navbar .nav-cta {
    background: #ff214f !important;
    color: #fff !important;
    border-radius: 8px;
    padding: 6px 18px !important;
    font-weight: 600;
    transition: background 0.2s ease, box-shadow 0.2s ease;
    margin-left: 6px;
    box-shadow: 0 2px 8px rgba(255, 33, 79, 0.25);
  }
  ```

- [ ] **Step 4: Scroll progress bar — gradient + thinner**

  In `index.html`, find the `<div id="scroll-progress" ...>` element (around line 106). Replace its inline `style` attribute:

  ```html
  <div id="scroll-progress" style="position:absolute;bottom:0;left:0;height:2px;width:0%;background:linear-gradient(90deg,#ff214f,#ff6b8a);transition:width 0.1s linear;z-index:1;border-radius:1px;"></div>
  ```

- [ ] **Step 5: Verify**

  Reload. At the top of the page the navbar should be slightly translucent over the hero image. Scroll past the hero: a frosted-glass white bar slides in smoothly. The Contact CTA has a subtle red glow. The scroll progress bar is 2px with a gradient.

- [ ] **Step 6: Commit**

  ```bash
  git -C /Users/kaixin/nthu-cs-hmilab.github.io add index.html assets/css/creative-studio.css
  git -C /Users/kaixin/nthu-cs-hmilab.github.io commit -m "feat: frosted glass navbar, CTA rounded-rect, gradient scroll bar"
  ```

---

## Task 4: Section tag — dot accent + border

**Files:**
- Modify: `assets/css/creative-studio.css`

- [ ] **Step 1: Replace `.section-tag` rule**

  Find `.section-tag` (around line 8981). Replace the entire block:

  ```css
  .section-tag {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #ff214f;
    background: #fff5f7;
    padding: 4px 14px;
    border-radius: 999px;
    margin-bottom: 14px;
  }
  ```

  With:

  ```css
  .section-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #ff214f;
    background: var(--primary-50);
    padding: 4px 12px 4px 10px;
    border-radius: 999px;
    margin-bottom: 14px;
    border: 1px solid rgba(255, 33, 79, 0.14);
  }
  .section-tag::before {
    content: '';
    width: 6px;
    height: 6px;
    background: #ff214f;
    border-radius: 50%;
    flex-shrink: 0;
  }
  ```

- [ ] **Step 2: Verify**

  Reload. Every section label (About, Research, Album, People, Collaborators, News) should show a small red dot to the left of the text, with a faint red-tinted border around the pill.

- [ ] **Step 3: Commit**

  ```bash
  git -C /Users/kaixin/nthu-cs-hmilab.github.io add assets/css/creative-studio.css
  git -C /Users/kaixin/nthu-cs-hmilab.github.io commit -m "feat: section tag dot accent and subtle border"
  ```

---

## Task 5: Highlight card icons — ring container

**Files:**
- Modify: `index.html` (3 icon elements in `.lab-highlights`)
- Modify: `assets/css/creative-studio.css`

- [ ] **Step 1: Wrap icons in `index.html`**

  In the `.lab-highlights` section (around lines 138–156), replace the three `.box-item` blocks with:

  ```html
  <div class="box-item">
    <div class="box-icon-wrap">
      <i class="ti-heart-broken" aria-hidden="true"></i>
    </div>
    <h6 class="box-title">Digital Health</h6>
    <p class="box-text">AI systems for clinically meaningful healthcare applications.</p>
  </div>
  <div class="box-item">
    <div class="box-icon-wrap">
      <i class="ti-pulse" aria-hidden="true"></i>
    </div>
    <h6 class="box-title">AI for Medicine</h6>
    <p class="box-text">Trustworthy learning from medical images, signals, and records.</p>
  </div>
  <div class="box-item">
    <div class="box-icon-wrap">
      <i class="ti-user" aria-hidden="true"></i>
    </div>
    <h6 class="box-title">Human-Machine Interaction</h6>
    <p class="box-text">Human-centered interfaces guided by cognition and neural feedback.</p>
  </div>
  ```

- [ ] **Step 2: Replace the icon CSS rule and add `.box-icon-wrap`**

  In `creative-studio.css`, find `.lab-highlights .box-item i` (around line 9256, the rule that sets `font-size: 50px; color: #ff214f; display: inline-block; margin-bottom: 25px; font-weight: 100`). Replace that entire rule with:

  ```css
  .box-icon-wrap {
    width: 48px;
    height: 48px;
    background: var(--primary-50);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 18px;
    box-shadow: 0 0 0 6px var(--primary-50);
  }
  .box-icon-wrap i {
    font-size: 22px;
    color: #ff214f;
    margin: 0;
    display: block;
    font-weight: 400;
  }
  ```

- [ ] **Step 3: Verify**

  Reload. The three cards below the hero should each show a compact 48px rose-tinted icon container with a soft outer ring, instead of the large raw icon.

- [ ] **Step 4: Commit**

  ```bash
  git -C /Users/kaixin/nthu-cs-hmilab.github.io add index.html assets/css/creative-studio.css
  git -C /Users/kaixin/nthu-cs-hmilab.github.io commit -m "feat: highlight card icon ring wrapper"
  ```

---

## Task 6: Collaborator logos — card frame

**Files:**
- Modify: `index.html` (11 items in `#testimonial`)
- Modify: `assets/css/creative-studio.css`

- [ ] **Step 1: Replace the entire collaborator row in `index.html`**

  Find the `<div class="row text-center justify-content-center">` inside `<section id="testimonial">` and replace its contents with:

  ```html
  <div class="row text-center justify-content-center">

    <div class="col-lg-2 col-md-4 col-6 collab-col">
      <div class="collab-logo-frame">
        <img src="assets/imgs/collaborator/tcvgh.png" alt="Taichung Veterans General Hospital logo" loading="lazy">
      </div>
      <p class="collab-caption">Taichung Veterans General Hospital, Taiwan</p>
    </div>

    <div class="col-lg-2 col-md-4 col-6 collab-col">
      <div class="collab-logo-frame">
        <img src="assets/imgs/collaborator/hitilab.png" alt="Healthcare Innovation and Translational Informatics Lab, Emory University logo" loading="lazy">
      </div>
      <p class="collab-caption">Healthcare Innovation and Translational Informatics Lab, Emory University, USA</p>
    </div>

    <div class="col-lg-2 col-md-4 col-6 collab-col">
      <div class="collab-logo-frame">
        <img src="assets/imgs/collaborator/icp.png" alt="Laboratory for Computational Physiology, MIT logo" loading="lazy">
      </div>
      <p class="collab-caption">Laboratory for Computational Physiology, MIT, USA</p>
    </div>

    <div class="col-lg-2 col-md-4 col-6 collab-col">
      <div class="collab-logo-frame">
        <img src="assets/imgs/collaborator/sinica.png" alt="Functional Neuroimaging Lab, Academia Sinica logo" loading="lazy">
      </div>
      <p class="collab-caption">Functional Neuroimaging Lab, Academia Sinica, Taiwan</p>
    </div>

    <div class="col-lg-2 col-md-4 col-6 collab-col">
      <div class="collab-logo-frame">
        <img src="assets/imgs/collaborator/oja.jpg" alt="Research Centre Jülich logo" loading="lazy">
      </div>
      <p class="collab-caption">Research Centre Jülich, Germany</p>
    </div>

    <div class="col-lg-2 col-md-4 col-6 collab-col">
      <div class="collab-logo-frame">
        <img src="assets/imgs/collaborator/bml.png" alt="Brain Mapping Lab, NYMU logo" loading="lazy">
      </div>
      <p class="collab-caption">Brain Mapping Lab, NYMU, Taiwan</p>
    </div>

    <div class="col-lg-2 col-md-4 col-6 collab-col">
      <div class="collab-logo-frame">
        <img src="assets/imgs/collaborator/tmu.jpg" alt="Taipei Medical University logo" loading="lazy">
      </div>
      <p class="collab-caption">Taipei Medical University, Taiwan</p>
    </div>

    <div class="col-lg-2 col-md-4 col-6 collab-col">
      <div class="collab-logo-frame">
        <img src="assets/imgs/collaborator/sta.png" alt="Institute of Statistical Mathematics, Japan logo" loading="lazy">
      </div>
      <p class="collab-caption">Institute of Statistical Mathematics, Japan</p>
    </div>

    <div class="col-lg-2 col-md-4 col-6 collab-col">
      <div class="collab-logo-frame">
        <img src="assets/imgs/collaborator/swartz.jpg" alt="UCSD Swartz Center for Computational Neuroscience logo" loading="lazy">
      </div>
      <p class="collab-caption">UCSD Swartz Center for Computational Neuroscience</p>
    </div>

    <div class="col-lg-2 col-md-4 col-6 collab-col">
      <div class="collab-logo-frame">
        <img src="assets/imgs/collaborator/info.jpg" alt="Institute for Information Industry, Taiwan logo" loading="lazy">
      </div>
      <p class="collab-caption">Institute for Information Industry, Taiwan</p>
    </div>

    <div class="col-lg-2 col-md-4 col-6 collab-col">
      <div class="collab-logo-frame">
        <img src="assets/imgs/collaborator/ntuh.png" alt="NTU Hospital Hsinchu Branch logo" loading="lazy">
      </div>
      <p class="collab-caption">NTU Hospital Hsinchu Branch, Taiwan</p>
    </div>

  </div>
  ```

- [ ] **Step 2: Add collaborator CSS**

  Append to the end of `creative-studio.css`:

  ```css
  /* ── Collaborator logos ── */
  .collab-col {
    margin-bottom: 32px;
  }

  .collab-logo-frame {
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 10px 16px;
    transition: background 0.2s ease;
  }

  .collab-logo-frame:hover {
    background: var(--primary-50);
  }

  .collab-logo-frame img {
    max-height: 44px;
    width: auto;
    max-width: 100%;
    object-fit: contain;
  }

  .collab-caption {
    font-size: 0.72rem;
    color: #9ca3af;
    text-align: center;
    margin: 8px 0 0;
    line-height: 1.4;
    opacity: 1;
  }
  ```

- [ ] **Step 3: Verify**

  Reload, scroll to Collaborators. All 11 logos sit in white framed boxes of equal height (72px). Hovering a frame turns it pale rose. Captions below each frame are small and muted.

- [ ] **Step 4: Commit**

  ```bash
  git -C /Users/kaixin/nthu-cs-hmilab.github.io add index.html assets/css/creative-studio.css
  git -C /Users/kaixin/nthu-cs-hmilab.github.io commit -m "feat: collaborator logo card frames with consistent height"
  ```

---

## Task 7: Team accordion — divider style

**Files:**
- Modify: `assets/css/creative-studio.css`

- [ ] **Step 1: Replace `.team-toggle` CSS block**

  Find `.team-toggle` (around line 9645). Replace the entire rule plus its `:hover` and `:focus-visible` sub-rules with:

  ```css
  .team-toggle {
    width: 100%;
    display: flex;
    align-items: center;
    background: transparent;
    border: none;
    border-top: 1px solid var(--border-light);
    border-radius: 0;
    padding: 14px 4px;
    cursor: pointer;
    text-align: left;
    -webkit-appearance: none;
    appearance: none;
  }
  .team-toggle:hover {
    background: transparent;
  }
  .team-toggle:hover .team-toggle-title {
    color: #ff214f;
  }
  .team-toggle:focus-visible {
    outline: 2px solid #ff214f;
    outline-offset: 2px;
  }
  ```

- [ ] **Step 2: Mute the arrow color**

  Find `.team-toggle-arrow` (around line 9679). Change `color: #ff214f` to `color: #9ca3af`.

- [ ] **Step 3: Remove `.team-toggle-wrap` bottom margin**

  Find `.team-toggle-wrap` (around line 9641). Change `margin-bottom: 16px` to `margin-bottom: 0`.

- [ ] **Step 4: Lighten the PI section divider**

  Find `.team-role` (around line 9632). Make two changes:
  - `border-bottom: 2px solid #e5e7eb` → `border-bottom: 1px solid var(--border-light)`
  - `font-weight: 700` → `font-weight: 600`

- [ ] **Step 5: Verify**

  Reload, scroll to Team. "PhD Student" etc. rows appear as clean divider-lines, not filled buttons. Hovering turns only the label text red. Clicking still expands/collapses the member grid correctly.

- [ ] **Step 6: Commit**

  ```bash
  git -C /Users/kaixin/nthu-cs-hmilab.github.io add assets/css/creative-studio.css
  git -C /Users/kaixin/nthu-cs-hmilab.github.io commit -m "feat: team accordion divider style, muted arrow, lighter PI divider"
  ```

---

## Task 8: News card dates — accent line style

**Files:**
- Modify: `index.html` (remove FA clock icons from 11 news items)
- Modify: `assets/css/creative-studio.css`

- [ ] **Step 1: Remove all clock icons from news items in `index.html`**

  In the `#blog` section, every `<span class="blog-meta">` contains `<i class="fa fa-clock-o" aria-hidden="true"></i>`. Remove just the `<i>` tag from each, keeping the date text. Change all 11 occurrences from:

  ```html
  <span class="blog-meta">
    <i class="fa fa-clock-o" aria-hidden="true"></i> June 20, 2024
  </span>
  ```

  To:

  ```html
  <span class="blog-meta">June 20, 2024</span>
  ```

- [ ] **Step 2: Replace `.blog-meta` CSS**

  Find `.blog-meta` (around line 9519). Replace the entire block (including the `.blog-meta i` sub-rule that follows it) with:

  ```css
  .blog-meta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.72rem;
    font-weight: 600;
    color: #ff214f;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    background: none;
    padding: 0;
    border-radius: 0;
    margin-bottom: 10px;
    width: auto;
  }
  .blog-meta::before {
    content: '';
    display: block;
    width: 18px;
    height: 2px;
    background: currentColor;
    border-radius: 1px;
    flex-shrink: 0;
  }
  ```

- [ ] **Step 3: Verify**

  Reload, scroll to News. Each card shows the date as a small all-caps red label preceded by an 18px red line. No clock icon. No grey pill background.

- [ ] **Step 4: Commit**

  ```bash
  git -C /Users/kaixin/nthu-cs-hmilab.github.io add index.html assets/css/creative-studio.css
  git -C /Users/kaixin/nthu-cs-hmilab.github.io commit -m "feat: news card date accent-line style, remove clock icon"
  ```

---

## Task 9: Footer — deeper background and logo icon

**Files:**
- Modify: `index.html` (footer logo block)
- Modify: `assets/css/creative-studio.css`

- [ ] **Step 1: Deepen the footer background**

  In `creative-studio.css`, find `section.has-bg-img` (around line 9149):

  ```css
  section.has-bg-img {
    background: rgba(33, 37, 41, 0.95);
    position: relative;
    color: #fff;
  }
  ```

  Replace with:

  ```css
  section.has-bg-img {
    background: #0f0f1a;
    position: relative;
    color: #fff;
  }
  ```

- [ ] **Step 2: Replace the footer logo block in `index.html`**

  In the footer (`<section class="has-bg-img py-0" id="contact">`), find:

  ```html
  <a href="#home" class="logo">
    <img src="assets/imgs/logo.png" alt="HMI Lab logo" />
    <h6>HMI Lab</h6>
  </a>
  ```

  Replace with:

  ```html
  <a href="#home" class="logo">
    <div class="footer-logo-icon"></div>
    <h6>HMI Lab</h6>
  </a>
  ```

- [ ] **Step 3: Add `.footer-logo-icon` CSS and lighten copyright divider**

  In `creative-studio.css`, find `.footer-copyright` (around line 10025) and change its `border-top`:
  - `border-top: 1px solid rgba(255,255,255,0.08)` → `border-top: 1px solid rgba(255,255,255,0.06)`

  Then append the new rule right after the `.footer-copyright` block:

  ```css
  .footer-logo-icon {
    width: 30px;
    height: 30px;
    background: #ff214f;
    border-radius: 8px;
    opacity: 0.9;
    flex-shrink: 0;
  }
  ```

- [ ] **Step 4: Verify**

  Reload, scroll to footer. Background is a deep near-black (`#0f0f1a`). The "HMI Lab" row shows a small red square instead of the PNG logo.

- [ ] **Step 5: Commit**

  ```bash
  git -C /Users/kaixin/nthu-cs-hmilab.github.io add index.html assets/css/creative-studio.css
  git -C /Users/kaixin/nthu-cs-hmilab.github.io commit -m "feat: footer deeper background, red square logo icon"
  ```

---

## Task 10: Album — replace collapse with year-filter HTML

**Files:**
- Modify: `index.html` (entire album section, lines ~309–630)

- [ ] **Step 1: Replace the entire album section**

  Find `<!-- Gallery Section -->` in `index.html` and replace everything through the section's closing `</section>` tag with:

  ```html
  <!-- Gallery Section -->
  <section id="portfolio" class="album-section bg-alt">
    <div class="container text-center">

      <div class="section-tag">Album</div>
      <h2 class="section-title">Lab Moments</h2>

      <div class="album-filter" role="group" aria-label="Filter by year">
        <button class="album-filter-btn active" data-year="all">All</button>
        <button class="album-filter-btn" data-year="2026">2026</button>
        <button class="album-filter-btn" data-year="2025">2025</button>
        <button class="album-filter-btn" data-year="2024">2024</button>
        <button class="album-filter-btn" data-year="2023">2023</button>
        <button class="album-filter-btn" data-year="2022">2022</button>
        <button class="album-filter-btn" data-year="2021">2021</button>
        <button class="album-filter-btn" data-year="2020">2020</button>
      </div>

      <div class="row justify-content-center g-4" id="albumGrid">

        <div class="col-xl-4 col-md-6" data-year="2026">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo32.jpg" alt="2026 AAAI at Singapore" loading="lazy" decoding="async">
            </div>
            <figcaption>2026 AAAI @ Singapore</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2025">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo31.jpg" alt="2025 Hiking" loading="lazy" decoding="async">
            </div>
            <figcaption>2025 Hiking</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2025">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo30.jpg" alt="2025 Banquet 2" loading="lazy" decoding="async">
            </div>
            <figcaption>2025 Banquet 2</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2025">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo29.jpg" alt="2025 Teacher's Day" loading="lazy" decoding="async">
            </div>
            <figcaption>2025 Teacher's Day</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2025">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo28.jpg" alt="First Place at Health AI Datathon 2025 in Atlanta" loading="lazy" decoding="async">
            </div>
            <figcaption>First Place at Health AI DATATHON '25 @ Atlanta</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2025">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo27.jpg" alt="2025 Banquet 1" loading="lazy" decoding="async">
            </div>
            <figcaption>2025 Banquet 1</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2025">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo26.jpg" alt="2025 Graduation" loading="lazy" decoding="async">
            </div>
            <figcaption>2025 Graduation!</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2025">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo25.jpg" alt="2025 Graduation" loading="lazy" decoding="async">
            </div>
            <figcaption>2025 Graduation!</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2025">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo24.jpg" alt="2025 Graduation" loading="lazy" decoding="async">
            </div>
            <figcaption>2025 Graduation!</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2024">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo23.jpg" alt="TSECC Datathon First Place" loading="lazy" decoding="async">
            </div>
            <figcaption>TSECC Datathon First Place</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2024">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo22.jpg" alt="TSECC Datathon Third Place" loading="lazy" decoding="async">
            </div>
            <figcaption>TSECC Datathon Third Place</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2024">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo21.jpg" alt="TSECC Datathon Best Team Award" loading="lazy" decoding="async">
            </div>
            <figcaption>TSECC Datathon Best Team Award</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2024">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo20.jpg" alt="TSECC Taiwan Datathon 2024" loading="lazy" decoding="async">
            </div>
            <figcaption>TSECC Taiwan Datathon 2024</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2024">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo19.jpg" alt="2024 Banquet 2" loading="lazy" decoding="async">
            </div>
            <figcaption>2024 Banquet 2</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2024">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo18.jpg" alt="2024 EMBS in Orlando Florida" loading="lazy" decoding="async">
            </div>
            <figcaption>2024 EMBS @ Orlando, Florida</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2024">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo17.JPG" alt="2024 Graduation" loading="lazy" decoding="async">
            </div>
            <figcaption>2024 Graduation!</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2024">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo16.jpg" alt="2024 Graduation" loading="lazy" decoding="async">
            </div>
            <figcaption>2024 Graduation!</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2024">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo15.jpg" alt="2024 Graduation" loading="lazy" decoding="async">
            </div>
            <figcaption>2024 Graduation!</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2024">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo14.jpg" alt="2024 ICASSP in Korea" loading="lazy" decoding="async">
            </div>
            <figcaption>2024 ICASSP @ Korea</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2024">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo13.jpg" alt="2024 ICASSP in Korea" loading="lazy" decoding="async">
            </div>
            <figcaption>2024 ICASSP @ Korea</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2024">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo11.jpg" alt="2024 Birthday celebration" loading="lazy" decoding="async">
            </div>
            <figcaption>2024 Birthday Celebration!</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2024">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo10.jpg" alt="2024 Banquet 1" loading="lazy" decoding="async">
            </div>
            <figcaption>2024 Banquet 1</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2023">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo9.jpg" alt="2023 Banquet 3" loading="lazy" decoding="async">
            </div>
            <figcaption>2023 Banquet 3</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2023">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo6.JPG" alt="2023 Banquet 2" loading="lazy" decoding="async">
            </div>
            <figcaption>2023 Banquet 2</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2023">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo7.JPG" alt="2023 Graduation" loading="lazy" decoding="async">
            </div>
            <figcaption>2023 Graduation!</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2023">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo0.jpg" alt="2023 Banquet 1" loading="lazy" decoding="async">
            </div>
            <figcaption>2023 Banquet 1</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2022">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo8.jpg" alt="2022 September Banquet" loading="lazy" decoding="async">
            </div>
            <figcaption>2022.09 Banquet</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2022">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo1.png" alt="2022 Summer NTHU HMIers at MIT LCP" loading="lazy" decoding="async">
            </div>
            <figcaption>2022 Summer NTHU HMIers at MIT LCP</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2022">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo2.jpg" alt="2022 Graduation" loading="lazy" decoding="async">
            </div>
            <figcaption>2022 Graduation!</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2022">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo3.jpg" alt="2022 January Year end banquet" loading="lazy" decoding="async">
            </div>
            <figcaption>2022.01 Year End Banquet</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2021">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo4.jpg" alt="2021 January Year end banquet" loading="lazy" decoding="async">
            </div>
            <figcaption>2021.01 Year End Banquet</figcaption>
          </figure>
        </div>

        <div class="col-xl-4 col-md-6" data-year="2020">
          <figure class="album-card">
            <div class="album-img-wrap">
              <img src="assets/imgs/album/photo5.jpg" alt="2020 September Teacher's Day" loading="lazy" decoding="async">
            </div>
            <figcaption>2020.09 Teacher's Day</figcaption>
          </figure>
        </div>

      </div><!-- #albumGrid -->
    </div>
  </section>
  ```

- [ ] **Step 2: Verify HTML structure**

  Reload. Album section shows all 32 photos in an open grid (no collapse button). Eight filter buttons appear above the grid, unstyled. Clicking them does nothing yet.

- [ ] **Step 3: Commit HTML**

  ```bash
  git -C /Users/kaixin/nthu-cs-hmilab.github.io add index.html
  git -C /Users/kaixin/nthu-cs-hmilab.github.io commit -m "feat: album section year-filter HTML — replace collapse with open grid"
  ```

---

## Task 11: Album — filter CSS and JS

**Files:**
- Modify: `assets/css/creative-studio.css`
- Modify: `assets/js/creative-studio.js`

- [ ] **Step 1: Add album filter CSS**

  Append to the end of `creative-studio.css`:

  ```css
  /* ── Album year filter ── */
  .album-filter {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin: 20px 0 32px;
  }

  .album-filter-btn {
    padding: 5px 16px;
    border-radius: 6px;
    border: 1px solid var(--border);
    background: #fff;
    font-size: 0.82rem;
    font-weight: 600;
    color: #6b7280;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
    -webkit-appearance: none;
    appearance: none;
    font-family: inherit;
  }

  .album-filter-btn:hover {
    background: var(--primary-50);
    color: #ff214f;
    border-color: rgba(255, 33, 79, 0.2);
  }

  .album-filter-btn.active {
    background: #ff214f;
    color: #fff;
    border-color: #ff214f;
    box-shadow: 0 2px 8px rgba(255, 33, 79, 0.25);
  }

  .album-filter-btn:focus-visible {
    outline: 2px solid #ff214f;
    outline-offset: 2px;
  }
  ```

- [ ] **Step 2: Add album filter JS**

  In `assets/js/creative-studio.js`, append at the very end of the file:

  ```js
  /* =========================
     Album Year Filter
  ========================= */
  (function () {
    var filterBtns = document.querySelectorAll('.album-filter-btn');
    var albumItems = document.querySelectorAll('#albumGrid [data-year]');

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var year = this.dataset.year;
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        albumItems.forEach(function (item) {
          item.style.display = (year === 'all' || item.dataset.year === year) ? '' : 'none';
        });
      });
    });
  }());
  ```

- [ ] **Step 3: Verify filter functionality**

  Reload. The "All" button is filled red (active). Click "2026": only 1 photo visible (AAAI Singapore). Click "2025": 9 photos. Click "2024": 13 photos. Click "2023": 4 photos. Click "2022": 4 photos. Click "2021": 1 photo. Click "2020": 1 photo. Click "All": all 32 return. No console errors.

- [ ] **Step 4: Commit**

  ```bash
  git -C /Users/kaixin/nthu-cs-hmilab.github.io add assets/css/creative-studio.css assets/js/creative-studio.js
  git -C /Users/kaixin/nthu-cs-hmilab.github.io commit -m "feat: album year-filter tabs with CSS and JS"
  ```

---

## Final check

- [ ] **Full-page walkthrough** — scroll end-to-end and confirm each section:
  1. **Hero**: Fira Sans loaded, navbar slightly translucent over image
  2. **Highlights**: compact icon rings, 3 cards with hover lift
  3. **About**: layout unchanged
  4. **Research**: cards unchanged
  5. **Album**: filter tabs, all photos visible by default, year filtering works
  6. **Team**: divider-line accordions, all collapses work, muted grey arrows
  7. **Collaborators**: 11 logos in white equal-height frames, soft rose hover
  8. **News**: accent-line dates, no clock icons
  9. **Footer**: deep `#0f0f1a`, red square logo icon
  10. **Scroll up**: affix animation smooth, frosted-glass white navbar

- [ ] **Mobile check (375px)** — in DevTools set viewport to 375px and verify:
  - Navbar hamburger expands correctly
  - Highlight cards stack to 1 column
  - Album filter buttons wrap cleanly
  - Collaborator logo frames remain usable
  - Team accordions open correctly

- [ ] **Commit plan doc**

  ```bash
  git -C /Users/kaixin/nthu-cs-hmilab.github.io add docs/superpowers/plans/2026-06-10-lab-website-redesign.md
  git -C /Users/kaixin/nthu-cs-hmilab.github.io commit -m "docs: add UI/UX polish implementation plan"
  ```
