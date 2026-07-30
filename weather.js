// AgriMonitor — Weather page interactions

document.addEventListener('DOMContentLoaded', () => {

  // ---- Newsletter subscribe form ----
  const subscribeForm = document.getElementById('weatherSubscribeForm');
  const subscribeNote = document.getElementById('subscribeNote');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (subscribeForm && subscribeNote) {
    subscribeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('subscribeEmail');
      const value = input.value.trim();

      if (!emailPattern.test(value)) {
        subscribeNote.textContent = 'Please enter a valid email address.';
        subscribeNote.classList.add('is-error');
        input.focus();
        return;
      }

      subscribeNote.classList.remove('is-error');
      // TODO: replace with a real newsletter subscription API call
      subscribeNote.textContent = "You're subscribed — you'll now get weather alerts and farming tips.";
      subscribeForm.reset();
    });
  }

  // ---- Recommendation rows: keyboard support (Enter/Space) alongside click ----
  document.querySelectorAll('.recommend-row').forEach(row => {
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        row.classList.toggle('is-active');
      }
    });
    row.addEventListener('click', () => {
      row.classList.toggle('is-active');
    });
  });

});
