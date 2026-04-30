/**
 * app.js
 * --------------------------------------------------------------
 * Page orchestration: navbar, footer, scroll reveal, toasts,
 * and per-page renderers (hero, about, skills, projects,
 * experience, resume, contact).
 *
 * Each renderer is a small pure function that takes a root
 * element + data and writes HTML. They are dispatched from
 * data-page on the <body> tag, so adding a new page is just:
 *   1. Add a <body data-page="my-page">.
 *   2. Add a renderer in `pageRenderers`.
 * --------------------------------------------------------------
 */

(function () {
  'use strict';

  const App = {};

  /* -----------------------------
     Utilities
     ----------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (v === false || v == null) return;
      if (k === 'class') node.className = v;
      else if (k === 'html') node.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function') {
        node.addEventListener(k.slice(2).toLowerCase(), v);
      } else {
        node.setAttribute(k, v);
      }
    });
    (Array.isArray(children) ? children : [children]).forEach((c) => {
      if (c == null || c === false) return;
      node.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return node;
  }

  /* -----------------------------
     Toasts
     ----------------------------- */
  function ensureToastStack() {
    let stack = $('.toast-stack');
    if (!stack) {
      stack = el('div', { class: 'toast-stack', 'aria-live': 'polite' });
      document.body.appendChild(stack);
    }
    return stack;
  }

  function toast(message, { variant = 'success', duration = 3200 } = {}) {
    const stack = ensureToastStack();
    const node = el('div', {
      class: `toast toast--${variant}`,
      role: 'status',
    }, [el('span', { class: 'toast__dot' }), document.createTextNode(message)]);
    stack.appendChild(node);
    requestAnimationFrame(() => node.classList.add('is-visible'));
    setTimeout(() => {
      node.classList.remove('is-visible');
      setTimeout(() => node.remove(), 300);
    }, duration);
  }

  App.toast = toast;

  /* -----------------------------
     Navbar
     ----------------------------- */
  const NAV_LINKS = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'projects.html', label: 'Projects' },
    { href: 'experience.html', label: 'Experience' },
    { href: 'resume.html', label: 'Resume' },
    { href: 'contact.html', label: 'Contact' },
  ];

  function currentPageFile() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    return path === '' ? 'index.html' : path;
  }

  function renderNavbar(profile) {
    const root = $('[data-component="navbar"]');
    if (!root) return;

    const brand = profile?.brand || { name: 'PortfolioApplication', status: 'RUNNING' };
    const here = currentPageFile();

    const linksList = el('ul', {
      class: 'nav__links',
      id: 'nav-links',
      role: 'menu',
    }, NAV_LINKS.map((l) =>
      el('li', { role: 'none' }, [
        el('a', {
          href: l.href,
          class: `nav__link${l.href === here ? ' is-active' : ''}`,
          role: 'menuitem',
          'aria-current': l.href === here ? 'page' : false,
        }, l.label),
      ]),
    ));

    // CTA inside the mobile menu so it's reachable on small screens.
    linksList.appendChild(el('a', {
      href: 'contact.html',
      class: 'btn btn--accent btn--mono nav__cta',
      'aria-label': 'Open contact page to start a conversation',
    }, 'Work Together'));

    const toggle = el('button', {
      class: 'nav__toggle',
      type: 'button',
      'aria-label': 'Toggle navigation',
      'aria-expanded': 'false',
      'aria-controls': 'nav-links',
    }, [
      // Hamburger icon as SVG
    ]);
    toggle.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="4" y1="7" x2="20" y2="7"></line>
        <line x1="4" y1="12" x2="20" y2="12"></line>
        <line x1="4" y1="17" x2="20" y2="17"></line>
      </svg>`;

    toggle.addEventListener('click', () => {
      const isOpen = linksList.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    const brandLink = el('a', {
      href: 'index.html',
      class: 'nav__brand',
      'aria-label': `${brand.name} home`,
      'data-easter': 'logo',
    }, [
      el('span', { class: 'nav__brand-mark', 'aria-hidden': 'true' }, 'PA'),
      el('span', { class: 'nav__brand-text' }, [
        el('span', { class: 'nav__brand-name' }, brand.name),
        el('span', { class: 'nav__brand-status' }, `Status: ${brand.status}`),
      ]),
    ]);

    const inner = el('div', { class: 'container nav__inner' }, [
      brandLink,
      linksList,
      toggle,
    ]);

    root.innerHTML = '';
    root.appendChild(inner);

    // Close mobile menu when clicking a link.
    $$('.nav__link', root).forEach((a) =>
      a.addEventListener('click', () => {
        linksList.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }),
    );
  }

  /* -----------------------------
     Footer
     ----------------------------- */
  function renderFooter(profile) {
    const root = $('[data-component="footer"]');
    if (!root) return;

    const lines = profile?.footer_status_lines?.length
      ? profile.footer_status_lines
      : ['200 OK — Online'];
    const year = new Date().getFullYear();

    const statusEl = el('span', { class: 'footer__status-text' }, lines[0]);
    const status = el('span', { class: 'footer__status', 'aria-live': 'polite' }, statusEl);

    const meta = el('div', { class: 'footer__meta' }, [
      el('span', {}, `© ${year} PortfolioApplication. Precision-built with Java thinking & modern tooling.`),
      el('span', { class: 'footer__hint' }, 'Try Shift + J ·'),
      el('a', {
        href: 'actuator-me.html',
        class: 'footer__terminal-link',
        'aria-label': 'Open actuator endpoint',
        'data-tooltip': 'Some endpoints are public.',
      }, [
        // terminal icon
      ]),
    ]);

    // Inject terminal icon into the link
    const terminalLink = $('.footer__terminal-link', meta);
    if (terminalLink) {
      terminalLink.innerHTML += `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" y1="19" x2="20" y2="19"></line>
        </svg>
        /actuator-me`;
    }

    const inner = el('div', { class: 'container footer__inner' }, [status, meta]);
    root.innerHTML = '';
    root.appendChild(inner);

    // Rotate status lines.
    let i = 0;
    setInterval(() => {
      i = (i + 1) % lines.length;
      statusEl.style.opacity = '0';
      setTimeout(() => {
        statusEl.textContent = lines[i];
        statusEl.style.opacity = '1';
      }, 220);
    }, 4200);
  }

  /* -----------------------------
     Scroll reveal
     ----------------------------- */
  function setupReveal() {
    if (!('IntersectionObserver' in window)) {
      $$('.reveal').forEach((n) => n.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    $$('.reveal').forEach((n) => io.observe(n));
  }

  /* -----------------------------
     Loading screen (boot)
     ----------------------------- */
  const BOOT_KEY = 'pa.booted.v1';

  function maybeShowBoot() {
    // First-visit only: persisted in localStorage so it shows once
    // per browser, not once per tab. Wrapped in try/catch in case
    // storage is disabled (private mode in some browsers).
    try {
      if (localStorage.getItem(BOOT_KEY) === '1') return;
    } catch (_) {
      return;
    }
    if (!document.body.dataset.boot) return; // Only show on pages that opt in.

    const lines = [
      { html: '<span class="info">::</span> Starting <span>PortfolioApplication</span> v3.2.1', delay: 0 },
      { html: '<span class="dim">--</span> Loading runtime <span class="dim">java 17 · spring-boot 3.x</span>', delay: 280 },
      { html: '<span class="dim">--</span> Tomcat started on port <span class="info">8080</span>', delay: 600 },
      { html: '<span class="ok">::</span> Started <span>Application</span> in <span class="info">2.1</span> seconds', delay: 950 },
    ];

    const panel = el('div', { class: 'boot__panel' });
    lines.forEach(() => panel.appendChild(el('div', { class: 'boot__line' })));
    const boot = el('div', { class: 'boot', role: 'status', 'aria-live': 'polite' }, panel);
    document.body.appendChild(boot);

    const lineNodes = $$('.boot__line', panel);
    lines.forEach((l, i) => {
      setTimeout(() => {
        lineNodes[i].innerHTML = l.html;
        lineNodes[i].classList.add('is-shown');
      }, l.delay);
    });

    setTimeout(() => {
      boot.classList.add('is-hidden');
      try { localStorage.setItem(BOOT_KEY, '1'); } catch (_) { /* no-op */ }
      setTimeout(() => boot.remove(), 700);
    }, 1600);
  }

  /* -----------------------------
     Page renderers
     ----------------------------- */
  const pageRenderers = {
    home: renderHome,
    about: renderAbout,
    projects: renderProjects,
    experience: renderExperience,
    resume: renderResume,
    contact: renderContact,
  };

  function renderHome(data) {
    const { profile } = data;
    if (!profile) return;

    const nameEl = $('[data-bind="hero.name"]');
    const roleEl = $('[data-bind="hero.role"]');
    const subEl = $('[data-bind="hero.headline"]');
    const statusBody = $('[data-bind="hero.status"]');

    if (nameEl) nameEl.textContent = profile.person.name;
    if (roleEl) roleEl.textContent = profile.person.role;
    if (subEl) subEl.textContent = profile.person.headline;

    if (statusBody) {
      statusBody.innerHTML = '';
      profile.system_status.forEach((row) => {
        const isCritical = /critical/i.test(row.value);
        const node = el('div', {
          class: 'status-row',
          'data-state': isCritical ? 'warn' : 'ok',
        }, [
          el('span', { class: 'status-row__label' }, row.label),
          el('span', { class: 'status-row__value' }, row.value),
        ]);
        statusBody.appendChild(node);
      });
    }
  }

  function renderAbout(data) {
    const { profile } = data;
    if (!profile) return;

    const summary = $('[data-bind="about.summary"]');
    if (summary) summary.textContent = profile.person.summary;

    const grid = $('[data-bind="about.strengths"]');
    if (grid) {
      grid.innerHTML = '';
      profile.strengths.forEach((s) => {
        const card = el('article', { class: 'card reveal' }, [
          el('h3', { class: 'card__title' }, s.title),
          el('p', { class: 'card__desc' }, s.desc),
        ]);
        grid.appendChild(card);
      });
    }
  }

  function renderSkills(skills) {
    const grid = $('[data-bind="skills.grid"]');
    if (!grid || !skills) return;
    grid.innerHTML = '';
    skills.categories.forEach((cat) => {
      const tags = el('ul', { class: 'skill-tags' },
        cat.items.map((item) => el('li', { class: 'skill-tag' }, item)),
      );
      const block = el('div', { class: 'skill-group reveal' }, [
        el('h3', { class: 'skill-group__title' }, cat.name),
        tags,
      ]);
      grid.appendChild(block);
    });
  }

  function renderProjects(data) {
    const { projects } = data;
    const grid = $('[data-bind="projects.grid"]');
    if (!grid || !projects) return;
    grid.innerHTML = '';

    projects.projects.forEach((p) => {
      const stack = el('ul', { class: 'project-card__stack', 'aria-label': 'Tech stack' },
        p.stack.map((s) => el('li', {}, s)),
      );
      const highlights = el('ul', { class: 'project-card__highlights' },
        (p.highlights || []).map((h) => el('li', {}, h)),
      );
      const actions = el('div', { class: 'project-card__actions' }, [
        p.details_url
          ? el('a', { class: 'btn btn--ghost btn--sm btn--mono', href: p.details_url }, 'View Details')
          : el('button', {
              class: 'btn btn--ghost btn--sm btn--mono',
              type: 'button',
              onclick: () => toast(`Details for ${p.name} coming soon.`, { variant: 'info' }),
            }, 'View Details'),
        el('a', {
          class: 'btn btn--primary btn--sm btn--mono',
          href: p.github,
          target: '_blank',
          rel: 'noopener noreferrer',
        }, 'GitHub Repository'),
      ]);

      const card = el('article', { class: 'card project-card reveal' }, [
        el('div', { class: 'project-card__head' }, [
          el('h3', { class: 'project-card__name' }, p.name),
          el('span', { class: 'project-card__status' }, p.status || 'STABLE'),
        ]),
        el('p', { class: 'project-card__tagline' }, p.tagline),
        stack,
        p.description ? el('p', { class: 'card__desc' }, p.description) : null,
        highlights,
        actions,
      ]);
      grid.appendChild(card);
    });
  }

  function renderExperience(data) {
    const { experience } = data;
    const root = $('[data-bind="experience.timeline"]');
    if (!root || !experience) return;
    root.innerHTML = '';

    experience.timeline.forEach((entry) => {
      const item = el('article', {
        class: 'timeline__item reveal',
        'data-status': entry.status || 'RELEASED',
      }, [
        el('span', { class: 'timeline__dot', 'aria-hidden': 'true' }),
        el('div', { class: 'timeline__head' }, [
          el('span', { class: 'timeline__version' }, entry.version),
          el('h3', { class: 'timeline__title' }, entry.title),
          el('span', { class: 'timeline__company' }, `· ${entry.company}`),
          el('span', { class: 'timeline__duration' }, entry.duration),
        ]),
        el('ul', { class: 'timeline__achievements' },
          entry.achievements.map((a) => el('li', {}, a)),
        ),
        entry.impact ? el('p', { class: 'timeline__impact' }, entry.impact) : null,
      ]);
      root.appendChild(item);
    });
  }

  function renderResume(data) {
    const { profile } = data;
    if (!profile) return;

    const link = $('[data-bind="resume.link"]');
    if (link && profile.resume?.file) link.setAttribute('href', profile.resume.file);

    const snapshot = $('[data-bind="resume.snapshot"]');
    if (snapshot) snapshot.textContent = profile.resume.experience_snapshot;

    const domains = $('[data-bind="resume.domains"]');
    if (domains) {
      domains.innerHTML = '';
      profile.resume.domains.forEach((d) =>
        domains.appendChild(el('li', { class: 'skill-tag' }, d)),
      );
    }

    const systems = $('[data-bind="resume.systems"]');
    if (systems) {
      systems.innerHTML = '';
      profile.resume.systems.forEach((s) =>
        systems.appendChild(el('li', {}, s)),
      );
    }
  }

  function renderContact(data) {
    const { profile } = data;
    if (!profile) return;

    const linkedin = $('[data-bind="contact.linkedin"]');
    const github = $('[data-bind="contact.github"]');
    const email = $('[data-bind="contact.email"]');
    if (linkedin) linkedin.href = profile.person.links.linkedin;
    if (github) github.href = profile.person.links.github;
    if (email) email.href = profile.person.links.email;

    const form = $('[data-form="contact"]');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fields = ['name', 'email', 'message'];
      let ok = true;
      fields.forEach((f) => {
        const wrap = form.querySelector(`[data-field="${f}"]`);
        const input = wrap?.querySelector('input,textarea');
        if (!input) return;
        const valid = input.checkValidity() && input.value.trim().length > 0;
        wrap.classList.toggle('has-error', !valid);
        if (!valid) ok = false;
      });
      if (!ok) return;

      // Frontend-only behavior; no real backend.
      toast('Request Accepted Successfully', { variant: 'success' });
      form.reset();
    });
  }

  /* -----------------------------
     Bootstrap
     ----------------------------- */
  async function bootstrap() {
    maybeShowBoot();

    const page = document.body.dataset.page;

    // Always load profile + skills (used by navbar/footer/multiple pages).
    const data = await DataLoader.loadMany(['profile', 'skills']);

    renderNavbar(data.profile);
    renderFooter(data.profile);
    renderSkills(data.skills);

    // Page-specific data needs.
    if (page === 'projects') {
      data.projects = await DataLoader.load('projects');
    } else if (page === 'experience') {
      data.experience = await DataLoader.load('experience');
    }

    const renderer = pageRenderers[page];
    if (typeof renderer === 'function') {
      renderer(data);
    }

    setupReveal();
  }

  document.addEventListener('DOMContentLoaded', bootstrap);

  window.PortfolioApp = App;
})();
