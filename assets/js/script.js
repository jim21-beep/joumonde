// Shopping Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCurrency = localStorage.getItem('currency') || 'CHF';
let currentLanguage = localStorage.getItem('language') || 'de';

// Currency conversion rates (base: CHF)
const currencyRates = {
    'CHF': 1,
    'EUR': 0.95,
    'USD': 1.10
};

// Currency symbols
const currencySymbols = {
    'CHF': 'CHF',
    'EUR': '€',
    'USD': '$'
};

// Translations
const translations = {
    de: {
        // Navigation
        home: 'Home',
        oldMoney: 'Old Money',
        streetwear: 'Streetwear',
        about: 'Über Uns',
        contact: 'Kontakt',
        
        // Hero
        heroTitle: 'Entdecke Deinen Style',
        heroSubtitle: 'Premium Fashion - Von klassischem Old Money bis modernem Streetwear',
        shopNow: 'Jetzt Shoppen',
        
        // Sections
        oldMoneyTitle: 'Old Money Collection',
        oldMoneySubtitle: 'Zeitlose Eleganz und klassischer Luxus',
        streetwearTitle: 'Streetwear Collection',
        streetwearSubtitle: 'Urban Fashion mit Attitude',
        
        // Products
        classicBlazer: 'Klassischer Blazer',
        blazerDesc: 'Eleganter Woll-Blazer in Navy',
        poloShirt: 'Polo Hemd',
        poloDesc: 'Premium Baumwolle in Weiß',
        chinosPants: 'Chino Hose',
        chinosDesc: 'Slim-Fit in Khaki',
        knitSweater: 'Strickpullover',
        sweaterDesc: 'Kaschmir in Dunkelblau',
        oversizedHoodie: 'Oversized Hoodie',
        hoodieDesc: 'Premium Cotton in Schwarz',
        graphicTee: 'Graphic T-Shirt',
        teeDesc: 'Limited Edition Print',
        cargoPants: 'Cargo Pants',
        cargoDesc: 'Multi-Pocket Design',
        trackPants: 'Trainerhose',
        trackDesc: 'Perfekt für Tracksuit Kombination',
        
        // Product UI
        size: 'Größe:',
        addToCart: 'In den Warenkorb',
        
        // About
        aboutTitle: 'Über Uns',
        aboutText1: 'Willkommen bei Joumonde - Ihrer Destination für exklusive Mode. Wir vereinen die zeitlose Eleganz des Old Money Styles mit der dynamischen Energie moderner Streetwear.',
        aboutText2: 'Unsere Mission ist es, hochwertige Fashion für jeden Geschmack anzubieten - von klassischer Raffinesse bis zu urbaner Coolness.',
        
        // Contact
        contactTitle: 'Kontakt',
        email: 'Email',
        phone: 'Telefon',
        address: 'Adresse',
        addressText: 'Bahnhofstrasse 123<br>8001 Zürich, Schweiz',
        
        // Footer
        shop: 'Shop',
        information: 'Informationen',
        terms: 'AGB',
        privacy: 'Datenschutz',
        footerText: 'Premium Fashion Shop',
        copyright: '© 2025 Joumonde. Alle Rechte vorbehalten.',
        
        // Cart
        cart: 'Warenkorb',
        cartEmpty: 'Ihr Warenkorb ist leer',
        added: 'wurde zum Warenkorb hinzugefügt!',
        removed: 'wurde aus dem Warenkorb entfernt',
        cleared: 'Warenkorb wurde geleert',
        clearCart: 'Warenkorb leeren',
        total: 'Gesamt:',
        checkout: 'Zur Kasse',
        tracksuit: '🎉 Tracksuit Kombi -5%',
        
        // Chat
        chatHelp: '💬 Hilfe?',
        chatSupport: 'Chat Support',
        chatPlaceholder: 'Nachricht eingeben...',
        send: 'Senden',
        chatWelcome: 'Hallo! Wie kann ich Ihnen helfen?',
        
        // Search
        searchTitle: 'Produkte durchsuchen',
        searchPlaceholder: 'Suche nach Produkten...',
        searchHint: 'Geben Sie mindestens 2 Zeichen ein',
        searchNoResults: 'Keine Produkte gefunden',
        
        // Modal
        modalTitle: 'Warenkorb leeren?',
        modalText: 'Möchten Sie wirklich alle Artikel aus dem Warenkorb entfernen?',
        cancel: 'Abbrechen',
        confirm: 'Warenkorb leeren'
    },
    en: {
        // Navigation
        home: 'Home',
        oldMoney: 'Old Money',
        streetwear: 'Streetwear',
        about: 'About Us',
        contact: 'Contact',
        
        // Hero
        heroTitle: 'Discover Your Style',
        heroSubtitle: 'Premium Fashion - From classic Old Money to modern Streetwear',
        shopNow: 'Shop Now',
        
        // Sections
        oldMoneyTitle: 'Old Money Collection',
        oldMoneySubtitle: 'Timeless Elegance and Classic Luxury',
        streetwearTitle: 'Streetwear Collection',
        streetwearSubtitle: 'Urban Fashion with Attitude',
        
        // Products
        classicBlazer: 'Classic Blazer',
        blazerDesc: 'Elegant Wool Blazer in Navy',
        poloShirt: 'Polo Shirt',
        poloDesc: 'Premium Cotton in White',
        chinosPants: 'Chino Pants',
        chinosDesc: 'Slim-Fit in Khaki',
        knitSweater: 'Knit Sweater',
        sweaterDesc: 'Cashmere in Dark Blue',
        oversizedHoodie: 'Oversized Hoodie',
        hoodieDesc: 'Premium Cotton in Black',
        graphicTee: 'Graphic T-Shirt',
        teeDesc: 'Limited Edition Print',
        cargoPants: 'Cargo Pants',
        cargoDesc: 'Multi-Pocket Design',
        trackPants: 'Track Pants',
        trackDesc: 'Perfect for Tracksuit Combo',
        
        // Product UI
        size: 'Size:',
        addToCart: 'Add to Cart',
        
        // About
        aboutTitle: 'About Us',
        aboutText1: 'Welcome to Joumonde - your destination for exclusive fashion. We combine the timeless elegance of Old Money style with the dynamic energy of modern streetwear.',
        aboutText2: 'Our mission is to offer high-quality fashion for every taste - from classic sophistication to urban coolness.',
        
        // Contact
        contactTitle: 'Contact',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        addressText: 'Bahnhofstrasse 123<br>8001 Zurich, Switzerland',
        
        // Footer
        shop: 'Shop',
        information: 'Information',
        terms: 'Terms',
        privacy: 'Privacy',
        footerText: 'Premium Fashion Shop',
        copyright: '© 2025 Joumonde. All rights reserved.',
        
        // Cart
        cart: 'Cart',
        cartEmpty: 'Your cart is empty',
        added: 'added to cart!',
        removed: 'removed from cart',
        cleared: 'Cart cleared',
        clearCart: 'Clear Cart',
        total: 'Total:',
        checkout: 'Checkout',
        tracksuit: '🎉 Tracksuit Combo -5%',
        
        // Chat
        chatHelp: '💬 Help?',
        chatSupport: 'Chat Support',
        chatPlaceholder: 'Type a message...',
        send: 'Send',
        chatWelcome: 'Hello! How can I help you?',
        
        // Search
        searchTitle: 'Search Products',
        searchPlaceholder: 'Search for products...',
        searchHint: 'Enter at least 2 characters',
        searchNoResults: 'No products found',
        
        // Modal
        modalTitle: 'Clear Cart?',
        modalText: 'Do you really want to remove all items from the cart?',
        cancel: 'Cancel',
        confirm: 'Clear Cart'
    },
    fr: {
        // Navigation
        home: 'Accueil',
        oldMoney: 'Old Money',
        streetwear: 'Streetwear',
        about: 'À propos',
        contact: 'Contact',
        
        // Hero
        heroTitle: 'Découvrez Votre Style',
        heroSubtitle: 'Mode Premium - Du classique Old Money au Streetwear moderne',
        shopNow: 'Acheter Maintenant',
        
        // Sections
        oldMoneyTitle: 'Collection Old Money',
        oldMoneySubtitle: 'Élégance Intemporelle et Luxe Classique',
        streetwearTitle: 'Collection Streetwear',
        streetwearSubtitle: 'Mode Urbaine avec Attitude',
        
        // Products
        classicBlazer: 'Blazer Classique',
        blazerDesc: 'Blazer en Laine Élégant en Marine',
        poloShirt: 'Polo',
        poloDesc: 'Coton Premium en Blanc',
        chinosPants: 'Pantalon Chino',
        chinosDesc: 'Coupe Slim en Kaki',
        knitSweater: 'Pull Tricoté',
        sweaterDesc: 'Cachemire en Bleu Foncé',
        oversizedHoodie: 'Sweat à Capuche Oversize',
        hoodieDesc: 'Coton Premium en Noir',
        graphicTee: 'T-Shirt Graphique',
        teeDesc: 'Édition Limitée',
        cargoPants: 'Pantalon Cargo',
        cargoDesc: 'Design Multi-Poches',
        trackPants: 'Pantalon de Survêtement',
        trackDesc: 'Parfait pour Combo Tracksuit',
        
        // Product UI
        size: 'Taille:',
        addToCart: 'Ajouter au Panier',
        
        // About
        aboutTitle: 'À Propos',
        aboutText1: 'Bienvenue chez Joumonde - votre destination pour la mode exclusive. Nous combinons l\'élégance intemporelle du style Old Money avec l\'énergie dynamique du streetwear moderne.',
        aboutText2: 'Notre mission est d\'offrir une mode de haute qualité pour tous les goûts - de la sophistication classique à la coolitude urbaine.',
        
        // Contact
        contactTitle: 'Contact',
        email: 'Email',
        phone: 'Téléphone',
        address: 'Adresse',
        addressText: 'Bahnhofstrasse 123<br>8001 Zurich, Suisse',
        
        // Footer
        shop: 'Boutique',
        information: 'Information',
        terms: 'CGV',
        privacy: 'Confidentialité',
        footerText: 'Boutique de Mode Premium',
        copyright: '© 2025 Joumonde. Tous droits réservés.',
        
        // Cart
        cart: 'Panier',
        cartEmpty: 'Votre panier est vide',
        added: 'ajouté au panier!',
        removed: 'retiré du panier',
        cleared: 'Panier vidé',
        clearCart: 'Vider le Panier',
        total: 'Total:',
        checkout: 'Commander',
        tracksuit: '🎉 Combo Tracksuit -5%',
        
        // Chat
        chatHelp: '💬 Aide?',
        chatSupport: 'Support Chat',
        chatPlaceholder: 'Tapez un message...',
        send: 'Envoyer',
        chatWelcome: 'Bonjour! Comment puis-je vous aider?',
        
        // Search
        searchTitle: 'Rechercher des Produits',
        searchPlaceholder: 'Rechercher des produits...',
        searchHint: 'Entrez au moins 2 caractères',
        searchNoResults: 'Aucun produit trouvé',
        
        // Modal
        modalTitle: 'Vider le Panier?',
        modalText: 'Voulez-vous vraiment supprimer tous les articles du panier?',
        cancel: 'Annuler',
        confirm: 'Vider le Panier'
    }
};

// Format price with currency
function formatPrice(price) {
    const convertedPrice = price * currencyRates[currentCurrency];
    const symbol = currencySymbols[currentCurrency];
    
    if (currentCurrency === 'CHF') {
        return `${symbol} ${convertedPrice.toFixed(2).replace('.', '.')}`;
    }
    return `${symbol}${convertedPrice.toFixed(2)}`;
}

// Change Currency
function changeCurrency(currency) {
    currentCurrency = currency;
    localStorage.setItem('currency', currency);
    updateCart();
    updateAllPrices();
}

// Update all visible prices on page
function updateAllPrices() {
    document.querySelectorAll('.product-price').forEach(priceEl => {
        const basePrice = parseFloat(priceEl.getAttribute('data-price'));
        const originalPrice = priceEl.getAttribute('data-original-price');
        
        if (originalPrice) {
            const convertedOriginal = parseFloat(originalPrice) * currencyRates[currentCurrency];
            const convertedPrice = basePrice * currencyRates[currentCurrency];
            const symbol = currencySymbols[currentCurrency];
            
            if (currentCurrency === 'CHF') {
                priceEl.innerHTML = `<span class="old-price">${symbol} ${convertedOriginal.toFixed(2)}</span> ${symbol} ${convertedPrice.toFixed(2)}`;
            } else {
                priceEl.innerHTML = `<span class="old-price">${symbol}${convertedOriginal.toFixed(2)}</span> ${symbol}${convertedPrice.toFixed(2)}`;
            }
        } else {
            priceEl.textContent = formatPrice(basePrice);
        }
    });
}

// Change Language
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updatePageContent();
    updateCart();
}

// Update all page content based on language
function updatePageContent() {
    // Navigation
    document.querySelectorAll('.nav-links a').forEach((link, i) => {
        const keys = ['home', 'oldMoney', 'streetwear', 'about', 'contact'];
        if (keys[i]) link.textContent = t(keys[i]);
    });
    
    // Hero
    document.querySelector('.hero h2').textContent = t('heroTitle');
    document.querySelector('.hero p').textContent = t('heroSubtitle');
    document.querySelector('.cta-btn').textContent = t('shopNow');
    
    // Old Money Section
    document.querySelector('#old-money .section-title').textContent = t('oldMoneyTitle');
    document.querySelector('#old-money .section-subtitle').textContent = t('oldMoneySubtitle');
    
    // Streetwear Section
    document.querySelector('#streetwear .section-title').textContent = t('streetwearTitle');
    document.querySelector('#streetwear .section-subtitle').textContent = t('streetwearSubtitle');
    
    // Products
    const productTitles = [
        'classicBlazer', 'poloShirt', 'chinosPants', 'knitSweater',
        'oversizedHoodie', 'graphicTee', 'cargoPants', 'trackPants'
    ];
    const productDescs = [
        'blazerDesc', 'poloDesc', 'chinosDesc', 'sweaterDesc',
        'hoodieDesc', 'teeDesc', 'cargoDesc', 'trackDesc'
    ];
    
    document.querySelectorAll('.product-info h3').forEach((title, i) => {
        if (productTitles[i]) title.textContent = t(productTitles[i]);
    });
    
    document.querySelectorAll('.product-description').forEach((desc, i) => {
        if (productDescs[i]) desc.textContent = t(productDescs[i]);
    });
    
    document.querySelectorAll('.size-selector label').forEach(label => {
        label.textContent = t('size');
    });
    
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.childNodes[0].textContent = t('addToCart');
    });
    
    // About
    document.querySelector('#about .section-title').textContent = t('aboutTitle');
    const aboutPs = document.querySelectorAll('#about .about-content p');
    if (aboutPs[0]) aboutPs[0].textContent = t('aboutText1');
    if (aboutPs[1]) aboutPs[1].textContent = t('aboutText2');
    
    // Contact
    document.querySelector('#contact .section-title').textContent = t('contactTitle');
    const contactItems = document.querySelectorAll('.contact-item');
    if (contactItems[0]) {
        contactItems[0].querySelector('h3').textContent = t('email');
    }
    if (contactItems[1]) {
        contactItems[1].querySelector('h3').textContent = t('phone');
    }
    if (contactItems[2]) {
        contactItems[2].querySelector('h3').textContent = t('address');
        contactItems[2].querySelector('p').innerHTML = t('addressText');
    }
    
    // Footer
    const footerSections = document.querySelectorAll('.footer-section');
    if (footerSections[1]) {
        footerSections[1].querySelector('h4').textContent = t('shop');
    }
    if (footerSections[2]) {
        footerSections[2].querySelector('h4').textContent = t('information');
        const links = footerSections[2].querySelectorAll('a');
        if (links[0]) links[0].textContent = t('about');
        if (links[1]) links[1].textContent = t('contact');
        if (links[2]) links[2].textContent = t('terms');
        if (links[3]) links[3].textContent = t('privacy');
    }
    if (footerSections[0]) {
        footerSections[0].querySelector('p').textContent = t('footerText');
    }
    document.querySelector('.footer-bottom p').textContent = t('copyright');
    
    // Cart
    document.querySelector('.cart-header h2').textContent = t('cart');
    document.querySelector('.clear-cart-btn').textContent = t('clearCart');
    document.querySelector('.checkout-btn').textContent = t('checkout');
    
    // Chat
    document.querySelector('.chatbot-header span').textContent = t('chatHelp');
    document.querySelector('.chatbot-content-header span').textContent = t('chatSupport');
    document.querySelector('#chatbot-input').placeholder = t('chatPlaceholder');
    document.querySelector('.chatbot-input-area button').textContent = t('send');
    
    // Update initial chat message
    const firstBotMsg = document.querySelector('.bot-message p');
    if (firstBotMsg && firstBotMsg.textContent.includes('Hallo') || firstBotMsg.textContent.includes('Hello') || firstBotMsg.textContent.includes('Bonjour')) {
        firstBotMsg.textContent = t('chatWelcome');
    }
}

// Get translation
function t(key) {
    return translations[currentLanguage][key] || translations['de'][key];
}

// Toggle Cart Sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.toggle('active');
}

// Add Item to Cart
function addToCart(productName, price) {
    // Check if item already exists in cart
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    updateCart();
    
    // Show cart briefly
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.add('active');
    
    // Show notification
    showNotification(`${productName} ${t('added')}`);
}

// Update Cart Display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountElement = document.querySelector('.cart-count');
    const cartTotalElement = document.getElementById('cart-total');
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    
    // Update cart items display
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart-message">${t('cartEmpty')}</p>`;
        cartTotalElement.textContent = formatPrice(0);
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p class="cart-item-price">${formatPrice(item.price)}</p>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${index})">&times;</button>
        </div>
    `).join('');
    
    // Calculate subtotal
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Check for Tracksuit combo discount (Hoodie + Trainerhose = 5% off)
    const hasHoodie = cart.some(item => item.name === 'Oversized Hoodie');
    const hasTrainerhose = cart.some(item => item.name === 'Trainerhose');
    let discount = 0;
    
    if (hasHoodie && hasTrainerhose) {
        discount = total * 0.05;
        const discountHTML = `
            <div class="cart-discount">
                <span>${t('tracksuit')}</span>
                <span>-${formatPrice(discount)}</span>
            </div>
        `;
        cartItemsContainer.innerHTML += discountHTML;
        total -= discount;
    }
    
    // Update total with label
    const totalLabel = document.querySelector('.cart-total span:first-child');
    if (totalLabel) totalLabel.textContent = t('total');
    cartTotalElement.textContent = formatPrice(total);
}

// Update Item Quantity
function updateQuantity(index, change) {
    cart[index].quantity += change;
    
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    updateCart();
}

// Remove Item from Cart
function removeFromCart(index) {
    const itemName = cart[index].name;
    cart.splice(index, 1);
    updateCart();
    showNotification(`${itemName} ${t('removed')}`);
}

// Clear entire cart
function clearCart() {
    if (cart.length === 0) return;
    
    // Create custom modal
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${t('modalTitle')}</h3>
            <p>${t('modalText')}</p>
            <div class="modal-buttons">
                <button class="modal-btn modal-cancel">${t('cancel')}</button>
                <button class="modal-btn modal-confirm">${t('confirm')}</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Handle buttons
    modal.querySelector('.modal-cancel').onclick = () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('.modal-confirm').onclick = () => {
        cart = [];
        updateCart();
        showNotification(t('cleared'));
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    };
    
    // Close on backdrop click
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    };
}

// Show Notification
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: #27ae60;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Search Functionality
function toggleSearch() {
    const searchModal = document.createElement('div');
    searchModal.className = 'search-modal';
    searchModal.innerHTML = `
        <div class="search-modal-content">
            <button class="search-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            <h2>${t('searchTitle')}</h2>
            <input type="text" class="search-input" placeholder="${t('searchPlaceholder')}" id="search-input">
            <div class="search-results" id="search-results"></div>
        </div>
    `;
    
    document.body.appendChild(searchModal);
    setTimeout(() => searchModal.classList.add('active'), 10);
    document.getElementById('search-input').focus();
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    const products = [
        { name: 'Klassischer Blazer', price: 79.99, category: 'Old Money' },
        { name: 'Polo Hemd', price: 34.99, category: 'Old Money' },
        { name: 'Chino Hose', price: 51.99, category: 'Old Money' },
        { name: 'Strickpullover', price: 89.99, category: 'Old Money' },
        { name: 'Oversized Hoodie', price: 49.99, category: 'Streetwear' },
        { name: 'Graphic T-Shirt', price: 24.99, category: 'Streetwear' },
        { name: 'Cargo Pants', price: 59.99, category: 'Streetwear' },
        { name: 'Trainerhose', price: 44.99, category: 'Streetwear' }
    ];
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query.length < 2) {
            searchResults.innerHTML = `<p class="search-hint">${t('searchHint')}</p>`;
            return;
        }
        
        const results = products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query)
        );
        
        if (results.length === 0) {
            searchResults.innerHTML = `<p class="search-no-results">${t('searchNoResults')}</p>`;
            return;
        }
        
        searchResults.innerHTML = results.map(p => `
            <div class="search-result-item" onclick="scrollToProduct('${p.name}')">
                <div>
                    <h4>${p.name}</h4>
                    <span class="search-category">${p.category}</span>
                </div>
                <span class="search-price">€${p.price.toFixed(2)}</span>
            </div>
        `).join('');
    });
    
    searchModal.onclick = (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
            setTimeout(() => searchModal.remove(), 300);
        }
    };
}

function scrollToProduct(productName) {
    document.querySelector('.search-modal').remove();
    const section = productName.includes('Hoodie') || productName.includes('Shirt') || 
                    productName.includes('Cargo') || productName.includes('Trainer') 
                    ? 'streetwear' : 'old-money';
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
}

// Checkout Functionality
function openCheckout() {
    if (cart.length === 0) {
        showNotification(t('cartEmpty'));
        return;
    }
    
    // Calculate total
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const hasHoodie = cart.some(item => item.name === 'Oversized Hoodie');
    const hasTrainerhose = cart.some(item => item.name === 'Trainerhose');
    let discount = 0;
    
    if (hasHoodie && hasTrainerhose) {
        discount = subtotal * 0.05;
    }
    
    const total = subtotal - discount;
    
    const checkoutModal = document.createElement('div');
    checkoutModal.className = 'checkout-modal';
    checkoutModal.innerHTML = `
        <div class="checkout-content">
            <button class="checkout-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            <h2>${currentLanguage === 'de' ? 'Kasse' : currentLanguage === 'en' ? 'Checkout' : 'Caisse'}</h2>
            
            <div class="checkout-sections">
                <div class="checkout-section">
                    <h3>${currentLanguage === 'de' ? 'Bestellübersicht' : currentLanguage === 'en' ? 'Order Summary' : 'Récapitulatif'}</h3>
                    <div class="checkout-items">
                        ${cart.map(item => `
                            <div class="checkout-item">
                                <span>${item.name} x${item.quantity}</span>
                                <span>${formatPrice(item.price * item.quantity)}</span>
                            </div>
                        `).join('')}
                        ${discount > 0 ? `
                            <div class="checkout-item discount-item">
                                <span>${t('tracksuit')}</span>
                                <span>-${formatPrice(discount)}</span>
                            </div>
                        ` : ''}
                    </div>
                    <div class="checkout-total">
                        <span>${t('total')}</span>
                        <span>${formatPrice(total)}</span>
                    </div>
                </div>
                
                <div class="checkout-section">
                    <h3>${currentLanguage === 'de' ? 'Lieferadresse' : currentLanguage === 'en' ? 'Shipping Address' : 'Adresse de livraison'}</h3>
                    <form class="checkout-form" onsubmit="submitOrder(event)">
                        <div class="form-row">
                            <input type="text" placeholder="${currentLanguage === 'de' ? 'Vorname' : currentLanguage === 'en' ? 'First Name' : 'Prénom'}" required>
                            <input type="text" placeholder="${currentLanguage === 'de' ? 'Nachname' : currentLanguage === 'en' ? 'Last Name' : 'Nom'}" required>
                        </div>
                        <input type="email" placeholder="Email" required>
                        <input type="tel" placeholder="${currentLanguage === 'de' ? 'Telefon' : currentLanguage === 'en' ? 'Phone' : 'Téléphone'}" required>
                        <input type="text" placeholder="${currentLanguage === 'de' ? 'Straße & Hausnummer' : currentLanguage === 'en' ? 'Street & Number' : 'Rue & Numéro'}" required>
                        <div class="form-row">
                            <input type="text" placeholder="${currentLanguage === 'de' ? 'PLZ' : currentLanguage === 'en' ? 'ZIP' : 'NPA'}" required>
                            <input type="text" placeholder="${currentLanguage === 'de' ? 'Stadt' : currentLanguage === 'en' ? 'City' : 'Ville'}" required>
                        </div>
                        <input type="text" placeholder="${currentLanguage === 'de' ? 'Land' : currentLanguage === 'en' ? 'Country' : 'Pays'}" value="Schweiz" required>
                        
                        <h3>${currentLanguage === 'de' ? 'Zahlungsmethode' : currentLanguage === 'en' ? 'Payment Method' : 'Mode de paiement'}</h3>
                        <div class="payment-methods">
                            <label class="payment-option">
                                <input type="radio" name="payment" value="card" checked>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" class="payment-logo">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" class="payment-logo">
                                <span>${currentLanguage === 'de' ? 'Kreditkarte' : currentLanguage === 'en' ? 'Credit Card' : 'Carte de crédit'}</span>
                            </label>
                            <label class="payment-option">
                                <input type="radio" name="payment" value="paypal">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png" alt="PayPal" class="payment-logo">
                                <span>PayPal</span>
                            </label>
                            <label class="payment-option">
                                <input type="radio" name="payment" value="twint">
                                <img src="assets/images/twint-seeklogo.png" alt="TWINT" class="payment-logo">
                                <span>TWINT</span>
                            </label>
                        </div>
                        
                        <button type="submit" class="submit-order-btn">
                            ${currentLanguage === 'de' ? 'Kostenpflichtig bestellen' : currentLanguage === 'en' ? 'Place Order' : 'Commander'} ${formatPrice(total)}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(checkoutModal);
    setTimeout(() => checkoutModal.classList.add('active'), 10);
    
    checkoutModal.onclick = (e) => {
        if (e.target === checkoutModal) {
            checkoutModal.classList.remove('active');
            setTimeout(() => checkoutModal.remove(), 300);
        }
    };
}

function submitOrder(e) {
    e.preventDefault();
    
    const successMsg = currentLanguage === 'de' 
        ? 'Vielen Dank für Ihre Bestellung! Sie erhalten eine Bestätigung per Email.'
        : currentLanguage === 'en'
        ? 'Thank you for your order! You will receive a confirmation email.'
        : 'Merci pour votre commande! Vous recevrez un email de confirmation.';
    
    showNotification(successMsg);
    document.querySelector('.checkout-modal').remove();
    cart = [];
    updateCart();
    toggleCart();
}

// Chatbot Functionality
let chatbotOpen = false;
let chatbotContext = {
    awaitingOrderNumber: false,
    lastQuestion: null,
    userName: null
};

function toggleChatbot() {
    const chatbotContent = document.getElementById('chatbot-content');
    chatbotOpen = !chatbotOpen;
    
    if (chatbotOpen) {
        chatbotContent.classList.add('active');
    } else {
        chatbotContent.classList.remove('active');
    }
}

function resetConversation() {
    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.innerHTML = `
        <div class="bot-message">
            <p>${currentLanguage === 'de' ? 'Hallo! Wie kann ich Ihnen helfen?' : currentLanguage === 'en' ? 'Hello! How can I help you?' : 'Bonjour! Comment puis-je vous aider?'}</p>
        </div>
    `;
    document.getElementById('chatbot-input').value = '';
}

function sendChatMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addChatMessage(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Simulate bot response with typing indicator
    addTypingIndicator();
    setTimeout(() => {
        removeTypingIndicator();
        const botResponse = generateBotResponse(message);
        if (Array.isArray(botResponse)) {
            botResponse.forEach((response, index) => {
                setTimeout(() => addChatMessage(response, 'bot'), index * 400);
            });
        } else {
            addChatMessage(botResponse, 'bot');
        }
    }, 800);
}

function addTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<p>...</p>';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

function addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    messageDiv.innerHTML = `<p>${message}</p>`;
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Normalize common typos and variations
    const normalizedMessage = message
        .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss')
        .replace(/[?!.,]/g, ' ')
        .replace(/\s+/g, ' ');
    
    // Helper function to check if message contains any keywords
    const containsAny = (keywords) => keywords.some(keyword => normalizedMessage.includes(keyword));
    
    // Handle order number context
    if (chatbotContext.awaitingOrderNumber) {
        chatbotContext.awaitingOrderNumber = false;
        const orderNumber = userMessage.match(/\d+/);
        if (orderNumber) {
            return trackOrder(orderNumber[0]);
        } else {
            return 'Entschuldigung, ich konnte keine Bestellnummer erkennen. Bitte geben Sie eine gültige Bestellnummer ein (z.B. 12345).';
        }
    }
    
    // Greetings - expanded
    if (containsAny(['hallo', 'hi', 'hey', 'guten tag', 'moin', 'servus', 'gruss', 'tag', 'morgen', 'abend'])) {
        return 'Hallo! 👋 Willkommen bei Joumonde. Ich bin Ihr virtueller Assistent. Wie kann ich Ihnen heute helfen?\n\nIch kann Ihnen bei folgenden Themen helfen:\n• Bestellstatus verfolgen\n• Versand & Lieferung\n• Rückgabe & Umtausch\n• Größenberatung\n• Zahlungsmethoden\n• Produktinformationen';
    }
    
    // Order tracking - expanded variations
    if (containsAny(['bestellung', 'sendung', 'paket', 'tracking', 'status', 'wo ist', 'lieferstatus', 
                     'verfolg', 'bestell', 'order', 'shipment', 'geliefert', 'angekommen', 'kommt',
                     'erhalten', 'bekommen', 'lieferung'])) {
        
        chatbotContext.awaitingOrderNumber = true;
        chatbotContext.lastQuestion = 'tracking';
        return 'Ich helfe Ihnen gerne, Ihre Bestellung zu verfolgen! 📦\n\nBitte geben Sie Ihre Bestellnummer ein. Sie finden diese in Ihrer Bestätigungs-E-Mail (Format: z.B. JM12345).';
    }
    
    // Delivery issues - expanded
    if (containsAny(['problem', 'nicht angekommen', 'fehlt', 'verspatet', 'verzoger', 'defekt', 
                     'kaputt', 'falsch', 'beschadigt', 'reklamation', 'beschwerde', 'complaint',
                     'issue', 'hilfe', 'help'])) {
        return [
            'Es tut mir leid zu hören, dass es Probleme gibt. 😔 Ich helfe Ihnen gerne weiter!',
            'Um Ihr Problem zu lösen, benötige ich folgende Informationen:\n\n1. Ihre Bestellnummer\n2. Was genau ist das Problem?\n   • Paket nicht angekommen?\n   • Falsche Artikel?\n   • Beschädigte Ware?\n\nFür dringende Fälle erreichen Sie unseren Kundenservice direkt:\n📧 info@joumonde.com\n📞 +41 44 123 45 67 (Mo-Fr 9-18 Uhr)'
        ];
    }
    
    // Shipping & delivery time - expanded
    if (containsAny(['versand', 'lieferung', 'lieferzeit', 'dauer', 'lange dauert', 'shipping', 
                     'delivery', 'kosten', 'gebuhren', 'porto', 'wann', 'wie lange', 'schnell'])) {
        return '📦 Versandinformationen:\n\n• Standardversand: 2-4 Werktage (kostenlos ab CHF 50)\n• Expressversand: 1-2 Werktage (CHF 8.90)\n• Versand innerhalb CH: CHF 4.90\n• Versand EU: ab CHF 9.90\n\nBestellungen bis 14 Uhr werden noch am selben Tag bearbeitet!\n\nMöchten Sie eine bestehende Bestellung verfolgen? Geben Sie einfach Ihre Bestellnummer ein!';
    }
    
    // Returns & exchange - expanded
    if (containsAny(['ruckgabe', 'umtausch', 'zuruckschicken', 'zuruckgeben', 'retoure', 'return',
                     'exchange', 'zuruck', 'retour', 'nicht passen', 'passt nicht', 'gefalt nicht'])) {
        return '↩️ Rückgabe & Umtausch:\n\n✓ 30 Tage Rückgaberecht\n✓ Kostenloser Rückversand innerhalb CH\n✓ Artikel müssen ungetragen mit Etikett sein\n\nSo funktioniert\'s:\n1. Retourenschein ausfüllen (liegt jeder Sendung bei)\n2. Artikel sicher verpacken\n3. Kostenlos bei Post abgeben\n4. Rückerstattung innerhalb 5-7 Werktagen\n\nRückgabelabel erstellen: www.joumonde.com/retoure\n\nBrauchen Sie eine andere Größe? Wir tauschen gerne um!';
    }
    
    // Payment methods - expanded
    if (containsAny(['zahlung', 'bezahlen', 'zahlungsmethode', 'payment', 'kreditkarte', 'paypal',
                     'twint', 'rechnung', 'uberweisung', 'karte', 'bezahl', 'pay'])) {
        return '💳 Zahlungsmethoden:\n\n✓ Kreditkarte (Visa, Mastercard, Amex)\n✓ PayPal\n✓ TWINT (Schweizer Mobile Payment)\n✓ Rechnung (Klarna)\n✓ Apple Pay & Google Pay\n\nAlle Zahlungen sind SSL-verschlüsselt und sicher! 🔒';
    }
    
    // Sizing - expanded
    if (containsAny(['grosse', 'passt', 'grossentabelle', 'grossenberatung', 'sizing', 'size',
                     'mass', 'ausmessen', 'welche grosse', 'fit', 'zu gross', 'zu klein', 'lang', 'kurz'])) {
        return '📏 Größenberatung:\n\nUnsere Größen fallen normal aus. Bei jedem Produkt finden Sie:\n• Detaillierte Größentabelle\n• Maßangaben (Brust, Taille, Hüfte, Länge)\n• Trageempfehlungen\n\nTipp: Bei Unsicherheit zwischen zwei Größen empfehlen wir die größere Variante.\n\nBrauchen Sie Hilfe bei einem bestimmten Artikel? Nennen Sie mir das Produkt!';
    }
    
    // Products - Old Money - expanded
    if (containsAny(['old money', 'blazer', 'elegant', 'klassisch', 'chino', 'polo', 'strickpullover',
                     'business', 'formal', 'schick', 'anzug', 'hemd'])) {
        return '🎩 Old Money Collection:\n\nUnsere Old Money Kollektion steht für zeitlose Eleganz und Qualität:\n\n• Premium Blazer aus italienischer Wolle\n• Polo-Hemden aus ägyptischer Baumwolle\n• Perfekt geschnittene Chinos\n• Kaschmir-Pullover\n\nDer klassische Look, der nie aus der Mode kommt. Investieren Sie in Qualität, die bleibt!\n\nZur Kollektion: Scrollen Sie zu "Old Money Collection"';
    }
    
    // Products - Streetwear - expanded
    if (containsAny(['streetwear', 'hoodie', 'sneaker', 'urban', 'cargo', 'trainerhose', 'jogger',
                     'street', 'oversized', 'graphic', 'print', 'tee', 'shirt', 'sporty', 'casual'])) {
        return '🔥 Streetwear Collection:\n\nUnsere Streetwear kombiniert urbanen Style mit Premium-Qualität:\n\n• Oversized Hoodies aus 100% Baumwolle\n• Exklusive Graphic Tees (Limited Edition)\n• Cargo Pants mit Multi-Pocket Design\n• Premium Sneakers\n\nFür alle, die Statement setzen wollen!\n\nZur Kollektion: Scrollen Sie zu "Streetwear Collection"';
    }
    
    // Price questions - new
    if (containsAny(['preis', 'kosten', 'teuer', 'billig', 'gunstig', 'price', 'kostet', 'viel', 'wert'])) {
        return '💰 Unsere Preise:\n\nOld Money Collection: CHF 79.90 - CHF 89.90\nStreetwear Collection: CHF 24.90 - CHF 79.90\n\n✓ Premium Qualität zu fairen Preisen\n✓ Kostenloser Versand ab CHF 50\n✓ 10% Newsletter-Rabatt für Neukunden\n\nAlle Preise sind bereits in CHF, EUR oder USD verfügbar (siehe Währungsauswahl oben rechts).';
    }
    
    // Contact - expanded
    if (containsAny(['kontakt', 'email', 'telefon', 'erreichen', 'anruf', 'contact', 'mail',
                     'sprechen', 'mitarbeiter', 'kunde', 'support', 'service'])) {
        return '📞 Kontakt:\n\nSie erreichen unser Team:\n\n📧 E-Mail:\n• info@joumonde.com\n• Antwort innerhalb 24h\n\n☎️ Telefon:\n• +41 44 123 45 67\n• Mo-Fr: 9:00 - 18:00 Uhr\n\n📍 Adresse:\n• Musterstrasse 123, 8000 Zürich, Schweiz\n• Termine nach Vereinbarung';
    }
    
    // Stock/availability - expanded
    if (containsAny(['verfugbar', 'lager', 'lieferbar', 'stock', 'ausverkauft', 'available',
                     'vorratig', 'sofort', 'wieder', 'nachschub'])) {
        return 'Die Verfügbarkeit sehen Sie direkt beim jeweiligen Produkt.\n\nBei ausverkauften Artikeln bieten wir:\n✓ E-Mail-Benachrichtigung bei Wiederverfügbarkeit\n✓ Alternative Produktvorschläge\n\nWelcher Artikel interessiert Sie?';
    }
    
    // Discount/promo codes - expanded
    if (containsAny(['rabatt', 'gutschein', 'code', 'prozent', 'angebot', 'sale', 'discount',
                     'aktion', 'spar', 'reduziert', 'nachlass', 'voucher', 'coupon'])) {
        return '🎁 Aktuelle Angebote:\n\n• Newsletter-Anmeldung: 10% Rabatt auf erste Bestellung\n• Kostenloser Versand ab CHF 50\n• Combo-Angebot: Hoodie + Trainerhose = -5%\n\nGutschein-Code im Warenkorb eingeben!\n\nNewsletter abonnieren: www.joumonde.com/newsletter';
    }
    
    // Material/quality questions - new
    if (containsAny(['material', 'qualitat', 'stoff', 'baumwolle', 'cotton', 'wolle', 'leder',
                     'herstellung', 'produziert', 'gemacht', 'fabric', 'quality'])) {
        return '✨ Qualität & Materialien:\n\n• Premium-Materialien aus Europa\n• Old Money: Italienische Wolle, Ägyptische Baumwolle, Kaschmir\n• Streetwear: 100% Baumwolle, nachhaltige Produktion\n• Fair Trade zertifiziert\n• Langlebig & pflegeleicht\n\nWir setzen auf höchste Qualität für maximale Zufriedenheit!';
    }
    
    // Thanks - expanded
    if (containsAny(['danke', 'vielen dank', 'super', 'perfekt', 'toll', 'thanks', 'thank',
                     'gut', 'klasse', 'prima', 'genial', 'top'])) {
        return 'Sehr gerne! 😊 Kann ich Ihnen noch bei etwas anderem helfen?\n\nViel Freude beim Shoppen bei Joumonde!';
    }
    
    // Goodbye - expanded
    if (containsAny(['tschuss', 'auf wiedersehen', 'bye', 'ciao', 'ade', 'adieu', 'bis bald'])) {
        chatbotContext = { awaitingOrderNumber: false, lastQuestion: null, userName: null };
        return 'Auf Wiedersehen! 👋 Danke, dass Sie Joumonde besucht haben. Bei Fragen bin ich jederzeit für Sie da!';
    }
    
    // Default response with helpful suggestions
    return 'Ich bin mir nicht sicher, wie ich Ihnen da helfen kann. 🤔\n\nHäufig gestellte Fragen:\n\n1️⃣ Bestellung verfolgen\n2️⃣ Rücksendung\n3️⃣ Versandkosten & -dauer\n4️⃣ Größenberatung\n5️⃣ Kontakt zum Kundenservice\n6️⃣ Preise & Angebote\n\nGeben Sie einfach ein Stichwort ein oder kontaktieren Sie uns direkt:\n📧 info@joumonde.com\n📞 +41 44 123 45 67';
}

function trackOrder(orderNumber) {
    // Simulate order tracking (in real app, this would call an API)
    const orderStatuses = [
        {
            status: 'Zugestellt',
            info: `✅ Bestellung #JM${orderNumber} wurde zugestellt!\n\n📍 Zustellort: An Empfänger übergeben\n📅 Zugestellt am: ${getRecentDate(1)}\n\nIhr Paket wurde erfolgreich zugestellt. Bei Problemen kontaktieren Sie uns bitte!`
        },
        {
            status: 'Unterwegs',
            info: `📦 Bestellung #JM${orderNumber} ist unterwegs!\n\n🚚 Status: In Zustellung\n📍 Aktuelle Position: Paketzentrum Berlin\n⏰ Voraussichtliche Zustellung: ${getFutureDate(1)}\n\nTracking-Link:\nwww.dhl.de/tracking?id=JM${orderNumber}\n\nIhr Paket ist auf dem Weg zu Ihnen! 🎉`
        },
        {
            status: 'Bearbeitung',
            info: `⏳ Bestellung #JM${orderNumber} wird bearbeitet\n\n📋 Status: In Bearbeitung\n🏭 Standort: Versandzentrum\n📅 Bestelldatum: ${getRecentDate(2)}\n⏰ Voraussichtlicher Versand: Heute\n\nIhre Bestellung wird gerade für den Versand vorbereitet. Sie erhalten eine E-Mail mit der Tracking-Nummer sobald das Paket versendet wurde!`
        }
    ];
    
    // Randomly select a status for demo
    const randomStatus = orderStatuses[Math.floor(Math.random() * orderStatuses.length)];
    return randomStatus.info;
}

function getRecentDate(daysAgo) {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function getFutureDate(daysAhead) {
    const date = new Date();
    date.setDate(date.getDate() + daysAhead);
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function handleChatKeypress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// Close cart when clicking outside
document.addEventListener('click', function(event) {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartBtn = document.querySelector('.cart-btn');
    
    if (cartSidebar.classList.contains('active') && 
        !cartSidebar.contains(event.target) && 
        !cartBtn.contains(event.target)) {
        cartSidebar.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close chatbot when clicking outside
document.addEventListener('click', function(e) {
    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatbotContent = document.getElementById('chatbot-content');
    
    if (chatbotOpen && !chatbotWidget.contains(e.target)) {
        chatbotContent.classList.remove('active');
        chatbotOpen = false;
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set saved language and currency
    document.getElementById('language-selector').value = currentLanguage;
    document.getElementById('currency-selector').value = currentCurrency;
    
    // Apply saved preferences
    updatePageContent();
    updateAllPrices();
    updateCart();
    
    // Fix chatbot scroll behavior
    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatbotMessages = document.getElementById('chatbot-messages');
    
    chatbotWidget.addEventListener('wheel', function(e) {
        if (chatbotOpen) {
            e.preventDefault();
            e.stopPropagation();
            chatbotMessages.scrollTop += e.deltaY;
        }
    }, { passive: false });
    
    console.log('Joumonde Shop loaded successfully!');
});

// Contact Form Submission
function openContactForm() {
    const modal = document.getElementById('contact-modal');
    modal.classList.add('active');
}

function closeContactForm() {
    const modal = document.getElementById('contact-modal');
    modal.classList.remove('active');
}

function submitContactForm(e) {
    e.preventDefault();
    
    const successMsg = currentLanguage === 'de' 
        ? 'Vielen Dank für Ihre Nachricht! Wir melden uns in Kürze bei Ihnen.'
        : currentLanguage === 'en'
        ? 'Thank you for your message! We will get back to you shortly.'
        : 'Merci pour votre message! Nous vous répondrons sous peu.';
    
    showNotification(successMsg);
    e.target.reset();
    closeContactForm();
}

// Close contact modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('contact-modal');
    if (e.target === modal) {
        closeContactForm();
    }
});

// ===== WISHLIST FUNCTIONALITY =====
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function toggleWishlist() {
    const sidebar = document.getElementById('wishlist-sidebar');
    sidebar.classList.toggle('active');
    updateWishlistDisplay();
}

function toggleWishlistItem(productName, price, imageBg, buttonElement) {
    const existingItem = wishlist.find(item => item.name === productName);
    
    if (!existingItem) {
        // Add to wishlist
        wishlist.push({
            name: productName,
            price: price,
            imageBg: imageBg || 'linear-gradient(135deg, #f5f5dc 0%, #d3d3d3 100%)'
        });
        buttonElement.classList.add('active');
        showNotification(`${productName} zur Wunschliste hinzugefügt`);
    } else {
        // Remove from wishlist
        wishlist = wishlist.filter(item => item.name !== productName);
        buttonElement.classList.remove('active');
        showNotification(`${productName} aus Wunschliste entfernt`);
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    updateWishlistDisplay();
}

function removeFromWishlist(productName) {
    wishlist = wishlist.filter(item => item.name !== productName);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistCount();
    updateWishlistDisplay();
    
    // Also remove active class from button if visible
    const buttons = document.querySelectorAll('.product-wishlist-btn');
    buttons.forEach(btn => {
        if (btn.onclick && btn.onclick.toString().includes(productName)) {
            btn.classList.remove('active');
        }
    });
}

function updateWishlistCount() {
    const countElement = document.querySelector('.wishlist-count');
    if (countElement) {
        countElement.textContent = wishlist.length;
        countElement.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
}

function updateWishlistDisplay() {
    const wishlistItems = document.getElementById('wishlist-items');
    
    if (wishlist.length === 0) {
        wishlistItems.innerHTML = `
            <div class="empty-cart">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <p>Deine Wunschliste ist leer</p>
            </div>
        `;
    } else {
        wishlistItems.innerHTML = wishlist.map(item => `
            <div class="cart-item">
                <div class="cart-item-image" style="background: ${item.imageBg};">
                    <span style="font-size: 0.7rem;">Bild</span>
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${formatPrice(item.price)}</p>
                </div>
                <button class="remove-item-btn" onclick="removeFromWishlist('${item.name}')">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `).join('');
    }
}

// ===== ACCOUNT MODAL =====
function toggleAccount() {
    const modal = document.getElementById('account-modal');
    modal.classList.toggle('active');
}

function switchAccountTab(tab) {
    const tabs = document.querySelectorAll('.account-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if (tab === 'login') {
        tabs[0].classList.add('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        tabs[1].classList.add('active');
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

function handleLogin(e) {
    e.preventDefault();
    showNotification('Login erfolgreich! (Demo - Backend erforderlich)');
    toggleAccount();
}

function handleRegister(e) {
    e.preventDefault();
    showNotification('Registrierung erfolgreich! (Demo - Backend erforderlich)');
    switchAccountTab('login');
}

// Close account modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('account-modal');
    if (e.target === modal) {
        toggleAccount();
    }
});

// ===== SIZE GUIDE =====
function openSizeGuide() {
    const modal = document.getElementById('size-guide-modal');
    modal.classList.add('active');
}

function closeSizeGuide() {
    const modal = document.getElementById('size-guide-modal');
    modal.classList.remove('active');
}

// Close size guide when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('size-guide-modal');
    if (e.target === modal) {
        closeSizeGuide();
    }
});

// ===== FAQ ACCORDION =====
function toggleFAQ(button) {
    const faqItem = button.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// ===== NEWSLETTER =====
function submitNewsletter(e) {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    showNotification('Danke für deine Anmeldung! Wir senden dir bald exklusive Angebote.');
    e.target.reset();
}

// ===== COOKIE BANNER =====
function checkCookieConsent() {
    const consent = localStorage.getItem('cookieConsent');
    const banner = document.getElementById('cookie-banner');
    
    if (!consent && banner) {
        // Show banner after 1 second
        setTimeout(() => {
            banner.classList.add('active');
        }, 1000);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookie-banner').classList.remove('active');
    showNotification('Cookie-Einstellungen gespeichert');
}

function rejectCookies() {
    localStorage.setItem('cookieConsent', 'rejected');
    document.getElementById('cookie-banner').classList.remove('active');
    showNotification('Nur notwendige Cookies werden verwendet');
}

// ===== BACK TO TOP BUTTON =====
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide back to top button
window.addEventListener('scroll', function() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
});

// ===== COUNTDOWN TIMER (PREPARED BUT NOT ACTIVE) =====
function startCountdown(endDate, elementId) {
    const countdownElement = document.getElementById(elementId);
    if (!countdownElement) return;
    
    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = endDate - now;
        
        if (distance < 0) {
            clearInterval(timer);
            countdownElement.innerHTML = "ABGELAUFEN";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

// Example: Uncomment to activate countdown
// const saleEndDate = new Date("Dec 31, 2025 23:59:59").getTime();
// startCountdown(saleEndDate, 'countdown-timer');

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    updateWishlistCount();
    checkCookieConsent();
    markWishlistButtons();
});

// Mark wishlist buttons as active if product is in wishlist
function markWishlistButtons() {
    const buttons = document.querySelectorAll('.product-wishlist-btn');
    buttons.forEach(btn => {
        const onclickStr = btn.getAttribute('onclick');
        if (onclickStr) {
            // Extract product name from onclick attribute
            const match = onclickStr.match(/'([^']+)'/);
            if (match) {
                const productName = match[1];
                const isInWishlist = wishlist.some(item => item.name === productName);
                if (isInWishlist) {
                    btn.classList.add('active');
                }
            }
        }
    });
}
