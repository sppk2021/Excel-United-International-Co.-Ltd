// Optimized script.js
// Navigation scroll functionality
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav?.classList.contains('active')) {
            toggleMobileNav();
        }
    }
}

// Mobile navigation toggle
function toggleMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    if (!mobileNav) return;
    
    mobileNav.classList.toggle('active');
    mobileNav.setAttribute('aria-hidden', String(!mobileNav.classList.contains('active')));
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('#navbar');
    if (!navbar) return;
    
    navbar.style.padding = window.scrollY > 50 ? '10px 5%' : '15px 5%';
    navbar.style.boxShadow = window.scrollY > 50 ? '0 4px 15px rgba(0,0,0,0.1)' : '0 2px 10px rgba(0,0,0,0.1)';
});

// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let slideInterval;

function showSlide(index) {
    if (totalSlides === 0) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
    
    // Reset auto slide timer
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

function changeSlide(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Initialize slideshow
if (slides.length > 0) {
    showSlide(currentSlide);
    slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const slideshow = document.querySelector('.slideshow');
    if (slideshow) {
        slideshow.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slideshow.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
    }
}

// Close mobile nav when clicking outside
document.addEventListener('click', (event) => {
    const mobileNav = document.getElementById('mobileNav');
    const hamburger = document.querySelector('.hamburger');
    
    if (!mobileNav || !hamburger) return;
    
    if (mobileNav.classList.contains('active') &&
        !mobileNav.contains(event.target) &&
        event.target !== hamburger &&
        !hamburger.contains(event.target)) {
        mobileNav.classList.remove('active');
        mobileNav.setAttribute('aria-hidden', 'true');
    }
});

// Responsive adjustments
function handleResize() {
    const slideshow = document.querySelector('.slideshow');
    if (!slideshow) return;
    
    const windowWidth = window.innerWidth;
    slideshow.style.height = windowWidth <= 576 ? '60vh' : 
                            windowWidth <= 768 ? '70vh' : '80vh';
}

window.addEventListener('resize', handleResize);
handleResize();
