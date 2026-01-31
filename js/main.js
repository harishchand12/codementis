document.addEventListener('DOMContentLoaded', () => {

    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themes = ['dark', 'light', 'cyber'];

    // Check for saved theme
    let currentTheme = localStorage.getItem('theme') || 'dark';

    // Apply initial theme
    if (currentTheme !== 'dark') {
        body.classList.remove('light-mode', 'cyber-mode');
        if (currentTheme === 'light') body.classList.add('light-mode');
        if (currentTheme === 'cyber') body.classList.add('cyber-mode');
    }

    themeToggle.addEventListener('click', () => {
        // Cycle through themes
        let nextIndex = (themes.indexOf(currentTheme) + 1) % themes.length;
        currentTheme = themes[nextIndex];

        // Update body classes
        body.classList.remove('light-mode', 'cyber-mode');
        if (currentTheme === 'light') body.classList.add('light-mode');
        if (currentTheme === 'cyber') body.classList.add('cyber-mode');

        localStorage.setItem('theme', currentTheme);
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animate hamburger to X (optional enhancement)
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3D Tilt Effect for Service Cards
    const cards = document.querySelectorAll('.service-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max rotation deg
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Scroll Animation Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial check for fade-in elements not already handled by CSS animation
    // Adding a generic fade-in class for other sections
    const fadeElements = document.querySelectorAll('.section-header, .about-content, .contact-wrapper, .service-card, .project-card');

    // Add CSS for these dynamically or ensure style.css handles .visible
    // Here we inject a quick style rule for .fade-on-scroll if not present, but better to rely on CSS.
    // Let's manually add opacity: 0 to these via JS initially to avoid FOUC if JS fails,
    // or just assume style.css handles standard animations.

    // For this simple implementation, let's just use the hover effects and the hero animation.
    // We can add a simple slide-up class locally.

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Enhance observer callback
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100); // Stagger effect
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => scrollObserver.observe(el));

});
