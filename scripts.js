/* ═══════════════════════════════════════════
   VALERIE MBAKA — PORTFOLIO SCRIPTS
   ═══════════════════════════════════════════ */

/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '20px';
    cursor.style.height = '20px';
    cursor.style.opacity = '0.6';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '10px';
    cursor.style.height = '10px';
    cursor.style.opacity = '1';
  });
});

/* ── Nav: frosted glass on scroll ── */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

/* ── Mobile Menu ── */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.add('open');
});
document.getElementById('mobileClose').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.remove('open');
});
document.querySelectorAll('.mobile-link').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.remove('open');
  });
});

/* ── Typing Animation ── */
const phrases = [
  'Full-Stack Development',
  'Android Apps',
  'Web Development',
  'Problem Solving',
  'Healthcare Tech',
];
let phraseIndex = 0, charIndex = 0, deleting = false;
const typingEl = document.getElementById('typingText');

function type() {
  const word = phrases[phraseIndex];
  if (!deleting) {
    typingEl.textContent = word.slice(0, ++charIndex);
    if (charIndex === word.length) {
      deleting = true;
      setTimeout(type, 1500);
      return;
    }
  } else {
    typingEl.textContent = word.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 400);
      return;
    }
  }
  setTimeout(type, deleting ? 40 : 80);
}
type();

/* ── Skills Data & Render ── */
const skills = [
  { name: 'HTML5',       icon: 'icons/html-5.png',      pct: 98 },
  { name: 'CSS3',        icon: 'icons/css.png',         pct: 97 },
  { name: 'Bootstrap 5', icon: 'icons/bootstrap.png',   pct: 95 },
  { name: 'JavaScript',  icon: 'icons/java-script.png', pct: 88 },
  { name: 'Python',      icon: 'icons/python.png',      pct: 90 },
  { name: 'Django',      icon: 'icons/django.png',      pct: 96 },
  { name: 'Java',        icon: 'icons/java.png',        pct: 85 },
  { name: 'Kotlin',      icon: 'icons/kotlin.jpeg',     pct: 75 },
  { name: 'Node.js',     icon: 'icons/nodejs.png',      pct: 70 },
  { name: 'Git',         icon: 'icons/github.png',      pct: 90 },
  { name: 'C',           icon: 'icons/c-.png',          pct: 80 },
  { name: 'C++',         icon: 'icons/c-logo.png',      pct: 87 },
  { name: 'MySQL',       icon: 'icons/mysql.png',       pct: 80 },
  { name: 'Oracle',      icon: 'icons/oracle.png',      pct: 75 },
];

const skillsGrid = document.getElementById('skillsGrid');
skills.forEach(s => {
  skillsGrid.insertAdjacentHTML('beforeend', `
    <div class="skill-card reveal">
      <div class="skill-card-top">
        <img src="${s.icon}" alt="${s.name}" class="skill-icon"
             onerror="this.style.display='none'" />
        <span class="skill-pct">${s.pct}%</span>
      </div>
      <div class="skill-name">${s.name}</div>
      <div class="skill-bar">
        <div class="skill-fill" data-pct="${s.pct}"></div>
      </div>
    </div>
  `);
});

/* ── Scroll Reveal (IntersectionObserver) ── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.12 });

function attachReveal() {
  document.querySelectorAll('.reveal').forEach(el => {
    if (!el.classList.contains('visible')) revealObserver.observe(el);
  });
}
attachReveal();
// Re-attach after dynamically injected skill cards
setTimeout(attachReveal, 100);

/* ── Skill Bars Animate on Section Enter ── */
const skillsSection = document.getElementById('skills');
const skillsBarObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    document.querySelectorAll('.skill-fill').forEach(fill => {
      fill.style.width = fill.getAttribute('data-pct') + '%';
    });
    skillsBarObserver.disconnect();
  });
}, { threshold: 0.2 });
if (skillsSection) skillsBarObserver.observe(skillsSection);
