# Album & Navigation UX Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the album's pink dot indicator with a rotating chevron and replace the CSS hover-based nav dropdown with a JS click-to-open system that removes bullet dots and adds a 2px left accent rule.

**Architecture:** Two independent tasks committed separately. Task 1 touches only the album IIFE JS and appends CSS. Task 2 edits and appends CSS (nav dropdown rules) and edits the JS (smooth scroll guard + new nav IIFE).

**Tech Stack:** Vanilla JS (ES5 IIFEs), jQuery (smooth scroll only), Bootstrap 4.x, static CSS append-only pattern.

---

## Task 1: Album Year Chevron

**Spec:** `docs/superpowers/specs/2026-06-10-album-nav-ux-refinement.md` — Part 1

**Files:**
- Modify: `assets/js/creative-studio.js` (line 505 — `buildRow()` span)
- Modify: `assets/css/creative-studio.css` (append before final sourceMappingURL comment)

**Context:** The Album Archive IIFE builds year rows via `buildRow(year)`. Each row's `.archive-btn` currently contains a `<span class="archive-dot">` (5px pink circle). We're swapping it for `<span class="archive-chevron">▾</span>` which rotates 180° via CSS when the row has the `.open` class — matching the exact pattern used by `.team-toggle-arrow` in the Team section.

---

- [ ] **Step 1: Swap the dot span to a chevron span in `buildRow()`**

  In `assets/js/creative-studio.js` at line 505, change:

  ```js
  '<span class="archive-dot" aria-hidden="true"></span>',
  ```

  to:

  ```js
  '<span class="archive-chevron" aria-hidden="true">▾</span>',
  ```

  The surrounding context for orientation (lines 501–511):
  ```js
  row.innerHTML = [
    '<button class="archive-btn" type="button"',
    ' aria-expanded="false" aria-controls="arcpanel-' + year + '">',
    '<span class="archive-year">' + year + '</span>',
    '<span class="archive-chevron" aria-hidden="true">▾</span>',   // ← changed
    '</button>',
    '<div class="archive-panel" id="arcpanel-' + year + '" hidden>',
    '<div class="row justify-content-center g-3 archive-grid"></div>',
    '</div>'
  ].join('');
  ```

- [ ] **Step 2: Append chevron CSS rules**

  In `assets/css/creative-studio.css`, insert the following block **immediately before** the final line `/*# sourceMappingURL=creative-studio.css.map */`:

  ```css
  /* Album archive — rotating chevron replaces dot */
  .archive-chevron {
    color: #9ca3af;
    font-size: 0.8rem;
    line-height: 1;
    display: inline-block;
    flex-shrink: 0;
    transition: transform 0.2s ease, color 0.15s;
  }
  .archive-row.open .archive-chevron {
    transform: rotate(180deg);
    color: #6b7280;
  }
  .archive-btn:hover {
    background: #fafafa;
  }
  ```

  The `.archive-dot` rules already in the file become inert dead code once no element uses that class — do not delete them.

- [ ] **Step 3: Visually verify in browser**

  Open `index.html` in a browser (live server or `open index.html`). Scroll to the **Album** section.

  Check:
  - Each collapsed row shows a muted grey `▾` on the right
  - Clicking a year row expands it — the `▾` rotates to `▴` smoothly
  - Clicking the same row again collapses it — `▴` rotates back to `▾`
  - Hovering any row (without clicking) shows a subtle `#fafafa` background
  - No pink dot appears anywhere

- [ ] **Step 4: Commit**

  ```bash
  git add assets/js/creative-studio.js assets/css/creative-studio.css
  git commit -m "style: replace album archive dot with rotating chevron — matches team toggle pattern"
  ```

---

## Task 2: Navigation Click-to-Open

**Spec:** `docs/superpowers/specs/2026-06-10-album-nav-ux-refinement.md` — Part 2

**Files:**
- Modify: `assets/css/creative-studio.css` (delete lines 10226–10230 + append)
- Modify: `assets/js/creative-studio.js` (edit lines 16–34 + insert new Nav IIFE)

**Context:** The nav currently uses CSS `:hover` and `:focus-within` to show `.dropdown-panel`. We're replacing that with a JS-driven `.is-open` class toggle. The dropdown items currently have a 5px `::before` bullet dot — we're removing it and adding a 2px `border-left` accent rule. On mobile (≤ 991px), the dropdown panel renders inline (relative position, transparent bg, white text) rather than as a floating card.

Two nav items have dropdowns: **Research** (`href="#service"`) and **Team** (`href="#team"`). The jQuery smooth scroll at the top of the file will catch clicks on those links and try to scroll — we must guard against that.

---

- [ ] **Step 1: Delete the CSS hover-open trigger**

  In `assets/css/creative-studio.css`, find and **delete** lines 10226–10230 (exact content shown for verification):

  ```css
  .custom-navbar .nav-item.has-dropdown:hover .dropdown-panel,
  .custom-navbar .nav-item.has-dropdown:focus-within .dropdown-panel {
    display: block;
    animation: fadeDropdown 0.2s ease;
  }
  ```

  After deletion, the gap between lines 10224 and what was 10231 should close cleanly. The `@keyframes fadeDropdown` block that follows (lines 10232–10241) must remain — it is reused by the `.is-open` rule we append in the next step.

- [ ] **Step 2: Append nav CSS rules**

  In `assets/css/creative-studio.css`, insert the following block **immediately before** the final line `/*# sourceMappingURL=creative-studio.css.map */` (after any rules already appended in Task 1):

  ```css
  /* Nav dropdown — JS-driven click-to-open */
  .custom-navbar .nav-item.has-dropdown.is-open .dropdown-panel {
    display: block;
    animation: fadeDropdown 0.2s ease;
  }

  /* Remove bullet dots */
  .custom-navbar .dropdown-panel a::before {
    display: none;
  }

  /* Left accent rule replaces dots */
  .custom-navbar .dropdown-panel a {
    gap: 0;
    border-left: 2px solid transparent;
    padding-left: 18px;
    transition: background 0.12s, border-color 0.12s, color 0.12s;
  }
  .custom-navbar .dropdown-panel a:hover {
    background: #fafafa !important;
    border-left-color: #ff214f;
    color: #111827 !important;
  }
  .custom-navbar .dropdown-panel a:hover::before {
    display: none;
  }

  /* Mobile — inline panel inside collapsed navbar */
  @media (max-width: 991.98px) {
    .custom-navbar .nav-item.has-dropdown.is-open .dropdown-panel {
      display: block !important;
      position: relative !important;
      top: auto !important;
      left: auto !important;
      transform: none !important;
      box-shadow: none !important;
      border: none !important;
      border-radius: 0 !important;
      padding: 4px 0 8px !important;
      background: transparent !important;
      min-width: auto !important;
      white-space: normal !important;
    }
    .custom-navbar .nav-item.has-dropdown.is-open .dropdown-panel a {
      color: rgba(255, 255, 255, 0.75) !important;
      padding: 7px 24px;
      font-size: 0.85rem;
    }
    .custom-navbar .nav-item.has-dropdown.is-open .dropdown-panel a:hover {
      color: #fff !important;
      background: rgba(255, 255, 255, 0.06) !important;
      border-left-color: #ff214f;
    }
  }
  ```

- [ ] **Step 3: Guard the smooth scroll handler against dropdown triggers**

  In `assets/js/creative-studio.js`, the jQuery smooth scroll runs at lines 16–34. Replace the entire block with:

  ```js
  // smooth scroll
  $(document).ready(function () {
    $(".navbar .nav-link").on("click", function (event) {
      if (this.hash !== "" && !$(this).closest(".has-dropdown").length) {
        event.preventDefault();

        var hash = this.hash;

        $("html, body").animate(
          {
            scrollTop: $(hash).offset().top,
          },
          700,
          function () {
            window.location.hash = hash;
          },
        );
      }
    });
  });
  ```

  The only change is `&& !$(this).closest(".has-dropdown").length` added to the `if` condition. This prevents the scroll animation from running when a dropdown trigger is clicked — the new nav IIFE handles those clicks instead.

- [ ] **Step 4: Add the Nav Click-to-Open IIFE**

  In `assets/js/creative-studio.js`, insert the following block between the end of the Scroll Progress Bar IIFE (line ~428, ends with `}());`) and the start of the Album Archive block (the `/* ========================= Album Archive` comment). The insertion point is the blank line around line 431.

  Insert:

  ```js
  /* =========================
     Nav Click-to-Open
  ========================= */
  (function () {
    var dropdowns = Array.prototype.slice.call(
      document.querySelectorAll('.custom-navbar .nav-item.has-dropdown')
    );

    function closeAll() {
      dropdowns.forEach(function (item) {
        item.classList.remove('is-open');
        var trigger = item.querySelector('.nav-link');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });
    }

    dropdowns.forEach(function (item) {
      var trigger = item.querySelector('.nav-link');
      if (!trigger) return;

      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var isOpen = item.classList.contains('is-open');
        closeAll();
        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', function (e) {
      if (!e.target.closest('.custom-navbar .nav-item.has-dropdown')) {
        closeAll();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAll();
    });
  }());
  ```

- [ ] **Step 5: Visually verify in browser**

  Open `index.html` in a browser. Test all of the following:

  **Desktop (viewport ≥ 992px):**
  - Hover over "Research" nav link → nothing happens (dropdown does NOT open on hover)
  - Click "Research" → floating dropdown card appears
  - Click "Research" again → dropdown closes
  - Click "Research" → dropdown opens → click anywhere outside the nav → dropdown closes
  - Click "Research" → dropdown opens → press `Esc` → dropdown closes
  - Hover dropdown items → no bullet dot, pink left border appears, background turns `#fafafa`, text turns `#111827`
  - Click a dropdown item (e.g. "PhD Students") → navigates to that section anchor

  **Mobile (resize browser to < 992px):**
  - Click the hamburger toggler → nav opens
  - Click "Research" → sub-items appear inline below (no floating card, transparent bg, white text)
  - Click "Research" again → sub-items collapse
  - Click a sub-item → nav closes, page scrolls to section

- [ ] **Step 6: Commit**

  ```bash
  git add assets/css/creative-studio.css assets/js/creative-studio.js
  git commit -m "feat: nav click-to-open — remove hover trigger, replace dots with accent rule, mobile inline"
  ```

---

## Self-Review Notes

- **Spec coverage:** Part 1 (chevron, hover bg) → Task 1. Part 2 (remove dots, accent rule, click-to-open, mobile inline) → Task 2. All requirements covered.
- **Specificity:** `.is-open` rule has 3 classes (0,3,0) which beats the base `display:none` (0,1,0) ✓. Mobile `!important` overrides the existing `display: none !important` at line 10307 because it is appended later at same specificity weight ✓.
- **Smooth scroll guard:** `closest(".has-dropdown")` traverses up from `.nav-link` → finds `.nav-item.has-dropdown` (direct parent) ✓.
- **`e.stopPropagation()`** in the trigger click handler prevents the `document` click listener (click-outside handler) from immediately closing the dropdown that was just opened ✓.
- **No placeholder steps:** every step contains the exact code to write.
