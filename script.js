// Typewriter effect for tagline
const phrases = [
  'Full Stack Developer',
  '开源爱好者',
  'Problem Solver',
  '代码艺术家',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const taglineEl = document.getElementById('tagline');

function type() {
  const current = phrases[phraseIndex];

  if (isDeleting) {
    taglineEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    taglineEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === current.length) {
    speed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 400;
  }

  setTimeout(type, speed);
}

// Start typewriter after hero animation
setTimeout(type, 800);

// Smooth reveal for about section on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.about-grid > *').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
