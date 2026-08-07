// AgriMonitor — Contact Us page interactions

document.addEventListener('DOMContentLoaded', () => {

  // ---- Contact form validation ----
  const form = document.getElementById('contactForm');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const setError = (groupEl, hasError) => {
    if (!groupEl) return;
    groupEl.classList.toggle('has-error', hasError);
  };

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const name = document.getElementById('contactName');
      const email = document.getElementById('contactEmail');
      const message = document.getElementById('contactMessage');

      const nameValid = name.value.trim().length > 0;
      setError(document.getElementById('contactNameGroup'), !nameValid);
      if (!nameValid) valid = false;

      const emailValid = emailPattern.test(email.value.trim());
      setError(document.getElementById('contactEmailGroup'), !emailValid);
      if (!emailValid) valid = false;

      const messageValid = message.value.trim().length > 0;
      setError(document.getElementById('contactMessageGroup'), !messageValid);
      if (!messageValid) valid = false;

      if (!valid) return;

      // TODO: replace with a real form submission / API call
      const successBox = document.getElementById('contactSuccess');
      successBox.classList.add('show');
      form.reset();

      setTimeout(() => {
        successBox.classList.remove('show');
      }, 5000);
    });
  }

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-question').forEach(btn => {
    const answer = btn.nextElementSibling;

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // close all others
      document.querySelectorAll('.faq-question').forEach(other => {
        if (other !== btn) {
          other.setAttribute('aria-expanded', 'false');
          other.nextElementSibling.style.maxHeight = null;
        }
      });

      btn.setAttribute('aria-expanded', String(!isOpen));
      answer.style.maxHeight = isOpen ? null : `${answer.scrollHeight}px`;
    });
  });

});