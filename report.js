// AgriMonitor — Report page interactions

document.addEventListener('DOMContentLoaded', () => {

  const track = document.getElementById('rptCatTrack');
  const btnLeft = document.getElementById('rptScrollLeft');
  const btnRight = document.getElementById('rptScrollRight');

  if (track && btnLeft && btnRight) {
    btnRight.addEventListener('click', () => {
      track.scrollBy({ left: 240, behavior: 'smooth' });
    });
    btnLeft.addEventListener('click', () => {
      track.scrollBy({ left: -240, behavior: 'smooth' });
    });

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

  // ---- Download report buttons: placeholder feedback ----
  document.querySelectorAll('.rpt-download-list li').forEach(li => {
    li.style.cursor = 'pointer';
    li.addEventListener('click', () => {
      const label = li.textContent.trim();
      const original = li.style.opacity;
      li.style.opacity = '0.5';
      setTimeout(() => { li.style.opacity = original || '1'; }, 250);
      // TODO: wire up to a real report-generation/export endpoint
      console.log(`${label} requested`);
    });
  });

});