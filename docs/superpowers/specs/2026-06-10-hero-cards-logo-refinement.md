# HMI Lab — Hero, Research Cards & Logo Refinement Spec

**Date:** 2026-06-10  
**Scope:** Approach A — targeted CSS + HTML patches, no new sections, no restructuring  
**Files touched:** `index.html`, `assets/css/creative-studio.css`  
**Aesthetic target:** MIT CSAIL / Stanford HAI / Berkeley BAIR — premium academic research lab

---

## 1. Logo Fix

### Problem
Two conflicting CSS rules exist for `.custom-navbar .navbar-brand img` (width 50px at line 10158, width 42px at line 10824). No `height: auto` or `display: block` is set.

### Changes — `assets/css/creative-studio.css`

Remove the earlier duplicate rule at line 10158:
```css
/* DELETE this rule */
.custom-navbar .navbar-brand img {
  width: 50px;
}
```

Update the surviving rule at line 10824 to:
```css
.custom-navbar .navbar-brand img {
  width: 42px;
  height: auto;
  display: block;
}
```

### No HTML changes needed
The path `assets/imgs/logo2.png` is correct, case-matches the file, and GitHub Pages will serve it correctly.

---

## 2. Research Cards — Remove Question, Add Area Label

### Decision
**Option B** (chosen): Remove `<p class="research-question">` prose from all four cards. Replace with `<p class="research-area-tag">` — a short uppercase category label with a pink leading rule, consistent with the `blog-meta` pattern.

### HTML changes — `index.html`

Replace each `<p class="research-question">…</p>` with `<p class="research-area-tag">LABEL</p>`.

| Card title | Old question text (removed) | New label |
|---|---|---|
| Trustworthy AI for Medicine | "Can we capture a photo…" | `Medical AI` |
| Brain Encoding and Decoding | "How does the human brain represent…" | `Neuroscience` |
| Human-Machine Interaction | "Can intelligent systems help people…" | `HCI` |
| Computational Neuroscience | "How can computational methods reveal…" | `Comp. Neuro` |

Remove `h-100` Bootstrap class from all four `.research-card` divs (flex layout replaces it).

### CSS changes — `assets/css/creative-studio.css`

There are two existing `.research-question` blocks in the CSS (at lines ~9498 and ~10639). Do not delete them — they become inert dead code once no HTML element carries that class. Add the new rules **at the end of the file** (append after the last media query block):

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
```

Make the card a flex column so content aligns uniformly. Append these rules at the end of the file (same location as `.research-area-tag`):

```css
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

These append-only rules override the padding-only rules already in the existing `.research-body` blocks without touching them.

This ensures all four cards have identical visual structure: area-tag → title → description, with the description stretching to fill any remaining space and all titles aligning at the same vertical offset.

---

## 3. Hero Typography

### Title
No change. `color: #fff` is already set and correct. Do not add pink, gradient, or any color treatment.

### Kicker — replace with pink-rule style (Option C)

The block at lines 10439–10447 sets `color: #ff214f` (pink) on the kicker. The later block at lines 10953–10958 partially overrides it. Replace the entire block at lines 10953–10958 with the full new rule (both selector and `::before`), and delete the pink `color: #ff214f` declaration from the lines 10439–10447 block by removing that one property:

```css
/* lines 10439-10447: remove only the color: #ff214f line, keep everything else */
```

Full replacement for the block at lines 10953–10958:
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

### White hierarchy tightening

Three tiers of white — title at full white, subtitle slightly dimmed, description most receded:

```css
/* subtitle: soften weight and opacity */
.header .subtitle {
  font-weight: 400;          /* was 500 */
  color: rgba(255, 255, 255, 0.80);   /* was 0.90 */
}

/* description: push back further */
.hero-description {
  color: rgba(255, 255, 255, 0.62);   /* was 0.78 */
}
```

---

## Out of Scope

- No changes to image assets (`logo2.png` used as-is)
- No structural or section reordering
- No changes to blog cards, team section, album, footer, or collaborators
- No new sections added
- No JS changes
