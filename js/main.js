/* ═══════════════════════════════════════════
   Super Medical Billing — Main JS
   ═══════════════════════════════════════════ */

// Header scroll effect
(function() {
  const header = document.getElementById('header');
  if (!header) return;
  
  // Don't add scroll effect on inner pages (they use header--inner)
  if (header.classList.contains('header--inner')) return;
  
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
})();

// Mobile menu
function toggleMobileMenu() {
  document.querySelector('.mobile-menu-btn').classList.toggle('active');
  document.getElementById('mobileNav').classList.toggle('active');
  document.body.style.overflow = document.getElementById('mobileNav').classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
  document.querySelector('.mobile-menu-btn').classList.remove('active');
  document.getElementById('mobileNav').classList.remove('active');
  document.body.style.overflow = '';
}

// Fade-in on scroll (IntersectionObserver)
(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  document.querySelectorAll('.fade-in, .fade-in-children').forEach(el => observer.observe(el));
})();

// FAQ accordion
(function() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains('open');
      
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      
      // Toggle clicked
      if (!wasOpen) item.classList.add('open');
    });
  });
})();

// Contact form handling
(function() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  
  // Set timestamp on load
  const tsField = document.getElementById('formTimestamp');
  if (tsField) tsField.value = Date.now();
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Honeypot check
    const hp = document.getElementById('hp_website');
    if (hp && hp.value) return;
    
    // Timestamp check (form filled too fast = bot)
    const ts = parseInt(tsField?.value || '0');
    if (Date.now() - ts < 3000) return;
    
    // Gibberish detection
    const message = form.querySelector('[name="message"]')?.value || '';
    const name = form.querySelector('[name="name"]')?.value || '';
    if (isGibberish(name) || isGibberish(message)) return;
    
    // Show success
    form.style.display = 'none';
    const success = document.getElementById('formSuccess');
    if (success) success.style.display = 'block';
    
    // In production, this would submit to an API endpoint
    console.log('Form submitted:', new FormData(form));
  });
  
  function isGibberish(text) {
    if (!text || text.length < 3) return false;
    // Check for too many consonants in a row
    if (/[bcdfghjklmnpqrstvwxyz]{6,}/i.test(text)) return true;
    // Check for too many repeated characters
    if (/(.)\1{4,}/.test(text)) return true;
    // Check ratio of vowels to consonants
    const vowels = (text.match(/[aeiou]/gi) || []).length;
    const letters = (text.match(/[a-z]/gi) || []).length;
    if (letters > 10 && vowels / letters < 0.1) return true;
    return false;
  }
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
