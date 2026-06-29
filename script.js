/* ===========================================
   PREMIUM PORTFOLIO JAVASCRIPT
   ===========================================
   All interactivity – vanilla JS, no frameworks
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ---------- DOM ELEMENTS ----------
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const themeToggle = document.getElementById('themeToggle');
    const themeLabel = document.getElementById('themeLabel');
    const backToTop = document.getElementById('backToTop');
    const loadingScreen = document.getElementById('loadingScreen');
    const navLinks = document.querySelectorAll('.nav-link');
    const allSections = document.querySelectorAll('section[id]');
    const typingText = document.getElementById('typingText');
    const statCards = document.querySelectorAll('.stat-card');
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderPrev = document.getElementById('sliderPrev');
    const sliderNext = document.getElementById('sliderNext');
    const sliderDots = document.getElementById('sliderDots');
    const contactForm = document.getElementById('contactForm');
    const currentYearSpan = document.getElementById('currentYear');

    // ---------- INITIAL SETUP ----------
    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Hide loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
        }, 600);
    });

    // ---------- THEME TOGGLE ----------
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeLabel(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeLabel(newTheme);
    });

    function updateThemeLabel(theme) {
        if (themeLabel) {
            themeLabel.textContent = theme === 'dark' ? 'Dark' : 'Light';
        }
    }

    // ---------- MOBILE MENU ----------
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
    }

    function openMobileMenu() {
        hamburger.classList.add('active');
        nav.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        hamburger.setAttribute('aria-expanded', 'true');
    }

    hamburger.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileOverlay.addEventListener('click', closeMobileMenu);

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    });

    // Close mobile menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ---------- STICKY HEADER & ACTIVE NAV LINK ----------
    function updateActiveNav() {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100;

        allSections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call

    // ---------- SMOOTH SCROLLING (already handled by CSS scroll-behavior) ----------
    // Additionally, for older browsers, we could implement but it's fine.

    // ---------- BACK TO TOP BUTTON ----------
    function toggleBackToTop() {
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---------- TYPING EFFECT ----------
    const roles = [
        'Senior Frontend Engineer',
        'UI/UX Designer',
        'Web Developer',
        'Static Site Specialist',
        'Performance Optimizer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 120;

    function typeEffect() {
        if (!typingText) return;
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            // Typing
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentRole.length) {
                // Finished typing, pause then start deleting
                isDeleting = true;
                typingSpeed = 2000; // Pause at the end
            } else {
                typingSpeed = 100;
            }
        } else {
            // Deleting
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                // Move to next role
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // Pause before typing next
            } else {
                typingSpeed = 50;
            }
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing effect after a short delay
    if (typingText) {
        setTimeout(typeEffect, 800);
    }

    // ---------- SCROLL REVEAL ANIMATIONS ----------
    const revealElements = document.querySelectorAll('.reveal, .fade-in, .slide-left, .slide-right, .scale-in');
    const staggerContainers = document.querySelectorAll('.stagger-children');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // For fade-in specifically
                if (entry.target.classList.contains('fade-in')) {
                    entry.target.classList.add('visible');
                }
                // Unobserve after revealing to improve performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // Stagger children: when container is in view, add 'revealed' to trigger staggered CSS transitions
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    staggerContainers.forEach(el => {
        // Add stagger delays using JS if not using CSS :nth-child
        const children = el.children;
        for (let i = 0; i < children.length; i++) {
            children[i].style.transitionDelay = `${i * 0.1}s`;
        }
        staggerObserver.observe(el);
    });

    // ---------- COUNTER ANIMATION (Stats) ----------
    function animateCounter(card) {
        const numberEl = card.querySelector('.stat-number');
        if (!numberEl) return;
        const target = parseInt(numberEl.getAttribute('data-target'), 10);
        if (isNaN(target)) return;
        let current = 0;
        const increment = Math.ceil(target / 60); // 60 frames approx
        const duration = 1500; // 1.5 seconds
        const stepTime = duration / (target / increment);

        const counterInterval = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counterInterval);
            }
            numberEl.textContent = current;
        }, stepTime);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(card => counterObserver.observe(card));

    // ---------- IMAGE SLIDER ----------
    if (sliderTrack && sliderPrev && sliderNext && sliderDots) {
        const slides = sliderTrack.querySelectorAll('.slider-slide');
        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoSlideInterval;
        let isPaused = false;

        // Create dots
        sliderDots.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', () => goToSlide(i));
            sliderDots.appendChild(dot);
        }

        const allDots = sliderDots.querySelectorAll('.slider-dot');

        function updateSlider() {
            sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
            allDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }

        function goToSlide(index) {
            currentSlide = (index + totalSlides) % totalSlides;
            updateSlider();
            resetAutoSlide();
        }

        function nextSlide() {
            goToSlide(currentSlide + 1);
        }

        function prevSlide() {
            goToSlide(currentSlide - 1);
        }

        function startAutoSlide() {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(() => {
                if (!isPaused) {
                    nextSlide();
                }
            }, 4000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        sliderPrev.addEventListener('click', prevSlide);
        sliderNext.addEventListener('click', nextSlide);

        // Pause on hover
        const sliderWrapper = document.getElementById('sliderWrapper');
        sliderWrapper.addEventListener('mouseenter', () => {
            isPaused = true;
        });
        sliderWrapper.addEventListener('mouseleave', () => {
            isPaused = false;
            resetAutoSlide();
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        sliderTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        sliderTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }

        // Initial setup
        updateSlider();
        startAutoSlide();
    }

    // ---------- CONTACT FORM VALIDATION ----------
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Clear previous errors
            const errorSpans = contactForm.querySelectorAll('.form-error');
            errorSpans.forEach(span => span.textContent = '');

            const fields = [
                { id: 'formName', name: 'Full Name' },
                { id: 'formEmail', name: 'Email Address' },
                { id: 'formSubject', name: 'Subject' },
                { id: 'formMessage', name: 'Message' }
            ];

            fields.forEach(field => {
                const input = document.getElementById(field.id);
                const errorSpan = input.parentElement.querySelector('.form-error');
                if (!input.value.trim()) {
                    errorSpan.textContent = `${field.name} is required.`;
                    isValid = false;
                } else if (field.id === 'formEmail' && !validateEmail(input.value.trim())) {
                    errorSpan.textContent = 'Please enter a valid email address.';
                    isValid = false;
                }
            });

            if (isValid) {
                // Simulate form submission (demo)
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Message Sent!';
                submitBtn.disabled = true;
                submitBtn.style.backgroundColor = '#4caf50';
                submitBtn.style.borderColor = '#4caf50';

                // Reset after delay
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.borderColor = '';
                }, 2500);
            }
        });

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
    }

    // ---------- ADD REVEAL CLASSES TO ELEMENTS (if not already in HTML) ----------
    // We already added classes in HTML, but we can dynamically add some for sections not covered.
    // For example, service cards and project cards could be stagger children.
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid && !servicesGrid.classList.contains('stagger-children')) {
        servicesGrid.classList.add('stagger-children');
    }

    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid && !projectsGrid.classList.contains('stagger-children')) {
        projectsGrid.classList.add('stagger-children');
    }

    // About stats, timeline items
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) statsGrid.classList.add('stagger-children');
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => item.classList.add('reveal'));

    // Service cards reveal
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => card.classList.add('reveal'));

    // Project cards reveal
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => card.classList.add('reveal'));

    // Creator section elements
    const creatorGrid = document.querySelector('.creator-grid');
    if (creatorGrid) {
        creatorGrid.querySelector('.creator-image-wrapper')?.classList.add('slide-left');
        creatorGrid.querySelector('.creator-content')?.classList.add('slide-right');
    }

    // Contact grid
    const contactGrid = document.querySelector('.contact-grid');
    if (contactGrid) {
        contactGrid.querySelector('.contact-info')?.classList.add('slide-left');
        contactGrid.querySelector('.contact-form')?.classList.add('slide-right');
    }

    // Re-initialize observers for newly added classes
    const newRevealElements = document.querySelectorAll('.reveal, .fade-in, .slide-left, .slide-right, .scale-in');
    newRevealElements.forEach(el => {
        if (!el.classList.contains('revealed')) {
            revealObserver.observe(el);
        }
    });
    const newStaggerContainers = document.querySelectorAll('.stagger-children');
    newStaggerContainers.forEach(el => {
        if (!el.classList.contains('revealed')) {
            staggerObserver.observe(el);
        }
    });

    // ---------- PERFORMANCE: LAZY LOADING OF NON-CRITICAL ----------
    // No images, so nothing to lazy load. But we can add placeholder logic.

    // ---------- GLOBAL KEYBOARD NAVIGATION ENHANCEMENTS ----------
    // Already handled with proper semantic HTML and focus-visible.

    console.log('✨ Premium portfolio ready. Built with vanilla HTML, CSS & JS.');
});