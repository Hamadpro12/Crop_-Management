// AgriMonitor — About Us interactions

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('mainNav');
  const header = document.getElementById('siteHeader');
  const scrollBtn = document.getElementById('scrollBtn');
  const scrollBtnLeft = document.getElementById('scrollBtnLeft');
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

  // Feature strip: left/right arrow scroll buttons
  if (scrollBtn && scrollBtnLeft && featureTrack) {
    scrollBtn.addEventListener('click', () => {
      featureTrack.scrollBy({ left: 220, behavior: 'smooth' });
    });
    scrollBtnLeft.addEventListener('click', () => {
      featureTrack.scrollBy({ left: -220, behavior: 'smooth' });
    });

    const updateScrollBtnVisibility = () => {
      const maxScroll = featureTrack.scrollWidth - featureTrack.clientWidth;
      const atStart = featureTrack.scrollLeft <= 8;
      const atEnd = featureTrack.scrollLeft >= maxScroll - 8;
      const hasOverflow = maxScroll > 8;

      scrollBtnLeft.disabled = !hasOverflow || atStart;
      scrollBtn.disabled = !hasOverflow || atEnd;
    };

    featureTrack.addEventListener('scroll', updateScrollBtnVisibility, { passive: true });
    window.addEventListener('resize', updateScrollBtnVisibility);

    // Run once immediately, then again after layout/fonts/images settle
    // (scrollWidth can be measured incorrectly on the very first paint,
    // which previously left the arrow permanently hidden).
    updateScrollBtnVisibility();
    window.addEventListener('load', updateScrollBtnVisibility);
    requestAnimationFrame(updateScrollBtnVisibility);
    setTimeout(updateScrollBtnVisibility, 300);
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
