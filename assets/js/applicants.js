// ===== APPLICANTS PAGE JAVASCRIPT =====

// DOM Elements
const searchInput = document.querySelector('.search-input input');
const exportButtons = document.querySelectorAll('.export-btn');
const actionsButtons = document.querySelectorAll('.actions-btn');
const paginationButtons = document.querySelectorAll('.pagination-btn');
const entriesSelect = document.querySelector('.entries-per-page select');
const addApplicantBtn = document.querySelector('.add-applicant-btn');
const filterButtons = document.querySelectorAll('.filter-btn');

// ===== SEARCH FUNCTIONALITY =====

// Handle search input
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  const tableRows = document.querySelectorAll('.applicants-table tbody tr');
  
  tableRows.forEach(row => {
    const applicantNameEn = row.querySelector('.applicant-name span').textContent.toLowerCase();
    const applicantNameAr = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const email = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
    const phone = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
    const civilId = row.querySelector('td:nth-child(5)').textContent.toLowerCase();
    const status = row.querySelector('td:nth-child(6)').textContent.toLowerCase();
    
    if (applicantNameEn.includes(searchTerm) || 
        applicantNameAr.includes(searchTerm) || 
        email.includes(searchTerm) || 
        phone.includes(searchTerm) || 
        civilId.includes(searchTerm) ||
        status.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
  
  // Update pagination info
  updatePaginationInfo();
}

// ===== EXPORT FUNCTIONALITY =====

// Handle export buttons
function handleExport(e) {
  const action = e.currentTarget.getAttribute('data-action');
  
  switch(action) {
    case 'csv':
      exportToCSV();
      break;
    case 'pdf':
      exportToPDF();
      break;
    case 'print':
      printTable();
      break;
  }
}

// Export to CSV
function exportToCSV() {
  const table = document.querySelector('.applicants-table');
  const rows = table.querySelectorAll('tr');
  let csv = [];
  
  rows.forEach(row => {
    const cols = row.querySelectorAll('td, th');
    const rowData = [];
    
    cols.forEach(col => {
      // Get text content, excluding action buttons
      if (!col.classList.contains('actions-dropdown')) {
        rowData.push(`"${col.textContent.trim()}"`);
      }
    });
    
    csv.push(rowData.join(','));
  });
  
  const csvContent = csv.join('\n');
  downloadFile(csvContent, 'applicants.csv', 'text/csv');
  showNotification('CSV exported successfully!', 'success');
}

// Export to PDF (placeholder)
function exportToPDF() {
  showNotification('PDF export feature coming soon!', 'info');
}

// Print table
function printTable() {
  const printWindow = window.open('', '_blank');
  const table = document.querySelector('.applicants-table').cloneNode(true);
  
  // Remove action buttons for printing
  const actionCells = table.querySelectorAll('.actions-dropdown');
  actionCells.forEach(cell => cell.remove());
  
  printWindow.document.write(`
    <html>
      <head>
        <title>Applicants Report</title>
        <style>
          body { font-family: Arial, sans-serif; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Applicants Report</h1>
        ${table.outerHTML}
      </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.print();
  showNotification('Print dialog opened!', 'success');
}

// Download file helper
function downloadFile(content, filename, contentType) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ===== ACTIONS DROPDOWN =====

// Handle actions dropdown
function handleActionsClick(e) {
  e.stopPropagation();
  
  // Close all other dropdowns
  const allDropdowns = document.querySelectorAll('.dropdown-menu');
  allDropdowns.forEach(dropdown => {
    if (dropdown !== e.currentTarget.nextElementSibling) {
      dropdown.style.opacity = '0';
      dropdown.style.visibility = 'hidden';
      dropdown.style.transform = 'translateY(-10px)';
    }
  });
  
  const dropdown = e.currentTarget.nextElementSibling;
  const isVisible = dropdown.style.opacity === '1';
  
  if (isVisible) {
    dropdown.style.opacity = '0';
    dropdown.style.visibility = 'hidden';
    dropdown.style.transform = 'translateY(-10px)';
  } else {
    dropdown.style.opacity = '1';
    dropdown.style.visibility = 'visible';
    dropdown.style.transform = 'translateY(0)';
  }
}

// Handle action item clicks
function handleActionItemClick(e) {
  e.preventDefault();
  const action = e.target.closest('.dropdown-item').getAttribute('data-action');
  const row = e.target.closest('tr');
  const applicantName = row.querySelector('.applicant-name span').textContent;
  
  console.log(`Action "${action}" clicked for applicant: ${applicantName}`);
  
  // Handle different actions
  switch(action) {
    case 'view':
      // Navigate to applicant details page
      window.location.href = 'applicant-details.html';
      break;
    case 'activate':
      activateApplicant(row, applicantName);
      break;
    case 'deactivate':
      deactivateApplicant(row, applicantName);
      break;
  }
  
  // Close dropdown
  const dropdown = e.target.closest('.dropdown-menu');
  dropdown.style.opacity = '0';
  dropdown.style.visibility = 'hidden';
  dropdown.style.transform = 'translateY(-10px)';
}

// Activate applicant
function activateApplicant(row, applicantName) {
  const statusBadge = row.querySelector('.status-badge');
  statusBadge.classList.remove('inactive');
  statusBadge.classList.add('active');
  statusBadge.textContent = 'Active';
  statusBadge.setAttribute('data-translate', 'active');
  showNotification(`${applicantName} has been activated`, 'success');
}

// Deactivate applicant
function deactivateApplicant(row, applicantName) {
  const statusBadge = row.querySelector('.status-badge');
  statusBadge.classList.remove('active');
  statusBadge.classList.add('inactive');
  statusBadge.textContent = 'Inactive';
  statusBadge.setAttribute('data-translate', 'inactive');
  showNotification(`${applicantName} has been deactivated`, 'success');
}

// ===== PAGINATION =====

// Handle pagination
function handlePagination(e) {
  const button = e.target;
  const action = button.getAttribute('data-action');
  const page = button.getAttribute('data-page');
  
  if (action) {
    handlePaginationAction(action);
  } else if (page) {
    goToPage(parseInt(page));
  }
}

// Handle pagination actions
function handlePaginationAction(action) {
  const currentPage = getCurrentPage();
  let newPage = currentPage;
  
  switch(action) {
    case 'first':
      newPage = 1;
      break;
    case 'prev':
      newPage = Math.max(1, currentPage - 1);
      break;
    case 'next':
      newPage = Math.min(getTotalPages(), currentPage + 1);
      break;
    case 'last':
      newPage = getTotalPages();
      break;
  }
  
  if (newPage !== currentPage) {
    goToPage(newPage);
  }
}

// Go to specific page
function goToPage(page) {
  // Update active pagination button
  paginationButtons.forEach(btn => btn.classList.remove('active'));
  const pageButton = document.querySelector(`[data-page="${page}"]`);
  if (pageButton) {
    pageButton.classList.add('active');
  }
  
  // Update pagination info
  updatePaginationInfo();
  
  console.log(`Navigated to page ${page}`);
}

// Get current page
function getCurrentPage() {
  const activeButton = document.querySelector('.pagination-btn.active');
  return activeButton ? parseInt(activeButton.getAttribute('data-page')) : 1;
}

// Get total pages
function getTotalPages() {
  return 3; // Hardcoded for demo
}

// Update pagination info
function updatePaginationInfo() {
  const visibleRows = document.querySelectorAll('.applicants-table tbody tr:not([style*="display: none"])');
  const totalEntries = visibleRows.length;
  const entriesPerPage = parseInt(entriesSelect.value);
  
  const infoElement = document.querySelector('[data-translate="showing_entries"]');
  if (infoElement) {
    infoElement.textContent = `Showing 1 to ${Math.min(entriesPerPage, totalEntries)} of ${totalEntries} entries`;
  }
}

// ===== ENTRIES PER PAGE =====

// Handle entries per page change
function handleEntriesChange(e) {
  const entriesPerPage = parseInt(e.target.value);
  console.log(`Changed entries per page to ${entriesPerPage}`);
  
  // Update pagination info
  updatePaginationInfo();
}

// ===== ADD APPLICANT =====

// Handle add applicant button
function handleAddApplicant() {
  window.location.href = 'add-applicant.html';
}

// ===== FILTER BUTTONS =====

// Handle filter buttons
function handleFilterClick(e) {
  const filterType = e.currentTarget.getAttribute('data-filter');
  const isAddFilter = e.currentTarget.classList.contains('add-filter');
  const isClearFilter = e.currentTarget.classList.contains('clear-filter');
  
  console.log(`Filter action: ${filterType}`);
  
  if (isAddFilter) {
    // Handle add filter functionality
    showAddFilterModal();
  } else if (isClearFilter) {
    // Handle clear filter functionality
    clearAllFilters();
  }
}

// Show add filter modal (placeholder)
function showAddFilterModal() {
  showNotification('Add filter modal coming soon!', 'info');
}

// Clear all filters
function clearAllFilters() {
  // Clear search input
  if (searchInput) {
    searchInput.value = '';
  }
  
  // Show all rows
  const tableRows = document.querySelectorAll('.applicants-table tbody tr');
  tableRows.forEach(row => {
    row.style.display = '';
  });
  
  // Update pagination
  updatePaginationInfo();
  
  showNotification('All filters cleared successfully', 'success');
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
  
  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', handleSearch);
  }
  
  // Export buttons
  exportButtons.forEach(btn => {
    btn.addEventListener('click', handleExport);
  });
  
  // Actions buttons
  actionsButtons.forEach(btn => {
    btn.addEventListener('click', handleActionsClick);
  });
  
  // Action dropdown items
  document.addEventListener('click', (e) => {
    if (e.target.closest('.dropdown-menu .dropdown-item')) {
      handleActionItemClick(e);
    }
  });
  
  // Pagination buttons
  paginationButtons.forEach(btn => {
    btn.addEventListener('click', handlePagination);
  });
  
  // Entries per page
  if (entriesSelect) {
    entriesSelect.addEventListener('change', handleEntriesChange);
  }
  
  // Add applicant button
  if (addApplicantBtn) {
    addApplicantBtn.addEventListener('click', handleAddApplicant);
  }
  
  // Filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', handleFilterClick);
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.actions-dropdown')) {
      const allDropdowns = document.querySelectorAll('.dropdown-menu');
      allDropdowns.forEach(dropdown => {
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
        dropdown.style.transform = 'translateY(-10px)';
      });
    }
  });
}

// ===== INITIALIZATION =====

// Initialize applicants page
function initializeApplicantsPage() {
  // Initialize language state from localStorage
  initializeLanguageState();
  
  initializeEventListeners();
  updatePaginationInfo();
  
  console.log('Applicants page initialized successfully');
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

// Apply language state (similar to switchLanguage but without reinitializing charts)
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
    body.setAttribute('dir', 'rtl');
    html.classList.add('rtl-lang');
    body.classList.add('rtl-lang');
  } else {
    html.setAttribute('dir', 'ltr');
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
      
      // Applicants page
      add_applicant: 'Add Applicant',
      add_filter: 'Add Filter',
      clear_filter: 'Clear Filter',
      copy: 'Copy',
      csv: 'CSV',
      pdf: 'PDF',
      print: 'Print',
      search_applicants: 'Search applicants...',
      applicant_name_en: 'Applicant Name (EN)',
      applicant_name_ar: 'Applicant Name (AR)',
      email: 'Email',
      phone_number: 'Phone Number',
      civil_id: 'Civil ID',
      status: 'Status',
      active: 'Active',
      inactive: 'Inactive',
      actions: 'Actions',
      view: 'View',
      activate: 'Activate',
      deactivate: 'Deactivate',
      showing_entries: 'Showing 1 to 05 of 12 entries',
      
      // Footer
      all_rights_reserved: 'All rights reserved.',
      privacy_policy: 'Privacy Policy',
      terms_of_service: 'Terms of Service',
      contact: 'Contact',
      ministry_info: 'Ministry of Transport, Communications and Information Technology',
      global_computer_services: 'Global Computer Services LLC'
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
      
      // Applicants page
      add_applicant: 'إضافة متقدم',
      add_filter: 'إضافة فلتر',
      clear_filter: 'مسح الفلتر',
      copy: 'نسخ',
      csv: 'CSV',
      pdf: 'PDF',
      print: 'طباعة',
      search_applicants: 'البحث في المتقدمين...',
      applicant_name_en: 'اسم المتقدم (إنجليزي)',
      applicant_name_ar: 'اسم المتقدم (عربي)',
      email: 'البريد الإلكتروني',
      phone_number: 'رقم الهاتف',
      civil_id: 'الرقم المدني',
      status: 'الحالة',
      active: 'نشط',
      inactive: 'غير نشط',
      actions: 'الإجراءات',
      view: 'عرض',
      activate: 'تفعيل',
      deactivate: 'إلغاء التفعيل',
      showing_entries: 'عرض 1 إلى 05 من 12 إدخال',
      
      // Footer
      all_rights_reserved: 'جميع الحقوق محفوظة.',
      privacy_policy: 'سياسة الخصوصية',
      terms_of_service: 'شروط الخدمة',
      contact: 'اتصل بنا',
      ministry_info: 'وزارة النقل والاتصالات وتقنية المعلومات',
      global_computer_services: 'شركة الخدمات الحاسوبية العالمية ذ.م.م'
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
document.addEventListener('DOMContentLoaded', initializeApplicantsPage);

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
