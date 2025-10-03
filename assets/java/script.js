'use strict';

/**
 * Portfolio Interactive Features
 * Manages sidebar, testimonials modal, project filtering, form validation, and page navigation
 * @author Your Name
 * @version 1.0.0
 */

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Toggles the 'active' class on an element
 * @param {HTMLElement} element - The element to toggle
 */
const toggleActiveClass = (element) => {
  element?.classList.toggle('active');
};

/**
 * Adds a class to an element
 * @param {HTMLElement} element - The target element
 * @param {string} className - The class name to add
 */
const addClass = (element, className = 'active') => {
  element?.classList.add(className);
};

/**
 * Removes a class from an element
 * @param {HTMLElement} element - The target element
 * @param {string} className - The class name to remove
 */
const removeClass = (element, className = 'active') => {
  element?.classList.remove(className);
};

// ============================================================================
// Sidebar Module
// ============================================================================

const SidebarModule = (() => {
  const sidebar = document.querySelector('[data-sidebar]');
  const sidebarBtn = document.querySelector('[data-sidebar-btn]');

  const init = () => {
    if (!sidebar || !sidebarBtn) return;
    
    sidebarBtn.addEventListener('click', () => toggleActiveClass(sidebar));
  };

  return { init };
})();

// ============================================================================
// Testimonials Modal Module
// ============================================================================

const TestimonialsModule = (() => {
  const elements = {
    items: document.querySelectorAll('[data-testimonials-item]'),
    modalContainer: document.querySelector('[data-modal-container]'),
    modalCloseBtn: document.querySelector('[data-modal-close-btn]'),
    overlay: document.querySelector('[data-overlay]'),
    modalImg: document.querySelector('[data-modal-img]'),
    modalTitle: document.querySelector('[data-modal-title]'),
    modalText: document.querySelector('[data-modal-text]')
  };

  /**
   * Toggles the testimonial modal visibility
   */
  const toggleModal = () => {
    toggleActiveClass(elements.modalContainer);
    toggleActiveClass(elements.overlay);
  };

  /**
   * Updates modal content with testimonial data
   * @param {HTMLElement} testimonialItem - The clicked testimonial item
   */
  const updateModalContent = (testimonialItem) => {
    const avatar = testimonialItem.querySelector('[data-testimonials-avatar]');
    const title = testimonialItem.querySelector('[data-testimonials-title]');
    const text = testimonialItem.querySelector('[data-testimonials-text]');

    if (avatar && elements.modalImg) {
      elements.modalImg.src = avatar.src;
      elements.modalImg.alt = avatar.alt;
    }

    if (title && elements.modalTitle) {
      elements.modalTitle.innerHTML = title.innerHTML;
    }

    if (text && elements.modalText) {
      elements.modalText.innerHTML = text.innerHTML;
    }
  };

  /**
   * Handles testimonial item click event
   * @param {Event} event - The click event
   */
  const handleTestimonialClick = (event) => {
    updateModalContent(event.currentTarget);
    toggleModal();
  };

  const init = () => {
    if (!elements.modalContainer || !elements.overlay) return;

    elements.items.forEach(item => {
      item.addEventListener('click', handleTestimonialClick);
    });

    elements.modalCloseBtn?.addEventListener('click', toggleModal);
    elements.overlay?.addEventListener('click', toggleModal);
  };

  return { init };
})();

// ============================================================================
// Filter Module
// ============================================================================

const FilterModule = (() => {
  const elements = {
    select: document.querySelector('[data-select]'),
    selectItems: document.querySelectorAll('[data-select-item]'),
    selectValue: document.querySelector('[data-selecct-value]'),
    filterBtns: document.querySelectorAll('[data-filter-btn]'),
    filterItems: document.querySelectorAll('[data-filter-item]')
  };

  let activeFilterBtn = elements.filterBtns[0];

  /**
   * Filters items based on selected category
   * @param {string} category - The category to filter by ('all' or specific category)
   */
  const applyFilter = (category) => {
    elements.filterItems.forEach(item => {
      const itemCategory = item.dataset.category;
      const shouldShow = category === 'all' || category === itemCategory;
      
      shouldShow ? addClass(item) : removeClass(item);
    });
  };

  /**
   * Updates the active filter button state
   * @param {HTMLElement} newActiveBtn - The newly clicked button
   */
  const updateActiveButton = (newActiveBtn) => {
    removeClass(activeFilterBtn);
    addClass(newActiveBtn);
    activeFilterBtn = newActiveBtn;
  };

  /**
   * Handles filter selection logic
   * @param {string} selectedText - The selected filter text
   * @param {HTMLElement|null} clickedElement - The clicked element for button updates
   */
  const handleFilterSelection = (selectedText, clickedElement = null) => {
    const selectedValue = selectedText.toLowerCase();
    
    if (elements.selectValue) {
      elements.selectValue.innerText = selectedText;
    }
    
    applyFilter(selectedValue);
    
    if (clickedElement) {
      updateActiveButton(clickedElement);
    }
  };

  /**
   * Initializes custom select dropdown
   */
  const initCustomSelect = () => {
    if (!elements.select) return;

    elements.select.addEventListener('click', function() {
      toggleActiveClass(this);
    });

    elements.selectItems.forEach(item => {
      item.addEventListener('click', function() {
        handleFilterSelection(this.innerText);
        toggleActiveClass(elements.select);
      });
    });
  };

  /**
   * Initializes filter buttons for desktop view
   */
  const initFilterButtons = () => {
    elements.filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        handleFilterSelection(this.innerText, this);
      });
    });
  };

  const init = () => {
    initCustomSelect();
    initFilterButtons();
  };

  return { init };
})();

// ============================================================================
// Form Validation Module
// ============================================================================

const FormModule = (() => {
  const elements = {
    form: document.querySelector('[data-form]'),
    inputs: document.querySelectorAll('[data-form-input]'),
    submitBtn: document.querySelector('[data-form-btn]')
  };

  /**
   * Updates submit button state based on form validity
   */
  const updateSubmitButtonState = () => {
    if (!elements.form || !elements.submitBtn) return;

    const isValid = elements.form.checkValidity();
    
    if (isValid) {
      elements.submitBtn.removeAttribute('disabled');
    } else {
      elements.submitBtn.setAttribute('disabled', '');
    }
  };

  const init = () => {
    if (!elements.form) return;

    elements.inputs.forEach(input => {
      input.addEventListener('input', updateSubmitButtonState);
    });
  };

  return { init };
})();

// ============================================================================
// Page Navigation Module
// ============================================================================

const NavigationModule = (() => {
  const elements = {
    navLinks: document.querySelectorAll('[data-nav-link]'),
    pages: document.querySelectorAll('[data-page]')
  };

  /**
   * Activates a specific page and its corresponding navigation link
   * @param {string} pageName - The name of the page to activate
   */
  const activatePage = (pageName) => {
    elements.pages.forEach((page, index) => {
      const isActivePage = page.dataset.page === pageName;
      
      if (isActivePage) {
        addClass(page);
        addClass(elements.navLinks[index]);
      } else {
        removeClass(page);
        removeClass(elements.navLinks[index]);
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Handles navigation link click event
   */
  const handleNavClick = function() {
    const pageName = this.innerHTML.toLowerCase();
    activatePage(pageName);
  };

  const init = () => {
    elements.navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });
  };

  return { init };
})();

// ============================================================================
// Application Initialization
// ============================================================================

const App = (() => {
  /**
   * Initializes all application modules
   */
  const init = () => {
    SidebarModule.init();
    TestimonialsModule.init();
    FilterModule.init();
    FormModule.init();
    NavigationModule.init();
  };

  return { init };
})();

// Initialize application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}