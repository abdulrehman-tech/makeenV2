// Language switching (same as register/login)
const languageButtons = document.querySelectorAll(".lang-btn");
let currentLang = localStorage.getItem("site-lang") || "en";

function switchLanguage(lang) {
  currentLang = lang;

  // Update body direction
  if (lang === "ar") {
    document.body.setAttribute("dir", "rtl");
  } else {
    document.body.removeAttribute("dir");
  }

  // Update button states
  languageButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.lang === lang) {
      btn.classList.add("active");
    }
  });

  // Toggle text content
  const textElements = {
    ".back-text-en": ".back-text-ar",
    ".tagline-en": ".tagline-ar",
    ".title-en": ".title-ar",
    ".subtitle-en": ".subtitle-ar",
    ".otp-label-en": ".otp-label-ar",
    ".verify-btn-en": ".verify-btn-ar",
    ".copyright-en": ".copyright-ar",
  };

  Object.keys(textElements).forEach((enClass) => {
    const arClass = textElements[enClass];
    const enElement = document.querySelector(enClass);
    const arElement = document.querySelector(arClass);
    if (enElement && arElement) {
      if (lang === "ar") {
        enElement.style.display = "none";
        arElement.style.display = "inline";
      } else {
        enElement.style.display = "inline";
        arElement.style.display = "none";
      }
    }
  });

  // Apply font changes like in makeen-translations.js
  applyLanguageStyles(lang);

  // Save language preference
  localStorage.setItem("site-lang", lang);
}

function applyLanguageStyles(lang) {
  const html = document.documentElement;
  const body = document.body;
  if (lang === 'ar') {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
    body.classList.add('rtl-lang');
    body.classList.add('arabic-font');
    if (!document.getElementById('tajawal-fallback')) {
      const link = document.createElement('link');
      link.id = 'tajawal-fallback';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap';
      document.head.appendChild(link);
    }
    body.style.fontFamily = '"Tajawal", Arial, sans-serif';
    html.style.fontFamily = '"Tajawal", Arial, sans-serif';
    document.documentElement.style.setProperty('--eduact-font', '"Tajawal", Arial, sans-serif');
    document.documentElement.style.setProperty('--heading-font', '"Tajawal", Arial, sans-serif');
    setTimeout(function() {
      body.style.display = 'none';
      body.offsetHeight;
      body.style.display = '';
    }, 100);
  } else {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
    body.classList.remove('rtl-lang');
    body.classList.remove('arabic-font');
    body.style.fontFamily = '"Poppins", sans-serif';
    html.style.fontFamily = '"Poppins", sans-serif';
    document.documentElement.style.setProperty('--eduact-font', '"Poppins", sans-serif');
    document.documentElement.style.setProperty('--heading-font', '"Poppins", sans-serif');
  }
}

languageButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    const lang = this.dataset.lang;
    switchLanguage(lang);
  });
});

const savedLang = localStorage.getItem("site-lang");
if (savedLang && savedLang !== "en") {
  switchLanguage(savedLang);
}

// OTP input auto-focus and navigation
const otpInputs = document.querySelectorAll('.otp-input');
otpInputs.forEach((input, idx) => {
  input.addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
    if (this.value && idx < otpInputs.length - 1) {
      otpInputs[idx + 1].focus();
    }
  });
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Backspace' && !this.value && idx > 0) {
      otpInputs[idx - 1].focus();
    }
    if (e.key === 'ArrowLeft' && idx > 0) {
      otpInputs[idx - 1].focus();
    }
    if (e.key === 'ArrowRight' && idx < otpInputs.length - 1) {
      otpInputs[idx + 1].focus();
    }
  });
});
otpInputs[0].focus();

// Timer countdown
let timer = 119; // 1:59 in seconds
const timerEl = document.getElementById('otp-timer');
function updateTimer() {
  const min = Math.floor(timer / 60);
  const sec = timer % 60;
  timerEl.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
  if (timer > 0) {
    timer--;
    setTimeout(updateTimer, 1000);
  } else {
    timerEl.textContent = '0:00';
    // Optionally, enable resend link or show message
  }
}
updateTimer();

// Prevent form submit (demo)
document.getElementById('otpForm').addEventListener('submit', function(e) {
  e.preventDefault();
  // Collect OTP value
  const otp = Array.from(otpInputs).map(input => input.value).join('');
  if (otp.length === 6) {
    window.location.href = 'verify-email.html';
  } else {
    alert('Please enter the 6-digit code.');
  }
});

// Resend OTP (demo)
document.querySelector('.otp-resend-link').addEventListener('click', function(e) {
  e.preventDefault();
  if (timer === 0) {
    timer = 119;
    updateTimer();
    alert('OTP resent!');
  }
}); 