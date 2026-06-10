# HMI Lab — Full Site Refinement Spec

**Date:** 2026-06-10  
**Supersedes:** `2026-06-10-hero-cards-logo-refinement.md` (earlier partial spec)  
**Scope:** Approach A — targeted CSS + HTML + JS patches; no section reordering; no new content  
**Files touched:** `index.html`, `assets/css/creative-studio.css`, `assets/js/creative-studio.js`  
**Aesthetic target:** MIT CSAIL / Stanford HAI / Berkeley BAIR — premium academic research lab

---

## 1. Logo

### 1a. Navbar logo — CSS fix

Two conflicting rules for `.custom-navbar .navbar-brand img` (50 px at line ~10158, 42 px at line ~10824) exist. Consolidate to the later rule only:

```css
/* DELETE the earlier rule (~line 10158) */
.custom-navbar .navbar-brand img {
  width: 50px;
}

/* UPDATE the surviving rule (~line 10824) */
.custom-navbar .navbar-brand img {
  width: 42px;
  height: auto;
  display: block;
}
```

No HTML path changes needed — `assets/imgs/logo2.png` matches the file exactly and GitHub Pages will serve it correctly.

### 1b. Footer logo — replace red square with actual image

In `index.html`, inside `.list-body` of the ABOUT THE LAB footer list:

```html
<!-- BEFORE -->
<a href="#home" class="logo">
  <div class="footer-logo-icon"></div>
  <h6>HMI Lab</h6>
</a>

<!-- AFTER -->
<a href="#home" class="logo">
  <img src="assets/imgs/logo2.png" alt="HMI Lab" class="footer-logo-img">
  <h6>HMI Lab</h6>
</a>
```

CSS to add (append at end of file):

```css
.footer-logo-img {
  width: 30px;
  height: auto;
  display: block;
  opacity: 0.85;
  flex-shrink: 0;
}
```

---

## 2. Navbar — Reduce CTA weight

The "Contact" button currently has a visible pill border (`.nav-cta`) which feels startup-like. Strip the border so it reads as a plain nav item with a subtle hover underline, consistent with other links:

```css
/* Append at end of file — overrides the existing .custom-navbar .nav-cta rules */
.custom-navbar .nav-cta {
  border: none !important;
  border-radius: 0 !important;
  padding: 7px 9px !important;
  margin-left: 0 !important;
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

---

## 3. Section Labels — Remove Pink Pill

The current `.section-tag` renders as a pink-background pill (`background: var(--primary-50); border-radius: 999px; color: #ff214f`). This is too loud for an academic site. Replace with a plain small grey uppercase label:

```css
/* Append at end of file */
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
```

This replaces all previously inherited pink-pill properties. No HTML changes.

---

## 4. Hero Typography

### 4a. Title

No change. `color: #fff` is correct. Do not add pink, gradient, or any color treatment.

### 4b. Kicker — pink rule prefix

The block at lines ~10439–10447 sets `color: #ff214f` (pink). The later block at ~10953–10958 partially overrides it.

Steps:

1. In the block at ~10439–10447, **remove** the `color: #ff214f;` and `opacity: 1;` lines only. Keep all other properties.
2. Replace the block at ~10953–10958 entirely with:

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

### 4c. White hierarchy tightening

Three opacity tiers: title (100% white) → subtitle (80%) → description (62%):

```css
/* In the ~10969 block, update .header .subtitle */
.header .subtitle {
  font-weight: 400;                      /* was 500 */
  color: rgba(255, 255, 255, 0.80);      /* was 0.90 */
}

/* In the ~10979 block, update .hero-description */
.hero-description {
  color: rgba(255, 255, 255, 0.62);      /* was 0.78 */
}
```

---

## 5. Highlight Cards — Equal Height Structure

The three `.box-item` cards in `.lab-highlights` share a CSS Grid row so they auto-equalize in height. But their internal layout (icon → title → text) doesn't stretch — the text area can vary. Fix with flex:

```css
/* Append at end of file */
.lab-highlights .box-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.lab-highlights .box-text {
  flex: 1;
}
```

No HTML changes needed.

---

## 6. Research Cards — Remove Question, Add Area Label

### 6a. HTML changes — `index.html`

Replace each `<p class="research-question">…</p>` with `<p class="research-area-tag">LABEL</p>`:

| Card | New label |
| --- | --- |
| Trustworthy AI for Medicine | `Medical AI` |
| Brain Encoding and Decoding | `Neuroscience` |
| Human-Machine Interaction | `HCI` |
| Computational Neuroscience | `Comp. Neuro` |

Remove `h-100` Bootstrap class from all four `.research-card` wrapper divs.

### 6b. CSS — append at end of file

```css
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

The two existing `.research-question` CSS blocks (~lines 9498, 10639) become inert dead code — do not delete them.

---

## 7. Album — Accordion, No Photo Count

### 7a. HTML changes — `index.html`

Replace the entire album section contents (filter buttons + `#albumGrid`) with a bare accordion container. The JS will build the rows dynamically.

```html
<!-- REPLACE the .album-filter div and #albumGrid div with: -->
<div class="album-accordion" id="albumAccordion"></div>
<div class="album-actions">
  <button class="album-load-more" type="button" hidden>Load More</button>
</div>
```

Keep the lightbox markup unchanged. Keep the `<p class="album-intro">` paragraph ("A year-by-year archive…") — it is descriptive prose, not a status counter, so it stays.

### 7b. JS changes — `assets/js/creative-studio.js`

Replace the Album Archive IIFE entirely. New implementation:

**Structure:**

- Group `albumData` by year (order: newest first, derived from data order)
- Build one `.album-acc-row` per year, each containing a `<button>` header and a hidden `.album-acc-panel` with a photo grid
- Click a row: if it's already open → close it; otherwise close any open row, open clicked row, and render photos
- Load More bumps `visibleLimit` for the active year and re-renders that year's panel
- Lightbox: same data and logic as current

**Key variables:**

```js
var pageSize = 9;
var activeYear = null;
var visibleLimit = pageSize;
var currentItems = [];      // photos currently shown in lightbox context
var currentIndex = 0;
```

**Year extraction:** derive years in order from `albumData` using a seen-set:

```js
var years = [];
var seen = {};
albumData.forEach(function(item) {
  if (!seen[item.year]) { seen[item.year] = true; years.push(item.year); }
});
```

**Accordion row HTML template** (produced by `buildAccordionRow(year)`):

```html
<div class="album-acc-row" data-year="YEAR" id="acc-YEAR">
  <button class="album-acc-btn" type="button" aria-expanded="false"
          aria-controls="panel-YEAR">
    <span class="album-acc-year">YEAR</span>
    <span class="album-acc-chevron" aria-hidden="true">&#8250;</span>
  </button>
  <div class="album-acc-panel" id="panel-YEAR" hidden>
    <div class="row justify-content-center g-3 album-acc-grid"></div>
  </div>
</div>
```

**Open/close logic:**

- `openYear(year)`: set `.open` on row, `aria-expanded="true"`, remove `hidden` from panel, render photos into `.album-acc-grid`
- `closeYear()`: remove `.open`, `aria-expanded="false"`, set `hidden` on panel, clear `currentItems`
- Clicking an open row → `closeYear()`; clicking a closed row → `closeYear()` then `openYear(year)`

**Photo rendering** (`renderPhotos(year, panel)`):

- Filter `albumData` by year
- Slice to `visibleLimit`
- Write photo columns into `.album-acc-grid`
- Show/hide Load More button based on `visibleLimit < yearData.length`
- Set `currentItems` to sliced array for lightbox navigation

**Load More:**

- Increment `visibleLimit += pageSize`
- Re-call `renderPhotos(activeYear, activePanel)` without rebuilding the accordion

**Photo item template** (same as current `createAlbumItem`):

```html
<div class="col-xl-4 col-md-6" data-year="YEAR" data-index="N">
  <figure class="album-card" role="button" tabindex="0" aria-label="Open CAPTION">
    <div class="album-img-wrap">
      <img src="SRC" alt="ALT" loading="lazy" decoding="async">
    </div>
    <figcaption>CAPTION</figcaption>
  </figure>
</div>
```

Lightbox logic is unchanged — `openLightbox(index)` uses `currentItems`.

### 7c. CSS — append at end of file

```css
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

Remove the now-unused `.album-filter` and `.album-filter-btn` rules (they will still exist in the CSS but no element uses them — leave as inert dead code to avoid touching old rules).

---

## 8. Collaborators

The grid is already 4-per-row on desktop (`repeat(4, 1fr)`) and 2-per-row on tablet. Logos are `max-height: 62px` — already appropriately sized.

**No grid or layout changes needed.**

Only improvement: tighten caption max-width so long names wrap to 2 lines cleanly and don't overflow on small frames:

```css
/* Append at end of file */
.collab-caption {
  max-width: 15ch;
}
```

---

## 9. News Cards

Blog cards already use `display: flex; flex-direction: column` on `.blog-card` + `flex: 1` on `.blog-card-body`. Height consistency is already handled.

One fix: the last `<a class="blog-link">` "Read more" link inside some cards sits mid-body rather than at the bottom because `.blog-card-body` doesn't push it down. Add `margin-top: auto` to the link:

```css
/* Append at end of file */
.blog-link {
  margin-top: auto;
  padding-top: 12px;
}
```

---

## 10. Footer Hierarchy

The footer logo change is in §1b. Two additional refinements:

**Section heads**: The ABOUT THE LAB / LINKS / CONTACT labels are `.list-head h6` with no letter-spacing. Make them match the `.section-tag` label style:

```css
/* Append at end of file */
.footer .list-head h6 {
  font-size: 0.68rem;
  letter-spacing: 0.12em;
  color: rgba(255, 255, 255, 0.35);
  font-weight: 700;
}
```

**Body link contrast**: Footer links are currently dim. Bump slightly:

```css
.footer .list-body a {
  color: rgba(255, 255, 255, 0.60);
}
.footer .list-body a:hover {
  color: rgba(255, 255, 255, 0.90);
}
```

---

---

## Part 2: Additional Refinements

Addendum 2026-06-10 — extends Part 1

---

## 11. Hero — Height and Overlay

**Height:** Reduce `min-height` from 600px → 520px (≈13% reduction). On mobile reduce from 620px → 540px.

```css
/* Update existing .header rule */
.header {
  min-height: 520px;
}
@media (max-width: 767.98px) {
  .header {
    min-height: 540px;
  }
}
```

**Overlay:** Darken to reduce image dominance. Update the `.header .overlay` background in the latest refinement block (~line 10940):

```css
.header .overlay {
  background:
    linear-gradient(90deg, rgba(5, 6, 16, 0.92) 0%, rgba(8, 9, 24, 0.78) 46%, rgba(8, 9, 24, 0.60) 100%);
}
@media (max-width: 767.98px) {
  .header .overlay {
    background: linear-gradient(180deg, rgba(5, 6, 16, 0.90), rgba(6, 8, 20, 0.78));
  }
}
```

**Content width:** Reduce `.hero-content` max-width from 720px → 600px for tighter line lengths.

```css
.hero-content {
  max-width: 600px;
}
```

---

## 12. Typography System

Target scale:

| Element | Target | CSS value |
| --- | --- | --- |
| Hero title | 72–80px | `clamp(4.5rem, 6vw, 5rem)` |
| Section title | 48–56px | `clamp(3rem, 4.5vw, 3.5rem)` |
| Card title | 24–28px | `clamp(1.5rem, 2vw, 1.75rem)` |
| Body text | 17–18px | `1.0625rem` |

Append at end of file:

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

body {
  font-size: 1.0625rem;
}
```

**Reduce excessive bold:** `.section-title` weight already set to 600 above. Also update `.box-title`:

```css
.box-title {
  font-weight: 600;
}
```

**Body text width limit:** Prevent overly long lines in `.about-text`, `.research-text`, `.blog-text`, and `.section-desc`:

```css
.about-text,
.research-text,
.blog-text,
.section-desc {
  max-width: 65ch;
}
```

---

## 13. Section Rhythm

Standardize all section vertical padding and section header bottom margin. Append:

```css
/* Section spacing normalization */
.research-section,
.team-section,
.blog-section,
.lab-highlights + section,
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

---

## 14. Research Descriptions — Shorten to One Sentence

HTML change in `index.html`. Replace the three-sentence descriptions in each `.research-text` paragraph with single sentences:

| Card | New one-sentence description |
| --- | --- |
| Trustworthy AI for Medicine | "We develop human-centered AI for clinical decision support using medical images, physiological signals, and electronic health records." |
| Brain Encoding and Decoding | "We investigate how the brain encodes information and apply machine learning to decode neural activity from neuroimaging data." |
| Human-Machine Interaction | "We design adaptive interfaces that improve user experience, learning efficiency, and decision-making through neural feedback." |
| Computational Neuroscience | "We develop statistical and computational approaches for brain modeling, representation analysis, and neurobiologically informed machine learning." |

---

## 15. Team — Photo Crop and Role Label

### 15a. Photo crop standardization

All team photos use varying aspect ratios. Force a 1:1 square crop in CSS:

```css
/* Append at end of file */
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
```

### 15b. Role label in cards

Update `createMemberCard(member, role)` in `creative-studio.js` to accept a second `role` argument and render it:

```js
function createMemberCard(member, role) {
  const zhHtml = member.zh ? `<p class="team-name-zh" lang="zh-TW">${member.zh}</p>` : "";
  const roleHtml = role ? `<p class="team-role-label">${role}</p>` : "";
  return `
    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6">
      <div class="team-card">
        <div class="team-photo-wrapper">
          <img class="team-photo" src="${member.img}" alt="${member.en}"
               loading="lazy" decoding="async"
               onerror="this.onerror=null;this.src='assets/imgs/team/nophoto.png';">
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

Pass the role string at each call site:

- `pi`: `"Principal Investigator"`
- `phd`: `"PhD Student"`
- `graduate`: `"Graduate Student"`
- `undergraduate`: `"Undergraduate Student"`
- `ra`: `"Research Assistant"`
- `alumni`: `"Alumni"`

CSS for the role label:

```css
.team-role-label {
  font-size: 0.72rem;
  color: #9ca3af;
  font-weight: 400;
  margin-top: 2px;
  margin-bottom: 0;
}
```

---

## 16. Collaborators — Already Minimal

Current markup already shows: logo + institution name (`.collab-name`) + country/affiliation (`.collab-meta`). No HTML changes needed.

Improve logo optical alignment by centering the frame content with consistent padding:

```css
/* Append at end of file */
.collab-logo-frame {
  padding: 14px 18px;
}
```

---

## 17. News — Limit to 3, Add "View All"

### 17a. HTML change — `index.html`

After the last news card closing `</div>` (before the closing `</div></section>`), add:

```html
<div class="news-view-all text-center mt-4">
  <button class="news-expand-btn" type="button">View All News</button>
</div>
```

### 17b. JS change — `creative-studio.js`

On `DOMContentLoaded` (or inline at end of `<body>`), add:

```js
(function () {
  var newsItems = document.querySelectorAll('#blog .col-md-6.col-lg-4');
  var expandBtn = document.querySelector('.news-expand-btn');
  if (!newsItems.length || !expandBtn) return;

  // Hide items beyond the first 3
  for (var i = 3; i < newsItems.length; i++) {
    newsItems[i].classList.add('news-item-hidden');
  }
  if (newsItems.length <= 3) {
    expandBtn.parentElement.hidden = true;
    return;
  }

  expandBtn.addEventListener('click', function () {
    document.querySelectorAll('.news-item-hidden').forEach(function (el) {
      el.classList.remove('news-item-hidden');
    });
    expandBtn.parentElement.hidden = true;
  });
}());
```

### 17c. CSS

```css
/* Append at end of file */
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
}
.news-expand-btn:hover {
  border-color: #111827;
  color: #111827;
}
```

**Text truncation:** Add CSS line-clamp to `.blog-text` so summaries are consistently 3 lines max:

```css
.blog-text {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## 18. Visual Cleanup

Remove card borders and rely on whitespace + background contrast for separation. Append:

```css
/* Visual cleanup — remove card borders */
.research-card,
.blog-card {
  border: none;
  box-shadow: none;
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

.research-card:hover,
.blog-card:hover {
  box-shadow: none;
  transform: translateY(-2px);
}
```

Remove the `.collab-logo-frame` border hover effect, keep only the subtle border at rest:

```css
.collab-logo-frame {
  border-color: #f0f0f4;
}
.collab-logo-frame:hover {
  border-color: #e5e7eb;
  background: #fff;
}
```

---

## Out of Scope

- No changes to image assets
- No new standalone pages (all news on same page)
- No publications section
- No changes to lightbox logic or scroll progress bar
- No changes to the about section or contact form
- No team member profile pages (role label is added, detailed bios are future work)
