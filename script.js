/**
 * Interactions and Animation triggers
 */

// Basic Navbar Scrolled state
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for scroll animations (.fade-up elements)
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

// 3D Tilt Effect on mousemove
const tiltElements = document.querySelectorAll('.tilt-effect');

tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        
        // Calculate mouse position relative to element center
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const multiplier = 0.05; // Adjust the sensitivity of the tilt
        
        const rotateX = -(y * multiplier);
        const rotateY = x * multiplier;
        
        // Apply transform
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    // Reset on mouse leave
    el.addEventListener('mouseleave', () => {
        el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        
        // Custom reset for elements that had default rotations
        if(el.classList.contains('phone-front')){
            // original was rotate(-5deg)
            el.style.transform = `rotate(-5deg)`;
        }
    });

    // Add CSS transition specifically for mouseleave smoothing
    el.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
});

// Run initial check for fade elements already in viewport
setTimeout(() => {
    document.querySelectorAll('.fade-up').forEach(el => {
        const rect = el.getBoundingClientRect();
        if(rect.top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
}, 100);
