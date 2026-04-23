function switchPlan(plan) {
  const anual = document.getElementById("plan-anual");
  const mensal = document.getElementById("plan-mensal");
  const btnAnual = document.getElementById("ptb-anual");
  const btnMensal = document.getElementById("ptb-mensal");

  if (anual) anual.style.display = plan === "anual" ? "flex" : "none";
  if (mensal) mensal.style.display = plan === "mensal" ? "flex" : "none";

  btnAnual?.classList.toggle("active", plan === "anual");
  btnMensal?.classList.toggle("active", plan === "mensal");
}

function toggleAcc(btn) {
  const item = btn.closest(".acc-item");
  if (!item) return;

  const isOpen = item.classList.contains("open");

  document.querySelectorAll(".acc-item.open").forEach((i) => {
    i.classList.remove("open");
  });

  if (!isOpen) item.classList.add("open");
}

const hdr = document.getElementById("hdr");

if (hdr) {
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        hdr.classList.toggle("solid", window.scrollY > 56);
        ticking = false;
      });
      ticking = true;
    }
  });
}

const ham = document.getElementById("ham");
const mob = document.getElementById("mob");

if (ham && mob) {
  ham.addEventListener("click", () => {
    const isOpen = mob.classList.toggle("open");
    ham.classList.toggle("x");
    document.body.style.overflow = isOpen ? "hidden" : "";
  });
}

function cm() {
  if (!ham || !mob) return;

  ham.classList.remove("x");
  mob.classList.remove("open");
  document.body.style.overflow = "";
}

const obs = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("on");
        observer.unobserve(e.target);
      }
    });
  },
  {
    threshold: 0.08,
    rootMargin: "0px 0px -32px 0px",
  },
);

document.querySelectorAll(".rv").forEach((el) => {
  if (!el.closest(".ic-ov")) obs.observe(el);
});

document.querySelectorAll(".ic-ov .in, .ic-ov .ir").forEach((el) => {
  el.style.opacity = 1;
  el.style.transform = "none";
});

const playBtn = document.getElementById("p1");

if (playBtn) {
  playBtn.addEventListener("click", function () {
    const vidBox = this.closest(".vid-box");
    const vidIn = vidBox?.querySelector(".vid-in");
    if (!vidBox || !vidIn) return;

    this.remove();
    vidIn.querySelector(".vid-note")?.remove();

    const video = document.createElement("video");
    video.src = "assets/video.mp4";
    video.controls = true;
    video.autoplay = true;
    video.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;object-fit:cover;";

    vidIn.appendChild(video);
  });
}

(function () {
  const track = document.getElementById("carTrack");
  const dotsEl = document.getElementById("carDots");
  const prev = document.querySelector(".car-prev");
  const next = document.querySelector(".car-next");

  if (!track || !dotsEl || !prev || !next) return;

  function getVisible() {
    if (window.innerWidth <= 680) return 2;
    if (window.innerWidth <= 1024) return 3;
    return 4;
  }

  const total = track.children.length;
  let cur = 0;

  function maxIndex() {
    return Math.max(0, total - getVisible());
  }

  function buildDots() {
    dotsEl.innerHTML = "";
    const max = maxIndex();

    for (let i = 0; i <= max; i++) {
      const d = document.createElement("button");
      d.className = "car-dot" + (i === cur ? " active" : "");
      d.addEventListener("click", () => goTo(i));
      dotsEl.appendChild(d);
    }
  }

  function goTo(idx) {
    cur = Math.max(0, Math.min(idx, maxIndex()));

    const style = getComputedStyle(track);
    const gap = parseInt(style.gap) || 16;
    const itemW = track.children[0].offsetWidth + gap;

    track.style.transform = `translateX(-${cur * itemW}px)`;

    prev.disabled = cur === 0;
    next.disabled = cur >= maxIndex();

    document.querySelectorAll(".car-dot").forEach((d, i) => {
      d.classList.toggle("active", i === cur);
    });
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
