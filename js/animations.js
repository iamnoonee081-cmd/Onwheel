// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Check if device is mobile
const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
});

function initializeAnimations() {
    // Adjust animation settings for mobile
    const animationDuration = isMobile ? 0.6 : 0.8;
    const staggerDelay = isMobile ? 0.05 : 0.1;
    
    // Hero section animations
    const tl = gsap.timeline();
    
    tl.to('.brand-name', {
        opacity: 1,
        y: 0,
        duration: animationDuration,
        ease: 'power2.out'
    })
    .to('.tagline', {
        opacity: 1,
        y: 0,
        duration: animationDuration * 0.75,
        ease: 'power2.out'
    }, '-=0.4')
    .to('.hero-description', {
        opacity: 1,
        y: 0,
        duration: animationDuration * 0.75,
        ease: 'power2.out'
    }, '-=0.3')
    .to('.cta-button', {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
    }, '-=0.2');

    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.to(title, {
            opacity: 1,
            y: 0,
            duration: animationDuration,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Product cards animation
    gsap.utils.toArray('.product-card').forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: animationDuration * 0.75,
            delay: index * staggerDelay,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Custom order section animation
    gsap.to('.custom-order', {
        opacity: 1,
        y: 0,
        duration: animationDuration,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.custom-order',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });

    // Option tags animation
    gsap.utils.toArray('.option-tag').forEach((tag, index) => {
        gsap.to(tag, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            delay: index * (staggerDelay * 0.5),
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.custom-options',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Trust items animation
    gsap.utils.toArray('.trust-item').forEach((item, index) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: animationDuration * 0.75,
            delay: index * staggerDelay,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Smooth scroll for CTA button (only on desktop)
    document.querySelector('.cta-button').addEventListener('click', function(e) {
        e.preventDefault();
        if (!isMobile) {
            gsap.to(window, {
                duration: 1,
                scrollTo: '#products',
                ease: 'power2.inOut'
            });
        } else {
            // Simple scroll for mobile
            document.getElementById('products').scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}