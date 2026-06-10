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

## Out of Scope

- No changes to image assets
- No changes to team section, about section, or contact form
- No new sections added
- No publications section
- No changes to lightbox logic
- No changes to scroll progress bar, navbar dropdown, or team accordions
