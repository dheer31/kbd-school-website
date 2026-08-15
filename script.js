// ===== NAVBAR SCROLL & ACTIVE =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const tickerBar = document.getElementById('ticker-bar');

let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Navbar scroll class
  if (scrollY > 80) {
    navbar.classList.add('scrolled');
    if (scrollY > lastScrollY) {
      tickerBar.style.transform = 'translateY(-100%)';
    } else {
      tickerBar.style.transform = 'translateY(0)';
    }
  } else {
    navbar.classList.remove('scrolled');
    tickerBar.style.transform = 'translateY(0)';
  }
  lastScrollY = scrollY;

  // Active nav link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 140;
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });

  // Back to top
  const btn = document.getElementById('back-to-top');
  if (scrollY > 400) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }

  // Reveal on scroll
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('visible');
    }
  });
});

// Apply reveal classes to elements
document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = [
    '.about-grid',
    '.subject-card',
    '.facility-card',
    '.step',
    '.faculty-card',
    '.gallery-item',
    '.news-card',
    '.contact-card',
    '.quick-item',
    '.value-card',
    '.principal-card',
    '.admission-form-card',
    '.admission-eligibility',
    '.admission-steps',
    '.section-header'
  ];

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.07}s`;
    });
  });

  // Trigger once on load
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
  }, 100);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const start = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

const counters = document.querySelectorAll('.stat-number');
let countersStarted = false;

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersStarted) {
      countersStarted = true;
      counters.forEach(counter => animateCounter(counter));
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// ===== ACADEMICS TABS =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-tab');
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(`tab-content-${target}`).classList.add('active');
  });
});

// ===== GALLERY FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        item.style.display = 'block';
        item.style.animation = 'fade-up 0.4s ease forwards';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const lightboxClose = document.getElementById('lightbox-close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    if (img) {
      lightboxContent.innerHTML = `<img src="${img.src}" alt="${img.alt}" />`;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  lightboxContent.innerHTML = '';
}

// ===== ADMISSION FORM =====
const admissionForm = document.getElementById('admission-form');
const formSuccess = document.getElementById('form-success');

admissionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = admissionForm.querySelector('button[type="submit"]');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
  btn.disabled = true;

  setTimeout(() => {
    admissionForm.classList.add('hidden');
    formSuccess.classList.remove('hidden');
  }, 1800);
});

// ===== BACK TO TOP =====
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== SMOOTH ANCHOR SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 120;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== TICKER PAUSE ON HOVER =====
const tickerContent = document.querySelector('.ticker-content');
if (tickerContent) {
  tickerContent.addEventListener('mouseenter', () => {
    tickerContent.style.animationPlayState = 'paused';
  });
  tickerContent.addEventListener('mouseleave', () => {
    tickerContent.style.animationPlayState = 'running';
  });
}

console.log('%c🏫 K.B.D. English Medium School Website Loaded!', 'color: #1a3d7c; font-size: 16px; font-weight: bold;');
