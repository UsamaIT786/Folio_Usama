// Preloader - 8 seconds minimum
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').style.display = 'none';
  }, 6000); // 6 seconds minimum
});

// Dark/Light Mode Toggle
const modeToggle = document.getElementById('mode-toggle');
let darkMode = true;
modeToggle.innerHTML = '🌙';
modeToggle.onclick = () => {
  darkMode = !darkMode;
  document.body.classList.toggle('light-mode', !darkMode);
  modeToggle.innerHTML = darkMode ? '🌙' : '☀️';
};

// Smooth Scroll for Nav Links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    // Active state
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// Portfolio Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    filterBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.getAttribute('data-filter');
    portfolioCards.forEach(card => {
      card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
    });
  });
});

// Portfolio Modal Popup
const modal = document.getElementById('portfolio-modal');
const modalImg = document.querySelector('.modal-img');
const modalCaption = document.querySelector('.modal-caption');
const modalClose = document.querySelector('.modal-close');
portfolioCards.forEach(card => {
  card.addEventListener('click', function() {
    modal.classList.add('active');
    modalImg.src = this.querySelector('img').src;
    modalCaption.textContent = this.querySelector('.portfolio-info h3').textContent;
  });
});
modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
});
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});

// Testimonials Slider - Auto Play
const slides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
let currentSlide = 0;
let autoPlayInterval;

function showSlide(idx) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === idx);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 4000); // 4 seconds
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
}

if (slides.length) {
  showSlide(currentSlide);
  startAutoPlay();
  
  // Manual controls
  prevBtn.addEventListener('click', () => {
    stopAutoPlay();
    prevSlide();
    startAutoPlay();
  });
  
  nextBtn.addEventListener('click', () => {
    stopAutoPlay();
    nextSlide();
    startAutoPlay();
  });
  
  // Pause on hover
  const slider = document.querySelector('.testimonials-slider');
  slider.addEventListener('mouseenter', stopAutoPlay);
  slider.addEventListener('mouseleave', startAutoPlay);
}

// Contact Form Dummy Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! (Form not actually submitted)');
    contactForm.reset();
  });
}

// Typewriter Animation
const typewriterText = document.querySelector('.typewriter-text');
const texts = ['Am Web Developer', 'Am Freelancer', 'Am AI Expert'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    typewriterText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let typeSpeed = isDeleting ? 100 : 150;
  
  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500; // Pause before next word
  }
  
  setTimeout(typeWriter, typeSpeed);
}

// Start typewriter animation
typeWriter();

// Scroll Reveal Animation
const revealSections = document.querySelectorAll('section, footer');
function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealSections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < windowHeight - 80) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
  revealOnScroll();
});
// Add .reveal class to all main sections and footer
revealSections.forEach(section => section.classList.add('reveal')); 