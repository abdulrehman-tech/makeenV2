// ===== DOM ELEMENTS =====
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const menuToggle = document.getElementById('menuToggle');
const userToggle = document.getElementById('userToggle');
const userDropdown = document.getElementById('userDropdown');
const langButtons = document.querySelectorAll('.lang-btn');

// ===== SIDEBAR FUNCTIONALITY =====

// Toggle sidebar on mobile
function toggleSidebar() {
  const isOpen = sidebar.classList.contains('show');
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  
  console.log('Toggle sidebar - isOpen:', isOpen, 'isRTL:', isRTL, 'window width:', window.innerWidth);
  
  if (isOpen) {
    closeSidebar();
  } else {
    openSidebar();
  }
}

// Open sidebar on mobile
function openSidebar() {
  if (window.innerWidth <= 768) {
    sidebar.classList.add('show');
    document.body.style.overflow = 'hidden';
    console.log('Sidebar opened on mobile - RTL:', document.documentElement.getAttribute('dir') === 'rtl');
  }
}

// Close sidebar on mobile
function closeSidebar() {
  if (window.innerWidth <= 768) {
    sidebar.classList.remove('show');
    // Ensure scrolling is enabled
    enableScrolling();
    console.log('Sidebar closed on mobile');
  }
}

// Event listeners for sidebar
if (sidebarToggle) {
  sidebarToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSidebar();
  });
}

if (menuToggle) {
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSidebar();
  });
}

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
  if (window.innerWidth <= 768) {
    if (!sidebar.contains(e.target) && 
        !menuToggle.contains(e.target) && 
        !sidebarToggle.contains(e.target)) {
      closeSidebar();
    }
  }
});

// Close sidebar when pressing Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && window.innerWidth <= 768) {
    closeSidebar();
  }
});

// Ensure scrolling is enabled on touch/scroll events (mobile fix)
document.addEventListener('touchstart', () => {
  if (window.innerWidth <= 768 && !sidebar.classList.contains('show')) {
    enableScrolling();
  }
});

document.addEventListener('scroll', () => {
  if (window.innerWidth <= 768 && !sidebar.classList.contains('show')) {
    enableScrolling();
  }
});

// ===== USER DROPDOWN FUNCTIONALITY =====

// Toggle user dropdown
function toggleUserDropdown() {
  userDropdown.classList.toggle('show');
}

// Close user dropdown when clicking outside
function closeUserDropdown() {
  userDropdown.classList.remove('show');
}

// Event listeners for user dropdown
if (userToggle) {
  userToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleUserDropdown();
  });
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!userToggle.contains(e.target) && !userDropdown.contains(e.target)) {
    closeUserDropdown();
  }
});

// ===== TRANSLATIONS =====

// Translation dictionary
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
    
    // Statistics cards
    total_programs: 'Total Programs',
    program_requests: 'Program Requests',
    reimbursements: 'Reimbursements',
    
    // Charts
    statistics: 'Statistics',
    program_requests_over_time: 'Program Requests Over Time',
    total_program_requests: 'Total Program Requests',
    active_vendors: 'Active Vendors',
    active_applicants: 'Active Applicants',
    active_programs: 'Active Programs',
    active: 'Active',
    inactive: 'Inactive',
    
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
    
    // Statistics cards
    total_programs: 'إجمالي البرامج',
    program_requests: 'طلبات البرامج',
    reimbursements: 'الاستردادات',
    
    // Charts
    statistics: 'الإحصائيات',
    program_requests_over_time: 'طلبات البرامج عبر الزمن',
    total_program_requests: 'إجمالي طلبات البرامج',
    active_vendors: 'الموردين النشطين',
    active_applicants: 'المتقدمين النشطين',
    active_programs: 'البرامج النشطة',
    active: 'نشط',
    inactive: 'غير نشط',
    
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

// Apply translations
function applyTranslations(lang) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
}

// ===== LANGUAGE SWITCHING =====

// Global chart variable
let mainChart = null;

// Switch language function
function switchLanguage(lang) {
  // Update language buttons
  langButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-lang="${lang}"]`).classList.add('active');

  // Apply language styles
  applyLanguageStyles(lang);
  
  // Apply translations
  applyTranslations(lang);
  
  // Reinitialize chart for RTL support
  cleanupChart();
  // Small delay to ensure canvas is cleared
  setTimeout(() => {
    mainChart = initializeMainChart();
  }, 10);
  
  // Store language preference
  localStorage.setItem('site-lang', lang);
  
  console.log(`Language switched to: ${lang}`);
}

// Apply language-specific styles
function applyLanguageStyles(lang) {
  const html = document.documentElement;
  const body = document.body;
  
  if (lang === 'ar') {
    // Arabic/RTL styles
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
    body.classList.add('rtl-lang');
    body.classList.add('arabic-font');
    
    console.log('RTL mode activated - HTML dir:', html.getAttribute('dir'));
    console.log('RTL mode activated - Body classes:', body.className);
    
    // Force a reflow to ensure CSS is applied
    setTimeout(() => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        sidebar.style.display = 'none';
        sidebar.offsetHeight; // Force reflow
        sidebar.style.display = '';
        console.log('Sidebar reflow forced for RTL');
      }
    }, 100);
    
    // Load Tajawal font if not already loaded
    if (!document.getElementById('tajawal-font')) {
      const link = document.createElement('link');
      link.id = 'tajawal-font';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
    
    // Update font family
    body.style.fontFamily = '"Tajawal", Arial, sans-serif';
    html.style.fontFamily = '"Tajawal", Arial, sans-serif';
    
  } else {
    // English/LTR styles
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
    body.classList.remove('rtl-lang');
    body.classList.remove('arabic-font');
    
    // Reset to Poppins font
    body.style.fontFamily = '"Poppins", sans-serif';
    html.style.fontFamily = '"Poppins", sans-serif';
  }
}

// Event listeners for language switching
langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang');
    switchLanguage(lang);
  });
});

// ===== RESPONSIVE HANDLING =====

// Ensure scrolling is enabled
function enableScrolling() {
  document.body.style.overflow = '';
  document.body.style.overflow = 'auto';
  document.documentElement.style.overflow = '';
  document.documentElement.style.overflow = 'auto';
}

// Ensure header stays fixed by removing any interfering inline styles
function ensureFixedHeader() {
  const header = document.querySelector('.header');
  if (header) {
    // Remove any inline styles that might interfere with CSS fixed positioning
    header.style.removeProperty('position');
    header.style.removeProperty('top');
    header.style.removeProperty('z-index');
    header.style.removeProperty('left');
    header.style.removeProperty('right');
    
    // Force a reflow to ensure CSS fixed positioning is applied
    header.offsetHeight;
  }
}

// Handle window resize
function handleResize() {
  // Close sidebar on desktop
  if (window.innerWidth > 768) {
    sidebar.classList.remove('show');
    // Ensure scrolling is enabled on desktop
    enableScrolling();
  }
  
  // Close user dropdown on mobile
  if (window.innerWidth <= 768) {
    userDropdown.classList.remove('show');
    // Ensure scrolling is enabled when sidebar is closed on mobile
    if (!sidebar.classList.contains('show')) {
      enableScrolling();
    }
  }
  
  // Remove any inline styles that might interfere with CSS fixed positioning
  const header = document.querySelector('.header');
  if (header) {
    // Remove inline styles to let CSS handle fixed positioning
    header.style.removeProperty('position');
    header.style.removeProperty('top');
    header.style.removeProperty('z-index');
    header.style.removeProperty('left');
    header.style.removeProperty('right');
  }
}

// Event listener for window resize with throttling
window.addEventListener('resize', throttle(() => {
  handleResize();
  // Ensure fixed header after resize
  ensureFixedHeader();
}, 250));

// ===== INITIALIZATION =====

// Initialize the dashboard
function initializeDashboard() {
  // Load saved language preference
  const savedLang = localStorage.getItem('site-lang');
  if (savedLang) {
    switchLanguage(savedLang);
  } else {
    // Apply default English translations
    applyTranslations('en');
  }
  
  // Set initial sidebar state
  if (window.innerWidth <= 768) {
    sidebar.classList.remove('show');
  }
  
  // Initialize charts
  cleanupChart(); // Ensure clean slate
  mainChart = initializeMainChart();
  initializeCircularCharts();
  
  // Ensure header is fixed on initialization
  ensureFixedHeader();
  
  console.log('Dashboard initialized successfully');
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeDashboard);

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ===== CHARTS INITIALIZATION =====

// Clean up existing chart
function cleanupChart() {
  if (mainChart) {
    mainChart.destroy();
    mainChart = null;
  }
  // Also destroy any other charts that might exist
  Chart.helpers.each(Chart.instances, function(instance) {
    if (instance.chart.canvas.id === 'programRequestsChart') {
      instance.chart.destroy();
    }
  });
}

// Initialize main line chart
function initializeMainChart() {
  const ctx = document.getElementById('programRequestsChart');
  if (!ctx) return;

  // Clean up any existing charts
  cleanupChart();

  // Check if RTL is active
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

  // Data arrays
  const months = isRTL ? 
    ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'] :
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = [320, 450, 580, 420, 380, 520, 680, 480, 550, 720, 480, 620];

  // Reverse arrays for RTL
  const chartLabels = isRTL ? [...months].reverse() : months;
  const chartData = isRTL ? [...data].reverse() : data;

  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: chartLabels,
      datasets: [{
        label: 'Program Requests',
        data: chartData,
        borderColor: '#8280ff',
        backgroundColor: 'rgba(130, 128, 255, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#8280ff',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          right: isRTL ? 20 : 0,
          left: isRTL ? 0 : 20
        }
      },
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          position: isRTL ? 'right' : 'left',
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
            drawBorder: false
          },
          ticks: {
            color: '#6b7280',
            font: {
              size: 12,
              family: isRTL ? '"Tajawal", Arial, sans-serif' : '"Poppins", sans-serif'
            }
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#6b7280',
            font: {
              size: 12,
              family: isRTL ? '"Tajawal", Arial, sans-serif' : '"Poppins", sans-serif'
            }
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  });

  return chart;
}

// Initialize circular progress charts
function initializeCircularCharts() {
  const progressRings = document.querySelectorAll('.progress-ring-fill');
  
  progressRings.forEach(ring => {
    const progress = ring.getAttribute('data-progress');
    const circumference = 2 * Math.PI * 54; // r = 54
    const offset = circumference - (progress / 100) * circumference;
    
    ring.style.strokeDasharray = circumference;
    ring.style.strokeDashoffset = offset;
  });
}

// ===== EXPORT FOR MODULE USE (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    switchLanguage,
    toggleSidebar,
    closeSidebar,
    toggleUserDropdown,
    closeUserDropdown,
    initializeMainChart,
    initializeCircularCharts
  };
} 