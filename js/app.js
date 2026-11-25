/**
 * ══════════════════════════════════════════════════════════════
 * FNA DESIGN LAB — Core Interactive Application v3.5
 * Architecture | Interiors | Objects · @fna_designlab
 * Engineered to match https://www.staap.in/
 * Horizontal Desktop Viewport Slider · Multi-Script Preloader
 * 'F' Scroller · Hover Previews · Archive Search (Ctrl+K) · Dossier
 * ══════════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────────────────────────
     0. LIVE IST CLOCK, REAL-TIME DATE & YEAR
     ───────────────────────────────────────────────────────────── */
  function updateLiveClock() {
    const now = new Date();

    // Format IST Time (UTC + 5:30)
    const istTimeStr = now.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }) + ' IST';

    const clockEl = document.getElementById('loader-live-clock');
    if (clockEl) clockEl.textContent = istTimeStr;

    // Date formatting: [5] NOV 2026
    const day = now.getDate();
    const month = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const year = now.getFullYear();
    const weekday = now.toLocaleString('en-US', { weekday: 'long' });

    const dateEl = document.getElementById('loader-live-date');
    const dayEl = document.getElementById('loader-live-day');
    if (dateEl) dateEl.textContent = `[${day}] ${month} ${year}`;
    if (dayEl) dayEl.textContent = weekday;

    // Update dynamic copyright year everywhere
    document.querySelectorAll('.current-year').forEach(el => {
      el.textContent = year;
    });
  }

  updateLiveClock();
  setInterval(updateLiveClock, 1000);


  /* ─────────────────────────────────────────────────────────────
     1. MULTI-SCRIPT ARCHITECTURAL PRELOADER (STAAP STYLE)
     (Gujarati: એફ.એન.એ. -> Marathi: एफ.एन.ए. -> English: FNA)
     ───────────────────────────────────────────────────────────── */
  const loaderScreen = document.getElementById('staap-loader');
  const progressBar = document.getElementById('loader-progress-bar');
  const pctCounter = document.getElementById('loader-pct-counter');
  const statusMsg = document.getElementById('loader-status-msg');

  const paneGujarati = document.getElementById('pane-gujarati');
  const paneMarathi = document.getElementById('pane-marathi');
  const paneEnglish = document.getElementById('pane-english');

  let preloaderDismissed = false;

  function dismissPreloader() {
    if (preloaderDismissed || !loaderScreen) return;
    preloaderDismissed = true;
    loaderScreen.classList.add('dismissed');
    setTimeout(() => {
      loaderScreen.style.display = 'none';
    }, 800);
  }

  if (loaderScreen) {
    let progress = 0;
    const totalDuration = 2200; // ms
    const intervalTime = 25;
    const step = 100 / (totalDuration / intervalTime);

    function setScriptPane(activePane) {
      [paneGujarati, paneMarathi, paneEnglish].forEach(p => p && p.classList.remove('active'));
      if (activePane) activePane.classList.add('active');
    }

    const timer = setInterval(() => {
      if (preloaderDismissed) {
        clearInterval(timer);
        return;
      }

      progress += step;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);
        if (progressBar) progressBar.style.width = '100%';
        if (pctCounter) pctCounter.textContent = '100%';
        if (statusMsg) statusMsg.textContent = 'Spatial datum resolved.';
        setTimeout(dismissPreloader, 350);
        return;
      }

      const rounded = Math.floor(progress);
      if (progressBar) progressBar.style.width = `${progress}%`;
      if (pctCounter) pctCounter.textContent = `${String(rounded).padStart(2, '0')}%`;

      // Phase 1: 0% – 35% -> Gujarati (એફ.એન.એ. - સ્થાપત્યની વાર્તાઓ)
      if (progress < 35) {
        setScriptPane(paneGujarati);
        if (statusMsg) statusMsg.textContent = 'સંકલન: સ્થાપત્યની વાર્તાઓ (Calibrating spatial coordinates…)';
      }
      // Phase 2: 35% – 70% -> Marathi (एफ.एन.ए. - वास्तुकलेच्या गोष्टी)
      else if (progress < 70) {
        setScriptPane(paneMarathi);
        if (statusMsg) statusMsg.textContent = 'संरचना: वास्तुकलेच्या गोष्टी (Casting monolithic formwork…)';
      }
      // Phase 3: 70% – 100% -> English (FNA Design Lab)
      else {
        setScriptPane(paneEnglish);
        if (statusMsg) statusMsg.textContent = 'Curving bespoke joinery & spatial envelopes…';
      }
    }, intervalTime);

    // Allow user to skip by clicking
    loaderScreen.addEventListener('click', dismissPreloader);
  }


  /* ─────────────────────────────────────────────────────────────
     2. STAAP HORIZONTAL MULTI-SCREEN VIEWPORT ENGINE
     (4 Screens: 0: Home, 1: About, 2: Work, 3: Connect)
     ───────────────────────────────────────────────────────────── */
  const sliderTrack = document.getElementById('slider-track');
  const screens = ['home', 'about', 'work', 'connect'];
  let currentScreenIndex = 0;
  let isWheelLocked = false;

  const navLinks = document.querySelectorAll('.nav-section-link');
  const drawerLinks = document.querySelectorAll('.drawer-item-btn');
  const scrollerPill = document.getElementById('scroller-pill');
  const scrollerDigit = document.getElementById('scroller-current-digit');
  const guideDots = document.querySelectorAll('.scroller-guide-dots .s-dot');

  function goToScreen(index) {
    if (index < 0) index = 0;
    if (index > 3) index = 3;
    currentScreenIndex = index;

    // Desktop: translate slider track horizontally
    if (window.innerWidth >= 768) {
      if (sliderTrack) {
        sliderTrack.style.transform = `translateX(-${index * 100}vw)`;
      }
    } else {
      // Mobile: scroll to section vertically
      const targetId = screens[index];
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Update active nav links
    navLinks.forEach(link => {
      const linkIdx = parseInt(link.getAttribute('data-index'), 10);
      link.classList.toggle('active', linkIdx === index);
    });

    // Update mobile drawer links
    drawerLinks.forEach(btn => {
      const btnIdx = parseInt(btn.getAttribute('data-index'), 10);
      btn.classList.toggle('active', btnIdx === index);
    });

    // Update 'F' Scroller rail pill position and digit
    if (scrollerPill) {
      // Track inner usable space: 160px - 36px - 6px = 118px
      const stepY = 118 / 3;
      scrollerPill.style.transform = `translateY(${index * stepY}px)`;
    }
    if (scrollerDigit) {
      scrollerDigit.textContent = `0${index + 1}`;
    }

    // Update guide dots
    guideDots.forEach(dot => {
      const dotIdx = parseInt(dot.getAttribute('data-index'), 10);
      dot.classList.toggle('active', dotIdx === index);
    });
  }

  // Expose globally so inline onclick handlers (e.g., from modal) work
  window.goToScreen = goToScreen;

  // Desktop Wheel Delta Navigation (Reverse-engineered from Staap.in)
  let wheelDeltaAccumulator = 0;
  const WHEEL_THRESHOLD = 50;

  window.addEventListener('wheel', (e) => {
    // Only engage horizontal slide on desktop
    if (window.innerWidth < 768) return;
    if (isWheelLocked) return;

    // Check if the user is scrolling inside an element with internal scroll (like the project table, about pane, or modal)
    const target = e.target;
    const isInsideScrollableTable = target.closest('#work-table-rows');
    const isInsideModal = target.closest('#project-modal.open');
    const isInsideAbout = target.closest('#about');

    if (isInsideModal) return;

    if (isInsideScrollableTable) {
      const container = document.getElementById('work-table-rows');
      const atTop = container.scrollTop <= 0;
      const atBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 2;

      // If scrolling down and not at bottom, let table scroll
      if (e.deltaY > 0 && !atBottom) return;
      // If scrolling up and not at top, let table scroll
      if (e.deltaY < 0 && !atTop) return;
    }

    if (isInsideAbout) {
      const aboutEl = document.getElementById('about');
      if (aboutEl && aboutEl.scrollHeight > aboutEl.clientHeight + 4) {
        const atTop = aboutEl.scrollTop <= 0;
        const atBottom = aboutEl.scrollTop + aboutEl.clientHeight >= aboutEl.scrollHeight - 4;
        if (e.deltaY > 0 && !atBottom) return;
        if (e.deltaY < 0 && !atTop) return;
      }
    }

    wheelDeltaAccumulator += e.deltaY;

    if (Math.abs(wheelDeltaAccumulator) >= WHEEL_THRESHOLD) {
      if (wheelDeltaAccumulator > 0 && currentScreenIndex < 3) {
        goToScreen(currentScreenIndex + 1);
        lockWheel();
      } else if (wheelDeltaAccumulator < 0 && currentScreenIndex > 0) {
        goToScreen(currentScreenIndex - 1);
        lockWheel();
      }
      wheelDeltaAccumulator = 0;
    }
  }, { passive: false });

  function lockWheel() {
    isWheelLocked = true;
    setTimeout(() => {
      isWheelLocked = false;
      wheelDeltaAccumulator = 0;
    }, 750);
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Ignore if typing inside input or textarea
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

    if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      if (currentScreenIndex < 3) goToScreen(currentScreenIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      if (currentScreenIndex > 0) goToScreen(currentScreenIndex - 1);
    } else if (e.key === 'Home') {
      goToScreen(0);
    } else if (e.key === 'End') {
      goToScreen(3);
    }
  });

  // Touch Swipe for Mobile & Tablet Horizontal Glides
  let touchStartX = 0;
  let touchStartY = 0;

  window.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (window.innerWidth < 768) return; // Vertical on small phones
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 60) {
      if (diffX > 0 && currentScreenIndex < 3) {
        goToScreen(currentScreenIndex + 1);
      } else if (diffX < 0 && currentScreenIndex > 0) {
        goToScreen(currentScreenIndex - 1);
      }
    }
  }, { passive: true });

  // Connect Top Navbar buttons
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const idx = parseInt(link.getAttribute('data-index'), 10);
      goToScreen(idx);
    });
  });

  // Connect Logo button to return Home
  const logoBtn = document.getElementById('nav-logo-btn');
  if (logoBtn) {
    logoBtn.addEventListener('click', () => goToScreen(0));
  }

  // Connect Home CTA buttons
  document.querySelectorAll('.btn-slide-nav').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      goToScreen(idx);
    });
  });

  // Connect 'F' Scroller guide dots & rail click
  guideDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      goToScreen(idx);
    });
  });

  const scrollerRail = document.getElementById('f-scroller-rail');
  if (scrollerRail) {
    scrollerRail.addEventListener('click', () => {
      // Cycle to next screen or back to 0
      goToScreen((currentScreenIndex + 1) % 4);
    });
  }


  /* ─────────────────────────────────────────────────────────────
     3. PROJECT TABLE RENDERING & LIVE HOVER PREVIEWS
     (Driven by authentic FNA_DB in data.js)
     ───────────────────────────────────────────────────────────── */
  const tableRowsContainer = document.getElementById('work-table-rows');
  const hoverPreviewCard = document.getElementById('hover-preview-card');
  const hoverPreviewImg = document.getElementById('hover-preview-img');
  const hoverPreviewCap = document.getElementById('hover-preview-cap');
  let currentCategoryFilter = 'All';

  function updateProjectCounts(allProjects) {
    const fmt = (n) => `[${String(n).padStart(2, '0')}]`;
    const norm = (c) => (typeof FNA_DB.normalizeCategory === 'function' ? FNA_DB.normalizeCategory(c) : c);
    const total = allProjects.length;
    const arch = allProjects.filter(p => norm(p.category) === 'Architecture').length;
    const interiors = allProjects.filter(p => norm(p.category) === 'Interiors').length;
    const objects = allProjects.filter(p => norm(p.category) === 'Objects').length;

    const homeCount = document.getElementById('home-works-count');
    const allEl = document.getElementById('work-count-all');
    const archEl = document.getElementById('work-count-arch');
    const intEl = document.getElementById('work-count-interiors');
    const objEl = document.getElementById('work-count-objects');

    if (homeCount) homeCount.textContent = fmt(total);
    if (allEl) allEl.textContent = fmt(total);
    if (archEl) archEl.textContent = fmt(arch);
    if (intEl) intEl.textContent = fmt(interiors);
    if (objEl) objEl.textContent = fmt(objects);
  }

  function renderProjectsTable(filter = 'All') {
    if (!tableRowsContainer || typeof FNA_DB === 'undefined') return;

    const allProjects = FNA_DB.getPortfolio();
    updateProjectCounts(allProjects);

    const filtered = filter === 'All'
      ? allProjects
      : allProjects.filter(p => p.category.toLowerCase() === filter.toLowerCase());

    tableRowsContainer.innerHTML = '';

    if (filtered.length === 0) {
      const emptyRow = document.createElement('div');
      emptyRow.className = 'work-row-item work-empty-state';
      emptyRow.style.justifyContent = 'center';
      emptyRow.style.color = '#64748B';
      emptyRow.style.cursor = 'default';
      emptyRow.textContent = 'No projects published yet in this category.';
      tableRowsContainer.appendChild(emptyRow);
      return;
    }

    filtered.forEach((p, idx) => {
      const row = document.createElement('div');
      row.className = 'work-row-item';
      row.setAttribute('data-id', p.id);
      row.setAttribute('tabindex', '0');
      row.setAttribute('role', 'button');
      row.setAttribute('aria-label', `View ${p.title}`);

      let catBadgeClass = 'badge-interiors';
      let dotColorClass = 'tri-n';
      if (p.category.toLowerCase().includes('arch')) {
        catBadgeClass = 'badge-arch';
        dotColorClass = 'tri-f';
      } else if (p.category.toLowerCase().includes('obj') || p.category.toLowerCase().includes('furn')) {
        catBadgeClass = 'badge-objects';
        dotColorClass = 'tri-a';
      }

      row.innerHTML = `
        <span class="row-idx">${String(idx + 1).padStart(2, '0')}</span>
        <span class="row-title">${p.title}</span>
        <span class="row-type"><span class="type-badge ${catBadgeClass}"><span class="${dotColorClass}"></span> ${p.category}</span></span>
        <span class="row-loc">${p.location}</span>
        <span class="row-year">${p.year}</span>
        <span class="row-action">View →</span>
      `;

      // Hover preview bindings
      row.addEventListener('mouseenter', (e) => {
        if (hoverPreviewCard && hoverPreviewImg && hoverPreviewCap && window.innerWidth >= 992) {
          hoverPreviewImg.src = p.image;
          hoverPreviewCap.textContent = `${p.title} · ${p.location}`;
          hoverPreviewCard.classList.add('active');
          positionHoverCard(e);
        }
      });

      row.addEventListener('mousemove', (e) => {
        if (hoverPreviewCard && window.innerWidth >= 992) {
          positionHoverCard(e);
        }
      });

      row.addEventListener('mouseleave', () => {
        if (hoverPreviewCard) {
          hoverPreviewCard.classList.remove('active');
        }
      });

      // Click to open project modal
      row.addEventListener('click', () => {
        openProjectModal(p);
      });

      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProjectModal(p);
        }
      });

      tableRowsContainer.appendChild(row);
    });
  }

  function positionHoverCard(e) {
    if (!hoverPreviewCard) return;
    const cardWidth = 280;
    const cardHeight = 200;
    let posX = e.clientX + 24;
    let posY = e.clientY - (cardHeight / 2);

    // Prevent screen overflow
    if (posX + cardWidth > window.innerWidth - 30) {
      posX = e.clientX - cardWidth - 24;
    }
    if (posY < 80) posY = 80;
    if (posY + cardHeight > window.innerHeight - 30) {
      posY = window.innerHeight - cardHeight - 30;
    }

    hoverPreviewCard.style.left = `${posX}px`;
    hoverPreviewCard.style.top = `${posY}px`;
  }

  // Work Category Filter Buttons
  const filterButtons = document.querySelectorAll('.work-cat-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter') || 'All';
      currentCategoryFilter = filter;
      renderProjectsTable(filter);
    });
  });

  renderProjectsTable('All');
  if (typeof FNA_DB !== 'undefined' && FNA_DB.fetchPortfolioFromServer) {
    FNA_DB.fetchPortfolioFromServer().then(() => renderProjectsTable(currentCategoryFilter)).catch(() => {});
  }
  window.addEventListener('storage', (e) => {
    if (typeof FNA_DB !== 'undefined' && e.key === FNA_DB.KEYS.PORTFOLIO) {
      renderProjectsTable(currentCategoryFilter);
    }
  });


  /* ─────────────────────────────────────────────────────────────
     4. PROJECT DETAIL MODAL
     ───────────────────────────────────────────────────────────── */
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalDisplayImg = document.getElementById('modal-display-img');
  const modalCategory = document.getElementById('modal-category');
  const modalIndex = document.getElementById('modal-index');
  const modalTitle = document.getElementById('modal-title');
  const modalLocation = document.getElementById('modal-location');
  const modalYear = document.getElementById('modal-year');
  const modalDescription = document.getElementById('modal-description');

  function openProjectModal(p) {
    if (!projectModal) return;
    if (modalDisplayImg) modalDisplayImg.src = p.image;
    if (modalDisplayImg) modalDisplayImg.alt = p.title;
    if (modalCategory) modalCategory.textContent = p.category.toUpperCase();
    if (modalIndex) modalIndex.textContent = `${p.index || '01'} / ARCHIVE`;
    if (modalTitle) modalTitle.textContent = p.title;
    if (modalLocation) modalLocation.textContent = p.location;
    if (modalYear) modalYear.textContent = p.year;
    if (modalDescription) modalDescription.textContent = p.description;

    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    if (window.innerWidth < 768) {
      document.body.style.overflow = '';
    }
  }

  window.closeModal = closeModal;

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }


  /* ─────────────────────────────────────────────────────────────
     5. PROJECT COMMISSION ENQUIRY INTERACTIVE TRANSMISSION
     ───────────────────────────────────────────────────────────── */
  const scopePills = document.querySelectorAll('#dossier-scope-pills .scope-pill');
  const btnTransmit = document.getElementById('btn-transmit-dossier');
  const dossierSuccess = document.getElementById('dossier-success');
  const dossierRefTag = document.getElementById('dossier-ref-tag');
  const btnResetDossier = document.getElementById('btn-reset-dossier');

  const scopeErrorNotice = document.getElementById('scope-error-notice');
  const clientErrorNotice = document.getElementById('client-error-notice');

  const inputName = document.getElementById('dossier-name');
  const inputEmail = document.getElementById('dossier-email');
  const inputPhone = document.getElementById('dossier-phone');
  const inputCity = document.getElementById('dossier-city');
  const inputNotes = document.getElementById('dossier-notes');

  // Toggle scope pills
  scopePills.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.classList.toggle('active');
      if (scopeErrorNotice) scopeErrorNotice.style.display = 'none';
    });
  });

  if (btnTransmit) {
    btnTransmit.addEventListener('click', async (e) => {
      e.preventDefault();

      const selectedScopes = Array.from(scopePills)
        .filter(p => p.classList.contains('active'))
        .map(p => p.getAttribute('data-scope'));

      const name = inputName?.value.trim() || '';
      const email = inputEmail?.value.trim() || '';
      const phone = inputPhone?.value.trim() || '';
      const city = inputCity?.value.trim() || '';
      const notes = inputNotes?.value.trim() || '';

      let hasError = false;

      // Validate scope
      if (selectedScopes.length === 0) {
        if (scopeErrorNotice) scopeErrorNotice.style.display = 'block';
        hasError = true;
      } else {
        if (scopeErrorNotice) scopeErrorNotice.style.display = 'none';
      }

      // Validate client name & email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name || !email || !emailRegex.test(email)) {
        if (clientErrorNotice) clientErrorNotice.style.display = 'block';
        hasError = true;
      } else {
        if (clientErrorNotice) clientErrorNotice.style.display = 'none';
      }

      if (hasError) {
        showToast('Please provide your name, valid email address, and select a discipline.', 'error');
        return;
      }

      if (btnTransmit) {
        btnTransmit.disabled = true;
        btnTransmit.innerHTML = `<span>Transmitting Brief…</span> <span class="arr">⏳</span>`;
      }

      // Generate Reference Code: FNA-2026-XXXX
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      let refCode = `FNA-${new Date().getFullYear()}-${randomCode}`;

      // Save inquiry to shared DB
      if (typeof FNA_DB !== 'undefined') {
        try {
          const saved = await FNA_DB.addInquiry({
            ref: refCode,
            name,
            email,
            phone,
            city,
            scopes: selectedScopes,
            notes,
            timestamp: new Date().toISOString()
          });
          if (saved && saved.ref) {
            refCode = saved.ref;
          }
        } catch (e) {
          // Optimistic fallback
        }
      }

      if (btnTransmit) {
        btnTransmit.disabled = false;
        btnTransmit.innerHTML = `<span>Transmit Enquiry</span> <span class="arr">→</span>`;
        btnTransmit.style.display = 'none';
      }

      // Display Success State
      if (dossierRefTag) dossierRefTag.textContent = `REF: ${refCode}`;
      if (dossierSuccess) dossierSuccess.style.display = 'block';

      showToast(`Enquiry registered successfully. [${refCode}]`, 'success');
    });
  }

  // Reset Dossier Form
  if (btnResetDossier) {
    btnResetDossier.addEventListener('click', () => {
      scopePills.forEach(p => p.classList.remove('active'));
      const firstScope = document.querySelector('#dossier-scope-pills .scope-pill');
      if (firstScope) firstScope.classList.add('active');

      if (inputName) inputName.value = '';
      if (inputEmail) inputEmail.value = '';
      if (inputPhone) inputPhone.value = '';
      if (inputCity) inputCity.value = '';
      if (inputNotes) inputNotes.value = '';

      if (scopeErrorNotice) scopeErrorNotice.style.display = 'none';
      if (clientErrorNotice) clientErrorNotice.style.display = 'none';
      if (dossierSuccess) dossierSuccess.style.display = 'none';
      if (btnTransmit) btnTransmit.style.display = 'flex';
    });
  }


  /* ─────────────────────────────────────────────────────────────
     6. QUICK ARCHIVE SEARCH MODAL (Ctrl + K)
     ───────────────────────────────────────────────────────────── */
  const searchModal = document.getElementById('search-modal');
  const btnOpenSearch = document.getElementById('btn-open-search');
  const searchCloseBtn = document.getElementById('search-close-btn');
  const searchField = document.getElementById('search-field');
  const searchHitsList = document.getElementById('search-hits-list');
  const searchHitsCount = document.getElementById('search-hits-count');

  function openSearchModal() {
    if (!searchModal) return;
    searchModal.classList.add('open');
    searchModal.setAttribute('aria-hidden', 'false');
    if (searchField) {
      searchField.value = '';
      setTimeout(() => searchField.focus(), 100);
    }
    renderSearchResults('');
  }

  function closeSearchModal() {
    if (!searchModal) return;
    searchModal.classList.remove('open');
    searchModal.setAttribute('aria-hidden', 'true');
  }

  function renderSearchResults(query = '') {
    if (!searchHitsList || typeof FNA_DB === 'undefined') return;

    const all = FNA_DB.getPortfolio();
    const q = query.trim().toLowerCase();

    const matches = q === ''
      ? all
      : all.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );

    if (searchHitsCount) {
      searchHitsCount.textContent = `${String(matches.length).padStart(2, '0')} Projects found`;
    }

    searchHitsList.innerHTML = '';

    if (matches.length === 0) {
      searchHitsList.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--text-mist); font-family: var(--font-mono); font-size: 0.8rem;">
          No architectural records matched "${query}".
        </div>
      `;
      return;
    }

    matches.forEach(p => {
      const item = document.createElement('div');
      item.className = 'search-hit-item';
      item.innerHTML = `
        <img src="${p.image}" alt="${p.title}" class="search-hit-img" />
        <div class="search-hit-info">
          <div class="search-hit-title">${p.title}</div>
          <div class="search-hit-meta font-mono">${p.category} · ${p.location} · ${p.year}</div>
        </div>
        <span class="font-mono text-terracotta" style="font-size: 0.75rem;">View →</span>
      `;

      item.addEventListener('click', () => {
        closeSearchModal();
        openProjectModal(p);
      });

      searchHitsList.appendChild(item);
    });
  }

  if (btnOpenSearch) {
    btnOpenSearch.addEventListener('click', openSearchModal);
  }

  if (searchCloseBtn) {
    searchCloseBtn.addEventListener('click', closeSearchModal);
  }

  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearchModal();
    });
  }

  if (searchField) {
    searchField.addEventListener('input', (e) => {
      renderSearchResults(e.target.value);
    });
  }

  // Global Keyboard Shortcuts (Ctrl+K Archive Search, Escape Modal/Drawer Dismissal)
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchModal && searchModal.classList.contains('open')) {
        closeSearchModal();
      } else {
        openSearchModal();
      }
    } else if (e.key === 'Escape') {
      if (projectModal && projectModal.classList.contains('open')) {
        closeModal();
      } else if (searchModal && searchModal.classList.contains('open')) {
        closeSearchModal();
      } else if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      } else if (!preloaderDismissed) {
        dismissPreloader();
      }
    }
  });


  /* ─────────────────────────────────────────────────────────────
     7. MOBILE DRAWER NAVIGATION & BACKDROP
     ───────────────────────────────────────────────────────────── */
  const mobileHamburger = document.getElementById('mobile-hamburger');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerBackdrop = document.getElementById('mobile-drawer-backdrop');
  const drawerClose = document.getElementById('drawer-close');

  function openDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      document.body.classList.add('drawer-open');
    }
  }

  function closeDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.classList.remove('drawer-open');
    }
  }

  if (mobileHamburger) mobileHamburger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (mobileDrawerBackdrop) mobileDrawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      goToScreen(idx);
      closeDrawer();
    });
  });


  /* ─────────────────────────────────────────────────────────────
     8. TOAST NOTIFICATION UTILITY
     ───────────────────────────────────────────────────────────── */
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `staap-toast font-mono ${type}`;
    toast.textContent = message;

    if (type === 'error') {
      toast.style.borderColor = '#E55353';
    } else if (type === 'success') {
      toast.style.borderColor = 'var(--fna-terracotta)';
    }

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-fadeout');
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }

  window.showToast = showToast;


  /* ─────────────────────────────────────────────────────────────
     9. BESPOKE ARCHITECTURAL DRAFTING CURSOR (FNA DESIGN LAB)
     Precision Terracotta Lead Point + Fluid Slate Drafting Frame
     ───────────────────────────────────────────────────────────── */
  const cursorLead = document.getElementById('fna-cursor-lead');
  const cursorReticle = document.getElementById('fna-cursor-reticle');
  const cursorTag = document.getElementById('cursor-tag-label');

  if (cursorLead && cursorReticle) {
    let targetX = -100;
    let targetY = -100;
    let frameX = -100;
    let frameY = -100;
    let isInitialized = false;
    let isVisible = false;

    function glideCursor() {
      if (isInitialized && isVisible) {
        const dx = targetX - frameX;
        const dy = targetY - frameY;

        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
          frameX += dx * 0.24;
          frameY += dy * 0.24;
        } else {
          frameX = targetX;
          frameY = targetY;
        }

        cursorReticle.style.transform = `translate3d(${frameX.toFixed(2)}px, ${frameY.toFixed(2)}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(glideCursor);
    }
    requestAnimationFrame(glideCursor);

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      cursorLead.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;

      if (!isInitialized) {
        frameX = targetX;
        frameY = targetY;
        isInitialized = true;
        cursorReticle.style.transform = `translate3d(${frameX.toFixed(2)}px, ${frameY.toFixed(2)}px, 0) translate(-50%, -50%)`;
      }

      if (!isVisible) {
        isVisible = true;
        cursorLead.style.opacity = '1';
        cursorReticle.style.opacity = '1';
      }
    }, { passive: true });

    window.addEventListener('mousedown', () => document.body.classList.add('cursor-down'), { passive: true });
    window.addEventListener('mouseup', () => document.body.classList.remove('cursor-down'), { passive: true });

    document.addEventListener('mouseleave', () => {
      isVisible = false;
      cursorLead.style.opacity = '0';
      cursorReticle.style.opacity = '0';
    });
    document.addEventListener('mouseenter', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      frameX = targetX;
      frameY = targetY;
      isVisible = true;
      cursorLead.style.opacity = '1';
      cursorReticle.style.opacity = '1';
    });

    document.addEventListener('mouseover', (e) => {
      const isInput = e.target.closest('input, textarea, select, [contenteditable="true"]');
      if (isInput) {
        document.body.classList.add('cursor-hide');
        document.body.classList.remove('cursor-active-hover');
        return;
      } else {
        document.body.classList.remove('cursor-hide');
      }

      const clickable = e.target.closest('a, button, [role="button"], label, .work-row-item, .mosaic-item, .scope-pill, .s-dot, .work-cat-btn, .search-hit-item, .crm-filter-pill');
      if (clickable) {
        document.body.classList.add('cursor-active-hover');
        if (cursorTag) {
          if (clickable.closest('.work-row-item')) {
            cursorTag.textContent = 'VIEW';
            document.body.classList.add('cursor-has-tag');
          } else if (clickable.closest('.mosaic-item')) {
            cursorTag.textContent = 'CRAFT';
            document.body.classList.add('cursor-has-tag');
          } else if (clickable.closest('#btn-open-search')) {
            cursorTag.textContent = 'FIND';
            document.body.classList.add('cursor-has-tag');
          } else if (clickable.closest('.btn-transmit-dossier, .btn-modal-brief')) {
            cursorTag.textContent = 'ENQUIRE';
            document.body.classList.add('cursor-has-tag');
          } else {
            cursorTag.textContent = '';
            document.body.classList.remove('cursor-has-tag');
          }
        }
      }
    });

    document.addEventListener('mouseout', (e) => {
      const isInput = e.target.closest('input, textarea, select, [contenteditable="true"]');
      if (isInput) {
        document.body.classList.remove('cursor-hide');
      }

      const clickable = e.target.closest('a, button, [role="button"], label, .work-row-item, .mosaic-item, .scope-pill, .s-dot, .work-cat-btn, .search-hit-item, .crm-filter-pill');
      if (clickable) {
        document.body.classList.remove('cursor-active-hover');
        document.body.classList.remove('cursor-has-tag');
        if (cursorTag) cursorTag.textContent = '';
      }
    });
  }

});
