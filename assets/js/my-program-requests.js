// ===== MY PROGRAM REQUESTS PAGE FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeTabs();
    initializeSearch();
    initializeFilters();
    initializeActions();
    initializePagination();
    initializeExport();
    initializeLanguageSwitching();
    initializeUserDropdown();
    initializeSidebar();
});

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tableRows = document.querySelectorAll('.program-requests-table tbody tr');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter table rows based on status
            filterTableByStatus(targetTab);
        });
    });
}

// Filter table rows by status
function filterTableByStatus(status) {
    const tableRows = document.querySelectorAll('.program-requests-table tbody tr');
    let visibleCount = 0;
    
    tableRows.forEach(row => {
        const statusBadge = row.querySelector('.status-badge');
        const rowStatus = statusBadge.classList.contains('approved') ? 'approved' :
                         statusBadge.classList.contains('pending') ? 'pending' :
                         statusBadge.classList.contains('rejected') ? 'rejected' :
                         statusBadge.classList.contains('need_more_info') ? 'need_more_info' : 'unknown';
        
        if (status === 'all' || rowStatus === status) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    updatePaginationInfo(visibleCount);
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input input');
    const statusDropdown = document.querySelector('.status-dropdown select');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterTable(searchTerm, statusDropdown ? statusDropdown.value : 'all');
        });
    }
    
    if (statusDropdown) {
        statusDropdown.addEventListener('change', function() {
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            filterTable(searchTerm, this.value);
        });
    }
}

// Filter table based on search and status
function filterTable(searchTerm, statusFilter) {
    const tableRows = document.querySelectorAll('.program-requests-table tbody tr');
    let visibleCount = 0;
    
    tableRows.forEach(row => {
        const programName = row.querySelector('.program-name span').textContent.toLowerCase();
        const vendorName = row.querySelector('.vendor-name span').textContent.toLowerCase();
        const statusBadge = row.querySelector('.status-badge');
        const rowStatus = statusBadge.classList.contains('approved') ? 'approved' :
                         statusBadge.classList.contains('pending') ? 'pending' :
                         statusBadge.classList.contains('rejected') ? 'rejected' :
                         statusBadge.classList.contains('need_more_info') ? 'need_more_info' : 'unknown';
        
        const matchesSearch = searchTerm === '' || 
                             programName.includes(searchTerm) || 
                             vendorName.includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || rowStatus === statusFilter;
        
        if (matchesSearch && matchesStatus) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });
    
    updatePaginationInfo(visibleCount);
}

// Filter functionality
function initializeFilters() {
    const addFilterBtn = document.querySelector('.add-filter');
    const clearFilterBtn = document.querySelector('.clear-filter');
    
    if (addFilterBtn) {
        addFilterBtn.addEventListener('click', function() {
            // Implement add filter functionality
            console.log('Add filter clicked');
        });
    }
    
    if (clearFilterBtn) {
        clearFilterBtn.addEventListener('click', function() {
            // Clear all filters
            const searchInput = document.querySelector('.search-input input');
            const statusDropdown = document.querySelector('.status-dropdown select');
            const tabButtons = document.querySelectorAll('.tab-btn');
            
            if (searchInput) searchInput.value = '';
            if (statusDropdown) statusDropdown.value = 'all';
            
            // Reset to "All" tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelector('.tab-btn[data-tab="all"]').classList.add('active');
            
            // Show all rows
            filterTable('', 'all');
        });
    }
}

// Actions dropdown functionality
function initializeActions() {
    const actionDropdowns = document.querySelectorAll('.actions-dropdown');
    
    actionDropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.actions-btn');
        const menu = dropdown.querySelector('.dropdown-menu');
        const status = menu.getAttribute('data-status');
        
        // Populate dropdown menu based on status
        populateActionMenu(menu, status);
        
        // Handle dropdown visibility
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            closeAllDropdowns();
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateY(0)';
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        closeAllDropdowns();
    });
}

// Populate action menu based on status
function populateActionMenu(menu, status) {
    let menuItems = '';
    
    switch(status) {
        case 'pending':
            menuItems = `
                <a href="#" class="dropdown-item">
                    <i class="fas fa-eye"></i>
                    <span>View Details</span>
                </a>
                <a href="#" class="dropdown-item">
                    <i class="fas fa-edit"></i>
                    <span>Edit Application</span>
                </a>
                <a href="#" class="dropdown-item">
                    <i class="fas fa-times"></i>
                    <span>Cancel Application</span>
                </a>
            `;
            break;
        case 'approved':
            menuItems = `
                <a href="#" class="dropdown-item">
                    <i class="fas fa-eye"></i>
                    <span>View Details</span>
                </a>
                <a href="#" class="dropdown-item">
                    <i class="fas fa-download"></i>
                    <span>Download Certificate</span>
                </a>
                <a href="#" class="dropdown-item">
                    <i class="fas fa-star"></i>
                    <span>Rate Program</span>
                </a>
            `;
            break;
        case 'rejected':
            menuItems = `
                <a href="#" class="dropdown-item">
                    <i class="fas fa-eye"></i>
                    <span>View Details</span>
                </a>
                <a href="#" class="dropdown-item">
                    <i class="fas fa-redo"></i>
                    <span>Reapply</span>
                </a>
                <a href="#" class="dropdown-item">
                    <i class="fas fa-question-circle"></i>
                    <span>Appeal Decision</span>
                </a>
            `;
            break;
        case 'need_more_info':
            menuItems = `
                <a href="#" class="dropdown-item">
                    <i class="fas fa-eye"></i>
                    <span>View Details</span>
                </a>
                <a href="#" class="dropdown-item">
                    <i class="fas fa-upload"></i>
                    <span>Submit Information</span>
                </a>
                <a href="#" class="dropdown-item">
                    <i class="fas fa-comment"></i>
                    <span>Contact Support</span>
                </a>
            `;
            break;
        default:
            menuItems = `
                <a href="#" class="dropdown-item">
                    <i class="fas fa-eye"></i>
                    <span>View Details</span>
                </a>
            `;
    }
    
    menu.innerHTML = menuItems;
    
    // Add click handlers to menu items
    const menuItemElements = menu.querySelectorAll('.dropdown-item');
    menuItemElements.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.querySelector('span').textContent;
            handleActionClick(action);
            closeAllDropdowns();
        });
    });
}

// Handle action clicks
function handleActionClick(action) {
    switch(action) {
        case 'View Details':
            console.log('Viewing program details...');
            break;
        case 'Edit Application':
            console.log('Editing application...');
            break;
        case 'Cancel Application':
            if (confirm('Are you sure you want to cancel this application?')) {
                console.log('Application cancelled');
            }
            break;
        case 'Download Certificate':
            console.log('Downloading certificate...');
            break;
        case 'Rate Program':
            console.log('Opening rating dialog...');
            break;
        case 'Reapply':
            console.log('Starting reapplication process...');
            break;
        case 'Appeal Decision':
            console.log('Opening appeal form...');
            break;
        default:
            console.log('Unknown action:', action);
    }
}

// Close all dropdown menus
function closeAllDropdowns() {
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    dropdownMenus.forEach(menu => {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        menu.style.transform = 'translateY(-10px)';
    });
}

// Pagination functionality
function initializePagination() {
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    const entriesSelect = document.querySelector('.entries-per-page select');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const page = this.getAttribute('data-page');
            
            if (action) {
                handlePaginationAction(action);
            } else if (page) {
                goToPage(parseInt(page));
            }
        });
    });
    
    if (entriesSelect) {
        entriesSelect.addEventListener('change', function() {
            const entriesPerPage = parseInt(this.value);
            updateEntriesPerPage(entriesPerPage);
        });
    }
}

// Handle pagination actions
function handlePaginationAction(action) {
    const currentPage = document.querySelector('.pagination-btn.active');
    const currentPageNum = currentPage ? parseInt(currentPage.getAttribute('data-page')) : 1;
    
    switch(action) {
        case 'first':
            goToPage(1);
            break;
        case 'prev':
            if (currentPageNum > 1) {
                goToPage(currentPageNum - 1);
            }
            break;
        case 'next':
            goToPage(currentPageNum + 1);
            break;
        case 'last':
            // Implement last page logic
            goToPage(3); // Placeholder
            break;
    }
}

// Go to specific page
function goToPage(pageNum) {
    const paginationButtons = document.querySelectorAll('.pagination-btn[data-page]');
    
    paginationButtons.forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.getAttribute('data-page')) === pageNum) {
            btn.classList.add('active');
        }
    });
    
    // Here you would implement actual pagination logic
    console.log('Going to page:', pageNum);
}

// Update entries per page
function updateEntriesPerPage(entriesPerPage) {
    console.log('Entries per page changed to:', entriesPerPage);
    // Implement pagination logic based on entries per page
}

// Update pagination info
function updatePaginationInfo(visibleCount) {
    const paginationInfo = document.querySelector('.pagination-info span');
    if (paginationInfo) {
        const entriesSelect = document.querySelector('.entries-per-page select');
        const entriesPerPage = entriesSelect ? parseInt(entriesSelect.value) : 5;
        const totalEntries = visibleCount;
        const showing = Math.min(entriesPerPage, totalEntries);
        
        paginationInfo.textContent = `Showing 1 to ${showing} of ${totalEntries} entries`;
    }
}

// Export functionality
function initializeExport() {
    const exportButtons = document.querySelectorAll('.export-btn');
    
    exportButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleExport(action);
        });
    });
}

// Handle export actions
function handleExport(action) {
    switch(action) {
        case 'csv':
            exportToCSV();
            break;
        case 'pdf':
            exportToPDF();
            break;
        case 'print':
            window.print();
            break;
        default:
            console.log('Unknown export action:', action);
    }
}

// Export to CSV
function exportToCSV() {
    const table = document.querySelector('.program-requests-table');
    const rows = table.querySelectorAll('tr:not([style*="display: none"])');
    let csv = [];
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('th, td');
        const rowData = [];
        
        cells.forEach(cell => {
            // Extract text content, handling complex structures
            let cellText = '';
            if (cell.querySelector('.program-info span')) {
                cellText = cell.querySelector('.program-info span').textContent;
            } else if (cell.querySelector('.vendor-name span')) {
                cellText = cell.querySelector('.vendor-name span').textContent;
            } else if (cell.querySelector('.status-badge')) {
                cellText = cell.querySelector('.status-badge').textContent;
            } else {
                cellText = cell.textContent.trim();
            }
            
            // Escape quotes and wrap in quotes if contains comma
            cellText = cellText.replace(/"/g, '""');
            if (cellText.includes(',')) {
                cellText = `"${cellText}"`;
            }
            
            rowData.push(cellText);
        });
        
        csv.push(rowData.join(','));
    });
    
    // Download CSV
    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-program-requests.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

// Export to PDF (placeholder - would need a PDF library)
function exportToPDF() {
    console.log('PDF export functionality would be implemented here');
    alert('PDF export functionality coming soon!');
}

// Utility function to get visible row count
function getVisibleRowCount() {
    const visibleRows = document.querySelectorAll('.program-requests-table tbody tr:not([style*="display: none"])');
    return visibleRows.length;
}

// ===== LANGUAGE SWITCHING FUNCTIONALITY =====

// Translation dictionary
const translations = {
    en: {
        // Navigation
        home: 'Home',
        my_program_requests: 'My Program Requests',
        my_profile: 'My Profile',
        reimbursement: 'Reimbursement',
        
        // User menu
        admin: 'Admin',
        profile: 'Profile',
        settings: 'Settings',
        logout: 'Logout',
        
        // Page content
        add_filter: 'Add Filter',
        clear_filter: 'Clear Filter',
        all: 'All',
        pending: 'Pending',
        approved: 'Approved',
        rejected: 'Rejected',
        need_more_info: 'Need More Info',
        csv: 'CSV',
        pdf: 'PDF',
        print: 'Print',
        all_status: 'All Status',
        search_program_requests: 'Search program requests...',
        
        // Table headers
        program_name: 'Program Name',
        vendor: 'Vendor',
        applied_on: 'Applied On',
        status: 'Status',
        actions: 'Actions',
        
        // Pagination
        showing_entries: 'Showing 1 to 05 of 06 entries',
        
        // Footer
        ministry_info: 'Ministry of Transport, Communications and Information Technology',
        global_computer_services: 'Global Computer Services LLC'
    },
    ar: {
        // Navigation
        home: 'الرئيسية',
        my_program_requests: 'طلبات البرامج الخاصة بي',
        my_profile: 'ملفي الشخصي',
        reimbursement: 'الاسترداد',
        
        // User menu
        admin: 'المدير',
        profile: 'الملف الشخصي',
        settings: 'الإعدادات',
        logout: 'تسجيل الخروج',
        
        // Page content
        add_filter: 'إضافة فلتر',
        clear_filter: 'مسح الفلتر',
        all: 'الكل',
        pending: 'قيد الانتظار',
        approved: 'موافق عليه',
        rejected: 'مرفوض',
        need_more_info: 'يحتاج معلومات إضافية',
        csv: 'CSV',
        pdf: 'PDF',
        print: 'طباعة',
        all_status: 'جميع الحالات',
        search_program_requests: 'البحث في طلبات البرامج...',
        
        // Table headers
        program_name: 'اسم البرنامج',
        vendor: 'المورد',
        applied_on: 'تاريخ التقديم',
        status: 'الحالة',
        actions: 'الإجراءات',
        
        // Pagination
        showing_entries: 'عرض 1 إلى 05 من 06 إدخال',
        
        // Footer
        ministry_info: 'وزارة النقل والاتصالات وتقنية المعلومات',
        global_computer_services: 'شركة الخدمات الحاسوبية العالمية ذ.م.م'
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
    
    // Handle placeholder translations
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
}

// Switch language function
function switchLanguage(lang) {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Update language buttons
    langButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');

    // Apply language styles
    applyLanguageStyles(lang);
    
    // Apply translations
    applyTranslations(lang);
    
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

// Initialize language switching
function initializeLanguageSwitching() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Event listeners for language switching
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
    
    // Load saved language preference
    const savedLang = localStorage.getItem('site-lang');
    if (savedLang) {
        switchLanguage(savedLang);
    } else {
        // Apply default English translations
        applyTranslations('en');
    }
}

// ===== USER DROPDOWN FUNCTIONALITY =====

// Initialize user dropdown
function initializeUserDropdown() {
    const userToggle = document.getElementById('userToggle');
    const userDropdown = document.getElementById('userDropdown');
    
    if (!userToggle || !userDropdown) return;
    
    // Toggle user dropdown
    userToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdown.classList.toggle('show');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!userToggle.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove('show');
        }
    });
    
    // Close dropdown when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            userDropdown.classList.remove('show');
        }
    });
}

// ===== SIDEBAR FUNCTIONALITY =====

// Initialize sidebar
function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const menuToggle = document.getElementById('menuToggle');
    
    if (!sidebar) return;
    
    // Toggle sidebar function
    function toggleSidebar() {
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('show');
            if (sidebar.classList.contains('show')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }
    
    // Event listeners for sidebar toggles
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebar();
        });
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleSidebar();
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && 
                !menuToggle?.contains(e.target) && 
                !sidebarToggle?.contains(e.target)) {
                sidebar.classList.remove('show');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Close sidebar when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && window.innerWidth <= 768) {
            sidebar.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
}
