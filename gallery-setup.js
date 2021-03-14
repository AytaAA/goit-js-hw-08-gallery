import images from "./gallery-items.js"

const galleryContainer = document.querySelector(".js-gallery")
const galleryModal = document.querySelector(".js-lightbox")
const modalImage = document.querySelector(".lightbox__image")
const closeModalButton = document.querySelector('button[data-action="close-lightbox"]')
const modalOverlay = document.querySelector(".lightbox__overlay")
const bodyRef = document.querySelector("body")

let currentIndex = 0

const galleryMarkUp = createGalleryMarkUp(images)
galleryContainer.innerHTML = galleryMarkUp
galleryContainer.addEventListener("click", onImageClick)
closeModalButton.addEventListener("click", closeModal)
modalOverlay.addEventListener("click", closeModal)
window.addEventListener("keyup", listenerForEscape)
window.addEventListener("keydown", onPressArrow)

function createGalleryMarkUp(images) {
    return images
        .map(({ preview, original, description }, index) => {
            return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
      data-index="${index}"
    />
  </a>
</li>`
        })
        .join("")
}

function onImageClick(e) {
    e.preventDefault()
    let image = e.target
    currentIndex = Number(e.target.dataset.index)
    if (!image.classList.contains("gallery__image")) {
        return
    }
    addIsOpenClassToModal()
    addImageSrc(image)
    addImageAlt(image)
}

function addIsOpenClassToModal() {
    galleryModal.classList.add("is-open")
    window.addEventListener("keyup", listenerForEscape)
    bodyRef.classList.add("is-open")
}

function addImageSrc(image) {
    modalImage.src = image.dataset.source
}

function addImageAlt(image) {
    modalImage.alt = image.alt
}
function closeModal() {
    galleryModal.classList.remove("is-open")
    window.removeEventListener("keyup", listenerForEscape)
    bodyRef.classList.remove("is-open")
    modalImage.src = ""
    modalImage.alt = ""
}

function listenerForEscape(e) {
    if (e.code === "Escape") {
        closeModal()
    }
}

function onPressArrow(e) {
    if (e.key === "ArrowLeft" && currentIndex > 0) {
        currentIndex -= 1
    } else if (e.key === "ArrowRight" && currentIndex < images.length - 1) {
        currentIndex += 1
    } else if (e.key === "ArrowLeft" && currentIndex === 0) {
        currentIndex = images.length - 1
    } else if (e.key === "ArrowRight" && currentIndex === images.length - 1) {
        currentIndex = 0
    }
    modalImage.src = images[currentIndex].original
}
