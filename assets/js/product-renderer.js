/**
 * Joumonde Product Renderer
 * 
 * Template functions for rendering product cards dynamically.
 * Uses data from products-data.js to generate consistent HTML.
 */

// State management for selected colors/sizes
const productSelections = {};

/**
 * Initialize selection state for a product
 * @param {Object} product - Product data object
 */
function initProductSelection(product) {
    if (!productSelections[product.id]) {
        const defaultColorObj = product.colors.find(c => c.id === product.defaultColor) || product.colors[0];
        productSelections[product.id] = {
            color: defaultColorObj.name,
            colorId: defaultColorObj.id,
            size: product.defaultSize || product.sizes[0]
        };
    }
}

/**
 * Get current selection for a product
 * @param {string} productId - Product ID
 * @returns {Object} Current selection { color, colorId, size }
 */
function getProductSelection(productId) {
    return productSelections[productId] || { color: '', colorId: '', size: '' };
}

/**
 * Update color selection for a product
 * @param {string} productId - Product ID
 * @param {string} colorId - Color ID
 * @param {string} colorName - Color display name
 * @param {string} colorHex - Color hex value
 */
function selectProductColor(productId, colorId, colorName, colorHex) {
    if (!productSelections[productId]) {
        productSelections[productId] = {};
    }
    productSelections[productId].color = colorName;
    productSelections[productId].colorId = colorId;

    // Update UI
    const colorSquare = document.querySelector(`#${productId}-color-square`);
    const colorLabel = document.querySelector(`#${productId}-color-label`);
    const dropdownList = document.querySelector(`#${productId}-color-list`);
    const dropdownBtn = document.querySelector(`#${productId}-color-btn`);

    if (colorSquare) colorSquare.style.background = colorHex;
    if (colorLabel) colorLabel.textContent = colorName;
    if (dropdownList) dropdownList.style.display = 'none';
    if (dropdownBtn) dropdownBtn.setAttribute('aria-expanded', 'false');
}

/**
 * Toggle color dropdown for a product
 * @param {string} productId - Product ID
 */
function toggleProductColorDropdown(productId) {
    const btn = document.querySelector(`#${productId}-color-btn`);
    const list = document.querySelector(`#${productId}-color-list`);
    
    if (!btn || !list) return;
    
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}

/**
 * Generate star rating HTML
 * @param {number} rating - Rating value (1-5)
 * @returns {string} HTML string
 */
function generateRatingStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<span class="star ${i <= rating ? 'filled' : ''}">★</span>`;
    }
    return stars;
}

/**
 * Generate badge HTML
 * @param {string|null} badge - Badge type ('new', 'sale', 'limited', or null)
 * @returns {string} HTML string
 */
function generateBadge(badge) {
    if (!badge) return '';
    
    const badgeConfig = {
        'new': { class: 'badge-new', text: 'NEU' },
        'sale': { class: 'badge-sale', text: 'SALE -20%' },
        'limited': { class: 'badge-limited', text: 'LIMITED' }
    };
    
    const config = badgeConfig[badge];
    if (!config) return '';
    
    return `<span class="product-badge ${config.class}">${config.text}</span>`;
}

/**
 * Generate price HTML
 * @param {number} price - Current price
 * @param {number|null} originalPrice - Original price (for sales)
 * @returns {string} HTML string
 */
function generatePriceHTML(price, originalPrice) {
    const formattedPrice = price.toFixed(2).replace('.', '.').slice(0, -1) + '0';
    
    if (originalPrice) {
        const formattedOriginal = originalPrice.toFixed(2).replace('.', '.').slice(0, -1) + '0';
        return `<span class="old-price">CHF ${formattedOriginal}</span> CHF ${formattedPrice}`;
    }
    
    return `CHF ${formattedPrice}`;
}

/**
 * Generate size selector HTML
 * @param {Object} product - Product data object
 * @returns {string} HTML string
 */
function generateSizeSelector(product) {
    const options = product.sizes.map(size => 
        `<option ${size === product.defaultSize ? 'selected' : ''}>${size}</option>`
    ).join('');
    
    return `
        <div class="size-selector" style="margin-bottom: 0;">
            <label>Größe:</label>
            <select class="size-select" id="${product.id}-size-select" onchange="productSelections['${product.id}'].size = this.value">
                ${options}
            </select>
        </div>
    `;
}

/**
 * Generate color dropdown HTML
 * @param {Object} product - Product data object
 * @returns {string} HTML string
 */
function generateColorDropdown(product) {
    const defaultColor = product.colors.find(c => c.id === product.defaultColor) || product.colors[0];
    
    const options = product.colors.map(color => `
        <div class="color-dropdown-option" 
             data-color="${color.id}" 
             data-label="${color.name}" 
             onclick="selectProductColor('${product.id}', '${color.id}', '${color.name}', '${color.hex}')">
            <span class="color-square" style="background: ${color.hex}; ${color.id === 'white' ? 'border: 1px solid #ddd;' : ''}"></span> 
            ${color.name}
        </div>
    `).join('');
    
    return `
        <div class="color-dropdown-wrapper" style="position: relative;">
            <button class="color-dropdown-btn" 
                    id="${product.id}-color-btn" 
                    type="button" 
                    aria-haspopup="listbox" 
                    aria-expanded="false" 
                    onclick="event.stopPropagation(); toggleProductColorDropdown('${product.id}')">
                <span class="color-square" id="${product.id}-color-square" style="background: ${defaultColor.hex}; ${defaultColor.id === 'white' ? 'border: 1px solid #ddd;' : ''}"></span>
                <span id="${product.id}-color-label" style="margin-left:8px;font-size:0.97em;color:#444;vertical-align:middle;">${defaultColor.name}</span>
                <svg style="margin-left:6px;vertical-align:middle;" width="16" height="16" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9" style="fill:none;stroke:#888;stroke-width:2"/>
                </svg>
            </button>
            <div class="color-dropdown-list" 
                 id="${product.id}-color-list" 
                 style="display:none;position:absolute;z-index:10;top:38px;left:0;background:#fff;border:1px solid rgba(212,175,55,0.3);border-radius:0;box-shadow:0 4px 16px rgba(0,0,0,0.08);padding:4px 0;min-width:140px;max-height:200px;overflow-y:auto;">
                ${options}
            </div>
        </div>
    `;
}

/**
 * Generate product image HTML
 * @param {Object} product - Product data object
 * @returns {string} HTML string
 */
function generateProductImage(product) {
    const badge = generateBadge(product.badge);
    
    let imageContent;
    if (product.image) {
        imageContent = `<img src="${product.image}" alt="${product.name}" style="width:100%; height:100%; object-fit:cover;">`;
    } else if (product.imagePlaceholder) {
        imageContent = `<span class="product-placeholder">Bild</span>`;
    }
    
    const bgStyle = product.image ? 'background: #f5f5f5;' : `background: ${product.imagePlaceholder || '#f5f5f5'};`;
    
    return `
        <div class="product-image" style="${bgStyle}">
            ${badge}
            <button class="product-wishlist-btn" 
                    onclick="event.stopPropagation(); toggleWishlistItem('${product.name}', ${product.price}, '${product.image || product.imagePlaceholder}', this)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
            ${imageContent || ''}
        </div>
    `;
}

/**
 * Generate a single product card HTML
 * @param {Object} product - Product data object
 * @returns {string} HTML string
 */
function renderProductCard(product) {
    // Initialize selection state
    initProductSelection(product);
    
    const colorsArray = product.colors.map(c => c.name);
    const selection = getProductSelection(product.id);
    
    return `
        <div class="product-card" 
             data-product-id="${product.id}"
             onclick="viewProductDetail('${product.name}', ${product.price}, '${product.description}', ${JSON.stringify(colorsArray).replace(/"/g, "'")}, ${JSON.stringify(product.sizes).replace(/"/g, "'")})" 
             style="cursor: pointer;">
            ${generateProductImage(product)}
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    ${generateRatingStars(product.rating)}
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <p class="product-price" data-price="${product.price}" ${product.originalPrice ? `data-original-price="${product.originalPrice}"` : ''}>
                    ${generatePriceHTML(product.price, product.originalPrice)}
                </p>
                <div class="selector-row" style="display: flex; gap: 16px; align-items: center; margin-bottom: 8px;">
                    ${generateSizeSelector(product)}
                    ${generateColorDropdown(product)}
                </div>
                <a class="size-guide-link" style="display:block;margin-bottom:12px;" onclick="event.stopPropagation(); openSizeGuide()">Größentabelle</a>
                <button class="add-to-cart-btn" 
                        onclick="event.stopPropagation(); addToCartFromProduct('${product.id}')">
                    In den Warenkorb
                </button>
            </div>
        </div>
    `;
}

/**
 * Add product to cart using current selections
 * @param {string} productId - Product ID
 */
function addToCartFromProduct(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const selection = getProductSelection(productId);
    
    // Get current size from dropdown
    const sizeSelect = document.querySelector(`#${productId}-size-select`);
    const size = sizeSelect ? sizeSelect.value : selection.size;
    
    addToCart(product.name, product.price, selection.color, size);
}

/**
 * Render all products for a category into a container
 * @param {string} category - 'old-money' or 'streetwear'
 * @param {string} containerId - ID of the container element
 */
function renderProductGrid(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container #${containerId} not found`);
        return;
    }
    
    const products = getProductsByCategory(category);
    container.innerHTML = products.map(renderProductCard).join('');
}

/**
 * Initialize all product grids on the page
 */
function initProductGrids() {
    renderProductGrid('old-money', 'old-money-products');
    renderProductGrid('streetwear', 'streetwear-products');
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.color-dropdown-wrapper')) {
            document.querySelectorAll('.color-dropdown-list').forEach(list => {
                list.style.display = 'none';
            });
            document.querySelectorAll('.color-dropdown-btn').forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
            });
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page with product grids
    if (document.getElementById('old-money-products') || document.getElementById('streetwear-products')) {
        initProductGrids();
    }
});
