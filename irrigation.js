// AgriMonitor — Irrigation page interactions

document.addEventListener('DOMContentLoaded', () => {

  const track = document.getElementById('irrFeatureTrack');
  const btnLeft = document.getElementById('irrScrollLeft');
  const btnRight = document.getElementById('irrScrollRight');

  if (track && btnLeft && btnRight) {
    btnRight.addEventListener('click', () => {
      track.scrollBy({ left: 260, behavior: 'smooth' });
    });
    btnLeft.addEventListener('click', () => {
      track.scrollBy({ left: -260, behavior: 'smooth' });
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

});