// Smooth scrolling without hash sticking in URL
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').slice(1);
        const targetSection = document.getElementById(targetId);
        const navbarHeight = document.querySelector('.navbar').offsetHeight; // Get navbar height
        const targetPosition = targetSection.offsetTop - navbarHeight; // Calculate target position

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

// Create mobile tabs navigation
document.addEventListener('DOMContentLoaded', function() {
    // Only create mobile tabs if we're on mobile
    if (window.innerWidth <= 768) {
        createMobileTabs();
    }
    
    // Handle window resize events
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            // Create mobile tabs if they don't exist
            if (!document.querySelector('.mobile-tabs')) {
                createMobileTabs();
            }
        } else {
            // Remove mobile tabs if we're on desktop
            const mobileTabs = document.querySelector('.mobile-tabs');
            if (mobileTabs) {
                mobileTabs.remove();
            }
        }
    });
    
    // Function to create mobile tabs
    function createMobileTabs() {
        // Don't create if already exists
        if (document.querySelector('.mobile-tabs')) return;
        
        const mobileTabsNav = document.createElement('div');
        mobileTabsNav.className = 'mobile-tabs';
        
        // Get all navigation links from main nav
        const navLinks = document.querySelectorAll('.nav-links a');
        
        // Create tab items with icons
        const tabIcons = {
            'mission': '🎯', 
            'services': '🛠️',
            'about': '👤',
            'contact': '📱'
        };
        
        navLinks.forEach(link => {
            const tabLink = document.createElement('a');
            const targetId = link.getAttribute('href').slice(1);
            tabLink.href = `#${targetId}`;
            
            const icon = document.createElement('span');
            icon.className = 'tab-icon';
            icon.textContent = tabIcons[targetId] || '📄';
            
            const label = document.createElement('span');
            label.textContent = link.textContent;
            
            tabLink.appendChild(icon);
            tabLink.appendChild(label);
            mobileTabsNav.appendChild(tabLink);
            
            // Add click event for smooth scrolling
            tabLink.addEventListener('click', function(e) {
                e.preventDefault();
                const targetSection = document.getElementById(targetId);
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Remove active class from all tabs
                document.querySelectorAll('.mobile-tabs a').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // Add active class to clicked tab
                this.classList.add('active');
            });
        });
        
        document.body.appendChild(mobileTabsNav);
    }
});

// Highlight active tab based on scroll position
window.addEventListener('scroll', function() {
    if (window.innerWidth <= 768) {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section[id]');
        
        // Find the current section in viewport
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            
            if (scrollPosition >= sectionTop - navbarHeight - 50 && 
                scrollPosition < sectionTop + sectionHeight - navbarHeight - 50) {
                
                const currentId = section.getAttribute('id');
                
                // Remove active class from all tabs
                document.querySelectorAll('.mobile-tabs a').forEach(tab => {
                    tab.classList.remove('active');
                });
                
                // Add active class to corresponding tab
                const activeTab = document.querySelector(`.mobile-tabs a[href="#${currentId}"]`);
                if (activeTab) {
                    activeTab.classList.add('active');
                }
            }
        });
    }
});
