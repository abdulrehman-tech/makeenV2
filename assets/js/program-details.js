/**
 * Program Details Page JavaScript
 */

(function ($) {
  "use strict";

  // Program Details Page Functionality

(function($) {
    'use strict';

    // Throttle function for better performance
    function throttle(func, wait) {
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

    // Initialize Program Details functionality
    function initProgramDetails() {
        const stickyNav = $('.program-sticky-nav');
        const stickyCard = $('.sticky-enrollment-card');
        const sections = $('.program-section');
        const navLinks = $('.program-nav__link');
        let isScrolling = false;

        // Show sticky card when scrolling starts and nav becomes sticky
        function handleStickyElements() {
          const scrollTop = $(window).scrollTop();
          const heroHeight = $('.program-details-hero').outerHeight();
          const stickyCardHeight = stickyCard.outerHeight();
          const windowHeight = $(window).height();
          const documentHeight = $(document).height();
      
          // Show sticky card after hero section
          if (scrollTop > heroHeight - 100) {
              stickyCard.addClass('visible');
          } else {
              stickyCard.removeClass('visible');
          }
      
          // Hide sticky card if page is scrolled to the bottom (or very close)
          const scrollBottom = scrollTop + windowHeight;
      
          if (scrollBottom >= documentHeight - 10) {
              stickyCard.addClass('hide');
          } else {
              stickyCard.removeClass('hide');
          }
      }
      
      

        // Update active navigation based on scroll position (improved version)
        function updateActiveSection() {
            const scrollTop = $(window).scrollTop();
            const scrollOffset = 150; // Offset for better UX
            
            let activeSection = '';
            let maxVisibleHeight = 0;
            
            // Find section with most visible area for better stability
            sections.each(function() {
                const section = $(this);
                const sectionTop = section.offset().top;
                const sectionHeight = section.outerHeight();
                const sectionBottom = sectionTop + sectionHeight;
                
                // Calculate visible portion
                const visibleTop = Math.max(sectionTop, scrollTop + scrollOffset);
                const visibleBottom = Math.min(sectionBottom, scrollTop + $(window).height());
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                
                if (visibleHeight > maxVisibleHeight && visibleHeight > 50) {
                    maxVisibleHeight = visibleHeight;
                    activeSection = section.attr('id');
                }
            });
            
            // Fallback to traditional method if needed
            if (!activeSection) {
                sections.each(function() {
                    const section = $(this);
                    const sectionTop = section.offset().top - scrollOffset;
                    const sectionBottom = sectionTop + section.outerHeight();
                    
                    if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                        activeSection = section.attr('id');
                        return false;
                    }
                });
            }
            
            // Update navigation active state
            navLinks.removeClass('active');
            if (activeSection) {
                navLinks.filter(`[href="#${activeSection}"]`).addClass('active');
            }
        }

        // Smooth scroll to section when nav link is clicked
        function handleNavClick() {
            let isScrollingInternal = false;
            
            navLinks.on('click', function(e) {
                e.preventDefault();
                
                const targetId = $(this).attr('href');
                const targetSection = $(targetId);
                const clickedLink = $(this);
                
                if (targetSection.length && !isScrollingInternal) {
                    isScrollingInternal = true;
                    
                    // Update active state immediately
                    navLinks.removeClass('active');
                    clickedLink.addClass('active');
                    
                    const offsetTop = targetSection.offset().top - 120; // Account for sticky nav
                    
                    $('html, body').animate({
                        scrollTop: offsetTop
                    }, 800, 'easeInOutQuart', function() {
                        // Animation complete
                        setTimeout(function() {
                            isScrollingInternal = false;
                        }, 100);
                    });
                }
            });
        }

        // FAQ toggle functionality
        function initFAQs() {
            $('.faq-question').on('click', function() {
                const faqItem = $(this).closest('.faq-item');
                const isActive = faqItem.hasClass('active');
                
                // Close all other FAQs
                $('.faq-item').removeClass('active');
                
                // Toggle current FAQ
                if (!isActive) {
                    faqItem.addClass('active');
                }
            });
        }

        // Scroll event handler with throttling
        const throttledScrollHandler = throttle(function() {
            handleStickyElements();
            updateActiveSection();
        }, 16); // ~60fps

        // Initialize all functionality
        function init() {
            handleNavClick();
            initFAQs();
            
            // Bind scroll events
            $(window).on('scroll', throttledScrollHandler);
            
            // Initial call to set correct state
            handleStickyElements();
            updateActiveSection();
            
            // Handle resize events
            $(window).on('resize', throttle(function() {
                handleStickyElements();
                updateActiveSection();
            }, 250));
        }

        // Start initialization
        init();
    }

    // Initialize when document is ready
    $(document).ready(function() {
        initProgramDetails();
    });

    // Also initialize when window loads (for cached pages)
    $(window).on('load', function() {
        setTimeout(function() {
            initProgramDetails();
        }, 100);
    });

})(jQuery);

  // Enrollment Card Interactions
  const ProgramDetails = {

    // Sticky Navigation
    stickyNavigation: function () {
      const stickyNav = $('.program-sticky-nav');
      const heroSection = $('.program-details-hero');
      
      if (stickyNav.length && heroSection.length) {
        // Create placeholder to prevent content jump
        if (!$('.sticky-nav-placeholder').length) {
          stickyNav.after('<div class="sticky-nav-placeholder"></div>');
        }
        const placeholder = $('.sticky-nav-placeholder');
        
        // Function to check if device is desktop (sticky nav should only work on desktop)
        function isDesktop() {
          return $(window).width() > 991; // Only enable on screens larger than tablet
        }
        
        // Function to get header height with extra clearance
        function getHeaderHeight() {
          const actualHeaderHeight = $('.main-header').outerHeight();
          const baseHeight = actualHeaderHeight || 80;
          // Add extra clearance to ensure sticky nav doesn't get hidden
          return baseHeight + 30;
        }
        
        function updateStickyNav() {
          // Only run sticky behavior on desktop
          if (!isDesktop()) {
            stickyNav.removeClass('is-sticky');
            placeholder.removeClass('active');
            return;
          }
          
          const scrollTop = $(window).scrollTop();
          const mainHeaderHeight = getHeaderHeight();
          const heroHeight = heroSection.outerHeight();
          
          // Calculate trigger point - when nav should become sticky
          // This should be when the navigation reaches the top of the viewport
          const navOriginalPosition = heroHeight;
          const triggerPoint = navOriginalPosition - mainHeaderHeight;
          
          if (scrollTop >= triggerPoint) {
            stickyNav.addClass('is-sticky');
            placeholder.addClass('active');
          } else {
            // Reset to original position when scrolled back up
            stickyNav.removeClass('is-sticky');
            placeholder.removeClass('active');
          }
        }
        
        $(window).on('scroll', updateStickyNav);
        $(window).on('resize', function() {
          // Recalculate on resize and check if still desktop
          setTimeout(function() {
            if (!isDesktop()) {
              // Reset sticky state on mobile/tablet
              stickyNav.removeClass('is-sticky');
              placeholder.removeClass('active');
            } else {
              updateStickyNav();
            }
          }, 100);
        });
        
        // Initial call
        updateStickyNav();
      }
    },

    // FAQ Toggle Functionality
    faqToggle: function () {
      $('.faq-question').on('click', function () {
        const faqItem = $(this).closest('.faq-item');
        const isActive = faqItem.hasClass('active');
        
        // Close all other FAQ items
        $('.faq-item').not(faqItem).removeClass('active');
        
        // Toggle current FAQ item
        if (isActive) {
          faqItem.removeClass('active');
        } else {
          faqItem.addClass('active');
        }
      });
    },

    // Smooth Scrolling for Navigation Links
    smoothScrolling: function () {
      let isScrolling = false; // Flag to prevent conflicts
      
      $('.program-nav__link').on('click', function (e) {
        e.preventDefault();
        
        const target = $(this).attr('href');
        const targetElement = $(target);
        const clickedLink = $(this);
        
        if (targetElement.length && !isScrolling) {
          isScrolling = true;
          
          // Immediately update active state to prevent flickering
          $('.program-nav__link').removeClass('active');
          clickedLink.addClass('active');
          
          const mainHeaderHeight = $('.main-header').outerHeight() || 80;
          const stickyNavHeight = $('.program-sticky-nav').outerHeight() || 80;
          const offset = mainHeaderHeight + stickyNavHeight + 50;
          
          $('html, body').animate({
            scrollTop: targetElement.offset().top - offset
          }, 800, 'easeInOutCubic', function() {
            // Animation complete - re-enable scroll detection
            setTimeout(function() {
              isScrolling = false;
            }, 100);
          });
        }
      });
      
      // Store the scrolling state globally for other functions to access
      this.isScrolling = function() {
        return isScrolling;
      };
    },

    // Active Navigation Highlighting
    activeNavigation: function () {
      const sections = $('.program-section');
      const navLinks = $('.program-nav__link');
      const self = this;
      let currentActiveSection = '';
      let scrollTimer = null;
      
      if (sections.length && navLinks.length) {
        // Throttled scroll handler to prevent flickering
        $(window).on('scroll', function () {
          // Skip if currently in smooth scroll animation
          if (self.isScrolling && self.isScrolling()) {
            return;
          }
          
          // Clear existing timer
          if (scrollTimer) {
            clearTimeout(scrollTimer);
          }
          
          // Set a longer delay during user scrolling to prevent conflicts
          scrollTimer = setTimeout(function() {
            // Double-check we're not scrolling
            if (self.isScrolling && self.isScrolling()) {
              return;
            }
            
            const scrollTop = $(window).scrollTop();
            const mainHeaderHeight = $('.main-header').outerHeight() || 80;
            const stickyNavHeight = $('.program-sticky-nav').outerHeight() || 80;
            const offset = mainHeaderHeight + stickyNavHeight + 70;
            
            let newActiveSection = '';
            let maxVisibleHeight = 0;
            
            // Find the section with the most visible area
            sections.each(function () {
              const section = $(this);
              const sectionTop = section.offset().top;
              const sectionHeight = section.outerHeight();
              const sectionBottom = sectionTop + sectionHeight;
              
              // Calculate visible portion of the section
              const visibleTop = Math.max(sectionTop, scrollTop + offset);
              const visibleBottom = Math.min(sectionBottom, scrollTop + $(window).height());
              const visibleHeight = Math.max(0, visibleBottom - visibleTop);
              
              // Section is considered active if it has significant visible area
              if (visibleHeight > maxVisibleHeight && visibleHeight > 100) {
                maxVisibleHeight = visibleHeight;
                newActiveSection = section.attr('id');
              }
            });
            
            // Fallback: if no section has significant visibility, use traditional method
            if (!newActiveSection) {
              sections.each(function () {
                const section = $(this);
                const sectionTop = section.offset().top - offset;
                const sectionBottom = sectionTop + section.outerHeight();
                
                if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                  newActiveSection = section.attr('id');
                  return false; // Break the loop
                }
              });
            }
            
            // Only update if the active section has actually changed
            if (newActiveSection !== currentActiveSection) {
              currentActiveSection = newActiveSection;
              
              // Update active navigation link
              navLinks.removeClass('active');
              if (currentActiveSection) {
                navLinks.filter(`[href="#${currentActiveSection}"]`).addClass('active');
              } else {
                // Default to first link if no section is active
                navLinks.first().addClass('active');
              }
            }
          }, 150); // Increased delay to prevent conflicts during manual navigation
        });
      }
    },

    // Enrollment Card Interactions
    enrollmentCard: function () {
      const enrollBtn = $('.enroll-btn');
      
      // enrollBtn.on('click', function (e) {
      //   e.preventDefault();
        
      //   // Add your enrollment logic here
      //   // For now, we'll show an alert
      //   alert('Enrollment functionality will be implemented based on your requirements.');
        
      //   // You can redirect to an enrollment form or open a modal
      //   // window.location.href = 'enrollment-form.html';
      // });
      
      // Add hover effects for better interactivity
      enrollBtn.on('mouseenter', function () {
        $(this).find('i').addClass('fa-arrow-right');
      });
      
      enrollBtn.on('mouseleave', function () {
        $(this).find('i').removeClass('fa-arrow-right');
      });
    }
  };

  // Initialize when document is ready
  $(document).ready(function () {
    // Initialize smooth scrolling first to set up the isScrolling flag
    ProgramDetails.smoothScrolling();
    // Then initialize other functions
    ProgramDetails.stickyNavigation();
    ProgramDetails.faqToggle();
    ProgramDetails.activeNavigation();
    ProgramDetails.enrollmentCard();
  });

  // Handle window resize
  $(window).on('resize', function () {
    // Recalculate sticky navigation if needed
    ProgramDetails.stickyNavigation();
  });

})(jQuery);

// Add custom easing function for smooth scrolling
jQuery.extend(jQuery.easing, {
  easeInOutCubic: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
    return c / 2 * ((t -= 2) * t * t + 2) + b;
  }
});

// Additional animations and effects
(function ($) {
  "use strict";

  // Animate elements on scroll
  function animateOnScroll() {
    const elements = $('.program-section__content, .enrollment-card, .faq-item');
    
    elements.each(function () {
      const element = $(this);
      const elementTop = element.offset().top;
      const windowTop = $(window).scrollTop();
      const windowHeight = $(window).height();
      
      if (elementTop < windowTop + windowHeight - 100) {
        element.addClass('animate-in');
      }
    });
  }

  // Initialize scroll animations
  $(window).on('scroll', function () {
    animateOnScroll();
  });

  // Initial check on page load
  $(document).ready(function () {
    animateOnScroll();
  });

})(jQuery); 

// Function to dynamically update program images for different programs
// Call this function during page load or when switching between programs
function updateProgramImages(programData) {
  // Update dynamic banner image
  const bannerElement = document.querySelector('.program-banner-image');
  if (bannerElement && programData.bannerImage) {
    bannerElement.style.backgroundImage = `url('${programData.bannerImage}')`;
  }
  
  // Update program logo
  const logoElement = document.querySelector('[data-program-logo]');
  if (logoElement && programData.logoImage) {
    logoElement.src = programData.logoImage;
    logoElement.alt = programData.programName || 'Program Logo';
  }
}

// Example usage for integration:
/*
const programData = {
  bannerImage: 'assets/images/product/vue-banner.png',
  logoImage: 'assets/images/product/vue-logo.png',
  programName: 'Vue.js Complete Guide'
};

updateProgramImages(programData);
*/ 