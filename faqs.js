// AgriMonitor — FAQs page interactions

document.addEventListener('DOMContentLoaded', () => {

  const items = Array.from(document.querySelectorAll('.faqs-item'));
  const searchInput = document.getElementById('faqSearch');
  const catPills = Array.from(document.querySelectorAll('.faqs-cat-pill'));
  const emptyState = document.getElementById('faqsEmpty');

  let activeCategory = 'all';

  const applyFilters = () => {
    const query = (searchInput ? searchInput.value : '').trim().toLowerCase();
    let visibleCount = 0;

    items.forEach(item => {
      const matchesCategory = activeCategory === 'all' || item.dataset.category === activeCategory;
      const matchesSearch = !query || item.dataset.question.includes(query);
      const show = matchesCategory && matchesSearch;
      item.classList.toggle('is-hidden', !show);
      if (show) visibleCount += 1;
    });

    if (emptyState) emptyState.classList.toggle('show', visibleCount === 0);
  };

  // ---- Search ----
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  // ---- Category pills ----
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      activeCategory = pill.dataset.category;
      applyFilters();
    });
  });

  // ---- Category horizontal scroll arrows ----
  const track = document.getElementById('faqCatTrack');
  const btnLeft = document.getElementById('faqScrollLeft');
  const btnRight = document.getElementById('faqScrollRight');

  if (track && btnLeft && btnRight) {
    btnRight.addEventListener('click', () => track.scrollBy({ left: 200, behavior: 'smooth' }));
    btnLeft.addEventListener('click', () => track.scrollBy({ left: -200, behavior: 'smooth' }));

    const updateButtons = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const atStart = track.scrollLeft <= 8;
      const atEnd = track.scrollLeft >= maxScroll - 8;
      const hasOverflow = maxScroll > 8;
      btnLeft.disabled = !hasOverflow || atStart;
      btnRight.disabled = !hasOverflow || atEnd;
    };

    track.addEventListener('scroll', updateButtons, { passive: true });
    window.addEventListener('resize', updateButtons);
    updateButtons();
    window.addEventListener('load', updateButtons);
    requestAnimationFrame(updateButtons);
    setTimeout(updateButtons, 300);
  }

  // ---- Accordion ----
  document.querySelectorAll('.faqs-question').forEach(btn => {
    const answer = btn.nextElementSibling;
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) answer.style.maxHeight = `${answer.scrollHeight}px`;

    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.faqs-question').forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.style.maxHeight = null;
        }
      });

      btn.setAttribute('aria-expanded', String(!open));
      answer.style.maxHeight = open ? null : `${answer.scrollHeight}px`;
    });
  });

});