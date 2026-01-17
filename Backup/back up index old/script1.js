// Modal del libro interactivo
const openLibro = document.getElementById('openLibro');
const modalOverlay = document.getElementById('modalOverlay');
const closeModal = document.getElementById('closeModal');
const steps = document.querySelectorAll('.step');

let currentStep = 0;

// Función para mostrar un paso específico
function showStep(index) {
  steps.forEach(s => s.classList.remove('active'));
  if (steps[index]) {
    steps[index].classList.add('active');
    currentStep = index;
  }
}

// Función para cerrar el modal
function closeModalFunc() {
  modalOverlay.classList.add('hidden');
  document.body.style.overflow = '';
  // Resetear al primer paso
  showStep(0);
}

// Abrir modal al hacer clic en el libro
if (openLibro) {
  openLibro.addEventListener('click', () => {
    modalOverlay.classList.remove('hidden');
    showStep(0);
    document.body.style.overflow = 'hidden';
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

// Navegación entre pasos
if (steps.length > 0) {
  steps.forEach((step, index) => {
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
  if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
    closeModalFunc();
  }
});
