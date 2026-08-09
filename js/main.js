// HDI Generalvertretung Tim Haupt — main.js

document.addEventListener('DOMContentLoaded', () => {

  // ---- Sticky Header ----
  const header = document.getElementById('site-header');
  const isHome = document.body.classList.contains('page-home');

  const updateHeader = () => {
    if (!header) return;
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
      header.classList.remove('transparent');
    } else {
      header.classList.remove('scrolled');
      if (isHome) header.classList.add('transparent');
    }
  };

  if (isHome) header?.classList.add('transparent');
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ---- Mobile Nav Toggle ----
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close nav on link click
  nav?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ---- Active Nav Link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ---- Scroll To Top ----
  const scrollBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    scrollBtn?.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  scrollBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---- Fade-up Intersection Observer ----
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => io.observe(el));
  }

  // ---- Contact Form Submit ----
  const form = document.getElementById('contact-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Wird gesendet…';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = '✓ Nachricht gesendet!';
      btn.style.background = 'var(--green-dark)';
      form.reset();
    }, 1200);
  });

});
