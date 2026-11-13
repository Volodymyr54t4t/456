const feed = document.querySelector('#feed');
const scenes = [...document.querySelectorAll('.scene')];
const progress = document.querySelector('#progress');
const counter = document.querySelector('#counter');
let activeIndex = 0;

function goTo(index) {
  const next = Math.max(0, Math.min(scenes.length - 1, index));
  scenes[next].scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelector('#prev').addEventListener('click', () => goTo(activeIndex - 1));
document.querySelector('#next').addEventListener('click', () => goTo(activeIndex + 1));
feed.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown' || event.key === 'PageDown') { event.preventDefault(); goTo(activeIndex + 1); }
  if (event.key === 'ArrowUp' || event.key === 'PageUp') { event.preventDefault(); goTo(activeIndex - 1); }
});

const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    activeIndex = Number(entry.target.dataset.index) - 1;
    entry.target.classList.add('in-view');
    counter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(scenes.length).padStart(2, '0')}`;
    progress.style.width = `${((activeIndex + 1) / scenes.length) * 100}%`;
  }
}, { root: feed, threshold: 0.6 });
scenes.forEach(scene => observer.observe(scene));

const likeButton = document.querySelector('#like');
const toast = document.querySelector('#toast');
let toastTimer;
likeButton.addEventListener('click', () => {
  likeButton.classList.remove('liked');
  requestAnimationFrame(() => likeButton.classList.add('liked'));
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (let i = 0; i < 7; i++) {
      const heart = document.createElement('span');
      heart.className = 'heart-burst';
      heart.textContent = i % 2 ? '✦' : '♡';
      heart.style.setProperty('--dx', `${Math.cos(i * Math.PI / 3.5) * 42}px`);
      heart.style.setProperty('--dy', `${Math.sin(i * Math.PI / 3.5) * 42}px`);
      likeButton.append(heart);
      setTimeout(() => heart.remove(), 750);
    }
  }
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1400);
});
