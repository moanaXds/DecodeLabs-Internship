document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 0. THEME SWITCHING & PERSISTENCE
    // ==========================================
    const desktopThemeToggle = document.getElementById('desktop-theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    };

    // Initialize Theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);

    const toggleTheme = () => {
        const isDark = document.documentElement.classList.contains('dark');
        applyTheme(isDark ? 'light' : 'dark');
    };

    if (desktopThemeToggle) desktopThemeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

    // Watch for system theme preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // ==========================================
    // 1. MOBILE NAV BAR DRAWER INTERACTION
    // ==========================================
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const menuOverlay = document.getElementById('mobile-menu-overlay');
    const menuLinks = document.querySelectorAll('.mobile-nav-link');
    const menuIcon = menuBtn ? menuBtn.querySelector('span') : null;

    const toggleMobileMenu = (forceClose = false) => {
        if (!menuBtn || !menuOverlay) return;

        const isOpen = menuOverlay.classList.contains('open');
        const shouldClose = forceClose || isOpen;

        if (shouldClose) {
            menuOverlay.classList.remove('open');
            menuOverlay.setAttribute('aria-hidden', 'true');
            menuBtn.setAttribute('aria-expanded', 'false');
            if (menuIcon) menuIcon.textContent = 'menu';
            document.body.style.overflow = ''; // Restore scrolling
        } else {
            menuOverlay.classList.add('open');
            menuOverlay.setAttribute('aria-hidden', 'false');
            menuBtn.setAttribute('aria-expanded', 'true');
            if (menuIcon) menuIcon.textContent = 'close';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    };

    if (menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    // Close mobile menu when clicking nav links
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu(true);
        });
    });

    // Close mobile menu if clicked outside
    document.addEventListener('click', (e) => {
        if (menuOverlay && menuOverlay.classList.contains('open')) {
            if (!menuOverlay.contains(e.target) && !menuBtn.contains(e.target)) {
                toggleMobileMenu(true);
            }
        }
    });

    // ==========================================
    // 2. SMOOTH SCROLLING FOR NAV LINKS
    // ==========================================
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return; // Ignore dummy links
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 70; // Height of fixed header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 3. SCROLL SPY (ACTIVE NAVIGATION HIGHLIGHT)
    // ==========================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

    const scrollSpyOptions = {
        root: null,
        rootMargin: '-80px 0px -60% 0px', // Focus window around the upper half of screen
        threshold: 0
    };

    const scrollSpyCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    };

    if ('IntersectionObserver' in window && sections.length > 0) {
        const observer = new IntersectionObserver(scrollSpyCallback, scrollSpyOptions);
        sections.forEach(section => observer.observe(section));
    }

    // ==========================================
    // 4. FORM VALIDATION (Constraint API & Fallback)
    // ==========================================
    const form = document.getElementById('contact-form');
    const inputs = form ? form.querySelectorAll('.form-input') : [];
    
    // WeakMap to track user interaction state (blur and input)
    const dirtyInputsState = new WeakMap();

    const getOrInitState = (input) => {
        if (!dirtyInputsState.has(input)) {
            dirtyInputsState.set(input, { hasInteracted: false, hasBlurred: false });
        }
        return dirtyInputsState.get(input);
    };

    // Update validation feedback visual class & ARIA
    const updateInputValidationFeedback = (input) => {
        const isValid = input.checkValidity();
        
        // Sync classes for styling
        input.classList.toggle('user-invalid-fallback', !isValid);
        input.classList.toggle('user-valid-fallback', isValid);
        
        // Sync accessibility attributes
        input.setAttribute('aria-invalid', isValid ? 'false' : 'true');
    };

    const handleInputEvents = (event) => {
        const input = event.target;
        if (!input.checkValidity) return;

        const state = getOrInitState(input);

        if (event.type === 'input' || event.type === 'change') {
            state.hasInteracted = true;
            if (state.hasBlurred) {
                updateInputValidationFeedback(input);
            }
        } else if (event.type === 'blur') {
            state.hasBlurred = true;
            if (state.hasInteracted) {
                updateInputValidationFeedback(input);
            }
        }
    };

    // Attach event listeners to all fields
    inputs.forEach(input => {
        input.addEventListener('blur', handleInputEvents);
        input.addEventListener('input', handleInputEvents);
        input.addEventListener('change', handleInputEvents);
    });

    // Handle form reset
    if (form) {
        form.addEventListener('reset', () => {
            inputs.forEach(input => {
                dirtyInputsState.delete(input);
                input.classList.remove('user-invalid-fallback', 'user-valid-fallback');
                input.removeAttribute('aria-invalid');
            });
        });
    }

    // ==========================================
    // 5. SUCCESS MODAL DIALOG
    // ==========================================
    const successModal = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');

    const toggleModal = (show = false) => {
        if (!successModal) return;

        if (show) {
            successModal.classList.add('open');
            successModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Stop background scrolling
            // Focus the close button for accessibility keyboard control
            if (closeModalBtn) closeModalBtn.focus();
        } else {
            successModal.classList.remove('open');
            successModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    };

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            toggleModal(false);
        });
    }

    if (successModal) {
        // Close modal if user clicks outside of the content box
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                toggleModal(false);
            }
        });

        // Close modal if user presses ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && successModal.classList.contains('open')) {
                toggleModal(false);
            }
        });
    }

    // Form Submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let firstInvalidInput = null;

            // Trigger validation checks across all fields
            inputs.forEach(input => {
                const state = getOrInitState(input);
                state.hasInteracted = true;
                state.hasBlurred = true;
                
                updateInputValidationFeedback(input);

                if (!input.checkValidity() && !firstInvalidInput) {
                    firstInvalidInput = input;
                }
            });

            if (firstInvalidInput) {
                // Focus the first invalid element for correction
                firstInvalidInput.focus();
            } else {
                // Form is fully valid, show success notification modal
                toggleModal(true);
                form.reset(); // Reset fields and validation state
            }
        });
    }
});
