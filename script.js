// ==================== DOCUMENT READY ====================
document.addEventListener('DOMContentLoaded', () => {
    
    // ==================== NAVBAR SCROLL EFFECT ====================
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==================== MOBILE MENU ====================
    const navbarMenu = document.querySelector(".navbar .links");
    const hamburgerBtn = document.querySelector(".navbar .hamburger-btn");
    const hideMenuBtn = navbarMenu.querySelector(".close-btn");

    // Show mobile menu
    hamburgerBtn.addEventListener("click", () => {
        navbarMenu.classList.toggle("show-menu");
    });

    // Hide mobile menu
    hideMenuBtn.addEventListener("click", () => hamburgerBtn.click());

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbarMenu.classList.remove('show-menu');
        });
    });

    // ==================== POPUP FORM ====================
    const showPopupBtn = document.querySelector(".login-btn");
    const formPopup = document.querySelector(".form-popup");
    const hidePopupBtn = formPopup.querySelector(".close-btn");
    const signupLoginLink = formPopup.querySelectorAll(".bottom-link a");

    // Show popup
    showPopupBtn.addEventListener("click", () => {
        document.body.classList.toggle("show-popup");
    });

    // Hide popup
    hidePopupBtn.addEventListener("click", () => showPopupBtn.click());

    // Close popup when clicking outside
    document.querySelector('.blur-bg-overlay').addEventListener('click', () => {
        document.body.classList.remove('show-popup');
    });

    // Toggle signup/login
    signupLoginLink.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            formPopup.classList[link.id === 'signup-link' ? 'add' : 'remove']("show-signup");
        });
    });

    // ==================== PASSWORD VISIBILITY TOGGLE ====================
    document.querySelectorAll('.password-toggle .eye-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const input = this.parentElement.previousElementSibling;
            if (input.type === "password") {
                input.type = "text";
                this.classList.replace('bx-hide', 'bx-show');
            } else {
                input.type = "password";
                this.classList.replace('bx-show', 'bx-hide');
            }
        });
    });

    // ==================== RESPONSIVE FORM EYE ICON ====================
    document.querySelectorAll('.responsive-section .eye-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === "password") {
                input.type = "text";
                this.classList.replace('bx-hide', 'bx-show');
            } else {
                input.type = "password";
                this.classList.replace('bx-show', 'bx-hide');
            }
        });
    });

    // ==================== RESPONSIVE FORM TOGGLE ====================
    const responsiveForms = document.querySelector(".responsive-section .forms");
    if (responsiveForms) {
        const links = responsiveForms.querySelectorAll('.form-link a');
        links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                responsiveForms.classList.toggle('show-signup');
            });
        });
    }

    // ==================== SLIDING FORM ====================
    const slidingWrapper = document.querySelector(".sliding-section .wrapper");
    if (slidingWrapper) {
        const signupHeader = slidingWrapper.querySelector(".signup header");
        const loginHeader = slidingWrapper.querySelector(".login header");

        loginHeader.addEventListener("click", () => {
            slidingWrapper.classList.add("active");
        });

        signupHeader.addEventListener("click", () => {
            slidingWrapper.classList.remove("active");
        });

        // Sliding form submit handlers
        const slidingForms = slidingWrapper.querySelectorAll("form");
        slidingForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                showToast('Sliding form submitted!');
                this.reset();
            });
        });
    }

    // ==================== TAGS INPUT ====================
    const tagsUl = document.querySelector(".tags-section ul");
    const tagsInput = document.querySelector(".tags-section input");
    const tagsDetailsSpan = document.querySelector(".tags-section .details span");

    let maxTags = 10;
    let tags = ["coding", "nepal"];

    function countTags() {
        if (tagsInput) tagsInput.focus();
        if (tagsDetailsSpan) tagsDetailsSpan.innerText = maxTags - tags.length;
    }

    function createTag() {
        if (!tagsUl) return;
        
        tagsUl.querySelectorAll("li").forEach(li => li.remove());
        
        tags.slice().reverse().forEach(tag => {
            let liTag = `<li>${tag} <i class="fas fa-times" onclick="removeTag(this, '${tag}')"></i></li>`;
            tagsUl.insertAdjacentHTML("afterbegin", liTag);
        });
        
        countTags();
    }

    window.removeTag = function(element, tag) {
        let index = tags.indexOf(tag);
        tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
        element.parentElement.remove();
        countTags();
    };

    function addTag(e) {
        if (e.key === "Enter" || e.key === ',') {
            e.preventDefault();
            let tag = e.target.value.replace(/,/g, '').replace(/\s+/g, ' ');
            if (tag.length > 0 && !tags.includes(tag) && tags.length < maxTags) {
                tags.push(tag);
                createTag();
            }
            e.target.value = "";
        }
    }

    if (tagsInput) {
        tagsInput.addEventListener("keyup", addTag);
        
        const removeBtn = document.querySelector(".tags-section .details button");
        if (removeBtn) {
            removeBtn.addEventListener("click", () => {
                tags = [];
                tagsUl.querySelectorAll("li").forEach(li => li.remove());
                countTags();
                showToast('All tags removed!');
            });
        }
        
        createTag();
    }

    // ==================== CONTACT FORM ====================
    const contactForm = document.querySelector(".contact-section form");
    const contactStatusSpan = contactForm ? contactForm.querySelector(".button-area span") : null;

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show sending state
            const btn = this.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;
            
            // Simulate sending
            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
                
                if (contactStatusSpan) {
                    contactStatusSpan.innerText = 'Your message has been sent!';
                    contactStatusSpan.classList.add('show');
                }
                
                showToast('Message sent successfully!');
                contactForm.reset();
                
                setTimeout(() => {
                    if (contactStatusSpan) {
                        contactStatusSpan.classList.remove('show');
                    }
                }, 3000);
            }, 1500);
        });
    }

    // ==================== LOGIN FORM SUBMIT ====================
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (email && password) {
                showToast('Login successful!');
                this.reset();
                document.body.classList.remove('show-popup');
            }
        });
    }

    // ==================== SIGNUP FORM SUBMIT ====================
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const policy = document.getElementById('policy').checked;
            
            if (!name || !email || !password || !confirmPassword) {
                showToast('Please fill in all fields!');
                return;
            }
            
            if (password !== confirmPassword) {
                showToast('Passwords do not match!');
                return;
            }
            
            if (!policy) {
                showToast('Please accept Terms & Conditions!');
                return;
            }
            
            showToast('Account created successfully!');
            this.reset();
            document.querySelector('.form-popup').classList.remove('show-signup');
        });
    }

    // ==================== FORGOT PASSWORD MODAL ====================
    window.showForgotPassword = function(e) {
        e.preventDefault();
        document.getElementById('forgotModal').classList.add('show');
    };

    const forgotModal = document.getElementById('forgotModal');
    const modalClose = forgotModal.querySelector('.modal-close');
    
    modalClose.addEventListener('click', () => {
        forgotModal.classList.remove('show');
    });

    forgotModal.addEventListener('click', (e) => {
        if (e.target === forgotModal) {
            forgotModal.classList.remove('show');
        }
    });

    const forgotForm = document.getElementById('forgotForm');
    if (forgotForm) {
        forgotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Password reset link sent!');
            forgotModal.classList.remove('show');
            this.reset();
        });
    }

    // ==================== SOCIAL BUTTONS ====================
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showToast('Social login coming soon!');
        });
    });

    // ==================== RESPONSIVE FORM SOCIAL BUTTONS ====================
    document.querySelectorAll('.responsive-section .media-options a').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const isFacebook = this.classList.contains('facebook');
            if (isFacebook) {
                showToast('Login with Facebook!');
            } else {
                showToast('Login with Google!');
            }
        });
    });

    // ==================== TOAST NOTIFICATION ====================
    window.showToast = function(message) {
        const toast = document.getElementById('toast');
        const toastMessage = toast.querySelector('.toast-message');
        
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };

    // ==================== ANIMATED SUBSCRIBE ====================
    const subscribeCheckbox = document.getElementById('click');
    if (subscribeCheckbox) {
        const btn2 = document.querySelector('.animated-subscribe-section .btn-2');
        if (btn2) {
            btn2.addEventListener('click', () => {
                const input = document.querySelector('.animated-subscribe-section .field input');
                if (input.value) {
                    showToast(`Subscribed with: ${input.value}`);
                    subscribeCheckbox.checked = false;
                    input.value = '';
                }
            });
        }
    }

    // ==================== SUBSCRIPTION FORM ====================
    document.querySelectorAll('.subscribe-section form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="text"], input[type="email"]').value;
            if (email) {
                showToast(`Subscribed: ${email}`);
                this.reset();
            }
        });
    });

    // ==================== CTA BUTTON ====================
    window.openPopup = function() {
        document.body.classList.add('show-popup');
    };

    // ==================== FACEBOOK FORM ====================
    document.querySelectorAll('.facebook-form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showToast('Facebook-style login!');
        });
    });

    // ==================== ADD Ripple EFFECT TO BUTTONS ====================
    document.querySelectorAll('button, .submit-btn, .cta-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                pointer-events: none;
                width: 100px;
                height: 100px;
                left: ${e.clientX - rect.left - 50}px;
                top: ${e.clientY - rect.top - 50}px;
                transform: scale(0);
                animation: ripple 0.6s linear;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    console.log('All interactive features initialized!');
});
