// Main JavaScript functionality for the portfolio website

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initCarousels();
  initFormValidation();
  initSmoothScrolling();
  initBackToTop();
  initAnimations();
  initAccessibilityFeatures();
});

// Top Navigation Functionality
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinksElements = document.querySelectorAll('.nav-link');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      
      if (navLinks) {
        if (!isExpanded) {
          navLinks.style.display = 'flex';
          navLinks.style.flexDirection = 'column';
          navLinks.style.position = 'absolute';
          navLinks.style.top = '100%';
          navLinks.style.left = '0';
          navLinks.style.right = '0';
          navLinks.style.backgroundColor = 'var(--background-color)';
          navLinks.style.padding = '1em';
          navLinks.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
          navLinks.style.gap = '1em';
        } else {
          navLinks.style.display = '';
        }
      }
    });
  }
  
  // Update active nav link on scroll
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinksElements.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink(); // Initial call
  
  // Close mobile menu when clicking a link
  navLinksElements.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.style.display = '';
      }
    });
  });
}

// Multiple Image Carousels Functionality
function initCarousels() {
  const carousels = document.querySelectorAll('.project-image-carousel');
  
  if (carousels.length === 0) return;
  
  const carouselData = {
    1: ['[Image 1 - Project 1]', '[Image 2 - Project 1]', '[Image 3 - Project 1]'],
    2: ['[Image 1 - Project 2]', '[Image 2 - Project 2]', '[Image 3 - Project 2]'],
    3: ['[Image 1 - Project 3]', '[Image 2 - Project 3]', '[Image 3 - Project 3]'],
    4: ['[Image 1 - Project 4]', '[Image 2 - Project 4]', '[Image 3 - Project 4]']
  };
  
  const carouselIntervals = {};
  
  // Initialize each carousel
  carousels.forEach((carousel, index) => {
    const carouselId = index + 1;
    const carouselContent = carousel.querySelector('.carousel-content');
    const carouselDots = carousel.querySelectorAll('.carousel-dot');
    
    if (!carouselContent || carouselDots.length === 0) return;
    
    let currentIndex = 0;
    
    function updateCarousel(index, carouselId) {
      // Update active dot
      carouselDots.forEach((dot, i) => {
        const isActive = i === index;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive);
        dot.setAttribute('tabindex', isActive ? '0' : '-1');
      });
      
      // Update content with fade effect
      carouselContent.style.opacity = '0';
      setTimeout(() => {
        carouselContent.textContent = carouselData[carouselId][index];
        carouselContent.style.opacity = '1';
      }, 300);
      
      currentIndex = index;
    }
    
    function nextSlide(carouselId) {
      const nextIndex = (currentIndex + 1) % carouselData[carouselId].length;
      updateCarousel(nextIndex, carouselId);
    }
    
    // Add click functionality to dots
    carouselDots.forEach((dot, index) => {
      dot.addEventListener('click', () => updateCarousel(index, carouselId));
      
      dot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          updateCarousel(index, carouselId);
        }
        
        // Arrow key navigation
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextSlide(carouselId);
        }
        
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prevIndex = (currentIndex - 1 + carouselData[carouselId].length) % carouselData[carouselId].length;
          updateCarousel(prevIndex, carouselId);
        }
      });
    });
    
    // Start auto-rotation
    function startAutoRotate(carouselId) {
      carouselIntervals[carouselId] = setInterval(() => nextSlide(carouselId), 4000);
    }
    
    function stopAutoRotate(carouselId) {
      if (carouselIntervals[carouselId]) {
        clearInterval(carouselIntervals[carouselId]);
      }
    }
    
    // Pause on hover/focus
    carousel.addEventListener('mouseenter', () => stopAutoRotate(carouselId));
    carousel.addEventListener('mouseleave', () => startAutoRotate(carouselId));
    carousel.addEventListener('focusin', () => stopAutoRotate(carouselId));
    carousel.addEventListener('focusout', () => startAutoRotate(carouselId));
    
    // Initialize
    updateCarousel(0, carouselId);
    startAutoRotate(carouselId);
  });
}

// Form Validation
function initFormValidation() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitButton = document.getElementById('submit-button');
  
  // Real-time validation
  function validateField(field, errorId) {
    const errorElement = document.getElementById(errorId);
    let isValid = true;
    let errorMessage = '';
    
    if (!field.value.trim()) {
      errorMessage = 'This field is required';
      isValid = false;
    } else if (field.type === 'email' && !isValidEmail(field.value)) {
      errorMessage = 'Please enter a valid email address';
      isValid = false;
    } else if (field.id === 'message' && field.value.trim().length < 10) {
      errorMessage = 'Message must be at least 10 characters';
      isValid = false;
    }
    
    errorElement.textContent = errorMessage;
    field.setAttribute('aria-invalid', !isValid);
    
    return isValid;
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Add input event listeners
  [nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener('input', function() {
      const errorId = this.id + '-error';
      validateField(this, errorId);
      updateSubmitButton();
    });
    
    input.addEventListener('blur', function() {
      const errorId = this.id + '-error';
      validateField(this, errorId);
    });
  });
  
  function updateSubmitButton() {
    const isNameValid = nameInput.value.trim() !== '';
    const isEmailValid = isValidEmail(emailInput.value);
    const isMessageValid = messageInput.value.trim().length >= 10;
    
    submitButton.disabled = !(isNameValid && isEmailValid && isMessageValid);
  }
  
  // Handle form submission
  window.handleFormSubmit = function() {
    const isNameValid = validateField(nameInput, 'name-error');
    const isEmailValid = validateField(emailInput, 'email-error');
    const isMessageValid = validateField(messageInput, 'message-error');
    
    if (isNameValid && isEmailValid && isMessageValid) {
      // Simulate form submission
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Create a simple progress bar
      const progressBar = document.createElement('div');
      progressBar.style.width = '0%';
      progressBar.style.height = '4px';
      progressBar.style.backgroundColor = 'var(--primary-color)';
      progressBar.style.position = 'absolute';
      progressBar.style.bottom = '0';
      progressBar.style.left = '0';
      progressBar.style.borderRadius = '0 0 4px 4px';
      progressBar.style.transition = 'width 1.5s ease';
      submitButton.style.position = 'relative';
      submitButton.appendChild(progressBar);
      
      // Animate progress bar
      setTimeout(() => {
        progressBar.style.width = '100%';
      }, 100);
      
      setTimeout(() => {
        // In a real application, this would be an AJAX call
        showNotification('Thank you! Your message has been sent. (This is a demo)', 'success');
        form.reset();
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
        progressBar.remove();
        
        // Clear errors
        document.querySelectorAll('.form-error').forEach(el => {
          el.textContent = '';
        });
        
        // Remove aria-invalid attributes
        [nameInput, emailInput, messageInput].forEach(input => {
          input.removeAttribute('aria-invalid');
        });
      }, 1500);
    } else {
      showNotification('Please fill all fields correctly', 'error');
    }
  };
  
  // Notification function
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 90px;
      right: 20px;
      padding: 1em 1.5em;
      background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
      color: white;
      border-radius: 4px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 9999;
      animation: slideIn 0.3s ease;
      max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
}

// Smooth Scrolling
function initSmoothScrolling() {
  // This is handled by CSS, but we add a fallback for browsers that don't support it
  if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// Back to Top Button
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;
  
  function toggleBackToTop() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
      backToTopBtn.setAttribute('aria-hidden', 'false');
    } else {
      backToTopBtn.classList.remove('visible');
      backToTopBtn.setAttribute('aria-hidden', 'true');
    }
  }
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Update URL without adding to history
    history.replaceState(null, '', window.location.pathname);
  });
  
  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop(); // Initial check
}

// Animations on scroll
function initAnimations() {
  // Add CSS for notifications
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
    
    .back-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 50px;
      padding: 12px 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.3s ease;
      z-index: 998;
    }
    
    .back-to-top.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    .back-to-top:hover {
      background-color: #e55a28;
      transform: translateY(-2px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }
    
    .back-to-top-icon {
      width: 20px;
      height: 20px;
    }
    
    .back-to-top-text {
      font-size: 0.9em;
      font-weight: 600;
    }
    
    @media (max-width: 768px) {
      .back-to-top-text {
        display: none;
      }
      .back-to-top {
        padding: 12px;
      }
    }
  `;
  document.head.appendChild(style);
}

// Accessibility Features
function initAccessibilityFeatures() {
  // Add skip to main content link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-to-main';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary-color);
    color: white;
    padding: 8px;
    z-index: 9999;
    text-decoration: none;
  `;
  
  skipLink.addEventListener('focus', function() {
    this.style.top = '0';
  });
  
  skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
  });
  
  // Add main content id to hero section
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.id = 'main-content';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }
  
  // Add keyboard navigation for project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });
  
  // Update project cards to be clickable
  projectCards.forEach(card => {
    const title = card.querySelector('.project-title');
    if (title) {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const projectId = title.id.replace('-title', '');
        showProjectDetails(projectId);
      });
    }
  });
  
  function showProjectDetails(projectId) {
    const projectTitle = document.getElementById(`${projectId}-title`)?.textContent;
    if (projectTitle) {
      const modal = document.createElement('div');
      modal.className = 'project-modal';
      modal.innerHTML = `
        <div class="modal-content">
          <button class="modal-close" aria-label="Close modal">&times;</button>
          <h2>${projectTitle}</h2>
          <p>This would show detailed information about ${projectTitle} in a real implementation.</p>
          <p>Features: Detailed case study, process, challenges, solutions, and results.</p>
        </div>
      `;
      modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
      `;
      
      document.body.appendChild(modal);
      
      // Close modal on click
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
          modal.style.animation = 'fadeOut 0.3s ease';
          setTimeout(() => {
            document.body.removeChild(modal);
          }, 300);
        }
      });
      
      // Close modal on Escape key
      document.addEventListener('keydown', function closeModalOnEscape(e) {
        if (e.key === 'Escape') {
          modal.style.animation = 'fadeOut 0.3s ease';
          setTimeout(() => {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', closeModalOnEscape);
          }, 300);
        }
      });
    }
  }
  
  // Add fadeOut animation for modal
  const modalStyle = document.createElement('style');
  modalStyle.textContent = `
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    
    .modal-content {
      background: white;
      padding: 2em;
      border-radius: 8px;
      max-width: 600px;
      width: 90%;
      position: relative;
      animation: fadeIn 0.3s ease;
    }
    
    .modal-close {
      position: absolute;
      top: 1em;
      right: 1em;
      background: none;
      border: none;
      font-size: 1.5em;
      cursor: pointer;
      color: var(--text-color);
    }
  `;
  document.head.appendChild(modalStyle);
}

// Responsive navigation on resize
window.addEventListener('resize', function() {
  const navLinks = document.querySelector('.nav-links');
  const navToggle = document.getElementById('nav-toggle');
  
  if (window.innerWidth > 768) {
    if (navLinks) {
      navLinks.style.display = '';
    }
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }
});

// Performance optimization - Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(function() {
    // Update any scroll-dependent elements here
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, 100);
});

// Intersection Observer for lazy loading animations (future enhancement)
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });
  
  // Observe all sections and project cards
  document.querySelectorAll('.section, .project-card').forEach(el => {
    observer.observe(el);
  });
}
// Add this to your existing JavaScript file, inside the DOMContentLoaded event listener or in a separate function

function initExpandableCaseStudies() {
  const expandButton = document.getElementById('expand-project1');
  const caseStudyContent = document.getElementById('project1-case-study');
  const fullContent = caseStudyContent.querySelector('.case-study-full');
  const expandText = expandButton.querySelector('.expand-text');
  
  if (!expandButton || !caseStudyContent) return;
  
  expandButton.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    
    // Toggle expanded state
    this.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle classes
    caseStudyContent.classList.toggle('collapsed');
    caseStudyContent.classList.toggle('expanded');
    fullContent.classList.toggle('hidden');
    
    // Update button text
    if (isExpanded) {
      expandText.textContent = 'Read Full Case Study';
      // Scroll back to button position
      setTimeout(() => {
        this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 300);
    } else {
      expandText.textContent = 'Show Less';
      // Scroll to top of case study when expanding
      setTimeout(() => {
        caseStudyContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
    
    // Add keyboard support
    expandButton.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
}

// Call this function in your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
  // ... other initializations ...
  initExpandableCaseStudies();
  // ... other initializations ...
});
// Add this function to your existing script.js file

function initExpandableCaseStudies() {
  const expandButton = document.getElementById('expand-project1');
  const caseStudyContent = document.getElementById('project1-case-study');
  
  if (!expandButton || !caseStudyContent) return;
  
  const fullContent = caseStudyContent.querySelector('.case-study-full');
  const expandText = expandButton.querySelector('.expand-text');
  
  expandButton.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    
    // Toggle expanded state
    this.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle classes
    caseStudyContent.classList.toggle('collapsed');
    caseStudyContent.classList.toggle('expanded');
    fullContent.classList.toggle('hidden');
    
    // Update button text
    if (isExpanded) {
      expandText.textContent = 'Read Full Case Study';
      // Scroll back to button position
      setTimeout(() => {
        this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 300);
    } else {
      expandText.textContent = 'Show Less';
      // Scroll to top of case study when expanding
      setTimeout(() => {
        caseStudyContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  });
  
  // Add keyboard support
  expandButton.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  });
}

// Call this function in your DOMContentLoaded event listener
// Add this to the existing DOMContentLoaded event in script.js
document.addEventListener('DOMContentLoaded', function() {
  // ... your existing initializations ...
  
  // Add this line after other initializations
  initExpandableCaseStudies();
  
  // ... your existing initializations ...
});
