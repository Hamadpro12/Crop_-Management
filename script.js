/* ============================================
   Farmer Crop Monitoring System - Main JS
   Keep it simple: mobile nav toggle + basic
   client-side form validation for auth pages.
   ============================================ */

// ---------- Mobile nav toggle ----------
function initNavToggle() {
  const toggleBtn = document.getElementById("navToggle");
  const header = document.getElementById("siteHeader");

  if (!toggleBtn || !header) return;

  toggleBtn.addEventListener("click", () => {
    header.classList.toggle("open");
  });
}

// ---------- Helper: show/hide field error ----------
function setFieldError(inputEl, errorEl, message) {
  if (message) {
    errorEl.textContent = message;
    errorEl.style.display = "block";
    inputEl.style.borderColor = "#c0392b";
    return false;
  }
  errorEl.style.display = "none";
  inputEl.style.borderColor = "#dfe6e0";
  return true;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// ---------- Login form ----------
function initLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email");
    const password = document.getElementById("password");
    let valid = true;

    valid = setFieldError(
      email,
      document.getElementById("emailError"),
      email.value.trim() === "" || !isValidEmail(email.value)
        ? "Enter a valid email address"
        : ""
    ) && valid;

    valid = setFieldError(
      password,
      document.getElementById("passwordError"),
      password.value.trim() === "" ? "Password is required" : ""
    ) && valid;

    if (!valid) return;

    // TODO: replace with real API call to the backend auth service
    console.log("Login submitted:", { email: email.value });
    alert("Login successful! (demo only - connect this to your backend API)");
  });
}

// ---------- Farmer registration form ----------
function initRegisterForm() {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const terms = document.getElementById("terms");

    let valid = true;

    valid = setFieldError(
      fullName,
      document.getElementById("fullNameError"),
      fullName.value.trim() === "" ? "Full name is required" : ""
    ) && valid;

    valid = setFieldError(
      email,
      document.getElementById("emailError"),
      !isValidEmail(email.value) ? "Enter a valid email address" : ""
    ) && valid;

    valid = setFieldError(
      phone,
      document.getElementById("phoneError"),
      !/^\d{10}$/.test(phone.value.trim()) ? "Enter a valid 10-digit phone number" : ""
    ) && valid;

    valid = setFieldError(
      password,
      document.getElementById("passwordError"),
      password.value.length < 6 ? "Password must be at least 6 characters" : ""
    ) && valid;

    valid = setFieldError(
      confirmPassword,
      document.getElementById("confirmPasswordError"),
      confirmPassword.value !== password.value ? "Passwords do not match" : ""
    ) && valid;

    if (!terms.checked) {
      document.getElementById("termsError").style.display = "block";
      valid = false;
    } else {
      document.getElementById("termsError").style.display = "none";
    }

    if (!valid) return;

    // TODO: replace with real API call to the backend registration service
    console.log("Farmer registration submitted:", {
      fullName: fullName.value,
      email: email.value,
      phone: phone.value,
    });
    alert("Registration successful! (demo only - connect this to your backend API)");
  });
}

// ---------- Forgot password form ----------
function initForgotPasswordForm() {
  const form = document.getElementById("forgotForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email");
    const valid = setFieldError(
      email,
      document.getElementById("emailError"),
      !isValidEmail(email.value) ? "Enter a valid email address" : ""
    );

    if (!valid) return;

    // TODO: replace with real API call that triggers the reset email
    console.log("Password reset requested for:", email.value);

    document.getElementById("successMessage").style.display = "block";
    form.reset();
  });
}

// ---------- Init on page load ----------
document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initLoginForm();
  initRegisterForm();
  initForgotPasswordForm();
});