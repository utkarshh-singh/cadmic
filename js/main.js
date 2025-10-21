// Smooth scroll with offset for fixed navbar
document.addEventListener('click', (e) => {
  const target = e.target.closest('a[href^="#"]');
  if (target) {
    e.preventDefault();
    const element = document.querySelector(target.getAttribute('href'));
    if (element) {
      const offset = 80;
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      }
    });
  }
});

// Form submission handling
// document.addEventListener('DOMContentLoaded', () => {
//   const contactForm = document.getElementById('contactForm');
//   if (contactForm) {
//     contactForm.addEventListener('submit', (e) => {
//       e.preventDefault();
      
//       const formData = new FormData(contactForm);
//       const data = Object.fromEntries(formData);
      
//       // Show success message
//       alert('Thank you for your message! We will get back to you soon.');
//       contactForm.reset();
      
//       // TODO: Implement actual form submission
//       console.log('Form data:', data);
//     });
//   }
// });

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
});
