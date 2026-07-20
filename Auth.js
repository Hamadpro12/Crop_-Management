// AgriMonitor — Login / Register form logic
// Note: There is no backend wired up yet. On successful client-side validation,
// forms show a success message. Replace the setTimeout blocks with real API calls.

document.addEventListener('DOMContentLoaded', () => {

  // ---- Password show/hide toggles ----
  document.querySelectorAll('.password-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.toggleFor);
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
      btn.classList.toggle('is-visible', isPassword);
    });
  });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[+]?[\d\s().-]{7,15}$/;

  const setError = (groupEl, hasError) => {
    if (!groupEl) return;
    groupEl.classList.toggle('has-error', hasError);
  };

  // ---- LOGIN FORM ----
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const email = document.getElementById('loginEmail');
      const password = document.getElementById('loginPassword');

      const emailValid = emailPattern.test(email.value.trim());
      setError(document.getElementById('loginEmailGroup'), !emailValid);
      if (!emailValid) valid = false;

      const passValid = password.value.length >= 6;
      setError(document.getElementById('loginPasswordGroup'), !passValid);
      if (!passValid) valid = false;

      if (!valid) return;

      // TODO: replace with a real authentication API call
      const successBox = document.getElementById('loginSuccess');
      successBox.classList.add('show');
      loginForm.querySelectorAll('input, button').forEach(el => el.disabled = true);

      setTimeout(() => {
        // window.location.href = 'dashboard.html';
        successBox.textContent = "You're all set — connect this form to your backend to continue.";
      }, 1400);
    });
  }

  // ---- REGISTER FORM ----
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const firstName = document.getElementById('firstName');
      const lastName = document.getElementById('lastName');
      const email = document.getElementById('registerEmail');
      const phone = document.getElementById('phone');
      const farmType = document.getElementById('farmType');
      const password = document.getElementById('registerPassword');
      const confirmPassword = document.getElementById('confirmPassword');
      const terms = registerForm.querySelector('input[name="terms"]');

      const firstValid = firstName.value.trim().length > 0;
      setError(document.getElementById('firstNameGroup'), !firstValid);
      if (!firstValid) valid = false;

      const lastValid = lastName.value.trim().length > 0;
      setError(document.getElementById('lastNameGroup'), !lastValid);
      if (!lastValid) valid = false;

      const emailValid = emailPattern.test(email.value.trim());
      setError(document.getElementById('registerEmailGroup'), !emailValid);
      if (!emailValid) valid = false;

      const phoneValid = phonePattern.test(phone.value.trim());
      setError(document.getElementById('phoneGroup'), !phoneValid);
      if (!phoneValid) valid = false;

      const farmTypeValid = farmType.value !== '';
      setError(document.getElementById('farmTypeGroup'), !farmTypeValid);
      if (!farmTypeValid) valid = false;

      const passValid = password.value.length >= 6;
      setError(document.getElementById('registerPasswordGroup'), !passValid);
      if (!passValid) valid = false;

      const confirmValid = passValid && confirmPassword.value === password.value;
      setError(document.getElementById('confirmPasswordGroup'), !confirmValid);
      if (!confirmValid) valid = false;

      if (!terms.checked) {
        valid = false;
        terms.closest('.form-meta-row').style.outline = '1px solid #b3261e';
        terms.closest('.form-meta-row').style.borderRadius = '8px';
      } else {
        terms.closest('.form-meta-row').style.outline = 'none';
      }

      if (!valid) return;

      // TODO: replace with a real registration API call
      const successBox = document.getElementById('registerSuccess');
      successBox.classList.add('show');
      registerForm.querySelectorAll('input, select, button').forEach(el => el.disabled = true);

      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1600);
    });
  }
});
