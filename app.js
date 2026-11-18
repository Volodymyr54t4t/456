const progress = document.querySelector('#progress');
const updateProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0}%`;
};
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();

const opener = document.querySelector('#openLetter');
opener.addEventListener('click', () => {
  opener.classList.add('opened');
  document.querySelector('#letter').scrollIntoView({ behavior: 'smooth' });
});

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });
  reveals.forEach(item => observer.observe(item));
} else {
  reveals.forEach(item => item.classList.add('visible'));
}

const heartButton = document.querySelector('#heartButton');
const heartToast = document.querySelector('#heartToast');
let toastTimeout;
heartButton.addEventListener('click', () => {
  heartButton.classList.remove('loved');
  requestAnimationFrame(() => heartButton.classList.add('loved'));
  heartToast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => heartToast.classList.remove('show'), 1500);
});
