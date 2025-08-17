document.addEventListener('DOMContentLoaded', function () {
  initializeLanguageState();
  // Apply translations
  const currentLang = localStorage.getItem('site-lang') || 'en';
  applyTranslations(currentLang);
  // Listen for language changes
  const langButtons = document.querySelectorAll('.lang-btn');
  if (langButtons.length > 0) {
    langButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        if (lang) {
          switchLanguage(lang);
        }
      });
    });
  }
  // Tab functionality
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Show corresponding content
      const tabId = button.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });
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

        // Applicant Request Details
        applicant_details: 'Applicant Details',
        general_info: 'General Information',
        questionnaire: 'Questionnaire',
        program_information: 'Program Information',
        documents: 'Documents',
        timeline: 'Timeline',
        personal_details: 'Personal Details',
        national_id: 'National ID',
        full_name: 'Full Name',
        date_of_birth: 'Date of Birth',
        gender: 'Gender',
        nationality: 'Nationality',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        city: 'City',
        country: 'Country',
        education: 'Education',
        degree: 'Degree',
        institution: 'Institution',
        year: 'Year',
        experience: 'Work Experience',
        company: 'Company',
        position: 'Position',
        duration: 'Duration',
        mol_data: 'MOL Data',
        civil_id: 'Civil ID',
        civil_expiry: 'Civil ID Expiry',
        full_name_en: 'Full Name (English)',
        full_name_ar: 'Full Name (Arabic)',
        gender_en: 'Gender (English)',
        gender_ar: 'Gender (Arabic)',
        marital_status: 'Marital Status',
        current_address: 'Current Address',
        permanent_address: 'Permanent Address',
        latest_education: 'Latest Education',
        job_status: 'Job Status',
        organization_sector: 'Organization Sector',
        occupation: 'Occupation',
        company_name: 'Company Name',
        program_application_questions: 'Program Application Questions',
        why_interested_program: '1. Why are you interested in this program?',
        what_achieve_after_program: '2. What do you hope to achieve after completing this program?',
        prior_experience_figma: '3. Do you have any prior experience with Figma?',
        how_hear_about_program: '4. How did you hear about this program?',
        commit_to_program: '5. Can you commit to the full duration of the program?',
        question: 'Question',
        answer: 'Answer',
        document_name: 'Document Name',
        resume: 'Resume',
        portfolio: 'Portfolio',
        id_card: 'ID Card',
        certificates: 'Certificates',
        file_size: 'File Size',
        document_type: 'Document Type',
        uploaded_on: 'Uploaded On',
        status: 'Status',
        view: 'View',
        download: 'Download',
        back: 'Back',
        reject: 'Reject',
        approve: 'Approve',
        applicant_name: 'Sara Johnson',
        applicant_email: 'sara.j@example.com',
        applicant_phone: '+968 9123 4567',
        applicant_location: 'Muscat, Oman',
        applicant_applied_on: 'Applied on April 20, 2025',
        pending: 'Pending',
        approved: 'Approved',
        rejected: 'Rejected',
        program: 'Program',
        provider: 'Provider',
        duration: 'Duration',
        location: 'Location',
        application_status: 'Application Status',
        work_experience: 'Work Experience',
        civil_expiry_date: 'Civil Expiry Date',
        full_name_eng: 'Full name [Eng]',
        full_name_arabic: 'Full name [Arabic]',
        gender_eng: 'Gender [Eng]',
        gender_arabic: 'Gender [Arabic]',
        date_of_birth: 'Date of Birth',
        civil_id: 'Civil ID',
        phone_number: 'Phone Number',
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

        // Applicant Request Details
        applicant_details: 'تفاصيل المتقدم',
        general_info: 'معلومات عامة',
        questionnaire: 'الاستبيان',
        program_information: 'معلومات البرنامج',
        documents: 'الوثائق',
        timeline: 'الجدول الزمني',
        personal_details: 'البيانات الشخصية',
        national_id: 'رقم الهوية',
        full_name: 'الاسم الكامل',
        date_of_birth: 'تاريخ الميلاد',
        gender: 'الجنس',
        nationality: 'الجنسية',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        address: 'العنوان',
        city: 'المدينة',
        country: 'الدولة',
        education: 'التعليم',
        degree: 'الدرجة العلمية',
        institution: 'المؤسسة',
        year: 'السنة',
        experience: 'الخبرة العملية',
        company: 'الشركة',
        position: 'المنصب',
        duration: 'المدة',
        mol_data: 'بيانات وزارة العمل',
        civil_id: 'رقم الهوية المدنية',
        civil_expiry: 'انتهاء الهوية المدنية',
        full_name_en: 'الاسم الكامل (إنجليزي)',
        full_name_ar: 'الاسم الكامل (عربي)',
        gender_en: 'الجنس (إنجليزي)',
        gender_ar: 'الجنس (عربي)',
        marital_status: 'الحالة الاجتماعية',
        current_address: 'العنوان الحالي',
        permanent_address: 'العنوان الدائم',
        latest_education: 'أعلى مؤهل علمي',
        job_status: 'حالة التوظيف',
        organization_sector: 'قطاع المنظمة',
        occupation: 'المهنة',
        company_name: 'اسم الشركة',
        program_application_questions: 'أسئلة طلب البرنامج',
        why_interested_program: '1. لماذا أنت مهتم بهذا البرنامج؟',
        what_achieve_after_program: '2. ما الذي تأمل في تحقيقه بعد إكمال هذا البرنامج؟',
        prior_experience_figma: '3. هل لديك خبرة سابقة مع Figma؟',
        how_hear_about_program: '4. كيف سمعت عن هذا البرنامج؟',
        commit_to_program: '5. هل يمكنك الالتزام بالمدة الكاملة للبرنامج؟',
        question: 'السؤال',
        answer: 'الجواب',
        document_name: 'اسم المستند',
        resume: 'السيرة الذاتية',
        portfolio: 'المحفظة',
        id_card: 'بطاقة الهوية',
        certificates: 'الشهادات',
        file_size: 'حجم الملف',
        document_type: 'نوع المستند',
        uploaded_on: 'تاريخ الرفع',
        status: 'الحالة',
        view: 'عرض',
        download: 'تحميل',
        back: 'رجوع',
        reject: 'رفض',
        approve: 'موافقة',
        applicant_name: 'سارة جونسون',
        applicant_email: 'sara.j@example.com',
        applicant_phone: '+968 9123 4567',
        applicant_location: 'مسقط، عمان',
        applicant_applied_on: 'تم التقديم في 20 أبريل 2025',
        pending: 'قيد الانتظار',
        approved: 'مقبول',
        rejected: 'مرفوض',
        program: 'برنامج',
        provider: 'المزود',
        duration: 'المدة',
        location: 'الموقع',
        application_status: 'حالة التقديم',
        work_experience: 'خبرة عمل',
        civil_expiry_date: 'تاريخ انتهاء الهوية المدنية',
        full_name_eng: 'الاسم الكامل [الإنجليزية]',
        full_name_arabic: 'الاسم الكامل [العربية]',
        gender_eng: 'الجنس [الإنجليزية]',
        gender_arabic: 'الجنس [العربية]',
        date_of_birth: 'تاريخ الميلاد',
        civil_id: 'رقم الهوية المدنية',
        phone_number: 'رقم الهاتف',
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
  // Accordion functionality
  function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header');
      const content = item.querySelector('.accordion-content');
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      // Initialize state
      if (isExpanded) {
        content.classList.add('show');
      } else {
        content.style.maxHeight = '0';
        content.style.padding = '0 1.5rem';
      }

      // Add click handler
      header.addEventListener('click', function () {
        const wasExpanded = this.getAttribute('aria-expanded') === 'true';

        // Toggle current item
        this.setAttribute('aria-expanded', !wasExpanded);

        if (wasExpanded) {
          // Collapse - match the reverse of the opening animation
          content.style.maxHeight = '0';
          content.style.padding = '0 1.5rem';
          content.style.opacity = '0';

          // Remove show class after transition ends
          const onTransitionEnd = () => {
            if (content.style.opacity === '0') { // Only remove if still collapsed
              content.classList.remove('show');
            }
            content.removeEventListener('transitionend', onTransitionEnd);
          };
          content.addEventListener('transitionend', onTransitionEnd, { once: true });
        } else {
          // Expand
          content.classList.add('show');
          // Force reflow to ensure the browser registers the initial state
          void content.offsetHeight;
          content.style.maxHeight = '1000px';
          content.style.padding = '1rem 1.5rem';
          content.style.opacity = '1';

          // Close other accordion items in the same container
          const parentContainer = this.closest('.accordion-container');
          if (parentContainer) {
            const otherItems = parentContainer.querySelectorAll('.accordion-item');
            otherItems.forEach(otherItem => {
              if (otherItem !== item) {
                const otherHeader = otherItem.querySelector('.accordion-header');
                const otherContent = otherItem.querySelector('.accordion-content');

                if (otherHeader.getAttribute('aria-expanded') === 'true') {
                  otherHeader.setAttribute('aria-expanded', 'false');
                  otherContent.style.maxHeight = '0';
                  otherContent.style.padding = '0 1.5rem';
                  setTimeout(() => {
                    otherContent.classList.remove('show');
                  }, 300);
                }
              }
            });
          }
        }
      });
    });
  }

  // Initialize accordions when the page loads
  initAccordion();

  // Back button functionality
  const backButton = document.querySelector('.btn-outline');
  if (backButton) {
    backButton.addEventListener('click', () => {
      window.history.back();
    });
  }

  // Approve/Reject button functionality
  const approveButton = document.querySelector('.btn-primary');
  const rejectButton = document.querySelector('.btn-danger');
  const statusBadge = document.querySelector('.applicant-status .status-badge');

  if (approveButton) {
    approveButton.addEventListener('click', () => {
      if (confirm('Are you sure you want to approve this application?')) {
        // In a real app, you would make an API call here
        statusBadge.textContent = 'Approved';
        statusBadge.className = 'status-badge approved';

        // Update the timeline
        const timeline = document.querySelector('.timeline');
        if (timeline) {
          const now = new Date();
          const dateString = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          const timelineItem = document.createElement('div');
          timelineItem.className = 'timeline-item';
          timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-date">${dateString}</div>
            <div class="timeline-content">
              <h4 class="timeline-title">Application Approved</h4>
              <p class="timeline-description">The application has been approved by the admin.</p>
            </div>
          `;

          timeline.prepend(timelineItem);
        }
      }
    });
  }

  if (rejectButton) {
    rejectButton.addEventListener('click', () => {
      const reason = prompt('Please enter the reason for rejection:');
      if (reason) {
        // In a real app, you would make an API call here
        statusBadge.textContent = 'Rejected';
        statusBadge.className = 'status-badge rejected';

        // Update the timeline
        const timeline = document.querySelector('.timeline');
        if (timeline) {
          const now = new Date();
          const dateString = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          });

          const timelineItem = document.createElement('div');
          timelineItem.className = 'timeline-item';
          timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-date">${dateString}</div>
            <div class="timeline-content">
              <h4 class="timeline-title">Application Rejected</h4>
              <p class="timeline-description">The application has been rejected by the admin. Reason: ${reason}</p>
            </div>
          `;

          timeline.prepend(timelineItem);
        }
      }
    });
  }

  // Document download functionality
  document.querySelectorAll('.document-card a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      // In a real app, this would trigger a file download
      console.log('Downloading file:', e.target.closest('a').getAttribute('href'));
    });
  });

  // Initialize the first tab as active
  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons[0].classList.add('active');
    tabContents[0].classList.add('active');
  }
});
