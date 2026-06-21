function initTheme() {
  const stored = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const theme = stored ?? (prefersLight ? 'light' : 'dark');
  document.documentElement.dataset.theme = theme;
}

function toggleTheme() {
  const current = document.documentElement.dataset.theme;
  const next = current === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('theme', next);
}

function initMobileNav() {
  const burger = document.querySelector('.burger');
  const nav = document.getElementById('mobile-nav');
  if (!burger || !nav) return;

  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    nav.hidden = open;
    nav.classList.toggle('is-open', !open);
    document.body.style.overflow = open ? '' : 'hidden';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      nav.hidden = true;
      nav.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}

function initHeaderActions() {
  document.querySelector('.theme-toggle')?.addEventListener('click', toggleTheme);
  initMobileNav();
}

initTheme();

document.addEventListener('components:loaded', initHeaderActions);

if (document.querySelector('.site-header')) {
  initHeaderActions();
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
