/* Main JavaScript file for scroll-triggered animations and image modal */

document.addEventListener('DOMContentLoaded', () => {
    // Scroll-triggered animations for sections
    const sectionsToAnimate = document.querySelectorAll('.hidden-on-scroll');

    if (sectionsToAnimate.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('hidden-on-scroll');
                    observer.unobserve(entry.target);
                    // console.log(`${entry.target.id} is now visible and animated.`);
                }
            });
        };

        const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
        sectionsToAnimate.forEach(section => {
            intersectionObserver.observe(section);
        });
        // console.log(`IntersectionObserver initialized for ${sectionsToAnimate.length} sections.`);
    }

    // Image Modal (Lightbox) Functionality
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModalBtn = document.querySelector('.modal-close-btn');
    const galleryImages = document.querySelectorAll('#photos img');

    if (modal && modalImage && closeModalBtn && galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                modal.classList.add('modal-open'); // Use class to trigger display and animation
                // modal.style.display = "block"; // Old way, replaced by class
                modalImage.src = this.src;
                if (modalCaption) {
                    modalCaption.innerHTML = this.alt || 'Image'; // Use alt text or a default
                }
                // console.log(`Modal opened for image: ${this.alt}`);
            });
        });

        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('modal-open');
            // modal.style.display = "none"; // Old way
            // console.log('Modal closed by button.');
        });

        // Close modal when clicking on the overlay (outside the image)
        modal.addEventListener('click', (event) => {
            if (event.target === modal) { // Check if the click is on the modal overlay itself
                modal.classList.remove('modal-open');
                // modal.style.display = "none"; // Old way
                // console.log('Modal closed by clicking overlay.');
            }
        });
        
        // console.log(`Image modal functionality initialized for ${galleryImages.length} images.`);
    } else {
        console.log("Modal elements not found or no gallery images in #photos.");
    }
});
