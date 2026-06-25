/* ============================================
   nixbyteflowcore.com - Animations JavaScript
   Scroll-Triggered Animations & Effects
   ============================================ */

(function() {
    'use strict';

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function() {
        initScrollReveal();
        initStaggerReveal();
        initCounterAnimation();
        initParallax();
        initTiltEffect();
        initMouseEffects();
        initProgressBars();
        initScrollIndicator();
    });

    // ===== Scroll Reveal Animation =====
    function initScrollReveal() {
        // Elements to reveal
        const revealSelectors = [
            '.reveal',
            '.reveal-left',
            '.reveal-right',
            '.reveal-scale',
            '.slide-in-section',
            '[data-animate]',
            '.card',
            '.feature-card',
            '.value-card',
            '.news-card',
            '.app-card',
            '.process-step',
            '.stat-item',
            '.ad-format',
            '.contact-item',
            '.app-detail',
            '.faq-item',
            '.policy-content',
            '.cta-section',
            '.newsletter'
        ];

        const elements = document.querySelectorAll(revealSelectors.join(','));

        if (!('IntersectionObserver' in window)) {
            elements.forEach(el => el.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Get delay from data attribute
                    const delay = entry.target.dataset.delay || 0;

                    setTimeout(() => {
                        entry.target.classList.add('visible', 'in-view');
                    }, parseInt(delay));

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => observer.observe(el));
    }

    // ===== Stagger Children Reveal =====
    function initStaggerReveal() {
        const containers = document.querySelectorAll('.stagger-children');

        if (!('IntersectionObserver' in window)) {
            containers.forEach(c => c.classList.add('visible'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        containers.forEach(c => observer.observe(c));
    }

    // ===== Counter Animation =====
    function initCounterAnimation() {
        const counters = document.querySelectorAll('[data-counter]');

        if (!counters.length) return;

        const animateCounter = (element) => {
            const target = parseInt(element.dataset.counter);
            const duration = parseInt(element.dataset.duration) || 2000;
            const start = 0;
            const startTime = performance.now();
            const suffix = element.dataset.suffix || '';
            const prefix = element.dataset.prefix || '';

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function (ease-out cubic)
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(start + (target - start) * eased);

                element.textContent = prefix + current.toLocaleString() + suffix;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = prefix + target.toLocaleString() + suffix;
                }
            };

            requestAnimationFrame(updateCounter);
        };

        if (!('IntersectionObserver' in window)) {
            counters.forEach(animateCounter);
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        counters.forEach(counter => observer.observe(counter));
    }

    // ===== Parallax Effect =====
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        if (!parallaxElements.length) return;

        // Disable on mobile for performance
        if (window.innerWidth < 768) return;

        const updateParallax = () => {
            const scrollTop = window.pageYOffset;

            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const rect = el.getBoundingClientRect();
                const elementTop = rect.top + scrollTop;
                const offset = (scrollTop - elementTop) * speed;

                el.style.transform = `translateY(${offset}px)`;
            });
        };

        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ===== 3D Tilt Effect =====
    function initTiltEffect() {
        const tiltElements = document.querySelectorAll('[data-tilt]');

        if (!tiltElements.length || window.innerWidth < 1024) return;

        tiltElements.forEach(el => {
            el.addEventListener('mousemove', handleTilt);
            el.addEventListener('mouseleave', resetTilt);
        });

        function handleTilt(e) {
            const el = e.currentTarget;
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * -8;
            const rotateY = (x - centerX) / centerX * 8;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        }

        function resetTilt(e) {
            e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }
    }

    // ===== Mouse Follower / Glow Effect =====
    function initMouseEffects() {
        // Cursor glow effect
        const glowElements = document.querySelectorAll('.card-glow, .feature-card, .value-card, .app-card');

        glowElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                el.style.setProperty('--mouse-x', `${x}%`);
                el.style.setProperty('--mouse-y', `${y}%`);
            });
        });

        // Hero mouse parallax
        const hero = document.querySelector('.hero-content');
        if (hero && window.innerWidth > 1024) {
            document.addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 20;
                const y = (e.clientY / window.innerHeight - 0.5) * 20;

                hero.style.transform = `translate(${x}px, ${y}px)`;
            });
        }
    }

    // ===== Progress Bar Animation =====
    function initProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');

        if (!progressBars.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const value = target.dataset.progress || '0';
                    target.style.width = value + '%';
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.3 });

        progressBars.forEach(bar => observer.observe(bar));
    }

    // ===== Scroll Indicator =====
    function initScrollIndicator() {
        const indicator = document.querySelector('.scroll-indicator');
        if (!indicator) return;

        const handleScroll = () => {
            if (window.pageYOffset > 100) {
                indicator.classList.add('hidden');
            } else {
                indicator.classList.remove('hidden');
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // ===== Section Active Highlighting =====
    function initSectionTracking() {
        const sections = document.querySelectorAll('section[id]');
        if (!sections.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-80px 0px -50% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    // ===== Hover Ripple Effect =====
    function initRippleEffect() {
        const rippleButtons = document.querySelectorAll('.btn-ripple');

        rippleButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                ripple.style.left = (e.clientX - rect.left) + 'px';
                ripple.style.top = (e.clientY - rect.top) + 'px';

                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // ===== Magnetic Effect for Buttons =====
    function initMagneticButtons() {
        if (window.innerWidth < 1024) return;

        const magneticElements = document.querySelectorAll('[data-magnetic]');

        magneticElements.forEach(el => {
            el.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            el.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ===== Marquee Animation =====
    function initMarquee() {
        const marquees = document.querySelectorAll('.marquee');

        marquees.forEach(marquee => {
            const track = marquee.querySelector('.marquee-track');
            if (!track) return;

            // Clone content for seamless loop
            const clone = track.cloneNode(true);
            track.appendChild(clone.children[0]);
        });
    }

    // ===== Lazy Reveal Sections on Page Load =====
    function initPageLoadAnimations() {
        // Trigger hero animations immediately
        const heroElements = document.querySelectorAll('.hero-eyebrow, .hero-title, .hero-subtitle, .hero-cta');
        heroElements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';

            setTimeout(() => {
                el.style.transition = 'opacity 1s ease, transform 1s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 + (i * 200));
        });
    }

    // ===== Init All =====
    initSectionTracking();
    initRippleEffect();
    initMagneticButtons();
    initMarquee();
    initPageLoadAnimations();

})();