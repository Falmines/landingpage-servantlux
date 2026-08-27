const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/* =========================
   MOBILE NAVIGATION
   ========================= */
const menuToggle = $("#menuToggle");
const navMenu = $("#navMenu");
const grandPlanToggle = $(".nav-dropdown-toggle");
const grandPlanDropdown = $(".nav-dropdown");

menuToggle?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

grandPlanToggle?.addEventListener("click", (e) => {
  e.preventDefault();
  const isOpen = grandPlanDropdown.classList.toggle("open");
  grandPlanToggle.setAttribute("aria-expanded", String(isOpen));
});

$$(".nav-menu a").forEach(link => {
  link.addEventListener("click", () => {
    navMenu?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    grandPlanDropdown?.classList.remove("open");
    grandPlanToggle?.setAttribute("aria-expanded", "false");
  });
});

/* =========================
   MODAL SYSTEM
   ========================= */
const modals = $$(".modal");

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.classList.add("active");
  document.body.classList.add("modal-open");
}

function closeAllModals() {
  modals.forEach(modal => modal.classList.remove("active"));
  document.body.classList.remove("modal-open");
}

document.addEventListener("click", (e) => {
  const trigger = e.target.closest("[data-modal]");
  if (!trigger) return;
  e.preventDefault();
  openModal(trigger.dataset.modal);
});

$$(".modal-close").forEach(button => {
  button.addEventListener("click", closeAllModals);
});

modals.forEach(modal => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeAllModals();
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAllModals();
});

/* =========================
   PROGRAM POPUPS
   ========================= */
const programs = {
  livein: {
    title: "Live-In",
    description: "Tinggal bersama warga selama 4 Hari 3 Malam. Peserta berinteraksi langsung dengan masyarakat untuk belajar, berbaur, memahami kehidupan sehari-hari, dan membangun persaudaraan."
  },
  kerjabakti: {
    title: "Kerja Bakti",
    description: "Berpartisipasi dalam kegiatan lingkungan sebagai bentuk gotong royong, kepedulian, dan kontribusi langsung kepada masyarakat."
  },
  kids: {
    title: "Kids Activity",
    description: "Kegiatan edukatif dan kreatif yang memberikan ruang bagi anak-anak untuk belajar, bermain, bertumbuh, dan mendapatkan pengalaman positif."
  },
  baksos: {
    title: "Bakti Sosial",
    description: "Pelayanan sosial dan penyaluran bantuan kepada keluarga serta masyarakat yang membutuhkan sebagai bentuk kepedulian dan pelayanan nyata."
  }
};

$$("[data-program]").forEach(button => {
  button.addEventListener("click", () => {
    const data = programs[button.dataset.program];
    if (!data) return;
    $("#programTitle").textContent = data.title;
    $("#programDescription").textContent = data.description;
    openModal("programModal");
  });
});

/* =========================
   SCROLL REVEAL
   ========================= */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.10 });

$$(".reveal").forEach(el => revealObserver.observe(el));

/* =========================
   GRAND PLAN ACTIVE YEAR
   ========================= */
const planSections = $$(".plan-year");
const planTabs = $$(".plan-tab");

const planObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    planTabs.forEach(tab => tab.classList.remove("active"));
    const activeTab = document.querySelector(`.plan-tab[href="#${entry.target.id}"]`);
    activeTab?.classList.add("active");
  });
}, { rootMargin: "-30% 0px -55% 0px" });

planSections.forEach(section => planObserver.observe(section));

/* =========================
   GENERAL ACTIVE NAVIGATION
   ========================= */
const sections = $$("main section[id], header[id]");
const navLinks = $$(".nav-menu > a");

const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.remove("active"));
    const active = document.querySelector(`.nav-menu > a[href="#${entry.target.id}"]`);
    active?.classList.add("active");
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => activeObserver.observe(section));

console.log("Servantlux Company Profile · Grand Plan 2026–2030 loaded.");
