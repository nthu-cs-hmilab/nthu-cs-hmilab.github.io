# Lab Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the HMI Lab single-page site to enterprise-quality visual standard — unified design tokens, dropdown navigation, consistent cards, section separation — while preserving all content and functionality.

**Architecture:** SCSS-first approach — define design tokens in `_variables.scss`, cascade through component partials, make surgical HTML edits to `index.html` for structure and markup. No framework migration; Bootstrap 4.3.1 grid stays. JS additions go in `creative-studio.js`.

**Tech Stack:** Bootstrap 4.3.1 (grid/utilities), Bootstrap 5 (collapse for team), jQuery 3.4.1 (smooth scroll, existing), Themify Icons, Fira Sans, `npx sass` (dart-sass) for compilation.

---

## File Map

| File | Role |
|------|------|
| `assets/scss/abstracts/_variables.scss` | Design tokens: colours, shadows, radii, transitions |
| `assets/scss/base/_typography.scss` | Section header pattern: `.section-tag`, `.section-desc` |
| `assets/scss/base/_base.scss` | Global reset additions: focus ring, `img` aspect-ratio |
| `assets/scss/components/_navbars.scss` | Navbar, dropdown menus, scrollspy bar, CTA button |
| `assets/scss/components/_cards.scss` | Research, news, team, album card unified styles; toggle button |
| `assets/scss/layout/_header.scss` | Hero overlay, eyebrow text, button pills |
| `assets/scss/layout/_sections.scss` | Section padding, `.bg-alt`, highlights box, about section |
| `assets/scss/layout/_footer.scss` | Dark footer, logo mark, copyright bar |
| `assets/js/creative-studio.js` | Scrollspy progress bar JS |
| `index.html` | Structural fix, nav dropdown HTML, section-tag markup, id anchors, alt attrs, preload, lazy loading |

**Build command (run after every SCSS task):**
```bash
npx sass assets/scss/creative-studio.scss assets/css/creative-studio.css
```

**Dev server:**
```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

---

## Task 1: Fix malformed HTML structure

The file has a premature `</body></html>` at line 276–277 (after the research section), with the gallery/team/news/contact sections appearing outside the closed HTML element. Browsers render it anyway, but this must be fixed before other changes.

**Files:** `index.html`

- [ ] **Step 1: Remove the premature `</body></html>` and orphaned Bootstrap 5 CDN script**

  In `index.html`, find and remove lines 275–277 (the Bootstrap 5 CDN script tag and the first `</body></html>`):
  ```html
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    </body>
  </html>
  ```
  These three lines should be deleted entirely.

- [ ] **Step 2: Add Bootstrap 5 CDN to the scripts block at end of file**

  In `index.html`, find the scripts block near the end (around line 1018, which after deletion becomes ~line 1015):
  ```html
      <!-- core  -->
      <script src="assets/vendors/jquery/jquery-3.4.1.js"></script>
      <script src="assets/vendors/bootstrap/bootstrap.bundle.js"></script>
  ```
  Add the Bootstrap 5 CDN **after** the Bootstrap 4 bundle and **before** the affix script:
  ```html
      <!-- core  -->
      <script src="assets/vendors/jquery/jquery-3.4.1.js"></script>
      <script src="assets/vendors/bootstrap/bootstrap.bundle.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

      <!-- bootstrap affix -->
      <script src="assets/vendors/bootstrap/bootstrap.affix.js"></script>

      <!-- Creative Studio js -->
      <script src="assets/js/creative-studio.js"></script>
    </body>
  </html>
  ```

- [ ] **Step 3: Verify structure**
  ```bash
  grep -n "</body>\|</html>" index.html
  ```
  Expected output: exactly **two** lines — the final `</body>` and `</html>` at the very end of the file. Zero occurrences before those.

- [ ] **Step 4: Commit**
  ```bash
  git add index.html
  git commit -m "fix: correct malformed HTML structure (premature body/html close)"
  ```

---

## Task 2: Add design tokens to SCSS variables

**Files:** `assets/scss/abstracts/_variables.scss`

- [ ] **Step 1: Add design tokens after the existing colour system block**

  In `_variables.scss`, after line 17 (`$black: #000;`) and before the `$grays: ()` map, insert:
  ```scss
  // ── Design System Tokens ──────────────────────────────────────
  // Semantic text colours
  $text-primary:      #111827;
  $text-secondary:    #4b5563;
  $text-muted:        #9ca3af;

  // Semantic background colours
  $bg-alt:            #f9fafb;
  $bg-subtle:         #f3f4f6;

  // Primary tint (for tags, icon backgrounds)
  $primary-dark:      #e01040;
  $primary-tint:      #fff5f7;

  // Border tokens
  $border-token:      #e5e7eb;
  $border-light:      #f3f4f6;

  // Shadow scale
  $shadow-sm:    0 2px 8px rgba(15, 23, 42, 0.05);
  $shadow-md:    0 4px 20px rgba(15, 23, 42, 0.07);
  $shadow-lg:    0 8px 32px rgba(15, 23, 42, 0.10);
  $shadow-hover: 0 12px 36px rgba(15, 23, 42, 0.13);

  // Border radius scale
  $radius-sm:    8px;
  $radius-md:    12px;
  $radius-lg:    16px;
  $radius-xl:    24px;
  $radius-pill:  999px;

  // Transition scale
  $transition-base: 0.2s ease;
  $transition-slow: 0.35s ease;
  // ─────────────────────────────────────────────────────────────
  ```

  > Note: We use `$border-token` (not `$border-color`) because Bootstrap already defines `$border-color`. We'll use `$border-token` in our custom components.

- [ ] **Step 2: Compile and verify no errors**
  ```bash
  npx sass assets/scss/creative-studio.scss assets/css/creative-studio.css
  ```
  Expected: exits 0, no error output.

- [ ] **Step 3: Commit**
  ```bash
  git add assets/scss/abstracts/_variables.scss
  git commit -m "feat: add design system tokens to SCSS variables"
  ```

---

## Task 3: Section header pattern — CSS

Define the unified `.section-tag` / `.section-title` / `.section-desc` pattern used across every section heading.

**Files:** `assets/scss/base/_typography.scss`, `assets/scss/layout/_sections.scss`

- [ ] **Step 1: Add section header classes to `_typography.scss`**

  Append to the end of `assets/scss/base/_typography.scss`:
  ```scss
  // ── Unified Section Header Pattern ───────────────────────────
  .section-tag {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $primary;
    background: $primary-tint;
    padding: 4px 14px;
    border-radius: $radius-pill;
    margin-bottom: 14px;
  }

  .section-title {
    font-size: 2rem;
    font-weight: 800;
    color: $text-primary;
    margin-bottom: 14px;
    line-height: 1.2;
  }

  .section-desc {
    font-size: 1rem;
    color: $text-secondary;
    max-width: 520px;
    margin: 0 auto 0;
    line-height: 1.65;
  }
  // ─────────────────────────────────────────────────────────────
  ```

- [ ] **Step 2: Update `.section-title` in `_sections.scss` to avoid conflict**

  In `assets/scss/layout/_sections.scss`, find the existing `.section-title` block:
  ```scss
      .section-title {
          font-size: calc(28px + (35 - 28) * ((100vw - 320px) / (1200 - 320)));

          @include media-breakpoint-up(lg) {
              font-size: 35px;
          }
      }
  ```
  Replace it with a comment so the `_typography.scss` version takes precedence:
  ```scss
      // .section-title overridden in _typography.scss
  ```

- [ ] **Step 3: Compile**
  ```bash
  npx sass assets/scss/creative-studio.scss assets/css/creative-studio.css
  ```
  Expected: exits 0.

- [ ] **Step 4: Update section headers in `index.html`**

  For each of the 7 content sections, replace the `h6.section-subtitle` (or `p.section-subtitle`) element with a `div.section-tag`. The text of the tag is the existing subtitle text.

  **About section** (around line 147):
  ```html
  <!-- BEFORE -->
  <p class="section-subtitle mb-2">About</p>
  <h2 class="section-title mb-4">Human-Centered Machine Intelligence Lab</h2>
  
  <!-- AFTER -->
  <div class="section-tag">About</div>
  <h2 class="section-title mb-3">Human-Centered Machine Intelligence Lab</h2>
  ```

  **Research section** (around line 172):
  ```html
  <!-- BEFORE -->
  <p class="section-subtitle mb-2">Research</p>
  <h2 class="section-title mb-3">Our Research Areas</h2>
  <p class="section-description mx-auto">...</p>
  
  <!-- AFTER -->
  <div class="section-tag">Research</div>
  <h2 class="section-title mb-3">Our Research Areas</h2>
  <p class="section-desc mx-auto">
    We combine human-centered design, machine learning, and neuroscience
    to build reliable and impactful intelligent systems.
  </p>
  ```

  **Album section** (around line 283):
  ```html
  <!-- BEFORE -->
  <h6 class="section-subtitle">Album</h6>
  <h2 class="section-title">Lab Moments</h2>
  
  <!-- AFTER -->
  <div class="section-tag">Album</div>
  <h2 class="section-title">Lab Moments</h2>
  ```

  **Team section** (around line 541):
  ```html
  <!-- BEFORE -->
  <h6 class="section-subtitle">People</h6>
  <h2 class="section-title">Our Team</h2>
  
  <!-- AFTER -->
  <div class="section-tag">People</div>
  <h2 class="section-title">Our Team</h2>
  ```

  **Collaborators section** (around line 663):
  ```html
  <!-- BEFORE -->
  <h6 class="section-subtitle">Collaborators</h6>
  <h6 class="section-title text-center mb-6">Research Partners</h6>
  
  <!-- AFTER -->
  <div class="section-tag">Collaborators</div>
  <h2 class="section-title mb-4">Research Partners</h2>
  ```

  **News section** (around line 754):
  ```html
  <!-- BEFORE -->
  <h6 class="section-subtitle">News Feed</h6>
  <h2 class="section-title">Latest News</h2>
  <p class="section-description mx-auto">...</p>
  
  <!-- AFTER -->
  <div class="section-tag">News</div>
  <h2 class="section-title">Latest News</h2>
  <p class="section-desc mx-auto">
    Highlights from our lab, including awards, publications, recognitions, and research updates.
  </p>
  ```

- [ ] **Step 5: Open `http://localhost:8080` and verify**
  Start server: `python3 -m http.server 8080`
  Check: each section has a pink pill tag above its h2 title. Section titles are `2rem`, bold, dark.

- [ ] **Step 6: Commit**
  ```bash
  git add assets/scss/base/_typography.scss assets/scss/layout/_sections.scss index.html
  git commit -m "feat: add unified section header pattern (section-tag + section-title)"
  ```

---

## Task 4: Section backgrounds

Replace the automatic `section:nth-child(odd)` rule with explicit, intentional backgrounds.

**Files:** `assets/scss/layout/_sections.scss`, `index.html`

- [ ] **Step 1: Add `.bg-alt` utility and remove the automatic nth-child rule in `_sections.scss`**

  In `assets/scss/layout/_sections.scss`, find:
  ```scss
  section {
      padding: $section-padding-y $section-padding-x;

      &:nth-child(odd) {
          background-color: lighten($gray-100, 1%);
      }
  ```
  Replace with:
  ```scss
  section {
      padding: $section-padding-y $section-padding-x;
      background-color: $white;
  ```

  Then add a `.bg-alt` utility right after the closing `}` of the `section {}` block:
  ```scss
  .bg-alt {
      background-color: $bg-alt !important;
  }
  ```

- [ ] **Step 2: Apply `bg-alt` to alternating sections in `index.html`**

  Add `bg-alt` class to these sections:

  About section:
  ```html
  <section id="about" class="about-section bg-alt">
  ```

  Album section:
  ```html
  <section id="portfolio" class="album-section bg-alt">
  ```

  Collaborators section:
  ```html
  <section id="testimonial" class="bg-alt">
  ```

  The highlights, research, team, and news sections keep their default white background (no change needed).

- [ ] **Step 3: Compile and verify**
  ```bash
  npx sass assets/scss/creative-studio.scss assets/css/creative-studio.css
  ```
  Open browser. Check: About = light gray, Research = white, Album = light gray, Team = white, Collaborators = light gray, News = white.

- [ ] **Step 4: Commit**
  ```bash
  git add assets/scss/layout/_sections.scss index.html
  git commit -m "feat: explicit section backgrounds replacing auto nth-child rule"
  ```

---

## Task 5: Navigation — dropdowns and CTA button

**Files:** `assets/scss/components/_navbars.scss`, `index.html`

- [ ] **Step 1: Add dropdown CSS and CTA button styles to `_navbars.scss`**

  Append to the end of `assets/scss/components/_navbars.scss`:
  ```scss
  // ── Dropdown Menus ────────────────────────────────────────────
  .custom-navbar .nav-item.has-dropdown {
    position: relative;
  }

  .custom-navbar .nav-item.has-dropdown .dropdown-panel {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: $white;
    border: 1px solid $border-token;
    border-radius: $radius-md;
    box-shadow: $shadow-lg;
    padding: 10px 0;
    min-width: 200px;
    z-index: 10000;
    white-space: nowrap;
  }

  .custom-navbar .nav-item.has-dropdown:hover .dropdown-panel,
  .custom-navbar .nav-item.has-dropdown:focus-within .dropdown-panel {
    display: block;
    animation: fadeDropdown $transition-base;
  }

  @keyframes fadeDropdown {
    from { opacity: 0; transform: translateX(-50%) translateY(-6px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }

  .custom-navbar .dropdown-panel-title {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: $text-muted;
    padding: 6px 16px 8px;
    border-bottom: 1px solid $border-light;
    margin-bottom: 4px;
  }

  .custom-navbar .dropdown-panel a {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 7px 16px;
    font-size: 0.88rem;
    color: $text-secondary !important;
    text-decoration: none;
    font-weight: 400;
    transition: color $transition-base, background $transition-base;

    &::before {
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: $border-token;
      flex-shrink: 0;
      transition: background $transition-base;
    }

    &:hover {
      color: $primary !important;
      background: $primary-tint;

      &::before {
        background: $primary;
      }
    }
  }

  // ── Contact CTA button in nav ─────────────────────────────────
  .custom-navbar .nav-cta {
    background: $primary !important;
    color: $white !important;
    border-radius: $radius-pill;
    padding: 6px 18px !important;
    font-weight: 600;
    transition: background $transition-base, transform $transition-base;
    margin-left: 6px;

    &:hover {
      background: $primary-dark !important;
    }
  }

  .custom-navbar.affix .nav-cta {
    background: $primary !important;
    color: $white !important;
  }

  // ── Dropdown caret indicator ──────────────────────────────────
  .custom-navbar .nav-link.has-caret::after {
    content: '▾';
    font-size: 0.65rem;
    margin-left: 3px;
    opacity: 0.6;
  }

  // ── Mobile: hide dropdown panels in collapsed menu ────────────
  @include media-breakpoint-down(md) {
    .custom-navbar .nav-item.has-dropdown .dropdown-panel {
      display: none !important;
    }
    .custom-navbar .nav-item.has-dropdown.mobile-open .dropdown-panel {
      display: block !important;
      position: static;
      transform: none;
      box-shadow: none;
      border: none;
      border-radius: 0;
      background: transparent;
      padding: 0 0 0 16px;
    }
    .custom-navbar .dropdown-panel a {
      padding: 5px 8px;
      font-size: 0.85rem;
    }
  }
  // ─────────────────────────────────────────────────────────────
  ```

- [ ] **Step 2: Update active scrolled nav link colour**

  In `_navbars.scss`, find the `.affix` `.nav-link` rule:
  ```scss
      .nav-link {
          color: $gray-700 !important;

          &.active {
              color: $primary !important;
          }
      }
  ```
  Update `$gray-700` to `$text-secondary`:
  ```scss
      .nav-link {
          color: $text-secondary !important;

          &.active {
              color: $primary !important;
          }
      }
  ```

- [ ] **Step 3: Replace navbar HTML in `index.html`**

  Find the entire `<nav>...</nav>` block (lines 29–81) and replace it with:
  ```html
  <!-- Page Navigation -->
  <nav
    class="navbar custom-navbar navbar-expand-lg navbar-dark"
    data-spy="affix"
    data-offset-top="20"
  >
    <div class="container">
      <a class="navbar-brand" href="#home">
        <img src="assets/imgs/logo2.png" alt="HMI Lab logo" />
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto align-items-lg-center">
          <li class="nav-item">
            <a class="nav-link" href="#home">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#about">About</a>
          </li>

          <!-- Research dropdown -->
          <li class="nav-item has-dropdown">
            <a class="nav-link has-caret" href="#service">Research</a>
            <div class="dropdown-panel">
              <div class="dropdown-panel-title">Research Areas</div>
              <a href="#service">Trustworthy AI for Medicine</a>
              <a href="#service">Brain Encoding and Decoding</a>
              <a href="#service">Human-Machine Interaction</a>
              <a href="#service">Computational Neuroscience</a>
            </div>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#portfolio">Album</a>
          </li>

          <!-- Team dropdown -->
          <li class="nav-item has-dropdown">
            <a class="nav-link has-caret" href="#team">Team</a>
            <div class="dropdown-panel">
              <div class="dropdown-panel-title">Team Members</div>
              <a href="#team-pi">Principal Investigator</a>
              <a href="#team-phd">PhD Students</a>
              <a href="#team-grad">Graduate Students</a>
              <a href="#team-undergrad">Undergraduate Students</a>
              <a href="#team-ra">Research Assistants</a>
              <a href="#team-alumni">Alumni</a>
            </div>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#testimonial">Collaborators</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#blog">News</a>
          </li>
          <li class="nav-item">
            <a class="nav-cta nav-link" href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Scroll progress bar -->
    <div id="scroll-progress" style="position:absolute;bottom:0;left:0;height:3px;width:0%;background:#ff214f;transition:width 0.1s linear;z-index:1;"></div>
  </nav>
  <!-- End Of Page Navigation -->
  ```

- [ ] **Step 4: Add team group `id` anchors to team section in `index.html`**

  Find the PI team group and add an `id`:
  ```html
  <!-- BEFORE -->
  <div class="team-group team-group-pi">
    <div class="team-group-head">
      <h5 class="team-role">Principal Investigator</h5>
  
  <!-- AFTER -->
  <div class="team-group team-group-pi" id="team-pi">
    <div class="team-group-head">
      <h5 class="team-role">Principal Investigator</h5>
  ```

  Find the PhD toggle `<button>` and add `id="team-phd"` to its parent `<div class="team-group">`:
  ```html
  <!-- BEFORE -->
  <div class="team-group">
    <div class="team-toggle-wrap">
      <button ... data-bs-target="#phdCollapse"

  <!-- AFTER -->
  <div class="team-group" id="team-phd">
    <div class="team-toggle-wrap">
      <button ... data-bs-target="#phdCollapse"
  ```

  Repeat for graduate (`id="team-grad"`), undergraduate (`id="team-undergrad"`), RA (`id="team-ra"`), alumni (`id="team-alumni"`).

- [ ] **Step 5: Compile and verify**
  ```bash
  npx sass assets/scss/creative-studio.scss assets/css/creative-studio.css
  ```
  Open browser. Hover over "Research" nav item — dropdown appears with 4 research area links. Hover over "Team" — dropdown shows 6 role links. "Contact" is a pink pill button.

- [ ] **Step 6: Commit**
  ```bash
  git add assets/scss/components/_navbars.scss index.html
  git commit -m "feat: Research + Team dropdown nav, Contact CTA pill, team group anchors"
  ```

---

## Task 6: Scrollspy progress bar

A pink bar at the bottom of the sticky navbar fills left-to-right as the user scrolls.

**Files:** `assets/js/creative-studio.js`

> The HTML `<div id="scroll-progress">` was already added in Task 5.

- [ ] **Step 1: Add scroll progress JS to `creative-studio.js`**

  Append to the very end of `assets/js/creative-studio.js`:
  ```javascript
  /* =========================
     Scroll Progress Bar
  ========================= */
  (function () {
    var bar = document.getElementById('scroll-progress');
    if (!bar) return;

    var ticking = false;
    function updateBar() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateBar);
        ticking = true;
      }
    }, { passive: true });
  }());
  ```

- [ ] **Step 2: Verify in browser**

  Open `http://localhost:8080`. Scroll down — the pink bar at the bottom of the sticky navbar grows from left to right, reaching full width at the page bottom.

- [ ] **Step 3: Commit**
  ```bash
  git add assets/js/creative-studio.js
  git commit -m "feat: add scroll progress bar to sticky navbar"
  ```

---

## Task 7: Hero section refinements

**Files:** `assets/scss/layout/_header.scss`

- [ ] **Step 1: Replace `_header.scss` content**

  Replace the entire content of `assets/scss/layout/_header.scss` with:
  ```scss
  .header {
      height: 100%;
      min-height: 600px;
      background: url(../imgs/header.png) no-repeat center center fixed;
      background-size: cover;
      position: relative;

      .overlay {
          position: absolute;
          inset: 0;
          background: rgba(8, 8, 20, 0.58);
          color: $white;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
      }
  }

  // Hero content
  .hero-content {
      max-width: 680px;
      padding: 0 20px;
  }

  .hero-kicker {
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: $primary;
      margin-bottom: 16px;
      opacity: 1;
  }

  .header .title {
      font-size: calc(36px + (72 - 36) * ((100vw - 320px) / (1200 - 320)));
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 12px;
      color: $white;
  }

  .header .subtitle {
      font-size: calc(16px + (22 - 16) * ((100vw - 320px) / (1200 - 320)));
      font-weight: 600;
      color: rgba($white, 0.85);
      margin-bottom: 14px;
  }

  .hero-description {
      font-size: 1rem;
      color: rgba($white, 0.72);
      line-height: 1.7;
      max-width: 520px;
      margin-bottom: 32px;
  }

  // Hero CTA buttons
  .hero-btn-primary {
      background: $primary !important;
      border-color: $primary !important;
      border-radius: $radius-pill !important;
      font-weight: 600;
      padding: 12px 28px !important;
      transition: background $transition-base, transform $transition-base !important;

      &:hover {
          background: $primary-dark !important;
          border-color: $primary-dark !important;
          transform: translateY(-2px);
      }
  }

  .hero-btn-secondary {
      border-radius: $radius-pill !important;
      font-weight: 600;
      padding: 12px 28px !important;
      border-color: rgba($white, 0.5) !important;
      color: $white !important;
      transition: border-color $transition-base, background $transition-base !important;

      &:hover {
          border-color: $white !important;
          background: rgba($white, 0.08) !important;
      }
  }

  @include media-breakpoint-down(sm) {
      .header {
          background-attachment: scroll;
      }
      .hero-btn-primary,
      .hero-btn-secondary {
          padding: 10px 20px !important;
          font-size: 0.9rem;
      }
  }
  ```

- [ ] **Step 2: Compile**
  ```bash
  npx sass assets/scss/creative-studio.scss assets/css/creative-studio.css
  ```

- [ ] **Step 3: Verify in browser**

  The hero should show: pink "National Tsing Hua University" eyebrow text, bold white H1 "HMI Lab", white subtitle, muted description paragraph, pink "Explore Research" pill button + ghost "Contact" pill button. Dark overlay should be visibly darker for better contrast.

- [ ] **Step 4: Commit**
  ```bash
  git add assets/scss/layout/_header.scss
  git commit -m "feat: modernise hero section with refined overlay, eyebrow, pill buttons"
  ```

---

## Task 8: Lab Highlights section

The three highlight boxes need icon wrappers and refined card styles. The icons are already Themify (`<i class="ti-...">`) — no emojis to remove.

**Files:** `assets/scss/layout/_sections.scss`

- [ ] **Step 1: Find and replace the highlight box styles in `_sections.scss`**

  Search for any existing `.box`, `.box-item`, `.box-title`, `.box-text` rules in `_sections.scss`. If they exist, replace them entirely. If they don't exist (styles may be inline or in another file), append the following.

  Add these styles to `_sections.scss`:
  ```scss
  // ── Lab Highlights ────────────────────────────────────────────
  .lab-highlights {
      padding-top: 0;
      padding-bottom: 40px;
      background-color: $white;
  }

  .lab-highlights .box {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: -60px;
      position: relative;
      z-index: 10;

      @include media-breakpoint-down(md) {
          grid-template-columns: 1fr;
          margin-top: -20px;
      }
  }

  .box-item {
      background: $white;
      border: 1px solid $border-token;
      border-radius: $radius-lg;
      box-shadow: $shadow-md;
      padding: 28px 24px;
      text-align: center;
      transition: transform $transition-base, box-shadow $transition-base;

      &:hover {
          transform: translateY(-4px);
          box-shadow: $shadow-hover;
      }
  }

  .box-item i {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 52px;
      height: 52px;
      background: $primary-tint;
      border-radius: $radius-md;
      margin: 0 auto 16px;
      font-size: 22px;
      color: $primary;
  }

  .box-title {
      font-size: 1rem;
      font-weight: 700;
      color: $text-primary;
      margin-bottom: 8px;
  }

  .box-text {
      font-size: 0.9rem;
      color: $text-secondary;
      line-height: 1.6;
      margin-bottom: 0;
  }
  // ─────────────────────────────────────────────────────────────
  ```

- [ ] **Step 2: Compile and verify**
  ```bash
  npx sass assets/scss/creative-studio.scss assets/css/creative-studio.css
  ```
  The three highlight boxes should show icons in pink rounded squares, white card background with border and shadow, slightly overlapping the hero bottom.

- [ ] **Step 3: Commit**
  ```bash
  git add assets/scss/layout/_sections.scss
  git commit -m "feat: highlight boxes with icon wrapper, card shadow, hover lift"
  ```

---

## Task 9: Research cards

**Files:** `assets/scss/components/_cards.scss`, `index.html`

- [ ] **Step 1: Find existing research card styles in `_cards.scss`**

  Search for `.research-card`, `.research-image`, `.research-body`, `.research-question` in `_cards.scss`. Replace all research card rules (keep other unrelated rules).

  Add/replace research card section in `_cards.scss`:
  ```scss
  // ── Research Cards ────────────────────────────────────────────
  .research-card {
      background: $white;
      border: 1px solid $border-token;
      border-radius: $radius-lg;
      box-shadow: $shadow-md;
      overflow: hidden;
      transition: transform $transition-base, box-shadow $transition-base;

      &:hover {
          transform: translateY(-4px);
          box-shadow: $shadow-hover;
      }
  }

  .research-image-wrap {
      aspect-ratio: 16 / 9;
      overflow: hidden;
  }

  .research-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
  }

  .research-card:hover .research-image {
      transform: scale(1.03);
  }

  .research-body {
      padding: 22px 22px 24px;
  }

  .research-question {
      font-size: 0.82rem;
      font-weight: 600;
      color: $primary;
      margin-bottom: 6px;
      line-height: 1.4;
  }

  .research-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: $text-primary;
      margin-bottom: 8px;
  }

  .research-text {
      font-size: 0.92rem;
      color: $text-secondary;
      line-height: 1.65;
      margin-bottom: 0;
  }
  // ─────────────────────────────────────────────────────────────
  ```

- [ ] **Step 2: Add `loading="lazy"` and `decoding="async"` to research images in `index.html`**

  Find all four `<img class="research-image"` tags and add the attributes:
  ```html
  <!-- BEFORE -->
  <img
    class="research-image"
    src="assets/imgs/CXRphoto.png"
    alt="Trustworthy AI for medicine"
  />
  
  <!-- AFTER -->
  <img
    class="research-image"
    src="assets/imgs/CXRphoto.png"
    alt="Trustworthy AI for medicine"
    loading="lazy"
    decoding="async"
  />
  ```
  Apply the same `loading="lazy" decoding="async"` to the other three research images (`manifold.png`, `learn.png`, `trans.png`).

- [ ] **Step 3: Compile and verify**
  ```bash
  npx sass assets/scss/creative-studio.scss assets/css/creative-studio.css
  ```
  Research cards should show: 16:9 image with subtle zoom on hover, pink question text, bold title, lifted shadow on hover.

- [ ] **Step 4: Commit**
  ```bash
  git add assets/scss/components/_cards.scss index.html
  git commit -m "feat: research cards with 16:9 image, hover lift, unified design tokens"
  ```

---

## Task 10: News/Blog cards

**Files:** `assets/scss/components/_cards.scss`

- [ ] **Step 1: Find existing blog card styles in `_cards.scss` and replace**

  Search for `.blog-card`, `.blog-meta`, `.blog-title`, `.blog-text`, `.blog-link`. Replace all matching rules with:
  ```scss
  // ── News / Blog Cards ─────────────────────────────────────────
  .blog-card {
      background: $white;
      border: 1px solid $border-token;
      border-radius: $radius-lg;
      box-shadow: $shadow-md;
      transition: transform $transition-base, box-shadow $transition-base;
      display: flex;
      flex-direction: column;

      &:hover {
          transform: translateY(-4px);
          box-shadow: $shadow-hover;
      }
  }

  .blog-card-body {
      padding: 22px 22px 24px;
      flex: 1;
      display: flex;
      flex-direction: column;
  }

  .blog-meta {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.78rem;
      color: $text-muted;
      background: $bg-subtle;
      padding: 3px 10px;
      border-radius: $radius-sm;
      margin-bottom: 12px;
      width: fit-content;

      i { font-size: 0.72rem; }
  }

  .blog-title {
      font-size: 1rem;
      font-weight: 700;
      color: $text-primary;
      margin-bottom: 8px;
      line-height: 1.4;
  }

  .blog-text {
      font-size: 0.9rem;
      color: $text-secondary;
      line-height: 1.65;
      flex: 1;
      margin-bottom: 0;
  }

  .blog-link {
      display: inline-block;
      margin-top: 14px;
      font-size: 0.85rem;
      font-weight: 600;
      color: $primary;
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: border-color $transition-base;

      &:hover {
          color: $primary-dark;
          border-bottom-color: $primary-dark;
      }

      &::after {
          content: ' →';
      }
  }
  // ─────────────────────────────────────────────────────────────
  ```

- [ ] **Step 2: Compile and verify**
  ```bash
  npx sass assets/scss/creative-studio.scss assets/css/creative-studio.css
  ```
  News cards: gray date pill top-left, bold title, description text, pink "View announcement →" link. Equal height cards in each row (because `d-flex` is already on the col divs).

- [ ] **Step 3: Commit**
  ```bash
  git add assets/scss/components/_cards.scss
  git commit -m "feat: news cards with date pill, flex layout, unified design tokens"
  ```

---

## Task 11: Team cards and toggle buttons

**Files:** `assets/scss/components/_cards.scss`, `index.html`

- [ ] **Step 1: Add/replace team card CSS in `_cards.scss`**

  Find existing `.team-card`, `.team-photo`, `.team-photo-wrapper`, `.team-card-body`, `.team-name-en`, `.team-name-zh` rules and replace with:
  ```scss
  // ── Team Cards ────────────────────────────────────────────────
  .team-card {
      text-align: center;
      padding: 8px 4px 12px;
  }

  .team-photo-wrapper {
      width: 120px;
      height: 120px;
      margin: 0 auto 12px;
      border-radius: $radius-md;
      overflow: hidden;
      background: $bg-subtle;
      box-shadow: $shadow-sm;
  }

  .team-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center 20%;
      display: block;
      transition: transform 0.35s ease;
  }

  .team-card:hover .team-photo {
      transform: scale(1.05);
  }

  .team-card-body {
      padding: 0 4px;
  }

  .team-name-en {
      font-size: 0.88rem;
      font-weight: 700;
      color: $text-primary;
      margin-bottom: 2px;
  }

  .team-name-zh {
      font-size: 0.78rem;
      color: $text-muted;
      margin-bottom: 0;
  }

  @include media-breakpoint-down(sm) {
      .team-photo-wrapper {
          width: 100px;
          height: 100px;
      }
  }

  // ── Team group header ─────────────────────────────────────────
  .team-group {
      margin-bottom: 32px;
  }

  .team-group-pi {
      margin-bottom: 40px;
  }

  .team-group-head {
      margin-bottom: 20px;
  }

  .team-role {
      font-size: 1.1rem;
      font-weight: 700;
      color: $text-primary;
      margin-bottom: 0;
      padding-bottom: 12px;
      border-bottom: 2px solid $border-token;
  }

  // ── Team/Album toggle button ──────────────────────────────────
  .team-toggle-wrap {
      margin-bottom: 16px;
  }

  .team-toggle {
      width: 100%;
      display: flex;
      align-items: center;
      background: $bg-alt;
      border: 1px solid $border-token;
      border-radius: $radius-md;
      padding: 12px 20px;
      cursor: pointer;
      text-align: left;
      transition: background $transition-base, border-color $transition-base;
      appearance: none;
      -webkit-appearance: none;

      &:hover {
          background: $primary-tint;
          border-color: rgba($primary, 0.3);
      }

      &:focus-visible {
          outline: 2px solid $primary;
          outline-offset: 2px;
      }
  }

  .team-toggle-text {
      flex: 1;
  }

  .team-toggle-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: $text-primary;
      display: block;
  }

  .team-toggle-arrow {
      color: $primary;
      font-size: 1rem;
      line-height: 1;
      display: inline-block;
      transition: transform $transition-base;
      margin-left: 12px;
  }

  .team-toggle:not(.collapsed) .team-toggle-arrow {
      transform: rotate(180deg);
  }
  // ─────────────────────────────────────────────────────────────
  ```

- [ ] **Step 2: Replace `⌄` arrows with proper CSS in `index.html`**

  The team toggle buttons currently use `⌄` as the arrow text. In `index.html`, find each occurrence of:
  ```html
  <span class="team-toggle-arrow">⌄</span>
  ```
  Replace with:
  ```html
  <span class="team-toggle-arrow">▾</span>
  ```
  (There are 5 occurrences: PhD, Graduate, Undergraduate, RA, Alumni.)

  Also find the album toggle arrow if it uses the same character.

- [ ] **Step 3: Compile and verify**
  ```bash
  npx sass assets/scss/creative-studio.scss assets/css/creative-studio.css
  ```
  Team cards: 120×120px rounded photos, bold English name, gray Chinese name. Toggle buttons: light gray background, pink arrow that rotates when collapsed.

- [ ] **Step 4: Commit**
  ```bash
  git add assets/scss/components/_cards.scss index.html
  git commit -m "feat: team cards 120px photos, styled toggle buttons with rotating arrow"
  ```

---

## Task 12: Album/Gallery cards

**Files:** `assets/scss/components/_cards.scss`, `index.html`

- [ ] **Step 1: Add album card styles to `_cards.scss`**

  Find existing `.album-card`, `.album-section figure`, or `.album-section img` rules and replace/append:
  ```scss
  // ── Album / Gallery Cards ─────────────────────────────────────
  .album-section figure {
      margin: 0;
  }

  .album-section .album-img-wrap {
      aspect-ratio: 4 / 3;
      overflow: hidden;
      border-radius: $radius-md;
      box-shadow: $shadow-sm;
      transition: transform $transition-base, box-shadow $transition-base;

      &:hover {
          transform: translateY(-3px);
          box-shadow: $shadow-md;
      }
  }

  .album-section .album-img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
  }

  .album-section .album-img-wrap:hover img {
      transform: scale(1.04);
  }

  .album-section figcaption {
      font-size: 0.82rem;
      color: $text-secondary;
      margin-top: 8px;
      line-height: 1.4;
      min-height: 36px;
  }
  // ─────────────────────────────────────────────────────────────
  ```

- [ ] **Step 2: Wrap album images in `index.html`**

  The gallery images are currently `<figure><img ...><figcaption>...</figcaption></figure>`. Wrap each `<img>` inside an `.album-img-wrap` div:
  ```html
  <!-- BEFORE -->
  <figure class="col-xl-4 col-md-6 col-12 g-4">
    <img src="assets/imgs/album/Photo1.jpg" class="img-fluid" alt="..." loading="lazy">
    <figcaption>...</figcaption>
  </figure>
  
  <!-- AFTER -->
  <figure class="col-xl-4 col-md-6 col-12 g-4">
    <div class="album-img-wrap">
      <img src="assets/imgs/album/Photo1.jpg" alt="..." loading="lazy" decoding="async">
    </div>
    <figcaption>...</figcaption>
  </figure>
  ```
  Apply this pattern to all album figures. Also ensure `loading="lazy"` and `decoding="async"` are on every album image.

- [ ] **Step 3: Compile and verify**
  ```bash
  npx sass assets/scss/creative-studio.scss assets/css/creative-studio.css
  ```
  Gallery images: 4:3 aspect ratio, rounded corners, subtle lift on hover.

- [ ] **Step 4: Commit**
  ```bash
  git add assets/scss/components/_cards.scss index.html
  git commit -m "feat: album gallery cards with 4:3 ratio, rounded corners, hover lift"
  ```

---

## Task 13: Footer

**Files:** `assets/scss/layout/_footer.scss`, `index.html`

- [ ] **Step 1: Replace `_footer.scss` content**

  Replace the entire content of `assets/scss/layout/_footer.scss` with:
  ```scss
  // ── Footer ───────────────────────────────────────────────────
  .footer {
      padding: 72px 0 0 0;
  }

  .footer-lists {
      display: flex;
      justify-content: space-around;

      @include media-breakpoint-down(md) {
          flex-direction: column;
          align-items: flex-start;
          padding: 0 24px;
          gap: 40px;
      }
  }

  .footer .list {
      list-style: none;
      padding: 0 20px;
      margin: 0;
      width: calc(100% / 3);

      @include media-breakpoint-down(md) {
          width: 100%;
          padding: 0;
      }
  }

  .footer .list-head {
      margin-bottom: 14px;

      h6 {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba($white, 0.45);
          margin-bottom: 0;
      }
  }

  .footer .list-body {
      a {
          display: block;
          font-size: 0.9rem;
          color: rgba($white, 0.65);
          text-decoration: none;
          margin-bottom: 8px;
          transition: color $transition-base;

          &:hover {
              color: $white;
          }
      }

      p {
          font-size: 0.88rem;
          color: rgba($white, 0.55);
          margin-bottom: 6px;
          line-height: 1.6;

          i {
              display: inline-block;
              width: 18px;
              color: rgba($white, 0.4);
          }
      }
  }

  // Logo row inside footer
  .footer .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
      text-decoration: none !important;

      img {
          width: 32px;
          height: 32px;
          border-radius: 8px;
      }

      h6 {
          font-size: 1rem;
          font-weight: 700;
          color: $white !important;
          margin-bottom: 0;
      }
  }

  // Copyright strip
  .footer-copyright {
      margin-top: 48px;
      border-top: 1px solid rgba($white, 0.08);
      padding: 16px 0;
      text-align: center;
      font-size: 0.8rem;
      color: rgba($white, 0.35);
  }

  @include media-breakpoint-down(sm) {
      .footer {
          padding-top: 48px;
      }
  }
  // ─────────────────────────────────────────────────────────────
  ```

- [ ] **Step 2: Add copyright bar to footer HTML in `index.html`**

  In the `<section class="has-bg-img" id="contact">` section, find the closing `</div>` of `.footer` (before `</div></section>`) and insert:
  ```html
        </div><!-- .footer-lists -->
        <div class="footer-copyright">
          © 2026 HMI Lab, National Tsing Hua University. All rights reserved.
        </div>
      </div><!-- .footer -->
    </div><!-- .container -->
  </section>
  ```

- [ ] **Step 3: Compile and verify**
  ```bash
  npx sass assets/scss/creative-studio.scss assets/css/creative-studio.css
  ```
  Footer: 3-column layout on desktop, stacks on mobile, muted link colours that brighten on hover, copyright strip at bottom.

- [ ] **Step 4: Commit**
  ```bash
  git add assets/scss/layout/_footer.scss index.html
  git commit -m "feat: footer with copyright strip, muted links, refined spacing"
  ```

---

## Task 14: Accessibility and performance

**Files:** `index.html`, `assets/js/creative-studio.js`, `assets/scss/base/_base.scss`

- [ ] **Step 1: Add `alt` attributes to collaborator images in `index.html`**

  Find the collaborators section (id="testimonial"). Each `<img>` in that section is missing `alt`. Add descriptive alt text to each:
  ```html
  <img src="assets/imgs/collaborator/tcvgh.png" class="img-fluid" alt="Taichung Veterans General Hospital logo">
  <img src="assets/imgs/collaborator/hitilab.png" class="img-fluid" alt="Healthcare Innovation and Translational Informatics Lab, Emory University logo">
  <img src="assets/imgs/collaborator/icp.png" class="img-fluid" alt="Laboratory for Computational Physiology, MIT logo">
  <img src="assets/imgs/collaborator/sinica.png" class="img-fluid" alt="Functional Neuroimaging Lab, Academia Sinica logo">
  <img src="assets/imgs/collaborator/oja.jpg" class="img-fluid" alt="Research Centre Jülich logo">
  <img src="assets/imgs/collaborator/bml.png" class="img-fluid" alt="Brain Mapping Lab, NYMU logo">
  <img src="assets/imgs/collaborator/tmu.jpg" class="img-fluid" alt="Taipei Medical University logo">
  <img src="assets/imgs/collaborator/sta.png" class="img-fluid" alt="Institute of Statistical Mathematics, Japan logo">
  <img src="assets/imgs/collaborator/swartz.jpg" class="img-fluid" alt="UCSD Swartz Center for Computational Neuroscience logo">
  <img src="assets/imgs/collaborator/info.jpg" class="img-fluid" alt="Institute for Information Industry, Taiwan logo">
  <img src="assets/imgs/collaborator/ntuh.png" class="img-fluid" alt="NTU Hospital Hsinchu Branch logo">
  ```

- [ ] **Step 2: Add hero image preload hint to `<head>` in `index.html`**

  In the `<head>` section, after the existing `<link rel="icon">` line, add:
  ```html
  <link rel="preload" as="image" href="assets/imgs/header.png" />
  ```

- [ ] **Step 3: Add `lang="zh-TW"` to Chinese name spans in `creative-studio.js`**

  In `creative-studio.js`, find the `createMemberCard` function. Change:
  ```javascript
  const zhHtml = member.zh ? `<p class="team-name-zh">${member.zh}</p>` : "";
  ```
  To:
  ```javascript
  const zhHtml = member.zh ? `<p class="team-name-zh" lang="zh-TW">${member.zh}</p>` : "";
  ```

- [ ] **Step 4: Add focus-visible ring to `_base.scss`**

  In `assets/scss/base/_base.scss`, append:
  ```scss
  // Global focus ring for keyboard navigation
  :focus-visible {
      outline: 2px solid $primary;
      outline-offset: 3px;
  }

  // Remove focus ring for mouse users (handled per-component where needed)
  :focus:not(:focus-visible) {
      outline: none;
  }
  ```

- [ ] **Step 5: Mark decorative icons as `aria-hidden` in `index.html`**

  In the news/blog section, the clock icons are decorative. Find all `<i class="fa fa-clock-o">` and add `aria-hidden="true"`:
  ```html
  <i class="fa fa-clock-o" aria-hidden="true"></i>
  ```
  Do the same for Themify icon `<i class="ti-...">` elements in the footer contact list and anywhere they convey no meaning independently.

- [ ] **Step 6: Compile and verify**
  ```bash
  npx sass assets/scss/creative-studio.scss assets/css/creative-studio.css
  ```
  Open browser. Tab through the page with keyboard — each interactive element shows the pink focus ring. Collaborator images show alt text on hover.

- [ ] **Step 7: Commit**
  ```bash
  git add index.html assets/js/creative-studio.js assets/scss/base/_base.scss
  git commit -m "feat: accessibility improvements and performance optimisations"
  ```

---

## Task 15: Final build and visual verification

- [ ] **Step 1: Full compile**
  ```bash
  npx sass assets/scss/creative-studio.scss assets/css/creative-studio.css
  ```
  Expected: exits 0, no warnings.

- [ ] **Step 2: Start dev server**
  ```bash
  python3 -m http.server 8080
  ```

- [ ] **Step 3: Desktop visual checklist**

  Open `http://localhost:8080` and verify each item:

  | Check | Expected |
  |-------|----------|
  | Navbar transparent | Hero background visible through navbar |
  | Navbar on scroll | White background, pink scrollspy bar grows |
  | Research dropdown on hover | Panel with 4 area links appears |
  | Team dropdown on hover | Panel with 6 role links appears |
  | Contact button | Pink pill in nav, right-most item |
  | Hero overlay | Darker than before, pink eyebrow text |
  | Hero buttons | Pill-shaped, primary pink + ghost outline |
  | Highlights | 3 icon-in-pink-square boxes, white card, hover lift |
  | About section | Light gray background (`$bg-alt`) |
  | Research section | White background, section-tag pill, 16:9 card images |
  | Album section | Light gray background, 4:3 gallery grid |
  | Team section | White background, 120px photos, styled toggle |
  | Collaborators | Light gray background, logo grid with alt text |
  | News section | White background, date pills, equal-height cards |
  | Footer | Dark bg, muted links, copyright strip |
  | No emojis | None visible anywhere |

- [ ] **Step 4: Mobile visual checklist (resize to 375px)**

  | Check | Expected |
  |-------|----------|
  | Hamburger | Menu collapses/expands correctly |
  | No dropdown panels | Dropdown panels hidden on mobile |
  | Highlight boxes | Stack vertically |
  | Research cards | 2-column then 1-column |
  | Team cards | Grid wraps appropriately |
  | Footer | Single column |

- [ ] **Step 5: Final commit**
  ```bash
  git add -A
  git status  # confirm only expected files changed
  git commit -m "feat: complete HMI Lab website redesign

  - Design system tokens (shadows, radii, colours, transitions)
  - Research + Team dropdown navigation with scrollspy bar
  - Hero overlay, eyebrow text, pill buttons
  - Highlight icon-boxes with card treatment
  - Explicit alternating section backgrounds
  - Unified card design (research, news, team, album)
  - Styled team/album toggle buttons
  - Accessibility: alt attrs, lang, focus ring, aria-hidden
  - Performance: preload hero, lazy load images"
  ```
