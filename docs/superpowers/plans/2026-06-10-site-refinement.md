# HMI Lab Site Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the HMI Lab website into a clean, academic research-lab aesthetic comparable to MIT CSAIL / Stanford HAI / Berkeley BAIR.

**Architecture:** All changes are surgical patches to three existing files (`index.html`, `assets/css/creative-studio.css`, `assets/js/creative-studio.js`). CSS changes are appended before the final `/*# sourceMappingURL=...*/` line unless stated otherwise. JS changes are inline edits to existing functions or a full IIFE replacement. No new files.

**Tech Stack:** Vanilla HTML/CSS/JS, Bootstrap 4.x, GitHub Pages static hosting.

---

## File Map

| File | Responsibility |
| --- | --- |
| `index.html` | Structure: research card labels, team toggle, news View All button, footer logo HTML, album accordion container |
| `assets/css/creative-studio.css` | All visual styles — append new override block before final sourceMappingURL line |
| `assets/js/creative-studio.js` | Team card role labels, news hide/expand logic, album accordion IIFE |

---

## Task 1: CSS Foundation — Section Labels and Visual Cleanup

**Files:**

- Modify: `assets/css/creative-studio.css` (append before sourceMappingURL)

- [ ] **Step 1.1: Open `creative-studio.css` and find the last line**

  The file ends with:
  ```
  /*# sourceMappingURL=creative-studio.css.map */
  ```
  All new CSS in this plan is appended **immediately before** that line.

- [ ] **Step 1.2: Append the foundation overrides**

  Add the following block before the sourceMappingURL line:

  ```css
  /* ============================================================
     Site Refinement 2026-06-10
  ============================================================ */

  /* 1. Section tag — remove pink pill, plain grey uppercase label */
  .section-tag {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.10em;
    color: #9ca3af;
    background: none;
    border: none;
    border-radius: 0;
    padding: 0;
    margin-bottom: 10px;
  }

  /* 2. Remove card borders and heavy shadows — whitespace does the work */
  .research-card,
  .blog-card {
    border: none;
    box-shadow: none;
  }
  .research-card:hover,
  .blog-card:hover {
    box-shadow: none;
    transform: translateY(-2px);
  }
  .lab-highlights .box-item {
    border: none;
    box-shadow: none;
    background: #f9fafb;
  }
  .lab-highlights .box-item:hover {
    background: #f3f4f6;
    box-shadow: none;
    transform: none;
  }

  /* 3. Collaborator frame — subtle border only */
  .collab-logo-frame {
    border-color: #f0f0f4;
    padding: 14px 18px;
  }
  .collab-logo-frame:hover {
    border-color: #e5e7eb;
    background: #fff;
  }

  /* 4. Collaborator caption width */
  .collab-caption {
    max-width: 15ch;
  }
  ```

- [ ] **Step 1.3: Verify in browser**

  Open `index.html` locally. Confirm:
  - Section labels (Research, People, Album, News) are plain grey uppercase text with no pink background pill
  - Research cards and news cards have no visible border or shadow at rest
  - Highlight cards show a light `#f9fafb` background with no border

- [ ] **Step 1.4: Commit**

  ```bash
  git add assets/css/creative-studio.css
  git commit -m "style: remove section-tag pill and card borders for academic aesthetic"
  ```

---

## Task 2: Logo — Navbar CSS Fix and Footer Image

**Files:**

- Modify: `assets/css/creative-studio.css` (one inline edit + one append)
- Modify: `index.html`

- [ ] **Step 2.1: Remove duplicate navbar logo rule**

  Search `creative-studio.css` for the block:
  ```css
  .custom-navbar .navbar-brand img {
    width: 50px;
  }
  ```
  Delete that entire rule (3 lines). A second identical-selector rule survives and will be updated next.

- [ ] **Step 2.2: Update the surviving navbar logo rule**

  Find in `creative-studio.css`:
  ```css
  .custom-navbar .navbar-brand img {
    width: 42px;
  }
  ```
  Replace with:
  ```css
  .custom-navbar .navbar-brand img {
    width: 42px;
    height: auto;
    display: block;
  }
  ```

- [ ] **Step 2.3: Replace footer logo in `index.html`**

  Find:
  ```html
  <a href="#home" class="logo">
    <div class="footer-logo-icon"></div>
    <h6>HMI Lab</h6>
  </a>
  ```
  Replace with:
  ```html
  <a href="#home" class="logo">
    <img src="assets/imgs/logo2.png" alt="HMI Lab" class="footer-logo-img">
    <h6>HMI Lab</h6>
  </a>
  ```

- [ ] **Step 2.4: Append footer logo CSS**

  In the refinement block (before sourceMappingURL), append:
  ```css
  /* Logo */
  .footer-logo-img {
    width: 30px;
    height: auto;
    display: block;
    opacity: 0.85;
    flex-shrink: 0;
  }
  ```

- [ ] **Step 2.5: Verify**

  - Navbar logo shows at 42px, no distortion
  - Footer shows `logo2.png` image instead of the red square
  - Both look correct on narrow viewport (test at 375px width)

- [ ] **Step 2.6: Commit**

  ```bash
  git add assets/css/creative-studio.css index.html
  git commit -m "fix: consolidate navbar logo CSS and restore footer image logo"
  ```

---

## Task 3: Navbar CTA — Remove Contact Border

**Files:**

- Modify: `assets/css/creative-studio.css` (append)

- [ ] **Step 3.1: Append navbar CTA override**

  ```css
  /* Navbar — strip CTA border from Contact link */
  .custom-navbar .nav-cta {
    border: none !important;
    border-radius: 0 !important;
    padding: 7px 9px !important;
    margin-left: 0 !important;
    box-shadow: none !important;
  }
  .custom-navbar .nav-cta:hover,
  .custom-navbar .nav-cta:focus {
    background: transparent !important;
    box-shadow: none !important;
  }
  .custom-navbar.affix .nav-cta {
    border: none !important;
  }
  .custom-navbar.affix .nav-cta:hover,
  .custom-navbar.affix .nav-cta:focus {
    background: transparent !important;
    border: none !important;
  }
  ```

- [ ] **Step 3.2: Verify**

  The "Contact" nav item has no border or pill shape. It looks identical in weight to other nav links.

- [ ] **Step 3.3: Commit**

  ```bash
  git add assets/css/creative-studio.css
  git commit -m "style: remove CTA border from Contact nav link"
  ```

---

## Task 4: Hero — Height, Overlay, Kicker, White Hierarchy

**Files:**

- Modify: `assets/css/creative-studio.css` (two inline edits + appends)

- [ ] **Step 4.1: Update hero kicker — remove pink color**

  Find this block in `creative-studio.css` (around line 10439–10447):
  ```css
  .hero-kicker {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #ff214f;
    margin-bottom: 16px;
    opacity: 1;
  }
  ```
  Remove the `color: #ff214f;` line and the `opacity: 1;` line. Leave all other properties.

- [ ] **Step 4.2: Replace the second hero-kicker block**

  Find this block (around line 10953–10958):
  ```css
  .hero-kicker {
    color: rgba(255, 255, 255, 0.68);
    font-size: 0.76rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    margin-bottom: 18px;
  }
  ```
  Replace the entire block with:
  ```css
  .hero-kicker {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: rgba(255, 255, 255, 0.65);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  .hero-kicker::before {
    content: "";
    display: inline-block;
    width: 20px;
    height: 1.5px;
    background: #ff214f;
    border-radius: 1px;
    flex-shrink: 0;
  }
  ```

- [ ] **Step 4.3: Append hero height, overlay, and hierarchy overrides**

  ```css
  /* Hero — height, overlay, content width, white hierarchy */
  .header {
    min-height: 520px;
  }
  @media (max-width: 767.98px) {
    .header {
      min-height: 540px;
    }
  }

  .header .overlay {
    background: linear-gradient(
      90deg,
      rgba(5, 6, 16, 0.92) 0%,
      rgba(8, 9, 24, 0.78) 46%,
      rgba(8, 9, 24, 0.60) 100%
    );
  }
  @media (max-width: 767.98px) {
    .header .overlay {
      background: linear-gradient(
        180deg,
        rgba(5, 6, 16, 0.90),
        rgba(6, 8, 20, 0.78)
      );
    }
  }

  .hero-content {
    max-width: 600px;
  }

  .header .subtitle {
    font-weight: 400;
    color: rgba(255, 255, 255, 0.80);
  }

  .hero-description {
    color: rgba(255, 255, 255, 0.62);
  }
  ```

- [ ] **Step 4.4: Verify**

  - Kicker shows a short pink rule (`—`) before the text, text is white/dim
  - Title "HMI Lab" is pure white with no pink tint
  - Subtitle is slightly dimmer than title; description paragraph is noticeably dimmer than subtitle
  - Hero is slightly shorter overall; background image is darker (less dominant)

- [ ] **Step 4.5: Commit**

  ```bash
  git add assets/css/creative-studio.css
  git commit -m "style: refine hero kicker, overlay, and white typography hierarchy"
  ```

---

## Task 5: Typography System and Section Rhythm

**Files:**

- Modify: `assets/css/creative-studio.css` (append)

- [ ] **Step 5.1: Append typography scale**

  ```css
  /* Typography scale */
  .header .title {
    font-size: clamp(4.5rem, 6vw, 5rem);
    font-weight: 600;
  }

  .section-title {
    font-size: clamp(3rem, 4.5vw, 3.5rem);
    font-weight: 600;
  }

  .research-title,
  .blog-title {
    font-size: clamp(1.5rem, 2vw, 1.75rem);
    font-weight: 600;
  }

  .box-title {
    font-weight: 600;
  }

  body {
    font-size: 1.0625rem;
  }

  /* Body text width limit — 65 characters max for readability */
  .about-text,
  .research-text,
  .blog-text,
  .section-desc {
    max-width: 65ch;
  }
  ```

- [ ] **Step 5.2: Append section rhythm**

  ```css
  /* Section rhythm — standardized vertical padding */
  .research-section,
  .team-section,
  .blog-section,
  .about-section {
    padding-top: 96px;
    padding-bottom: 96px;
  }

  @media (max-width: 991.98px) {
    .research-section,
    .team-section,
    .blog-section,
    .about-section {
      padding-top: 72px;
      padding-bottom: 72px;
    }
  }

  @media (max-width: 767.98px) {
    .research-section,
    .team-section,
    .blog-section,
    .about-section {
      padding-top: 56px;
      padding-bottom: 56px;
    }
  }

  .section-header {
    margin-bottom: 48px;
  }
  ```

- [ ] **Step 5.3: Verify**

  - "HMI Lab" hero title is visually 72–80px on desktop
  - Section titles ("Our Research Areas", "Our Team", "Latest News") are noticeably larger than before (~48px on desktop)
  - Research card titles and news card titles are ~24–28px
  - Consistent vertical breathing room between all sections

- [ ] **Step 5.4: Commit**

  ```bash
  git add assets/css/creative-studio.css
  git commit -m "style: apply typography scale and standardize section vertical rhythm"
  ```

---

## Task 6: Highlight Cards — Equal Height Structure

**Files:**

- Modify: `assets/css/creative-studio.css` (append)

- [ ] **Step 6.1: Append highlight card flex fix**

  ```css
  /* Highlight cards — flex layout for equal internal structure */
  .lab-highlights .box-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .lab-highlights .box-text {
    flex: 1;
  }
  ```

- [ ] **Step 6.2: Verify**

  The three highlight cards (Digital Health, AI for Medicine, Human-Machine Interaction) are equal height with text vertically distributed consistently.

- [ ] **Step 6.3: Commit**

  ```bash
  git add assets/css/creative-studio.css
  git commit -m "style: fix highlight card equal height with flex layout"
  ```

---

## Task 7: Research Cards — Area Label, Descriptions, Flex Layout

**Files:**

- Modify: `index.html`
- Modify: `assets/css/creative-studio.css` (append)

- [ ] **Step 7.1: Update research card HTML**

  In `index.html`, find each `<p class="research-question">...</p>` and replace as follows.

  **Card 1 — Trustworthy AI for Medicine:**
  Find:
  ```html
  <p class="research-question">
    Can we capture a photo and obtain immediate diagnostic support from chest X-ray images?
  </p>
  <h5 class="research-title">Trustworthy AI for Medicine</h5>
  <p class="research-text">
    We develop human-centered AI systems for healthcare using medical images,
    physiological signals, and electronic health records for clinical prediction,
    decision support, and interpretable analysis.
  </p>
  ```
  Replace with:
  ```html
  <p class="research-area-tag">Medical AI</p>
  <h5 class="research-title">Trustworthy AI for Medicine</h5>
  <p class="research-text">
    We develop human-centered AI for clinical decision support using medical images,
    physiological signals, and electronic health records.
  </p>
  ```

  **Card 2 — Brain Encoding and Decoding:**
  Find:
  ```html
  <p class="research-question">
    How does the human brain represent and recognize faces and other complex information?
  </p>
  <h5 class="research-title">Brain Encoding and Decoding</h5>
  <p class="research-text">
    We investigate how the brain encodes information and apply machine learning
    methods to decode neural activity patterns from neuroimaging data.
  </p>
  ```
  Replace with:
  ```html
  <p class="research-area-tag">Neuroscience</p>
  <h5 class="research-title">Brain Encoding and Decoding</h5>
  <p class="research-text">
    We investigate how the brain encodes information and apply machine learning
    to decode neural activity from neuroimaging data.
  </p>
  ```

  **Card 3 — Human-Machine Interaction:**
  Find:
  ```html
  <p class="research-question">
    Can intelligent systems help people learn and interact more effectively?
  </p>
  <h5 class="research-title">Human-Machine Interaction</h5>
  <p class="research-text">
    We design interactive systems that improve user experience, learning efficiency,
    and decision making through adaptive interfaces and neural feedback.
  </p>
  ```
  Replace with:
  ```html
  <p class="research-area-tag">HCI</p>
  <h5 class="research-title">Human-Machine Interaction</h5>
  <p class="research-text">
    We design adaptive interfaces that improve user experience, learning efficiency,
    and decision-making through neural feedback.
  </p>
  ```

  **Card 4 — Computational Neuroscience:**
  Find:
  ```html
  <p class="research-question">
    How can computational methods reveal the organization of the human brain?
  </p>
  <h5 class="research-title">Computational Neuroscience</h5>
  <p class="research-text">
    We develop statistical and computational approaches for neuroscience research,
    including brain modeling, representation analysis, and neurobiologically informed learning.
  </p>
  ```
  Replace with:
  ```html
  <p class="research-area-tag">Comp. Neuro</p>
  <h5 class="research-title">Computational Neuroscience</h5>
  <p class="research-text">
    We develop statistical and computational approaches for brain modeling,
    representation analysis, and neurobiologically informed machine learning.
  </p>
  ```

- [ ] **Step 7.2: Remove `h-100` from research card wrappers**

  Find all four instances of:
  ```html
  <div class="research-card h-100">
  ```
  Replace each with:
  ```html
  <div class="research-card">
  ```

- [ ] **Step 7.3: Append research card CSS**

  ```css
  /* Research cards — area tag and flex layout */
  .research-area-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #9ca3af;
    margin-bottom: 10px;
  }
  .research-area-tag::before {
    content: "";
    display: inline-block;
    width: 16px;
    height: 1.5px;
    background: #ff214f;
    border-radius: 1px;
    flex-shrink: 0;
  }

  .research-card {
    display: flex;
    flex-direction: column;
  }

  .research-body {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .research-text {
    flex: 1;
  }
  ```

- [ ] **Step 7.4: Verify**

  All four research cards:
  - Show a pink leading rule + grey uppercase label (Medical AI / Neuroscience / HCI / Comp. Neuro)
  - Have identical structure (label → title → description)
  - Have identical height within each row; no card is taller due to question text
  - Descriptions are one sentence each

- [ ] **Step 7.5: Commit**

  ```bash
  git add index.html assets/css/creative-studio.css
  git commit -m "style: replace research question with area labels and shorten descriptions to one sentence"
  ```

---

## Task 8: Team Section — Photo Crop and Role Labels

**Files:**

- Modify: `assets/js/creative-studio.js`
- Modify: `assets/css/creative-studio.css` (append)

- [ ] **Step 8.1: Update `createMemberCard` to accept a role argument**

  Find in `creative-studio.js`:
  ```js
  function createMemberCard(member) {
    const zhHtml = member.zh ? `<p class="team-name-zh" lang="zh-TW">${member.zh}</p>` : "";

    return `
      <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
        <div class="team-card">
          <div class="team-photo-wrapper">
            <img
              class="team-photo"
              src="${member.img}"
              alt="${member.en}"
              loading="lazy"
              decoding="async"
              onerror="this.onerror=null;this.src='assets/imgs/team/nophoto.png';"
            >
          </div>
          <div class="team-card-body">
            <h6 class="team-name-en">${member.en}</h6>
            ${zhHtml}
          </div>
        </div>
      </div>
    `;
  }
  ```
  Replace with:
  ```js
  function createMemberCard(member, role) {
    const zhHtml = member.zh ? `<p class="team-name-zh" lang="zh-TW">${member.zh}</p>` : "";
    const roleHtml = role ? `<p class="team-role-label">${role}</p>` : "";

    return `
      <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
        <div class="team-card">
          <div class="team-photo-wrapper">
            <img
              class="team-photo"
              src="${member.img}"
              alt="${member.en}"
              loading="lazy"
              decoding="async"
              onerror="this.onerror=null;this.src='assets/imgs/team/nophoto.png';"
            >
          </div>
          <div class="team-card-body">
            <h6 class="team-name-en">${member.en}</h6>
            ${zhHtml}
            ${roleHtml}
          </div>
        </div>
      </div>
    `;
  }
  ```

- [ ] **Step 8.2: Update `renderMembers` to accept and pass the role**

  Find:
  ```js
  function renderMembers(targetId, members) {
    const container = document.getElementById(targetId);
    if (!container) return;
    container.innerHTML = members.map(createMemberCard).join("");
  }
  ```
  Replace with:
  ```js
  function renderMembers(targetId, members, role) {
    const container = document.getElementById(targetId);
    if (!container) return;
    container.innerHTML = members.map(function (m) { return createMemberCard(m, role); }).join("");
  }
  ```

- [ ] **Step 8.3: Pass role strings at each call site**

  Find:
  ```js
  renderMembers("pi-list", teamData.pi);

  renderMembers("phd-list", teamData.phd);
  renderMembers("graduate-list", teamData.graduate);
  renderMembers("undergraduate-list", teamData.undergraduate);
  renderMembers("ra-list", teamData.ra);
  renderMembers("alumni-list", teamData.alumni);
  ```
  Replace with:
  ```js
  renderMembers("pi-list", teamData.pi, "Principal Investigator");

  renderMembers("phd-list", teamData.phd, "PhD Student");
  renderMembers("graduate-list", teamData.graduate, "Graduate Student");
  renderMembers("undergraduate-list", teamData.undergraduate, "Undergraduate Student");
  renderMembers("ra-list", teamData.ra, "Research Assistant");
  renderMembers("alumni-list", teamData.alumni, "Alumni");
  ```

- [ ] **Step 8.4: Append team CSS**

  ```css
  /* Team — square photo crop and role label */
  .team-photo-wrapper {
    aspect-ratio: 1 / 1;
    overflow: hidden;
    border-radius: 8px;
  }

  .team-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
  }

  .team-role-label {
    font-size: 0.72rem;
    color: #9ca3af;
    font-weight: 400;
    margin-top: 2px;
    margin-bottom: 0;
  }
  ```

- [ ] **Step 8.5: Verify**

  - Expand the PhD Students section. Each card shows: square photo, English name, Chinese name, "PhD Student" in small grey text.
  - Expand Graduate Students. Role says "Graduate Student".
  - Photos all appear as squares regardless of original image dimensions.

- [ ] **Step 8.6: Commit**

  ```bash
  git add assets/js/creative-studio.js assets/css/creative-studio.css
  git commit -m "feat: add role labels to team cards and standardize photo to 1:1 square crop"
  ```

---

## Task 9: News — Limit to 3, View All Button

**Files:**

- Modify: `index.html`
- Modify: `assets/js/creative-studio.js`
- Modify: `assets/css/creative-studio.css` (append)

- [ ] **Step 9.1: Add "View All News" button to `index.html`**

  Find the news section's closing markup — the `</div>` that closes the `<div class="row g-4">` grid, followed by the closing `</div>` of `.container` and `</section>`:
  ```html
    </div>
  </div>
</section>
<!-- End News Section -->
  ```
  Insert the button between the row `</div>` and the container `</div>`:
  ```html
    </div>
    <div class="news-view-all text-center mt-4">
      <button class="news-expand-btn" type="button">View All News</button>
    </div>
  </div>
</section>
<!-- End News Section -->
  ```

- [ ] **Step 9.2: Add news expand JS**

  In `creative-studio.js`, find the very end of the file (the last `}());` which closes the album IIFE). After it, add a new IIFE:

  ```js
  /* =========================
     News Expand
  ========================= */
  (function () {
    var newsItems = document.querySelectorAll('#blog .col-md-6.col-lg-4');
    var expandBtn = document.querySelector('.news-expand-btn');
    if (!newsItems.length || !expandBtn) return;

    for (var i = 3; i < newsItems.length; i++) {
      newsItems[i].classList.add('news-item-hidden');
    }

    if (newsItems.length <= 3) {
      if (expandBtn.parentElement) expandBtn.parentElement.hidden = true;
      return;
    }

    expandBtn.addEventListener('click', function () {
      document.querySelectorAll('.news-item-hidden').forEach(function (el) {
        el.classList.remove('news-item-hidden');
      });
      if (expandBtn.parentElement) expandBtn.parentElement.hidden = true;
    });
  }());
  ```

- [ ] **Step 9.3: Append news CSS**

  ```css
  /* News — limit to 3, expand button, text clamp */
  .news-item-hidden {
    display: none !important;
  }

  .news-expand-btn {
    background: transparent;
    border: 1px solid #e5e7eb;
    border-radius: 999px;
    padding: 8px 22px;
    font-size: 0.82rem;
    font-weight: 500;
    color: #6b7280;
    cursor: pointer;
    transition: border-color 0.15s ease, color 0.15s ease;
    font-family: inherit;
    -webkit-appearance: none;
    appearance: none;
  }
  .news-expand-btn:hover {
    border-color: #111827;
    color: #111827;
  }

  .blog-text {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .blog-link {
    margin-top: auto;
    padding-top: 12px;
    display: block;
  }
  ```

- [ ] **Step 9.4: Verify**

  - News section shows exactly 3 cards on page load
  - A "View All News" button appears below the three cards
  - Clicking it reveals all remaining news cards and hides the button
  - Each card's text summary is clamped to 3 lines

- [ ] **Step 9.5: Commit**

  ```bash
  git add index.html assets/js/creative-studio.js assets/css/creative-studio.css
  git commit -m "feat: limit news to 3 items with View All expand button"
  ```

---

## Task 10: Footer — Hierarchy and Link Contrast

**Files:**

- Modify: `assets/css/creative-studio.css` (append)

*(The footer logo HTML change was done in Task 2.)*

- [ ] **Step 10.1: Append footer refinement CSS**

  ```css
  /* Footer — label hierarchy and link contrast */
  .footer .list-head h6 {
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    color: rgba(255, 255, 255, 0.35);
    font-weight: 700;
  }

  .footer .list-body a {
    color: rgba(255, 255, 255, 0.60);
  }
  .footer .list-body a:hover {
    color: rgba(255, 255, 255, 0.90);
  }
  ```

- [ ] **Step 10.2: Verify**

  Footer section labels (ABOUT THE LAB, LINKS, CONTACT) are small grey uppercase. Footer links are subtly dim, brightening clearly on hover.

- [ ] **Step 10.3: Commit**

  ```bash
  git add assets/css/creative-studio.css
  git commit -m "style: improve footer label hierarchy and link contrast"
  ```

---

## Task 11: Album — Accordion Architecture

This is the most complex task. Read all steps before starting.

**Files:**

- Modify: `index.html`
- Modify: `assets/js/creative-studio.js` (full IIFE replacement)
- Modify: `assets/css/creative-studio.css` (append)

- [ ] **Step 11.1: Update album HTML in `index.html`**

  Find the album section filter and grid:
  ```html
  <div class="album-filter" role="group" aria-label="Filter by year">
    <button class="album-filter-btn" type="button" data-year="2026" aria-pressed="false">2026</button>
    <button class="album-filter-btn" type="button" data-year="2025" aria-pressed="false">2025</button>
    <button class="album-filter-btn" type="button" data-year="2024" aria-pressed="false">2024</button>
    <button class="album-filter-btn" type="button" data-year="2023" aria-pressed="false">2023</button>
    <button class="album-filter-btn" type="button" data-year="2022" aria-pressed="false">2022</button>
    <button class="album-filter-btn" type="button" data-year="2021" aria-pressed="false">2021</button>
    <button class="album-filter-btn" type="button" data-year="2020" aria-pressed="false">2020</button>
  </div>

  <div class="row justify-content-center g-4" id="albumGrid"></div><!-- #albumGrid -->

    <div class="album-actions">
      <button class="album-load-more" type="button" hidden>Load More</button>
    </div>
  ```
  Replace with:
  ```html
  <div class="album-accordion" id="albumAccordion"></div>

  <div class="album-actions">
    <button class="album-load-more" type="button" hidden>Load More</button>
  </div>
  ```

- [ ] **Step 11.2: Replace the Album Archive IIFE in `creative-studio.js`**

  Find the entire block from line 430 to the end of file:
  ```js
  /* =========================
     Album Archive
  ========================= */
  (function () {
  ```
  through the closing `}());` at the end of the file.

  Replace everything from that comment through the end of file with:

  ```js
  /* =========================
     Album Archive
  ========================= */
  (function () {
    var pageSize = 9;
    var albumData = [
      { year: '2026', src: 'assets/imgs/album/photo32.jpg', alt: '2026 AAAI at Singapore', caption: '2026 AAAI @ Singapore' },
      { year: '2025', src: 'assets/imgs/album/photo31.jpg', alt: '2025 Hiking', caption: '2025 Hiking' },
      { year: '2025', src: 'assets/imgs/album/photo30.jpg', alt: '2025 Banquet 2', caption: '2025 Banquet 2' },
      { year: '2025', src: 'assets/imgs/album/photo29.jpg', alt: "2025 Teacher's Day", caption: "2025 Teacher's Day" },
      { year: '2025', src: 'assets/imgs/album/photo28.jpg', alt: 'First Place at Health AI Datathon 2025 in Atlanta', caption: "First Place at Health AI DATATHON '25 @ Atlanta" },
      { year: '2025', src: 'assets/imgs/album/photo27.jpg', alt: '2025 Banquet 1', caption: '2025 Banquet 1' },
      { year: '2025', src: 'assets/imgs/album/photo26.jpg', alt: '2025 Graduation', caption: '2025 Graduation!' },
      { year: '2025', src: 'assets/imgs/album/photo25.jpg', alt: '2025 Graduation', caption: '2025 Graduation!' },
      { year: '2025', src: 'assets/imgs/album/photo24.jpg', alt: '2025 Graduation', caption: '2025 Graduation!' },
      { year: '2024', src: 'assets/imgs/album/photo23.jpg', alt: 'TSECC Datathon First Place', caption: 'TSECC Datathon First Place' },
      { year: '2024', src: 'assets/imgs/album/photo22.jpg', alt: 'TSECC Datathon Third Place', caption: 'TSECC Datathon Third Place' },
      { year: '2024', src: 'assets/imgs/album/photo21.jpg', alt: 'TSECC Datathon Best Team Award', caption: 'TSECC Datathon Best Team Award' },
      { year: '2024', src: 'assets/imgs/album/photo20.jpg', alt: 'TSECC Taiwan Datathon 2024', caption: 'TSECC Taiwan Datathon 2024' },
      { year: '2024', src: 'assets/imgs/album/photo19.jpg', alt: '2024 Banquet 2', caption: '2024 Banquet 2' },
      { year: '2024', src: 'assets/imgs/album/photo18.jpg', alt: '2024 EMBS in Orlando Florida', caption: '2024 EMBS @ Orlando, Florida' },
      { year: '2024', src: 'assets/imgs/album/photo17.JPG', alt: '2024 Graduation', caption: '2024 Graduation!' },
      { year: '2024', src: 'assets/imgs/album/photo16.jpg', alt: '2024 Graduation', caption: '2024 Graduation!' },
      { year: '2024', src: 'assets/imgs/album/photo15.jpg', alt: '2024 Graduation', caption: '2024 Graduation!' },
      { year: '2024', src: 'assets/imgs/album/photo14.jpg', alt: '2024 ICASSP in Korea', caption: '2024 ICASSP @ Korea' },
      { year: '2024', src: 'assets/imgs/album/photo13.jpg', alt: '2024 ICASSP in Korea', caption: '2024 ICASSP @ Korea' },
      { year: '2024', src: 'assets/imgs/album/photo11.jpg', alt: '2024 Birthday celebration', caption: '2024 Birthday Celebration!' },
      { year: '2024', src: 'assets/imgs/album/photo10.jpg', alt: '2024 Banquet 1', caption: '2024 Banquet 1' },
      { year: '2023', src: 'assets/imgs/album/photo9.jpg', alt: '2023 Banquet 3', caption: '2023 Banquet 3' },
      { year: '2023', src: 'assets/imgs/album/photo6.JPG', alt: '2023 Banquet 2', caption: '2023 Banquet 2' },
      { year: '2023', src: 'assets/imgs/album/photo7.JPG', alt: '2023 Graduation', caption: '2023 Graduation!' },
      { year: '2023', src: 'assets/imgs/album/photo0.jpg', alt: '2023 Banquet 1', caption: '2023 Banquet 1' },
      { year: '2022', src: 'assets/imgs/album/photo8.jpg', alt: '2022 September Banquet', caption: '2022.09 Banquet' },
      { year: '2022', src: 'assets/imgs/album/photo1.png', alt: '2022 Summer NTHU HMIers at MIT LCP', caption: '2022 Summer NTHU HMIers at MIT LCP' },
      { year: '2022', src: 'assets/imgs/album/photo2.jpg', alt: '2022 Graduation', caption: '2022 Graduation!' },
      { year: '2022', src: 'assets/imgs/album/photo3.jpg', alt: '2022 January Year end banquet', caption: '2022.01 Year End Banquet' },
      { year: '2021', src: 'assets/imgs/album/photo4.jpg', alt: '2021 January Year end banquet', caption: '2021.01 Year End Banquet' },
      { year: '2020', src: 'assets/imgs/album/photo5.jpg', alt: "2020 September Teacher's Day", caption: "2020.09 Teacher's Day" }
    ];

    var accordion = document.getElementById('albumAccordion');
    var loadMoreBtn = document.querySelector('.album-load-more');
    var lightbox = document.querySelector('.album-lightbox');
    var lightboxImage = document.querySelector('.album-lightbox-image');
    var lightboxCaption = document.querySelector('.album-lightbox-caption');
    var lightboxCount = document.querySelector('.album-lightbox-count');
    var prevBtn = document.querySelector('.album-lightbox-prev');
    var nextBtn = document.querySelector('.album-lightbox-next');

    if (!accordion) return;

    var activeYear = null;
    var activePanel = null;
    var visibleLimit = pageSize;
    var currentItems = [];
    var currentIndex = 0;

    // Derive years in order from albumData
    var years = [];
    var seen = {};
    albumData.forEach(function (item) {
      if (!seen[item.year]) { seen[item.year] = true; years.push(item.year); }
    });

    // Build accordion rows
    years.forEach(function (year) {
      var row = document.createElement('div');
      row.className = 'album-acc-row';
      row.dataset.year = year;
      row.id = 'acc-' + year;
      row.innerHTML = [
        '<button class="album-acc-btn" type="button"',
        ' aria-expanded="false" aria-controls="panel-' + year + '">',
        '<span class="album-acc-year">' + year + '</span>',
        '<span class="album-acc-chevron" aria-hidden="true">&#8250;</span>',
        '</button>',
        '<div class="album-acc-panel" id="panel-' + year + '" hidden>',
        '<div class="row justify-content-center g-3 album-acc-grid"></div>',
        '</div>'
      ].join('');
      accordion.appendChild(row);

      row.querySelector('.album-acc-btn').addEventListener('click', function () {
        if (activeYear === year) {
          closeYear();
        } else {
          closeYear();
          openYear(year, row);
        }
      });
    });

    function createPhotoItem(item) {
      var col = document.createElement('div');
      col.className = 'col-xl-4 col-md-6';
      col.dataset.year = item.year;
      col.innerHTML = [
        '<figure class="album-card" role="button" tabindex="0"',
        ' aria-label="Open ' + item.caption.replace(/"/g, '&quot;') + '">',
        '<div class="album-img-wrap">',
        '<img src="' + item.src + '" alt="' + item.alt.replace(/"/g, '&quot;') + '"',
        ' loading="lazy" decoding="async">',
        '</div>',
        '<figcaption>' + item.caption + '</figcaption>',
        '</figure>'
      ].join('');
      var card = col.querySelector('.album-card');
      card.addEventListener('click', function () {
        var idx = currentItems.indexOf(item);
        if (idx !== -1) openLightbox(idx);
      });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          var idx = currentItems.indexOf(item);
          if (idx !== -1) openLightbox(idx);
        }
      });
      return col;
    }

    function renderPhotos() {
      var yearItems = albumData.filter(function (item) { return item.year === activeYear; });
      var visible = yearItems.slice(0, visibleLimit);
      currentItems = visible;
      var grid = activePanel.querySelector('.album-acc-grid');
      grid.innerHTML = '';
      visible.forEach(function (item) { grid.appendChild(createPhotoItem(item)); });
      if (loadMoreBtn) {
        loadMoreBtn.hidden = visibleLimit >= yearItems.length;
      }
    }

    function openYear(year, row) {
      activeYear = year;
      visibleLimit = pageSize;
      activePanel = row.querySelector('.album-acc-panel');
      row.classList.add('open');
      row.querySelector('.album-acc-btn').setAttribute('aria-expanded', 'true');
      activePanel.hidden = false;
      renderPhotos();
    }

    function closeYear() {
      if (!activeYear) return;
      var row = document.getElementById('acc-' + activeYear);
      if (row) {
        row.classList.remove('open');
        row.querySelector('.album-acc-btn').setAttribute('aria-expanded', 'false');
        var panel = row.querySelector('.album-acc-panel');
        if (panel) {
          panel.hidden = true;
          var grid = panel.querySelector('.album-acc-grid');
          if (grid) grid.innerHTML = '';
        }
      }
      activeYear = null;
      activePanel = null;
      currentItems = [];
      closeLightbox();
      if (loadMoreBtn) loadMoreBtn.hidden = true;
    }

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', function () {
        visibleLimit += pageSize;
        renderPhotos();
      });
    }

    function openLightbox(index) {
      if (!lightbox || !lightboxImage || !currentItems.length) return;
      currentIndex = (index + currentItems.length) % currentItems.length;
      var data = currentItems[currentIndex];
      lightboxImage.setAttribute('src', data.src);
      lightboxImage.setAttribute('alt', data.alt);
      if (lightboxCaption) lightboxCaption.textContent = data.caption;
      if (lightboxCount) lightboxCount.textContent = (currentIndex + 1) + ' / ' + currentItems.length;
      lightbox.hidden = false;
      document.body.classList.add('lightbox-open');
      if (lightbox.setAttribute) lightbox.setAttribute('tabindex', '-1');
    }

    function closeLightbox() {
      if (!lightbox) return;
      lightbox.hidden = true;
      document.body.classList.remove('lightbox-open');
      if (lightboxImage) lightboxImage.setAttribute('src', '');
    }

    function showAdjacent(offset) {
      openLightbox(currentIndex + offset);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { showAdjacent(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { showAdjacent(1); });

    if (lightbox) {
      lightbox.addEventListener('click', function (event) {
        if (event.target.hasAttribute('data-lightbox-close')) closeLightbox();
      });
    }

    document.addEventListener('keydown', function (event) {
      if (!lightbox || lightbox.hidden) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showAdjacent(-1);
      if (event.key === 'ArrowRight') showAdjacent(1);
    });
  }());
  ```

  **Important:** The News Expand IIFE added in Task 9 must appear **after** this block. Place it at the very end of the file.

- [ ] **Step 11.3: Append album accordion CSS**

  ```css
  /* Album accordion */
  .album-accordion {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    overflow: hidden;
    text-align: left;
    margin-top: 24px;
  }

  .album-acc-row {
    border-bottom: 1px solid #e5e7eb;
  }
  .album-acc-row:last-child {
    border-bottom: none;
  }

  .album-acc-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 20px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s ease;
    -webkit-appearance: none;
    appearance: none;
  }
  .album-acc-btn:hover {
    background: #f9fafb;
  }
  .album-acc-row.open > .album-acc-btn {
    background: #fff8f9;
  }
  .album-acc-btn:focus-visible {
    outline: 2px solid #ff214f;
    outline-offset: -2px;
  }

  .album-acc-year {
    font-size: 0.92rem;
    font-weight: 600;
    color: #111827;
  }
  .album-acc-row.open .album-acc-year {
    color: #ff214f;
  }

  .album-acc-chevron {
    font-size: 1.1rem;
    color: #9ca3af;
    line-height: 1;
    transition: transform 0.2s ease, color 0.15s ease;
    display: inline-block;
  }
  .album-acc-row.open .album-acc-chevron {
    transform: rotate(90deg);
    color: #ff214f;
  }

  .album-acc-panel {
    padding: 16px 20px 24px;
    border-top: 1px solid #f3f4f6;
    background: #fff;
  }
  ```

- [ ] **Step 11.4: Verify accordion behavior**

  - On page load the album section shows a bordered accordion with rows: 2026, 2025, 2024, 2023, 2022, 2021, 2020 — no photos visible
  - Click "2025" → row highlights in pale pink, chevron rotates, photos appear below that row
  - Click "2025" again → row collapses, photos disappear
  - Click "2024" (while 2025 is open) → 2025 closes, 2024 opens
  - If 2025 has > 9 photos, a "Load More" button appears below the grid; clicking it loads the next 9

- [ ] **Step 11.5: Verify lightbox still works**

  Click any photo → lightbox opens, shows image with caption and "N / total" counter. Arrow keys and ‹ › buttons navigate. Escape or clicking outside closes it.

- [ ] **Step 11.6: Commit**

  ```bash
  git add index.html assets/js/creative-studio.js assets/css/creative-studio.css
  git commit -m "feat: replace album year filter with accordion — click year to expand/collapse photos"
  ```

---

## Self-Review

### Spec Coverage Check

| Spec section | Covered by task |
| --- | --- |
| §1 Logo navbar CSS fix | Task 2 |
| §1b Footer logo image | Task 2 |
| §2 Navbar CTA | Task 3 |
| §3 Section labels — remove pink pill | Task 1 |
| §4 Hero kicker pink rule | Task 4 |
| §4c White hierarchy | Task 4 |
| §5 Highlight cards flex | Task 6 |
| §6 Research cards area label + flex | Task 7 |
| §7 Album accordion | Task 11 |
| §8 Collaborators — caption width | Task 1 |
| §9 News blog-link margin | Task 9 (blog-link rule) |
| §10 Footer hierarchy | Task 10 |
| §11 Hero height + overlay | Task 4 |
| §12 Typography scale | Task 5 |
| §12 Body text 65ch limit | Task 5 |
| §13 Section rhythm | Task 5 |
| §14 Research descriptions 1 sentence | Task 7 |
| §15 Team photo crop | Task 8 |
| §15 Team role labels | Task 8 |
| §16 Collaborator optical alignment | Task 1 |
| §17 News limit to 3 + View All | Task 9 |
| §17 Blog text 3-line clamp | Task 9 |
| §18 Visual cleanup (borders, shadows) | Task 1 |

All 23 spec requirements have a corresponding task step. No gaps.

### Placeholder Scan

No TBD, TODO, or "similar to Task N" placeholders. All code blocks are complete. All selectors match what exists in the codebase. `createMemberCard(member, role)` is defined in Task 8 Step 1 and called in Task 8 Steps 2–3.

### Type Consistency

- `createMemberCard(member, role)` — defined Task 8.1, called via `renderMembers` Task 8.2–3. ✓
- `openYear(year, row)` / `closeYear()` / `renderPhotos()` — all defined within same IIFE scope. ✓
- `activePanel` — set in `openYear`, used in `renderPhotos`, cleared in `closeYear`. ✓
- `.album-acc-grid` — written in HTML template Task 11.2, targeted by `renderPhotos`. ✓
- `.news-item-hidden` — added by JS Task 9.2, styled Task 9.3. ✓
