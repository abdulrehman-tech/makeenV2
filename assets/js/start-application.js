/**
 * Application Page JavaScript
 * Handles form interactions, user dropdown, and header scroll effects
 */

/**
 * Toggle the start button based on consent checkbox state
 */
function toggleStartButton() {
    const checkbox = document.getElementById('consentCheck');
    const startBtn = document.getElementById('startBtn');
    
    if (checkbox && startBtn) {
        startBtn.disabled = !checkbox.checked;
    }
}

/**
 * Handle start application button click
 */
function startApplication() {
    // Here you can add the logic to navigate to the actual application form
    alert('Application process will be implemented here. This will redirect to the detailed application form.');
    // For now, you could redirect to another page:
    // window.location.href = 'application-form.html';
}

/**
 * Toggle user profile dropdown menu
 */
function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    const trigger = document.querySelector('.user-profile-trigger');
    
    if (dropdown && trigger) {
        dropdown.classList.toggle('show');
        trigger.classList.toggle('active');
    }
}

/**
 * Handle header scroll effect
 */
function handleHeaderScroll() {
    const header = document.querySelector('.main-header');
    const scrollThreshold = 50;
    
    if (header) {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
}

/**
 * Handle mobile language switching
 */
function setupMobileLanguageSwitcher() {
    const mobileLanguageToggle = document.getElementById('mobile-language-toggle');
    
    if (mobileLanguageToggle) {
        mobileLanguageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Check if the global toggleLanguage function exists (from makeen-translations.js)
            if (typeof window.toggleLanguage === 'function') {
                window.toggleLanguage(e);
                
                // Update mobile language label
                setTimeout(function() {
                    const mobileCurrentLang = document.getElementById('mobile-current-language');
                    const mainCurrentLang = document.getElementById('current-language');
                    
                    if (mobileCurrentLang && mainCurrentLang) {
                        mobileCurrentLang.textContent = mainCurrentLang.textContent;
                    }
                }, 100);
            } else {
                console.warn('Language switching not available. Make sure makeen-translations.js is loaded.');
            }
            
            return false;
        });
    }
}

/**
 * Initialize application page functionality
 */
function initializeApplication() {
    // Set up initial state
    toggleStartButton();
    handleHeaderScroll();
    
    // Set up mobile language switcher
    setupMobileLanguageSwitcher();
    
    // Add event listeners
    
    // Consent checkbox change event
    const consentCheckbox = document.getElementById('consentCheck');
    if (consentCheckbox) {
        consentCheckbox.addEventListener('change', toggleStartButton);
    }
    
    // Scroll event for header effect
    window.addEventListener('scroll', handleHeaderScroll);
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const dropdown = document.getElementById('userDropdown');
        const trigger = document.querySelector('.user-profile-trigger');
        
        if (dropdown && trigger && !trigger.contains(event.target)) {
            dropdown.classList.remove('show');
            trigger.classList.remove('active');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApplication); 

// Multi-step wizard logic
const steps = Array.from(document.querySelectorAll('.wizard-step'));
let currentStep = 0;
function showStep(idx) {
  steps.forEach((step, i) => step.style.display = i === idx ? '' : 'none');
  currentStep = idx;
}
// Consent logic
const consentCheck = document.getElementById('consentCheck');
const startBtn = document.getElementById('startBtn');
if (consentCheck && startBtn) {
  consentCheck.addEventListener('change', () => {
    startBtn.disabled = !consentCheck.checked;
  });
  startBtn.addEventListener('click', () => showStep(1));
}
// Step 1 validation
const form1 = document.getElementById('form-step-1');
const next1 = document.getElementById('next1');
if (form1 && next1) {
  form1.addEventListener('change', () => {
    next1.disabled = !form1.querySelector('input[type=radio]:checked');
  });
  next1.addEventListener('click', () => showStep(2));
}
// Step 2 validation
const form2 = document.getElementById('form-step-2');
const next2 = document.getElementById('next2');
if (form2 && next2) {
  form2.addEventListener('change', () => {
    next2.disabled = !form2.querySelector('input[type=checkbox]:checked');
  });
  next2.addEventListener('click', () => showStep(3));
}
// Step 3 validation
const form3 = document.getElementById('form-step-3');
const next3 = document.getElementById('next3');
if (form3 && next3) {
  form3.addEventListener('input', () => {
    next3.disabled = !form3.summary.value.trim();
  });
  next3.addEventListener('click', () => showStep(4));
}
// Step 4: Attachments
const form4 = document.getElementById('form-step-4');
const submitBtn = document.getElementById('submitApplication');
const fileFields = ['national-id', 'cv', 'qualification', 'experience'];
function checkUploads() {
  let allFilled = true;
  fileFields.forEach(id => {
    const input = document.getElementById(id);
    if (!input.files.length) allFilled = false;
  });
  submitBtn.disabled = !allFilled;
}
fileFields.forEach(id => {
  const input = document.getElementById(id);
  if (input) {
    input.addEventListener('change', e => {
      const status = document.getElementById('status-' + id);
      if (input.files.length) {
        status.textContent = 'Uploaded';
        status.classList.add('success');
      } else {
        status.textContent = '';
        status.classList.remove('success');
      }
      checkUploads();
    });
  }
});
if (form4) {
  form4.addEventListener('submit', e => {
    e.preventDefault();
    showStep(5);
  });
}
// Back/Exit buttons
document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', () => showStep(currentStep - 1));
});
document.querySelectorAll('.exit-btn').forEach(btn => {
  btn.addEventListener('click', () => window.location.href = 'index.html');
});
// Show initial step
showStep(0);
