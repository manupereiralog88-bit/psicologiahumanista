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
