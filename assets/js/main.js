// HEADER: con sombra al hacer scroll
const header = document.querySelector(".header-fijo");
if (header) {
  window.addEventListener("scroll", () =>
    header.classList.toggle("scrolled", window.scrollY > 2)
  );
}

// MENÚ MOVIL: cerrarmenú al hacer click
document.querySelectorAll("#menu .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const menu = document.querySelector("#menu");
    if (!menu || !menu.classList.contains("show")) return;
    bootstrap.Collapse.getOrCreateInstance(menu).hide();
  });
});

// MENU GRANDE (BIGTYPE): mover letras al hacer scroll
const bigTypeSection = document.querySelector("#bigType");
const bigTypeLines = document.querySelector("#bigTypeLines");
const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

function updateBigType() {
  if (!bigTypeSection || !bigTypeLines) return;

  const rect = bigTypeSection.getBoundingClientRect();
  const vh = window.innerHeight;

  const total = bigTypeSection.offsetHeight - vh;
  const scrolled = clamp(-rect.top, 0, total);
  const t = total > 0 ? scrolled / total : 0;

  bigTypeLines.style.setProperty("--ty", `${(0.5 - t) * (vh * 0.45)}px`);
}

window.addEventListener("scroll", updateBigType, { passive: true });
window.addEventListener("resize", updateBigType);
updateBigType();

document.addEventListener("DOMContentLoaded", () => {
  // MODAL POSTER Y 3D
  const posterOverlay = document.getElementById("posterModalOverlay");
  const posterClose = document.getElementById("modalCloseBtn");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");
  const modalImg = document.getElementById("modalImage");

  // MODAL POSTER / 3D: abrir modal
  const openPoster = (el) => {
    modalTitle.innerHTML = el.getAttribute("data-title");
    modalDesc.innerHTML = el.getAttribute("data-description");
    modalImg.src = el.getAttribute("data-image");
    modalImg.alt = el.getAttribute("data-title");
    posterOverlay.classList.add("is-active");
    document.body.style.overflow = "hidden";
  };

  // MODAL POSTER / 3D: cerrar modal
  const closePoster = () => {
    posterOverlay.classList.remove("is-active");
    document.body.style.overflow = "";
    setTimeout(() => (modalImg.src = ""), 300);
  };

  document
    .querySelectorAll(
      ".poster-item.js-open-modal, .design3d-item.js-open-modal"
    )
    .forEach((item) => item.addEventListener("click", () => openPoster(item)));

  posterClose.addEventListener("click", (e) => {
    e.stopPropagation();
    closePoster();
  });

  // MODAL ALBUM
  const albumOverlay = document.getElementById("albumModalOverlay");
  const albumClose = document.getElementById("albumModalCloseBtn");
  const albTitle = document.getElementById("albModalTitle");
  const albMeta = document.getElementById("albModalMeta");
  const albDesc = document.getElementById("albModalDesc");
  const albImg = document.getElementById("albModalImg");

  // MODAL ALBUM: abrir modal
  const openAlbum = (el) => {
    albTitle.innerHTML = el.getAttribute("data-title");
    albMeta.textContent = el.getAttribute("data-meta");
    albDesc.innerHTML = el.getAttribute("data-desc");
    albImg.src = el.getAttribute("data-image");
    albumOverlay.classList.add("is-active");
    document.body.style.overflow = "hidden";
  };

  // MODAL ALBUM: cerrar modal
  const closeAlbum = () => {
    albumOverlay.classList.remove("is-active");
    document.body.style.overflow = "";
    setTimeout(() => (albImg.src = ""), 300);
  };

  document
    .querySelectorAll(".album-item.js-open-album")
    .forEach((item) => item.addEventListener("click", () => openAlbum(item)));

  albumClose.addEventListener("click", (e) => {
    e.stopPropagation();
    closeAlbum();
  });

  // ACCESIBILIDAD MODAL: cerrar con tecla esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document
        .querySelectorAll(
          ".fondo-modal.is-active, .album-modal-overlay.is-active"
        )
        .forEach((modal) => {
          modal.classList.remove("is-active");
          document.body.style.overflow = "";
        });
    }
  });

  // GALLERY: activar/desactivar imágenes
  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const items = gallery.querySelectorAll("[data-gallery-item]");

    items.forEach((item) => {
      item.addEventListener("click", () => {
        const active = item.classList.contains("is-active");
        items.forEach((it) => it.classList.remove("is-active"));
        gallery.classList.remove("has-active");
        if (!active) {
          item.classList.add("is-active");
          gallery.classList.add("has-active");
        }
      });
    });
  });
});
