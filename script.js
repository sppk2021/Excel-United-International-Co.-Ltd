// Navigation scroll functionality
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav && mobileNav.classList.contains('active')) {
            toggleMobileNav(); // Close mobile nav after clicking a link
        }
    }
}

// Mobile navigation toggle
function toggleMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    if (!mobileNav) return;
    mobileNav.classList.toggle('active');
    // update aria-hidden for accessibility
    mobileNav.setAttribute('aria-hidden', String(!mobileNav.classList.contains('active')));
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('#navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 5%';
        navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    } else {
        navbar.style.padding = '15px 5%';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function showSlide(index) {
    if (!slides || slides.length === 0) return;
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Auto slide every 5 seconds
let slideInterval = setInterval(nextSlide, 5000);

// Pause slideshow on hover
const slideshowContainer = document.querySelector('.slideshow');
if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    slideshowContainer.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });
}

// Initialize slideshow on load
if (slides.length > 0) {
    showSlide(currentSlide);
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(event) {
    const mobileNav = document.getElementById('mobileNav');
    const hamburger = document.querySelector('.hamburger');
    if (!mobileNav || !hamburger) return;

    // Check if the click is outside the mobile nav and not on the hamburger button itself
    if (mobileNav.classList.contains('active') &&
        !mobileNav.contains(event.target) &&
        event.target !== hamburger &&
        !hamburger.contains(event.target)) {
        mobileNav.classList.remove('active');
        mobileNav.setAttribute('aria-hidden', 'true');
    }
});

// Responsive adjustments for slideshow height
function handleResize() {
    const slideshow = document.querySelector('.slideshow');
    if (!slideshow) return;
    const windowWidth = window.innerWidth;

    if (windowWidth <= 576) {
        slideshow.style.height = '60vh';
    } else if (windowWidth <= 768) {
        slideshow.style.height = '70vh';
    } else {
        slideshow.style.height = '80vh';
    }
}

// Initialize and add resize listener
window.addEventListener('resize', handleResize);
handleResize(); // Call once on load
