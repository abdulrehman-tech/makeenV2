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

