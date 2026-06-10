# HMI Lab Website Redesign — Design Spec
*Date: 2026-06-10*

## Context

The HMI Lab website (nthu-cs-hmilab.github.io) is a single-page Bootstrap 4 site built with SCSS/Gulp. The current design uses a vibrant pink primary colour (#ff214f) but lacks a cohesive design system — inconsistent shadows, border-radii, spacing tokens, and no dropdown navigation. The goal is a modern, professional research-lab standard redesign that preserves all existing content and functionality while dramatically improving visual quality, hierarchy, and navigation.

**Constraints:**
- Single-page HTML site (no framework migration)
- Preserve all existing content, sections, and JS logic
- Keep original colour palette centred on `#ff214f`
- No emojis anywhere on the site
- Themify Icons already available (use for icon replacements)
- Bootstrap 4.3.1 grid stays (no version change)
- Must pass on desktop and mobile

---

## 1. Design System (Tokens)

Define as SCSS variables in `assets/scss/abstracts/_variables.scss`:

**Colours:**
```scss
$primary:           #ff214f;
$primary-dark:      #e01040;   // hover state
$primary-tint:      #fff5f7;   // light backgrounds/tags

$text-primary:      #111827;
$text-secondary:    #4b5563;
$text-muted:        #9ca3af;

$bg-white:          #ffffff;
$bg-alt:            #f9fafb;   // alternating sections
$bg-subtle:         #f3f4f6;

$border-color:      #e5e7eb;
$border-light:      #f3f4f6;
```

**Shadow scale (replace all ad-hoc shadows):**
```scss
$shadow-sm:   0 2px 8px rgba(15, 23, 42, 0.05);
$shadow-md:   0 4px 20px rgba(15, 23, 42, 0.07);
$shadow-lg:   0 8px 32px rgba(15, 23, 42, 0.10);
$shadow-hover: 0 12px 36px rgba(15, 23, 42, 0.13);
```

**Border radius scale:**
```scss
$radius-sm:   8px;
$radius-md:   12px;
$radius-lg:   16px;
$radius-xl:   24px;
$radius-pill: 999px;
```

**Transitions:**
```scss
$transition-base: 0.2s ease;
$transition-slow: 0.35s ease;
```

**Section spacing:**
```scss
$section-padding-y: 96px;   // desktop
// mobile: 64px via media query
```

---

## 2. Navigation

**File:** `index.html` (navbar HTML) + `assets/scss/components/_navbars.scss`

### Behaviour
- Transparent over hero; transitions to `$bg-white` + `border-bottom: 1px solid $border-color` on scroll (existing affix mechanism, keep it)
- Pink scrollspy progress bar: `3px` strip at bottom of sticky nav. Width is driven by a small JS snippet (`scroll / (documentHeight - viewportHeight) * 100%`) added to `creative-studio.js`. Updates on `scroll` event with `requestAnimationFrame` throttle.
- Active nav link: `color: $primary`, no underline (clear enough with colour)
- Contact becomes a pill CTA button: `background: $primary; color: #fff; border-radius: $radius-pill; padding: 6px 18px`

### Structure (preserve all 8 top-level items)
```
Logo | Home | About | Research▾ | Album | Team▾ | Collaborators | News | [Contact]
```

### Research dropdown
Smooth CSS dropdown (no JS required), appears on hover. Links scroll to the four research cards via `#service` anchor + JS offset.

```
Research Areas
├── Digital Health          → #service (scroll + highlight)
├── AI for Medicine         → #service
├── Human-Machine Interaction → #service
└── Behavioral Analytics    → #service
```

### Team dropdown
Same CSS hover dropdown.

```
Team Members
├── Principal Investigator  → #team-pi
├── PhD Students            → #team-phd
├── Graduate Students       → #team-grad
├── Undergraduate Students  → #team-undergrad
├── Research Assistants     → #team-ra
└── Alumni                  → #team-alumni
```

Add `id` anchors to each team group's heading in the HTML.

### Mobile (< 992px)
Hamburger menu as-is. Dropdowns become accordion-style (Bootstrap collapse) — clicking "Research" expands the sub-links inline, no hover behaviour.

### Dropdown CSS approach
Pure CSS hover dropdown using `position: absolute`, triggered by `.nav-item:hover .dropdown-menu`. No extra JS. Dropdown panel: white background, `$shadow-lg`, `$radius-md`, `$border-color` border, 10px padding.

---

## 3. Hero Section

**File:** `index.html` (lines ~84–106) + `assets/scss/layout/_header.scss`

- Keep full-viewport-height background image (`header.jpg`)
- Overlay: `rgba(10, 10, 20, 0.55)` (slightly darker for better contrast)
- Eyebrow text: `National Tsing Hua University · NTHU` — `$primary` colour, `10px`, `700` weight, `1.5px` letter-spacing, `uppercase`
- H1: keep existing responsive fluid sizing; ensure `font-weight: 800`
- Subtitle paragraph: `rgba(255,255,255,0.78)`, max-width `560px`
- Buttons: primary `$primary` pill + outline ghost pill (white border/text)
- Remove any inline styles; move all to SCSS

---

## 4. Lab Highlights

**File:** `index.html` (lines ~109–130) + `assets/scss/layout/_sections.scss`

- Keep negative-margin overlap (pull up over hero bottom)
- Replace icon treatment: icon inside a `$primary-tint` rounded square (`$radius-md`), icon colour `$primary` — no emojis
- Cards: white background, `$shadow-md`, `$radius-lg`, uniform padding `24px`
- Ensure the three titles and descriptions are in plain text (no emoji characters)

---

## 5. Section Backgrounds (Alternating)

Clear visual rhythm by alternating section backgrounds:

| Section       | Background  |
|---------------|-------------|
| Highlights    | `$bg-white` |
| About         | `$bg-alt`   |
| Research      | `$bg-white` |
| Album         | `$bg-alt`   |
| Team          | `$bg-white` |
| Collaborators | `$bg-alt`   |
| News          | `$bg-white` |

Section headers use a `$primary`-coloured tag pill above the h2 title (e.g., "Research", "Team") — same pattern throughout.

---

## 6. Section Headers (Unified Pattern)

Every section gets:
```html
<div class="section-tag">Research</div>   <!-- pill tag -->
<h2 class="section-title">Our Research Areas</h2>
<p class="section-desc">...</p>
```

```scss
.section-tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: $primary;
  background: $primary-tint;
  padding: 4px 14px;
  border-radius: $radius-pill;
  margin-bottom: 12px;
}
.section-title { font-size: 2rem; font-weight: 800; color: $text-primary; margin-bottom: 12px; }
.section-desc  { font-size: 1rem; color: $text-secondary; max-width: 520px; margin: 0 auto; }
```

---

## 7. Card Design System

All cards share a single base:
```scss
.card-base {
  border-radius: $radius-lg;       // 16px
  box-shadow: $shadow-md;
  border: 1px solid $border-color;
  transition: transform $transition-base, box-shadow $transition-base;
  &:hover {
    transform: translateY(-4px);
    box-shadow: $shadow-hover;
  }
}
```

### Research cards (`assets/scss/components/_cards.scss`)
- Image aspect-ratio: `16/9`, `object-fit: cover`
- Body padding: `24px`
- Research question: `$primary`, `0.82rem`, `600` weight
- Title: `1.1rem`, `700`, `$text-primary`
- Description: `0.95rem`, `$text-secondary`

### News/Blog cards
- Same base; no image
- Date pill: `$bg-subtle`, `$text-muted`, `0.8rem`, `$radius-sm`
- Title: `1rem`, `700`, `$text-primary`
- Body: `0.9rem`, `$text-secondary`
- Link (if present): `$primary`, `600` weight, no underline by default, underline on hover

### Team cards

- Photo: `120px × 120px` square with `$radius-md` (reduce from 140px — slightly more compact, same grid); `object-fit: cover; object-position: center 20%`
- Background placeholder: `$bg-subtle`
- English name: `0.88rem`, `700`, `$text-primary`
- Chinese name: `0.78rem`, `$text-muted`
- No border, light shadow only on hover

### Album/Gallery cards
- Aspect-ratio: `4/3`; `object-fit: cover`; `$radius-md`
- Figcaption: `0.85rem`, `$text-secondary`, `margin-top: 8px`
- Hover: slight scale `1.02` + shadow upgrade

---

## 8. Collapsible Sections (Team + Album)

**File:** `index.html` + `assets/scss/components/_cards.scss`

Replace current plain toggle with a styled toggle header:
```html
<button class="group-toggle" aria-expanded="true" ...>
  <span class="group-toggle-title">PhD Students</span>
  <span class="group-toggle-count">4 members</span>
  <span class="group-toggle-icon">▲</span>  <!-- rotates to ▼ when collapsed -->
</button>
```

```scss
.group-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  background: $bg-alt;
  border: 1px solid $border-color;
  border-radius: $radius-md;
  padding: 12px 20px;
  cursor: pointer;
  margin-bottom: 16px;
  &:hover { background: $primary-tint; border-color: $primary; }
  .group-toggle-title { font-size: 1rem; font-weight: 700; color: $text-primary; }
  .group-toggle-count { font-size: 0.82rem; color: $text-muted; margin-left: 10px; }
  .group-toggle-icon  { margin-left: auto; color: $primary; font-size: 0.75rem; transition: transform $transition-base; }
  &[aria-expanded="false"] .group-toggle-icon { transform: rotate(180deg); }
}
```

---

## 9. Accessibility Fixes

- Add `alt` attributes to all 11 collaborator logos (currently missing)
- Add `lang="zh-TW"` to Chinese name spans
- Ensure all `<button>` elements have visible focus ring (`:focus-visible` outline in `$primary`)
- Icon elements that are purely decorative: `aria-hidden="true"`

---

## 10. Performance

- Add `loading="lazy"` + `decoding="async"` to all album and research images (team photos already have it)
- Hero background image: preload hint in `<head>`: `<link rel="preload" as="image" href="assets/imgs/other/header.jpg">`
- No layout shift: set explicit `aspect-ratio` on image containers so space is reserved before images load

---

## 11. Footer

**File:** `index.html` + `assets/scss/layout/_footer.scss`

- Dark background: `#111827`
- 3-column layout preserved (About | Quick Links | Contact)
- Logo: pink square logomark + lab name in white
- Link colour: `#9ca3af`, hover → `#fff`
- Divider line + copyright bar at bottom
- Copyright: `© 2026 HMI Lab, NTHU. All rights reserved.`

---

## Files to Modify

| File | Changes |
|------|---------|
| `assets/scss/abstracts/_variables.scss` | Add full token set (colours, shadows, radii, transitions) |
| `assets/scss/components/_navbars.scss` | Dropdown CSS, scrollspy bar, affix styles, CTA button |
| `assets/scss/components/_cards.scss` | Unified card base, research/news/team/album variants |
| `assets/scss/layout/_header.scss` | Hero overlay, eyebrow text, button styles |
| `assets/scss/layout/_sections.scss` | Section backgrounds, section-header pattern, highlight cards |
| `assets/scss/layout/_footer.scss` | Dark footer, logomark, link colours |
| `assets/scss/base/_typography.scss` | Section tag, section title/desc classes |
| `index.html` | Dropdown HTML, section-tag markup, `id` anchors on team groups, alt attributes, preload hint, `lang` attrs on Chinese text, remove emoji characters |

---

## Verification

1. **Run build:** `npm run dev` (or `gulp`) — confirm no SCSS compile errors
2. **Desktop:** Open in browser, check:
   - Navbar transparent on hero, white on scroll
   - Research + Team dropdowns appear on hover
   - Scrollspy bar tracks scroll position
   - All sections have alternating backgrounds
   - Card hover effects work
   - All emoji replaced with Themify icon markup
3. **Mobile (375px):** Check hamburger menu, accordion dropdowns, stacked layouts
4. **Images:** Confirm no layout shift (DevTools → Performance tab, check CLS)
5. **Accessibility:** Run axe DevTools — zero critical violations
