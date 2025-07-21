
// Language switching functionality
const languageButtons = document.querySelectorAll(".lang-btn");
let currentLang = "en";

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
	".forgot-en": ".forgot-ar",
	".login-btn-en": ".login-btn-ar",
	".new-user-en": ".new-user-ar",
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
    
    // Load Google Fonts Tajawal as fallback
    if (!document.getElementById('tajawal-fallback')) {
      const link = document.createElement('link');
      link.id = 'tajawal-fallback';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap';
      document.head.appendChild(link);
    }
    
    // Force font update on body and html
    body.style.fontFamily = '"Tajawal", Arial, sans-serif';
    html.style.fontFamily = '"Tajawal", Arial, sans-serif';
    
    // Update CSS variables directly
    document.documentElement.style.setProperty('--eduact-font', '"Tajawal", Arial, sans-serif');
    document.documentElement.style.setProperty('--heading-font', '"Tajawal", Arial, sans-serif');
    
    // Force refresh of font rendering
    setTimeout(function() {
      // Trigger reflow
      body.style.display = 'none';
      body.offsetHeight; // trigger reflow
      body.style.display = '';
    }, 100);
    
  } else {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
    body.classList.remove('rtl-lang');
    body.classList.remove('arabic-font');
    
    // Reset to Urbanist font
    body.style.fontFamily = '"Urbanist", sans-serif';
    html.style.fontFamily = '"Urbanist", sans-serif';
    
    // Reset CSS variables to Urbanist font
    document.documentElement.style.setProperty('--eduact-font', '"Urbanist", sans-serif');
    document.documentElement.style.setProperty('--heading-font', '"Urbanist", sans-serif');
  }
}

// Add click event listeners to language buttons
languageButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
	const lang = this.dataset.lang;
	switchLanguage(lang);
  });
});

// Load saved language preference
const savedLang = localStorage.getItem("site-lang");
if (savedLang && savedLang !== "en") {
  switchLanguage(savedLang);
}

// Password toggle functionality
document
  .getElementById("passwordToggle")
  .addEventListener("click", function () {
	const passwordField = document.getElementById("password");
	const icon = this.querySelector("i");

	if (passwordField.type === "password") {
	  passwordField.type = "text";
	  icon.classList.remove("fa-eye-slash");
	  icon.classList.add("fa-eye");
	} else {
	  passwordField.type = "password";
	  icon.classList.remove("fa-eye");
	  icon.classList.add("fa-eye-slash");
	}
  });

// Form submission
document
  .getElementById("loginForm")
  .addEventListener("submit", function (e) {
	e.preventDefault();

	const email = this.querySelector('input[type="email"]').value;
	const password = this.querySelector('input[type="password"]').value;

	// Add your login logic here
	console.log("Login attempt:", { email, password });

	// For demo purposes, show success message
	const message =
	  currentLang === "ar"
		? "سيتم تنفيذ وظيفة تسجيل الدخول هنا"
		: "Login functionality will be implemented here";
	alert(message);
  });
