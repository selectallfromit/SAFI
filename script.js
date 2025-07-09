// contact-form.js
// EmailJS Contact Form Handler with Animations and Mobile Menu

// Initialize EmailJS when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize EmailJS
    emailjs.init("I9hvNYvhQTzfkEFcc");
    
    // Contact Form Handler
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            
            const form = this;
            const formData = {
                user_name: form.user_name.value,
                user_email: form.user_email.value,
                message: `Email: ${form.user_email.value}\n\nMessage:\n${form.message.value}`,
            };
            
            const submitBtn = document.getElementById("submit-btn");
            const submitText = document.getElementById("submit-text");
            const loadingText = document.getElementById("loading-text");
            
            // Validation
            if (!formData.user_name || !formData.user_email || !formData.message) {
                showNotification("Veuillez remplir tous les champs.", "error");
                return;
            }
            
            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.user_email)) {
                showNotification("Veuillez entrer une adresse email valide.", "error");
                return;
            }
            
            // Show loading state
            if (submitBtn) submitBtn.disabled = true;
            if (submitText) submitText.classList.add("hidden");
            if (loadingText) loadingText.classList.remove("hidden");
            
            // Send email
            emailjs.send("service_c7j0z3i", "template_njrvrmb", formData)
                .then(() => {
                    showNotification("Message envoyé avec succès !", "success");
                    form.reset();
                })
                .catch((error) => {
                    console.error("Erreur EmailJS:", error);
                    showNotification("Erreur lors de l'envoi du message. Veuillez réessayer.", "error");
                })
                .finally(() => {
                    // Reset button state
                    if (submitBtn) submitBtn.disabled = false;
                    if (submitText) submitText.classList.remove("hidden");
                    if (loadingText) loadingText.classList.add("hidden");
                });
        });
    }
    
    // Reveal Animations on Scroll
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        reveals.forEach((el) => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom) {
                el.classList.add('visible');
            }
        });
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', revealOnScroll);
    
    // Run on page load
    revealOnScroll();
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    // Optional: Add keyboard navigation for mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Optional: Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
            }
        }
    });
    
    // Optional: Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks) {
            navLinks.classList.remove('active');
        }
    });
});

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Add icon based on type
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${icons[type] || icons.info}</span>
            <span class="notification-text">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        min-width: 300px;
        max-width: 400px;
        padding: 0;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        z-index: 9999;
        transform: translateX(100%);
        transition: all 0.3s ease;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        overflow: hidden;
        ${type === 'success' ? 'background: linear-gradient(135deg, #28a745, #20c997);' : ''}
        ${type === 'error' ? 'background: linear-gradient(135deg, #dc3545, #fd7e14);' : ''}
        ${type === 'info' ? 'background: linear-gradient(135deg, #17a2b8, #6f42c1);' : ''}
        ${type === 'warning' ? 'background: linear-gradient(135deg, #ffc107, #fd7e14);' : ''}
    `;
    
    // Style the content
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
        display: flex;
        align-items: center;
        padding: 16px 20px;
        color: white;
        position: relative;
    `;
    
    // Style the icon
    const icon = notification.querySelector('.notification-icon');
    icon.style.cssText = `
        font-size: 18px;
        margin-right: 12px;
        font-weight: bold;
    `;
    
    // Style the text
    const text = notification.querySelector('.notification-text');
    text.style.cssText = `
        flex: 1;
        font-size: 14px;
        line-height: 1.4;
        font-weight: 500;
    `;
    
    // Style the close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        margin-left: 12px;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s ease;
    `;
    
    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.backgroundColor = 'rgba(255,255,255,0.2)';
    });
    
    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.backgroundColor = 'transparent';
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Add click to dismiss
    notification.addEventListener('click', (e) => {
        if (e.target !== closeBtn) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    });
}