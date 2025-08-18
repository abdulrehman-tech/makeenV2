// ===== APPLICANT DETAILS PAGE JAVASCRIPT =====

// ===== ACCORDION FUNCTIONALITY =====

// Handle accordion toggle
function toggleAccordion(header) {
  const content = header.nextElementSibling;
  const icon = header.querySelector('.accordion-icon');
  const isExpanded = header.getAttribute('aria-expanded') === 'true';
  
  if (isExpanded) {
    // Collapse
    header.setAttribute('aria-expanded', 'false');
    content.classList.remove('show');
    content.style.maxHeight = '0';
    content.style.padding = '0 1.5rem';
    content.style.opacity = '0';
    icon.style.transform = 'rotate(0deg)';
  } else {
    // Expand
    header.setAttribute('aria-expanded', 'true');
    content.classList.add('show');
    content.style.maxHeight = content.scrollHeight + 'rem';
    content.style.padding = '1rem 1.5rem';
    content.style.opacity = '1';
    icon.style.transform = 'rotate(180deg)';
  }
}

// Initialize accordion functionality
function initializeAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      toggleAccordion(header);
    });
    
    // Initialize expanded accordions on page load
    const isExpanded = header.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      const content = header.nextElementSibling;
      const icon = header.querySelector('.accordion-icon');
      
      content.classList.add('show');
      content.style.maxHeight = content.scrollHeight + 'rem';
      content.style.padding = '1rem 1.5rem';
      content.style.opacity = '1';
      icon.style.transform = 'rotate(180deg)';
    }
  });
}

// ===== LANGUAGE SWITCHING =====

// Switch language function
function switchLanguage(lang) {
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
  
  // Store language preference in localStorage
  localStorage.setItem('site-lang', lang);
  
  console.log(`Language switched to: ${lang}`);
}

// Apply language-specific styles
function applyLanguageStyles(lang) {
  const html = document.documentElement;
  const body = document.body;
  
  if (lang === 'ar') {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
    body.setAttribute('dir', 'rtl');
    html.classList.add('rtl-lang');
    body.classList.add('rtl-lang');
  } else {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
    body.setAttribute('dir', 'ltr');
    html.classList.remove('rtl-lang');
    body.classList.remove('rtl-lang');
  }
}

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
      
      // Breadcrumb
      applicant_details: 'Applicant Details',
      
      // Applicant header
      applicant_name: 'Ahmed Al-Rashid',
      applicant_email: 'ahmed.rashid@email.com',
      applicant_phone: '+968 1111 2222',
      applicant_location: 'Muscat, Oman',
      applicant_civil_id: '12345678',
      active: 'Active',
      inactive: 'Inactive',
      
      // Personal details
      personal_details: 'Personal Details',
      civil_id: 'Civil ID',
      full_name: 'Full Name',
      full_name_arabic: 'Full Name (Arabic)',
      date_of_birth: 'Date of Birth',
      gender: 'Gender',
      nationality: 'Nationality',
      marital_status: 'Marital Status',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      address_value: 'Al Khuwair, Muscat, Oman',
      
      // Education
      education: 'Education',
      bachelor_degree: 'Bachelor\'s Degree in Computer Science',
      qualification_period: '2008 - 2012',
      qualification_institution: 'Sultan Qaboos University',
      diploma_in_it: 'Diploma in Information Technology',
      
      // Experience
      work_experience: 'Work Experience',
      senior_software_engineer: 'Senior Software Engineer',
      experience_period: '2018 - Present',
      experience_company: 'Tech Solutions LLC',
      software_engineer: 'Software Engineer',
      junior_developer: 'Junior Developer',
      
      // MOL Data
      mol_data: 'MOL Data',
      civil_expiry_date: 'Civil Expiry Date',
      full_name_eng: 'Full name [Eng]',
      gender_eng: 'Gender [Eng]',
      gender_arabic: 'Gender [Arabic]',
      phone_number: 'Phone number',
      current_address: 'Current Address',
      permanent_address: 'Permanent Address',
      latest_education: 'Latest Education',
      job_status: 'Job Status',
      organization_sector: 'Organization Sector',
      occupation: 'Occupation',
      company_name: 'Company Name',
      
      // CV
      cv: 'CV',
      file_size: 'File Size',
      uploaded: 'Uploaded',
      download: 'Download',
      view: 'View',
      
      // Actions
      back: 'Back',
      toggle_status: 'Toggle Status',
      status: 'Status'
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
      
      // Breadcrumb
      applicant_details: 'تفاصيل المتقدم',
      
      // Applicant header
      applicant_name: 'أحمد الراشد',
      applicant_email: 'ahmed.rashid@email.com',
      applicant_phone: '+968 1111 2222',
      applicant_location: 'مسقط، عمان',
      applicant_civil_id: '12345678',
      active: 'نشط',
      inactive: 'غير نشط',
      
      // Personal details
      personal_details: 'التفاصيل الشخصية',
      civil_id: 'الرقم المدني',
      full_name: 'الاسم الكامل',
      full_name_arabic: 'الاسم الكامل (عربي)',
      date_of_birth: 'تاريخ الميلاد',
      gender: 'الجنس',
      nationality: 'الجنسية',
      marital_status: 'الحالة الاجتماعية',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      address: 'العنوان',
      address_value: 'الخوير، مسقط، عمان',
      
      // Education
      education: 'التعليم',
      bachelor_degree: 'بكالوريوس في علوم الحاسوب',
      qualification_period: '2008 - 2012',
      qualification_institution: 'جامعة السلطان قابوس',
      diploma_in_it: 'دبلوم في تقنية المعلومات',
      
      // Experience
      work_experience: 'الخبرة العملية',
      senior_software_engineer: 'مهندس برمجيات أول',
      experience_period: '2018 - الحاضر',
      experience_company: 'شركة الحلول التقنية ذ.م.م',
      software_engineer: 'مهندس برمجيات',
      junior_developer: 'مطور مبتدئ',
      
      // MOL Data
      mol_data: 'بيانات وزارة العمل',
      civil_expiry_date: 'تاريخ انتهاء الهوية المدنية',
      full_name_eng: 'الاسم الكامل [إنجليزي]',
      gender_eng: 'الجنس [إنجليزي]',
      gender_arabic: 'الجنس [عربي]',
      phone_number: 'رقم الهاتف',
      current_address: 'العنوان الحالي',
      permanent_address: 'العنوان الدائم',
      latest_education: 'آخر مؤهل تعليمي',
      job_status: 'حالة العمل',
      organization_sector: 'قطاع المؤسسة',
      occupation: 'المهنة',
      company_name: 'اسم الشركة',
      
      // CV
      cv: 'السيرة الذاتية',
      file_size: 'حجم الملف',
      uploaded: 'تم الرفع',
      download: 'تحميل',
      view: 'عرض',
      
      // Actions
      back: 'رجوع',
      toggle_status: 'تغيير الحالة',
      status: 'الحالة'
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

// Initialize language state
function initializeLanguageState() {
  const savedLang = localStorage.getItem('site-lang');
  if (savedLang) {
    // Apply the saved language state
    applyLanguageState(savedLang);
  } else {
    // Default to English
    applyLanguageState('en');
  }
}

// Apply language state (similar to switchLanguage but without reinitializing)
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

// ===== STATUS TOGGLE FUNCTIONALITY =====

// Toggle applicant status
function toggleApplicantStatus() {
  const statusBadge = document.querySelector('.status-badge');
  const toggleSwitch = document.querySelector('.toggle-switch');
  const checkbox = document.getElementById('statusToggle');
  
  const isActive = statusBadge.classList.contains('active');
  
  if (isActive) {
    // Change to inactive
    statusBadge.classList.remove('active');
    statusBadge.classList.add('inactive');
    statusBadge.setAttribute('data-translate', 'inactive');
    statusBadge.textContent = currentLang === 'ar' ? 'غير نشط' : 'Inactive';
    
    toggleSwitch.classList.add('inactive');
    checkbox.checked = false;
    
    showNotification(currentLang === 'ar' ? 'تم تغيير الحالة إلى غير نشط' : 'Status changed to Inactive', 'success');
  } else {
    // Change to active
    statusBadge.classList.remove('inactive');
    statusBadge.classList.add('active');
    statusBadge.setAttribute('data-translate', 'active');
    statusBadge.textContent = currentLang === 'ar' ? 'نشط' : 'Active';
    
    toggleSwitch.classList.remove('inactive');
    checkbox.checked = true;
    
    showNotification(currentLang === 'ar' ? 'تم تغيير الحالة إلى نشط' : 'Status changed to Active', 'success');
  }
}

// ===== DOCUMENT ACTIONS =====

// Handle document download
function downloadDocument(filename) {
  // Placeholder for actual download functionality
  console.log(`Downloading document: ${filename}`);
  
  // Show notification
  showNotification(`Downloading ${filename}...`, 'info');
  
  // In a real application, this would trigger the actual download
  // For demo purposes, we'll just show a success message after a delay
  setTimeout(() => {
    showNotification(`${filename} downloaded successfully!`, 'success');
  }, 2000);
}

// Handle document view
function viewDocument(filename) {
  // Placeholder for actual view functionality
  console.log(`Viewing document: ${filename}`);
  
  // Show notification
  showNotification(`Opening ${filename}...`, 'info');
  
  // In a real application, this would open the document in a new tab or modal
  // For demo purposes, we'll just show a message
  setTimeout(() => {
    showNotification(`${filename} opened in new tab`, 'success');
  }, 1000);
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
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
  
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
  // Language switcher
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.target.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });
  
  // Document actions
  const downloadBtns = document.querySelectorAll('[data-translate="download"]');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const documentCard = e.target.closest('.document-card');
      const filename = documentCard.querySelector('.document-name').textContent;
      downloadDocument(filename);
    });
  });
  
  const viewBtns = document.querySelectorAll('[data-translate="view"]');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const documentCard = e.target.closest('.document-card');
      const filename = documentCard.querySelector('.document-name').textContent;
      viewDocument(filename);
    });
  });
}

// ===== INITIALIZATION =====

// Initialize applicant details page
function initializeApplicantDetailsPage() {
  // Initialize language state from localStorage
  initializeLanguageState();
  
  // Initialize accordions
  initializeAccordions();
  
  // Initialize event listeners
  initializeEventListeners();
  
  console.log('Applicant details page initialized successfully');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApplicantDetailsPage);

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
