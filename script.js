// =============================
// PRODUCT DATA
// To add a new product, add an entry to this array.
// =============================

const products = [
  {
    name: "The Platform",
    tag: "Learning Platform",
    description: "Interactive learning with quizzes, flashcards, and real-time analytics — built for students and educators.",
    cta: "Get Started",
    type: "institution-select",
  },
  {
    name: "Vocably",
    tag: "GRE Prep",
    description: "Master GRE vocabulary with spaced repetition flashcards and smart review sessions.",
    cta: "Try Vocably",
    type: "link",
    url: "https://vocably.edhivo.com",
  },
];

// =============================
// INSTITUTION DATA
// To add a new institution, add an entry here.
// =============================

const institutions = [
  { name: "SBU", url: "https://sbu.edhivo.com" },
  { name: "SAI", url: "https://sai.edhivo.com" },
];

// =============================
// ARROW SVG
// =============================

const arrowSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;

const chevronSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;

// =============================
// FLICKER EFFECT
// =============================

document.querySelectorAll('.flicker-word').forEach(el => {
  const text = el.dataset.text;
  el.textContent = '';
  [...text].forEach((char, i) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.className = 'flicker-letter';
    span.style.animationDelay = `${2.5 + i * 0.18}s`;
    el.appendChild(span);
  });
});

// =============================
// RENDER PRODUCTS
// =============================

const list = document.getElementById("products-list");

if (list) {
  products.forEach((product, index) => {
    const item = document.createElement("article");
    item.className = "product-item reveal";

    const isLink = product.type === "link";

    item.innerHTML = `
      <div class="product-item-header">
        <span class="product-item-index">0${index + 1}</span>
        <span class="product-item-tag">${product.tag}</span>
      </div>
      <h3 class="product-item-name">${product.name}</h3>
      <div class="product-item-body">
        <p class="product-item-desc">${product.description}</p>
        ${
          isLink
            ? `<a href="${product.url}" class="product-item-cta" target="_blank" rel="noopener">${product.cta} ${arrowSVG}</a>`
            : `<button class="product-item-cta" data-action="open-modal">${product.cta} ${arrowSVG}</button>`
        }
      </div>
    `;

    list.appendChild(item);
  });
}

// =============================
// INSTITUTION MODAL
// =============================

const overlay = document.getElementById("modal-overlay");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");

function renderInstitutions() {
  modalBody.innerHTML = institutions
    .map(
      (inst) =>
        `<a href="${inst.url}" class="institution-link" target="_blank" rel="noopener">
          ${inst.name}
          ${chevronSVG}
        </a>`
    )
    .join("");
}

renderInstitutions();

function openModal() {
  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");
  modalClose.focus();
}

function closeModal() {
  overlay.classList.remove("active");
  overlay.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", (e) => {
  if (e.target.closest('[data-action="open-modal"]')) {
    openModal();
  }
});

modalClose.addEventListener("click", closeModal);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && overlay.classList.contains("active")) {
    closeModal();
  }
});

// =============================
// NAV SCROLL EFFECT
// =============================

const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 8);
}, { passive: true });

// =============================
// SCROLL REVEAL
// =============================

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});
