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
  
  if (estimateForm) {
    estimateForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple form validation
      let isValid = true;
      const requiredFields = estimateForm.querySelectorAll('[required]');
      
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
        alert('Thank you for your request! We will contact you within 24 hours with your estimate.');
        estimateForm.reset();
      } else {
        alert('Please fill in all required fields.');
      }
    });
  }

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
});
