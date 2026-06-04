// HEADER: con sombra al hacer scroll
const header = document.querySelector(".header-fijo");
if (header) {
  window.addEventListener("scroll", () =>
    header.classList.toggle("scrolled", window.scrollY > 2),
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

// ==========================================
// EJECUCIÓN AL CARGAR LA PÁGINA
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. MODAL POSTER Y 3D
  const posterOverlay = document.getElementById("posterModalOverlay");
  const posterClose = document.getElementById("modalCloseBtn");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDescription");
  const modalImg = document.getElementById("modalImage");

  const openPoster = (el) => {
    modalTitle.innerHTML = el.getAttribute("data-title");
    modalDesc.innerHTML = el.getAttribute("data-description");
    modalImg.src = el.getAttribute("data-image");
    modalImg.alt = el.getAttribute("data-title");
    posterOverlay.classList.add("is-active");
    document.body.style.overflow = "hidden";
  };

  const closePoster = () => {
    posterOverlay.classList.remove("is-active");
    document.body.style.overflow = "";
    setTimeout(() => (modalImg.src = ""), 300);
  };

  document
    .querySelectorAll(
      ".poster-item.js-open-modal, .design3d-item.js-open-modal",
    )
    .forEach((item) => item.addEventListener("click", () => openPoster(item)));

  if (posterClose) {
    posterClose.addEventListener("click", (e) => {
      e.stopPropagation();
      closePoster();
    });
  }

  // 2. MODAL ALBUM
  const albumOverlay = document.getElementById("albumModalOverlay");
  const albumClose = document.getElementById("albumModalCloseBtn");
  const albTitle = document.getElementById("albModalTitle");
  const albMeta = document.getElementById("albModalMeta");
  const albDesc = document.getElementById("albModalDesc");
  const albImg = document.getElementById("albModalImg");

  const openAlbum = (el) => {
    albTitle.innerHTML = el.getAttribute("data-title");
    albMeta.textContent = el.getAttribute("data-meta");
    albDesc.innerHTML = el.getAttribute("data-desc");
    albImg.src = el.getAttribute("data-image");
    albumOverlay.classList.add("is-active");
    document.body.style.overflow = "hidden";
  };

  const closeAlbum = () => {
    albumOverlay.classList.remove("is-active");
    document.body.style.overflow = "";
    setTimeout(() => (albImg.src = ""), 300);
  };

  document
    .querySelectorAll(".album-item.js-open-album")
    .forEach((item) => item.addEventListener("click", () => openAlbum(item)));

  if (albumClose) {
    albumClose.addEventListener("click", (e) => {
      e.stopPropagation();
      closeAlbum();
    });
  }

  // 3. FUNCIONALIDAD BOTÓN VER MÁS (IDENTITY)
  const btnVerMas = document.getElementById("btnVerMasIdentity");
  const hiddenContent = document.getElementById("identityHiddenContent");

  if (btnVerMas && hiddenContent) {
    btnVerMas.addEventListener("click", () => {
      if (hiddenContent.style.display === "none") {
        // Mostrar contenido
        hiddenContent.style.display = "block";
        btnVerMas.textContent = "VER MENOS";

        // Efecto suave de scroll hacia la parte desplegada
        setTimeout(() => {
          hiddenContent.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      } else {
        // Ocultar contenido
        hiddenContent.style.display = "none";
        btnVerMas.textContent = "VER MÁS";
      }
    });
  }

  // 4. MODAL ENTORNO VISUAL
  const entornoOverlay = document.getElementById("entornoModalOverlay");
  const entornoClose = document.getElementById("entornoModalCloseBtn");
  const entornoTitle = document.getElementById("entornoModalTitle");
  const entornoImg = document.getElementById("entornoModalImage");

  const openEntorno = (el) => {
    if (entornoTitle) entornoTitle.innerHTML = el.getAttribute("data-title");
    if (entornoImg) {
      entornoImg.src = el.getAttribute("data-image");
      entornoImg.alt = el.getAttribute("data-title");
    }
    if (entornoOverlay) {
      entornoOverlay.classList.add("is-active");
      document.body.style.overflow = "hidden";
    }
  };

  const closeEntorno = () => {
    if (entornoOverlay) entornoOverlay.classList.remove("is-active");
    document.body.style.overflow = "";
    setTimeout(() => {
      if (entornoImg) entornoImg.src = "";
    }, 300);
  };

  document
    .querySelectorAll(".entorno-item.js-open-entorno")
    .forEach((item) => item.addEventListener("click", () => openEntorno(item)));

  if (entornoClose) {
    entornoClose.addEventListener("click", (e) => {
      e.stopPropagation();
      closeEntorno();
    });
  }

  // 5. ACCESIBILIDAD MODAL: cerrar con tecla esc (Aplica para todos los modales)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document
        .querySelectorAll(
          ".fondo-modal.is-active, .album-modal-overlay.is-active",
        )
        .forEach((modal) => {
          modal.classList.remove("is-active");
          document.body.style.overflow = "";
        });
    }
  });

  // 6. GALLERY: activar/desactivar imágenes
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
