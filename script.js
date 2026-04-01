// Header scroll effect
const hdr = document.getElementById('hdr');
window.addEventListener('scroll', () => hdr.classList.toggle('solid', window.scrollY > 56));

// Mobile menu
const ham = document.getElementById('ham');
const mob = document.getElementById('mob');
ham.addEventListener('click', () => {
  ham.classList.toggle('x');
  mob.classList.toggle('open');
  document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
});

function cm() {
  ham.classList.remove('x');
  mob.classList.remove('open');
  document.body.style.overflow = '';
}

// Scroll reveal animation
const obs = new IntersectionObserver(es => {
  es.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      obs.unobserve(e.target);
    }
  });
}, { threshold: .08, rootMargin: '0px 0px -32px 0px' });

document.querySelectorAll('.rv').forEach(el => {
  if (!el.closest('.ic-ov')) obs.observe(el);
});

document.querySelectorAll('.ic-ov .in, .ic-ov .ir').forEach(el => {
  el.style.opacity = 1;
  el.style.transform = 'none';
});

// YouTube video player — embed on click
document.getElementById('p1').addEventListener('click', function () {
  const vidBox = this.closest('.vid-box');
  const vidIn = vidBox.querySelector('.vid-in');

  // Remove play button and note
  this.remove();
  vidIn.querySelector('.vid-note')?.remove();

  // Create and inject iframe
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.youtube.com/embed/iwxkzASnWcY?autoplay=1&rel=0';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  vidIn.appendChild(iframe);
});
