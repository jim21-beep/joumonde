// Product Detail Page JavaScript

// Gallery Images
const galleryImages = [
    { background: 'linear-gradient(135deg, #f5f5dc 0%, #d3d3d3 100%)', alt: 'Bild 1' },
    { background: 'linear-gradient(135deg, #d3d3d3 0%, #a8a8a8 100%)', alt: 'Bild 2' },
    { background: 'linear-gradient(135deg, #c8c8c8 0%, #9c9c9c 100%)', alt: 'Bild 3' },
    { background: 'linear-gradient(135deg, #e0e0e0 0%, #b8b8b8 100%)', alt: 'Bild 4' }
];

let currentImageIndex = 0;

// Change Main Image
function changeMainImage(index) {
    currentImageIndex = index;
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Update main image
    mainImage.style.background = galleryImages[index].background;
    
    // Update active thumbnail
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Open Image Zoom (full screen)
function openImageZoom() {
    const zoomOverlay = document.createElement('div');
    zoomOverlay.className = 'image-zoom-overlay';
    zoomOverlay.innerHTML = `
        <button class="zoom-close" onclick="this.parentElement.remove()">&times;</button>
        <div class="zoom-image" style="background: ${galleryImages[currentImageIndex].background};">
            <span class="product-placeholder">${galleryImages[currentImageIndex].alt}</span>
        </div>
        <div class="zoom-nav">
            <button onclick="zoomPrevImage()" ${currentImageIndex === 0 ? 'disabled' : ''}>‹</button>
            <span>${currentImageIndex + 1} / ${galleryImages.length}</span>
            <button onclick="zoomNextImage()" ${currentImageIndex === galleryImages.length - 1 ? 'disabled' : ''}>›</button>
        </div>
    `;
    document.body.appendChild(zoomOverlay);
    document.body.style.overflow = 'hidden';
}

// Zoom Navigation
function zoomPrevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateZoomImage();
    }
}

function zoomNextImage() {
    if (currentImageIndex < galleryImages.length - 1) {
        currentImageIndex++;
        updateZoomImage();
    }
}

function updateZoomImage() {
    const zoomImage = document.querySelector('.zoom-image');
    const zoomCounter = document.querySelector('.zoom-nav span');
    const prevBtn = document.querySelector('.zoom-nav button:first-of-type');
    const nextBtn = document.querySelector('.zoom-nav button:last-of-type');
    
    zoomImage.style.background = galleryImages[currentImageIndex].background;
    zoomImage.querySelector('.product-placeholder').textContent = galleryImages[currentImageIndex].alt;
    zoomCounter.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
    
    prevBtn.disabled = currentImageIndex === 0;
    nextBtn.disabled = currentImageIndex === galleryImages.length - 1;
}

// Size Selection
let selectedSize = 'M';
function selectSize(size, button) {
    selectedSize = size;
    document.getElementById('selectedSize').textContent = size;
    
    // Update button states
    document.querySelectorAll('.size-option').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

// Color Selection
let selectedColor = 'Navy';
function selectColor(color, button) {
    selectedColor = color;
    document.getElementById('selectedColor').textContent = color;
    
    // Update button states
    document.querySelectorAll('.color-option').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

// Quantity Selection
function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue < parseInt(quantityInput.max)) {
        quantityInput.value = currentValue + 1;
    }
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > parseInt(quantityInput.min)) {
        quantityInput.value = currentValue - 1;
    }
}

// Add to Cart from Detail Page
function addToCartFromDetail() {
    const productName = document.querySelector('.product-detail-title').textContent;
    const price = parseFloat(document.querySelector('.current-price').getAttribute('data-price'));
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Add to cart with size and color
    for (let i = 0; i < quantity; i++) {
        addToCart(productName + ` (${selectedSize}, ${selectedColor})`, price);
    }
    
    // Show feedback
    showAddToCartFeedback();
}

// Show feedback animation
function showAddToCartFeedback() {
    const button = document.querySelector('.btn-add-to-cart');
    const originalText = button.innerHTML;
    
    button.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        Hinzugefügt!
    `;
    button.classList.add('success');
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.remove('success');
    }, 2000);
}

// Wishlist from Detail Page
let isInWishlist = false;
function toggleWishlistFromDetail() {
    const button = document.querySelector('.btn-add-to-wishlist');
    const productName = document.querySelector('.product-detail-title').textContent;
    const price = parseFloat(document.querySelector('.current-price').getAttribute('data-price'));
    const gradient = galleryImages[0].background;
    
    isInWishlist = !isInWishlist;
    
    if (isInWishlist) {
        button.classList.add('active');
        toggleWishlistItem(productName, price, gradient, button);
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        `;
    } else {
        button.classList.remove('active');
        toggleWishlistItem(productName, price, gradient, button);
        button.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
        `;
    }
}

// Accordion Toggle
function toggleAccordion(button) {
    const item = button.parentElement;
    const content = item.querySelector('.accordion-content');
    const allItems = document.querySelectorAll('.accordion-item');
    
    // Close all other accordions
    allItems.forEach(otherItem => {
        if (otherItem !== item) {
            otherItem.querySelector('.accordion-content').classList.remove('active');
            otherItem.querySelector('.accordion-header').classList.remove('active');
        }
    });
    
    // Toggle current accordion
    content.classList.toggle('active');
    button.classList.toggle('active');
}

// Review Form
function openReviewForm() {
    document.getElementById('review-modal').style.display = 'flex';
}

function closeReviewForm() {
    document.getElementById('review-modal').style.display = 'none';
}

function submitReview(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const rating = formData.get('rating');
    const title = event.target.querySelector('input[type="text"]').value;
    const name = event.target.querySelectorAll('input[type="text"]')[1].value;
    const email = event.target.querySelector('input[type="email"]').value;
    const reviewText = event.target.querySelector('textarea').value;
    
    fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            rating,
            title,
            name,
            email,
            reviewText,
            type: 'Produktbewertung'
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Vielen Dank für Ihre Bewertung! Sie wird nach Prüfung veröffentlicht.');
            closeReviewForm();
            event.target.reset();
        } else {
            alert('Fehler beim Senden. Bitte versuche es später erneut.');
        }
    })
    .catch(() => {
        alert('Fehler beim Senden. Bitte versuche es später erneut.');
    });
    
    // Reload reviews (in production, this would fetch from server)
    loadReviews();
}

// Load Reviews from localStorage
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('productReviews')) || [];
    const reviewList = document.getElementById('reviewList');
    
    // Add user reviews to the list
    reviews.forEach(review => {
        const reviewItem = createReviewElement(review);
        reviewList.insertBefore(reviewItem, reviewList.firstChild);
    });
}

function createReviewElement(review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.className = review.verified ? 'review-item verified' : 'review-item';
    
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    const initials = review.name.split(' ').map(n => n[0]).join('').toUpperCase();
    const dateStr = new Date(review.date).toLocaleDateString('de-DE');
    
    reviewDiv.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <div class="reviewer-avatar">${initials}</div>
                <div>
                    <div class="reviewer-name">${review.name}</div>
                    ${review.verified ? '<div class="review-verified">✓ Verifizierter Kauf</div>' : ''}
                </div>
            </div>
            <div class="review-meta">
                <div class="review-stars">
                    ${stars.split('').map(s => `<span class="star ${s === '★' ? 'filled' : ''}">${s}</span>`).join('')}
                </div>
                <div class="review-date">${dateStr}</div>
            </div>
        </div>
        <h4 class="review-title">${review.title}</h4>
        <p class="review-text">${review.text}</p>
        <div class="review-helpful">
            <button onclick="markHelpful(this)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
                Hilfreich (${review.helpful})
            </button>
        </div>
    `;
    
    return reviewDiv;
}

// Mark Review as Helpful
function markHelpful(button) {
    const countSpan = button.querySelector('svg + text') || button.childNodes[button.childNodes.length - 1];
    let count = parseInt(countSpan.textContent.match(/\d+/)[0]);
    count++;
    button.innerHTML = button.innerHTML.replace(/\(\d+\)/, `(${count})`);
    button.disabled = true;
    button.style.opacity = '0.6';
}

// Live Viewer Counter (simulated)
function updateViewerCount() {
    const viewerCount = document.getElementById('viewerCount');
    if (viewerCount) {
        // Random number between 8-20
        const randomCount = Math.floor(Math.random() * 13) + 8;
        viewerCount.textContent = randomCount;
    }
}

// Update viewer count every 10 seconds
setInterval(updateViewerCount, 10000);

// Simulate stock urgency
function initStockUrgency() {
    const stockStatus = document.querySelector('.stock-status');
    const stockCount = Math.floor(Math.random() * 8) + 3; // Random 3-10
    
    if (stockCount <= 5) {
        stockStatus.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Nur noch <strong>${stockCount} Stück</strong> auf Lager!</span>
        `;
        stockStatus.className = 'stock-status low-stock';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadReviews();
    updateViewerCount();
    initStockUrgency();
    
    // Open first accordion by default
    const firstAccordion = document.querySelector('.accordion-header');
    if (firstAccordion) {
        firstAccordion.parentElement.querySelector('.accordion-content').classList.add('active');
    }
});

// Close modals on outside click
window.onclick = function(event) {
    const reviewModal = document.getElementById('review-modal');
    if (event.target === reviewModal) {
        closeReviewForm();
    }
    
    const zoomOverlay = document.querySelector('.image-zoom-overlay');
    if (event.target === zoomOverlay) {
        zoomOverlay.remove();
        document.body.style.overflow = 'auto';
    }
}
