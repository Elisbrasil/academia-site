// Plan toggle
function switchPlan(plan) {
  document.getElementById("plan-anual").style.display =
    plan === "anual" ? "flex" : "none";
  document.getElementById("plan-mensal").style.display =
    plan === "mensal" ? "flex" : "none";
  document
    .getElementById("ptb-anual")
    .classList.toggle("active", plan === "anual");
  document
    .getElementById("ptb-mensal")
    .classList.toggle("active", plan === "mensal");
}

// Accordion
function toggleAcc(btn) {
  const item = btn.closest(".acc-item");
  const isOpen = item.classList.contains("open");
  document
    .querySelectorAll(".acc-item.open")
    .forEach((i) => i.classList.remove("open"));
  if (!isOpen) item.classList.add("open");
}

// Header scroll effect
const hdr = document.getElementById("hdr");
window.addEventListener("scroll", () =>
  hdr.classList.toggle("solid", window.scrollY > 56),
);

// Mobile menu
const ham = document.getElementById("ham");
const mob = document.getElementById("mob");
ham.addEventListener("click", () => {
  ham.classList.toggle("x");
  mob.classList.toggle("open");
  document.body.style.overflow = mob.classList.contains("open") ? "hidden" : "";
});

function cm() {
  ham.classList.remove("x");
  mob.classList.remove("open");
  document.body.style.overflow = "";
}

// Scroll reveal animation
const obs = new IntersectionObserver(
  (es) => {
    es.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("on");
        obs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -32px 0px" },
);

document.querySelectorAll(".rv").forEach((el) => {
  if (!el.closest(".ic-ov")) obs.observe(el);
});

document.querySelectorAll(".ic-ov .in, .ic-ov .ir").forEach((el) => {
  el.style.opacity = 1;
  el.style.transform = "none";
});

// YouTube video player — embed on click
document.getElementById("p1").addEventListener("click", function () {
  const vidBox = this.closest(".vid-box");
  const vidIn = vidBox.querySelector(".vid-in");

  // Remove play button and note
  this.remove();
  vidIn.querySelector(".vid-note")?.remove();

  // Create and inject iframe
  const video = document.createElement("video");
  video.src = "img/video.mp4";
  video.controls = true;
  video.autoplay = true;
  video.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;";
  video.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  video.allowFullscreen = true;
  vidIn.appendChild(video);
});

// Carrossel de professores
(function () {
  const track = document.getElementById("carTrack");
  const dotsEl = document.getElementById("carDots");
  const prev = document.querySelector(".car-prev");
  const next = document.querySelector(".car-next");
  if (!track) return;

  function getVisible() {
    if (window.innerWidth <= 680) return 2;
    if (window.innerWidth <= 1024) return 3;
    return 4;
  }

  const total = track.children.length;
  let cur = 0;

  function maxIndex() {
    return total - getVisible();
  }

  function buildDots() {
    dotsEl.innerHTML = "";
    const pages = maxIndex() + 1;
    for (let i = 0; i <= maxIndex(); i++) {
      const d = document.createElement("button");
      d.className = "car-dot" + (i === cur ? " active" : "");
      d.addEventListener("click", () => goTo(i));
      dotsEl.appendChild(d);
    }
  }

  function goTo(idx) {
    cur = Math.max(0, Math.min(idx, maxIndex()));
    const itemW = track.children[0].offsetWidth + 16;
    track.style.transform = `translateX(-${cur * itemW}px)`;
    prev.disabled = cur === 0;
    next.disabled = cur >= maxIndex();
    document
      .querySelectorAll(".car-dot")
      .forEach((d, i) => d.classList.toggle("active", i === cur));
  }

  prev.addEventListener("click", () => goTo(cur - 1));
  next.addEventListener("click", () => goTo(cur + 1));
  window.addEventListener("resize", () => {
    buildDots();
    goTo(cur);
  });

  buildDots();
  goTo(0);
})();
