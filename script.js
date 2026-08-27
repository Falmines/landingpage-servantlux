// Servantlux Philanthropy Center - Interactive Landing Page

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Mobile menu
const menuToggle = $("#menuToggle");
const navMenu = $("#navMenu");
menuToggle?.addEventListener("click", () => navMenu.classList.toggle("open"));
$$(".nav-menu a").forEach(link => link.addEventListener("click", () => navMenu.classList.remove("open")));

// Modal system
const modals = $$(".modal");
function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("active");
  document.body.classList.add("modal-open");
}
function closeAllModals() {
  modals.forEach(m => m.classList.remove("active"));
  document.body.classList.remove("modal-open");
}

$$("[data-modal]").forEach(btn => {
  btn.addEventListener("click", () => openModal(btn.dataset.modal));
});
$$(".modal-close").forEach(btn => btn.addEventListener("click", closeAllModals));
modals.forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeAllModals();
  });
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeAllModals();
});

// Activity popup content based on the PDF
const programs = {
  livein: {
    title: "Live-In",
    description: "Tinggal bersama warga selama 4 Hari 3 Malam. Peserta berinteraksi langsung dengan masyarakat untuk belajar, berbaur, dan memahami kehidupan sehari-hari warga."
  },
  kerjabakti: {
    title: "Kerja Bakti",
    description: "Berpartisipasi dalam kegiatan lingkungan sebagai bentuk gotong royong, kepedulian, dan kontribusi langsung kepada masyarakat."
  },
  kids: {
    title: "Kids Activity",
    description: "Kegiatan edukatif dan kreatif untuk ±50 anak. Program ini memberikan ruang bagi anak-anak untuk belajar, bermain, dan bertumbuh melalui aktivitas positif."
  },
  baksos: {
    title: "Bakti Sosial",
    description: "Pembagian ±20 paket sembako kepada keluarga masyarakat yang membutuhkan sebagai bentuk kepedulian dan pelayanan nyata."
  }
};

$$("[data-program]").forEach(button => {
  button.addEventListener("click", () => {
    const data = programs[button.dataset.program];
    $("#programTitle").textContent = data.title;
    $("#programDescription").textContent = data.description;
    openModal("programModal");
  });
});

// Scroll reveal
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});
$$(".reveal").forEach(el => revealObserver.observe(el));

// Animated statistics
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    if (!target) return;
    let start = 0;
    const duration = 1100;
    const startTime = performance.now();
    const tick = now => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, {threshold: 0.5});
$$("[data-count]").forEach(el => counterObserver.observe(el));

// Active navigation highlight
const sections = $$("main section[id], header[id]");
const navLinks = $$(".nav-menu a");
const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.remove("active"));
    const active = document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`);
    active?.classList.add("active");
  });
}, {rootMargin:"-35% 0px -55% 0px"});
sections.forEach(section => activeObserver.observe(section));

// Prevent placeholder footer buttons from doing nothing
console.log("Servantlux Philanthropy Center landing page loaded.");
