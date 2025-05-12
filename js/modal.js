let isModalSetup = false;

export function openModal(modalEl) {
  modalEl.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

export function closeModal(modalEl) {
  modalEl.classList.add("hidden");
  document.body.style.overflow = "auto";
}

export function addModalCloseEvents(modalEl, closeBtnSelector) {
  if (isModalSetup) return;
  isModalSetup = true;

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modalEl.classList.contains("hidden")) {
      closeModal(modalEl);
    }
  });

  modalEl.addEventListener("click", (e) => {
    const isClickInsideModal = e.target.closest(".modal-content");
    if (!isClickInsideModal) {
      closeModal(modalEl);
    }
  });

  modalEl.addEventListener("click", (e) => {
    if (e.target.matches(closeBtnSelector)) {
      closeModal(modalEl);
    }
  });
}