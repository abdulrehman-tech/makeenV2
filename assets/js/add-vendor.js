// ===== ADD VENDOR PAGE JAVASCRIPT =====

// DOM Elements
const vendorForm = document.getElementById('vendorForm');
const saveVendorBtn = document.getElementById('saveVendorBtn');
const vendorLogoInput = document.getElementById('vendorLogo');
const fileUploadDisplay = document.querySelector('.file-upload-display');

// ===== FORM HANDLING =====

// Handle form submission
function handleFormSubmit(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(vendorForm);
  const vendorData = {
    vendorNameEn: formData.get('vendorNameEn'),
    vendorNameAr: formData.get('vendorNameAr'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
    crNumber: formData.get('crNumber'),
    status: formData.get('status'),
    vendorLogo: formData.get('vendorLogo')
  };
  
  // Validate form
  if (!validateForm(vendorData)) {
    return;
  }
  
  // Show loading state
  saveVendorBtn.disabled = true;
  saveVendorBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
  
  // Simulate API call
  setTimeout(() => {
    // Reset button state
    saveVendorBtn.disabled = false;
    saveVendorBtn.innerHTML = '<i class="fas fa-check"></i> Save Vendor';
    
    // Show success message
    showNotification('Vendor saved successfully!', 'success');
    
    // Redirect to vendors page after a short delay
    setTimeout(() => {
      window.location.href = 'vendors.html';
    }, 1500);
  }, 2000);
}

// Validate form data
function validateForm(data) {
  const errors = [];
  
  // Check required fields
  if (!data.vendorNameEn || data.vendorNameEn.trim() === '') {
    errors.push('Vendor name (English) is required');
  }
  
  if (!data.vendorNameAr || data.vendorNameAr.trim() === '') {
    errors.push('Vendor name (Arabic) is required');
  }
  
  if (!data.email || data.email.trim() === '') {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Please enter a valid email address');
  }
  
  if (!data.phoneNumber || data.phoneNumber.trim() === '') {
    errors.push('Phone number is required');
  }
  
  if (!data.crNumber || data.crNumber.trim() === '') {
    errors.push('CR number is required');
  }
  
  if (!data.status || data.status.trim() === '') {
    errors.push('Status is required');
  }
  
  // Show errors if any
  if (errors.length > 0) {
    showNotification(errors.join('\n'), 'error');
    return false;
  }
  
  return true;
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ===== FILE UPLOAD HANDLING =====

// Handle file upload
function handleFileUpload(e) {
  const file = e.target.files[0];
  
  if (file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      showNotification('Please select an image file', 'error');
      e.target.value = '';
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification('File size must be less than 5MB', 'error');
      e.target.value = '';
      return;
    }
    
    // Update display
    updateFileDisplay(file);
  }
}

// Update file display
function updateFileDisplay(file) {
  const displayText = fileUploadDisplay.querySelector('span');
  displayText.textContent = file.name;
  
  // Add preview if it's an image
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function(e) {
      // Create preview element
      let preview = fileUploadDisplay.querySelector('.file-preview');
      if (!preview) {
        preview = document.createElement('img');
        preview.className = 'file-preview';
        preview.style.cssText = `
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 4px;
          margin-right: 8px;
        `;
        fileUploadDisplay.insertBefore(preview, fileUploadDisplay.firstChild);
      }
      preview.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// ===== EDIT MODE HANDLING =====

// Check if we're in edit mode
function checkEditMode() {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get('mode');
  const id = urlParams.get('id');
  
  if (mode === 'edit' && id) {
    // Update page title
    const pageTitle = document.querySelector('.page-main-title');
    const breadcrumbItem = document.querySelector('.breadcrumb-item.active');
    
    if (pageTitle) {
      pageTitle.textContent = 'Edit Vendor';
      pageTitle.setAttribute('data-translate', 'edit_vendor');
    }
    
    if (breadcrumbItem) {
      breadcrumbItem.textContent = 'Edit Vendor';
      breadcrumbItem.setAttribute('data-translate', 'edit_vendor');
    }
    
    // Load vendor data (simulate API call)
    loadVendorData(id);
  }
}

// Load vendor data for editing
function loadVendorData(id) {
  // Simulate API call to get vendor data
  const mockVendorData = {
    vendorNameEn: 'Tech Innovators',
    vendorNameAr: 'مبتكرو التكنولوجيا',
    email: 'info@techinnovators.com',
    phoneNumber: '+968 1234 5678',
    crNumber: '123456789',
    status: 'active'
  };
  
  // Populate form fields
  document.getElementById('vendorNameEn').value = mockVendorData.vendorNameEn;
  document.getElementById('vendorNameAr').value = mockVendorData.vendorNameAr;
  document.getElementById('email').value = mockVendorData.email;
  document.getElementById('phoneNumber').value = mockVendorData.phoneNumber;
  document.getElementById('crNumber').value = mockVendorData.crNumber;
  document.getElementById('status').value = mockVendorData.status;
  
  // Update button text
  if (saveVendorBtn) {
    saveVendorBtn.textContent = 'Update Vendor';
    saveVendorBtn.setAttribute('data-translate', 'update_vendor');
  }
}

// ===== NOTIFICATIONS =====

// Show notification
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${getNotificationColor(type)};
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 12px;
    max-width: 300px;
    animation: slideIn 0.3s ease;
    white-space: pre-line;
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds for errors, 3 seconds for others
  const autoRemoveTime = type === 'error' ? 5000 : 3000;
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, autoRemoveTime);
  
  // Close button
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  });
}

// Get notification icon
function getNotificationIcon(type) {
  switch(type) {
    case 'success': return 'check-circle';
    case 'error': return 'exclamation-circle';
    case 'warning': return 'exclamation-triangle';
    default: return 'info-circle';
  }
}

// Get notification color
function getNotificationColor(type) {
  switch(type) {
    case 'success': return '#10b981';
    case 'error': return '#ef4444';
    case 'warning': return '#f59e0b';
    default: return '#3b82f6';
  }
}

// ===== EVENT LISTENERS =====

// Initialize event listeners
function initializeEventListeners() {
  // Form submission
  if (vendorForm) {
    vendorForm.addEventListener('submit', handleFormSubmit);
  }
  
  // File upload
  if (vendorLogoInput) {
    vendorLogoInput.addEventListener('change', handleFileUpload);
  }
  
  // Language switcher
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.target.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });
}

// ===== INITIALIZATION =====

// Initialize add vendor page
function initializeAddVendorPage() {
  // Initialize language state from localStorage
  initializeLanguageStateVendor();  
  // Check if we're in edit mode
  checkEditMode();
  
  // Ensure proper font family and alignment for input fields
  ensureInputFieldStyling();
  
  initializeEventListeners();
  
  console.log('Add vendor page initialized successfully');
}

// Ensure proper font family and alignment for input fields
function ensureInputFieldStyling() {
  const arabicInput = document.getElementById('vendorNameAr');
  const englishInput = document.getElementById('vendorNameEn');
  
  if (arabicInput) {
    arabicInput.style.fontFamily = "'Tajawal', sans-serif";
    arabicInput.style.textAlign = 'right';
    arabicInput.style.direction = 'rtl';
  }
  
  if (englishInput) {
    englishInput.style.fontFamily = "'Poppins', sans-serif";
    englishInput.style.textAlign = 'left';
    englishInput.style.direction = 'ltr';
  }
}

// Initialize language state
function initializeLanguageStateVendor() {
  const savedLang = localStorage.getItem('site-lang');
  if (savedLang) {
    // Apply the saved language state
    applyLanguageState(savedLang);
  } else {
    // Default to English
    applyLanguageState('en');
  }
}

// // Apply language state
function applyLanguageState(lang) {
  // Update language buttons
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
  if (activeBtn) {
    activeBtn.classList.add('active');
  }

  // Apply language styles
  applyLanguageStyles(lang);
  
  // Apply translations
  applyTranslations(lang);
  
  console.log(`Language state applied: ${lang}`);
}

// // Switch language function
// function switchLanguage(lang) {
//   // Update language buttons
//   const langButtons = document.querySelectorAll('.lang-btn');
//   langButtons.forEach(btn => btn.classList.remove('active'));
//   const activeBtn = document.querySelector(`[data-lang="${lang}"]`);
//   if (activeBtn) {
//     activeBtn.classList.add('active');
//   }

//   // Apply language styles
//   applyLanguageStyles(lang);
  
//   // Apply translations
//   applyTranslations(lang);
  
//   // Store language preference in localStorage
//   localStorage.setItem('site-lang', lang);
  
//   console.log(`Language switched to: ${lang}`);
// }

// // Apply language-specific styles
// function applyLanguageStyles(lang) {
//   const html = document.documentElement;
//   const body = document.body;
  
//   if (lang === 'ar') {
//     html.setAttribute('dir', 'rtl');
//     body.setAttribute('dir', 'rtl');
//     html.classList.add('rtl-lang');
//     body.classList.add('rtl-lang');
//     html.classList.remove('ltr-lang');
//     body.classList.remove('ltr-lang');
    
//     // Apply Arabic font family to form elements
//     const formElements = document.querySelectorAll('.form-control, .form-label, .btn, .file-upload-display, .page-main-title');
//     formElements.forEach(element => {
//       element.style.fontFamily = "'Tajawal', sans-serif";
//     });
    
//     // Ensure Arabic input field always has correct font family
//     const arabicInput = document.getElementById('vendorNameAr');
//     if (arabicInput) {
//       arabicInput.style.fontFamily = "'Tajawal', sans-serif";
//       arabicInput.style.textAlign = 'right';
//       arabicInput.style.direction = 'rtl';
//     }
    
//     // Apply RTL text alignment
//     const textElements = document.querySelectorAll('.form-control, .form-label, .page-main-title, .file-upload-display');
//     textElements.forEach(element => {
//       element.style.textAlign = 'right';
//       if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
//         element.style.direction = 'rtl';
//       }
//     });
//   } else {
//     html.setAttribute('dir', 'ltr');
//     body.setAttribute('dir', 'ltr');
//     html.classList.remove('rtl-lang');
//     body.classList.remove('rtl-lang');
//     html.classList.add('ltr-lang');
//     body.classList.add('ltr-lang');
    
//     // Apply English font family to form elements
//     const formElements = document.querySelectorAll('.form-control, .form-label, .btn, .file-upload-display, .page-main-title');
//     formElements.forEach(element => {
//       element.style.fontFamily = "'Poppins', sans-serif";
//     });
    
//     // Ensure English input field always has correct font family
//     const englishInput = document.getElementById('vendorNameEn');
//     if (englishInput) {
//       englishInput.style.fontFamily = "'Poppins', sans-serif";
//       englishInput.style.textAlign = 'left';
//       englishInput.style.direction = 'ltr';
//     }
    
//     // Apply LTR text alignment
//     const textElements = document.querySelectorAll('.form-control, .form-label, .page-main-title, .file-upload-display');
//     textElements.forEach(element => {
//       element.style.textAlign = 'left';
//       if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
//         element.style.direction = 'ltr';
//       }
//     });
//   }
// }

// Apply translations
function applyTranslations(lang) {
  const translations = {
    en: {
      // Navigation
      home: 'Home',
      dashboard: 'Dashboard',
      programs: 'Programs',
      applicant_requests: 'Applicant Requests',
      vendors: 'Vendors',
      applicants: 'Applicants',
      reimbursement: 'Reimbursement',
      
      // User menu
      admin: 'Admin',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout',
      
      // Add vendor page
      add_vendor: 'Add Vendor',
      edit_vendor: 'Edit Vendor',
      vendor_name: 'Vendor Name',
      email: 'Email',
      phone_number: 'Phone Number',
      cr_number: 'CR Number',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      vendor_logo: 'Vendor Logo',
      choose_file: 'Choose file to upload logo',
      save_vendor: 'Save Vendor',
      update_vendor: 'Update Vendor',
      cancel: 'Cancel',
      english: 'English',
      arabic: 'Arabic',
      
      // Footer
      all_rights_reserved: 'All rights reserved.',
      privacy_policy: 'Privacy Policy',
      terms_of_service: 'Terms of Service',
      contact: 'Contact'
    },
    ar: {
      // Navigation
      home: 'الرئيسية',
      dashboard: 'لوحة التحكم',
      programs: 'البرامج',
      applicant_requests: 'طلبات المتقدمين',
      vendors: 'الموردين',
      applicants: 'المتقدمين',
      reimbursement: 'الاسترداد',
      
      // User menu
      admin: 'المدير',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج',
      
      // Add vendor page
      add_vendor: 'إضافة مورد',
      edit_vendor: 'تعديل المورد',
      vendor_name: 'اسم المورد',
      email: 'البريد الإلكتروني',
      phone_number: 'رقم الهاتف',
      cr_number: 'رقم السجل التجاري',
      status: 'الحالة',
      active: 'نشط',
      inactive: 'غير نشط',
      vendor_logo: 'شعار المورد',
      choose_file: 'اختر ملف لرفع الشعار',
      save_vendor: 'حفظ المورد',
      update_vendor: 'تحديث المورد',
      cancel: 'إلغاء',
      english: 'إنجليزي',
      arabic: 'عربي',
      
      // Footer
      all_rights_reserved: 'جميع الحقوق محفوظة.',
      privacy_policy: 'سياسة الخصوصية',
      terms_of_service: 'شروط الخدمة',
      contact: 'اتصل بنا'
    }
  };

  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeAddVendorPage);

// Listen for storage changes (language changes from other tabs/windows)
window.addEventListener('storage', (e) => {
  if (e.key === 'site-lang' && e.newValue) {
    console.log('Language changed from another tab/window:', e.newValue);
    applyLanguageState(e.newValue);
  }
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .notification-content {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0;
    font-size: 14px;
  }
  
  .notification-close:hover {
    opacity: 0.8;
  }
`;
document.head.appendChild(style);
