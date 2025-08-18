// Global variables for multi-step wizard
let currentStep = 1;
const totalSteps = 4;

// Global arrays for qualifications and professional experiences
let qualifications = [];
let professionals = [];
let editingQualificationId = null;
let editingProfessionalId = null;

$(document).ready(function() {
  // Language switching functionality
  $('.lang-btn').on('click', function() {
    const lang = $(this).data('lang');
    switchLanguage(lang);
  });

  // Handle form submissions
  $('#personalInfoForm').on('submit', function(e) {
    e.preventDefault();
    console.log('Form submission prevented - using onclick instead');
    // Form submission is now handled by the onclick="goToStep(2)" on the button
  });

  $('#qualificationForm').on('submit', function(e) {
    e.preventDefault();
    if (validateStep2()) {
      saveStepData(2);
      goToStep(3);
    }
  });

  $('#professionalForm').on('submit', function(e) {
    e.preventDefault();
    if (validateStep3()) {
      saveStepData(3);
      goToStep(4);
    }
  });

  $('#attachmentsForm').on('submit', function(e) {
    e.preventDefault();
    if (validateStep4()) {
      saveStepData(4);
      completeProfile();
    }
  });

  // Initialize attachments functionality will be called when user navigates to Step 4

  // Previous step buttons
  $('.prev-step').on('click', function() {
    const currentStepElement = $(this).closest('.form-step');
    const currentStepId = currentStepElement.attr('id');
    const stepNumber = parseInt(currentStepId.split('-')[1]);
    goToStep(stepNumber - 1);
  });

  // Photo upload functionality
  $('.upload-photo-btn').on('click', function() {
    // Create a file input element
    const fileInput = $('<input type="file" accept="image/*" style="display: none;">');
    $('body').append(fileInput);
    
    fileInput.on('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        handlePhotoUpload(file);
      }
      fileInput.remove();
    });
    
    fileInput.click();
  });

  // Country of residence change handler
  $('#countryResidence').on('change', function() {
    const country = $(this).val();
    handleCountryChange(country);
  });

  // Governorate change handler
  $('#governorate').on('change', function() {
    updateWilayatOptions();
  });

  // Qualification management
  // Arrays are now declared globally at the top of the file

  // Initialize qualification functionality
  function initializeQualificationStep() {
    // Add new qualification button
    $('#addQualificationBtn').on('click', function() {
      openQualificationModal();
    });

    // Modal close buttons
    $('#closeQualificationModal, #closeModalBtn').on('click', function() {
      closeQualificationModal();
    });

    // Close modal on overlay click
    $('#qualificationModal').on('click', function(e) {
      if (e.target === this) {
        closeQualificationModal();
      }
    });

    // File upload area click
    $(document).on('click', '#certificateUploadArea', function(e) {
      console.log('Upload area clicked');
      e.preventDefault();
      e.stopPropagation();
      
      const fileInput = document.getElementById('certificateFiles');
      if (fileInput) {
        console.log('Triggering file input click');
        fileInput.click();
      } else {
        console.error('File input not found');
      }
    });

    // File input change
    $('#certificateFiles').on('change', function(e) {
      console.log('File input changed:', this.files);
      if (this.files && this.files.length > 0) {
        handleCertificateUpload(this.files);
      }
    });

    // Drag and drop functionality
    $('#certificateUploadArea').on('dragover', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).addClass('drag-over');
    });

    $('#certificateUploadArea').on('dragleave', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).removeClass('drag-over');
    });

    $('#certificateUploadArea').on('drop', function(e) {
      e.preventDefault();
      e.stopPropagation();
      $(this).removeClass('drag-over');
      
      const files = e.originalEvent.dataTransfer.files;
      if (files && files.length > 0) {
        console.log('Files dropped:', files);
        handleCertificateUpload(files);
      }
    });

    // Remove file buttons
    $(document).on('click', '.btn-remove-file', function() {
      $(this).closest('.uploaded-file').remove();
    });

    // Qualification form submission
    $('#qualificationModalForm').on('submit', function(e) {
      e.preventDefault();
      saveQualification();
    });

      // Load saved qualifications
  loadQualifications();
  
  // Initialize Professional Details step
  initializeProfessionalStep();
}

  // Open qualification modal
  function openQualificationModal(qualificationId = null) {
    editingQualificationId = qualificationId;
    
    if (qualificationId) {
      // Edit mode - populate form with existing data
      const qualification = qualifications.find(q => q.id == qualificationId);
      if (qualification) {
        populateQualificationForm(qualification);
      }
    } else {
      // Add mode - clear form
      clearQualificationForm();
    }
    
    $('#qualificationModal').addClass('show');
    $('body').addClass('modal-open');
  }

  // Close qualification modal
  function closeQualificationModal() {
    $('#qualificationModal').removeClass('show');
    $('body').removeClass('modal-open');
    editingQualificationId = null;
    clearQualificationForm();
  }

  // Clear qualification form
  function clearQualificationForm() {
    $('#qualificationModalForm')[0].reset();
    $('#modalDegree').val('');
    $('#modalMajor').val('');
    $('#modalCountry').val('');
    $('#modalInstitute').val('');
    $('#modalGrade').val('');
    $('#modalGraduationYear').val('');
    $('#uploadedCertificates').empty();
  }

  // Populate qualification form with existing data
  function populateQualificationForm(qualification) {
    $('#modalDegree').val(qualification.degree);
    $('#modalMajor').val(qualification.major);
    $('#modalCountry').val(qualification.country);
    $('#modalInstitute').val(qualification.institute);
    $('#modalGrade').val(qualification.grade);
    $('#modalGraduationYear').val(qualification.graduationYear);
    
    // Populate uploaded files
    const uploadedFilesContainer = $('#uploadedCertificates');
    uploadedFilesContainer.empty();
    
    if (qualification.attachments && qualification.attachments.length > 0) {
      qualification.attachments.forEach(file => {
        const fileElement = $(`
          <div class="uploaded-file">
            <span class="file-name">${file}</span>
            <button type="button" class="btn-remove-file">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `);
        uploadedFilesContainer.append(fileElement);
      });
    }
  }

  // Save qualification
  function saveQualification() {
    const formData = {
      degree: $('#modalDegree').val(),
      major: $('#modalMajor').val(),
      country: $('#modalCountry').val(),
      institute: $('#modalInstitute').val(),
      grade: $('#modalGrade').val(),
      graduationYear: $('#modalGraduationYear').val(),
      attachments: []
    };

    // Get uploaded file names
    $('#uploadedCertificates .file-name').each(function() {
      formData.attachments.push($(this).text());
    });

    // Validate form
    if (!validateQualificationForm(formData)) {
      return;
    }

    if (editingQualificationId) {
      // Update existing qualification
      const index = qualifications.findIndex(q => q.id == editingQualificationId);
      if (index !== -1) {
        qualifications[index] = { ...qualifications[index], ...formData };
      }
    } else {
      // Add new qualification
      const newQualification = {
        id: Date.now(),
        ...formData
      };
      qualifications.push(newQualification);
    }

      // Save to localStorage
  localStorage.setItem('qualifications', JSON.stringify(qualifications));
  
  // Update display
  renderQualifications();
  
  // Close modal
  closeQualificationModal();
  
  // Don't show success message here - will be shown when proceeding to next step
  }

  // Validate qualification form
  function validateQualificationForm(data) {
    const currentLang = localStorage.getItem('site-lang') || 'en';
    
    if (!data.degree) {
      const errorMessage = currentLang === 'ar' ? 'يرجى اختيار الدرجة العلمية' : 'Please select a degree';
      showErrorMessage(errorMessage);
      return false;
    }
    
    if (!data.major.trim()) {
      const errorMessage = currentLang === 'ar' ? 'يرجى إدخال تخصصك' : 'Please enter your major';
      showErrorMessage(errorMessage);
      return false;
    }
    
    if (!data.country) {
      const errorMessage = currentLang === 'ar' ? 'يرجى اختيار البلد' : 'Please select a country';
      showErrorMessage(errorMessage);
      return false;
    }
    
    if (!data.institute) {
      const errorMessage = currentLang === 'ar' ? 'يرجى اختيار المعهد الأكاديمي' : 'Please select an academic institute';
      showErrorMessage(errorMessage);
      return false;
    }
    
    if (!data.grade.trim()) {
      const errorMessage = currentLang === 'ar' ? 'يرجى إدخال درجتك' : 'Please enter your grade';
      showErrorMessage(errorMessage);
      return false;
    }
    
    if (!data.graduationYear) {
      const errorMessage = currentLang === 'ar' ? 'يرجى اختيار سنة التخرج' : 'Please select graduation year';
      showErrorMessage(errorMessage);
      return false;
    }
    
    return true;
  }

  // Handle certificate file upload
  function handleCertificateUpload(files) {
    console.log('Handling certificate upload:', files);
    const uploadedFilesContainer = $('#uploadedCertificates');
    
    Array.from(files).forEach(file => {
      console.log('Processing file:', file.name, file.size, file.type);
      
      // Validate file type
      const allowedTypes = ['.docx', '.pdf', '.png', '.jpg'];
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      
      const currentLang = localStorage.getItem('site-lang') || 'en';
      
      if (!allowedTypes.includes(fileExtension)) {
        const errorMessage = currentLang === 'ar' ? 
          `نوع الملف ${fileExtension} غير مسموح به. يرجى تحميل ملفات .docx أو .pdf أو .png أو .jpg.` : 
          `File type ${fileExtension} is not allowed. Please upload .docx, .pdf, .png, or .jpg files.`;
        showErrorMessage(errorMessage);
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        const errorMessage = currentLang === 'ar' ? 
          `الملف ${file.name} كبير جداً. الحد الأقصى للحجم هو 5 ميجابايت.` : 
          `File ${file.name} is too large. Maximum size is 5MB.`;
        showErrorMessage(errorMessage);
        return;
      }
      
      // Check if file already exists
      const existingFiles = [];
      $('#uploadedCertificates .file-name').each(function() {
        existingFiles.push($(this).text());
      });
      
      if (existingFiles.includes(file.name)) {
        const errorMessage = currentLang === 'ar' ? 
          `الملف ${file.name} تم تحميله مسبقاً.` : 
          `File ${file.name} is already uploaded.`;
        showErrorMessage(errorMessage);
        return;
      }
      
      // Add file to list
      const fileElement = $(`
        <div class="uploaded-file">
          <span class="file-name">${file.name}</span>
          <button type="button" class="btn-remove-file">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `);
      uploadedFilesContainer.append(fileElement);
      
      console.log('File added to list:', file.name);
    });
    
    // Clear file input
    $('#certificateFiles').val('');
  }

  // Load qualifications from localStorage
  function loadQualifications() {
    const saved = localStorage.getItem('qualifications');
    if (saved) {
      qualifications = JSON.parse(saved);
    } else {
      // Load sample data
      qualifications = [
        {
          id: 1,
          degree: 'master',
          major: 'Computer Science',
          country: 'oman',
          institute: 'ut',
          grade: '3.99',
          graduationYear: '2022-01-01',
          attachments: ['234567_result.pdf', '23456_23456_certificate.png']
        },
        {
          id: 2,
          degree: 'bachelor',
          major: 'Software Engineering',
          country: 'oman',
          institute: 'squ',
          grade: '3.99',
          graduationYear: '2018-01-01',
          attachments: ['234567_result.pdf', '23456_23456_certificate.png']
        },
        {
          id: 3,
          degree: 'diploma',
          major: 'Computer Science',
          country: 'oman',
          institute: 'ut',
          grade: '3.99',
          graduationYear: '2016-01-01',
          attachments: ['234567_result.pdf', '23456_23456_certificate.png']
        }
      ];
    }
    
    renderQualifications();
  }

  // Professional Experience Management
  // Arrays are now declared globally at the top of the file

  function initializeProfessionalStep() {
    // Add new professional button
    $('#addProfessionalBtn').on('click', function(e) {
      console.log('Add Professional button clicked');
      console.log('Button disabled state:', $(this).prop('disabled'));
      
      // Check if button is disabled (fresh graduate mode)
      if ($(this).prop('disabled')) {
        console.log('Button is disabled, preventing modal from opening');
        e.preventDefault();
        e.stopPropagation();
        return false; // Don't open modal if button is disabled
      }
      
      console.log('Button is enabled, opening modal');
      openProfessionalModal();
    });

    // Modal close buttons
    $('#closeProfessionalModal, #closeProfessionalModalBtn').on('click', function() {
      closeProfessionalModal();
    });

    // Close modal on overlay click
    $('#professionalModal').on('click', function(e) {
      if (e.target === this) {
        closeProfessionalModal();
      }
    });

    // Professional form submission
    $('#professionalModalForm').on('submit', function(e) {
      e.preventDefault();
      saveProfessional();
    });

    // Country of employment change handler
    $('#modalCountryOfEmployment').on('change', function() {
      handleProfessionalCountryChange($(this).val());
    });

    // Governorate change handler for Wilayah updates
    $('#modalGovernorate').on('change', function() {
      updateProfessionalWilayahOptions();
    });

    // Fresh Graduate checkbox handler
    $('#freshGraduate').on('change', function() {
      handleFreshGraduateChange($(this).is(':checked'));
    });

    // Load saved professionals
    loadProfessionals();
  }

  // Open professional modal
  window.openProfessionalModal = function(professionalId = null) {
    editingProfessionalId = professionalId;
    
    if (professionalId) {
      // Edit mode - populate form with existing data
      const professional = professionals.find(p => p.id == professionalId);
      if (professional) {
        populateProfessionalForm(professional);
      }
    } else {
      // Add mode - clear form
      clearProfessionalForm();
    }
    
    $('#professionalModal').addClass('show');
    $('body').addClass('modal-open');
  };

  // Close professional modal
  function closeProfessionalModal() {
    $('#professionalModal').removeClass('show');
    $('body').removeClass('modal-open');
    editingProfessionalId = null;
    clearProfessionalForm();
  }

  // Clear professional form
  function clearProfessionalForm() {
    $('#professionalModalForm')[0].reset();
    $('#modalJobTitle').val('');
    $('#modalEmploymentType').val('');
    $('#modalEntity').val('');
    $('#modalCountryOfEmployment').val('');
    $('#modalYearsOfExperience').val('');
    $('#modalGovernorate').val('');
    $('#modalWilayah').val('');
    $('#modalCity').val('');
    
    // Reset conditional fields
    handleProfessionalCountryChange('');
    updateProfessionalWilayahOptions();
  }

  // Populate professional form with existing data
  function populateProfessionalForm(professional) {
    $('#modalJobTitle').val(professional.jobTitle);
    $('#modalEmploymentType').val(professional.employmentType);
    $('#modalEntity').val(professional.entity);
    $('#modalCountryOfEmployment').val(professional.countryOfEmployment);
    $('#modalYearsOfExperience').val(professional.yearsOfExperience);
    $('#modalGovernorate').val(professional.governorate);
    $('#modalWilayah').val(professional.wilayah);
    $('#modalCity').val(professional.city || '');
    
    // Handle conditional fields
    handleProfessionalCountryChange(professional.countryOfEmployment);
    updateProfessionalWilayahOptions();
  }

  // Save professional experience
  function saveProfessional() {
    const data = {
      jobTitle: $('#modalJobTitle').val().trim(),
      employmentType: $('#modalEmploymentType').val(),
      entity: $('#modalEntity').val().trim(),
      countryOfEmployment: $('#modalCountryOfEmployment').val(),
      yearsOfExperience: $('#modalYearsOfExperience').val().trim(),
      governorate: $('#modalGovernorate').val(),
      wilayah: $('#modalWilayah').val(),
      city: $('#modalCity').val().trim()
    };

    if (!validateProfessionalForm(data)) {
      return;
    }

    if (editingProfessionalId) {
      // Update existing professional
      const index = professionals.findIndex(p => p.id == editingProfessionalId);
      if (index !== -1) {
        professionals[index] = { ...professionals[index], ...data };
      }
    } else {
      // Add new professional
      const newProfessional = {
        id: Date.now(),
        ...data
      };
      professionals.push(newProfessional);
    }

    // Save to localStorage
    localStorage.setItem('professionals', JSON.stringify(professionals));
    
    // Render updated list
    renderProfessionals();
    
    // Close modal
    closeProfessionalModal();
    
    // Don't show success message here - will be shown when proceeding to next step
  }

  // Validate professional form
  function validateProfessionalForm(data) {
    const currentLang = localStorage.getItem('site-lang') || 'en';
    
    if (!data.jobTitle) {
      const errorMessage = currentLang === 'ar' ? 'المسمى الوظيفي مطلوب' : 'Job Title is required';
      showErrorMessage(errorMessage);
      return false;
    }
    if (!data.employmentType) {
      const errorMessage = currentLang === 'ar' ? 'نوع التوظيف مطلوب' : 'Employment Type is required';
      showErrorMessage(errorMessage);
      return false;
    }
    if (!data.entity) {
      const errorMessage = currentLang === 'ar' ? 'الجهة مطلوبة' : 'Entity is required';
      showErrorMessage(errorMessage);
      return false;
    }
    if (!data.countryOfEmployment) {
      const errorMessage = currentLang === 'ar' ? 'بلد التوظيف مطلوب' : 'Country of Employment is required';
      showErrorMessage(errorMessage);
      return false;
    }
    if (!data.yearsOfExperience) {
      const errorMessage = currentLang === 'ar' ? 'سنوات الخبرة مطلوبة' : 'Years of Experience is required';
      showErrorMessage(errorMessage);
      return false;
    }
    
    // Conditional validation based on country
    if (data.countryOfEmployment === 'oman') {
      if (!data.governorate) {
        const errorMessage = currentLang === 'ar' ? 'المحافظة مطلوبة لعمان' : 'Governorate is required for Oman';
        showErrorMessage(errorMessage);
        return false;
      }
      if (!data.wilayah) {
        const errorMessage = currentLang === 'ar' ? 'الولاية مطلوبة لعمان' : 'Wilayah is required for Oman';
        showErrorMessage(errorMessage);
        return false;
      }
    } else {
      if (!data.city) {
        const errorMessage = currentLang === 'ar' ? 'المدينة مطلوبة للبلدان غير عمان' : 'City is required for non-Oman countries';
        showErrorMessage(errorMessage);
        return false;
      }
    }
    
    return true;
  }

  // Load professionals from localStorage
  function loadProfessionals() {
    const saved = localStorage.getItem('professionals');
    if (saved) {
      professionals = JSON.parse(saved);
    } else {
      // Load sample data
      professionals = [
        {
          id: 1,
          jobTitle: 'Mobile App Developer',
          employmentType: 'full-time',
          entity: 'Global Computer Services L.L.C',
          countryOfEmployment: 'oman',
          yearsOfExperience: '5 years',
          governorate: 'north_batinah',
          wilayah: 'suwaiq',
          city: ''
        },
        {
          id: 2,
          jobTitle: 'Python Developer',
          employmentType: 'part-time',
          entity: 'Global Computer Services L.L.C',
          countryOfEmployment: 'oman',
          yearsOfExperience: '8 months',
          governorate: 'south_batinah',
          wilayah: 'al_rustaq',
          city: ''
        },
        {
          id: 3,
          jobTitle: 'UI/UX Designer',
          employmentType: 'part-time',
          entity: 'Global Computer Services L.L.C',
          countryOfEmployment: 'oman',
          yearsOfExperience: '8 months',
          governorate: 'south_batinah',
          wilayah: 'al_rustaq',
          city: ''
        }
      ];
    }
    
    // Check if user is fresh graduate and handle accordingly
    const savedFreshGraduate = localStorage.getItem('isFreshGraduate');
    const isFreshGraduate = savedFreshGraduate === 'true' || $('#freshGraduate').is(':checked');
    
    // Set checkbox state based on localStorage
    if (savedFreshGraduate === 'true') {
      $('#freshGraduate').prop('checked', true);
    }
    
    if (isFreshGraduate) {
      handleFreshGraduateChange(true);
    } else {
      renderProfessionals();
    }
  }

  // Render professionals list
  window.renderProfessionals = function() {
    const container = $('#professionalList');
    container.empty();
    
    if (professionals.length === 0) {
      container.html(`
        <div class="empty-state">
          <i class="fas fa-briefcase" style="font-size: 3rem; color: #6c757d; margin-bottom: 1rem;"></i>
          <p style="color: #6c757d; text-align: center;" data-text-en="No professional experience added yet. Click \"Add New\" to get started." data-text-ar="لم يتم إضافة خبرة مهنية بعد. انقر على \"إضافة جديد\" للبدء.">No professional experience added yet. Click "Add New" to get started.</p>
        </div>
      `);
      return;
    }
    
    professionals.forEach(professional => {
      const professionalElement = $(`
        <div class="professional-item" data-id="${professional.id}">
          <div class="professional-icon">
            <i class="fas fa-briefcase"></i>
          </div>
          <div class="professional-content">
            <div class="professional-header">
              <h4 class="job-title">${professional.jobTitle}</h4>
              <div class="professional-actions">
                <button type="button" class="btn-edit" onclick="editProfessional(${professional.id})">
                  <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="btn-delete" onclick="deleteProfessional(${professional.id})">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <div class="professional-details">
              <p class="employment-type">${getEmploymentTypeText(professional.employmentType)}</p>
              <p class="company-name">${professional.entity}</p>
              <p class="duration">${professional.yearsOfExperience}</p>
              <p class="location">${getProfessionalLocationText(professional)}</p>
            </div>
          </div>
        </div>
      `);
      container.append(professionalElement);
    });
  };

  // Edit professional
  window.editProfessional = function(id) {
    openProfessionalModal(id);
  };

  // Delete professional
window.deleteProfessional = function(id) {
  const currentLang = localStorage.getItem('site-lang') || 'en';
  const confirmMessage = currentLang === 'ar' ? 
    'هل أنت متأكد من أنك تريد حذف هذه الخبرة المهنية؟' : 
    'Are you sure you want to delete this professional experience?';
  
  if (confirm(confirmMessage)) {
    professionals = professionals.filter(p => p.id != id);
    localStorage.setItem('professionals', JSON.stringify(professionals));
    renderProfessionals();
    // Don't show success message here - will be shown when proceeding to next step
  }
};

  // Helper functions
  window.getEmploymentTypeText = function(type) {
    const currentLang = localStorage.getItem('site-lang') || 'en';
    const types = {
      'full-time': currentLang === 'ar' ? 'دوام كامل' : 'Full-time',
      'part-time': currentLang === 'ar' ? 'دوام جزئي' : 'Part-time',
      'contract': currentLang === 'ar' ? 'عقد' : 'Contract',
      'freelance': currentLang === 'ar' ? 'مستقل' : 'Freelance',
      'internship': currentLang === 'ar' ? 'تدريب' : 'Internship'
    };
    return types[type] || type;
  };

  window.getLocationText = function(country, city) {
    const countries = {
      'oman': 'Oman',
      'uae': 'UAE',
      'saudi': 'Saudi Arabia',
      'kuwait': 'Kuwait',
      'qatar': 'Qatar',
      'bahrain': 'Bahrain',
      'other': 'Other'
    };
    const countryName = countries[country] || country;
    return `${city}, ${countryName}`;
  };

  window.getProfessionalLocationText = function(professional) {
    if (professional.countryOfEmployment === 'oman') {
      const governorateName = getGovernorateName(professional.governorate);
      const wilayahName = getWilayahName(professional.wilayah);
      return `${governorateName}, ${wilayahName} Oman`;
    } else {
      return `${professional.city}, ${getCountryName(professional.countryOfEmployment)}`;
    }
  };

  window.getGovernorateName = function(code) {
    const currentLang = localStorage.getItem('site-lang') || 'en';
    const governorates = {
      'muscat': currentLang === 'ar' ? 'مسقط' : 'Muscat',
      'dhofar': currentLang === 'ar' ? 'ظفار' : 'Dhofar',
      'musandam': currentLang === 'ar' ? 'مسندم' : 'Musandam',
      'buraimi': currentLang === 'ar' ? 'البريمي' : 'Al Buraimi',
      'dakhiliyah': currentLang === 'ar' ? 'الداخلية' : 'Ad Dakhiliyah',
      'north_batinah': currentLang === 'ar' ? 'شمال الباطنة' : 'North Al Batinah',
      'south_batinah': currentLang === 'ar' ? 'جنوب الباطنة' : 'South Al Batinah',
      'north_sharqiyah': currentLang === 'ar' ? 'شمال الشرقية' : 'North Ash Sharqiyah',
      'south_sharqiyah': currentLang === 'ar' ? 'جنوب الشرقية' : 'South Ash Sharqiyah',
      'dhahirah': currentLang === 'ar' ? 'الظاهرة' : 'Adh Dhahirah',
      'wusta': currentLang === 'ar' ? 'الوسطى' : 'Al Wusta'
    };
    return governorates[code] || code;
  };

  window.getWilayahName = function(code) {
    const currentLang = localStorage.getItem('site-lang') || 'en';
    const wilayahs = {
      'muscat': currentLang === 'ar' ? 'مسقط' : 'Muscat',
      'muttrah': currentLang === 'ar' ? 'مطرح' : 'Muttrah',
      'seeb': currentLang === 'ar' ? 'السيب' : 'Seeb',
      'bausher': currentLang === 'ar' ? 'بوشر' : 'Bausher',
      'amerat': currentLang === 'ar' ? 'العامرات' : 'Al Amerat',
      'quriyat': currentLang === 'ar' ? 'قريات' : 'Quriyat',
      'suwaiq': currentLang === 'ar' ? 'صحار' : 'Suwaiq',
      'al_rustaq': currentLang === 'ar' ? 'الرستاق' : 'Al Rustaq'
    };
    return wilayahs[code] || code;
  };

  // Handle professional country change for conditional fields
  function handleProfessionalCountryChange(country) {
    const modalContent = $('.professional-modal');
    
    if (country === 'oman') {
      modalContent.removeClass('country-not-oman');
      $('#modalGovernorate').prop('required', true);
      $('#modalWilayah').prop('required', true);
      $('#modalCity').prop('required', false);
    } else {
      modalContent.addClass('country-not-oman');
      $('#modalGovernorate').prop('required', false);
      $('#modalWilayah').prop('required', false);
      $('#modalCity').prop('required', true);
    }
  }

  // Update professional Wilayah options based on selected Governorate
  function updateProfessionalWilayahOptions() {
    const governorate = $('#modalGovernorate').val();
    const wilayahSelect = $('#modalWilayah');
    
    // Clear current options
    wilayahSelect.empty();
    wilayahSelect.append('<option value="">Select Wilayah</option>');
    
    // Add options based on governorate
    const wilayahOptions = getWilayatOptions(governorate);
    wilayahOptions.forEach(option => {
      wilayahSelect.append(`<option value="${option.value}">${option.text}</option>`);
    });
  }

  // Render qualifications list
  function renderQualifications() {
    const container = $('#qualificationsList');
    container.empty();
    
    if (qualifications.length === 0) {
      container.html(`
        <div class="empty-state">
          <i class="fas fa-graduation-cap" style="font-size: 3rem; color: #6c757d; margin-bottom: 1rem;"></i>
          <p style="color: #6c757d; text-align: center;" data-text-en="No qualifications added yet. Click \"Add New\" to get started." data-text-ar="لم يتم إضافة مؤهلات بعد. انقر على \"إضافة جديد\" للبدء.">No qualifications added yet. Click "Add New" to get started.</p>
        </div>
      `);
      return;
    }
    
    qualifications.forEach(qualification => {
      const instituteName = getInstituteName(qualification.institute);
      const degreeText = getDegreeText(qualification.degree);
      const countryName = getCountryName(qualification.country);
      const graduationDate = new Date(qualification.graduationYear);
      const graduationYear = graduationDate.getFullYear();
      
      const qualificationElement = $(`
        <div class="qualification-item" data-id="${qualification.id}">
          <div class="qualification-icon">
            <i class="fas fa-graduation-cap"></i>
          </div>
          <div class="qualification-content">
            <div class="qualification-header">
              <h4 class="institute-name">${instituteName}</h4>
              <div class="qualification-actions">
                <button type="button" class="btn-edit" onclick="editQualification(${qualification.id})">
                  <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="btn-delete" onclick="deleteQualification(${qualification.id})">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
            <div class="qualification-details">
              <p class="degree-info">${degreeText} - ${qualification.major}</p>
              <p class="graduation-info" data-text-en="Graduation Year: ${graduationYear} Grade: ${qualification.grade}" data-text-ar="سنة التخرج: ${graduationYear} الدرجة: ${qualification.grade}">Graduation Year: ${graduationYear} Grade: ${qualification.grade}</p>
              <p class="country-info" data-text-en="Country: ${countryName}" data-text-ar="البلد: ${countryName}">Country: ${countryName}</p>
              <p class="attachments-info" data-text-en="Attachments: [${qualification.attachments.join(', ')}]" data-text-ar="المرفقات: [${qualification.attachments.join(', ')}]">Attachments: [${qualification.attachments.join(', ')}]</p>
            </div>
          </div>
        </div>
      `);
      
      container.append(qualificationElement);
    });
  }

  // Edit qualification
window.editQualification = function(id) {
  openQualificationModal(id);
}

// Delete qualification
window.deleteQualification = function(id) {
  const currentLang = localStorage.getItem('site-lang') || 'en';
  const confirmMessage = currentLang === 'ar' ? 
    'هل أنت متأكد من أنك تريد حذف هذا المؤهل؟' : 
    'Are you sure you want to delete this qualification?';
  
  if (confirm(confirmMessage)) {
    qualifications = qualifications.filter(q => q.id != id);
    localStorage.setItem('qualifications', JSON.stringify(qualifications));
    renderQualifications();
    // Don't show success message here - will be shown when proceeding to next step
  }
}

  // Helper functions
  function getInstituteName(code) {
    const currentLang = localStorage.getItem('site-lang') || 'en';
    const institutes = {
      'squ': currentLang === 'ar' ? 'جامعة السلطان قابوس' : 'University of Sultan Qaboos',
      'ut': currentLang === 'ar' ? 'جامعة التقنية والعلوم التطبيقية' : 'University of Technology and Applied Sciences',
      'muscat': currentLang === 'ar' ? 'جامعة مسقط' : 'Muscat University',
      'gulf': currentLang === 'ar' ? 'كلية الخليج' : 'Gulf College',
      'other': currentLang === 'ar' ? 'أخرى' : 'Other'
    };
    return institutes[code] || code;
  }

  function getDegreeText(code) {
    const currentLang = localStorage.getItem('site-lang') || 'en';
    const degrees = {
      'diploma': currentLang === 'ar' ? 'دبلوم' : 'Diploma',
      'bachelor': currentLang === 'ar' ? 'بكالوريوس' : 'Bachelor',
      'master': currentLang === 'ar' ? 'ماجستير' : 'Master',
      'phd': currentLang === 'ar' ? 'دكتوراه' : 'PhD'
    };
    return degrees[code] || code;
  }

  function getCountryName(code) {
    const currentLang = localStorage.getItem('site-lang') || 'en';
    const countries = {
      'oman': currentLang === 'ar' ? 'عمان' : 'Oman',
      'uae': currentLang === 'ar' ? 'الإمارات' : 'UAE',
      'saudi': currentLang === 'ar' ? 'المملكة العربية السعودية' : 'Saudi Arabia',
      'kuwait': currentLang === 'ar' ? 'الكويت' : 'Kuwait',
      'qatar': currentLang === 'ar' ? 'قطر' : 'Qatar',
      'bahrain': currentLang === 'ar' ? 'البحرين' : 'Bahrain',
      'other': currentLang === 'ar' ? 'أخرى' : 'Other'
    };
    return countries[code] || code;
  }


  // Initialize the page
  initializePage();
  
  // Initialize qualification functionality
  initializeQualificationStep();
});

// Language switching function
function switchLanguage(lang) {
  // Update language buttons
  $('.lang-btn').removeClass('active');
  $(`.lang-btn[data-lang="${lang}"]`).addClass('active');

  // Apply language styles like in register.js
  applyLanguageStyles(lang);

  // Show/hide language-specific elements
  if (lang === 'ar') {
    $('.title-ar, .form-title-ar, .form-subtitle-ar, .label-ar, .step-label-ar, .upload-btn-ar, .save-btn-ar, .prev-btn-ar, .complete-btn-ar, .note-ar, .copyright-ar, .add-new-ar, .btn-text-ar, .modal-title-ar, .summary-label-ar, .upload-text-ar, .file-types-ar, .progress-text-ar, .summary-label-ar').show();
    $('.title-en, .form-title-en, .form-subtitle-en, .label-en, .step-label-en, .upload-btn-en, .save-btn-en, .prev-btn-en, .complete-btn-en, .note-en, .copyright-en, .add-new-en, .btn-text-en, .modal-title-en, .summary-label-en, .upload-text-en, .file-types-en, .progress-text-en, .summary-label-en').hide();
  } else {
    $('.title-en, .form-title-en, .form-subtitle-en, .label-en, .step-label-en, .upload-btn-en, .save-btn-en, .prev-btn-en, .complete-btn-en, .note-en, .copyright-en, .add-new-en, .btn-text-en, .modal-title-en, .summary-label-en, .upload-text-en, .file-types-en, .progress-text-en, .summary-label-en').show();
    $('.title-ar, .form-title-ar, .form-subtitle-ar, .label-ar, .step-label-ar, .upload-btn-ar, .save-btn-ar, .prev-btn-ar, .complete-btn-ar, .note-ar, .copyright-ar, .add-new-ar, .btn-text-ar, .modal-title-ar, .summary-label-ar, .upload-text-ar, .file-types-ar, .progress-text-ar, .summary-label-ar').hide();
  }

  // Handle placeholder translations
  handlePlaceholderTranslations(lang);
  
  // Handle option text translations
  handleOptionTextTranslations(lang);
  
  // Handle data-text translations
  handleDataTextTranslations(lang);
  
  // Re-render qualification and professional cards to update translations
  if (typeof renderQualifications === 'function') {
    renderQualifications();
  }
  if (typeof renderProfessionals === 'function') {
    renderProfessionals();
  }
  
  // Store language preference
  localStorage.setItem('site-lang', lang);
}

// Apply language styles like in register.js
function applyLanguageStyles(lang) {
  const html = document.documentElement;
  const body = document.body;
  
  if (lang === 'ar') {
    html.setAttribute('dir', 'rtl');
    html.setAttribute('lang', 'ar');
    body.classList.add('rtl-lang');
    body.classList.add('arabic-font');
    
    // Load Google Fonts Tajawal as fallback
    if (!document.getElementById('tajawal-fallback')) {
      const link = document.createElement('link');
      link.id = 'tajawal-fallback';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap';
      document.head.appendChild(link);
    }
    
    // Force font update on body and html
    body.style.fontFamily = '"Tajawal", Arial, sans-serif';
    html.style.fontFamily = '"Tajawal", Arial, sans-serif';
    
    // Update CSS variables directly
    document.documentElement.style.setProperty('--eduact-font', '"Tajawal", Arial, sans-serif');
    document.documentElement.style.setProperty('--heading-font', '"Tajawal", Arial, sans-serif');
    
    // Apply RTL styles to form controls
    applyRTLFormStyles();
    
    // Force refresh of font rendering
    setTimeout(function() {
      // Trigger reflow
      body.style.display = 'none';
      body.offsetHeight; // trigger reflow
      body.style.display = '';
    }, 100);
    
  } else {
    html.setAttribute('dir', 'ltr');
    html.setAttribute('lang', 'en');
    body.classList.remove('rtl-lang');
    body.classList.remove('arabic-font');
    
    // Reset to Poppins font
    body.style.fontFamily = '"Poppins", sans-serif';
    html.style.fontFamily = '"Poppins", sans-serif';
    
    // Reset CSS variables to Poppins font
    document.documentElement.style.setProperty('--eduact-font', '"Poppins", sans-serif');
    document.documentElement.style.setProperty('--heading-font', '"Poppins", sans-serif');
    
    // Reset RTL styles
    resetRTLFormStyles();
  }
}

// Apply RTL styles to form controls
function applyRTLFormStyles() {
  // Apply RTL to all form controls
  const formControls = document.querySelectorAll('.form-control');
  formControls.forEach(control => {
    control.style.textAlign = 'right';
    control.style.direction = 'rtl';
    
    // Special handling for select dropdowns
    if (control.tagName === 'SELECT') {
      control.style.paddingRight = '1rem';
      control.style.paddingLeft = '2.5rem';
    }
    
    // Special handling for date inputs
    if (control.type === 'date') {
      control.style.paddingRight = '1rem';
      control.style.paddingLeft = '2.5rem';
    }
  });
  
  // Apply RTL to all form labels
  const formLabels = document.querySelectorAll('.form-label');
  formLabels.forEach(label => {
    label.style.textAlign = 'right';
  });
  
  // Apply RTL to all form groups
  const formGroups = document.querySelectorAll('.form-group');
  formGroups.forEach(group => {
    group.style.textAlign = 'right';
  });
  
  // Force repositioning of select icons
  const selectIcons = document.querySelectorAll('.select-icon');
  selectIcons.forEach(icon => {
    icon.style.right = 'auto';
    icon.style.left = '1rem';
  });
  
  // Force repositioning of date picker icons
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    // Add a small delay to ensure the browser has processed the RTL change
    setTimeout(() => {
      input.style.backgroundPosition = 'left 0.5rem center';
      input.style.backgroundRepeat = 'no-repeat';
    }, 100);
  });
}

// Reset RTL styles from form controls
function resetRTLFormStyles() {
  // Reset all form controls
  const formControls = document.querySelectorAll('.form-control');
  formControls.forEach(control => {
    control.style.textAlign = '';
    control.style.direction = '';
    control.style.paddingRight = '';
    control.style.paddingLeft = '';
  });
  
  // Reset all form labels
  const formLabels = document.querySelectorAll('.form-label');
  formLabels.forEach(label => {
    label.style.textAlign = '';
  });
  
  // Reset all form groups
  const formGroups = document.querySelectorAll('.form-group');
  formGroups.forEach(group => {
    group.style.textAlign = '';
  });
  
  // Reset select icon positions
  const selectIcons = document.querySelectorAll('.select-icon');
  selectIcons.forEach(icon => {
    icon.style.right = '';
    icon.style.left = '';
  });
  
  // Reset date picker icon positions
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    input.style.backgroundPosition = '';
    input.style.backgroundRepeat = '';
  });
}

// Initialize page
function initializePage() {
  // Load saved language preference
  const savedLang = localStorage.getItem('site-lang') || 'en';
  switchLanguage(savedLang);

  // Load saved form data
  loadSavedData();
}

// Go to specific step
window.goToStep = function(stepNumber) {
  console.log('=== goToStep Debug ===');
  console.log('goToStep called with:', stepNumber);
  console.log('totalSteps:', totalSteps);
  console.log('currentStep:', currentStep);
  console.log('jQuery loaded:', typeof $ !== 'undefined');
  console.log('Step elements found:', $('.form-step').length);
  
  if (stepNumber < 1 || stepNumber > totalSteps) {
    console.log('Invalid step number');
    return;
  }

  // Validate and save current step data before proceeding
  if (currentStep === 1 && stepNumber === 2) {
    console.log('Validating step 1...');
    if (!validateStep1()) {
      console.log('Step 1 validation failed');
      return;
    }
    console.log('Step 1 validation passed, saving data...');
    saveStepData(1);
  }

  // Validate qualifications before proceeding to step 3
  if (currentStep === 2 && stepNumber === 3) {
    console.log('Validating qualifications...');
    if (!validateQualifications()) {
      console.log('Qualifications validation failed');
      return;
    }
    console.log('Qualifications validation passed, saving data...');
    saveStepData(2);
  }

  // Validate professional experiences before proceeding to step 4
  if (currentStep === 3 && stepNumber === 4) {
    console.log('Validating professional experiences...');
    if (!validateProfessionalExperiences()) {
      console.log('Professional experiences validation failed');
      return;
    }
    console.log('Professional experiences validation passed, saving data...');
    saveStepData(3);
  }

  console.log('Hiding all steps...');
  // Hide all steps
  $('.form-step').removeClass('active');

  console.log('Showing target step...');
  // Show target step
  $(`#step-${stepNumber}`).addClass('active');

  console.log('Updating progress wizard...');
  // Update progress wizard
  updateProgressWizard(stepNumber);

  // Update current step
  currentStep = stepNumber;

  // Initialize step-specific functionality
  if (stepNumber === 4) {
    console.log('Initializing attachments step...');
    initializeAttachmentsStep();
  }

  console.log('Scrolling to form...');
  // Scroll to top of form
  $('.form-container').get(0).scrollIntoView({ behavior: 'smooth' });
  
  console.log('Step change completed. New currentStep:', currentStep);
  console.log('=== End Debug ===');
}

// Update progress wizard
function updateProgressWizard(activeStep) {
  $('.step').removeClass('active completed');
  
  for (let i = 1; i <= totalSteps; i++) {
    const stepElement = $(`.step[data-step="${i}"]`);
    if (i < activeStep) {
      stepElement.addClass('completed');
    } else if (i === activeStep) {
      stepElement.addClass('active');
    }
  }
}

// Validate step 1 (Personal Information)
function validateStep1() {
  console.log('=== validateStep1 Debug ===');
  let isValid = true;
  const form = $('#personalInfoForm');
  
  console.log('Form found:', form.length > 0);
  
  // Clear previous errors
  form.find('.form-control').removeClass('error');
  form.find('.error-message').remove();

  // Validate required fields (excluding readonly fields)
  const requiredFields = [
    'input[type="text"]:not(.readonly-field)',
    'input[type="tel"]:not(.readonly-field)',
    'input[type="email"]:not(.readonly-field)',
    'select'
  ];

  console.log('Checking required fields...');
  requiredFields.forEach(selector => {
    const fields = form.find(selector);
    console.log(`Found ${fields.length} fields for selector: ${selector}`);
    
    fields.each(function() {
      const field = $(this);
      const fieldValue = field.val();
      const value = fieldValue ? fieldValue.trim() : '';
      const fieldName = field.attr('name') || field.attr('id') || 'unknown';
      
      console.log(`Field ${fieldName}: value = "${value}"`);
      
      // Skip validation for hidden fields
      if (field.closest('.form-group').is(':hidden')) {
        console.log(`Field ${fieldName}: hidden, skipping`);
        return;
      }
      
      if (!value) {
        console.log(`Field ${fieldName}: empty, marking as error`);
        field.addClass('error');
        field.after('<div class="error-message">This field is required</div>');
        isValid = false;
      }
    });
  });

  // Validate email format (only for non-readonly fields)
  const emailField = form.find('input[type="email"]:not(.readonly-field)');
  const emailValue = emailField.val();
  const email = emailValue ? emailValue.trim() : '';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  console.log('Email validation:', email, emailRegex.test(email));
  
  if (email && !emailRegex.test(email)) {
    emailField.addClass('error');
    emailField.after('<div class="error-message">Please enter a valid email address</div>');
    isValid = false;
  }

  // Validate phone number format (only for non-readonly fields)
  const phoneField = form.find('input[type="tel"]:not(.readonly-field)');
  const phoneValue = phoneField.val();
  const phone = phoneValue ? phoneValue.trim() : '';
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  
  console.log('Phone validation:', phone, phoneRegex.test(phone));
  
  if (phone && !phoneRegex.test(phone)) {
    phoneField.addClass('error');
    phoneField.after('<div class="error-message">Please enter a valid phone number</div>');
    isValid = false;
  }

  console.log('Validation result:', isValid);
  console.log('=== End validateStep1 Debug ===');
  return isValid;
}

// Validate step 2 (Qualification Details)
function validateStep2() {
  // Add validation logic for qualification form
  // This will be implemented when the qualification form is fully built
  return true;
}

// Validate step 3 (Professional Details)
function validateStep3() {
  // Add validation logic for professional form
  // This will be implemented when the professional form is fully built
  return true;
}

// Validate step 4 (Attachments)
function validateStep4() {
  console.log('=== validateStep4 Debug ===');
  
  // Check if CV is uploaded
  const cvFiles = uploadedFiles.cv || [];
  if (cvFiles.length === 0) {
    const currentLang = localStorage.getItem('site-lang') || 'en';
    const errorMessage = currentLang === 'ar' ? 
      'السيرة الذاتية مطلوبة. يرجى تحميل سيرتك الذاتية قبل المتابعة.' : 
      'CV/Resume is required. Please upload your CV before proceeding.';
    showErrorMessage(errorMessage);
    console.log('CV not uploaded');
    console.log('=== End validateStep4 Debug ===');
    return false;
  }
  
  console.log('Attachments validation passed');
  console.log('=== End validateStep4 Debug ===');
  return true;
}

// Global variables for attachments
let uploadedFiles = {
  cv: []
};

// Initialize attachments step
function initializeAttachmentsStep() {
  console.log('Initializing attachments step...');
  
  // Load saved attachments
  loadAttachments();
  
  // CV Upload Area
  const cvUploadArea = $('#cvUploadArea');
  const cvFileInput = $('#cvFileInput');
  
  console.log('CV Upload Area found:', cvUploadArea.length > 0);
  console.log('CV File Input found:', cvFileInput.length > 0);
  
  if (cvUploadArea.length === 0 || cvFileInput.length === 0) {
    console.error('CV upload elements not found!');
    return;
  }
  
  // CV Upload Events - using a more robust approach
  let isFileDialogOpen = false;
  
  // Remove any existing click handlers first
  cvUploadArea.off('click');
  
  cvUploadArea.on('click', function(e) {
    console.log('CV upload area clicked - attempt:', Date.now());
    
    // Prevent if clicking on file input or if dialog is already open
    if (e.target.id === 'cvFileInput' || isFileDialogOpen) {
      console.log('Click prevented - target is file input or dialog already open');
      return;
    }
    
    // Prevent default and stop propagation
    e.preventDefault();
    e.stopImmediatePropagation();
    
    // Set flag immediately
    isFileDialogOpen = true;
    console.log('File dialog flag set to true');
    
    // Use requestAnimationFrame for better timing
    requestAnimationFrame(() => {
      try {
        cvFileInput[0].click();
        console.log('File input clicked successfully');
      } catch (error) {
        console.error('Error clicking file input:', error);
        isFileDialogOpen = false;
      }
      
      // Reset flag after a delay
      setTimeout(() => {
        isFileDialogOpen = false;
        console.log('File dialog flag reset to false');
      }, 2000);
    });
  });
  
  cvFileInput.on('change', function(e) {
    handleFileUpload(e.target.files, 'cv');
  });
  
  // Drag and Drop Events for CV
  cvUploadArea.on('dragover', function(e) {
    e.preventDefault();
    $(this).addClass('drag-over');
  });
  
  cvUploadArea.on('dragleave', function(e) {
    e.preventDefault();
    $(this).removeClass('drag-over');
  });
  
  cvUploadArea.on('drop', function(e) {
    e.preventDefault();
    $(this).removeClass('drag-over');
    const files = e.originalEvent.dataTransfer.files;
    handleFileUpload(files, 'cv');
  });
}

// Handle file upload
function handleFileUpload(files, type) {
  console.log(`Handling ${type} file upload...`);
  
  if (!files || files.length === 0) return;
  
  const maxFileSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['.pdf', '.doc', '.docx'];
  
  Array.from(files).forEach(file => {
    console.log('Processing file:', file.name, file.size, file.type);
    
    const currentLang = localStorage.getItem('site-lang') || 'en';
    
    // Validate file size
    if (file.size > maxFileSize) {
      const errorMessage = currentLang === 'ar' ? 
        `الملف "${file.name}" كبير جداً. الحد الأقصى للحجم هو 5 ميجابايت.` : 
        `File "${file.name}" is too large. Maximum size is 5MB.`;
      showErrorMessage(errorMessage);
      return;
    }
    
    // Validate file type
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      const errorMessage = currentLang === 'ar' ? 
        `الملف "${file.name}" ليس بتنسيق مدعوم. يرجى تحميل ملفات PDF أو DOC أو DOCX.` : 
        `File "${file.name}" is not a supported format. Please upload PDF, DOC, or DOCX files.`;
      showErrorMessage(errorMessage);
      return;
    }
    
    // Replace existing CV file
    uploadedFiles.cv = [];
    
    // Add file to uploaded files
    const fileInfo = {
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file
    };
    
    uploadedFiles.cv.push(fileInfo);
    
    // Update UI
    renderUploadedFiles('cv');
    updateUploadSummary();
    
    // Show success message
    const successMessage = currentLang === 'ar' ? 
      `تم تحميل السيرة الذاتية "${file.name}" بنجاح.` : 
      `CV "${file.name}" uploaded successfully.`;
    showSuccessMessage(successMessage);
  });
}

// Render uploaded files
function renderUploadedFiles(type) {
  console.log(`Rendering uploaded files for type: ${type}`);
  const container = $(`#${type}UploadedFiles`);
  const files = uploadedFiles[type];
  
  console.log('Container found:', container.length > 0);
  console.log('Files:', files);
  
  if (container.length === 0) {
    console.error(`Container #${type}UploadedFiles not found`);
    return;
  }
  
  container.empty();
  
  if (files.length === 0) {
    $(`#${type}UploadArea`).removeClass('has-file');
    return;
  }
  
  $(`#${type}UploadArea`).addClass('has-file');
  
  files.forEach(fileInfo => {
    const fileElement = $(`
      <div class="uploaded-file" data-id="${fileInfo.id}">
        <div class="file-info">
          <div class="file-icon">
            <i class="fas fa-file"></i>
          </div>
          <div class="file-details">
            <div class="file-name">${fileInfo.name}</div>
            <div class="file-size">${formatFileSize(fileInfo.size)}</div>
          </div>
        </div>
        <div class="file-actions">
          <button type="button" class="btn-remove-file" onclick="removeFile('${type}', ${fileInfo.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `);
    
    container.append(fileElement);
  });
}

// Remove file
window.removeFile = function(type, fileId) {
  console.log(`Removing file ${fileId} from ${type}`);
  
  uploadedFiles[type] = uploadedFiles[type].filter(file => file.id !== fileId);
  
  renderUploadedFiles(type);
  updateUploadSummary();
  
  showSuccessMessage('File removed successfully.');
};

// Format file size
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Update upload summary
function updateUploadSummary() {
  console.log('Updating upload summary...');
  const cvCount = uploadedFiles.cv.length;
  const cvSummaryElement = $('#cvSummary');
  
  console.log('CV count:', cvCount);
  console.log('CV Summary element found:', cvSummaryElement.length > 0);
  
  if (cvSummaryElement.length === 0) {
    console.error('CV Summary element not found!');
    return;
  }
  
  cvSummaryElement.text(cvCount > 0 ? uploadedFiles.cv[0].name : 'Not uploaded')
    .removeClass('uploaded not-uploaded')
    .addClass(cvCount > 0 ? 'uploaded' : 'not-uploaded');
}

// Load attachments from localStorage
function loadAttachments() {
  console.log('Loading attachments from localStorage...');
  const saved = localStorage.getItem('uploadedFiles');
  console.log('Saved data:', saved);
  
  if (saved) {
    try {
      const savedData = JSON.parse(saved);
      uploadedFiles = { cv: savedData.cv || [] };
      console.log('Loaded uploadedFiles:', uploadedFiles);
      renderUploadedFiles('cv');
      updateUploadSummary();
    } catch (error) {
      console.error('Error loading attachments:', error);
      uploadedFiles = { cv: [] };
    }
  } else {
    console.log('No saved attachments found');
    uploadedFiles = { cv: [] };
  }
}

// Validate qualifications (at least one required)
function validateQualifications() {
  console.log('=== validateQualifications Debug ===');
  console.log('Qualifications array:', qualifications);
  console.log('Qualifications length:', qualifications.length);
  
  if (!qualifications || qualifications.length === 0) {
    const currentLang = localStorage.getItem('site-lang') || 'en';
    const errorMessage = currentLang === 'ar' ? 
      'مؤهل واحد على الأقل مطلوب. يرجى إضافة مؤهل قبل المتابعة.' : 
      'At least one qualification is required. Please add a qualification before proceeding.';
    showErrorMessage(errorMessage);
    console.log('No qualifications found');
    console.log('=== End validateQualifications Debug ===');
    return false;
  }
  
  console.log('Qualifications validation passed');
  console.log('=== End validateQualifications Debug ===');
  return true;
}

// Validate professional experiences (at least one required)
function validateProfessionalExperiences() {
  console.log('=== validateProfessionalExperiences Debug ===');
  console.log('Professionals array:', professionals);
  console.log('Professionals length:', professionals.length);
  
  // Check if user is a fresh graduate
  const isFreshGraduate = $('#freshGraduate').is(':checked');
  console.log('Is Fresh Graduate:', isFreshGraduate);
  
  if (isFreshGraduate) {
    console.log('User is fresh graduate, no experience required');
    console.log('=== End validateProfessionalExperiences Debug ===');
    return true;
  }
  
  if (!professionals || professionals.length === 0) {
    const currentLang = localStorage.getItem('site-lang') || 'en';
    const errorMessage = currentLang === 'ar' ? 
      'خبرة مهنية واحدة على الأقل مطلوبة. يرجى إضافة خبرة مهنية قبل المتابعة.' : 
      'At least one professional experience is required. Please add a professional experience before proceeding.';
    showErrorMessage(errorMessage);
    console.log('No professional experiences found');
    console.log('=== End validateProfessionalExperiences Debug ===');
    return false;
  }
  
  console.log('Professional experiences validation passed');
  console.log('=== End validateProfessionalExperiences Debug ===');
  return true;
}

// Handle Fresh Graduate checkbox change
function handleFreshGraduateChange(isFreshGraduate) {
  console.log('=== handleFreshGraduateChange Debug ===');
  console.log('Is Fresh Graduate:', isFreshGraduate);
  
  // Save fresh graduate state to localStorage
  localStorage.setItem('isFreshGraduate', isFreshGraduate);
  
  if (isFreshGraduate) {
    // User is fresh graduate - clear all experiences and disable add button
    console.log('Clearing all professional experiences');
    professionals = [];
    localStorage.removeItem('professionals');
    
    // Hide the professional list and disable add button
    $('#professionalList').hide();
    $('#addProfessionalBtn').prop('disabled', true).addClass('disabled');
    console.log('Button disabled state after setting:', $('#addProfessionalBtn').prop('disabled'));
    
    // Show fresh graduate message
    if (!$('#freshGraduateMessage').length) {
      const currentLang = localStorage.getItem('site-lang') || 'en';
      const message = currentLang === 'ar' ? 
        'أنت محدد كخريج جديد. لا توجد خبرة مهنية مطلوبة.' : 
        'You are marked as a fresh graduate. No professional experience is required.';
      $('#professionalList').after(`<div id="freshGraduateMessage" class="fresh-graduate-message"><p>${message}</p></div>`);
    }
    $('#freshGraduateMessage').show();
    
  } else {
    // User is not fresh graduate - show add button and list
    console.log('Showing professional experience options');
    
    // Show the professional list and enable add button
    $('#professionalList').show();
    $('#addProfessionalBtn').prop('disabled', false).removeClass('disabled');
    console.log('Button disabled state after enabling:', $('#addProfessionalBtn').prop('disabled'));
    
    // Hide fresh graduate message
    $('#freshGraduateMessage').hide();
    
    // Re-render the list (will be empty initially)
    renderProfessionals();
  }
  
  console.log('=== End handleFreshGraduateChange Debug ===');
}

// Save step data
function saveStepData(stepNumber) {
  const formData = {};
  
  // Collect form data based on step
  switch(stepNumber) {
    case 1:
      $('#personalInfoForm').find('input, select').each(function() {
        const field = $(this);
        const name = field.attr('name') || field.attr('id') || field.attr('type');
        formData[name] = field.val();
      });
      break;
    case 2:
      $('#qualificationForm').find('input, select, textarea').each(function() {
        const field = $(this);
        const name = field.attr('name') || field.attr('id') || field.attr('type');
        formData[name] = field.val();
      });
      break;
    case 3:
      $('#professionalForm').find('input, select, textarea').each(function() {
        const field = $(this);
        const name = field.attr('name') || field.attr('id') || field.attr('type');
        formData[name] = field.val();
      });
      break;
          case 4:
        // Save CV data
        const cvData = {
          cv: uploadedFiles.cv.map(file => ({
            id: file.id,
            name: file.name,
            size: file.size,
            type: file.type
          }))
        };
        formData.attachments = cvData;
        localStorage.setItem('uploadedFiles', JSON.stringify(cvData));
        break;
  }

  // Save to localStorage
  localStorage.setItem(`profileStep${stepNumber}`, JSON.stringify(formData));
  
  // Show success message based on step
  const currentLang = localStorage.getItem('site-lang') || 'en';
  let successMessage = '';
  switch(stepNumber) {
    case 1:
      successMessage = currentLang === 'ar' ? 'تم حفظ المعلومات الشخصية بنجاح!' : 'Personal information saved successfully!';
      break;
    case 2:
      successMessage = currentLang === 'ar' ? 'تم حفظ المؤهلات بنجاح!' : 'Qualifications saved successfully!';
      break;
    case 3:
      successMessage = currentLang === 'ar' ? 'تم حفظ الخبرة المهنية بنجاح!' : 'Professional experience saved successfully!';
      break;
    case 4:
      successMessage = currentLang === 'ar' ? 'تم حفظ المرفقات بنجاح!' : 'Attachments saved successfully!';
      break;
    default:
      successMessage = currentLang === 'ar' ? `تم حفظ بيانات الخطوة ${stepNumber} بنجاح!` : `Step ${stepNumber} data saved successfully!`;
  }
  showSuccessMessage(successMessage);
}

// Load saved data
function loadSavedData() {
  for (let i = 1; i <= totalSteps; i++) {
    const savedData = localStorage.getItem(`profileStep${i}`);
    if (savedData) {
      const formData = JSON.parse(savedData);
      populateFormData(i, formData);
    }
  }
}

// Populate form data
function populateFormData(stepNumber, data) {
  switch(stepNumber) {
    case 1:
      Object.keys(data).forEach(key => {
        const field = $(`#personalInfoForm [name="${key}"], #personalInfoForm [id="${key}"]`);
        if (field.length) {
          field.val(data[key]);
        }
      });
      break;
    case 2:
      Object.keys(data).forEach(key => {
        const field = $(`#qualificationForm [name="${key}"], #qualificationForm [id="${key}"]`);
        if (field.length) {
          field.val(data[key]);
        }
      });
      break;
    case 3:
      Object.keys(data).forEach(key => {
        const field = $(`#professionalForm [name="${key}"], #professionalForm [id="${key}"]`);
        if (field.length) {
          field.val(data[key]);
        }
      });
      break;
    case 4:
      Object.keys(data).forEach(key => {
        const field = $(`#attachmentsForm [name="${key}"], #attachmentsForm [id="${key}"]`);
        if (field.length) {
          field.val(data[key]);
        }
      });
      break;
  }
}

// Handle country change
function handleCountryChange(country) {
  const formContainer = $('.form-fields');
  const addressRow = $('.address-row');
  
  if (country === 'oman') {
    formContainer.removeClass('country-not-oman');
    addressRow.removeClass('address-row');
    $('.oman-address-field').show();
    $('.non-oman-address-field').hide();
    
    // Update wilayat options based on governorate
    updateWilayatOptions();
  } else {
    formContainer.addClass('country-not-oman');
    addressRow.addClass('address-row');
    $('.oman-address-field').hide();
    $('.non-oman-address-field').show();
  }
}

// Update wilayat options based on selected governorate
function updateWilayatOptions() {
  const governorate = $('#governorate').val();
  const wilayatSelect = $('#wilayat');
  
  // Clear current options
  wilayatSelect.empty();
  
  // Add options based on governorate
  const wilayatOptions = getWilayatOptions(governorate);
  wilayatOptions.forEach(option => {
    wilayatSelect.append(`<option value="${option.value}">${option.text}</option>`);
  });
}

// Get wilayat options for a specific governorate
function getWilayatOptions(governorate) {
  const wilayatData = {
    'muscat': [
      { value: 'muscat', text: 'Muscat' },
      { value: 'muttrah', text: 'Muttrah' },
      { value: 'seeb', text: 'Seeb' },
      { value: 'bausher', text: 'Bausher' },
      { value: 'amerat', text: 'Al Amerat' },
      { value: 'quriyat', text: 'Quriyat' }
    ],
    'dhofar': [
      { value: 'salalah', text: 'Salalah' },
      { value: 'taqah', text: 'Taqah' },
      { value: 'mirbat', text: 'Mirbat' },
      { value: 'rakhyut', text: 'Rakhyut' },
      { value: 'thumrait', text: 'Thumrait' },
      { value: 'sadah', text: 'Sadah' },
      { value: 'shalim', text: 'Shalim and the Hallaniyat Islands' }
    ],
    'musandam': [
      { value: 'khasab', text: 'Khasab' },
      { value: 'bukha', text: 'Bukha' },
      { value: 'dibba', text: 'Dibba Al-Baya' },
      { value: 'madha', text: 'Madha' }
    ],
    'buraimi': [
      { value: 'al_buraimi', text: 'Al Buraimi' },
      { value: 'mahdah', text: 'Mahdah' }
    ],
    'dakhiliyah': [
      { value: 'nizwa', text: 'Nizwa' },
      { value: 'sumail', text: 'Sumail' },
      { value: 'bahla', text: 'Bahla' },
      { value: 'adam', text: 'Adam' },
      { value: 'manah', text: 'Manah' },
      { value: 'al_hamra', text: 'Al Hamra' }
    ],
    'north_batinah': [
      { value: 'sohar', text: 'Sohar' },
      { value: 'shinas', text: 'Shinas' },
      { value: 'liwa', text: 'Liwa' },
      { value: 'saham', text: 'Saham' },
      { value: 'al_khaburah', text: 'Al Khaburah' },
      { value: 'al_suwaiq', text: 'Al Suwaiq' }
    ],
    'south_batinah': [
      { value: 'rustaq', text: 'Rustaq' },
      { value: 'al_awabi', text: 'Al Awabi' },
      { value: 'nakhal', text: 'Nakhal' },
      { value: 'wadi_al_maawil', text: 'Wadi Al Maawil' },
      { value: 'al_musanaah', text: 'Al Musanaah' },
      { value: 'barka', text: 'Barka' }
    ],
    'north_sharqiyah': [
      { value: 'ibra', text: 'Ibra' },
      { value: 'al_mudhaibi', text: 'Al Mudhaibi' },
      { value: 'bid_bid', text: 'Bid Bid' },
      { value: 'al_amerat', text: 'Al Amerat' },
      { value: 'manah', text: 'Manah' },
      { value: 'dama_wa_taeen', text: 'Dama Wa Taeeen' }
    ],
    'south_sharqiyah': [
      { value: 'sur', text: 'Sur' },
      { value: 'al_kamil_wa_al_wafi', text: 'Al Kamil Wa Al Wafi' },
      { value: 'jalan_bani_bu_ali', text: 'Jalan Bani Bu Ali' },
      { value: 'jalan_bani_bu_hasan', text: 'Jalan Bani Bu Hasan' },
      { value: 'masirah', text: 'Masirah' }
    ],
    'wusta': [
      { value: 'haima', text: 'Haima' },
      { value: 'mahout', text: 'Mahout' },
      { value: 'duqm', text: 'Duqm' }
    ]
  };
  
  return wilayatData[governorate] || wilayatData['muscat'];
}



// Handle photo upload
function handlePhotoUpload(file) {
  const currentLang = localStorage.getItem('site-lang') || 'en';
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    const errorMessage = currentLang === 'ar' ? 'يرجى اختيار ملف صورة' : 'Please select an image file';
    showErrorMessage(errorMessage);
    return;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    const errorMessage = currentLang === 'ar' ? 'حجم الملف يجب أن يكون أقل من 5 ميجابايت' : 'File size should be less than 5MB';
    showErrorMessage(errorMessage);
    return;
  }

  // Create preview
  const reader = new FileReader();
  reader.onload = function(e) {
    const photoPlaceholder = $('.photo-placeholder');
    photoPlaceholder.html(`<img src="${e.target.result}" alt="Profile Photo" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`);
    
    // Store the image data
    localStorage.setItem('profilePhoto', e.target.result);
    
    const successMessage = currentLang === 'ar' ? 'تم تحميل الصورة بنجاح!' : 'Photo uploaded successfully!';
    showSuccessMessage(successMessage);
  };
  reader.readAsDataURL(file);
}

// Complete profile
function completeProfile() {
  // Show loading state
  const submitBtn = $('#attachmentsForm .btn-primary');
  const originalText = submitBtn.html();
  submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Completing...');

  // Simulate API call
  setTimeout(() => {
    // Clear saved data
    for (let i = 1; i <= totalSteps; i++) {
      localStorage.removeItem(`profileStep${i}`);
    }
    localStorage.removeItem('profilePhoto');

    // Show success message
    const currentLang = localStorage.getItem('site-lang') || 'en';
    const completionMessage = currentLang === 'ar' ? 'تم إكمال الملف الشخصي بنجاح!' : 'Profile completed successfully!';
    showSuccessMessage(completionMessage);

    // Redirect to dashboard or next page
    setTimeout(() => {
      window.location.href = 'index.html'; // or wherever you want to redirect
    }, 2000);

    // Reset button
    submitBtn.prop('disabled', false).html(originalText);
  }, 2000);
}

// Show success message
function showSuccessMessage(message) {
  const messageId = 'success-' + Date.now();
  const messageHtml = `
    <div id="${messageId}" class="alert alert-success fade show" role="alert" style="position: fixed; top: 20px; right: 20px; z-index: 1000; min-width: 300px; display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center;">
        <i class="fas fa-check-circle" style="margin-right: 8px;"></i> ${message}
      </div>
      <button type="button" onclick="closeMessage('${messageId}')" style="background: none; border: none; font-size: 18px; cursor: pointer; color: inherit; margin-left: 10px; padding: 0; line-height: 1;">&times;</button>
    </div>
  `;
  
  $('body').append(messageHtml);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    closeMessage(messageId);
  }, 3000);
}

// Show error message
function showErrorMessage(message) {
  const messageId = 'error-' + Date.now();
  const messageHtml = `
    <div id="${messageId}" class="alert alert-danger fade show" role="alert" style="position: fixed; top: 20px; right: 20px; z-index: 1000; min-width: 300px; display: flex; align-items: center; justify-content: space-between;">
      <div style="display: flex; align-items: center;">
        <i class="fas fa-exclamation-circle" style="margin-right: 8px;"></i> ${message}
      </div>
      <button type="button" onclick="closeMessage('${messageId}')" style="background: none; border: none; font-size: 18px; cursor: pointer; color: inherit; margin-left: 10px; padding: 0; line-height: 1;">&times;</button>
    </div>
  `;
  
  $('body').append(messageHtml);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    closeMessage(messageId);
  }, 5000);
}

// Close message function
window.closeMessage = function(messageId) {
  $(`#${messageId}`).fadeOut(300, function() {
    $(this).remove();
  });
};

// Form field validation on blur
$(document).on('blur', '.form-control', function() {
  const field = $(this);
  const value = field.val().trim();
  
  // Skip validation for readonly fields
  if (field.hasClass('readonly-field')) {
    return;
  }
  
  // Remove previous error state
  field.removeClass('error');
  field.siblings('.error-message').remove();
  
  // Validate if required
  if (field.prop('required') && !value) {
    field.addClass('error');
    const currentLang = localStorage.getItem('site-lang') || 'en';
    const errorMessage = currentLang === 'ar' ? 'هذا الحقل مطلوب' : 'This field is required';
    field.after(`<div class="error-message">${errorMessage}</div>`);
  }
  
  // Validate email
  if (field.attr('type') === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      field.addClass('error');
      const currentLang = localStorage.getItem('site-lang') || 'en';
      const errorMessage = currentLang === 'ar' ? 'يرجى إدخال عنوان بريد إلكتروني صحيح' : 'Please enter a valid email address';
      field.after(`<div class="error-message">${errorMessage}</div>`);
    }
  }
  
  // Validate phone
  if (field.attr('type') === 'tel' && value) {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(value)) {
      field.addClass('error');
      const currentLang = localStorage.getItem('site-lang') || 'en';
      const errorMessage = currentLang === 'ar' ? 'يرجى إدخال رقم هاتف صحيح' : 'Please enter a valid phone number';
      field.after(`<div class="error-message">${errorMessage}</div>`);
    }
  }
});

// Clear error on input
$(document).on('input', '.form-control', function() {
  const field = $(this);
  
  // Skip readonly fields
  if (field.hasClass('readonly-field')) {
    return;
  }
  
  field.removeClass('error');
  field.siblings('.error-message').remove();
});

// Keyboard navigation for wizard steps
$(document).on('keydown', function(e) {
  if (e.ctrlKey || e.metaKey) {
    switch(e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        if (currentStep > 1) {
          goToStep(currentStep - 1);
        }
        break;
      case 'ArrowRight':
        e.preventDefault();
        if (currentStep < totalSteps) {
          goToStep(currentStep + 1);
        }
        break;
    }
  }
});

// Handle placeholder translations
function handlePlaceholderTranslations(lang) {
  const inputs = document.querySelectorAll('input[data-placeholder-en][data-placeholder-ar]');
  inputs.forEach(input => {
    if (lang === 'ar') {
      input.placeholder = input.getAttribute('data-placeholder-ar');
    } else {
      input.placeholder = input.getAttribute('data-placeholder-en');
    }
  });
}

// Handle option text translations
function handleOptionTextTranslations(lang) {
  const options = document.querySelectorAll('option[data-text-en][data-text-ar]');
  options.forEach(option => {
    if (lang === 'ar') {
      option.textContent = option.getAttribute('data-text-ar');
    } else {
      option.textContent = option.getAttribute('data-text-en');
    }
  });
}

// Handle data-text translations
function handleDataTextTranslations(lang) {
  const elements = document.querySelectorAll('[data-text-en][data-text-ar]');
  elements.forEach(element => {
    if (lang === 'ar') {
      element.textContent = element.getAttribute('data-text-ar');
    } else {
      element.textContent = element.getAttribute('data-text-en');
    }
  });
}