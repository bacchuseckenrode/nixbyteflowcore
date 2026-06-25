/* ============================================
   nixbyteflowcore.com - Main JavaScript
   Core Functionality
   ============================================ */

(function() {
    'use strict';

    // ===== Document Ready =====
    document.addEventListener('DOMContentLoaded', function() {
        initHeader();
        initMobileMenu();
        initSmoothScroll();
        initBackToTop();
        initScrollProgress();
        initActiveNavLink();
        initLazyLoad();
        initFormHandlers();
        initParticles();
        initTabSystem();
        initAccordion();
    });

    // ===== Header Scroll Effect =====
    function initHeader() {
        const header = document.querySelector('.site-header');
        if (!header) return;

        let lastScroll = 0;

        const handleScroll = () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        };

        window.addEventListener('scroll', throttle(handleScroll, 100), { passive: true });
        handleScroll();
    }

    // ===== Mobile Menu Toggle =====
    function initMobileMenu() {
        const toggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('.main-nav');

        if (!toggle || !nav) return;

        toggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            toggle.classList.toggle('active');

            // Update aria-expanded
            const isExpanded = nav.classList.contains('active');
            toggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close on link click
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                toggle.classList.remove('active');
            });
        });

        // Close on outside click
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !toggle.contains(e.target)) {
                nav.classList.remove('active');
                toggle.classList.remove('active');
            }
        });

        // Close on ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                nav.classList.remove('active');
                toggle.classList.remove('active');
            }
        });
    }

    // ===== Smooth Scroll =====
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href === '#!') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== Back to Top Button =====
    function initBackToTop() {
        const button = document.querySelector('.back-to-top');
        if (!button) return;

        const toggleVisibility = () => {
            if (window.pageYOffset > 600) {
                button.classList.add('visible');
            } else {
                button.classList.remove('visible');
            }
        };

        button.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', throttle(toggleVisibility, 150), { passive: true });
    }

    // ===== Scroll Progress Bar =====
    function initScrollProgress() {
        const progress = document.querySelector('.scroll-progress');
        if (!progress) return;

        const updateProgress = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progressPercent = (scrollTop / docHeight) * 100;
            progress.style.width = progressPercent + '%';
        };

        window.addEventListener('scroll', throttle(updateProgress, 50), { passive: true });
        updateProgress();
    }

    // ===== Active Nav Link Highlighting =====
    function initActiveNavLink() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.main-nav a');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // ===== Lazy Load Images =====
    function initLazyLoad() {
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                if (img.dataset.src) img.src = img.dataset.src;
            });
        } else {
            // Fallback with IntersectionObserver
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/lozad@1.16.0/dist/lozad.min.js';
            script.onload = () => {
                if (window.lozad) {
                    const observer = window.lozad('.lazy');
                    observer.observe();
                }
            };
            document.head.appendChild(script);
        }
    }

    // ===== Form Handlers =====
    function initFormHandlers() {
        const forms = document.querySelectorAll('form[data-validate]');

        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();

                if (validateForm(this)) {
                    handleFormSubmit(this);
                }
            });
        });

        // Newsletter forms
        document.querySelectorAll('.newsletter-form').forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const email = this.querySelector('input[type="email"]').value;
                if (email) {
                    showNotification('Thank you for subscribing!', 'success');
                    this.reset();
                }
            });
        });
    }

    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#ff4444';
            } else {
                field.style.borderColor = '';
            }
        });

        const emailField = form.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = '#ff4444';
            }
        }

        return isValid;
    }

    function handleFormSubmit(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                showNotification('Your message has been sent successfully!', 'success');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    }

    // ===== Notification System =====
    function showNotification(message, type = 'info') {
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close" aria-label="Close">&times;</button>
            </div>
        `;

        const styles = `
            .notification {
                position: fixed;
                top: 90px;
                right: 20px;
                background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff4444' : '#00d4ff'};
                color: #000;
                padding: 16px 20px;
                border-radius: 8px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.3);
                z-index: 9999;
                animation: slideInRight 0.4s ease;
                max-width: 360px;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
                font-weight: 500;
            }
            .notification-close {
                background: none;
                border: none;
                color: #000;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
            @keyframes slideInRight {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;

        if (!document.querySelector('#notification-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'notification-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }

        document.body.appendChild(notification);

        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });

        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInRight 0.4s ease reverse';
                setTimeout(() => notification.remove(), 400);
            }
        }, 5000);
    }

    // ===== Particles Effect =====
    function initParticles() {
        const container = document.querySelector('.particles');
        if (!container) return;

        // Reduce particles on mobile for performance
        const particleCount = window.innerWidth < 768 ? 15 : 40;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (10 + Math.random() * 10) + 's';

            // Random accent variations
            const colors = ['#00d4ff', '#0080ff', '#00ff88', '#ffffff'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.width = (1 + Math.random() * 2) + 'px';
            particle.style.height = particle.style.width;

            container.appendChild(particle);
        }
    }

    // ===== Tab System =====
    function initTabSystem() {
        const tabContainers = document.querySelectorAll('[data-tabs]');

        tabContainers.forEach(container => {
            const tabs = container.querySelectorAll('[data-tab]');
            const panels = container.querySelectorAll('[data-panel]');

            tabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const target = this.dataset.tab;

                    tabs.forEach(t => t.classList.remove('active'));
                    panels.forEach(p => p.classList.remove('active'));

                    this.classList.add('active');
                    const panel = container.querySelector(`[data-panel="${target}"]`);
                    if (panel) panel.classList.add('active');
                });
            });
        });
    }

    // ===== Accordion (FAQ) =====
    function initAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (!question) return;

            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');

                // Close all
                faqItems.forEach(other => {
                    if (other !== item) other.classList.remove('active');
                });

                // Toggle current
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        });
    }

    // ===== Utility: Throttle =====
    function throttle(fn, wait) {
        let time = Date.now();
        return function() {
            const now = Date.now();
            if (now - time >= wait) {
                time = now;
                fn.apply(this, arguments);
            }
        };
    }

    // ===== Utility: Debounce =====
    function debounce(fn, delay) {
        let timeoutId;
        return function() {
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // ===== Console Branding =====
    if (window.console && console.log) {
        console.log(
            '%c nixbyteflowcore.com ',
            'background: #00d4ff; color: #000; padding: 8px 16px; font-weight: bold; border-radius: 4px;'
        );
        console.log(
            '%c Crafted with precision · Privacy-first · Experience-driven ',
            'color: #00d4ff; font-style: italic; padding: 4px 0;'
        );
    }

})();