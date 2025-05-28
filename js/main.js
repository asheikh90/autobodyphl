/**
 * Auto Body Shop Philadelphia - Main JavaScript
 * SEO-optimized website for auto body repair services
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS animation library
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Header scroll effect
  const header = document.getElementById('header');
  const scrollThreshold = 100;

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial scroll position

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navMenu && navMenu.classList.contains('active') && !event.target.closest('#nav-menu') && !event.target.closest('#menu-toggle')) {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    }
  });

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('.nav-menu a, .footer-nav a, .btn');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href.startsWith('#') && href !== '#') {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        
        if (targetSection) {
          // Close mobile menu if open
          if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
          }
          
          // Scroll to section
          const headerHeight = header.offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Gallery filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        // Filter gallery items
        galleryItems.forEach(item => {
          if (filterValue === 'all' || item.classList.contains(filterValue)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  if (faqItems.length) {
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', function() {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current FAQ item
        item.classList.toggle('active');
      });
    });
  }

  // Form validation
  const estimateForm = document.getElementById('estimateForm');
  const heroQuickForm = document.getElementById('heroQuickForm');
  const quickEstimateForm = document.getElementById('quickEstimateForm');
  
  // Function to validate form
  function validateForm(form, e) {
    if (!form) return;
    
    e.preventDefault();
    
    // Simple form validation
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.classList.add('error');
      } else {
        field.classList.remove('error');
      }
    });
    
    if (isValid) {
      // Show success message (in a real implementation, this would submit the form)
      showFormSuccess(form);
    } else {
      alert('Please fill in all required fields.');
    }
  }
  
  // Function to show success message
  function showFormSuccess(form) {
    // For quick quote form
    if (form.id === 'quickEstimateForm') {
      // Hide all steps
      const formSteps = document.querySelectorAll('.form-step');
      formSteps.forEach(step => {
        step.classList.remove('active');
      });
      
      // Show thank you step
      const thankYouStep = document.getElementById('thankYouStep');
      if (thankYouStep) {
        thankYouStep.classList.add('active');
        
        // Generate random reference number
        const refNumber = 'PHL-' + Math.floor(10000 + Math.random() * 90000);
        const estimateReference = document.getElementById('estimateReference');
        if (estimateReference) {
          estimateReference.textContent = refNumber;
        }
      }
    } else {
      // For other forms
      alert('Thank you for your request! We will contact you within 24 hours with your estimate.');
      form.reset();
    }
  }
  
  // Add event listeners to forms
  if (estimateForm) {
    estimateForm.addEventListener('submit', function(e) {
      validateForm(estimateForm, e);
    });
  }
  
  if (heroQuickForm) {
    heroQuickForm.addEventListener('submit', function(e) {
      validateForm(heroQuickForm, e);
    });
  }

  // Quick Quote Modal
  const quickQuoteBtn = document.getElementById('quickQuoteBtn');
  const navQuoteBtn = document.getElementById('navQuoteBtn');
  const heroQuoteBtn = document.getElementById('heroQuoteBtn');
  const chooseCTA = document.getElementById('chooseCTA');
  const galleryCTA = document.getElementById('galleryCTA');
  const testimonialCTA = document.getElementById('testimonialCTA');
  const faqCTA = document.getElementById('faqCTA');
  const footerCTA = document.getElementById('footerCTA');
  const quickQuoteModal = document.getElementById('quickQuoteModal');
  const closeModalBtn = document.getElementById('closeQuoteModal');
  const closeThankYou = document.getElementById('closeThankYou');
  
  // Array of all CTA buttons
  const ctaButtons = [
    quickQuoteBtn, 
    navQuoteBtn, 
    heroQuoteBtn, 
    chooseCTA, 
    galleryCTA, 
    testimonialCTA, 
    faqCTA, 
    footerCTA
  ];
  
  // Function to open modal
  function openQuoteModal() {
    if (quickQuoteModal) {
      quickQuoteModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
      
      // Reset form and show first step
      if (quickEstimateForm) {
        quickEstimateForm.reset();
        
        const formSteps = document.querySelectorAll('.form-step');
        formSteps.forEach(step => {
          step.classList.remove('active');
        });
        
        const firstStep = document.getElementById('step1');
        if (firstStep) {
          firstStep.classList.add('active');
        }
      }
    }
  }
  
  // Function to close modal
  function closeQuoteModal() {
    if (quickQuoteModal) {
      quickQuoteModal.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }
  }
  
  // Add click event to all CTA buttons
  ctaButtons.forEach(button => {
    if (button) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        openQuoteModal();
      });
    }
  });
  
  // Close modal when clicking close button
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeQuoteModal);
  }
  
  // Close modal when clicking outside
  if (quickQuoteModal) {
    quickQuoteModal.addEventListener('click', function(e) {
      if (e.target === quickQuoteModal) {
        closeQuoteModal();
      }
    });
  }
  
  // Close thank you message
  if (closeThankYou) {
    closeThankYou.addEventListener('click', closeQuoteModal);
  }
  
  // Multi-step form navigation
  const nextButtons = document.querySelectorAll('.next-step');
  const prevButtons = document.querySelectorAll('.prev-step');
  
  nextButtons.forEach(button => {
    button.addEventListener('click', function() {
      const currentStep = this.closest('.form-step');
      const nextStep = currentStep.nextElementSibling;
      
      // Validate current step
      let isValid = true;
      const requiredFields = currentStep.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('error');
        } else {
          field.classList.remove('error');
        }
      });
      
      if (isValid && nextStep) {
        currentStep.classList.remove('active');
        nextStep.classList.add('active');
      }
    });
  });
  
  prevButtons.forEach(button => {
    button.addEventListener('click', function() {
      const currentStep = this.closest('.form-step');
      const prevStep = currentStep.previousElementSibling;
      
      if (prevStep) {
        currentStep.classList.remove('active');
        prevStep.classList.add('active');
      }
    });
  });
  
  // Submit quick estimate form
  if (quickEstimateForm) {
    quickEstimateForm.addEventListener('submit', function(e) {
      validateForm(quickEstimateForm, e);
    });
  }

  // Populate vehicle year dropdown
  const vehicleYearDropdowns = document.querySelectorAll('#vehicle-year, #quick-vehicle-year');
  
  if (vehicleYearDropdowns.length) {
    const currentYear = new Date().getFullYear();
    const startYear = 1980;
    
    vehicleYearDropdowns.forEach(dropdown => {
      for (let year = currentYear; year >= startYear; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        dropdown.appendChild(option);
      }
    });
  }

  // Service Quote Buttons
  const serviceQuoteButtons = document.querySelectorAll('.service-quote-btn');
  
  serviceQuoteButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const serviceType = this.getAttribute('data-service');
      openQuoteModal();
      
      // Set the service type in the form
      const serviceRadios = document.querySelectorAll('input[name="service-type"]');
      serviceRadios.forEach(radio => {
        if (radio.value === serviceType) {
          radio.checked = true;
        }
      });
    });
  });

  // Cookie consent
  const cookieConsent = document.querySelector('.cookie-consent');
  const cookieAccept = document.getElementById('cookie-accept');
  const cookieLearnMore = document.getElementById('cookie-learn-more');
  
  if (cookieConsent && cookieAccept) {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    
    if (!cookiesAccepted) {
      // Show cookie consent banner after a short delay
      setTimeout(() => {
        cookieConsent.style.display = 'block';
      }, 2000);
    }
    
    cookieAccept.addEventListener('click', function() {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieConsent.style.display = 'none';
    });
    
    if (cookieLearnMore) {
      cookieLearnMore.addEventListener('click', function() {
        // In a real implementation, this would link to a privacy policy page
        alert('This would navigate to the Privacy Policy page in a real implementation.');
      });
    }
  }

  // Testimonial slider (simple implementation)
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  let currentSlide = 0;
  
  if (testimonialSlides.length > 1) {
    // Hide all slides except the first one
    testimonialSlides.forEach((slide, index) => {
      if (index !== 0) {
        slide.style.display = 'none';
      }
    });
    
    // Function to show next slide
    function showNextSlide() {
      testimonialSlides[currentSlide].style.display = 'none';
      currentSlide = (currentSlide + 1) % testimonialSlides.length;
      testimonialSlides[currentSlide].style.display = 'block';
    }
    
    // Auto-rotate slides every 5 seconds
    setInterval(showNextSlide, 5000);
  }

  // Add schema.org structured data for SEO
  const schemaScript = document.createElement('script');
  schemaScript.type = 'application/ld+json';
  schemaScript.innerHTML = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    'name': 'Auto Body Shop Philadelphia',
    'image': 'https://autobodyshopphiladelphia.com/images/shop-front.jpg',
    'url': 'https://autobodyshopphiladelphia.com',
    'telephone': '+1-215-555-1234',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '1234 Auto Repair Lane',
      'addressLocality': 'Philadelphia',
      'addressRegion': 'PA',
      'postalCode': '19107',
      'addressCountry': 'US'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 39.9526,
      'longitude': -75.1652
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '08:00',
        'closes': '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Saturday',
        'opens': '09:00',
        'closes': '15:00'
      }
    ],
    'priceRange': '$$',
    'servesCuisine': 'Auto Repair Services'
  });
  document.head.appendChild(schemaScript);

  // Track page load time for performance monitoring
  window.addEventListener('load', function() {
    setTimeout(function() {
      const pageLoadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
      console.log('Page load time: ' + pageLoadTime + 'ms');
    }, 0);
  });

  // Exit intent popup for lead generation
  let exitIntentShown = sessionStorage.getItem('exitIntentShown') === 'true';
  
  if (!exitIntentShown) {
    document.addEventListener('mouseout', function(e) {
      // If the mouse leaves the top of the page
      if (e.clientY < 5 && !exitIntentShown) {
        openQuoteModal();
        exitIntentShown = true;
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    });
  }

  // Floating survey button animation
  const floatingButton = document.getElementById('quickQuoteBtn');
  if (floatingButton) {
    // Add pulse animation after 3 seconds
    setTimeout(() => {
      floatingButton.classList.add('pulse');
      
      // Remove pulse after animation completes
      setTimeout(() => {
        floatingButton.classList.remove('pulse');
      }, 1000);
    }, 3000);
    
    // Repeat pulse every 30 seconds
    setInterval(() => {
      floatingButton.classList.add('pulse');
      
      setTimeout(() => {
        floatingButton.classList.remove('pulse');
      }, 1000);
    }, 30000);
  }
});
