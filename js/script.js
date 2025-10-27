// Menu Mobile
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
}

if (links) {
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            links.forEach(link => {
                link.style.animation = '';
            });
        });
    });
}

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header Shadow on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Stats Counter Animation
function animateStats() {
    const statItems = document.querySelectorAll('.stat-item h3');
    if (!statItems.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                    }
                }, 30);
                observer.unobserve(stat);
            }
        });
    });

    statItems.forEach(stat => {
        observer.observe(stat);
    });
}

// Initialize stats animation when page loads
document.addEventListener('DOMContentLoaded', animateStats);