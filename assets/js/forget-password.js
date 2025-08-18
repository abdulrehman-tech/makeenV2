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
    ".reset-btn-en": ".reset-btn-ar",
    ".back-login-en": ".back-login-ar",
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

  // Update placeholders
  const inputs = document.querySelectorAll("input[data-placeholder-en]");
  inputs.forEach((input) => {
    if (lang === "ar") {
      input.placeholder = input.dataset.placeholderAr;
    } else {
      input.placeholder = input.dataset.placeholderEn;
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

// Form validation (demo)
document.getElementById('forgetForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = this.querySelector('input[type="email"]').value;
  if (!email) {
    alert(currentLang === 'ar' ? 'يرجى إدخال البريد الإلكتروني' : 'Please enter your email');
    return;
  }
  // If validation passes, redirect to reset link sent page
  window.location.href = 'reset-link-sent.html';
}); 