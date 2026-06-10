# Album & Team Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the heavy boxed album accordion with a borderless hairline-separator archive, and remove redundant role labels from team member cards.

**Architecture:** Two independent patches to the same three files. Task 1 (album) touches all three files; Task 2 (team) touches only the JS. No new files, no build pipeline — all changes take effect by editing the source directly.

**Tech Stack:** Vanilla HTML/CSS/JS, Bootstrap 4.x, GitHub Pages static hosting.

---

## File Map

| File | Changes |
| --- | --- |
| `index.html` | Replace `albumAccordion` div id with `albumArchive` |
| `assets/css/creative-studio.css` | Append `.archive-*` CSS block before sourceMappingURL |
| `assets/js/creative-studio.js` | Replace Album Archive IIFE (lines 432–642); simplify `createMemberCard` / `renderMembers` / 6 call sites |

---

## Task 1: Album Archive Redesign

**Files:**
- Modify: `index.html`
- Modify: `assets/css/creative-studio.css` (append before sourceMappingURL)
- Modify: `assets/js/creative-studio.js` (lines 432–642 full replacement)

- [ ] **Step 1.1: Replace album container id in `index.html`**

  Find:
  ```html
  <div class="album-accordion" id="albumAccordion"></div>
  ```
  Replace with:
  ```html
  <div class="album-archive" id="albumArchive"></div>
  ```

  Verify: `grep -c "albumAccordion" index.html` → 0; `grep -c "albumArchive" index.html` → 1

- [ ] **Step 1.2: Append archive CSS to `creative-studio.css`**

  Find `/*# sourceMappingURL=creative-studio.css.map */` (last line). Insert immediately before it:

  ```css
  /* ============================================================
     Album Archive — borderless redesign 2026-06-10
  ============================================================ */

  .album-archive {
    margin-top: 32px;
    text-align: left;
  }

  /* Each year row */
  .archive-row {
    border-top: 1px solid #f3f4f6;
  }
  .archive-row:last-of-type {
    border-bottom: 1px solid #f3f4f6;
  }

  /* Row header button */
  .archive-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 0;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: inherit;
    -webkit-appearance: none;
    appearance: none;
  }
  .archive-btn:focus-visible {
    outline: 2px solid #ff214f;
    outline-offset: 2px;
  }

  /* Year label */
  .archive-year {
    font-size: 0.92rem;
    font-weight: 500;
    color: #9ca3af;
    transition: color 0.15s ease;
  }
  .archive-row.open .archive-year {
    color: #111827;
    font-weight: 600;
  }
  .archive-btn:hover .archive-year {
    color: #374151;
  }

  /* Active dot */
  .archive-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: transparent;
    flex-shrink: 0;
    transition: background 0.15s ease;
  }
  .archive-row.open .archive-dot {
    background: #ff214f;
  }

  /* Expandable photo panel */
  .archive-panel {
    padding-bottom: 20px;
  }

  /* "View older archives" toggle */
  .archive-older-toggle {
    display: inline-block;
    margin-top: 16px;
    font-size: 0.8rem;
    color: #9ca3af;
    cursor: pointer;
    background: none;
    border: none;
    font-family: inherit;
    padding: 0;
    -webkit-appearance: none;
    appearance: none;
    transition: color 0.15s ease;
  }
  .archive-older-toggle:hover {
    color: #6b7280;
  }
  .archive-older-toggle[hidden] {
    display: none;
  }
  ```

- [ ] **Step 1.3: Replace the Album Archive IIFE in `creative-studio.js`**

  The Album Archive IIFE spans **lines 432–642**. It starts with:
  ```
  /* =========================
     Album Archive
  ```
  and ends with `}());` at line 642. The News Expand IIFE starts at line 644 and must not be touched.

  Replace lines 432–642 entirely with:

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

    var archiveEl = document.getElementById('albumArchive');
    var loadMoreBtn = document.querySelector('.album-load-more');
    var lightbox = document.querySelector('.album-lightbox');
    var lightboxImage = document.querySelector('.album-lightbox-image');
    var lightboxCaption = document.querySelector('.album-lightbox-caption');
    var lightboxCount = document.querySelector('.album-lightbox-count');
    var prevBtn = document.querySelector('.album-lightbox-prev');
    var nextBtn = document.querySelector('.album-lightbox-next');

    if (!archiveEl) return;

    var activeYear = null;
    var activePanel = null;
    var visibleLimit = pageSize;
    var currentItems = [];
    var currentIndex = 0;

    // Derive ordered unique years from albumData
    var years = [];
    var seen = {};
    albumData.forEach(function (item) {
      if (!seen[item.year]) { seen[item.year] = true; years.push(item.year); }
    });

    var recentYears = years.slice(0, 3);
    var olderYears = years.slice(3);

    // Build and append a single archive row
    function buildRow(year) {
      var row = document.createElement('div');
      row.className = 'archive-row';
      row.dataset.year = year;
      row.id = 'arc-' + year;
      row.innerHTML = [
        '<button class="archive-btn" type="button"',
        ' aria-expanded="false" aria-controls="arcpanel-' + year + '">',
        '<span class="archive-year">' + year + '</span>',
        '<span class="archive-dot" aria-hidden="true"></span>',
        '</button>',
        '<div class="archive-panel" id="arcpanel-' + year + '" hidden>',
        '<div class="row justify-content-center g-3 archive-grid"></div>',
        '</div>'
      ].join('');
      archiveEl.appendChild(row);

      row.querySelector('.archive-btn').addEventListener('click', function () {
        if (activeYear === year) {
          closeYear();
        } else {
          closeYear();
          openYear(year, row);
        }
      });

      return row;
    }

    // Render recent years
    recentYears.forEach(buildRow);

    // "View older archives" toggle
    var olderToggle = null;
    if (olderYears.length > 0) {
      olderToggle = document.createElement('button');
      olderToggle.className = 'archive-older-toggle';
      olderToggle.type = 'button';
      olderToggle.textContent = 'View older archives →';
      archiveEl.appendChild(olderToggle);

      olderToggle.addEventListener('click', function () {
        olderToggle.hidden = true;
        olderYears.forEach(buildRow);
      });
    }

    // Photo item factory
    function createPhotoItem(item) {
      var col = document.createElement('div');
      col.className = 'col-xl-4 col-md-6';
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
      var grid = activePanel.querySelector('.archive-grid');
      grid.innerHTML = '';
      visible.forEach(function (item) { grid.appendChild(createPhotoItem(item)); });
      if (loadMoreBtn) {
        loadMoreBtn.hidden = visibleLimit >= yearItems.length;
      }
    }

    function openYear(year, row) {
      activeYear = year;
      visibleLimit = pageSize;
      activePanel = row.querySelector('.archive-panel');
      row.classList.add('open');
      row.querySelector('.archive-btn').setAttribute('aria-expanded', 'true');
      activePanel.hidden = false;
      renderPhotos();
    }

    function closeYear() {
      if (!activeYear) return;
      var row = document.getElementById('arc-' + activeYear);
      if (row) {
        row.classList.remove('open');
        row.querySelector('.archive-btn').setAttribute('aria-expanded', 'false');
        var panel = row.querySelector('.archive-panel');
        if (panel) {
          panel.hidden = true;
          var grid = panel.querySelector('.archive-grid');
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
      lightbox.setAttribute('tabindex', '-1');
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

  After replacing, run:
  ```bash
  grep -c "News Expand" assets/js/creative-studio.js
  ```
  Expected: `1` — confirms the News Expand IIFE is still present.

- [ ] **Step 1.4: Verify accordion behavior**

  Open `index.html` in a browser. Confirm:
  - Album section shows 3 plain text rows (2026, 2025, 2024) separated by hairlines, no outer border box
  - "View older archives →" appears below the 3 rows
  - Clicking a year row reveals the photo grid; the year text turns dark and a pink dot appears on the right
  - Clicking the same year again collapses it
  - Clicking a second year while one is open closes the first, opens the second
  - "View older archives →" click reveals 2023, 2022, 2021, 2020 and the toggle disappears
  - Clicking a photo opens the lightbox; arrow keys and Escape work

- [ ] **Step 1.5: Commit**

  ```bash
  git add index.html assets/css/creative-studio.css assets/js/creative-studio.js
  git commit -m "feat: replace album accordion with borderless archive — hairline rows, pink dot active state"
  ```

---

## Task 2: Team Card Simplification

**Files:**
- Modify: `assets/js/creative-studio.js` (lines 366–405)

- [ ] **Step 2.1: Simplify `createMemberCard`**

  Find in `creative-studio.js` (line 366):
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

  Replace with:
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

- [ ] **Step 2.2: Simplify `renderMembers`**

  Find (line 393):
  ```js
  function renderMembers(targetId, members, role) {
      const container = document.getElementById(targetId);
      if (!container) return;
      container.innerHTML = members.map(function (m) { return createMemberCard(m, role); }).join("");
    }
  ```

  Replace with:
  ```js
  function renderMembers(targetId, members) {
      const container = document.getElementById(targetId);
      if (!container) return;
      container.innerHTML = members.map(createMemberCard).join("");
    }
  ```

- [ ] **Step 2.3: Drop role argument from all 6 call sites**

  Find (lines 399–405):
  ```js
  renderMembers("pi-list", teamData.pi, "Principal Investigator");

    renderMembers("phd-list", teamData.phd, "PhD Student");
    renderMembers("graduate-list", teamData.graduate, "Graduate Student");
    renderMembers("undergraduate-list", teamData.undergraduate, "Undergraduate Student");
    renderMembers("ra-list", teamData.ra, "Research Assistant");
    renderMembers("alumni-list", teamData.alumni, "Alumni");
  ```

  Replace with:
  ```js
  renderMembers("pi-list", teamData.pi);

    renderMembers("phd-list", teamData.phd);
    renderMembers("graduate-list", teamData.graduate);
    renderMembers("undergraduate-list", teamData.undergraduate);
    renderMembers("ra-list", teamData.ra);
    renderMembers("alumni-list", teamData.alumni);
  ```

  Verify: `grep "renderMembers" assets/js/creative-studio.js` — all lines should show exactly 2 arguments.

- [ ] **Step 2.4: Verify team cards**

  Open `index.html` in a browser and expand a team group (e.g. PhD Students). Each card should show: photo, English name, Chinese name only. No role label beneath the name.

- [ ] **Step 2.5: Commit**

  ```bash
  git add assets/js/creative-studio.js
  git commit -m "style: remove redundant role labels from team cards — group headers already convey role"
  ```

---

## Self-Review

### Spec Coverage

| Spec requirement | Task / Step |
| --- | --- |
| Replace `.album-accordion` container in HTML | Task 1 Step 1.1 |
| Append `.archive-*` CSS (no outer border, hairlines, pink dot) | Task 1 Step 1.2 |
| Replace Album Archive IIFE — 3 recent years, older toggle, `buildRow`, `openYear`, `closeYear`, `renderPhotos`, lightbox | Task 1 Step 1.3 |
| View older archives one-way disclosure | Task 1 Step 1.3 (`olderToggle`) |
| Lightbox and Load More preserved | Task 1 Step 1.3 (unchanged logic) |
| Remove `roleHtml` from `createMemberCard` | Task 2 Step 2.1 |
| Remove `role` param from `renderMembers` | Task 2 Step 2.2 |
| Drop third arg from all 6 call sites | Task 2 Step 2.3 |
| `.team-role-label` CSS left as dead code (no deletion) | No step needed — CSS untouched |

All requirements covered. No gaps.

### Placeholder Scan

No TBD, TODO, or vague steps. All code blocks are complete.

### Type Consistency

- `buildRow(year)` — defined and called with string year within the same IIFE ✓
- `openYear(year, row)` / `closeYear()` / `renderPhotos()` — defined and called within the same IIFE scope ✓
- `archive-grid` class — written in `buildRow` innerHTML, targeted by `renderPhotos` via `activePanel.querySelector('.archive-grid')` ✓
- `createMemberCard(member)` — 1-arg version defined Task 2.1, used by `renderMembers` via `.map(createMemberCard)` Task 2.2 ✓
