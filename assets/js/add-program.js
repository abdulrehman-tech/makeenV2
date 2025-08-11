// Add Program Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeAddProgramPage();
    initializeLanguageState();
    
    // Listen for language changes
    const langButtons = document.querySelectorAll('.lang-btn');
    if (langButtons.length > 0) {
        langButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                if (lang) {
                    switchLanguage(lang);
                }
            });
        });
    }
});

function initializeAddProgramPage() {
    initializeTabs();
    initializeFileUploads();
    initializeFormValidation();
    initializeSectionManagement();
    initializeFormActions();
    initializeProgramTypeToggle();
    initializeModal();
    initializeRichTextEditor();
    initializeDragAndDrop();
    initializeQuestionnaire();
    initializeAttachments();
    initializePartnerLogos();
    initializeFAQs();
    
    // Apply translations
    const currentLang = localStorage.getItem('site-lang') || 'en';
    applyTranslations(currentLang);
}

// Language Management
function initializeLanguageState() {
    const savedLang = localStorage.getItem('site-lang');
    if (savedLang) {
        applyLanguageState(savedLang);
    } else {
        applyLanguageState('en');
    }
}

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

// Global translation functions
const logDebug = (message, data) => {
  // Debug logging is disabled in production
  // Uncomment the line below to enable debug logging
  // console.log(`[Translation] ${message}`, data || '');
};

// Function to apply RTL/LTR direction
function applyDirection(lang) {
  const html = document.documentElement;
  const body = document.body;
  
  // Remove all direction classes first
  html.classList.remove('rtl', 'ltr');
  body.classList.remove('rtl', 'ltr');
  
  if (lang === 'ar') {
    // For RTL languages (Arabic)
    html.setAttribute('dir', 'rtl');
    body.setAttribute('dir', 'rtl');
    html.lang = 'ar';
    html.classList.add('rtl');
    body.classList.add('rtl');
  } else {
    // For LTR languages (English)
    html.setAttribute('dir', 'ltr');
    body.setAttribute('dir', 'ltr');
    html.lang = 'en';
    html.classList.add('ltr');
    body.classList.add('ltr');
  }
  
  // Force a reflow to ensure styles are recalculated
  document.body.offsetHeight;
  
  // Dispatch a custom event for other components to react to language changes
  document.dispatchEvent(new CustomEvent('languageChanged', { 
    detail: { 
      language: lang,
      direction: lang === 'ar' ? 'rtl' : 'ltr'
    } 
  }));
}

// Function to force language change
function forceLanguageChange(lang) {
  logDebug(`Force changing language to: ${lang}`);
  
  // Update localStorage
  localStorage.setItem('site-lang', lang);
  
  // Update UI state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Apply RTL/LTR direction
  applyDirection(lang);
  
  // Try to use the translation system if available
  if (typeof window.setLangText === 'function') {
    logDebug('Using setLangText function');
    window.setLangText(lang);
  } else {
    logDebug('setLangText not available, reloading page');
    window.location.reload();
  }
  
  // Force a re-render of Bootstrap components
  if (typeof bootstrap !== 'undefined') {
    const tabs = document.querySelectorAll('.tab-pane');
    tabs.forEach(tab => {
      if (tab.classList.contains('active')) {
        const tabId = tab.getAttribute('id');
        const tabTrigger = document.querySelector(`[data-bs-target="#${tabId}"]`);
        if (tabTrigger) {
          const tabInstance = bootstrap.Tab.getInstance(tabTrigger) || new bootstrap.Tab(tabTrigger);
          tabInstance.show();
        }
      }
    });
  }
}

// Update language buttons and apply styles
function switchLanguage(lang) {
  logDebug(`Switching language to: ${lang}`);
  
  // Update UI state for language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Apply language styles and direction
  applyDirection(lang);
  
  // Apply translations
  if (typeof applyTranslations === 'function') {
    applyTranslations(lang);
  } else if (typeof window.setLangText === 'function') {
    window.setLangText(lang);
  }
  
  // Store language preference in localStorage
  localStorage.setItem('site-lang', lang);
  
  // Force a reflow to ensure styles are recalculated
  document.body.offsetHeight;
  
  logDebug(`Language switched to: ${lang}`);
  
  // Dispatch a custom event in case other components need to react to language changes
  document.dispatchEvent(new CustomEvent('languageChanged', { 
    detail: { 
      language: lang,
      direction: lang === 'ar' ? 'rtl' : 'ltr'
    } 
  }));
}

// Initialize translation system when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  logDebug('DOM fully loaded, initializing translation system...');
  
  // Check if translation system is available
  const translationAvailable = typeof window.setLangText === 'function' && 
                             typeof window.translations !== 'undefined';
  
  logDebug('Translation system available:', translationAvailable);
  
  // Get current language
  const currentLang = localStorage.getItem('site-lang') || 'en';
  logDebug('Current language:', currentLang);
  
  // Apply current language
  switchLanguage(currentLang);
  
  // Add click handlers to language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const lang = this.getAttribute('data-lang');
      if (lang && lang !== currentLang) {
        logDebug('Language button clicked, switching to:', lang);
        forceLanguageChange(lang);
      }
      return false;
    });
  });
  
  // If attachLanguageSwitcherEvents exists, use it
  if (typeof window.attachLanguageSwitcherEvents === 'function') {
    logDebug('Attaching language switcher events');
    window.attachLanguageSwitcherEvents();
  }
  
  // Debug information has been removed from production
});

function applyLanguageStyles(lang) {
    const html = document.documentElement;
    const body = document.body;
    
    // Remove all language-related classes first
    html.classList.remove('rtl-lang', 'ltr-lang');
    body.classList.remove('rtl-lang', 'ltr-lang');
    
    if (lang === 'ar') {
        // For RTL languages (Arabic)
        html.setAttribute('dir', 'rtl');
        body.setAttribute('dir', 'rtl');
        html.lang = 'ar';
        html.classList.add('rtl-lang');
        body.classList.add('rtl-lang');
        
        // Ensure the body has the RTL class for any global styles
        document.body.classList.add('rtl');
        document.body.classList.remove('ltr');
    } else {
        // For LTR languages (English)
        html.setAttribute('dir', 'ltr');
        body.setAttribute('dir', 'ltr');
        html.lang = 'en';
        html.classList.add('ltr-lang');
        body.classList.add('ltr-lang');
        
        // Ensure the body has the LTR class for any global styles
        document.body.classList.add('ltr');
        document.body.classList.remove('rtl');
    }
}

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
            
            // Add Program Page
            add_program: 'Add Program',
            program_title: 'Program Title',
            program_short_desc: 'Program Short Description',
            english: 'English',
            arabic: 'Arabic',
            program_type: 'Program Type',
            section_title: 'Section Title',
            section: 'Section',
            question_type: 'Question Type',
            options: 'Options',
            add_option: 'Add Option',
            internal: 'Internal',
            external: 'External',
            external_program_link: 'External Program Link',
            vendor: 'Vendor',
            location: 'Location',
            location_type: 'Location Type',
            duration: 'Duration',
            language: 'Language',
            address: 'Address',
            registration_period: 'Registration Period',
            program_icon: 'Program Icon',
            banner_image: 'Banner Image',
            choose_file: 'Choose file to upload',
            basic_info: 'Basic Information',
            questionnaire: 'Questionnaire',
            required_attachments: 'Required Attachments',
            partner_logos: 'Partner Logos',
            faqs: 'FAQs',
            add_section: 'Add Section',
            questions_en: 'Questions [En]',
            questions_ar: 'Questions [Ar]',
            question: 'Question',
            answer: 'Answer',
            add_question: 'Add Question',
            edit_question: 'Edit Question',
            delete_question: 'Delete Question',
            attachment_name_en: 'Attachment Name [En]',
            attachment_name_ar: 'Attachment Name [Ar]',
            add_attachment_name: 'Add Attachment Name',
            edit_attachment: 'Edit Attachment',
            delete_attachment: 'Delete Attachment',
            upload_partner_logos: 'Upload Partner Logos',
            drag_drop_files: 'Drag & drop your files here or click to browse',
            select_files: 'Select Files',
            uploaded_logos: 'Uploaded Logos',
            no_logos_uploaded: 'No logos uploaded yet',
            add_faq: 'Add FAQ',
            edit_faq: 'Edit FAQ',
            delete_faq: 'Delete FAQ',
            question_en: 'Question [En]',
            question_ar: 'Question [Ar]',
            faq_question: 'FAQ Question',
            faq_answer: 'FAQ Answer',
            save_as_draft: 'Save as Draft',
            publish: 'Publish',
            cancel: 'Cancel',
            save: 'Save',
            actions: 'Actions',
            required_field: 'This field is required',
            invalid_url: 'Please enter a valid URL',
            invalid_email: 'Please enter a valid email address',
            invalid_number: 'Please enter a valid number',
            program_added_success: 'Program added successfully',
            program_updated_success: 'Program updated successfully',
            error_occurred: 'An error occurred. Please try again later',
            add_required_attachment: 'Add Required Attachment',
            add_attachment_name: 'Add Attachment Name',
            attachment_name: 'Attachment Name',
            save_attachment: 'Save Attachment',
            save_faq: 'Save FAQ',
            add_faq: 'Add FAQ',
            answer: 'Answer',
            question: 'Question',
            edit: 'Edit',
            delete: 'Delete',
            enter_question_en: 'Enter question in English',
            enter_question_ar: 'أدخل السؤال بالعربية',
            enter_answer_en: 'Enter answer in English',
            enter_answer_ar: 'أدخل الإجابة بالعربية',
            enter_attachment_name_en: 'Enter attachment name in English',
            enter_attachment_name_ar: 'أدخل اسم المرفق بالعربية'
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
            
            // Add Program Page
            add_program: 'إضافة برنامج',
            program_title: 'عنوان البرنامج',
            program_short_desc: 'وصف قصير للبرنامج',
            english: 'الإنجليزية',
            arabic: 'العربية',
            program_type: 'نوع البرنامج',
            section_title: 'عنوان القسم',
            section: 'القسم',
            question_type: 'نوع السؤال',
            options: 'الخيارات',
            add_option: 'إضافة خيار',
            internal: 'داخلي',
            external: 'خارجي',
            external_program_link: 'رابط البرنامج الخارجي',
            vendor: 'المزود',
            location: 'الموقع',
            location_type: 'نوع الموقع',
            duration: 'المدة',
            language: 'اللغة',
            address: 'العنوان',
            registration_period: 'فترة التسجيل',
            program_icon: 'أيقونة البرنامج',
            banner_image: 'صورة البانر',
            choose_file: 'اختر ملف للرفع',
            basic_info: 'المعلومات الأساسية',
            questionnaire: 'الاستبيان',
            required_attachments: 'المرفقات المطلوبة',
            partner_logos: 'شعارات الشركاء',
            faqs: 'الأسئلة الشائعة',
            add_section: 'إضافة قسم',
            questions_en: 'الأسئلة [الإنجليزية]',
            questions_ar: 'الأسئلة [العربية]',
            question: 'سؤال',
            answer: 'إجابة',
            add_question: 'إضافة سؤال',
            edit_question: 'تعديل السؤال',
            delete_question: 'حذف السؤال',
            attachment_name_en: 'اسم المرفق [الإنجليزية]',
            attachment_name_ar: 'اسم المرفق [العربية]',
            add_attachment_name: 'إضافة اسم مرفق',
            edit_attachment: 'تعديل المرفق',
            delete_attachment: 'حذف المرفق',
            upload_partner_logos: 'تحميل شعارات الشركاء',
            drag_drop_files: 'اسحب وأفلت الملفات هنا أو انقر للتصفح',
            select_files: 'اختر الملفات',
            uploaded_logos: 'الشعارات المرفوعة',
            no_logos_uploaded: 'لا توجد شعارات مرفوعة بعد',
            add_faq: 'إضافة سؤال متكرر',
            edit_faq: 'تعديل السؤال المتكرر',
            delete_faq: 'حذف السؤال المتكرر',
            question_en: 'السؤال [الإنجليزية]',
            question_ar: 'السؤال [العربية]',
            add_required_attachment: 'إضافة مرفق مطلوب',
            add_attachment_name: 'إضافة اسم المرفق',
            attachment_name: 'اسم المرفق',
            save_attachment: 'حفظ المرفق',
            save_faq: 'حفظ السؤال المتكرر',
            add_faq: 'إضافة سؤال متكرر',
            answer: 'إجابة',
            question: 'سؤال',
            faq_question: 'سؤال متكرر',
            faq_answer: 'إجابة السؤال المتكرر',
            save_as_draft: 'حفظ كمسودة',
            publish: 'نشر',
            cancel: 'إلغاء',
            save: 'حفظ',
            actions: 'الإجراءات',
            required_field: 'هذا الحقل مطلوب',
            invalid_url: 'الرجاء إدخال عنوان URL صالح',
            invalid_email: 'الرجاء إدخال بريد إلكتروني صالح',
            invalid_number: 'الرجاء إدخال رقم صالح',
            program_added_success: 'تمت إضافة البرنامج بنجاح',
            program_updated_success: 'تم تحديث البرنامج بنجاح',
            error_occurred: 'حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً',
            edit: 'تعديل',
            delete: 'حذف',
            enter_question_en: 'Enter question in English',
            enter_question_ar: 'أدخل السؤال بالعربية',
            enter_answer_en: 'Enter answer in English',
            enter_answer_ar: 'أدخل الإجابة بالعربية',
            enter_attachment_name_en: 'Enter attachment name in English',
            enter_attachment_name_ar: 'أدخل اسم المرفق بالعربية'
        }
    };

    // Apply translations to all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            // For input placeholders and buttons, use value instead of textContent
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                if (element.getAttribute('placeholder')) {
                    element.setAttribute('placeholder', translations[lang][key]);
                } else {
                    element.value = translations[lang][key];
                }
            } else if (element.tagName === 'BUTTON' || element.tagName === 'A') {
                // For buttons and links, check if they have a child icon
                const icon = element.querySelector('i');
                if (icon) {
                    // If button has an icon, keep it and update only text
                    const textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
                    if (textNode) {
                        textNode.nodeValue = ' ' + translations[lang][key];
                    } else {
                        element.appendChild(document.createTextNode(' ' + translations[lang][key]));
                    }
                } else {
                    element.textContent = translations[lang][key];
                }
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// Program Type Toggle for External Link
function initializeProgramTypeToggle() {
    const radioButtons = document.querySelectorAll('input[name="programType"]');
    const externalLinkRow = document.getElementById('externalLinkRow');
    const externalLinkInput = document.getElementById('externalLink');
    
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'external') {
                externalLinkRow.style.display = 'flex';
                externalLinkRow.classList.add('show');
                externalLinkInput.setAttribute('required', 'required');
            } else {
                externalLinkRow.style.display = 'none';
                externalLinkRow.classList.remove('show');
                externalLinkInput.removeAttribute('required');
                externalLinkInput.value = '';
            }
        });
    });
}

// Tab Management
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// File Upload Handling
function initializeFileUploads() {
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const display = this.parentElement.querySelector('.file-upload-display span');
            if (this.files.length > 0) {
                display.textContent = this.files[0].name;
                display.parentElement.style.borderColor = 'var(--primary-color)';
                display.parentElement.style.background = 'var(--bg-primary)';
            }
        });
    });
}

// Form Validation
function initializeFormValidation() {
    const form = document.getElementById('programForm');
    const requiredFields = form.querySelectorAll('[required]');
    
    // Real-time validation
    requiredFields.forEach(field => {
        field.addEventListener('blur', function() {
            validateField(this);
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    // Form submission validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            handleFormSubmission('publish');
        }
    });
}

function validateField(field) {
    const isValid = field.value.trim() !== '';
    
    if (isValid) {
        field.classList.remove('error');
        field.style.borderColor = 'var(--success-color)';
        removeErrorMessage(field);
    } else {
        field.classList.add('error');
        field.style.borderColor = 'var(--danger-color)';
        showErrorMessage(field, 'This field is required');
    }
    
    return isValid;
}

function validateForm() {
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function showErrorMessage(field, message) {
    removeErrorMessage(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = 'var(--danger-color)';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    
    field.parentElement.appendChild(errorDiv);
}

function removeErrorMessage(field) {
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

// Modal Management
let currentEditingSection = null;

function initializeModal() {
    const modal = document.getElementById('sectionModal');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelSection');
    const saveBtn = document.getElementById('saveSection');
    
    // Close modal events
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Save section
    saveBtn.addEventListener('click', saveSection);
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openModal(title = 'Add Section', section = null) {
    const modal = document.getElementById('sectionModal');
    const modalTitle = document.getElementById('modalTitle');
    const sectionTitleInput = document.getElementById('sectionTitle');
    const sectionContentEn = document.getElementById('sectionContentEn');
    const sectionContentAr = document.getElementById('sectionContentAr');
    
    modalTitle.textContent = title;
    currentEditingSection = section;
    
    if (section) {
        // Editing existing section
        const titleElement = section.querySelector('.section-title');
        sectionTitleInput.value = titleElement.textContent;
        
        // Load existing content if available
        const existingContentEn = section.dataset.contentEn || '';
        const existingContentAr = section.dataset.contentAr || '';
        sectionContentEn.innerHTML = existingContentEn;
        sectionContentAr.innerHTML = existingContentAr;
    } else {
        // Adding new section
        sectionTitleInput.value = '';
        sectionContentEn.innerHTML = '';
        sectionContentAr.innerHTML = '';
    }
    
    modal.classList.add('active');
    sectionTitleInput.focus();
}

function closeModal() {
    const modal = document.getElementById('sectionModal');
    modal.classList.remove('active');
    currentEditingSection = null;
}

function saveSection() {
    const sectionTitleInput = document.getElementById('sectionTitle');
    const sectionContentEn = document.getElementById('sectionContentEn');
    const sectionContentAr = document.getElementById('sectionContentAr');
    
    const title = sectionTitleInput.value.trim();
    const contentEn = sectionContentEn.innerHTML;
    const contentAr = sectionContentAr.innerHTML;
    
    if (!title) {
        showNotification('Section title is required', 'error');
        sectionTitleInput.focus();
        return;
    }
    
    if (currentEditingSection) {
        // Update existing section
        const titleElement = currentEditingSection.querySelector('.section-title');
        titleElement.textContent = title;
        currentEditingSection.dataset.contentEn = contentEn;
        currentEditingSection.dataset.contentAr = contentAr;
        showNotification('Section updated successfully', 'success');
    } else {
        // Create new section
        const sectionsContainer = document.querySelector('.tab-sections');
        const newSection = createSectionElement(title, contentEn, contentAr);
        sectionsContainer.appendChild(newSection);
        initializeSectionItem(newSection);
        selectSection(newSection);
        showNotification('Section added successfully', 'success');
    }
    
    closeModal();
}

// Section Management
function initializeSectionManagement() {
    const addSectionBtn = document.querySelector('.add-section-btn');
    const sectionItems = document.querySelectorAll('.section-item');
    
    // Add section functionality
    if (addSectionBtn) {
        addSectionBtn.addEventListener('click', function() {
            openModal('Add Section');
        });
    }
    
    // Section item interactions
    sectionItems.forEach(item => {
        initializeSectionItem(item);
    });
}

function initializeSectionItem(item) {
    const editBtn = item.querySelector('.edit-btn');
    const deleteBtn = item.querySelector('.delete-btn');
    
    // Make section draggable
    makeSectionDraggable(item);
    
    // Edit section
    if (editBtn) {
        editBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            openModal('Edit Section', item);
        });
    }
    
    // Delete section
    if (deleteBtn) {
        deleteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            deleteSection(item);
        });
    }
    
    // Select section
    item.addEventListener('click', function() {
        selectSection(this);
    });
}

// Move makeSectionDraggable function outside initializeDragAndDrop so it can be called from initializeSectionItem
function makeSectionDraggable(section) {
    section.setAttribute('draggable', 'true');
    
    section.addEventListener('dragstart', handleDragStart);
    section.addEventListener('dragover', handleDragOver);
    section.addEventListener('dragenter', handleDragEnter);
    section.addEventListener('dragleave', handleDragLeave);
    section.addEventListener('drop', handleDrop);
    section.addEventListener('dragend', handleDragEnd);
}

// Global drag handlers
let draggedElement = null;
let draggedIndex = -1;

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    
    // Get the index of the dragged element
    const sectionsContainer = document.querySelector('.tab-sections');
    const sections = Array.from(sectionsContainer.querySelectorAll('.section-item'));
    draggedIndex = sections.indexOf(this);
    
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    
    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    if (this !== draggedElement) {
        this.classList.add('drag-over');
    }
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedElement !== this) {
        const sectionsContainer = document.querySelector('.tab-sections');
        const sections = Array.from(sectionsContainer.querySelectorAll('.section-item'));
        const targetIndex = sections.indexOf(this);
        
        // Remove dragged element from its current position
        draggedElement.remove();
        
        // Insert dragged element at new position
        if (targetIndex < draggedIndex) {
            sectionsContainer.insertBefore(draggedElement, this);
        } else {
            sectionsContainer.insertBefore(draggedElement, this.nextSibling);
        }
        
        // Re-initialize the moved element
        initializeSectionItem(draggedElement);
        
        showNotification('Section order updated', 'success');
    }
    
    return false;
}

function handleDragEnd(e) {
    // Clean up
    this.classList.remove('dragging');
    
    // Remove drag-over class from all sections
    document.querySelectorAll('.section-item').forEach(item => {
        item.classList.remove('drag-over');
    });
    
    draggedElement = null;
    draggedIndex = -1;
}

function createSectionElement(title, contentEn = '', contentAr = '') {
    const sectionDiv = document.createElement('div');
    sectionDiv.className = 'section-item';
    sectionDiv.dataset.contentEn = contentEn;
    sectionDiv.dataset.contentAr = contentAr;
    sectionDiv.innerHTML = `
        <div class="section-header">
            <i class="fas fa-grip-vertical section-icon"></i>
            <span class="section-title">${title}</span>
        </div>
        <div class="section-actions">
            <button type="button" class="action-btn edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="action-btn delete-btn">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    return sectionDiv;
}

function deleteSection(item) {
    if (confirm('Are you sure you want to delete this section?')) {
        item.remove();
        showNotification('Section deleted successfully', 'success');
    }
}

function selectSection(item) {
    document.querySelectorAll('.section-item').forEach(section => {
        section.classList.remove('active');
    });
    item.classList.add('active');
}

// Form Actions
function initializeFormActions() {
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    const publishBtn = document.getElementById('publishBtn');
    
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function() {
            handleFormSubmission('draft');
        });
    }
    
    if (publishBtn) {
        publishBtn.addEventListener('click', function() {
            if (validateForm()) {
                handleFormSubmission('publish');
            }
        });
    }
}

function handleFormSubmission(action) {
    const formData = collectFormData();
    
    // Show loading state
    const submitBtn = action === 'publish' ? document.getElementById('publishBtn') : document.getElementById('saveDraftBtn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        const message = action === 'publish' ? 'Program published successfully!' : 'Program saved as draft!';
        showNotification(message, 'success');
        
        // Optionally redirect
        if (action === 'publish') {
            setTimeout(() => {
                window.location.href = 'programs.html';
            }, 2000);
        }
    }, 2000);
}

function collectFormData() {
    const form = document.getElementById('programForm');
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Add sections data
    const sections = [];
    document.querySelectorAll('.section-item').forEach(item => {
        sections.push({
            title: item.querySelector('.section-title').textContent,
            active: item.classList.contains('active')
        });
    });
    data.sections = sections;
    
    return data;
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
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
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        min-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: 'var(--success-color)',
        error: 'var(--danger-color)',
        warning: 'var(--warning-color)',
        info: 'var(--info-color)'
    };
    return colors[type] || colors.info;
}

// Rich Text Editor
function initializeRichTextEditor() {
    const toolbars = document.querySelectorAll('.rich-text-toolbar');
    
    toolbars.forEach(toolbar => {
        const buttons = toolbar.querySelectorAll('.toolbar-btn');
        const editor = toolbar.nextElementSibling;
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const command = this.dataset.command;
                const value = this.dataset.value;
                
                editor.focus();
                
                if (command === 'createLink') {
                    const url = prompt('Enter URL:');
                    if (url) {
                        document.execCommand(command, false, url);
                    }
                } else if (command === 'insertImage') {
                    const url = prompt('Enter image URL:');
                    if (url) {
                        document.execCommand(command, false, url);
                    }
                } else if (command === 'insertHTML') {
                    document.execCommand(command, false, value);
                } else if (command === 'formatBlock') {
                    document.execCommand(command, false, value);
                } else {
                    document.execCommand(command, false, value);
                }
                
                updateToolbarState(toolbar, editor);
            });
        });
        
        // Update toolbar state on selection change
        editor.addEventListener('mouseup', () => updateToolbarState(toolbar, editor));
        editor.addEventListener('keyup', () => updateToolbarState(toolbar, editor));
    });
}

function updateToolbarState(toolbar, editor) {
    const buttons = toolbar.querySelectorAll('.toolbar-btn');
    
    buttons.forEach(button => {
        const command = button.dataset.command;
        button.classList.remove('active');
        
        if (document.queryCommandState(command)) {
            button.classList.add('active');
        }
    });
}

// Drag and Drop Functionality
function initializeDragAndDrop() {
    const sectionsContainer = document.querySelector('.tab-sections');
    if (!sectionsContainer) return;
    
    // Initialize drag and drop for existing sections
    document.querySelectorAll('.section-item').forEach(makeSectionDraggable);
    
    // Observer to make new sections draggable
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1 && node.classList.contains('section-item')) {
                    makeSectionDraggable(node);
                }
            });
        });
    });
    
    observer.observe(sectionsContainer, { childList: true });
}

// Required Attachments Management
let currentEditingAttachment = null;
let attachmentIdCounter = 2; // Start from 2 since we have 1 sample attachment

// Initialize Partner Logos functionality
function initializePartnerLogos() {
  const uploadArea = document.getElementById('partnerLogosUploadArea');
  const fileInput = document.getElementById('partnerLogosInput');
  const browseBtn = document.getElementById('browseLogosBtn');
  const logosGrid = document.getElementById('logosGrid');
  const noLogosMessage = document.getElementById('noLogosMessage');
  
  // Array to store uploaded logos
  let uploadedLogos = [];
  
  // Prevent default drag behaviors
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
  });
  
  // Highlight drop area when item is dragged over it
  ['dragenter', 'dragover'].forEach(eventName => {
    uploadArea.addEventListener(eventName, highlight, false);
  });
  
  ['dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, unhighlight, false);
  });
  
  // Handle dropped files
  uploadArea.addEventListener('drop', handleDrop, false);
  
  // Handle file selection via button
  browseBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', handleFiles);
  
  // Prevent default drag behaviors
  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  
  // Highlight drop zone
  function highlight() {
    uploadArea.classList.add('dragover');
  }
  
  // Unhighlight drop zone
  function unhighlight() {
    uploadArea.classList.remove('dragover');
  }
  
  // Handle dropped files
  function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    handleFiles({ target: { files } });
  }
  
  // Handle selected files
  function handleFiles(e) {
    const files = [...e.target.files];
    
    // Filter for image files only
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      showNotification('Please select valid image files', 'error');
      return;
    }
    
    // Process each image file
    imageFiles.forEach(file => {
      // Check if file is already uploaded
      if (uploadedLogos.some(logo => logo.name === file.name && logo.size === file.size)) {
        showNotification(`"${file.name}" is already uploaded`, 'warning');
        return;
      }
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoData = {
          id: Date.now() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          url: e.target.result
        };
        
        uploadedLogos.push(logoData);
        renderLogos();
      };
      reader.readAsDataURL(file);
    });
    
    // Reset file input
    fileInput.value = '';
  }
  
  // Render logos in the grid
  function renderLogos() {
    // Clear existing logos first
    while (logosGrid.firstChild) {
      logosGrid.removeChild(logosGrid.firstChild);
    }
    
    // Show no logos message if there are no logos
    if (uploadedLogos.length === 0) {
      noLogosMessage.style.display = 'flex';
      logosGrid.appendChild(noLogosMessage);
      return;
    }
    
    noLogosMessage.style.display = 'none';
    
    // Add new logos
    uploadedLogos.forEach(logo => {
      const logoItem = document.createElement('div');
      logoItem.className = 'logo-item';
      logoItem.dataset.id = logo.id;
      
      logoItem.innerHTML = `
        <div class="logo-preview">
          <img src="${logo.url}" alt="${logo.name}">
        </div>
        <div class="logo-actions">
          <button type="button" class="btn btn-sm btn-outline-danger delete-logo" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      
      // Add event listener for delete button
      const deleteBtn = logoItem.querySelector('.delete-logo');
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteLogo(logo.id);
      });
      
      // Make the logo preview clickable to view
      logoItem.querySelector('.logo-preview').addEventListener('click', () => {
        // Optional: You can still view the logo by clicking the image if needed
        window.open(logo.url, '_blank');
      });
      
      logosGrid.appendChild(logoItem);
    });
  }
  
  // Delete a logo
  function deleteLogo(logoId) {
    if (confirm('Are you sure you want to delete this logo?')) {
      uploadedLogos = uploadedLogos.filter(logo => logo.id !== logoId);
      renderLogos();
      
      // Clear the file input value to prevent issues with re-uploading the same file
      fileInput.value = '';
      
      // Show success message only if there are still logos left
      if (uploadedLogos.length > 0) {
        showNotification('Logo deleted successfully', 'success');
      }
    }
  }
  
  // Initialize
  renderLogos();
}

// FAQs data
let faqs = [
  {
    id: '1',
    questionEn: 'What is the program duration?',
    questionAr: 'ما هي مدة البرنامج؟',
    answerEn: 'The program duration varies depending on the course, typically ranging from 4 to 12 weeks.',
    answerAr: 'تختلف مدة البرنامج حسب الدورة التدريبية، وعادةً ما تتراوح من 4 إلى 12 أسبوعًا.'
  }
];
let editingFaqId = null;

// Initialize FAQs
function initializeFAQs() {
  const addFaqBtn = document.getElementById('addFaqBtn');
  const saveFaqBtn = document.getElementById('saveFaq');
  const cancelFaqBtn = document.getElementById('cancelFaq');
  const closeFaqModalBtn = document.getElementById('closeFaqModal');
  const faqModal = document.getElementById('faqModal');
  const faqForm = document.getElementById('faqForm');
  const faqsTableBody = document.getElementById('faqsTableBody');

  // FAQ data is now managed outside this function

  // Event Listeners
  if (addFaqBtn) {
    addFaqBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openFaqModal();
    });
  }

  if (saveFaqBtn) {
    saveFaqBtn.addEventListener('click', (e) => {
      e.preventDefault();
      saveFaq();
    });
  }
  
  // Prevent form submission
  if (faqForm) {
    faqForm.addEventListener('submit', (e) => {
      e.preventDefault();
      saveFaq();
    });
  }

  if (cancelFaqBtn) {
    cancelFaqBtn.addEventListener('click', closeFaqModal);
  }

  if (closeFaqModalBtn) {
    closeFaqModalBtn.addEventListener('click', closeFaqModal);
  }

  // Close modal when clicking on overlay
  if (faqModal) {
    faqModal.addEventListener('click', (e) => {
      if (e.target === faqModal) {
        closeFaqModal();
      }
    });
  }

  // Close modal with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && faqModal && faqModal.classList.contains('active')) {
      closeFaqModal();
    }
  });

  // Initialize FAQ table
  renderFaqsTable();
  
  // Initialize event delegation for dynamically added buttons
  document.addEventListener('click', function(e) {
    // Handle edit button clicks
    if (e.target.closest('.edit-faq-btn')) {
      e.preventDefault();
      const row = e.target.closest('tr');
      const faqId = row ? row.dataset.faqId : null;
      if (faqId) {
        openFaqModal(faqId);
      }
    }
    
    // Handle delete button clicks
    if (e.target.closest('.delete-faq-btn')) {
      e.preventDefault();
      const row = e.target.closest('tr');
      const faqId = row ? row.dataset.faqId : null;
      if (faqId && confirm('Are you sure you want to delete this FAQ?')) {
        deleteFaq(faqId);
      }
    }
  });

  // Functions
  function openFaqModal(faqId = null) {
    editingFaqId = faqId;
    const modalTitle = document.getElementById('faqModalTitle');
    
    if (faqId) {
      // Edit mode
      modalTitle.textContent = 'Edit FAQ';
      const faq = faqs.find(f => f.id === faqId);
      if (faq) {
        document.getElementById('faqQuestionEn').value = faq.questionEn;
        document.getElementById('faqQuestionAr').value = faq.questionAr;
        document.getElementById('faqAnswerEn').value = faq.answerEn;
        document.getElementById('faqAnswerAr').value = faq.answerAr;
        document.getElementById('editingFaqId').value = faqId;
      }
    } else {
      // Add mode
      modalTitle.textContent = 'Add FAQ';
      faqForm.reset();
      document.getElementById('editingFaqId').value = '';
    }
    
    faqModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeFaqModal() {
    faqModal.classList.remove('active');
    document.body.style.overflow = '';
    faqForm.reset();
    editingFaqId = null;
  }

  function saveFaq() {
    console.log('saveFaq called');
    const questionEn = document.getElementById('faqQuestionEn').value.trim();
    const questionAr = document.getElementById('faqQuestionAr').value.trim();
    const answerEn = document.getElementById('faqAnswerEn').value.trim();
    const answerAr = document.getElementById('faqAnswerAr').value.trim();
    
    console.log('Form values:', { questionEn, questionAr, answerEn, answerAr });
    
    if (!questionEn || !questionAr || !answerEn || !answerAr) {
      const missingFields = [];
      if (!questionEn) missingFields.push('English question');
      if (!questionAr) missingFields.push('Arabic question');
      if (!answerEn) missingFields.push('English answer');
      if (!answerAr) missingFields.push('Arabic answer');
      
      console.log('Validation failed. Missing fields:', missingFields);
      showNotification(`Please fill in all required fields: ${missingFields.join(', ')}`, 'error');
      return;
    }

    if (editingFaqId) {
      // Update existing FAQ
      const index = faqs.findIndex(f => f.id === editingFaqId);
      console.log('Updating FAQ. Index:', index, 'Current FAQs:', faqs);
      
      if (index !== -1) {
        faqs[index] = {
          ...faqs[index],
          questionEn,
          questionAr,
          answerEn,
          answerAr
        };
        console.log('Updated FAQs array:', faqs);
        showNotification('FAQ updated successfully', 'success');
      } else {
        console.error('FAQ with ID not found:', editingFaqId);
      }
    } else {
      // Add new FAQ
      const newFaq = {
        id: Date.now().toString(),
        questionEn,
        questionAr,
        answerEn,
        answerAr
      };
      console.log('Adding new FAQ:', newFaq);
      faqs.unshift(newFaq); // Add to the beginning of the array
      console.log('Updated FAQs array after adding:', faqs);
      showNotification('FAQ added successfully', 'success');
    }
    
    renderFaqsTable();
    closeFaqModal();
  }

  function renderFaqsTable() {
    console.log('renderFaqsTable called');
    console.log('faqsTableBody element:', faqsTableBody);
    
    if (!faqsTableBody) {
      console.error('faqsTableBody is not found in the DOM');
      return;
    }
    
    faqsTableBody.innerHTML = '';
    console.log('faqs array:', faqs);
    
    if (faqs.length === 0) {
      console.log('No FAQs to display, showing empty state');
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = `
        <td colspan="3" class="text-center py-4">
          No FAQs added yet. Click "Add FAQ" to get started.
        </td>
      `;
      faqsTableBody.appendChild(emptyRow);
      return;
    }
    
    faqs.forEach(faq => {
      const row = document.createElement('tr');
      row.className = 'faq-row';
      row.dataset.faqId = faq.id;
      
      row.innerHTML = `
        <td class="question-en">${faq.questionEn}</td>
        <td class="question-ar">${faq.questionAr}</td>
        <td class="faq-actions">
          <button type="button" class="action-btn edit-faq-btn" title="Edit">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="action-btn delete-faq-btn" title="Delete">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      
      // Add event listeners to the buttons
      const editBtn = row.querySelector('.edit-faq-btn');
      const deleteBtn = row.querySelector('.delete-faq-btn');
      
      editBtn.addEventListener('click', () => openFaqModal(faq.id));
      deleteBtn.addEventListener('click', () => deleteFaq(faq.id));
      
      faqsTableBody.appendChild(row);
    });
  }

  function deleteFaq(faqId) {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      faqs = faqs.filter(faq => faq.id !== faqId);
      renderFaqsTable();
      showNotification('FAQ deleted successfully', 'success');
    }
  }
}

// Initialize Attachments
function initializeAttachments() {
    const addAttachmentBtn = document.getElementById('addAttachmentBtn');
    const saveBtn = document.getElementById('saveAttachment');
    const cancelBtn = document.getElementById('cancelAttachment');
    const closeBtn = document.getElementById('closeAttachmentModal');
    const modal = document.getElementById('attachmentModal');
    
    // Add event listeners if elements exist
    if (addAttachmentBtn) {
        addAttachmentBtn.addEventListener('click', () => openAttachmentModal());
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', saveAttachment);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', hideAttachmentModal);
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', hideAttachmentModal);
    }
    
    // Close modal when clicking on overlay
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideAttachmentModal();
            }
        });
    }
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            hideAttachmentModal();
        }
    });
    
    // Initialize existing attachment actions
    initializeAttachmentActions();
}

// Initialize attachment action buttons
function initializeAttachmentActions() {
    document.querySelectorAll('.edit-attachment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('.attachment-row');
            editAttachment(row);
        });
    });
    
    document.querySelectorAll('.delete-attachment-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const row = e.target.closest('.attachment-row');
            deleteAttachment(row);
        });
    });
}

// Open attachment modal for adding/editing
function openAttachmentModal(attachmentRow = null) {
    const modal = document.getElementById('attachmentModal');
    const title = document.getElementById('attachmentModalTitle');
    const form = document.getElementById('attachmentForm');
    
    if (attachmentRow) {
        // Editing existing attachment
        title.textContent = 'Edit Attachment';
        currentEditingAttachment = attachmentRow;
        
        // Get data from the row
        document.getElementById('attachmentNameEn').value = attachmentRow.querySelector('.attachment-name-en').textContent;
        document.getElementById('attachmentNameAr').value = attachmentRow.querySelector('.attachment-name-ar').textContent;
    } else {
        // Adding new attachment
        title.textContent = 'Add Required Attachment';
        currentEditingAttachment = null;
        form.reset();
    }
    
    // Show the modal by adding the 'active' class
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus on the first input field
    document.getElementById('attachmentNameEn').focus();
}

// Hide attachment modal
function hideAttachmentModal() {
    const modal = document.getElementById('attachmentModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentEditingAttachment = null;
}

// Save attachment data
function saveAttachment() {
    const attachmentData = {
        nameEn: document.getElementById('attachmentNameEn').value.trim(),
        nameAr: document.getElementById('attachmentNameAr').value.trim()
    };
    
    // Basic validation
    if (!attachmentData.nameEn || !attachmentData.nameAr) {
        showNotification('Please fill in both English and Arabic attachment names', 'error');
        return;
    }
    
    if (currentEditingAttachment) {
        // Update existing attachment
        updateAttachmentRow(currentEditingAttachment, attachmentData);
        showNotification('Attachment updated successfully', 'success');
    } else {
        // Add new attachment
        attachmentIdCounter++;
        const newRow = createAttachmentRow(attachmentIdCounter, attachmentData);
        document.getElementById('attachmentsTableBody').appendChild(newRow);
        initializeAttachmentActions(); // Re-initialize actions for the new row
        showNotification('Attachment added successfully', 'success');
    }
    
    hideAttachmentModal();
}

// Create a new attachment row
function createAttachmentRow(id, data) {
    const row = document.createElement('tr');
    row.className = 'attachment-row';
    row.setAttribute('data-attachment-id', id);
    
    row.innerHTML = `
        <td class="attachment-name">
            <i class="fas fa-file-alt me-2"></i>
            <span class="attachment-name-en">${escapeHtml(data.nameEn)}</span>
        </td>
        <td class="attachment-name-ar" dir="rtl">
            <span class="attachment-name-ar">${escapeHtml(data.nameAr)}</span>
            <i class="fas fa-file-alt me-2 ms-2"></i>
        </td>
        <td class="attachment-actions">
            <button type="button" class="action-btn edit-attachment-btn" title="Edit">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="action-btn delete-attachment-btn" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    
    return row;
}

// Update an existing attachment row
function updateAttachmentRow(row, data) {
    // Create a new row with updated data and replace the old one
    const newRow = createAttachmentRow(row.getAttribute('data-attachment-id'), data);
    row.parentNode.replaceChild(newRow, row);
    
    // Re-initialize actions for the updated row
    initializeAttachmentActions();
}

// Edit attachment
function editAttachment(row) {
    openAttachmentModal(row);
}

// Delete attachment
function deleteAttachment(row) {
    if (confirm('Are you sure you want to delete this attachment requirement?')) {
        row.remove();
        showNotification('Attachment requirement deleted', 'info');
    }
}

// Helper function to escape HTML
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Questionnaire Management
let currentEditingQuestion = null;
let questionIdCounter = 6; // Start from 6 since we have 5 sample questions

function initializeQuestionnaire() {
    const addQuestionBtn = document.getElementById('addQuestionBtn');
    const questionModal = document.getElementById('questionModal');
    const closeQuestionModal = document.getElementById('closeQuestionModal');
    const cancelQuestion = document.getElementById('cancelQuestion');
    const saveQuestion = document.getElementById('saveQuestion');
    const questionType = document.getElementById('questionType');
    const addOptionBtn = document.getElementById('addOptionBtn');
    
    // Add question button
    if (addQuestionBtn) {
        addQuestionBtn.addEventListener('click', function() {
            openQuestionModal('Add Question');
        });
    }
    
    // Close modal events
    if (closeQuestionModal) {
        closeQuestionModal.addEventListener('click', hideQuestionModal);
    }
    if (cancelQuestion) {
        cancelQuestion.addEventListener('click', hideQuestionModal);
    }
    
    // Close on overlay click
    if (questionModal) {
        questionModal.addEventListener('click', function(e) {
            if (e.target === questionModal) {
                hideQuestionModal();
            }
        });
    }
    
    // Save question
    if (saveQuestion) {
        saveQuestion.addEventListener('click', saveQuestionData);
    }
    
    // Question type change
    if (questionType) {
        questionType.addEventListener('change', handleQuestionTypeChange);
    }
    
    // Add option button
    if (addOptionBtn) {
        addOptionBtn.addEventListener('click', addNewOption);
    }
    
    // Initialize existing question actions
    initializeQuestionActions();
    
    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && questionModal && questionModal.classList.contains('active')) {
            hideQuestionModal();
        }
    });
}

function initializeQuestionActions() {
    const editBtns = document.querySelectorAll('.edit-question-btn');
    const deleteBtns = document.querySelectorAll('.delete-question-btn');
    
    editBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('.question-row');
            editQuestion(row);
        });
    });
    
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('.question-row');
            deleteQuestion(row);
        });
    });
}

function openQuestionModal(title = 'Add Question', questionRow = null) {
    const modal = document.getElementById('questionModal');
    const modalTitle = document.getElementById('questionModalTitle');
    const questionTextEn = document.getElementById('questionTextEn');
    const questionTextAr = document.getElementById('questionTextAr');
    const questionType = document.getElementById('questionType');
    
    modalTitle.textContent = title;
    currentEditingQuestion = questionRow;
    
    if (questionRow) {
        // Editing existing question
        const questionEn = questionRow.querySelector('.question-en').textContent;
        const questionAr = questionRow.querySelector('.question-ar').textContent;
        
        questionTextEn.value = questionEn;
        questionTextAr.value = questionAr;
        
        // Load question type and options if available
        const questionData = questionRow.dataset;
        if (questionData.type) {
            questionType.value = questionData.type;
            handleQuestionTypeChange();
            
            // Load options if it's a multiple choice question
            if (questionData.type === 'multiple-choice' && questionData.options) {
                loadQuestionOptions(JSON.parse(questionData.options));
            }
        }
    } else {
        // Adding new question
        questionTextEn.value = '';
        questionTextAr.value = '';
        questionType.value = 'multiple-choice';
        handleQuestionTypeChange();
        resetOptionsToDefault();
    }
    
    modal.classList.add('active');
    questionTextEn.focus();
}

function hideQuestionModal() {
    const modal = document.getElementById('questionModal');
    modal.classList.remove('active');
    currentEditingQuestion = null;
}

function handleQuestionTypeChange() {
    const questionType = document.getElementById('questionType');
    const optionsSection = document.getElementById('optionsSection');
    
    if (questionType.value === 'multiple-choice') {
        optionsSection.style.display = 'block';
    } else {
        optionsSection.style.display = 'none';
    }
}

function addNewOption() {
    const optionsContainer = document.getElementById('optionsContainer');
    const optionCount = optionsContainer.children.length + 1;
    
    const optionRow = document.createElement('div');
    optionRow.className = 'option-row';
    optionRow.innerHTML = `
        <div class="option-inputs">
            <input
                type="text"
                class="form-control option-en"
                placeholder="Answer ${optionCount}"
            />
            <input
                type="text"
                class="form-control option-ar"
                placeholder="الجواب ${optionCount}"
                dir="rtl"
            />
        </div>
        <button type="button" class="remove-option-btn" title="Remove option">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add remove functionality
    const removeBtn = optionRow.querySelector('.remove-option-btn');
    removeBtn.addEventListener('click', function() {
        if (optionsContainer.children.length > 2) {
            optionRow.remove();
            updateOptionPlaceholders();
        } else {
            showNotification('At least 2 options are required', 'warning');
        }
    });
    
    optionsContainer.appendChild(optionRow);
    
    // Add remove functionality to existing options if not already added
    updateRemoveButtonStates();
}

function updateRemoveButtonStates() {
    const optionsContainer = document.getElementById('optionsContainer');
    const removeBtns = optionsContainer.querySelectorAll('.remove-option-btn');
    
    removeBtns.forEach((btn, index) => {
        if (!btn.hasEventListener) {
            btn.addEventListener('click', function() {
                if (optionsContainer.children.length > 2) {
                    btn.closest('.option-row').remove();
                    updateOptionPlaceholders();
                } else {
                    showNotification('At least 2 options are required', 'warning');
                }
            });
            btn.hasEventListener = true;
        }
        
        // Disable remove button if only 2 options left
        btn.disabled = optionsContainer.children.length <= 2;
    });
}

function updateOptionPlaceholders() {
    const optionsContainer = document.getElementById('optionsContainer');
    const optionRows = optionsContainer.querySelectorAll('.option-row');
    
    optionRows.forEach((row, index) => {
        const enInput = row.querySelector('.option-en');
        const arInput = row.querySelector('.option-ar');
        
        enInput.placeholder = `Answer ${index + 1}`;
        arInput.placeholder = `الجواب ${index + 1}`;
    });
}

function resetOptionsToDefault() {
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = `
        <div class="option-row">
            <div class="option-inputs">
                <input type="text" class="form-control option-en" placeholder="Answer 1" />
                <input type="text" class="form-control option-ar" placeholder="الجواب 1" dir="rtl" />
            </div>
            <button type="button" class="remove-option-btn" title="Remove option">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="option-row">
            <div class="option-inputs">
                <input type="text" class="form-control option-en" placeholder="Answer 2" />
                <input type="text" class="form-control option-ar" placeholder="الجواب 2" dir="rtl" />
            </div>
            <button type="button" class="remove-option-btn" title="Remove option">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="option-row">
            <div class="option-inputs">
                <input type="text" class="form-control option-en" placeholder="Answer 3" />
                <input type="text" class="form-control option-ar" placeholder="الجواب 3" dir="rtl" />
            </div>
            <button type="button" class="remove-option-btn" title="Remove option">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    updateRemoveButtonStates();
}

function loadQuestionOptions(options) {
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    options.forEach((option, index) => {
        const optionRow = document.createElement('div');
        optionRow.className = 'option-row';
        optionRow.innerHTML = `
            <div class="option-inputs">
                <input type="text" class="form-control option-en" placeholder="Answer ${index + 1}" value="${option.en}" />
                <input type="text" class="form-control option-ar" placeholder="الجواب ${index + 1}" value="${option.ar}" dir="rtl" />
            </div>
            <button type="button" class="remove-option-btn" title="Remove option">
                <i class="fas fa-times"></i>
            </button>
        `;
        optionsContainer.appendChild(optionRow);
    });
    
    updateRemoveButtonStates();
}

function saveQuestionData() {
    const questionTextEn = document.getElementById('questionTextEn').value.trim();
    const questionTextAr = document.getElementById('questionTextAr').value.trim();
    const questionType = document.getElementById('questionType').value;
    
    if (!questionTextEn || !questionTextAr) {
        showNotification('Both English and Arabic questions are required', 'error');
        return;
    }
    
    let options = [];
    if (questionType === 'multiple-choice') {
        const optionRows = document.querySelectorAll('.option-row');
        
        optionRows.forEach(row => {
            const enOption = row.querySelector('.option-en').value.trim();
            const arOption = row.querySelector('.option-ar').value.trim();
            
            if (enOption && arOption) {
                options.push({ en: enOption, ar: arOption });
            }
        });
        
        if (options.length < 2) {
            showNotification('At least 2 options are required for multiple choice questions', 'error');
            return;
        }
    }
    
    if (currentEditingQuestion) {
        // Update existing question
        updateQuestionRow(currentEditingQuestion, questionTextEn, questionTextAr, questionType, options);
        showNotification('Question updated successfully', 'success');
    } else {
        // Create new question
        createQuestionRow(questionTextEn, questionTextAr, questionType, options);
        showNotification('Question added successfully', 'success');
    }
    
    hideQuestionModal();
}

function createQuestionRow(questionEn, questionAr, type, options) {
    const tableBody = document.getElementById('questionsTableBody');
    const row = document.createElement('tr');
    row.className = 'question-row';
    row.dataset.questionId = questionIdCounter++;
    row.dataset.type = type;
    if (options.length > 0) {
        row.dataset.options = JSON.stringify(options);
    }
    
    row.innerHTML = `
        <td class="question-en">${questionEn}</td>
        <td class="question-ar">${questionAr}</td>
        <td class="question-actions">
            <button type="button" class="action-btn edit-question-btn" title="Edit">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="action-btn delete-question-btn" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;
    
    // Add event listeners
    const editBtn = row.querySelector('.edit-question-btn');
    const deleteBtn = row.querySelector('.delete-question-btn');
    
    editBtn.addEventListener('click', function() {
        editQuestion(row);
    });
    
    deleteBtn.addEventListener('click', function() {
        deleteQuestion(row);
    });
    
    tableBody.appendChild(row);
}

function updateQuestionRow(row, questionEn, questionAr, type, options) {
    row.querySelector('.question-en').textContent = questionEn;
    row.querySelector('.question-ar').textContent = questionAr;
    row.dataset.type = type;
    
    if (options.length > 0) {
        row.dataset.options = JSON.stringify(options);
    } else {
        delete row.dataset.options;
    }
}

function editQuestion(row) {
    openQuestionModal('Edit Question', row);
}

function deleteQuestion(row) {
    if (confirm('Are you sure you want to delete this question?')) {
        row.remove();
        showNotification('Question deleted successfully', 'success');
    }
}

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(style);
