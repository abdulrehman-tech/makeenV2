// ===== Applicant Requests PAGE JAVASCRIPT =====

// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const searchInput = document.querySelector('.search-input input');
const exportButtons = document.querySelectorAll('.export-btn');
const actionsButtons = document.querySelectorAll('.actions-btn');
const paginationButtons = document.querySelectorAll('.pagination-btn');
const entriesSelect = document.querySelector('.entries-per-page select');
const filterButtons = document.querySelectorAll('.filter-btn');

// ===== TAB FUNCTIONALITY =====

// Handle tab switching
function handleTabClick(e) {
  const clickedTab = e.target;
  const tabName = clickedTab.getAttribute('data-tab');
  
  // Remove active class from all tabs
  tabButtons.forEach(tab => tab.classList.remove('active'));
  
  // Add active class to clicked tab
  clickedTab.classList.add('active');
  
  // Filter table based on tab
  filterTableByStatus(tabName);
  
  console.log(`Switched to ${tabName} tab`);
}

// Filter table by status
function filterTableByStatus(status) {
  const tableRows = document.querySelectorAll('.applicant-requests-table tbody tr');
  
  tableRows.forEach(row => {
    const statusBadge = row.querySelector('.status-badge');
    const rowStatus = statusBadge ? statusBadge.textContent.toLowerCase() : '';
    
    if (status === 'all' || rowStatus === status) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
  
  // Update pagination info
  updatePaginationInfo();
}

// ===== SEARCH FUNCTIONALITY =====

// Handle search input
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase();
  const tableRows = document.querySelectorAll('.applicant-requests-table tbody tr');
  
  tableRows.forEach(row => {
    const applicantName = row.querySelector('.applicant-name span').textContent.toLowerCase();
    const programName = row.querySelector('.program-name span').textContent.toLowerCase();
    const vendor = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const location = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
    
    if (programName.includes(searchTerm) || 
        vendor.includes(searchTerm) || 
        location.includes(searchTerm)) {
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
    case 'copy':
      copyTableToClipboard();
      break;
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

// Copy table to clipboard
function copyTableToClipboard() {
  const table = document.querySelector('.applicant-requests-table');
  const range = document.createRange();
  range.selectNode(table);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  
  try {
    document.execCommand('copy');
    showNotification('Table copied to clipboard!', 'success');
  } catch (err) {
    showNotification('Failed to copy table', 'error');
  }
  
  window.getSelection().removeAllRanges();
}

// Export to CSV
function exportToCSV() {
  const table = document.querySelector('.applicant-requests-table');
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
  downloadFile(csvContent, 'applicant-requests.csv', 'text/csv');
  showNotification('CSV exported successfully!', 'success');
}

// Export to PDF (placeholder)
function exportToPDF() {
  showNotification('PDF export feature coming soon!', 'info');
}

// Print table
function printTable() {
  const printWindow = window.open('', '_blank');
  const table = document.querySelector('.applicant-requests-table').cloneNode(true);
  
  // Remove action buttons for printing
  const actionCells = table.querySelectorAll('.actions-dropdown');
  actionCells.forEach(cell => cell.remove());
  
  printWindow.document.write(`
    <html>
      <head>
        <title>Applicant Requests Report</title>
        <style>
          body { font-family: Arial, sans-serif; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .status-badge { padding: 2px 8px; border-radius: 12px; font-size: 10px; }
          .published { background: #d1fae5; color: #065f46; }
          .pending { background: #fef3c7; color: #92400e; }
          .rejected { background: #fee2e2; color: #991b1b; }
          .closed { background: #f3f4f6; color: #374151; }
          .draft { background: #f9fafb; color: #6b7280; }
        </style>
      </head>
      <body>
        <h1>Applicant Requests Report</h1>
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

// Define action options for each status
const statusActions = {
  pending: ['view_details', 'approve', 'reject'],
  approved: ['view_details'],
  rejected: ['view_details'],
};

// Generate dropdown content based on status
function generateDropdownContent(status) {
  const actions = statusActions[status] || [];
  return actions.map(action => 
    `<a href="#" class="dropdown-item" data-action="${action}" data-translate="${action}">${getTranslation(action)}</a>`
  ).join('');
}

// Get translation for action
function getTranslation(action) {
  const currentLang = localStorage.getItem('site-lang') || 'en';
  const translations = {
    en: {
      preview: 'Preview',
      edit: 'Edit',
      publish: 'Publish',
      program_requests: 'Program Requests',
      view_details: 'View Details',
      approve: 'Approve',
      reject: 'Reject'
    },
    ar: {
      preview: 'معاينة',
      edit: 'تعديل',
      publish: 'نشر',
      program_requests: 'طلبات البرنامج',
      view_details: 'تفاصيل',
      approve: 'تقبل',
      reject: 'رفض'
    }
  };
  return translations[currentLang]?.[action] || action;
}

// Populate all dropdown menus
function populateDropdownMenus() {
  const dropdownMenus = document.querySelectorAll('.dropdown-menu[data-status]');
  
  dropdownMenus.forEach(dropdown => {
    const status = dropdown.getAttribute('data-status');
    dropdown.innerHTML = generateDropdownContent(status);
  });
}

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
  const action = e.target.getAttribute('data-action');
  const row = e.target.closest('tr');
  const applicantName = row.querySelector('.applicant-name span').textContent;
  const programName = row.querySelector('.program-name span').textContent;
  const status = e.target.closest('.dropdown-menu').getAttribute('data-status');
  
  console.log(`Action "${action}" clicked for program: ${programName} (Status: ${status})`);
  
  // Handle different actions
  switch(action) {
    case 'preview':
      showNotification(`Previewing ${programName} for ${applicantName}`, 'info');
      break;
    case 'edit':
      showNotification(`Editing ${programName} for ${applicantName}`, 'info');
      break;
    case 'program_requests':
      showNotification(`Viewing requests for ${programName} for ${applicantName}`, 'info');
      break;
    case 'publish':
      showNotification(`Publishing ${programName}`, 'success');
      // Update status to published
      updateProgramStatus(row, 'published');
      break;
  }
  
  // Close dropdown
  const dropdown = e.target.closest('.dropdown-menu');
  dropdown.style.opacity = '0';
  dropdown.style.visibility = 'hidden';
  dropdown.style.transform = 'translateY(-10px)';
}

// Update program status and refresh dropdown
function updateProgramStatus(row, newStatus) {
  const statusBadge = row.querySelector('.status-badge');
  const dropdown = row.querySelector('.dropdown-menu');
  
  if (statusBadge && dropdown) {
    // Update status badge
    statusBadge.className = `status-badge ${newStatus}`;
    statusBadge.textContent = getTranslation(newStatus);
    statusBadge.setAttribute('data-translate', newStatus);
    
    // Update dropdown status and content
    dropdown.setAttribute('data-status', newStatus);
    dropdown.innerHTML = generateDropdownContent(newStatus);
    
    // Re-apply translations to new dropdown items
    const currentLang = localStorage.getItem('site-lang') || 'en';
    const dropdownItems = dropdown.querySelectorAll('[data-translate]');
    dropdownItems.forEach(item => {
      const key = item.getAttribute('data-translate');
      const translation = getTranslation(key);
      if (translation) {
        item.textContent = translation;
      }
    });
    
    showNotification(`Applicant request status updated to ${getTranslation(newStatus)}`, 'success');
  }
}

// Refresh all dropdown content (useful after language changes)
function refreshAllDropdowns() {
  const dropdownMenus = document.querySelectorAll('.dropdown-menu[data-status]');
  
  dropdownMenus.forEach(dropdown => {
    const status = dropdown.getAttribute('data-status');
    dropdown.innerHTML = generateDropdownContent(status);
    
    // Apply translations to new content
    const currentLang = localStorage.getItem('site-lang') || 'en';
    const dropdownItems = dropdown.querySelectorAll('[data-translate]');
    dropdownItems.forEach(item => {
      const key = item.getAttribute('data-translate');
      const translation = getTranslation(key);
      if (translation) {
        item.textContent = translation;
      }
    });
  });
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
  const visibleRows = document.querySelectorAll('.programs-table tbody tr:not([style*="display: none"])');
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

// ===== ADD PROGRAM =====

// Handle add program button
function handleAddProgram() {
  // showNotification('Add Program feature coming soon!', 'info');
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
  // Reset all tab buttons to "All"
  tabButtons.forEach(tab => tab.classList.remove('active'));
  const allTab = document.querySelector('.tab-btn[data-tab="all"]');
  if (allTab) {
    allTab.classList.add('active');
  }
  
  // Clear search input
  if (searchInput) {
    searchInput.value = '';
  }
  
  // Show all rows
  const tableRows = document.querySelectorAll('.programs-table tbody tr');
  tableRows.forEach(row => {
    row.style.display = '';
  });
  
  // Update pagination
  updatePaginationInfo();
  
  showNotification('All filters cleared successfully', 'success');
}

// Show status filter modal (placeholder)
function showStatusFilterModal() {
  showNotification('Status filter modal coming soon!', 'info');
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

  // Tab buttons
  tabButtons.forEach(tab => {
    tab.addEventListener('click', handleTabClick);
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
  
  // Add program button
  if (addProgramBtn) {
    addProgramBtn.addEventListener('click', handleAddProgram);
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

// Initialize programs page
function initializeProgramsPage() {
  // Initialize language state from localStorage
  initializeLanguageState();
  
  initializeEventListeners();
  updatePaginationInfo();
  populateDropdownMenus(); // Populate dropdowns after initialization
  
  console.log('Programs page initialized successfully');
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
  
  // Refresh dropdown content with new language
  refreshAllDropdowns();
  
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
  
  // Refresh dropdown content with new language
  refreshAllDropdowns();
  
  // Store language preference in localStorage
  localStorage.setItem('site-lang', lang);
  
  console.log(`Language switched to: ${lang}`);
  
  // Debug: Log current language state
  console.log('Current language state:', {
    localStorage: localStorage.getItem('site-lang'),
    htmlDir: document.documentElement.getAttribute('dir'),
    bodyDir: document.body.getAttribute('dir'),
    activeButton: document.querySelector('.lang-btn.active')?.getAttribute('data-lang')
  });
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

// Apply translations (reuse from admin-dashboard.js)
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
      
      // Programs page
      add_program: 'Add Program',
      add_filter: 'Add Filter',
      clear_filter: 'Clear Filter',
      all: 'All',
      pending: 'Pending',
      published: 'Published',
      rejected: 'Rejected',
      closed: 'Closed',
      draft: 'Draft',
      copy: 'Copy',
      csv: 'CSV',
      pdf: 'PDF',
      print: 'Print',
      column_visibility: 'Column visibility',
      search_programs: 'Search programs...',
      program_name: 'Program Name',
      vendor: 'Vendor',
      duration: 'Duration',
      location: 'Location',
      date_to: 'Date To',
      date_from: 'Date From',
      status: 'Status',
      actions: 'Actions',
      preview: 'Preview',
      edit: 'Edit',
      program_requests: 'Program Requests',
      publish: 'Publish',
      showing_entries: 'Showing 1 to 05 of 12 entries',
      
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
      
      // Programs page
      add_program: 'إضافة برنامج',
      add_filter: 'إضافة فلتر',
      clear_filter: 'مسح الفلتر',
      all: 'الكل',
      pending: 'قيد الانتظار',
      published: 'منشور',
      rejected: 'مرفوض',
      closed: 'مغلق',
      draft: 'مسودة',
      copy: 'نسخ',
      csv: 'CSV',
      pdf: 'PDF',
      print: 'طباعة',
      column_visibility: 'رؤية الأعمدة',
      search_programs: 'البحث في البرامج...',
      program_name: 'اسم البرنامج',
      vendor: 'المورد',
      duration: 'المدة',
      location: 'الموقع',
      date_to: 'التاريخ إلى',
      date_from: 'التاريخ من',
      status: 'الحالة',
      actions: 'الإجراءات',
      preview: 'معاينة',
      edit: 'تعديل',
      program_requests: 'طلبات البرنامج',
      publish: 'نشر',
      showing_entries: 'عرض 1 إلى 05 من 12 إدخال',
      
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
document.addEventListener('DOMContentLoaded', initializeProgramsPage);

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