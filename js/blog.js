// Blog Modal Functionality for Welcome Page
function openBlogModal(postId) {
    fetch(`/blog/${postId}`)
        .then(response => response.json())
        .then(post => {
            const modal = document.getElementById('blogModal');
            const modalBody = document.getElementById('blog-modal-body');

            let mediaHtml = '';
            if (post.media_type === 'video') {
                mediaHtml = `
                    <video controls class="blog-modal-media">
                        <source src="/storage/${post.media_path}" type="video/mp4">
                        Votre navigateur ne supporte pas la lecture de vidéos.
                    </video>
                `;
            } else {
                mediaHtml = `<img src="/storage/${post.media_path}" alt="${post.title}" class="blog-modal-media">`;
            }

            modalBody.innerHTML = `
                ${mediaHtml}
                <h3 class="blog-modal-title">${post.title}</h3>
                <p class="blog-modal-description">${post.description}</p>
                <div class="blog-modal-date">Publié le ${new Date(post.created_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</div>
            `;

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        })
        .catch(error => {
            console.error('Erreur lors du chargement du post:', error);
            alert('Erreur lors du chargement de la publication');
        });
}

function closeBlogModal() {
    const modal = document.getElementById('blogModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Posters Modal Functionality
function openPostersModal() {
    const modal = document.getElementById('postersModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePostersModal() {
    const modal = document.getElementById('postersModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Design Modal Functionality
function openDesignModal() {
    const modal = document.getElementById('designModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeDesignModal() {
    const modal = document.getElementById('designModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const blogModal = document.getElementById('blogModal');
    const postersModal = document.getElementById('postersModal');
    const designModal = document.getElementById('designModal');
    if (event.target === blogModal) {
        closeBlogModal();
    }
    if (event.target === postersModal) {
        closePostersModal();
    }
    if (event.target === designModal) {
        closeDesignModal();
    }
}

// Close modal with ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeBlogModal();
        closePostersModal();
        closeDesignModal();
    }
});

// Image Lightbox
function openImageModal(src, alt) {
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('imageModalImg');
    const caption = document.getElementById('imageModalCaption');
    img.src = src;
    img.alt = alt || '';
    caption.textContent = alt || '';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    const img = document.getElementById('imageModalImg');
    img.src = '';
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Auto-play videos on hover for blog post cards
document.addEventListener('DOMContentLoaded', function() {
    const blogPostCards = document.querySelectorAll('.blog-post-card');

    blogPostCards.forEach(card => {
        const video = card.querySelector('.blog-post-video');
        if (video) {
            card.addEventListener('mouseenter', () => {
                video.play();
            });

            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });
        }
    });

    // Attach click handlers to images for lightbox
    const clickableImages = document.querySelectorAll('.clickable-image, .gallery-image');
    clickableImages.forEach(img => {
        img.addEventListener('click', function(e) {
            openImageModal(this.src, this.alt || '');
        });
    });
});