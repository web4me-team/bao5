// Volunteer Template JavaScript

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70, // Account for fixed nav
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Active section highlighting
  const sections = document.querySelectorAll('section');
  
  function highlightActiveSection() {
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  // Call on scroll
  window.addEventListener('scroll', highlightActiveSection);
  
  // Initial call
  highlightActiveSection();
  
  // Animate elements when they come into view
  const fadeElements = document.querySelectorAll('.timeline-item, .project-card, .research-card, .publication-item, .teaching-item, .award-card, .skills-category, .education-item');
  
  const fadeOptions = {
    root: null,
    threshold: 0.2,
    rootMargin: "0px"
  };
  
  const fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, fadeOptions);
  
  fadeElements.forEach(element => {
    element.classList.add('fade-element');
    fadeObserver.observe(element);
  });
  
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    .fade-element {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .fade-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    .nav-links a.active {
      background-color: rgba(255,255,255,0.1);
      color: var(--secondary-color);
    }
  `;
  document.head.appendChild(style);
}); 