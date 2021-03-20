function Gallery(gallery) {
  if (!gallery) {
    throw new Error("No Gallery found");
  }

  const images = Array.from(gallery.querySelectorAll("img"));
  const modal = document.querySelector(".modal");
  const prevButton = modal.querySelector(".prev");
  const nextButton = modal.querySelector(".next");
  let currentImage;

  function openModal() {
    if (modal.matches(".open")) {
      console.log("Modal is already open");
      return;
    }
    modal.classList.add("open");
    window.addEventListener("keyup", handleKeyUp);
    nextButton.addEventListener("click", showNextImage);
    prevButton.addEventListener("click", showPrevImage);
  }

  function closeModal() {
    modal.classList.remove("open");
    window.removeEventListener("keyup", handleKeyUp);
    nextButton.removeEventListener("click", showNextImage);
    prevButton.addEventListener("click", showPrevImage);
  }

  function handleClickOutside(e) {
    if (e.target === e.currentTarget) closeModal();
  }

  function handleKeyUp(e) {
    if (e.key === "Escape") return closeModal();
    if (e.key === "ArrowRight") return showNextImage();
    if (e.key === "ArrowLeft") return showPrevImage();
  }

  function showImage(el) {
    if (!el) {
      return;
    } else {
      modal.querySelector("img").src = el.src;
      modal.querySelector("h2").textContent = el.title;
      modal.querySelector("figure p").textContent = el.dataset.description;
      currentImage = el;
      openModal();
    }
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  images.forEach((image) =>
    image.addEventListener("click", (e) => showImage(e.currentTarget))
  );

  modal.addEventListener("click", handleClickOutside);

  images.forEach((image) =>
    image.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        showImage(e.currentTarget);
      }
    })
  );
}

const gallery1 = Gallery(document.querySelector(".gallery1"));
const gallery2 = Gallery(document.querySelector(".gallery2"));
