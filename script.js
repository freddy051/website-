// Existing smooth scrolling code
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        const navbarHeight = document.querySelector('.navbar').offsetHeight; // Get navbar height
        const targetPosition = targetSection.offsetTop - navbarHeight; // Calculate target position

        // Close mobile menu if it's open
        if (window.innerWidth <= 600) {
            document.querySelector('.nav-links').classList.remove('active');
        }

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Fade-in effect for sections on scroll
const sections = document.querySelectorAll('.content-section');

window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if(sectionTop < window.innerHeight - 100) {
            section.style.opacity = 1;
            section.style.transform = "translateY(0)";
        }
    });
});

// Initial opacity and transform
sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(50px)";
    section.style.transition = "all 0.6s ease-out";
});

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create and append hamburger menu button if it doesn't exist
    if (!document.querySelector('.menu-toggle')) {
        const navbar = document.querySelector('.navbar');
        const menuToggle = document.createElement('div');
        menuToggle.className = 'menu-toggle';
        menuToggle.innerHTML = '☰';
        navbar.appendChild(menuToggle);
        
        // Toggle menu when hamburger is clicked
        menuToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navLinks.classList.contains('active') && 
            !event.target.closest('.nav-links') && 
            event.target !== menuToggle) {
            navLinks.classList.remove('active');
        }
    });
});
