# Album & Navigation UX Refinement Spec

**Date:** 2026-06-10
**Scope:** Targeted CSS + JS patches to two existing components — no new sections, no restructuring
**Files touched:** `assets/css/creative-studio.css`, `assets/js/creative-studio.js`
**Aesthetic target:** MIT CSAIL / Stanford HAI / Berkeley BAIR — minimal, academic, predictable interactions

---

## Part 1 — Album Year Chevron

### Problem

The `.archive-dot` (a 5px pink circle) appears in the right slot of each `.archive-btn`. It communicates "active state" but not "direction" — it offers no affordance for expand/collapse. The site's Team section already uses a rotating `▾` glyph (`.team-toggle-arrow`) for the same accordion pattern.

### Design

Replace `.archive-dot` with `.archive-chevron`: a `▾` character that:
- Sits right-aligned in the `.archive-btn` row (unchanged layout)
- Is muted grey (`#9ca3af`) when the row is collapsed
- Rotates 180° (`transform: rotate(180deg)`) when the row is `.open`
- Uses the same `transition: transform 0.2s ease` as `.team-toggle-arrow`

Add a subtle hover background state to `.archive-btn:hover` so the row acknowledges cursor proximity before a click.

### Changes

#### `assets/js/creative-studio.js`

In `buildRow()` (Album Archive IIFE), change the `archive-dot` span to `archive-chevron`:

```js
// Before
'<span class="archive-dot" aria-hidden="true"></span>',

// After
'<span class="archive-chevron" aria-hidden="true">▾</span>',
```

#### `assets/css/creative-studio.css` — append

```css
/* Album archive — chevron replaces dot */
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

The `.archive-dot` rules already in the file become dead code — do not delete them.

---

## Part 2 — Navigation Dropdown

### Problem

Two distinct issues:

1. **Visual noise:** Each `.dropdown-panel a` has a 5px bullet dot (`::before` pseudo-element). No information is communicated — it is pure decoration that conflicts with the academic minimal standard.

2. **Hover-only interaction:** The dropdown opens on CSS `:hover` and `:focus-within`. This means no click toggle, no Esc / click-outside close, and no consistent mobile behavior.

### Design

#### Dropdown items — visual

Remove the bullet dots. Add a 2px left accent rule (`border-left`) that is transparent by default and turns pink (`#ff214f`) on hover. Subtle `#fafafa` hover background and `#111827` hover text.

#### Dropdown open/close — interaction

**Single model across desktop, tablet, and mobile:**
- Click/tap the nav link to open
- Click/tap the same nav link again to close
- Click/tap outside any open dropdown to close
- `Esc` closes any open dropdown

**Desktop:** The floating card panel (`.dropdown-panel`) position and appearance are unchanged — absolute, centered below nav item, white card with shadow. It is shown/hidden only by the `.is-open` class set by JS.

**Mobile (≤ 991px):** When `.is-open`, the panel renders inline inside the collapsed navbar — `position: relative`, `background: transparent`, `box-shadow: none`, white text — not a floating card.

The CSS `:hover` and `:focus-within` triggers must be removed (see CSS edit below). No hover-open on any device.

### Changes

#### `assets/css/creative-studio.css` — edit existing (lines 10226–10230)

Delete these two rules entirely:

```css
/* DELETE — replaced by JS-driven .is-open */
.custom-navbar .nav-item.has-dropdown:hover .dropdown-panel,
.custom-navbar .nav-item.has-dropdown:focus-within .dropdown-panel {
  display: block;
  animation: fadeDropdown 0.2s ease;
}
```

#### `assets/css/creative-studio.css` — append

```css
/* Nav dropdown — click-to-open via .is-open (JS-driven) */
.custom-navbar .nav-item.has-dropdown.is-open .dropdown-panel {
  display: block;
  animation: fadeDropdown 0.2s ease;
}

/* Remove bullet dots */
.custom-navbar .dropdown-panel a::before {
  display: none;
}

/* Dropdown items — left accent rule replaces dots */
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

/* Mobile — inline panel, no floating card */
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

#### `assets/js/creative-studio.js` — edit smooth scroll (lines 16–34)

Add a guard to skip dropdown triggers (clicking them opens the panel, not the section anchor):

```js
$(".navbar .nav-link").on("click", function (event) {
  if (this.hash !== "" && !$(this).closest(".has-dropdown").length) {
    event.preventDefault();
    var hash = this.hash;
    $("html, body").animate({ scrollTop: $(hash).offset().top }, 700, function () {
      window.location.hash = hash;
    });
  }
});
```

#### `assets/js/creative-studio.js` — add new Nav IIFE

Add before the Album Archive IIFE (after line 430 / the Scroll Progress Bar block):

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

---

## Out of Scope

- No changes to nav link text, nav structure, or section anchors
- No changes to the mobile navbar toggler (hamburger button)
- No changes to the `.nav-cta` button styles
- No changes to album photo grid, lightbox, or Load More behavior
- No other CSS or HTML sections touched
