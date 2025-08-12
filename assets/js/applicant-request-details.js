document.addEventListener('DOMContentLoaded', function() {
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
      header.addEventListener('click', function() {
        const wasExpanded = this.getAttribute('aria-expanded') === 'true';
        
        // Toggle current item
        this.setAttribute('aria-expanded', !wasExpanded);
        
        if (wasExpanded) {
          // Collapse
          content.style.maxHeight = '0';
          content.style.padding = '0 1.5rem';
          setTimeout(() => {
            content.classList.remove('show');
          }, 300);
        } else {
          // Expand
          content.classList.add('show');
          content.style.maxHeight = content.scrollHeight + 'rem';
          content.style.padding = '1rem 1.5rem';
          
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
