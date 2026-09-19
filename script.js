document.addEventListener('DOMContentLoaded', function () {

  /* ------------------------------------------------------------------ */
  /* Helpers                                                             */
  /* ------------------------------------------------------------------ */
  function el(tag, className, html) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  /* ------------------------------------------------------------------ */
  /* Profile links — every GitHub / LinkedIn / Resume / Email control   */
  /* on the page reads from PROFILE in data.js, so one edit updates all */
  /* ------------------------------------------------------------------ */
  function renderProfileLinks() {
    document.querySelectorAll('[data-link="github"]').forEach(function (n) { n.setAttribute('href', PROFILE.github); });
    document.querySelectorAll('[data-link="linkedin"]').forEach(function (n) { n.setAttribute('href', PROFILE.linkedin); });
    document.querySelectorAll('[data-link="resume"]').forEach(function (n) { n.setAttribute('href', PROFILE.resume); });
    document.querySelectorAll('[data-link="email"]').forEach(function (n) { n.setAttribute('href', 'mailto:' + PROFILE.email); });
    document.querySelectorAll('[data-text="email"]').forEach(function (n) { n.textContent = PROFILE.email; });
  }

  /* ------------------------------------------------------------------ */
  /* Hero rotating focus words                                          */
  /* ------------------------------------------------------------------ */
  function initFocusRotator() {
    var target = document.getElementById('focusRotator');
    if (!target || !PROFILE.focusRotator || !PROFILE.focusRotator.length) return;
    var words = PROFILE.focusRotator;
    var i = 0;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      target.textContent = words[0];
      return;
    }

    function typeWord(word, cb) {
      var pos = 0;
      target.textContent = '';
      (function step() {
        if (pos <= word.length) {
          target.textContent = word.slice(0, pos);
          pos++;
          setTimeout(step, 45);
        } else {
          setTimeout(cb, 1400);
        }
      })();
    }
    function eraseWord(cb) {
      var word = target.textContent;
      (function step() {
        if (word.length > 0) {
          word = word.slice(0, -1);
          target.textContent = word;
          setTimeout(step, 30);
        } else {
          setTimeout(cb, 300);
        }
      })();
    }
    function cycle() {
      typeWord(words[i], function () {
        eraseWord(function () {
          i = (i + 1) % words.length;
          cycle();
        });
      });
    }
    cycle();
  }

  /* ------------------------------------------------------------------ */
  /* Skills                                                              */
  /* ------------------------------------------------------------------ */
  function renderSkills() {
    var grid = document.getElementById('skillsGrid');
    if (!grid) return;
    SKILLS.forEach(function (cat) {
      var col = el('div', 'col-md-6 col-lg-4');
      var block = el('div', 'skill-block reveal');
      block.appendChild(el('h3', 'skill-block-title', '<i class="bi ' + cat.icon + '" aria-hidden="true"></i> ' + cat.title));
      var list = el('ul', 'skill-list');
      cat.items.forEach(function (item) { list.appendChild(el('li', null, item)); });
      block.appendChild(list);
      col.appendChild(block);
      grid.appendChild(col);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Roadmap                                                              */
  /* ------------------------------------------------------------------ */
  function renderRoadmap() {
    var list = document.getElementById('roadmapList');
    if (!list) return;
    ROADMAP.forEach(function (stage, index) {
      var item = el('li', 'roadmap-item reveal is-' + stage.status);
      item.appendChild(el('span', 'roadmap-marker', stage.status === 'done' ? '<i class="bi bi-check" aria-hidden="true"></i>' : String(index + 1)));
      var content = el('div', 'roadmap-content');
      content.appendChild(el('h3', null, stage.title));
      content.appendChild(el('p', null, stage.desc));
      item.appendChild(content);
      list.appendChild(item);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Projects (+ filter)                                                 */
  /* ------------------------------------------------------------------ */
  function buildProjectCard(project, index) {
    var col = el('div', 'col-lg-4 project-col');
    col.setAttribute('data-status', project.status);

    var card = el('article', 'project-card reveal status-' + project.status);
    var badgeClass = project.status === 'done' ? 'status-badge-done' : 'status-badge-progress';
    card.appendChild(el('div', 'project-card-top', '<span class="status-badge ' + badgeClass + '">' + project.statusLabel + '</span>'));
    card.appendChild(el('h3', 'project-title', project.title));
    card.appendChild(el('p', 'project-desc', project.description));

    var tags = el('div', 'project-tags');
    project.tags.forEach(function (t) { tags.appendChild(el('span', null, t)); });
    card.appendChild(tags);

    var detailId = 'detail-project-' + index;
    var toggle = el('button', 'project-toggle', 'What I implemented <i class="bi bi-chevron-down" aria-hidden="true"></i>');
    toggle.setAttribute('type', 'button');
    toggle.setAttribute('data-bs-toggle', 'collapse');
    toggle.setAttribute('data-bs-target', '#' + detailId);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', detailId);
    card.appendChild(toggle);

    var detailWrap = el('div', 'collapse');
    detailWrap.id = detailId;
    var detailList = el('ul', 'project-detail-list');
    project.details.forEach(function (d) { detailList.appendChild(el('li', null, d)); });
    detailWrap.appendChild(detailList);
    if (project.note) {
      detailWrap.appendChild(el('p', 'project-note', '<i class="bi bi-info-circle" aria-hidden="true"></i> ' + project.note));
    }
    card.appendChild(detailWrap);

    var actions = el('div', 'project-actions');
    if (project.github) {
      actions.appendChild(el('a', 'btn btn-outline-cta btn-sm-cta', '<i class="bi bi-github" aria-hidden="true"></i> GitHub'));
      actions.lastChild.href = project.github;
      actions.lastChild.target = '_blank';
      actions.lastChild.rel = 'noopener';
    }
    if (project.demo) {
      actions.appendChild(el('a', 'btn btn-ghost-cta btn-sm-cta', '<i class="bi bi-box-arrow-up-right" aria-hidden="true"></i> Demo'));
      actions.lastChild.href = project.demo;
      actions.lastChild.target = '_blank';
      actions.lastChild.rel = 'noopener';
    }
    card.appendChild(actions);

    col.appendChild(card);
    return col;
  }

  function renderProjects() {
    var grid = document.getElementById('projectsGrid');
    if (!grid) return;
    PROJECTS.forEach(function (project, index) {
      grid.appendChild(buildProjectCard(project, index));
    });

    /* Filter controls */
    var filterBar = document.getElementById('projectFilters');
    if (filterBar) {
      var doneCount = PROJECTS.filter(function (p) { return p.status === 'done'; }).length;
      var progressCount = PROJECTS.filter(function (p) { return p.status === 'progress'; }).length;
      var filters = [
        { key: 'all', label: 'All (' + PROJECTS.length + ')' },
        { key: 'done', label: 'Completed (' + doneCount + ')' },
        { key: 'progress', label: 'In Progress (' + progressCount + ')' }
      ];
      filters.forEach(function (f, i) {
        var btn = el('button', 'filter-btn' + (i === 0 ? ' is-active' : ''), f.label);
        btn.type = 'button';
        btn.setAttribute('data-filter', f.key);
        btn.addEventListener('click', function () {
          filterBar.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          document.querySelectorAll('.project-col').forEach(function (col) {
            var show = f.key === 'all' || col.getAttribute('data-status') === f.key;
            col.style.display = show ? '' : 'none';
          });
        });
        filterBar.appendChild(btn);
      });
    }
  }

  /* ------------------------------------------------------------------ */
  /* Certifications + learning tags                                      */
  /* ------------------------------------------------------------------ */
  function renderCertifications() {
    var grid = document.getElementById('certGrid');
    if (!grid) return;
    CERTIFICATIONS.forEach(function (cert) {
      var col = el('div', 'col-md-4');
      var card = el('div', 'cert-card reveal');
      card.appendChild(el('i', 'bi bi-patch-check'));
      card.appendChild(el('h3', null, cert.title));
      card.appendChild(el('p', 'education-meta', cert.issuer));
      var link = el('a', 'cert-link', 'View certificate');
      link.href = cert.link;
      link.target = '_blank';
      link.rel = 'noopener';
      card.appendChild(link);
      col.appendChild(card);
      grid.appendChild(col);
    });
  }

  function renderLearning() {
    var wrap = document.getElementById('learningTags');
    if (!wrap) return;
    LEARNING.forEach(function (item) { wrap.appendChild(el('span', null, item)); });
  }

  /* ------------------------------------------------------------------ */
  /* Stats strip — counts are computed live from the data above, so     */
  /* they stay accurate as projects/skills are added                    */
  /* ------------------------------------------------------------------ */
  function renderStats() {
    var wrap = document.getElementById('statsStrip');
    if (!wrap) return;
    var doneProjects = PROJECTS.filter(function (p) { return p.status === 'done'; }).length;
    var stats = [
      { value: PROJECTS.length, label: PROJECTS.length === 1 ? 'ML / Dev Project' : 'ML / Dev Projects' },
      { value: doneProjects, label: doneProjects === 1 ? 'Project Completed' : 'Projects Completed' },
      { value: SKILLS.length, label: 'Skill Areas' },
      { value: ROADMAP.length, label: 'Stage Learning Roadmap' }
    ];
    stats.forEach(function (s) {
      var item = el('div', 'stat-item reveal');
      item.appendChild(el('span', 'stat-value', '0'));
      item.appendChild(el('span', 'stat-label', s.label));
      item.querySelector('.stat-value').setAttribute('data-count-to', s.value);
      wrap.appendChild(item);
    });
  }

  function animateCounters() {
    var counters = document.querySelectorAll('.stat-value[data-count-to]');
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    counters.forEach(function (counter) {
      var target = parseInt(counter.getAttribute('data-count-to'), 10) || 0;
      if (reduceMotion) { counter.textContent = target; return; }
      var current = 0;
      var duration = 700;
      var stepTime = Math.max(Math.floor(duration / Math.max(target, 1)), 40);
      var timer = setInterval(function () {
        current++;
        counter.textContent = current;
        if (current >= target) clearInterval(timer);
      }, stepTime);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Nav / scroll chrome                                                  */
  /* ------------------------------------------------------------------ */
  function initChrome() {
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    var nav = document.getElementById('siteNav');
    function handleNavScroll() {
      if (window.scrollY > 12) nav.classList.add('is-scrolled');
      else nav.classList.remove('is-scrolled');
    }
    handleNavScroll();
    window.addEventListener('scroll', handleNavScroll, { passive: true });

    var progressBar = document.getElementById('scrollProgress');
    function handleScrollProgress() {
      if (!progressBar) return;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    }
    handleScrollProgress();
    window.addEventListener('scroll', handleScrollProgress, { passive: true });
    window.addEventListener('resize', handleScrollProgress);

    var backToTop = document.getElementById('backToTop');
    function handleBackToTop() {
      if (window.scrollY > 500) backToTop.classList.add('is-visible');
      else backToTop.classList.remove('is-visible');
    }
    handleBackToTop();
    window.addEventListener('scroll', handleBackToTop, { passive: true });
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    var navMenu = document.getElementById('navMenu');
    var navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (navMenu.classList.contains('show') && window.bootstrap) {
          window.bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
        }
      });
    });

    var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id], header[id]'));
    var navLinkMap = {};
    navLinks.forEach(function (link) { navLinkMap[link.getAttribute('href').replace('#', '')] = link; });
    function setActiveLink() {
      var scrollPos = window.scrollY + 140;
      var currentId = null;
      sections.forEach(function (section) { if (section.offsetTop <= scrollPos) currentId = section.id; });
      navLinks.forEach(function (link) { link.classList.remove('is-active'); });
      if (currentId && navLinkMap[currentId]) navLinkMap[currentId].classList.add('is-active');
    }
    setActiveLink();
    window.addEventListener('scroll', setActiveLink, { passive: true });
  }

  /* ------------------------------------------------------------------ */
  /* Scroll reveal — applies to anything with class "reveal", including  */
  /* items rendered dynamically above                                    */
  /* ------------------------------------------------------------------ */
  function initReveal() {
    var revealTargets = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (entry.target.id === 'statsStrip' || entry.target.closest('#statsStrip')) animateCounters();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
      revealTargets.forEach(function (elx) { observer.observe(elx); });

      var statsEl = document.getElementById('statsStrip');
      if (statsEl) observer.observe(statsEl);
    } else {
      revealTargets.forEach(function (elx) { elx.classList.add('is-visible'); });
      animateCounters();
    }
  }

  /* ------------------------------------------------------------------ */
  /* Boot                                                                 */
  /* ------------------------------------------------------------------ */
  renderProfileLinks();
  initFocusRotator();
  renderStats();
  renderSkills();
  renderRoadmap();
  renderProjects();
  renderCertifications();
  renderLearning();
  initChrome();
  initReveal();

});
