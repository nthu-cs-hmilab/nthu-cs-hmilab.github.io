# HMI Lab Website — UI/UX Polish Spec

**Date:** 2026-06-10  
**Scope:** Approach B — targeted section upgrades, keep brand colors (#ff214f), no functionality changes  
**Files touched:** `index.html`, `assets/css/creative-studio.css`, `assets/js/creative-studio.js`

---

## 1. Bug Fixes

### 1a. Load Fira Sans (Google Fonts)
`index.html` `<head>` — add before the CSS link:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
```

### 1b. Remove duplicate Bootstrap 5 CDN
Remove from `index.html` (line 1118):
```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
```
Then convert all Bootstrap 5 data attributes to Bootstrap 4 equivalents throughout `index.html`:
- `data-bs-toggle="collapse"` → `data-toggle="collapse"`
- `data-bs-target="#..."` → `data-target="#..."`

Affected lines: album toggle (322–323), team toggles for PhD (652–653), Graduate (673–674), Undergraduate (694–695), RA (715–716), Alumni (736–737).

### 1c. Fix navbar affix animation overshoot
In `creative-studio.css`, replace the `@keyframes affix` block:
```css
/* before */
@keyframes affix {
  from { top: -460px; width: 100%; }
  to   { top: 0; }
}
/* after */
@keyframes affix {
  from { top: -72px; opacity: 0; }
  to   { top: 0;     opacity: 1; }
}
```

---

## 2. Design Tokens

Add to `:root` in `creative-studio.css`:
```css
--primary-50:  #fff0f3;
--primary-100: #ffe4ea;
--primary-200: #ffc5d0;
--border:       #e5e7eb;
--border-light: #f0f0f4;
--radius-card:  12px;
--shadow-card:  0 1px 3px rgba(15,23,42,0.05), 0 1px 2px rgba(15,23,42,0.04);
--shadow-hover: 0 4px 16px rgba(15,23,42,0.10);
```

---

## 3. Navigation

### Floating state (over hero)
- Background: `rgba(12, 12, 24, 0.78)` + `backdrop-filter: blur(10px)` (instead of opaque dark)

### Affixed state (scrolled)
- Background: `rgba(255,255,255,0.94)` + `backdrop-filter: blur(16px)` (instead of flat `#fff`)
- Box-shadow: `0 1px 0 var(--border-light), 0 2px 12px rgba(15,23,42,0.06)`

### CTA button (`.nav-cta`)
- Change `border-radius: 999px` → `border-radius: 8px`
- Add `box-shadow: 0 2px 8px rgba(255,33,79,0.25)`

### Scroll progress bar
- Change flat `background: #ff214f` → `background: linear-gradient(90deg, #ff214f 0%, #ff6b8a 100%)`
- Height: `3px` → `2px`

---

## 4. Section Tag (`.section-tag`)

```css
.section-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid rgba(255, 33, 79, 0.14);
  /* keep all existing properties */
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

---

## 5. Highlight Cards (`.lab-highlights`)

Icon wrapper update — in `index.html` each `.box-item` `<i>` tag gets wrapped:
```html
<!-- before -->
<i class="ti-heart-broken" aria-hidden="true"></i>

<!-- after -->
<div class="box-icon-wrap">
  <i class="ti-heart-broken" aria-hidden="true"></i>
</div>
```

CSS for `.box-icon-wrap`:
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
  margin: 0;           /* override existing margin */
  display: block;
}
```

Remove existing `.lab-highlights .box-item i` overrides that set `font-size: 50px; margin-bottom: 25px`.

Hover state on `.box-item`: keep existing `translateY(-4px)` + `box-shadow` upgrade.

---

## 6. Collaborator Logos

### HTML (`index.html`)
Wrap each collaborator `<img>` in a frame div and move caption outside:
```html
<!-- before -->
<div class="col-lg-2 col-md-4 col-6 mb-5">
  <img src="..." class="img-fluid" alt="...">
  <figcaption class="small mt-3">...</figcaption>
</div>

<!-- after -->
<div class="col-lg-2 col-md-4 col-6 collab-col">
  <div class="collab-logo-frame">
    <img src="..." alt="..." loading="lazy">
  </div>
  <p class="collab-caption">...</p>
</div>
```

### CSS
```css
.collab-col { margin-bottom: 32px; }

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
  background: var(--primary-50);   /* soft tint, no strong border change */
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
}
```

Remove old `.testimonial-wrapper` and `img-fluid` sizing rules for this section (they no longer apply).

---

## 7. Team Accordion

### Toggle button style (`.team-toggle`)
Replace filled-card style with a minimal divider style:

```css
.team-toggle {
  background: transparent;
  border: none;
  border-top: 1px solid var(--border-light);
  border-radius: 0;
  padding: 14px 4px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-align: left;
  transition: none;
  -webkit-appearance: none;
  appearance: none;
}
.team-toggle:hover .team-toggle-title { color: #ff214f; }
.team-toggle:focus-visible {
  outline: 2px solid #ff214f;
  outline-offset: 2px;
}
```

No background on hover — only the title text shifts to primary color.

### Arrow indicator
Change from `color: #ff214f` to `color: #9ca3af`. Rotation on open stays.

### PI group divider
`.team-role`: `border-bottom: 2px solid #e5e7eb` → `border-bottom: 1px solid var(--border-light)`; weight `700` → `600`.

### `.team-toggle-wrap` margin
`margin-bottom: 16px` → `margin-bottom: 0` (divider line creates its own visual separation).

---

## 8. News Card Date (`.blog-meta`)

Remove the FA clock icon from HTML. Replace grey-pill style with accent-line style:

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
.blog-meta i { display: none; }   /* hide clock icon */
```

---

## 9. Footer

### Background
`section.has-bg-img` overlay color: change `rgba(33,37,41,0.95)` → `#0f0f1a`

### Logo block in footer
Replace the existing text+img logo in `index.html` footer with:
```html
<a href="#home" class="logo">
  <div class="footer-logo-icon"></div>
  <h6>HMI Lab</h6>
</a>
```

CSS:
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

### Copyright strip
Divider: `rgba(255,255,255,0.08)` → `rgba(255,255,255,0.06)`.

---

## 10. Album — Year-Based Filter

### Rationale
Replace the single collapse-all toggle with per-year tabs. Photos are never hidden by default — all visible on load with "All" selected. No animation on filter; instant `display` toggle for GitHub Pages performance.

### Year assignments (from existing captions)
| Year | Photos |
|------|--------|
| 2026 | photo32 |
| 2025 | photo31, photo30, photo29, photo28, photo27, photo26, photo25, photo24 |
| 2024 | photo23, photo22, photo21, photo20, photo19, photo18, photo17, photo16, photo15, photo14, photo13, photo11, photo10 |
| 2023 | photo9, photo6, photo7, photo0 |
| 2022 | photo8, photo1, photo2, photo3 |
| 2021 | photo4 |
| 2020 | photo5 |

### HTML changes (`index.html`)
1. Remove the `.team-toggle-wrap` + `<div class="collapse" id="albumList">` wrappers.
2. Replace with direct `.row` grid preceded by `.album-filter` tabs.
3. Add `data-year="YYYY"` to each `.col-xl-4.col-md-6` album item.

New album section skeleton:
```html
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
      <div class="col-xl-4 col-md-6" data-year="2026"><!-- photo32 --></div>
      <!-- ... all photos with data-year -->
    </div>
  </div>
</section>
```

### JS changes (`creative-studio.js`)
```js
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

### CSS changes
```css
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

Remove `.team-toggle-wrap` and `.team-toggle` styles from the album context (album no longer uses them).

---

## Out of Scope

- No structural section reordering
- No new sections added (metrics strip removed per request)
- No changes to research cards, blog cards, or team member cards (already solid)
- No changes to existing image assets
- No publications section
