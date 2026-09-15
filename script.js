// ============================================
// MODAL DEL LIBRO INTERACTIVO
// ============================================

// Elementos del DOM
const openLibro = document.getElementById('openLibro');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');
const steps = document.querySelectorAll('.step');

let currentStep = 0;

/**
 * Función para mostrar un paso específico del modal
 * @param {number} index - Índice del paso a mostrar
 */
function showStep(index) {
  steps.forEach(s => s.classList.remove('active'));
  if (steps[index]) {
    steps[index].classList.add('active');
    currentStep = index;
  }
}

/**
 * Función para cerrar el modal y resetear al primer paso
 */
function closeModalFunc() {
  if (modalOverlay) {
    modalOverlay.classList.add('hidden');
    document.body.style.overflow = '';
    // Resetear al primer paso
    showStep(0);
  }
}

// Inicialización del modal cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
  // Abrir modal al hacer clic en el libro
  if (openLibro) {
    openLibro.addEventListener('click', () => {
      if (modalOverlay) {
        modalOverlay.classList.remove('hidden');
        showStep(0);
        document.body.style.overflow = 'hidden';
      }
    });
  }

  // Cerrar modal con el botón X
  if (closeModal) {
    closeModal.addEventListener('click', closeModalFunc);
  }

  // Cerrar modal al hacer clic fuera del contenido
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModalFunc();
      }
    });
  }

  // Navegación entre pasos del modal
  if (steps.length > 0) {
    steps.forEach((step) => {
      const nextButtons = step.querySelectorAll('.option-btn');
      nextButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const nextStep = parseInt(btn.getAttribute('data-next'));
          if (!isNaN(nextStep)) {
            showStep(nextStep);
          }
        });
      });
    });
  }

  // Cerrar modal con tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && !modalOverlay.classList.contains('hidden')) {
      closeModalFunc();
    }
  });
});

// Hacer showStep disponible globalmente para los botones "Volver" en el HTML
window.showStep = showStep;


// Menú móvil compartido para páginas internas (no interfiere con index.html)
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.site-header .menu-btn');
  const nav = document.querySelector('.site-header .main-nav');
  if (!menuBtn || !nav) return;

  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? '×' : '☰';
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = '☰';
    });
  });
});


// Home: despliegue editorial de “Acerca de mí”. No interfiere con el modal ni con el menú móvil.
document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.querySelector('.about-hero-trigger');
  const panel = document.getElementById('about-panel');
  const close = document.querySelector('.about-close');
  if (!trigger || !panel) return;

  const setOpen = (open) => {
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', String(!open));
    trigger.setAttribute('aria-expanded', String(open));
    trigger.querySelector('span')?.replaceChildren(document.createTextNode(open ? '↑' : '↓'));
    if (open) {
      window.setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
    }
  };

  trigger.addEventListener('click', () => setOpen(!panel.classList.contains('is-open')));
  close?.addEventListener('click', () => setOpen(false));
});


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registroForm');
  if (!form) return;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.info('Registro: formulario validado; requiere backend para persistir datos.');
  });
});


// Home: menú móvil (mantiene aislado el comportamiento del Home).
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.home-header .menu-btn');
  const nav = document.querySelector('.home-header .nav');
  if (!menuBtn || !nav) return;

  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? '×' : '☰';
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = '☰';
    });
  });
});
