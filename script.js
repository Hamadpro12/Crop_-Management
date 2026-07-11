// AgriMonitor — About Us interactions

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  const header = document.getElementById('siteHeader');
  const scrollBtn = document.getElementById('scrollBtn');
  const featureTrack = document.getElementById('featureTrack');

  // Mobile nav toggle
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close nav when a link is clicked (mobile)
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Header shadow on scroll
  const applyHeaderShadow = () => {
    if (window.scrollY > 8) {
      header.style.boxShadow = '0 4px 18px rgba(0,0,0,0.08)';
    } else {
      header.style.boxShadow = 'none';
    }
  };
  applyHeaderShadow();
  window.addEventListener('scroll', applyHeaderShadow, { passive: true });

  // Feature strip: right-arrow scroll button (mobile)
  if (scrollBtn && featureTrack) {
    scrollBtn.addEventListener('click', () => {
      featureTrack.scrollBy({ left: 190, behavior: 'smooth' });
    });

    const updateScrollBtnVisibility = () => {
      const atEnd = featureTrack.scrollLeft + featureTrack.clientWidth >= featureTrack.scrollWidth - 8;
      scrollBtn.style.opacity = atEnd ? '0' : '1';
      scrollBtn.style.pointerEvents = atEnd ? 'none' : 'auto';
    };
    featureTrack.addEventListener('scroll', updateScrollBtnVisibility, { passive: true });
    window.addEventListener('resize', updateScrollBtnVisibility);
    updateScrollBtnVisibility();
  }

  // Active nav link highlight based on scroll position
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');
  if (sections.length && navLinks.length) {
    const onScrollSpy = () => {
      let currentId = '';
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 120) {
          currentId = section.id;
        }
      });
      if (currentId) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
        });
      }
    };
    window.addEventListener('scroll', onScrollSpy, { passive: true });
  }
});
