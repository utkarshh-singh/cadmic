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

    navLinks.addEventListener('click', (e) => {
      if (e.target.classList.contains('nav-link')) {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      }
    });
  }
});

// AJAX Form Submission (No Redirect)
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const formData = new FormData(contactForm);
      
      if (submitBtn) {
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
      }
      
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          contactForm.reset();
          
          if (submitBtn) {
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
          }
          
          showSuccessMessage(contactForm, '✓ Message sent successfully! We\'ll get back to you soon.');
          
        } else {
          throw new Error('Form submission failed');
        }
        
      } catch (error) {
        console.error('Error:', error);
        
        if (submitBtn) {
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        }
        
        showErrorMessage(contactForm, '⚠ Oops! Something went wrong. Please try again or email us directly.');
      }
    });
  }
});

function showSuccessMessage(form, message) {
  const existingMsg = form.querySelector('.success-message, .error-message');
  if (existingMsg) existingMsg.remove();
  
  const successMsg = document.createElement('div');
  successMsg.className = 'success-message fade-in-up';
  successMsg.innerHTML = message;
  form.appendChild(successMsg);
  
  setTimeout(() => {
    successMsg.style.opacity = '0';
    setTimeout(() => successMsg.remove(), 300);
  }, 6000);
}

function showErrorMessage(form, message) {
  const existingMsg = form.querySelector('.success-message, .error-message');
  if (existingMsg) existingMsg.remove();
  
  const errorMsg = document.createElement('div');
  errorMsg.className = 'error-message fade-in-up';
  errorMsg.innerHTML = message;
  form.appendChild(errorMsg);
  
  setTimeout(() => {
    errorMsg.style.opacity = '0';
    setTimeout(() => errorMsg.remove(), 300);
  }, 6000);
}

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

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const updateCounter = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  updateCounter();
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      const numbers = entry.target.querySelectorAll('.stat-number');
      numbers.forEach(num => {
        const text = num.textContent;
        const value = parseInt(text.replace(/\D/g, ''));
        if (!isNaN(value)) {
          num.textContent = '0';
          setTimeout(() => animateCounter(num, value), 300);
        }
      });
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    statsObserver.observe(statsSection);
  }
});
