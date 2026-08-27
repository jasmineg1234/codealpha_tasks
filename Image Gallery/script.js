// Select gallery images
const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.getElementById("close");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentIndex = 0;


// Store visible images
function getVisibleItems() {
    return Array.from(galleryItems).filter(item => {
        return item.style.display !== "none";
    });
}


// Open Lightbox

galleryItems.forEach(item => {

    item.addEventListener("click", function () {

        const visibleItems = getVisibleItems();

        currentIndex = visibleItems.indexOf(item);

        showImage();

        lightbox.style.display = "flex";
    });

});


// Show selected image

function showImage() {

    const visibleItems = getVisibleItems();

    if (visibleItems.length === 0) {
        return;
    }

    const image = visibleItems[currentIndex].querySelector("img");

    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
}


// Next Button

nextBtn.addEventListener("click", function () {

    const visibleItems = getVisibleItems();

    currentIndex++;

    if (currentIndex >= visibleItems.length) {
        currentIndex = 0;
    }

    showImage();
});


// Previous Button

prevBtn.addEventListener("click", function () {

    const visibleItems = getVisibleItems();

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = visibleItems.length - 1;
    }

    showImage();
});


// Close Lightbox

closeBtn.addEventListener("click", function () {

    lightbox.style.display = "none";

});


// Close when clicking outside image

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
        lightbox.style.display = "none";
    }

});


// Keyboard Navigation

document.addEventListener("keydown", function (event) {

    if (lightbox.style.display === "flex") {

        if (event.key === "ArrowRight") {
            nextBtn.click();
        }

        if (event.key === "ArrowLeft") {
            prevBtn.click();
        }

        if (event.key === "Escape") {
            closeBtn.click();
        }
    }

});


// Category Filtering

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        // Remove active class
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        this.classList.add("active");

        const category = this.dataset.category;

        galleryItems.forEach(item => {

            if (
                category === "all" ||
                item.dataset.category === category
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});