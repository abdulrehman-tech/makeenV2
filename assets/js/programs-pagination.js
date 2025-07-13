// Programs Pagination and Search Functionality
document.addEventListener("DOMContentLoaded", function () {
  // Configuration
  const ITEMS_PER_PAGE = 12; // Show 12 programs per page

  // Get all program cards and search input
  const programCards = document.querySelectorAll(".program-card");
  const searchInput = document.querySelector('input[name="search"]');
  const allCards = Array.from(programCards);
  let filteredCards = allCards;
  let currentPage = 1;

  // Function to search programs by title
  function searchPrograms(query) {
    const searchTerm = query.toLowerCase().trim();
    
    if (searchTerm === "") {
      filteredCards = allCards;
    } else {
      filteredCards = allCards.filter(card => {
        const titleElement = card.querySelector('.program-title span[data-i18n]');
        const titleText = titleElement ? titleElement.textContent.toLowerCase() : '';
        return titleText.includes(searchTerm);
      });
    }
    
    // Reset to first page when searching
    currentPage = 1;
    
    // Hide all cards first
    allCards.forEach(card => {
      card.style.display = "none";
    });
    
    // Update pagination with filtered results
    updatePagination(false);
    
    // Show/hide no results message
    showNoResultsMessage(filteredCards.length === 0 && searchTerm !== "");
  }

  // Function to show/hide no results message
  function showNoResultsMessage(show) {
    let noResultsDiv = document.getElementById('no-results-message');
    
    if (show && !noResultsDiv) {
      // Create no results message
      noResultsDiv = document.createElement('div');
      noResultsDiv.id = 'no-results-message';
      noResultsDiv.className = 'no-results text-center';
      noResultsDiv.innerHTML = `
        <div style="padding: 80px 20px; max-width: 500px; margin: 0 auto;">
          <div style="margin-bottom: 40px;">
            <img src="assets/images/not-found.png" alt="No Results Found" style="max-width: 300px; width: 100%; height: auto; opacity: 0.8;">
          </div>
          <h3 style="color: #2c2c2c; font-size: 24px; font-weight: 600; margin-bottom: 12px; font-family: inherit;" data-i18n="no-results-title">Result Not Found</h3>
          <p style="color: #757575; font-size: 16px; line-height: 1.5; margin: 0; font-family: inherit;" data-i18n="no-results-text">Whoops... the search result not found, please try a different search</p>
        </div>
      `;
      
      // Insert after programs grid
      const programsGrid = document.querySelector('.programs-grid');
      programsGrid.parentNode.insertBefore(noResultsDiv, programsGrid.nextSibling);
      
      // Apply translations using the existing translation system
      if (window.setLanguage) {
        const currentLang = localStorage.getItem('site-lang') || 'en';
        const titleEl = noResultsDiv.querySelector('[data-i18n="no-results-title"]');
        const textEl = noResultsDiv.querySelector('[data-i18n="no-results-text"]');
        
        if (window.translations && window.translations[currentLang]) {
          if (titleEl && window.translations[currentLang]['no-results-title']) {
            titleEl.textContent = window.translations[currentLang]['no-results-title'];
          }
          if (textEl && window.translations[currentLang]['no-results-text']) {
            textEl.textContent = window.translations[currentLang]['no-results-text'];
          }
        }
      }
    } else if (!show && noResultsDiv) {
      noResultsDiv.style.display = 'none';
    } else if (show && noResultsDiv) {
      noResultsDiv.style.display = 'block';
    }
  }

  // Function to show programs for current page
  function showPage(page) {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    // Hide all cards first
    allCards.forEach(card => {
      card.style.display = "none";
    });

    // Show only filtered cards for current page
    filteredCards.forEach((card, index) => {
      if (index >= start && index < end) {
        card.style.display = "block";
      }
    });
  }

  // Function to create pagination buttons
  function createPagination() {
    const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);
    const paginationList = document.getElementById("pagination-list");
    paginationList.innerHTML = "";

    // Previous button
    const prevItem = document.createElement("li");
    prevItem.className = `page-item ${
      currentPage === 1 ? "disabled" : ""
    }`;
    prevItem.innerHTML = `
      <a class="page-link" href="#" aria-label="Previous" ${
        currentPage === 1 ? 'tabindex="-1"' : ""
      }>
        <i class="fas fa-chevron-left"></i>
      </a>
    `;
    prevItem.addEventListener("click", function (e) {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        updatePagination(true);
      }
    });
    paginationList.appendChild(prevItem);

    // Page numbers
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    // Show first page if not in range
    if (startPage > 1) {
      const firstPageItem = createPageItem(1);
      paginationList.appendChild(firstPageItem);

      if (startPage > 2) {
        const ellipsisItem = document.createElement("li");
        ellipsisItem.className = "page-item";
        ellipsisItem.innerHTML = '<span class="page-link">...</span>';
        paginationList.appendChild(ellipsisItem);
      }
    }

    // Main page numbers
    for (let i = startPage; i <= endPage; i++) {
      const pageItem = createPageItem(i);
      paginationList.appendChild(pageItem);
    }

    // Show last page if not in range
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const ellipsisItem = document.createElement("li");
        ellipsisItem.className = "page-item";
        ellipsisItem.innerHTML = '<span class="page-link">...</span>';
        paginationList.appendChild(ellipsisItem);
      }

      const lastPageItem = createPageItem(totalPages);
      paginationList.appendChild(lastPageItem);
    }

    // Next button
    const nextItem = document.createElement("li");
    nextItem.className = `page-item ${
      currentPage === totalPages ? "disabled" : ""
    }`;
    nextItem.innerHTML = `
      <a class="page-link" href="#" aria-label="Next" ${
        currentPage === totalPages ? 'tabindex="-1"' : ""
      }>
        <i class="fas fa-chevron-right"></i>
      </a>
    `;
    nextItem.addEventListener("click", function (e) {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        updatePagination(true);
      }
    });
    paginationList.appendChild(nextItem);
  }

  // Function to create individual page item
  function createPageItem(pageNumber) {
    const pageItem = document.createElement("li");
    pageItem.className = `page-item ${
      currentPage === pageNumber ? "active" : ""
    }`;
    pageItem.innerHTML = `<a class="page-link" href="#">${pageNumber}</a>`;

    pageItem.addEventListener("click", function (e) {
      e.preventDefault();
      currentPage = pageNumber;
      updatePagination(true);
    });

    return pageItem;
  }

  // Function to update programs counter text
  function updateCounter() {
    const totalItems = filteredCards.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE + 1;
    const end = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);
    const counterText = document.getElementById("programs-counter-text");

    if (counterText) {
      if (totalItems === 0) {
        counterText.textContent = "No programs found";
      } else if (totalItems === 1) {
        counterText.textContent = "Showing 1 program";
      } else if (totalPages === 1) {
        counterText.textContent = `Showing all ${totalItems} programs`;
      } else {
        counterText.textContent = `Showing ${start}-${end} of ${totalItems} programs`;
      }
    }
  }

  // Function to update pagination and visible programs
  function updatePagination(shouldScroll = false) {
    showPage(currentPage);
    createPagination();
    updateCounter();

    // Only scroll if explicitly requested (user pagination action)
    if (shouldScroll) {
      const programsSection = document.querySelector(
        ".programs-content-section"
      );
      if (programsSection) {
        programsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }

  // Hide pagination if only one page
  function togglePaginationVisibility() {
    const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);
    const paginationContainer = document.getElementById(
      "pagination-container"
    );
    if (totalPages <= 1) {
      paginationContainer.style.display = "none";
    } else {
      paginationContainer.style.display = "block";
    }
  }

  // Initialize pagination
  function initializePagination() {
    if (allCards.length > 0) {
      togglePaginationVisibility();
      updatePagination(false); // Don't scroll on initial load
    }
  }

  // Add search event listener
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      searchPrograms(e.target.value);
    });

    // Also handle search on form submit
    const searchForm = searchInput.closest('form');
    if (searchForm) {
      searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        searchPrograms(searchInput.value);
      });
    }
  }

  // Start pagination after a small delay to ensure all content is loaded
  setTimeout(initializePagination, 100);
}); 