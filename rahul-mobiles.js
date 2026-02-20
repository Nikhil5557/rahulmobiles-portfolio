/**
 * Rahul Mobiles Website JavaScript
 * Modern Interactive Features and Smooth Animations
 */

// ===================================
// Global Variables and Configuration
// ===================================
const MOBILE_BREAKPOINT = 768;
const SCROLL_THRESHOLD = 50;
const ANIMATION_THRESHOLD = 100;

// ===================================
// DOM Content Loaded Event Listener
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===================================
// Main Application Initialization
// ===================================
function initializeApp() {
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeScrollAnimations();
    initializeActiveNavigation();
    initializeBackToTop();
    initializeContactForm();
    initializeCounterAnimation();
    initializeHeaderEffects();
    initializeKeyboardNavigation();
    initializePerformanceOptimizations();
    initializeHeroSlider();
    
    console.log('Rahul Mobiles Website initialized successfully! 🚀');
}

// ===================================
// Mobile Menu Functionality
// ===================================
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!mobileMenuToggle || !navMenu) return;
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        // Update ARIA attributes
        this.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle menu visibility
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        
        // Add animation class
        if (navMenu.classList.contains('active')) {
            navMenu.style.animation = 'slideInRight 0.3s ease-out';
        }
    });
    
    // Close menu when clicking on navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!mobileMenuToggle.contains(event.target) && !navMenu.contains(event.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

// ===================================
// Smooth Scrolling Navigation
// ===================================
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state
                updateActiveNavigation(targetId);
                
                // Focus target for accessibility
                targetElement.focus({ preventScroll: true });
            }
        });
    });
}

// ===================================
// Scroll Animations
// ===================================
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkAnimations() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Check if element is in viewport
            if (elementTop < windowHeight - ANIMATION_THRESHOLD && elementBottom > 0) {
                element.classList.add('active');
                
                // Stagger animation for multiple elements
                const delay = Array.from(animatedElements).indexOf(element) * 100;
                element.style.transitionDelay = `${delay}ms`;
            }
        });
    }
    
    // Initial check
    checkAnimations();
    
    // Throttled scroll event listener
    const throttledCheckAnimations = throttle(checkAnimations, 100);
    window.addEventListener('scroll', throttledCheckAnimations);
    window.addEventListener('resize', throttledCheckAnimations);
}

// ===================================
// Active Navigation Highlighting
// ===================================
function initializeActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavigation() {
        const scrollY = window.pageYOffset;
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionId = section.getAttribute('id');
            
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    }
    
    // Initial update
    updateActiveNavigation();
    
    // Throttled scroll event listener
    const throttledUpdateNav = throttle(updateActiveNavigation, 100);
    window.addEventListener('scroll', throttledUpdateNav);
}

function updateActiveNavigation(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === targetId) {
            link.classList.add('active');
        }
    });
}

// ===================================
// Back to Top Button
// ===================================
function initializeBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) return;
    
    function toggleBackToTopButton() {
        if (window.pageYOffset > SCROLL_THRESHOLD * 2) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Keyboard support
    backToTopButton.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.click();
        }
    });
    
    // Toggle visibility on scroll
    const throttledToggle = throttle(toggleBackToTopButton, 100);
    window.addEventListener('scroll', throttledToggle);
}

// ===================================
// Contact Form Functionality
// ===================================
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Validate form
        if (validateForm(formObject)) {
            // Show success message
            showFormMessage('success', 'Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // Track form submission
            trackEvent('contact_form_submit', {
                form_data: formObject
            });
        } else {
            // Show error message
            showFormMessage('error', 'Please fill in all required fields correctly.');
        }
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Remove error state when user starts typing
            this.classList.remove('error');
            const errorMessage = this.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    });
}

function validateForm(formData) {
    const requiredFields = ['name', 'email', 'message'];
    
    for (let field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
            return false;
        }
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        return false;
    }
    
    return true;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && value === '') {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation (optional)
    if (field.type === 'tel' && value !== '') {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Show or remove error
    if (!isValid) {
        field.classList.add('error');
        showFieldError(field, errorMessage);
    } else {
        field.classList.remove('error');
        removeFieldError(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    removeFieldError(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--error-color)';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
}

function removeFieldError(field) {
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function showFormMessage(type, message) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    messageElement.style.cssText = `
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        font-weight: 500;
        ${type === 'success' 
            ? 'background: var(--success-color); color: white;' 
            : 'background: var(--error-color); color: white;'
        }
    `;
    
    // Insert message before form
    const contactForm = document.getElementById('contactForm');
    contactForm.parentNode.insertBefore(messageElement, contactForm);
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 5000);
}

// ===================================
// Hero Slider Functionality
// ===================================
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Auto-play functionality
    let slideInterval;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    function goToSlide(index) {
        showSlide(index);
    }
    
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoPlay() {
        clearInterval(slideInterval);
    }
    
    // Event listeners for controls
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay(); // Restart auto-play after manual navigation
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay(); // Restart auto-play after manual navigation
        });
    }
    
    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
            stopAutoPlay();
            startAutoPlay(); // Restart auto-play after manual navigation
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const sliderContainer = document.querySelector('.slider-container');
    
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next slide
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous slide
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        }
    }
    
    // Pause auto-play on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopAutoPlay);
        heroSlider.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Start auto-play
    startAutoPlay();
    
    // Initialize first slide
    showSlide(0);
}

// ===================================
// Counter Animation for Statistics
// ===================================
function initializeCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Animation speed in milliseconds
    
    function animateCounter(counter) {
        const text = counter.textContent.trim();
        
        // Skip animation for non-numeric values
        if (isNaN(parseInt(text))) {
            return;
        }
        
        const target = parseInt(text);
        const increment = target / speed;
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                // Preserve the original text content (including + sign)
                const originalText = counter.textContent.trim();
                counter.textContent = originalText;
                
                // Add '+' suffix for large numbers if not already present
                if (target >= 1000 && !originalText.includes('+')) {
                    counter.textContent = target.toLocaleString() + '+';
                }
            }
        };
        
        updateCounter();
    }
    
    // Intersection Observer for counter animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===================================
// Header Scroll Effects
// ===================================
function initializeHeaderEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove shadow on scroll
        if (scrollTop > SCROLL_THRESHOLD) {
            header.style.boxShadow = '0 2px 20px var(--card-shadow)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '0 2px 10px var(--card-shadow)';
            header.style.background = 'var(--bg-primary)';
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Throttled scroll event listener
    const throttledUpdateHeader = throttle(updateHeader, 100);
    window.addEventListener('scroll', throttledUpdateHeader);
}

// ===================================
// Keyboard Navigation Support
// ===================================
function initializeKeyboardNavigation() {
    // Add keyboard navigation styles
    const style = document.createElement('style');
    style.textContent = `
        .keyboard-nav *:focus {
            outline: 2px solid var(--primary-color) !important;
            outline-offset: 2px !important;
        }
        
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
        
        .form-input.error,
        .form-textarea.error {
            border-color: var(--error-color) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Add keyboard navigation class when using tab key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    // Remove keyboard navigation class when using mouse
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
    
    // Skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    }
}

// ===================================
// Performance Optimizations
// ===================================
function initializePerformanceOptimizations() {
    // Lazy loading for images (when real images are added)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    const criticalLinks = [
        { href: '#home', as: 'document' },
        { href: '#services', as: 'document' }
    ];
    
    criticalLinks.forEach(link => {
        const linkElement = document.createElement('link');
        linkElement.rel = 'prefetch';
        linkElement.href = link.href;
        document.head.appendChild(linkElement);
    });
}

// ===================================
// Utility Functions
// ===================================

/**
 * Throttle function to limit rate of function execution
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Debounce function to delay function execution
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
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

/**
 * Check if element is in viewport
 * @param {Element} element - Element to check
 * @returns {boolean} True if element is in viewport
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Smooth scroll to element
 * @param {Element} element - Target element
 * @param {number} offset - Offset from top
 */
function scrollToElement(element, offset = 0) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

/**
 * Animate element with CSS classes
 * @param {Element} element - Element to animate
 * @param {string} animationClass - Animation class name
 * @param {number} duration - Animation duration in milliseconds
 */
function animateElement(element, animationClass, duration = 1000) {
    element.classList.add(animationClass);
    
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, duration);
}

// ===================================
// Error Handling
// ===================================
window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.error);
});

// ===================================
// Analytics and Tracking (placeholder)
// ===================================
function trackEvent(eventName, properties = {}) {
    // Add your analytics tracking code here
    console.log('Event tracked:', eventName, properties);
    
    // Example for Google Analytics 4
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, properties);
    // }
}

// Track page view
trackEvent('page_view', {
    page_title: document.title,
    page_location: window.location.href
});

// Track button clicks
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('btn')) {
        trackEvent('button_click', {
            button_text: event.target.textContent.trim(),
            button_type: event.target.classList.contains('btn-primary') ? 'primary' : 'secondary'
        });
    }
    
    if (event.target.classList.contains('whatsapp-btn')) {
        trackEvent('whatsapp_click', {
            source: 'contact_section'
        });
    }
    
    if (event.target.classList.contains('brand-card')) {
        const brandName = event.target.querySelector('.brand-name')?.textContent;
        if (brandName) {
            trackEvent('brand_click', {
                brand: brandName
            });
        }
    }
    
    if (event.target.classList.contains('service-card')) {
        const serviceName = event.target.querySelector('.service-title')?.textContent;
        if (serviceName) {
            trackEvent('service_click', {
                service: serviceName
            });
        }
    }
});

// ===================================
// Service Worker Registration (for PWA support)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment following lines when you create a service worker
        /*
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed: ', error);
            });
        */
    });
}

// ===================================
// Export functions for external use
// ===================================
window.RahulMobiles = {
    scrollToElement,
    animateElement,
    trackEvent,
    throttle,
    debounce,
    validateForm,
    showFormMessage
};
