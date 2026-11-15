const progress = document.querySelector('#progress');
const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

const revealObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  }
}, { threshold: 0.14 });
document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));

const heartButton = document.querySelector('#heartButton');
const heartToast = document.querySelector('#heartToast');
let toastTimeout;
heartButton.addEventListener('click', () => {
  heartButton.classList.remove('loved');
  requestAnimationFrame(() => heartButton.classList.add('loved'));
  heartToast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => heartToast.classList.remove('show'), 1600);
});

for (const card of document.querySelectorAll('.compliment-card')) {
  const flip = () => {
    const isFlipped = card.classList.toggle('is-flipped');
    card.setAttribute('aria-pressed', String(isFlipped));
  };
  card.addEventListener('click', flip);
  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      flip();
    }
  });
}
