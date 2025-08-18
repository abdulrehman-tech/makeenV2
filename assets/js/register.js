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
	".register-btn-en": ".register-btn-ar",
	".existing-user-en": ".existing-user-ar",
	".success-msg-en": ".success-msg-ar",
	".complete-profile-en": ".complete-profile-ar",
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
    
    // Reset to Poppins font
    body.style.fontFamily = '"Poppins", sans-serif';
    html.style.fontFamily = '"Poppins", sans-serif';
    
    // Reset CSS variables to Poppins font
    document.documentElement.style.setProperty('--eduact-font', '"Poppins", sans-serif');
    document.documentElement.style.setProperty('--heading-font', '"Poppins", sans-serif');
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

$(document).ready(function() {

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

  // Confirm password toggle functionality
  document
    .getElementById("confirmPasswordToggle")
    .addEventListener("click", function () {
	  const confirmPasswordField = document.getElementById("confirmPassword");
	  const icon = this.querySelector("i");

	  if (confirmPasswordField.type === "password") {
		confirmPasswordField.type = "text";
		icon.classList.remove("fa-eye-slash");
		icon.classList.add("fa-eye");
	  } else {
		confirmPasswordField.type = "password";
		icon.classList.remove("fa-eye");
		icon.classList.add("fa-eye-slash");
	  }
	});

  // Form submission
  document
    .getElementById("registerForm")
    .addEventListener("submit", function (e) {
	  e.preventDefault();

	  const civilId = document.querySelector('input[placeholder*="Civil ID"], input[placeholder*="الهوية المدنية"]').value;
	  const idExpiryDate = document.querySelector('input[type="date"]').value;
	  const phoneNo = document.querySelector('input[placeholder*="Phone"], input[placeholder*="الهاتف"]').value;
	  const email = document.querySelector('input[type="email"]').value;
	  const password = document.getElementById("password").value;
	  const confirmPassword = document.getElementById("confirmPassword").value;

	  // Basic validation
	  let isValid = true;
	  let errorMessage = '';

	  if (!civilId) {
		errorMessage = currentLang === "ar" ? "الهوية المدنية مطلوبة" : "Civil ID is required";
		isValid = false;
	  } else if (!idExpiryDate) {
		errorMessage = currentLang === "ar" ? "تاريخ انتهاء الهوية مطلوب" : "ID Expiry Date is required";
		isValid = false;
	  } else if (!phoneNo) {
		errorMessage = currentLang === "ar" ? "رقم الهاتف مطلوب" : "Phone number is required";
		isValid = false;
	  } else if (!email) {
		errorMessage = currentLang === "ar" ? "البريد الإلكتروني مطلوب" : "Email is required";
		isValid = false;
	  } else if (!password) {
		errorMessage = currentLang === "ar" ? "كلمة المرور مطلوبة" : "Password is required";
		isValid = false;
	  } else if (password.length < 6) {
		errorMessage = currentLang === "ar" ? "كلمة المرور يجب أن تكون 6 أحرف على الأقل" : "Password must be at least 6 characters long";
		isValid = false;
	  } else if (password !== confirmPassword) {
		errorMessage = currentLang === "ar" ? "كلمات المرور غير متطابقة" : "Passwords do not match";
		isValid = false;
	  }

	  if (!isValid) {
		alert(errorMessage);
		return false;
	  }

	  // If validation passes, show success message and profile completion link
	  const form = document.getElementById("registerForm");
	  const successDiv = document.querySelector(".register-success");
	  
	  // Hide the form
	  form.style.display = "none";
	  
	  // Show success message
	  successDiv.style.display = "block";
	  
	  // Update language for success message
	  if (currentLang === "ar") {
		document.querySelector(".success-msg-en").style.display = "none";
		document.querySelector(".success-msg-ar").style.display = "inline";
		document.querySelector(".complete-profile-en").style.display = "none";
		document.querySelector(".complete-profile-ar").style.display = "inline";
	  } else {
		document.querySelector(".success-msg-en").style.display = "inline";
		document.querySelector(".success-msg-ar").style.display = "none";
		document.querySelector(".complete-profile-en").style.display = "inline";
		document.querySelector(".complete-profile-ar").style.display = "none";
	  }
  });

  // Civil ID validation (numbers only)
  document.querySelector('input[placeholder*="Civil ID"], input[placeholder*="الهوية المدنية"]').addEventListener('input', function() {
	this.value = this.value.replace(/[^0-9]/g, '');
  });

  // Phone number validation (numbers and + only)
  document.querySelector('input[placeholder*="Phone"], input[placeholder*="الهاتف"]').addEventListener('input', function() {
	this.value = this.value.replace(/[^0-9+]/g, '');
  });
}); 