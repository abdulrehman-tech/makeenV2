// Add Program Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeAddProgramPage();
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
            <i class="fas fa-bars section-icon"></i>
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
