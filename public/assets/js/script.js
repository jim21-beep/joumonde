// Dropdown-Logik für alle Old Money Produkte
function toggleBlazerColorDropdown(e) { if (e) e.stopPropagation();
    const btn = document.getElementById('blazer-color-dropdown-btn');
    const list = document.getElementById('blazer-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}
function toggleChinoColorDropdown(e) { if (e) e.stopPropagation();
    const btn = document.getElementById('chino-color-dropdown-btn');
    const list = document.getElementById('chino-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}
function togglePulloverColorDropdown(e) { if (e) e.stopPropagation();
    const btn = document.getElementById('pullover-color-dropdown-btn');
    const list = document.getElementById('pullover-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}
function togglePoloColorDropdown(e) { if (e) e.stopPropagation();
    const btn = document.getElementById('polo-color-dropdown-btn');
    const list = document.getElementById('polo-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}
function toggleWesteColorDropdown(e) { if (e) e.stopPropagation();
    const btn = document.getElementById('weste-color-dropdown-btn');
    const list = document.getElementById('weste-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}
function toggleQuarterzipColorDropdown(e) { if (e) e.stopPropagation();
    const btn = document.getElementById('quarterzip-color-dropdown-btn');
    const list = document.getElementById('quarterzip-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}

// Gemeinsame Farbauswahl-Logik für alle Dropdowns
function applyColorSelection(key, hex, label, stateKey) {
    const square = document.querySelector(`#${key}-color-dropdown-btn .color-square`);
    const labelEl = document.getElementById(`${key}-color-selected-label`);
    const list = document.getElementById(`${key}-color-dropdown-list`);
    const btn = document.getElementById(`${key}-color-dropdown-btn`);

    if (square && hex) square.style.background = hex;
    if (labelEl) labelEl.textContent = label;
    if (list) list.style.display = 'none';
    if (btn) btn.setAttribute('aria-expanded', 'false');
    if (stateKey) window[stateKey] = label;
}

// Initialwerte für die Farbauswahl
window.selectedBlazerColor = 'Schwarz';
window.selectedPoloColor = 'Weiß';
window.selectedChinoColor = 'Beige';
window.selectedPulloverColor = 'Dunkelblau';
window.selectedWesteColor = 'Creme';
window.selectedQuarterzipColor = 'Creme';
window.selectedHoodieColor = 'Schwarz';
window.selectedTshirtColor = 'Schwarz';
window.selectedCargoColor = 'Schwarz';
window.selectedTrackSuitColor = 'Schwarz';

// Dropdown-Auswahl Old Money
function selectBlazerColorDropdown(color, hex, label, e) { if (e) e.stopPropagation();
    applyColorSelection('blazer', hex, label, 'selectedBlazerColor');
}

function selectPoloColorDropdown(color, hex, label, e) { if (e) e.stopPropagation();
    applyColorSelection('polo', hex, label, 'selectedPoloColor');
}

function selectChinoColorDropdown(color, hex, label, e) { if (e) e.stopPropagation();
    applyColorSelection('chino', hex, label, 'selectedChinoColor');
}

function selectPulloverColorDropdown(color, hex, label, e) { if (e) e.stopPropagation();
    applyColorSelection('pullover', hex, label, 'selectedPulloverColor');
}

function selectWesteColorDropdown(color, hex, label, e) { if (e) e.stopPropagation();
    applyColorSelection('weste', hex, label, 'selectedWesteColor');
}

function selectQuarterzipColorDropdown(color, hex, label, e) { if (e) e.stopPropagation();
    applyColorSelection('quarterzip', hex, label, 'selectedQuarterzipColor');
}

// Schließe alle Dropdowns bei Klick außerhalb
document.addEventListener('click', function(e) {
    const dropdowns = [
        ['blazer-color-dropdown-btn', 'blazer-color-dropdown-list'],
        ['chino-color-dropdown-btn', 'chino-color-dropdown-list'],
        ['pullover-color-dropdown-btn', 'pullover-color-dropdown-list'],
        ['polo-color-dropdown-btn', 'polo-color-dropdown-list'],
        ['weste-color-dropdown-btn', 'weste-color-dropdown-list'],
        ['quarterzip-color-dropdown-btn', 'quarterzip-color-dropdown-list'],
        ['hoodie-color-dropdown-btn', 'hoodie-color-dropdown-list'],
        ['tshirt-color-dropdown-btn', 'tshirt-color-dropdown-list'],
        ['cargo-color-dropdown-btn', 'cargo-color-dropdown-list'],
        ['tracksuit-color-dropdown-btn', 'tracksuit-color-dropdown-list']
    ];
    dropdowns.forEach(([btnId, listId]) => {
        const btn = document.getElementById(btnId);
        const list = document.getElementById(listId);
        if (!btn || !list) return;
        if (!btn.contains(e.target) && !list.contains(e.target)) {
            btn.setAttribute('aria-expanded', 'false');
            list.style.display = 'none';
        }
    });
});
// Farbauswahl Dropdown für Hoodie
function toggleHoodieColorDropdown(e) { if (e) e.stopPropagation();
    const btn = document.getElementById('hoodie-color-dropdown-btn');
    const list = document.getElementById('hoodie-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}

function selectHoodieColorDropdown(color, hex, label, e) { if (e) e.stopPropagation();
    applyColorSelection('hoodie', hex, label, 'selectedHoodieColor');
    // Produktbild-Hintergrund anpassen
    var bgMap = {
        black: 'linear-gradient(135deg, #000000 0%, #434343 100%)',
        white: 'linear-gradient(135deg, #ffffff 0%, #e8e8e8 100%)',
        gray: 'linear-gradient(135deg, #808080 0%, #b0b0b0 100%)',
        navy: 'linear-gradient(135deg, #001f3f 0%, #223355 100%)',
        olive: 'linear-gradient(135deg, #556B2F 0%, #7a9a5b 100%)',
        beige: 'linear-gradient(135deg, #f5f5dc 0%, #e0dbc3 100%)'
    };
    // Setze Hintergrund
    var hoodieImage = document.getElementById('hoodie-image');
    if (hoodieImage && bgMap[color]) hoodieImage.style.background = bgMap[color];
}

// Dropdown schließt bei Klick außerhalb
document.addEventListener('click', function(e) {
    const btn = document.getElementById('hoodie-color-dropdown-btn');
    const list = document.getElementById('hoodie-color-dropdown-list');
    if (!btn || !list) return;
    if (!btn.contains(e.target) && !list.contains(e.target)) {
        btn.setAttribute('aria-expanded', 'false');
        list.style.display = 'none';
    }
});

// Farbauswahl Dropdown für T-Shirt (Streetwear)
function toggleTshirtColorDropdown(e) { if (e) e.stopPropagation();
    const btn = document.getElementById('tshirt-color-dropdown-btn');
    const list = document.getElementById('tshirt-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}

function selectTshirtColorDropdown(color, hex, label, e) { if (e) e.stopPropagation();
    applyColorSelection('tshirt', hex, label, 'selectedTshirtColor');
}

// Farbauswahl Dropdown für Cargo Pants (Streetwear)
function toggleCargoColorDropdown(e) { if (e) e.stopPropagation();
    const btn = document.getElementById('cargo-color-dropdown-btn');
    const list = document.getElementById('cargo-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}

function selectCargoColorDropdown(color, hex, label, e) { if (e) e.stopPropagation();
    applyColorSelection('cargo', hex, label, 'selectedCargoColor');
}

// Farbauswahl Dropdown für Trainerhose (Streetwear)
function toggleTrackSuitColorDropdown(e) { if (e) e.stopPropagation();
    const btn = document.getElementById('tracksuit-color-dropdown-btn');
    const list = document.getElementById('tracksuit-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}

function selectTrackSuitColorDropdown(color, hex, label, e) { if (e) e.stopPropagation();
    applyColorSelection('tracksuit', hex, label, 'selectedTrackSuitColor');
}

// Farbauswahl für Blazer (Old Money)

window.selectedBlazerColor = 'Schwarz';
function selectBlazerColor(color) {
    const colorLabel = document.getElementById('blazer-color-label');
    let colorName = 'Schwarz';
    switch (color) {
        case 'white': colorName = 'Weiß'; break;
        case 'navy': colorName = 'Navy'; break;
        case 'gray': colorName = 'Grau'; break;
        case 'beige': colorName = 'Beige'; break;
        case 'burgundy': colorName = 'Burgundy'; break;
        case 'camel': colorName = 'Camel'; break;
    }
    colorLabel.textContent = `${t('filterColor')}: ${translateColorName(colorName)}`;
    window.selectedBlazerColor = colorName;
}
// Elegante Farbauswahl für Hoodie (Streetwear)
window.selectedHoodieColor = 'Schwarz';
function selectHoodieColor(color, btn) {
    const hoodieImg = document.getElementById('hoodie-img');
    const hoodieImageDiv = document.getElementById('hoodie-image');
    const colorLabel = document.getElementById('hoodie-color-selected-label');
    // Check if elements exist before proceeding
    if (!hoodieImg || !hoodieImageDiv || !colorLabel) {
        console.warn('Hoodie color selection: Missing required HTML elements. Need IDs: hoodie-img, hoodie-image, hoodie-color-selected-label');
        return;
    }
    
    let colorName = 'Schwarz';
    let bg = 'linear-gradient(135deg, #000000 0%, #434343 100%)';
    let img = 'assets/images/Hoodie.jpg';
    switch (color) {
        case 'white':
            colorName = 'Weiß';
            bg = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
            img = 'assets/images/Hoodie.jpg';
            break;
        case 'gray':
            colorName = 'Grau';
            bg = 'linear-gradient(135deg, #808080 0%, #b0b0b0 100%)';
            img = 'assets/images/Hoodie.jpg';
            break;
        case 'navy':
            colorName = 'Navy';
            bg = 'linear-gradient(135deg, #001f3f 0%, #3a3a60 100%)';
            img = 'assets/images/Hoodie.jpg';
            break;
        case 'olive':
            colorName = 'Olive';
            bg = 'linear-gradient(135deg, #556B2F 0%, #8FBC8F 100%)';
            img = 'assets/images/Hoodie.jpg';
            break;
        case 'beige':
            colorName = 'Beige';
            bg = 'linear-gradient(135deg, #f5f5dc 0%, #e9e4c9 100%)';
            img = 'assets/images/Hoodie.jpg';
            break;
    }
    hoodieImageDiv.style.background = bg;
    hoodieImg.src = img;
    colorLabel.textContent = `${t('filterColor')}: ${translateColorName(colorName)}`;
    window.selectedHoodieColor = colorName;

    // Swatch-Highlight: Nur ein Button aktiv
    document.querySelectorAll('.hoodie-swatches .color-swatch-btn').forEach(b => b.classList.remove('selected'));
    if (btn) btn.classList.add('selected');
}

// Initial-Highlight für Schwarz setzen
document.addEventListener('DOMContentLoaded', function() {
    const firstBtn = document.querySelector('.hoodie-swatches .color-swatch-btn[data-color="black"]');
    if (firstBtn) firstBtn.classList.add('selected');
});
// Shopping Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCurrency = localStorage.getItem('currency') || 'CHF';
function getBrowserPreferredLanguage() {
    const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
    const matchingLanguage = browserLanguages.find(language =>
        ['de', 'en', 'fr'].includes(language.split('-')[0].toLowerCase())
    );
    return matchingLanguage ? matchingLanguage.split('-')[0].toLowerCase() : 'de';
}
let currentLanguage = localStorage.getItem('language') || getBrowserPreferredLanguage();

const PRODUCT_SIZE_OPTIONS = {
    'Klassischer Blazer': ['S', 'M', 'L', 'XL'],
    'Polo Hemd': ['S', 'M', 'L', 'XL'],
    'Knit Zip-Polo': ['S', 'M', 'L', 'XL'],
    'Ripped Knit Zip-Polo': ['S', 'M', 'L', 'XL'],
    'Bundfalthose': ['30', '32', '34', '36'],
    'Elegante Weste': ['S', 'M', 'L', 'XL'],
    'Quarter Zipper': ['S', 'M', 'L', 'XL'],
    'Strickpullover': ['S', 'M', 'L', 'XL'],
    'Kaschmirpullover': ['S', 'M', 'L', 'XL'],
    'Oxford Hemd': ['S', 'M', 'L', 'XL'],
    'Wollmantel': ['S', 'M', 'L', 'XL'],
    'Leinenhose': ['30', '32', '34', '36'],
    'Oversized Hoodie': ['S', 'M', 'L', 'XL'],
    'T-Shirt': ['S', 'M', 'L', 'XL'],
    'Cargo Pants': ['30', '32', '34', '36'],
    'Jeans': ['30', '32', '34', '36'],
    'Trainerhose': ['S', 'M', 'L', 'XL'],
    'Ledergürtel': ['One Size']
};

const PRODUCT_COLOR_OPTIONS = {
    'Klassischer Blazer': ['Navy', 'Schwarz', 'Grau', 'Beige', 'Burgundy', 'Camel'],
    'Polo Hemd': ['Weiß', 'Navy', 'Schwarz', 'Grau', 'Camel'],
    'Knit Zip-Polo': ['Beige', 'Weiß', 'Schwarz'],
    'Bundfalthose': ['Beige', 'Camel', 'Navy', 'Grau', 'Olive'],
    'Elegante Weste': ['Creme', 'Navy', 'Grau', 'Schwarz'],
    'Quarter Zipper': ['Creme', 'Navy', 'Grau', 'Schwarz'],
    'Strickpullover': ['Dunkelblau', 'Weiß', 'Grau', 'Beige'],
    'Leinenhose': ['Beige', 'Weiß', 'Hellgrau', 'Navy'],
    'Kaschmirpullover': ['Creme', 'Dunkelblau', 'Grau'],
    'Oxford Hemd': ['Weiß', 'Hellblau'],
    'Wollmantel': ['Camel', 'Navy', 'Grau'],
    'Oversized Hoodie': ['Schwarz', 'Weiß', 'Grau', 'Navy', 'Olive', 'Beige'],
    'T-Shirt': ['Schwarz', 'Weiß', 'Grau', 'Navy', 'Olive', 'Beige'],
    'Cargo Pants': ['Schwarz', 'Weiß', 'Grau', 'Navy', 'Olive', 'Beige'],
    'Jeans': ['Dunkelblau', 'Hellblau', 'Schwarz'],
    'Trainerhose': ['Schwarz', 'Weiß', 'Grau', 'Navy', 'Olive', 'Beige'],
    'Ledergürtel': ['Dunkelbraun']
};

function getAvailableSizesForProduct(productName) {
    return PRODUCT_SIZE_OPTIONS[productName] || ['S', 'M', 'L', 'XL'];
}

function getAvailableColorsForProduct(productName) {
    return PRODUCT_COLOR_OPTIONS[productName] || [];
}

function isNumericSize(size) {
    return /^\d+$/.test(String(size || ''));
}

function getPreferredTopSize() {
    // Backward compatibility: fall back to the old single preference key.
    return localStorage.getItem('defaultTopSize') || localStorage.getItem('defaultSize');
}

function getPreferredPantsSize() {
    return localStorage.getItem('defaultPantsSize');
}

function getPreferredSizeForProduct(productName) {
    const availableSizes = getAvailableSizesForProduct(productName);
    const isPantsSizing = availableSizes.some(isNumericSize);
    const preferred = isPantsSizing ? getPreferredPantsSize() : getPreferredTopSize();

    if (preferred && availableSizes.includes(preferred)) {
        return preferred;
    }

    if (availableSizes.includes('M')) {
        return 'M';
    }

    return availableSizes[0] || 'M';
}

function normalizeCartItemSizes() {
    let hasChanges = false;

    cart.forEach(item => {
        if (!item || !item.name) return;

        const allowedSizes = getAvailableSizesForProduct(item.name);
        if (!item.size || !allowedSizes.includes(item.size)) {
            item.size = getPreferredSizeForProduct(item.name);
            hasChanges = true;
        }
    });

    if (hasChanges) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

function applyPreferredSizeToProductSelectors() {
    document.querySelectorAll('.size-select').forEach(select => {
        const availableValues = Array.from(select.options).map(option => option.value);
        const hasNumericSizes = availableValues.some(isNumericSize);
        const preferred = hasNumericSizes ? getPreferredPantsSize() : getPreferredTopSize();
        if (!preferred) return;

        const hasPreferred = Array.from(select.options).some(option => option.value === preferred);
        if (hasPreferred) {
            select.value = preferred;
        }
    });

    if (typeof window.applyPreferredSizeToProductDetail === 'function') {
        window.applyPreferredSizeToProductDetail();
    }
}

window.setPreferredSizes = function setPreferredSizes(topSize, pantsSize) {
    if (topSize) {
        localStorage.setItem('defaultTopSize', topSize);
        // Keep legacy key for compatibility with existing data flows.
        localStorage.setItem('defaultSize', topSize);
    } else {
        localStorage.removeItem('defaultTopSize');
        localStorage.removeItem('defaultSize');
    }

    if (pantsSize) {
        localStorage.setItem('defaultPantsSize', pantsSize);
    } else {
        localStorage.removeItem('defaultPantsSize');
    }

    applyPreferredSizeToProductSelectors();
    normalizeCartItemSizes();
    updateCart();
};

window.setPreferredSize = function setPreferredSize(size) {
    // Legacy API: treat as top/body size.
    if (size) {
        localStorage.setItem('defaultTopSize', size);
        localStorage.setItem('defaultSize', size);
    } else {
        localStorage.removeItem('defaultTopSize');
        localStorage.removeItem('defaultSize');
    }

    applyPreferredSizeToProductSelectors();
    normalizeCartItemSizes();
    updateCart();
};

// Currency conversion rates (base: CHF)
const currencyRates = {
    'CHF': 1,
    'EUR': 0.95,
    'USD': 1.10
};
const FREE_SHIPPING_THRESHOLDS_CHF = { CH: 100, EU: 150 };
const EU_SHIPPING_COUNTRIES = new Set([
    'austria', 'osterreich', 'belgium', 'belgien', 'belgique',
    'bulgaria', 'bulgarien', 'croatia', 'kroatien', 'croatie',
    'cyprus', 'zypern', 'chypre', 'czechrepublic', 'tschechien', 'republiquetcheque',
    'denmark', 'danemark', 'daenemark', 'estonia', 'estland', 'estonie',
    'finland', 'finnland', 'finlande', 'france', 'frankreich',
    'germany', 'deutschland', 'allemagne', 'greece', 'griechenland', 'grece',
    'hungary', 'ungarn', 'hongrie', 'ireland', 'irland', 'irlande',
    'italy', 'italien', 'italie', 'latvia', 'lettland', 'lettonie',
    'lithuania', 'litauen', 'lituanie', 'luxembourg', 'luxemburg',
    'malta', 'netherlands', 'niederlande', 'paysbas', 'poland', 'polen', 'pologne',
    'portugal', 'romania', 'rumaenien', 'roumanie', 'slovakia', 'slowakei', 'slovaquie',
    'slovenia', 'slowenien', 'slovenie', 'spain', 'spanien', 'espagne',
    'sweden', 'schweden', 'suede'
]);

// Currency symbols
const currencySymbols = {
    'CHF': 'CHF',
    'EUR': '€',
    'USD': '$'
};

// Translations — loaded from locales/*.json
let translations = {};

async function loadLanguage(lang) {
    if (!translations[lang]) {
        try {
            const r = await fetch(`assets/locales/${lang}.json`);
            translations[lang] = await r.json();
        } catch (e) {
            console.warn('Could not load locale:', lang, e);
            translations[lang] = translations['de'] || {};
        }
    }
    currentLanguage = lang;
    return translations[lang];
}

// t() — translate key, fallback to German, fallback to key itself
function t(key) {
    return (translations[currentLanguage] && translations[currentLanguage][key])
        || (translations['de'] && translations['de'][key])
        || key;
}

const productNameTranslationKeys = {
    'Klassischer Blazer': 'classicBlazer',
    'Polo Hemd': 'poloShirt',
    'Knit Zip-Polo': 'rippedKnitPolo',
    'Bundfalthose': 'pleatedTrousers',
    'Elegante Weste': 'elegantVest',
    'Quarter Zipper': 'quarterZipPullover',
    'Strickpullover': 'knitSweater',
    'Kaschmirpullover': 'cashmereSweater',
    'Oxford Hemd': 'oxfordShirt',
    'Wollmantel': 'woolCoat',
    'Leinenhose': 'linenPants',
    'Oversized Hoodie': 'oversizedHoodie',
    'T-Shirt': 'graphicTee',
    'Cargo Pants': 'cargoPants',
    'Jeans': 'jeans',
    'Trainerhose': 'trackPants',
    'Ledergürtel': 'leatherBelt'
};

function translateProductName(name) {
    const key = productNameTranslationKeys[name];
    return key ? t(key) : name;
}

const colorNameTranslationKeys = {
    Schwarz: 'colorBlack',
    Weiß: 'colorWhite',
    Navy: 'colorNavy',
    Grau: 'colorGray',
    Beige: 'colorBeige',
    Burgundy: 'colorBurgundy',
    Camel: 'colorCamel',
    Olive: 'colorOlive'
};

function translateColorName(name) {
    const key = colorNameTranslationKeys[name];
    return key ? t(key) : name;
}

// Format price with currency
function formatPrice(price) {
    // Wenn Preis 0 ist, zeige 0.00
    if (price === 0) {
        if (currentCurrency === 'CHF') {
            return `CHF 0.00`;
        } else if (currentCurrency === 'EUR') {
            return `€ 0.00`;
        } else if (currentCurrency === 'USD') {
            return `$ 0.00`;
        }
    }
    
    const convertedPrice = price * currencyRates[currentCurrency];
    const symbol = currencySymbols[currentCurrency];
    
    // Round to nearest integer and add .99
    const roundedPrice = Math.floor(convertedPrice) + 0.99;
    
    if (currentCurrency === 'CHF') {
        return `${symbol} ${roundedPrice.toFixed(2)}`;
    } else if (currentCurrency === 'EUR') {
        return `€ ${roundedPrice.toFixed(2)}`;
    } else if (currentCurrency === 'USD') {
        return `$ ${roundedPrice.toFixed(2)}`;
    }
    return `${symbol} ${roundedPrice.toFixed(2)}`;
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
async function changeLanguage(lang) {
    await loadLanguage(lang);
    localStorage.setItem('language', lang);
    updatePageContent();
    updateAboutPageContent();
    updateCart();
    if (typeof resetConversation === 'function') {
        resetConversation();
    }
    if (typeof window.refreshAccountLanguageUI === 'function') {
        window.refreshAccountLanguageUI();
    }
}

function renderProductCardRatings() {
    document.querySelectorAll('.product-grid .product-card').forEach(card => {
        const productName = card.dataset.productName
            || card.getAttribute('onclick')?.match(/^viewProductDetail\(['"]([^'"]+)['"]/)?.[1];
        const title = card.querySelector('.product-info h3');
        if (!productName || !title) return;

        card.dataset.productName = productName;

        let rating = card.querySelector('.product-rating');
        if (!rating) {
            rating = document.createElement('div');
            rating.className = 'product-rating';
            rating.dataset.reviewCount = '0';
            rating.dataset.averageRating = '0';

            const stars = document.createElement('span');
            stars.className = 'product-rating-stars';
            stars.textContent = '☆☆☆☆☆';
            stars.setAttribute('aria-hidden', 'true');

            const count = document.createElement('span');
            count.className = 'product-rating-count';
            rating.append(stars, count);
            title.insertAdjacentElement('afterend', rating);
        }

        const count = Number(rating.dataset.reviewCount) || 0;
        const average = Math.min(5, Math.max(0, Number(rating.dataset.averageRating) || 0));
        const filledStars = Math.round(average);
        const countLabel = t(count === 1 ? 'productReviewSingular' : 'productReviewPlural');
        const countElement = rating.querySelector('.product-rating-count');
        const starsElement = rating.querySelector('.product-rating-stars');
        if (starsElement) starsElement.textContent = `${'★'.repeat(filledStars)}${'☆'.repeat(5 - filledStars)}`;
        if (countElement) countElement.textContent = `${count} ${countLabel}`;
        rating.setAttribute('aria-label', `${average.toFixed(1)} von 5 Sternen, ${count} ${countLabel}`);
    });
}

// Update all page content based on language
function updatePageContent() {
    // Navigation
    document.querySelectorAll('.nav-links a').forEach((link, i) => {
        const keys = ['home', 'oldMoney', 'streetwear', 'about', 'contact'];
        if (keys[i]) link.textContent = t(keys[i]);
    });

    const collectionsTrigger = document.querySelector('.nav-dropdown-trigger');
    const collectionsLabel = collectionsTrigger && Array.from(collectionsTrigger.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    if (collectionsLabel) collectionsLabel.textContent = ` ${t('navCollections')} `;
    const collectionKeys = ['collectionAccessories', 'collectionEssentials', 'collectionSeasonal', 'collectionGiftSets'];
    document.querySelectorAll('.nav-dropdown-item').forEach((item, index) => {
        const label = Array.from(item.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
        const badge = item.querySelector('.nav-soon-badge');
        if (label && collectionKeys[index]) label.textContent = `${t(collectionKeys[index])} `;
        if (badge) badge.textContent = t('soon');
    });
    document.querySelector('.search-btn')?.setAttribute('aria-label', t('searchAria'));
    document.querySelector('.wishlist-btn')?.setAttribute('aria-label', t('wishlistAria'));
    document.querySelector('.mobile-menu-btn')?.setAttribute('aria-label', t('mobileMenuAria'));
    
    // Hero
    const heroTitle = document.querySelector('.hero h2');
    const heroSubtitle = document.querySelector('.hero p');
    const ctaBtn = document.querySelector('.cta-btn');
    if (heroTitle) heroTitle.textContent = t('heroTitle');
    if (heroSubtitle) heroSubtitle.textContent = t('heroSubtitle');
    if (ctaBtn) ctaBtn.textContent = t('shopNow');
    
    // Old Money Section
    const oldMoneyTitle = document.querySelector('#old-money .section-title');
    const oldMoneySubtitle = document.querySelector('#old-money .section-subtitle');
    if (oldMoneyTitle) oldMoneyTitle.textContent = t('oldMoneyTitle');
    if (oldMoneySubtitle) oldMoneySubtitle.textContent = t('oldMoneySubtitle');
    
    // Streetwear Section
    const streetwearTitle = document.querySelector('#streetwear .section-title');
    const streetwearSubtitle = document.querySelector('#streetwear .section-subtitle');
    if (streetwearTitle) streetwearTitle.textContent = t('streetwearTitle');
    if (streetwearSubtitle) streetwearSubtitle.textContent = t('streetwearSubtitle');
    const accessoriesTitle = document.querySelector('#accessories .section-title');
    const accessoriesSubtitle = document.querySelector('#accessories .section-subtitle');
    if (accessoriesTitle) accessoriesTitle.textContent = t('collectionAccessories');
    if (accessoriesSubtitle) accessoriesSubtitle.textContent = t('accessoriesSubtitle');
    
    // Products
    const productTitles = [
        'classicBlazer', 'poloShirt', 'rippedKnitPolo', 'pleatedTrousers', 'elegantVest', 'quarterZipPullover', 'knitSweater', 'linenPants',
        'cashmereSweater', 'oxfordShirt', 'woolCoat',
        'hoodieProductName', 'graphicTee', 'cargoPants', 'jeans', 'trackPants', 'leatherBelt'
    ];
    document.querySelectorAll('.product-info h3').forEach((title, i) => {
        if (productTitles[i]) title.textContent = t(productTitles[i]);
    });
    renderProductCardRatings();
    
    document.querySelectorAll('.size-selector label').forEach(label => {
        label.textContent = t('size');
    });
    
    // About
    const aboutTitle = document.querySelector('#about .section-title');
    if (aboutTitle) aboutTitle.textContent = t('aboutTitle');
    const aboutPs = document.querySelectorAll('#about .about-content p');
    if (aboutPs[0]) aboutPs[0].textContent = t('aboutText1');
    if (aboutPs[1]) aboutPs[1].textContent = t('aboutText2');
    
    // Contact
    const contactTitle = document.querySelector('#contact .section-title');
    if (contactTitle) contactTitle.textContent = t('contactTitle');
    const contactItems = document.querySelectorAll('.contact-item');
    if (contactItems[0]) {
        const emailH3 = contactItems[0].querySelector('h3');
        if (emailH3) emailH3.textContent = t('email');
    }
    if (contactItems[1]) {
        const phoneH3 = contactItems[1].querySelector('h3');
        if (phoneH3) phoneH3.textContent = t('phone');
    }
    if (contactItems[2]) {
        const addressH3 = contactItems[2].querySelector('h3');
        const addressP = contactItems[2].querySelector('p');
        if (addressH3) addressH3.textContent = t('address');
        if (addressP) addressP.innerHTML = t('addressText');
    }
    
    // Instagram Section
    const instagramTitle = document.querySelector('.instagram-section .section-title');
    const instagramSubtitle = document.querySelector('.instagram-section .instagram-subtitle');
    const instagramBtn = document.querySelector('.instagram-section .btn-primary');
    if (instagramTitle) instagramTitle.textContent = t('followInstagram');
    if (instagramSubtitle) instagramSubtitle.textContent = t('instagramSubtitle');
    if (instagramBtn) {
        const textNodes = Array.from(instagramBtn.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
        if (textNodes.length > 0) {
            textNodes[textNodes.length - 1].textContent = ' ' + t('followInstagram');
        }
    }
    
    // Testimonials Section
    const testimonialsTitle = document.querySelector('.testimonials-section .section-title');
    if (testimonialsTitle) testimonialsTitle.textContent = t('testimonialsTitle');
    
    // FAQ Section
    const faqTitle = document.querySelector('.faq-section .section-title');
    if (faqTitle) faqTitle.textContent = t('faqTitle');
    
    // Shipping Section
    const shippingTitle = document.querySelector('.shipping-section .section-title');
    if (shippingTitle) shippingTitle.textContent = t('shippingTitle');
    
    // Contact Form Buttons
    const contactCtaBtn = document.querySelector('.contact-cta-btn');
    const submitContactBtn = document.querySelector('.submit-contact-btn');
    if (contactCtaBtn) contactCtaBtn.textContent = t('sendMessage');
    if (submitContactBtn) submitContactBtn.textContent = t('sendMessage');

    const nexaraBtn = document.getElementById('nexara-bubble');
    if (nexaraBtn) nexaraBtn.setAttribute('aria-label', t('askNexara'));
    
    // Footer
    const footerSections = document.querySelectorAll('.footer-section');
    if (footerSections[1]) {
        const shopH4 = footerSections[1].querySelector('h4');
        if (shopH4) shopH4.textContent = t('shop');
        const shopLinks = footerSections[1].querySelectorAll('a');
        if (shopLinks[0]) shopLinks[0].textContent = t('oldMoney');
        if (shopLinks[1]) shopLinks[1].textContent = t('streetwear');
    }
    if (footerSections[2]) {
        const infoH4 = footerSections[2].querySelector('h4');
        if (infoH4) infoH4.textContent = t('information');
        const links = footerSections[2].querySelectorAll('a');
        if (links[0]) links[0].textContent = t('about');
        if (links[1]) links[1].textContent = t('contact');
        if (links[2]) links[2].textContent = t('shippingTitle');
        if (links[3]) links[3].textContent = t('terms');
        if (links[4]) links[4].textContent = t('privacy');
    }
    if (footerSections[0]) {
        const footerP = footerSections[0].querySelector('p');
        if (footerP) footerP.textContent = t('footerText');
    }
    if (footerSections[3]) {
        const newsletterH4 = footerSections[3].querySelector('h4');
        const newsletterP = footerSections[3].querySelector('p');
        const newsletterInput = footerSections[3].querySelector('input');
        const newsletterBtn = footerSections[3].querySelector('button');
        if (newsletterH4) newsletterH4.textContent = t('newsletter');
        if (newsletterP) newsletterP.textContent = t('newsletterText');
        if (newsletterInput) newsletterInput.placeholder = t('newsletterPlaceholder');
        if (newsletterBtn) newsletterBtn.textContent = t('subscribe');
    }
    
    const footerBottomP = document.querySelector('.footer-bottom p');
    if (footerBottomP) footerBottomP.textContent = `© 2025 Joumonde. ${t('allRightsReserved')}.`;
    
    const trustBadges = document.querySelectorAll('.trust-badge');
    if (trustBadges[0]) trustBadges[0].textContent = t('sslSecure');
    if (trustBadges[1]) trustBadges[1].textContent = t('securePayment');
    if (trustBadges[2]) trustBadges[2].textContent = t('fastShipping');
    if (trustBadges[3]) trustBadges[3].textContent = t('dayReturn');
    
    // Cart
    const cartHeader = document.querySelector('.cart-header h2');
    const clearCartBtn = document.querySelector('.clear-cart-btn');
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (cartHeader?.firstChild?.nodeType === Node.TEXT_NODE) {
        cartHeader.firstChild.textContent = `${t('cart')} `;
    }
    if (clearCartBtn) clearCartBtn.textContent = t('clearCart');
    if (checkoutBtn) checkoutBtn.textContent = t('checkout');
    
    // Chat
    const chatHeader = document.querySelector('.chatbot-header span');
    const chatContentHeader = document.querySelector('.chatbot-content-header span');
    const chatInput = document.querySelector('#chatbot-input');
    const chatSendBtn = document.querySelector('.chatbot-input-area button');
    if (chatHeader) chatHeader.textContent = t('chatHelp');
    if (chatContentHeader) chatContentHeader.textContent = t('chatSupport');
    if (chatInput) chatInput.placeholder = t('chatPlaceholder');
    if (chatSendBtn) chatSendBtn.textContent = t('send');
    
    // Update initial chat message
    const firstBotMsg = document.querySelector('.bot-message p');
    if (firstBotMsg && (firstBotMsg.textContent.includes('Hallo') || firstBotMsg.textContent.includes('Hello') || firstBotMsg.textContent.includes('Bonjour'))) {
        firstBotMsg.textContent = t('chatWelcome');
    }

    // Sort dropdowns
    document.querySelectorAll('.sort-select').forEach(select => {
        if (select.options[0]) select.options[0].text = t('sortBy');
        if (select.options[1]) select.options[1].text = t('sortPriceLowHigh');
        if (select.options[2]) select.options[2].text = t('sortPriceHighLow');
        if (select.options[3]) select.options[3].text = t('sortNameAZ');
        if (select.options[4]) select.options[4].text = t('sortNewest');
        if (select.options[5]) select.options[5].text = t('sortPopular');
    });

    // Filter sections (position-based: Price, Size, Color)
    const filterToggleButton = document.querySelector('.filter-toggle-btn');
    if (filterToggleButton) {
        const labelNode = Array.from(filterToggleButton.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
        if (labelNode) labelNode.textContent = ` ${t('filterToggle')}`;
    }
    document.querySelectorAll('#minPrice, #minPriceStreet').forEach(input => {
        input.placeholder = t('priceMinimum');
        input.setAttribute('aria-label', t('minPriceAria'));
    });
    document.querySelectorAll('#maxPrice, #maxPriceStreet').forEach(input => {
        input.placeholder = t('priceMaximum');
        input.setAttribute('aria-label', t('maxPriceAria'));
    });
    const colorFilterKeys = {
        black: 'colorBlack', white: 'colorWhite', navy: 'colorNavy', gray: 'colorGray',
        beige: 'colorBeige', burgundy: 'colorBurgundy', camel: 'colorCamel', olive: 'colorOlive'
    };
    document.querySelectorAll('.color-checkbox input').forEach(input => {
        const key = colorFilterKeys[input.value];
        const label = input.closest('.color-checkbox');
        if (key && label) {
            label.title = t(key);
            input.setAttribute('aria-label', t(key));
        }
    });
    const blazerColorLabel = document.getElementById('blazer-color-label');
    const hoodieColorLabel = document.getElementById('hoodie-color-selected-label');
    if (blazerColorLabel) blazerColorLabel.textContent = `${t('filterColor')}: ${translateColorName(window.selectedBlazerColor || 'Schwarz')}`;
    if (hoodieColorLabel) hoodieColorLabel.textContent = `${t('filterColor')}: ${translateColorName(window.selectedHoodieColor || 'Schwarz')}`;
    document.querySelectorAll('.price-range input[type="range"]').forEach(input => {
        input.setAttribute('aria-label', t('priceLimitAria'));
    });
    document.querySelectorAll('.range-value').forEach(label => {
        if (label.firstChild && label.firstChild.nodeType === Node.TEXT_NODE) {
            label.firstChild.textContent = `${t('upTo')} `;
        }
    });
    document.querySelectorAll('.filter-sidebar').forEach(sidebar => {
        const heading = sidebar.querySelector('.filter-header h3');
        const groups = sidebar.querySelectorAll('.filter-group h4');
        if (heading) heading.textContent = t('filterToggle');
        if (groups[0]) groups[0].textContent = t('filterPrice');
        if (groups[1]) groups[1].textContent = t('filterSize');
        if (groups[2]) groups[2].textContent = t('filterColor');
    });
    document.querySelectorAll('.filter-reset-btn').forEach(btn => {
        btn.textContent = t('resetFilters');
    });

    // Product badges
    document.querySelectorAll('.product-badge.badge-new').forEach(b => {
        b.textContent = t('badgeNew');
    });

    // Similar products section
    const similarTitle = document.querySelector('.similar-title');
    if (similarTitle) similarTitle.textContent = t('similarProducts');

    // Discount code input & button
    const discountInput = document.getElementById('discountCode');
    const applyDiscountBtn = document.querySelector('.apply-discount-btn');
    if (discountInput && !discountInput.disabled) discountInput.placeholder = t('discountCodePlaceholder');
    if (applyDiscountBtn && !applyDiscountBtn.disabled) applyDiscountBtn.textContent = t('applyDiscount');

    const subtotalLabel = document.querySelector('.subtotal-row > span:first-child');
    const discountCodeLabel = document.querySelector('.discount-row > span:first-child');
    const totalLabel = document.querySelector('.total-row > span:first-child');
    if (subtotalLabel) subtotalLabel.textContent = t('subtotal');
    if (discountCodeLabel) {
        const labelStart = discountCodeLabel.firstChild;
        const labelEnd = discountCodeLabel.lastChild;
        if (labelStart?.nodeType === Node.TEXT_NODE) labelStart.textContent = `${t('discountLabel')} (`;
        if (labelEnd?.nodeType === Node.TEXT_NODE) labelEnd.textContent = '):';
    }
    if (totalLabel) totalLabel.textContent = t('total');

    const wishlistTitle = document.querySelector('.wishlist-sidebar .cart-header h2');
    const wishlistEmpty = document.querySelector('.wishlist-sidebar .empty-cart p');
    if (wishlistTitle) wishlistTitle.textContent = t('accountWishlist');
    if (wishlistEmpty) wishlistEmpty.textContent = t('wishlistEmpty');

    const contactModal = document.getElementById('contact-modal');
    if (contactModal) {
        const title = contactModal.querySelector('.contact-modal-content h2');
        if (title) title.textContent = t('contactFormTitle');
        const fields = {
            name: 'nameRequired',
            email: 'emailRequired',
            phone: 'phoneOptional',
            subject: 'subjectRequired',
            message: 'messageRequired'
        };
        Object.entries(fields).forEach(([name, key]) => {
            const field = contactModal.querySelector(`[name="${name}"]`);
            if (field) field.placeholder = t(key);
        });
    }

    const accountModal = document.getElementById('account-modal');
    if (accountModal) {
        const accountText = {
            '#tab-login': 'accountLogin',
            '#tab-register': 'accountRegister',
            '#login-form .auth-greeting': 'accountWelcomeBack',
            '#register-form .auth-greeting': 'accountCreate',
            '#login-form .auth-checkbox-label span': 'accountRemember',
            '#login-form .auth-link': 'accountForgotPassword',
            '#login-form .auth-submit-btn': 'accountLogin',
            '#register-form .auth-submit-btn': 'accountCreate'
        };
        Object.entries(accountText).forEach(([selector, key]) => {
            const element = accountModal.querySelector(selector);
            if (element) element.textContent = t(key);
        });
        accountModal.querySelector('.auth-modal-close')?.setAttribute('aria-label', t('accountModalClose'));

        const accountFields = [
            ['#login-form input[type="email"]', 'accountEmail', 'accountEmail'],
            ['#login-form input[type="password"]', 'accountPassword', null],
            ['#register-form input[name="lastName"]', 'lastName', 'accountLastNameExample'],
            ['#register-form input[name="firstName"]', 'firstName', 'accountFirstNameExample'],
            ['#register-form input[name="email"]', 'accountEmail', 'accountEmail'],
            ['#register-form input[name="password"]', 'accountPassword', 'accountPasswordMin'],
            ['#register-form input[name="passwordConfirm"]', 'accountConfirmPassword', null]
        ];
        accountFields.forEach(([selector, labelKey, placeholderKey]) => {
            const input = accountModal.querySelector(selector);
            const label = input?.closest('.auth-field')?.querySelector('.auth-label');
            if (label) label.textContent = t(labelKey);
            if (input && placeholderKey) input.placeholder = t(placeholderKey);
        });
    }

    const sizeGuide = document.getElementById('size-guide-modal');
    if (sizeGuide) {
        const title = sizeGuide.querySelector('.contact-modal-content h2');
        const headers = sizeGuide.querySelectorAll('.size-table thead th');
        if (title) title.textContent = t('sizeGuideTitle');
        ['sizeGuideSize', 'sizeGuideChest', 'sizeGuideWaist', 'sizeGuideHip'].forEach((key, index) => {
            if (headers[index]) headers[index].textContent = t(key);
        });
        const hint = sizeGuide.querySelector('.size-guide-content > p');
        const hintTextNodes = hint ? Array.from(hint.childNodes).filter(node => node.nodeType === Node.TEXT_NODE) : [];
        if (hintTextNodes[0]) hintTextNodes[0].textContent = `${t('sizeGuideMissingPrefix')} `;
        if (hintTextNodes[1]) hintTextNodes[1].textContent = ` ${t('sizeGuideMissingSuffix')}`;
        const requestLink = hint?.querySelector('a');
        if (requestLink) requestLink.textContent = t('sizeGuideRequestLink');
        sizeGuide.querySelector('.contact-close')?.setAttribute('aria-label', t('accountModalClose'));
    }

    const cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner) {
        const heading = cookieBanner.querySelector('.cookie-text h3');
        const paragraphs = cookieBanner.querySelectorAll('.cookie-text p');
        if (heading) heading.textContent = t('cookieTitle');
        if (paragraphs[0]) paragraphs[0].textContent = t('cookieBannerIntro');
        const details = paragraphs[1];
        if (details) {
            const detailsText = Array.from(details.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
            const policyLink = details.querySelector('a');
            if (detailsText) detailsText.textContent = `${t('cookieBannerDetails')} `;
            if (policyLink) policyLink.textContent = t('cookiePolicy');
        }
        ['cookieAcceptAll', 'cookieSettingsButton', 'cookieOnlyNecessary'].forEach((key, index) => {
            const button = cookieBanner.querySelectorAll('.cookie-buttons button')[index];
            if (button) button.textContent = t(key);
        });
    }

    const cookieSettings = document.getElementById('cookie-settings-modal');
    if (cookieSettings) {
        const title = cookieSettings.querySelector('.cookie-settings-content h2');
        const intro = cookieSettings.querySelector('.cookie-settings-content > p');
        if (title) title.textContent = t('cookieSettingsTitle');
        if (intro) intro.textContent = t('cookieSettingsIntro');
        const categories = cookieSettings.querySelectorAll('.cookie-category');
        const categoryKeys = [
            ['cookieNecessary', 'cookieNecessaryDescription'],
            ['cookieAnalytics', 'cookieAnalyticsDescription'],
            ['cookieMarketing', 'cookieMarketingDescription']
        ];
        categories.forEach((category, index) => {
            const [titleKey, descriptionKey] = categoryKeys[index] || [];
            const categoryTitle = category.querySelector('.category-header h3');
            const requiredBadge = categoryTitle?.querySelector('.required-badge');
            const description = category.querySelector('p');
            if (categoryTitle && categoryTitle.firstChild && titleKey) categoryTitle.firstChild.textContent = `${t(titleKey)} `;
            if (requiredBadge) requiredBadge.textContent = t('cookieRequired');
            if (description && descriptionKey) description.textContent = t(descriptionKey);
        });
        const settingsButtons = cookieSettings.querySelectorAll('.settings-buttons button');
        if (settingsButtons[0]) settingsButtons[0].textContent = t('cookieSaveSelection');
        if (settingsButtons[1]) settingsButtons[1].textContent = t('cookieAcceptAll');
        const policyLinks = cookieSettings.querySelectorAll('a');
        if (policyLinks[0]) policyLinks[0].textContent = t('cookiePolicy');
        if (policyLinks[1]) policyLinks[1].textContent = t('privacyPolicy');
        cookieSettings.querySelector('.close-settings')?.setAttribute('aria-label', t('accountModalClose'));
    }
}

// Toggle Cart Sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (!cartSidebar) return;
    cartSidebar.classList.toggle('active');
}

const PRODUCT_IMAGE_MAP = {
    'Klassischer Blazer': 'assets/images/klassischer%20Blazer.jpg',
    'Ledergürtel': 'assets/images/Ledergürtel.jpg',
    'Kaschmirpullover': 'assets/images/Kaschmirpullover.jpg',
    'Oxford Hemd': 'assets/images/oxfordhemd.jpg',
    'Wollmantel': 'assets/images/Wollmantel.jpg',
    'Polo Hemd': 'assets/images/PoloCasual.jpg',
    'Knit Zip-Polo': 'assets/images/ripped knit zip-polo.jpg',
    'Strickpullover': 'assets/images/Strickpullover.jpg',
    'Bundfalthose': 'assets/images/Bundfalthose.jpg',
    'Elegante Weste': 'assets/images/Weste.jpg',
    'Quarter Zipper': 'assets/images/Quarter Zipper.jpg',
    'Leinenhose': 'assets/images/Leinenhose.jpg',
    'Oversized Hoodie': 'assets/images/Hoodie.jpg',
    'T-Shirt': 'assets/images/T-Shirt.jpg',
    'Trainerhose': 'assets/images/Trainerhose.jpg',
    'Jeans': 'assets/images/Jeans.jpg'
};

// Add Item to Cart
// Navigate to Product Detail Page
function viewProductDetail(productName, price, description, colors, sizes) {
    // Fixed name → image mapping (never use array index)
    const streetwearProducts = new Set(['Oversized Hoodie', 'T-Shirt', 'Cargo Pants', 'Jeans', 'Trainerhose']);
    const accessoryProducts = new Set(['Ledergürtel']);
    // Store product data in sessionStorage
    const productData = {
        name: productName,
        collection: streetwearProducts.has(productName) ? 'streetwear' : accessoryProducts.has(productName) ? 'collectionAccessories' : 'oldMoney',
        price: price,
        description: description,
        colors: colors || [],
        sizes: sizes || ['S', 'M', 'L', 'XL'],
        image: PRODUCT_IMAGE_MAP[productName] || null
    };
    
    sessionStorage.setItem('selectedProduct', JSON.stringify(productData));
    
    // Navigate to product detail page
    window.location.href = 'product-detail.html';
}

// Add to Cart
function addToCart(productName, price, color = null, explicitSize = null, isPreorder = false) {
    const size = explicitSize || getPreferredSizeForProduct(productName);

    // Check if item already exists in cart
    const existingItem = cart.find(item => (
        item.name === productName
        && (item.size || null) === size
        && (item.color || null) === (color || null)
    ));
    
    if (existingItem) {
        existingItem.quantity += 1;
        existingItem.isPreorder = isPreorder;
    } else {
        cart.push({
            name: productName,
            price: price,
            quantity: 1,
            size,
            color: color || null,
            isPreorder
        });
    }
    
    updateCart();
    
    // Track add to cart event
    if (typeof trackAddToCart === 'function') {
        trackAddToCart(productName, price, 1);
    }
    
    // Show cart briefly
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) cartSidebar.classList.add('active');
    
    // Show notification
    showNotification(`${productName} (${t('size')}: ${size}) ${t('added')}`);
}

// Update Cart Display
function updateCartShippingProgress(subtotal) {
    const progress = document.getElementById('cart-shipping-progress');
    if (!progress) return;

    const country = typeof window.getCurrentShippingCountry === 'function'
        ? window.getCurrentShippingCountry()
        : null;
    const normalizedCountry = typeof country === 'string'
        ? country.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '')
        : '';
    const isSwitzerland = ['ch', 'schweiz', 'switzerland', 'suisse', 'svizzera'].includes(normalizedCountry);
    const isEu = EU_SHIPPING_COUNTRIES.has(normalizedCountry);
    const threshold = isSwitzerland
        ? FREE_SHIPPING_THRESHOLDS_CHF.CH
        : isEu
            ? FREE_SHIPPING_THRESHOLDS_CHF.EU
            : null;
    progress.hidden = !country;
    progress.dataset.available = String(threshold !== null);

    if (!country) return;

    if (threshold === null) {
        const message = progress.querySelector('[data-shipping-message]');
        const amount = progress.querySelector('[data-shipping-amount]');
        const suffix = progress.querySelector('[data-shipping-suffix]');
        const track = progress.querySelector('.cart-shipping-track');
        if (message) message.textContent = t('shippingThresholdUnavailable');
        if (amount) amount.textContent = '';
        if (suffix) suffix.textContent = '';
        if (track) track.hidden = true;
        progress.dataset.reached = 'false';
        return;
    }

    const track = progress.querySelector('.cart-shipping-track');
    if (track) track.hidden = false;
    const remaining = Math.max(0, threshold - subtotal);
    const percentage = Math.min(100, (subtotal / threshold) * 100);
    const reached = remaining === 0;
    const message = progress.querySelector('[data-shipping-message]');
    const amount = progress.querySelector('[data-shipping-amount]');
    const suffix = progress.querySelector('[data-shipping-suffix]');
    const fill = progress.querySelector('.cart-shipping-fill');
    const formattedRemaining = `${currencySymbols[currentCurrency]} ${(remaining * currencyRates[currentCurrency]).toFixed(2)}`;

    if (message) message.textContent = t(reached ? 'freeShippingReached' : 'freeShippingPrefix');
    if (amount) amount.textContent = reached ? '' : formattedRemaining;
    if (suffix) suffix.textContent = reached ? '' : t('freeShippingSuffix');
    if (track) track.setAttribute('aria-label', t('freeShippingProgressLabel'));
    if (track) track.setAttribute('aria-valuenow', String(Math.floor(percentage * 10) / 10));
    if (fill) fill.style.width = `${percentage}%`;
    progress.dataset.reached = String(reached);
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountElement = document.querySelector('.cart-count');
    const cartDrawerCount = document.getElementById('cart-drawer-count');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartTotalElement = document.getElementById('cart-total');
    
    normalizeCartItemSizes();

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    const cartSubtotalChf = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const subtotal = cartSubtotalChf * currencyRates[currentCurrency];
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
    if (cartDrawerCount) {
        cartDrawerCount.textContent = `(${totalItems})`;
    }
    if (cartSidebar) {
        cartSidebar.dataset.emptyCart = String(cart.length === 0);
    }
    updateCartShippingProgress(cartSubtotalChf);

    // Some pages only show the cart icon count but not the full cart sidebar.
    if (!cartItemsContainer || !cartTotalElement) {
        return;
    }
    
    // Update cart items display
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <span class="empty-cart-icon" aria-hidden="true">
                    <svg viewBox="0 0 48 48" fill="none"><path d="M12 17h24l2 23H10l2-23Z" stroke="currentColor" stroke-width="1.5"/><path d="M18 18v-3a6 6 0 0 1 12 0v3" stroke="currentColor" stroke-width="1.5"/><path d="M19 26h10" stroke="currentColor" stroke-width="1.5"/></svg>
                </span>
                <span class="empty-cart-eyebrow">${t('cartEmptyPrompt')}</span>
                <p>${t('cartEmpty')}</p>
                <button type="button" class="empty-cart-cta" data-empty-cart-cta>${t('shopNow')} <span aria-hidden="true">→</span></button>
            </div>
        `;
        const emptyCartCta = cartItemsContainer.querySelector('[data-empty-cart-cta]');
        if (emptyCartCta) {
            emptyCartCta.addEventListener('click', () => {
                if (window.location.pathname.includes('shop.html')) {
                    toggleCart();
                } else {
                    window.location.href = 'shop.html';
                }
            });
        }
        
        // Setze Subtotal und Total auf 0.00
        const subtotalElement = document.getElementById('cart-subtotal');
        if (subtotalElement) {
            subtotalElement.textContent = formatPrice(0);
        }
        
        cartTotalElement.textContent = formatPrice(0);
        
        // Verstecke Discount Row
        const discountRow = document.getElementById('discountRow');
        if (discountRow) {
            discountRow.style.display = 'none';
        }
        
        return;
    }
    
    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-image">
                ${PRODUCT_IMAGE_MAP[item.name] ? `<img src="${PRODUCT_IMAGE_MAP[item.name]}" alt="" loading="lazy">` : '<span aria-hidden="true">J</span>'}
            </div>
            <div class="cart-item-content">
                <div class="cart-item-title-row">
                    <h4>${translateProductName(item.name)}</h4>
                    <button type="button" class="remove-item-btn" onclick="removeFromCart(${index})" aria-label="${t('removeCartItem')}: ${translateProductName(item.name)}">&times;</button>
                </div>
                <p class="cart-item-price">${formatPrice(item.price)}</p>
                ${item.isPreorder ? `<p class="cart-item-preorder">${t('preorderTag')}</p>` : ''}
                <div class="cart-item-options">
                    <label>${t('size')}
                        <select class="cart-size-select" onchange="updateCartItemSize(${index}, this.value)">
                            ${getAvailableSizesForProduct(item.name).map(size => `
                                <option value="${size}" ${item.size === size ? 'selected' : ''}>${size}</option>
                            `).join('')}
                        </select>
                    </label>
                    ${(() => {
                        const colors = getAvailableColorsForProduct(item.name);
                        if (colors.length <= 1) {
                            return item.color ? `<span class="cart-item-color">${t('filterColor')}: ${translateColorName(item.color)}</span>` : '';
                        }
                        const options = item.color && !colors.includes(item.color) ? [item.color, ...colors] : colors;
                        return `
                            <label>${t('filterColor')}
                                <select class="cart-color-select" onchange="updateCartItemColor(${index}, this.value)">
                                    ${!item.color ? '<option value="" selected>--</option>' : ''}
                                    ${options.map(color => `
                                        <option value="${color}" ${item.color === color ? 'selected' : ''}>${translateColorName(color)}</option>
                                    `).join('')}
                                </select>
                            </label>
                        `;
                    })()}
                </div>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${index}, -1)" aria-label="Menge verringern">−</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${index}, 1)" aria-label="Menge erhöhen">+</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Calculate subtotal
    let total = subtotal;
    
    // Update subtotal display
    const subtotalElement = document.getElementById('cart-subtotal');
    if (subtotalElement) {
        subtotalElement.textContent = formatPrice(subtotal);
    }

    // Apply discount code if exists
    const appliedDiscount = parseFloat(localStorage.getItem('appliedDiscountAmount')) || 0;
    const discountCode = localStorage.getItem('appliedDiscountCode') || '';
    
    if (appliedDiscount > 0 && discountCode) {
        const discountRow = document.getElementById('discountRow');
        const discountAmount = document.getElementById('cart-discount');
        const discountCodeLabel = document.getElementById('discountCodeApplied');
        
        if (discountRow && discountAmount && discountCodeLabel) {
            discountRow.style.display = 'flex';
            discountAmount.textContent = '- ' + formatPrice(appliedDiscount);
            discountCodeLabel.textContent = discountCode;
            total -= appliedDiscount;
        }
    } else {
        const discountRow = document.getElementById('discountRow');
        if (discountRow) {
            discountRow.style.display = 'none';
        }
    }
    
    // Check for Tracksuit combo discount (Hoodie + Trainerhose = 5% off)
    const hasHoodie = cart.some(item => item.name === 'Oversized Hoodie');
    const hasTrainerhose = cart.some(item => item.name === 'Trainerhose');
    let comboDiscount = 0;
    
    if (hasHoodie && hasTrainerhose) {
        comboDiscount = total * 0.05;
        const discountHTML = `
            <div class="cart-discount">
                <span>${t('tracksuit')}</span>
                <span>-${formatPrice(comboDiscount)}</span>
            </div>
        `;
        cartItemsContainer.innerHTML += discountHTML;
        total -= comboDiscount;
    }
    
    // Update total
    cartTotalElement.textContent = formatPrice(total);
}

function updateCartItemSize(index, newSize) {
    if (!cart[index]) return;

    const item = cart[index];
    const existingIndex = cart.findIndex((candidate, candidateIndex) => (
        candidateIndex !== index
        && candidate.name === item.name
        && candidate.price === item.price
        && (candidate.color || null) === (item.color || null)
        && (candidate.size || null) === newSize
    ));

    if (existingIndex !== -1) {
        cart[existingIndex].quantity += item.quantity;
        cart.splice(index, 1);
    } else {
        cart[index].size = newSize;
    }

    updateCart();
}

function updateCartItemColor(index, newColor) {
    if (!cart[index] || !newColor) return;

    const item = cart[index];
    const existingIndex = cart.findIndex((candidate, candidateIndex) => (
        candidateIndex !== index
        && candidate.name === item.name
        && candidate.price === item.price
        && (candidate.size || null) === (item.size || null)
        && (candidate.color || null) === newColor
    ));

    if (existingIndex !== -1) {
        cart[existingIndex].quantity += item.quantity;
        cart.splice(index, 1);
    } else {
        cart[index].color = newColor;
    }

    updateCart();
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
    const item = cart[index];
    const itemName = item.name;
    
    // Track remove from cart
    if (typeof trackRemoveFromCart === 'function') {
        trackRemoveFromCart(item.name, item.price, item.quantity);
    }
    
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
        localStorage.removeItem('appliedDiscountCode');
        localStorage.removeItem('appliedDiscountAmount');
        
        // Re-enable discount input
        const codeInput = document.getElementById('discountCode');
        const applyBtn = document.querySelector('.apply-discount-btn');
        if (codeInput) {
            codeInput.disabled = false;
            codeInput.value = '';
        }
        if (applyBtn) {
            applyBtn.disabled = false;
            applyBtn.textContent = 'Anwenden';
        }
        
        const discountMsg = document.getElementById('discountMessage');
        if (discountMsg) {
            discountMsg.textContent = '';
        }
        
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
    notification.setAttribute('role', 'status');
    notification.setAttribute('aria-live', 'polite');
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
// Toggle Mobile Menu
const HAMBURGER_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
const CLOSE_SVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (!navLinks || !mobileBtn) return;

    const isOpen = navLinks.classList.toggle('mobile-active');
    mobileBtn.setAttribute('aria-expanded', String(isOpen));
    navLinks.setAttribute('aria-hidden', String(!isOpen));

    if (isOpen) {
        document.body.style.overflow = 'hidden';
        mobileBtn.innerHTML = CLOSE_SVG;
    } else {
        document.body.style.overflow = '';
        mobileBtn.innerHTML = HAMBURGER_SVG;
    }
}

function toggleNavDropdown() {
    const dropdown = document.getElementById('nav-dropdown-kollektionen');
    if (!dropdown) return;
    const isOpen = dropdown.classList.toggle('open');
    dropdown.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', String(isOpen));
}

function bindTouchFriendlyToggle(button, toggle) {
    let lastTouchToggle = -Infinity;

    button.addEventListener('pointerup', event => {
        if (event.pointerType !== 'touch') return;
        lastTouchToggle = performance.now();
        toggle();
    });

    button.addEventListener('click', event => {
        if (performance.now() - lastTouchToggle < 800) {
            event.preventDefault();
            return;
        }
        toggle();
    });
}

function showNavComingSoon(collection) {
    const message = t('collectionSoonMessage').replace('{collection}', t(collection));
    showNotification(message);
    const dropdown = document.getElementById('nav-dropdown-kollektionen');
    if (dropdown) {
        dropdown.classList.remove('open');
        dropdown.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
    }
}

// Close nav dropdown when clicking outside
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('nav-dropdown-kollektionen');
    if (dropdown && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        dropdown.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const navLinks = document.querySelector('.nav-links');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks && navLinks.classList.contains('mobile-active')) {
        if (!navLinks.contains(event.target) && !mobileBtn?.contains(event.target)) {
            toggleMobileMenu();
        }
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks?.classList.contains('mobile-active')) toggleMobileMenu();
        const dropdown = document.getElementById('nav-dropdown-kollektionen');
        if (dropdown?.classList.contains('open')) {
            dropdown.classList.remove('open');
            dropdown.querySelector('.nav-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelector('.nav-links');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileBtn.setAttribute('aria-controls', 'site-primary-navigation');
        mobileBtn.removeAttribute('onclick');
        bindTouchFriendlyToggle(mobileBtn, toggleMobileMenu);
    }
    if (navLinks) navLinks.id = 'site-primary-navigation';
    syncMobileNavigationAccessibility();

    document.querySelectorAll('.nav-dropdown-trigger').forEach(trigger => {
        trigger.setAttribute('aria-expanded', 'false');
        trigger.removeAttribute('onclick');
        bindTouchFriendlyToggle(trigger, toggleNavDropdown);
    });
});

function syncMobileNavigationAccessibility() {
    const navLinks = document.querySelector('.nav-links');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (!navLinks) return;

    if (window.matchMedia('(max-width: 1024px)').matches) {
        navLinks.setAttribute('aria-hidden', String(!navLinks.classList.contains('mobile-active')));
        return;
    }

    if (navLinks.classList.contains('mobile-active')) {
        navLinks.classList.remove('mobile-active');
        document.body.style.overflow = '';
        if (mobileBtn) {
            mobileBtn.setAttribute('aria-expanded', 'false');
            mobileBtn.innerHTML = HAMBURGER_SVG;
        }
    }
    navLinks.removeAttribute('aria-hidden');
}

window.addEventListener('resize', syncMobileNavigationAccessibility);

// Close mobile menu when link is clicked
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navLinksContainer = document.querySelector('.nav-links');
            if (navLinksContainer && navLinksContainer.classList.contains('mobile-active')) {
                toggleMobileMenu();
            }
        });
    });
});

// Toggle Search
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
        // Live products
        { name: 'Klassischer Blazer', price: 79.99, collection: 'Old Money', mainCategory: 'Bekleidung', subCategory: 'Blazer', section: 'old-money', status: 'live' },
        { name: 'Polo Hemd', price: 34.99, collection: 'Old Money', mainCategory: 'Bekleidung', subCategory: 'Shirts & Polos', section: 'old-money', status: 'live' },
        { name: 'Knit Zip-Polo', price: 44.99, collection: 'Old Money', mainCategory: 'Bekleidung', subCategory: 'Shirts & Polos', section: 'old-money', status: 'live' },
        { name: 'Bundfalthose', price: 64.99, collection: 'Old Money', mainCategory: 'Bekleidung', subCategory: 'Hosen', section: 'old-money', status: 'live' },
        { name: 'Elegante Weste', price: 69.99, collection: 'Old Money', mainCategory: 'Bekleidung', subCategory: 'Westen', section: 'old-money', status: 'live' },
        { name: 'Quarter Zipper', price: 79.99, collection: 'Old Money', mainCategory: 'Bekleidung', subCategory: 'Knitwear', section: 'old-money', status: 'live' },
        { name: 'Strickpullover', price: 89.99, collection: 'Old Money', mainCategory: 'Bekleidung', subCategory: 'Knitwear', section: 'old-money', status: 'live' },
        { name: 'Kaschmirpullover', price: 149.90, collection: 'Old Money', mainCategory: 'Bekleidung', subCategory: 'Knitwear', section: 'old-money', status: 'live' },
        { name: 'Oxford Hemd', price: 59.90, collection: 'Old Money', mainCategory: 'Bekleidung', subCategory: 'Shirts & Polos', section: 'old-money', status: 'live' },
        { name: 'Wollmantel', price: 249.90, collection: 'Old Money', mainCategory: 'Bekleidung', subCategory: 'Mäntel', section: 'old-money', status: 'live' },
        { name: 'Leinenhose', price: 54.99, collection: 'Old Money', mainCategory: 'Bekleidung', subCategory: 'Hosen', section: 'old-money', status: 'live' },
        { name: 'Oversized Hoodie', price: 49.99, collection: 'Casual', mainCategory: 'Bekleidung', subCategory: 'Hoodies', section: 'streetwear', status: 'live' },
        { name: 'T-Shirt', price: 24.99, collection: 'Casual', mainCategory: 'Bekleidung', subCategory: 'Tees', section: 'streetwear', status: 'live' },
        { name: 'Cargo Pants', price: 59.99, collection: 'Casual', mainCategory: 'Bekleidung', subCategory: 'Hosen', section: 'streetwear', status: 'live' },
        { name: 'Jeans', price: 59.99, collection: 'Casual', mainCategory: 'Bekleidung', subCategory: 'Hosen', section: 'streetwear', status: 'live' },
        { name: 'Trainerhose', price: 44.99, collection: 'Casual', mainCategory: 'Bekleidung', subCategory: 'Hosen', section: 'streetwear', status: 'live' },
        { name: 'Ledergürtel', price: 39.90, collection: 'Accessories', mainCategory: 'Accessoires', subCategory: 'Gürtel', section: 'accessories', status: 'live' },

        // Planned expansion (categorized)
        { name: 'Custom made AirPods Cases', price: null, collection: 'Accessories', mainCategory: 'Tech-Accessoires', subCategory: 'Cases', section: null, status: 'planned' },
        { name: 'Pins für Krawatten', price: null, collection: 'Accessories', mainCategory: 'Formal-Accessoires', subCategory: 'Krawatten-Accessoires', section: null, status: 'planned' },
        { name: 'Schuhe', price: null, collection: 'Accessories', mainCategory: 'Footwear', subCategory: 'Schuhe', section: null, status: 'planned' },
        { name: 'Herrentasche', price: null, collection: 'Accessories', mainCategory: 'Taschen & Lederwaren', subCategory: 'Taschen', section: null, status: 'planned' },
        { name: 'Einstecktücher', price: null, collection: 'Accessories', mainCategory: 'Formal-Accessoires', subCategory: 'Pocket Squares', section: null, status: 'planned' },
        { name: 'Socken', price: null, collection: 'Essentials', mainCategory: 'Basics', subCategory: 'Socken', section: null, status: 'planned' },
        { name: 'Unterhosen', price: null, collection: 'Essentials', mainCategory: 'Basics', subCategory: 'Unterwäsche', section: null, status: 'planned' },
        { name: 'Krawatten', price: null, collection: 'Accessories', mainCategory: 'Formal-Accessoires', subCategory: 'Krawatten', section: null, status: 'planned' },
        { name: 'Fliegen', price: null, collection: 'Accessories', mainCategory: 'Formal-Accessoires', subCategory: 'Fliegen', section: null, status: 'planned' },
        { name: 'Krawatten & Fliegen Sets', price: null, collection: 'Gift & Sets', mainCategory: 'Sets', subCategory: 'Formal Sets', section: null, status: 'planned' },
        { name: 'Hosenträger', price: null, collection: 'Accessories', mainCategory: 'Formal-Accessoires', subCategory: 'Hosenträger', section: null, status: 'planned' },
        { name: 'Brieftaschen', price: null, collection: 'Accessories', mainCategory: 'Taschen & Lederwaren', subCategory: 'Wallets', section: null, status: 'planned' },
        { name: 'Schal', price: null, collection: 'Seasonal', mainCategory: 'Seasonal Accessoires', subCategory: 'Schals', section: null, status: 'planned' },
        { name: 'Handschuhe', price: null, collection: 'Seasonal', mainCategory: 'Seasonal Accessoires', subCategory: 'Handschuhe', section: null, status: 'planned' },
        { name: 'Badehosen', price: null, collection: 'Seasonal', mainCategory: 'Resortwear', subCategory: 'Swimwear', section: null, status: 'planned' },
        { name: 'Sonnenbrille', price: null, collection: 'Accessories', mainCategory: 'Eyewear', subCategory: 'Sonnenbrillen', section: null, status: 'planned' },
        { name: 'Geschenkboxen', price: null, collection: 'Gift & Sets', mainCategory: 'Packaging', subCategory: 'Gift Boxes', section: null, status: 'planned' },
        { name: 'Nécessaire', price: null, collection: 'Accessories', mainCategory: 'Taschen & Lederwaren', subCategory: 'Travel', section: null, status: 'planned' }
    ];
    
    let searchDebounceTimer = null;
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = setTimeout(() => {
            if (query.length < 2) {
                searchResults.innerHTML = `<p class="search-hint">${t('searchHint')}</p>`;
                return;
            }

            const results = products.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.collection.toLowerCase().includes(query) ||
                p.mainCategory.toLowerCase().includes(query) ||
                p.subCategory.toLowerCase().includes(query)
            );

            if (results.length === 0) {
                searchResults.innerHTML = `<p class="search-no-results">${t('searchNoResults')}</p>`;
                return;
            }

            searchResults.innerHTML = results.map(p => `
                <div class="search-result-item" onclick="handleSearchResultClick('${p.name.replace(/'/g, "\\'")}')">
                    <div>
                        <h4>${p.name}</h4>
                        <span class="search-category">${p.collection} • ${p.mainCategory}${p.status === 'planned' ? ' • Bald verfügbar' : ''}</span>
                    </div>
                    <span class="search-price">${p.price != null ? `CHF ${p.price.toFixed(2)}` : 'Coming Soon'}</span>
                </div>
            `).join('');
        }, 250);
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
    const sectionMap = {
        'Klassischer Blazer': 'old-money',
        'Polo Hemd': 'old-money',
        'Knit Zip-Polo': 'old-money',
        'Bundfalthose': 'old-money',
        'Elegante Weste': 'old-money',
        'Quarter Zipper': 'old-money',
        'Strickpullover': 'old-money',
        'Kaschmirpullover': 'old-money',
        'Oxford Hemd': 'old-money',
        'Wollmantel': 'old-money',
        'Leinenhose': 'old-money',
        'Oversized Hoodie': 'streetwear',
        'T-Shirt': 'streetwear',
        'Cargo Pants': 'streetwear',
        'Jeans': 'streetwear',
        'Trainerhose': 'streetwear',
        'Ledergürtel': 'accessories'
    };
    const section = sectionMap[productName];
    if (section && document.getElementById(section)) {
        document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
    }
}

function handleSearchResultClick(productName) {
    const plannedProducts = new Set([
        'Custom made AirPods Cases',
        'Pins für Krawatten',
        'Schuhe',
        'Herrentasche',
        'Einstecktücher',
        'Socken',
        'Unterhosen',
        'Krawatten',
        'Fliegen',
        'Krawatten & Fliegen Sets',
        'Hosenträger',
        'Brieftaschen',
        'Schal',
        'Handschuhe',
        'Badehosen',
        'Sonnenbrille',
        'Geschenkboxen',
        'Nécessaire'
    ]);

    if (plannedProducts.has(productName)) {
        const modal = document.querySelector('.search-modal');
        if (modal) modal.remove();
        showNotification(`${productName} ist bald verfügbar.`);
        return;
    }

    scrollToProduct(productName);
}

const checkoutAddOnProducts = [
    { key: 'socks', name: 'Socken', price: 12.90 },
    { key: 'underwear', name: 'Unterhosen', price: 19.90 }
];

function getCheckoutAddOnLabel(key) {
    if (currentLanguage === 'en') {
        if (key === 'socks') return 'Socks';
        if (key === 'underwear') return 'Underwear';
    }
    if (currentLanguage === 'fr') {
        if (key === 'socks') return 'Chaussettes';
        if (key === 'underwear') return 'Sous-vetements';
    }
    if (key === 'socks') return 'Socken';
    if (key === 'underwear') return 'Unterhosen';
    return key;
}

function getSelectedCheckoutAddOns(form) {
    const selectedAddOns = [];

    checkoutAddOnProducts.forEach((addOn) => {
        const enabled = document.getElementById(`addon-${addOn.key}`);
        const qtyInput = document.getElementById(`addon-${addOn.key}-qty`);
        const quantity = Math.max(1, parseInt(qtyInput?.value || '1', 10));

        if (enabled && enabled.checked) {
            selectedAddOns.push({
                name: getCheckoutAddOnLabel(addOn.key),
                quantity,
                price: addOn.price,
                size: null,
                color: null,
                isAddOn: true
            });
        }
    });

    return selectedAddOns;
}

function updateCheckoutAddOnState(key) {
    const checkbox = document.getElementById(`addon-${key}`);
    const qtyInput = document.getElementById(`addon-${key}-qty`);
    if (!checkbox || !qtyInput) return;
    qtyInput.disabled = !checkbox.checked;
    if (!checkbox.checked) qtyInput.value = '1';
    updateCheckoutTotalsFromModal();
}

function updateCheckoutTotalsFromModal() {
    const modal = document.querySelector('.checkout-modal');
    const form = modal?.querySelector('.checkout-form');
    const totalEl = document.getElementById('checkoutTotalAmount');
    const submitAmountEl = document.getElementById('checkoutSubmitAmount');
    if (!form || !totalEl || !submitAmountEl) return;

    const baseSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const addOnTotal = getSelectedCheckoutAddOns(form).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const hasHoodie = cart.some(item => item.name === 'Oversized Hoodie');
    const hasTrainerhose = cart.some(item => item.name === 'Trainerhose');
    const discount = (hasHoodie && hasTrainerhose) ? baseSubtotal * 0.05 : 0;
    const total = (baseSubtotal + addOnTotal) - discount;

    totalEl.textContent = formatPrice(total);
    submitAmountEl.textContent = formatPrice(total);
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
    
    // Track begin checkout event
    if (typeof trackBeginCheckout === 'function') {
        trackBeginCheckout(cart, total);
    }
    
    const checkoutModal = document.createElement('div');
    checkoutModal.className = 'checkout-modal';
    const hasPreorders = cart.some(item => item.isPreorder);
    checkoutModal.innerHTML = `
        <div class="checkout-content">
            <button class="checkout-close" onclick="document.querySelector('.checkout-modal').remove(); document.body.classList.remove('modal-open')">&times;</button>
            <h2>${t('checkoutTitle')}</h2>
            
            <div class="checkout-sections">
                <div class="checkout-section">
                    <h3>${t('checkoutOrderSummary')}</h3>
                    <div class="checkout-items">
                        ${cart.map(item => `
                            <div class="checkout-item">
                                <span>
                                    ${translateProductName(item.name)} x${item.quantity}
                                    ${item.isPreorder ? `<small style="display:block; margin-top:2px;">${t('preorderTag')}</small>` : ''}
                                    <small style="display:block; opacity:0.75; margin-top:2px;">
                                        ${t('size')} ${item.size || getPreferredSizeForProduct(item.name)}${item.color ? ` • ${t('filterColor')}: ${translateColorName(item.color)}` : ''}
                                    </small>
                                </span>
                                <span>${formatPrice(item.price * item.quantity)}</span>
                            </div>
                        `).join('')}
                        <div class="checkout-addons-block">
                            <div class="checkout-addons-title">${t('checkoutAddOnsTitle')}</div>
                            ${checkoutAddOnProducts.map(addOn => `
                                <div class="checkout-addon-item">
                                    <label>
                                        <input type="checkbox" id="addon-${addOn.key}" onchange="updateCheckoutAddOnState('${addOn.key}')">
                                        ${getCheckoutAddOnLabel(addOn.key)} (${formatPrice(addOn.price)})
                                    </label>
                                    <input
                                        type="number"
                                        id="addon-${addOn.key}-qty"
                                        min="1"
                                        value="1"
                                        disabled
                                        onchange="updateCheckoutTotalsFromModal()"
                                    >
                                </div>
                            `).join('')}
                        </div>
                        ${discount > 0 ? `
                            <div class="checkout-item discount-item">
                                <span>${t('tracksuit')}</span>
                                <span>-${formatPrice(discount)}</span>
                            </div>
                        ` : ''}
                    </div>
                    ${hasPreorders ? `<p class="preorder-checkout-note">${t('preorderCheckoutNote')}</p>` : ''}
                    <div class="checkout-total">
                        <span>${t('total')}</span>
                        <span id="checkoutTotalAmount">${formatPrice(total)}</span>
                    </div>
                </div>
                
                <div class="checkout-section">
                    <h3>${t('shippingAddress')}</h3>
                    <form class="checkout-form" onsubmit="submitOrder(event)">
                        <div class="form-row">
                            <input type="text" placeholder="${t('firstName')}">
                            <input type="text" placeholder="${t('lastName')}">
                        </div>
                        <input type="email" placeholder="${t('email')}" required>
                        <input type="tel" placeholder="${t('phone')}">
                        <input type="text" placeholder="${t('streetAddress')}">
                        <div class="form-row">
                            <input type="text" placeholder="${t('postalCode')}">
                            <input type="text" placeholder="${t('city')}">
                        </div>
                        <input type="text" placeholder="${t('country')}" value="${t('switzerland')}">
                        
                        <h3>${t('paymentMethod')}</h3>
                        <div class="payment-methods">
                            <label class="payment-option">
                                <input type="radio" name="payment" value="card" checked>
                                <div class="payment-content">
                                    <div class="payment-brand-row payment-brand-logos">
                                        <img src="assets/images/payments/visa.svg" alt="Visa" class="payment-logo">
                                        <img src="assets/images/payments/mastercard.svg" alt="Mastercard" class="payment-logo">
                                    </div>
                                    <span class="payment-label">${t('creditCard')}</span>
                                </div>
                            </label>
                            <label class="payment-option">
                                <input type="radio" name="payment" value="amex">
                                <div class="payment-content">
                                    <div class="payment-brand-row payment-brand-logos">
                                        <img src="assets/images/payments/amex.svg" alt="American Express" class="payment-logo payment-logo-wide">
                                    </div>
                                    <span class="payment-label">American Express</span>
                                </div>
                            </label>
                            <label class="payment-option">
                                <input type="radio" name="payment" value="paypal">
                                <div class="payment-content">
                                    <div class="payment-brand-row payment-brand-logos">
                                        <img src="assets/images/payments/paypal.svg" alt="PayPal" class="payment-logo payment-logo-wide">
                                    </div>
                                    <span class="payment-label">PayPal</span>
                                </div>
                            </label>
                        </div>
                        
                        <button type="submit" class="submit-order-btn">
                            ${hasPreorders ? t('preorderSubmit') : t('placeOrder')} <span id="checkoutSubmitAmount">${formatPrice(total)}</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(checkoutModal);
    document.body.classList.add('modal-open');
    setTimeout(() => checkoutModal.classList.add('active'), 10);
    
    checkoutModal.onclick = (e) => {
        if (e.target === checkoutModal) {
            checkoutModal.classList.remove('active');
            setTimeout(() => { checkoutModal.remove(); document.body.classList.remove('modal-open'); }, 300);
        }
    };
}

async function submitOrder(e) {
    e.preventDefault();
    
    // Read customer data from checkout form
    const form = e.target;
    const submitBtn = form.querySelector('.submit-order-btn');
    const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
    const firstName = inputs[0] ? inputs[0].value.trim() : '';
    const lastName = inputs[1] ? inputs[1].value.trim() : '';
    const email = inputs[2] ? inputs[2].value.trim() : '';
    const phone = inputs[3] ? inputs[3].value.trim() : '';
    const street = inputs[4] ? inputs[4].value.trim() : '';
    const zip = inputs[5] ? inputs[5].value.trim() : '';
    const city = inputs[6] ? inputs[6].value.trim() : '';
    const country = inputs[7] ? inputs[7].value.trim() : '';
    const selectedPayment = form.querySelector('input[name="payment"]:checked');
    const paymentMethod = selectedPayment ? selectedPayment.value : 'card';
    const hasPreorders = cart.some(item => item.isPreorder);
    const submitLabel = hasPreorders ? t('preorderSubmit') : t('placeOrder');

    // Calculate total before clearing cart
    const selectedAddOns = getSelectedCheckoutAddOns(form);
    const addOnTotal = selectedAddOns.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const baseSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let subtotal = baseSubtotal + addOnTotal;
    const hasHoodie = cart.some(item => item.name === 'Oversized Hoodie');
    const hasTrainerhose = cart.some(item => item.name === 'Trainerhose');
    let discount = 0;
    
    if (hasHoodie && hasTrainerhose) {
        discount = baseSubtotal * 0.05;
    }
    
    const total = subtotal - discount;
    const orderId = `${new Date().toISOString().slice(0, 10).replace(/-/g, '')}${String(crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000_000).padStart(9, '0')}`;

    const orderItems = [...cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        isPreorder: Boolean(item.isPreorder),
        size: item.size || getPreferredSizeForProduct(item.name),
        color: item.color || null
    })), ...selectedAddOns];

    const shippingAddress = {
        firstName,
        lastName,
        phone,
        street,
        zip,
        city,
        country,
        fullAddress: [street, `${zip} ${city}`.trim(), country].filter(Boolean).join(', ')
    };

    // Show loading state
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = t('processingOrder');
    }

    // Single checkout path for test orders:
    // Persist order + send confirmation email via edge function (no real charge).
    let orderPersisted = false;
    let emailSent = false;
    const effectivePaymentMethod = paymentMethod || 'card';

    if (email) {
        try {
            const sessionResult = window.supabaseClient?.auth
                ? await window.supabaseClient.auth.getSession()
                : null;
            const accessToken = sessionResult?.data?.session?.access_token;
            const requestHeaders = { 'Content-Type': 'application/json' };
            if (accessToken) requestHeaders.Authorization = `Bearer ${accessToken}`;
            const res = await fetch(`${window.__ENV__?.SUPABASE_URL}/functions/v1/send-newsletter-confirmation`, {
                method: 'POST',
                headers: requestHeaders,
                body: JSON.stringify({
                    type: 'order-confirmation',
                    email,
                    firstName,
                    orderId,
                    items: orderItems,
                    total,
                    currency: currentCurrency || 'CHF',
                    persistOrder: true,
                    paymentMethod: effectivePaymentMethod,
                    shippingAddress,
                    orderDate: new Date().toLocaleString('de-DE')
                })
            });
            if (!res.ok) {
                console.error('Bestellbestätigung fehlgeschlagen – HTTP', res.status, await res.text());
            } else {
                try {
                    const responseData = await res.json();
                    if (responseData?.orderSaved) {
                        orderPersisted = true;
                    }
                } catch {}
                emailSent = true;
            }
        } catch (err) {
            console.warn('Netzwerkfehler beim Senden der Bestellbestätigung:', err);
        }
    }

    if (!emailSent) {
        showNotification(t('orderConfirmationError'), 'error');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = `${submitLabel} ${formatPrice(total)}`;
        }
        return;
    }

    if (!orderPersisted) {
        console.warn('Order could not be persisted via edge function.');
        showNotification(t('orderPersistenceError'), 'error');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = `${submitLabel} ${formatPrice(total)}`;
        }
        return;
    }

    // Track purchase
    if (typeof trackPurchase === 'function') {
        trackPurchase(orderId, orderItems, total, discount);
    }
    
    showNotification(t(hasPreorders ? 'preorderSuccess' : 'orderSuccess'));
    document.querySelector('.checkout-modal').remove();
    document.body.classList.remove('modal-open');
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
let nexaraChatHistory = [];

// Chatbot Learning System
let chatbotAnalytics = JSON.parse(localStorage.getItem('chatbotAnalytics')) || {
    frequentQuestions: {},
    unknownQueries: [],
    totalQueries: 0,
    resolvedQueries: 0
};

// Levenshtein Distance Algorithm for typo correction
function levenshteinDistance(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const matrix = Array(len1 + 1).fill(null).map(() => Array(len2 + 1).fill(null));
    
    for (let i = 0; i <= len1; i++) matrix[i][0] = i;
    for (let j = 0; j <= len2; j++) matrix[0][j] = j;
    
    for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
            const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
            matrix[i][j] = Math.min(
                matrix[i - 1][j] + 1,      // deletion
                matrix[i][j - 1] + 1,      // insertion
                matrix[i - 1][j - 1] + cost // substitution
            );
        }
    }
    
    return matrix[len1][len2];
}

// Find closest matching keyword with typo tolerance
function findClosestMatch(input, keywords, threshold = 3) {
    let bestMatch = null;
    let bestDistance = Infinity;
    
    const normalizedInput = input.toLowerCase().trim();
    
    for (const keyword of keywords) {
        const distance = levenshteinDistance(normalizedInput, keyword.toLowerCase());
        if (distance < bestDistance && distance <= threshold) {
            bestDistance = distance;
            bestMatch = keyword;
        }
    }
    
    return bestMatch;
}

// Common typo corrections for Joumonde-specific terms
const typoCorrections = {
    // Product typos
    'blaiser': 'blazer', 'blaser': 'blazer', 'blasier': 'blazer',
    'hodie': 'hoodie', 'hody': 'hoodie', 'hudie': 'hoodie', 'hoodi': 'hoodie',
    'polo': 'polo', 'pollo': 'polo', 'polu': 'polo',
    'chino': 'chino', 'kino': 'chino', 'schino': 'chino',
    'cargo': 'cargo', 'kargo': 'cargo', 'carco': 'cargo',
    'pullover': 'pullover', 'pulover': 'pullover', 'pullofer': 'pullover',
    
    // Common shop terms
    'versand': 'versand', 'fersand': 'versand', 'versant': 'versand', 'versnd': 'versand',
    'lieferung': 'lieferung', 'liferung': 'lieferung', 'lieferng': 'lieferung',
    'bestellung': 'bestellung', 'bestelung': 'bestellung', 'bestllung': 'bestellung',
    'ruckgabe': 'rückgabe', 'ruckabe': 'rückgabe', 'ruckgbe': 'rückgabe',
    'umtausch': 'umtausch', 'umtaush': 'umtausch', 'umtausch': 'umtausch',
    'zahlung': 'zahlung', 'zalung': 'zahlung', 'zahlunh': 'zahlung',
    'grosse': 'größe', 'grose': 'größe', 'groese': 'größe', 'groeße': 'größe',
    'rabatt': 'rabatt', 'rabat': 'rabatt', 'rabbatt': 'rabatt',
    'gutschein': 'gutschein', 'gutschien': 'gutschein', 'gutshein': 'gutschein',
    
    // Greetings
    'halo': 'hallo', 'hallo': 'hallo', 'haloo': 'hallo',
    'tschuss': 'tschüss', 'tschuess': 'tschüss', 'tschuss': 'tschüss',
    
    // Common words
    'hilfe': 'hilfe', 'hilfe': 'hilfe', 'hilffe': 'hilfe',
    'preis': 'preis', 'prais': 'preis', 'pries': 'preis',
    'kosten': 'kosten', 'kosten': 'kosten', 'kosten': 'kosten'
};

// Auto-correct user input
function autoCorrectInput(message) {
    let corrected = message.toLowerCase().trim();
    const words = corrected.split(/\s+/);
    
    const correctedWords = words.map(word => {
        // Remove punctuation for matching
        const cleanWord = word.replace(/[?!.,]/g, '');
        
        // Check direct typo corrections
        if (typoCorrections[cleanWord]) {
            return typoCorrections[cleanWord];
        }
        
        // Check Levenshtein distance against common keywords
        const commonKeywords = Object.values(typoCorrections);
        const match = findClosestMatch(cleanWord, commonKeywords, 2);
        
        return match || word;
    });
    
    return correctedWords.join(' ');
}

// Track analytics
function trackChatbotQuery(query, wasResolved) {
    chatbotAnalytics.totalQueries++;
    if (wasResolved) chatbotAnalytics.resolvedQueries++;
    
    // Track frequent questions
    const normalizedQuery = query.toLowerCase().trim();
    if (!chatbotAnalytics.frequentQuestions[normalizedQuery]) {
        chatbotAnalytics.frequentQuestions[normalizedQuery] = 0;
    }
    chatbotAnalytics.frequentQuestions[normalizedQuery]++;
    
    // Track unknown queries
    if (!wasResolved) {
        chatbotAnalytics.unknownQueries.push({
            query: query,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 50 unknown queries
        if (chatbotAnalytics.unknownQueries.length > 50) {
            chatbotAnalytics.unknownQueries = chatbotAnalytics.unknownQueries.slice(-50);
        }
    }
    
    localStorage.setItem('chatbotAnalytics', JSON.stringify(chatbotAnalytics));
}

// Get chatbot analytics (for admin dashboard)
function getChatbotAnalytics() {
    const sortedQuestions = Object.entries(chatbotAnalytics.frequentQuestions)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
    
    return {
        totalQueries: chatbotAnalytics.totalQueries,
        resolvedQueries: chatbotAnalytics.resolvedQueries,
        resolutionRate: chatbotAnalytics.totalQueries > 0 
            ? ((chatbotAnalytics.resolvedQueries / chatbotAnalytics.totalQueries) * 100).toFixed(1) + '%'
            : '0%',
        topQuestions: sortedQuestions,
        recentUnknown: chatbotAnalytics.unknownQueries.slice(-10).reverse()
    };
}

// Console log analytics (for debugging/admin view)
if (typeof window !== 'undefined') {
    window.viewChatbotAnalytics = getChatbotAnalytics;
}

async function getSupabaseAccessToken() {
    try {
        if (!window.supabaseClient || !window.supabaseClient.auth) return null;
        const { data } = await window.supabaseClient.auth.getSession();
        return data?.session?.access_token || null;
    } catch {
        return null;
    }
}

async function requestNexaraBackend(message) {
    const apiCandidates = [
        '/api/chat',
        'https://joumonde.onrender.com/api/chat'
    ];
    const accessToken = await getSupabaseAccessToken();

    for (const apiUrl of apiCandidates) {
        try {
            const headers = { 'Content-Type': 'application/json' };
            if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

            const res = await fetch(apiUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    message,
                    lang: currentLanguage,
                    history: nexaraChatHistory.slice(-8)
                })
            });

            if (!res.ok) continue;
            const data = await res.json();
            if (!data || typeof data.reply !== 'string') continue;
            return data;
        } catch {}
    }

    return null;
}

async function sendChatMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addChatMessage(message, 'user');
    nexaraChatHistory.push({ role: 'user', content: message });
    
    // Clear input
    input.value = '';
    
    // Simulate bot response with typing indicator
    addTypingIndicator();
    try {
        const backendResult = await requestNexaraBackend(message);
        removeTypingIndicator();

        if (backendResult?.reply) {
            addChatMessage(backendResult.reply, 'bot');
            nexaraChatHistory.push({ role: 'assistant', content: backendResult.reply });

            if (backendResult.action?.type === 'changeLanguage' && backendResult.action.value) {
                await changeLanguage(backendResult.action.value);
                const sel = document.getElementById('language-selector');
                if (sel) sel.value = backendResult.action.value;
            }
            return;
        }

        const unavailableMsg = t('chatUnavailable');
        addChatMessage(unavailableMsg, 'bot');
        nexaraChatHistory.push({ role: 'assistant', content: unavailableMsg });
    } catch {
        removeTypingIndicator();
        const errorMsg = t('chatConnectionError');
        addChatMessage(errorMsg, 'bot');
        nexaraChatHistory.push({ role: 'assistant', content: errorMsg });
    }
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

function sanitizeBotGermanPhrasing(text) {
    if (typeof text !== 'string') return text;
    return text
        .replace(/\bwie kann ich\s+f[üu]r dich helfen\??/gi, 'Wie kann ich dir helfen?')
        .replace(/\bwie kann ich\s+f[üu]r dich\b/gi, 'Wie kann ich dir')
        .replace(/\b(hallo|hi|hey)\s*,?\s*dir\b/gi, '$1')
        .replace(/\bhallo\s*dir\b/gi, 'Hallo');
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function renderChatMessageHtml(message, sender) {
    const sanitized = sender === 'bot' ? sanitizeBotGermanPhrasing(message) : String(message || '');
    const escaped = escapeHtml(sanitized);
    const urlRegex = /(https?:\/\/[^\s<]+)/g;
    const withLinks = escaped.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
    return withLinks.replace(/\n/g, '<br>');
}

function addChatMessage(message, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    const safeMessageHtml = renderChatMessageHtml(message, sender);
    messageDiv.innerHTML = `<p>${safeMessageHtml}</p>`;
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateBotResponse(userMessage) {
    // Legacy fallback is intentionally disabled to avoid canned responses.
    // Nexara responses must come from backend /api/chat.
    return currentLanguage === 'en'
        ? 'Nexara is currently not reachable. Please try again in a moment.'
        : currentLanguage === 'fr'
        ? 'Nexara est momentanement indisponible. Reessaie dans un instant.'
        : 'Nexara ist gerade nicht erreichbar. Bitte versuche es gleich noch einmal.';

    // Auto-correct typos
    const correctedMessage = autoCorrectInput(userMessage);
    const message = correctedMessage.toLowerCase().trim();
    
    // Normalize common typos and variations
    const normalizedMessage = message
        .replace(/ä/g, 'a').replace(/ö/g, 'o').replace(/ü/g, 'u').replace(/ß/g, 'ss')
        .replace(/[?!.,]/g, ' ')
        .replace(/\s+/g, ' ');
    
    // Helper function to check if message contains any keywords
    const containsAny = (keywords) => keywords.some(keyword => normalizedMessage.includes(keyword));
    
    let response = null;
    let wasResolved = false;
    
    // SCOPE RESTRICTION: Only answer Joumonde shop-related questions
    const joumondeScopeKeywords = [
        'bestellung', 'versand', 'lieferung', 'paket', 'tracking', 'status',
        'ruckgabe', 'umtausch', 'retoure', 'zurück',
        'zahlung', 'bezahlen', 'preis', 'kosten', 'rabatt', 'gutschein',
        'grosse', 'größe', 'passt', 'masse',
        'blazer', 'hoodie', 'polo', 'chino', 'cargo', 'pullover', 'shirt',
        'old money', 'streetwear', 'produkt', 'artikel',
        'kontakt', 'email', 'telefon', 'hilfe', 'support',
        'verfugbar', 'lager', 'stock', 'ausverkauft',
        'material', 'qualitat', 'stoff', 'baumwolle',
        'hallo', 'hi', 'hey', 'guten tag', 'servus',
        'danke', 'tschuss', 'bye', 'joumonde'
    ];
    
    const isJoumondeRelated = containsAny(joumondeScopeKeywords);
    
    // If not Joumonde-related, politely decline
    if (!isJoumondeRelated && normalizedMessage.length > 5) {
        trackChatbotQuery(userMessage, false);
        return '😊 Ich bin der Joumonde Shopping-Assistent und kann Ihnen nur bei Fragen zu unserem Shop helfen.\n\nIch kann Sie unterstützen bei:\n• Bestellungen & Tracking\n• Produktinformationen\n• Versand & Rücksendungen\n• Größenberatung\n• Zahlungsmethoden\n\nWie kann ich Ihnen bei Joumonde weiterhelfen?';
    }
    
    // Handle order number context
    if (chatbotContext.awaitingOrderNumber) {
        chatbotContext.awaitingOrderNumber = false;
        const orderNumber = userMessage.match(/\b(?:\d{8}-[a-f0-9]{8}|jm\d+|\d{5,})\b/i);
        if (orderNumber) {
            wasResolved = true;
            response = trackOrder(orderNumber[0]);
        } else {
            response = 'Entschuldigung, ich konnte keine Bestellnummer erkennen. Bitte geben Sie eine gültige Bestellnummer ein (z.B. 12345).';
        }
        trackChatbotQuery(userMessage, wasResolved);
        return response;
    }
    
    // Greetings - expanded
    if (containsAny(['hallo', 'hi', 'hey', 'guten tag', 'moin', 'servus', 'gruss', 'tag', 'morgen', 'abend'])) {
        wasResolved = true;
        response = 'Hallo, ich bin Nexara, deine Joumonde-Assistentin für Produkte, Größen, Bestellungen, Versand und Retouren.';
    }
    
    // Order tracking - expanded variations
    if (containsAny(['bestellung', 'sendung', 'paket', 'tracking', 'status', 'wo ist', 'lieferstatus', 
                     'verfolg', 'bestell', 'order', 'shipment', 'geliefert', 'angekommen', 'kommt',
                     'erhalten', 'bekommen', 'lieferung'])) {
        wasResolved = true;
        chatbotContext.awaitingOrderNumber = true;
        chatbotContext.lastQuestion = 'tracking';
        response = 'Ich helfe Ihnen gerne, Ihre Bestellung zu verfolgen! 📦\n\nBitte gib deine Bestellnummer ein. Du findest sie in deiner Bestätigungs-E-Mail (z. B. 20261008123456789).';
    }
    // Delivery issues - expanded
    else if (containsAny(['problem', 'nicht angekommen', 'fehlt', 'verspatet', 'verzoger', 'defekt', 
                     'kaputt', 'falsch', 'beschadigt', 'reklamation', 'beschwerde', 'complaint',
                     'issue', 'hilfe', 'help'])) {
        wasResolved = true;
        response = [
            'Es tut mir leid zu hören, dass es Probleme gibt. 😔 Ich helfe Ihnen gerne weiter!',
            'Um Ihr Problem zu lösen, benötige ich folgende Informationen:\n\n1. Ihre Bestellnummer\n2. Was genau ist das Problem?\n   • Paket nicht angekommen?\n   • Falsche Artikel?\n   • Beschädigte Ware?\n\nFür dringende Fälle erreichen Sie unseren Kundenservice direkt:\n📧 info@joumonde.com\n📞 +41 44 123 45 67 (Mo-Fr 9-18 Uhr)'
        ];
    }
    // Shipping & delivery time - expanded
    else if (containsAny(['versand', 'lieferung', 'lieferzeit', 'dauer', 'lange dauert', 'shipping', 
                     'delivery', 'kosten', 'gebuhren', 'porto', 'wann', 'wie lange', 'schnell'])) {
        wasResolved = true;
        response = '📦 Versandinformationen:\n\n• Standardversand: 2-4 Werktage (kostenlos ab CHF 50)\n• Expressversand: 1-2 Werktage (CHF 8.90)\n• Versand innerhalb CH: CHF 4.90\n• Versand EU: ab CHF 9.90\n\nBestellungen bis 14 Uhr werden noch am selben Tag bearbeitet!\n\nMöchten Sie eine bestehende Bestellung verfolgen? Geben Sie einfach Ihre Bestellnummer ein!';
    }
    // Returns & exchange - expanded
    else if (containsAny(['ruckgabe', 'umtausch', 'zuruckschicken', 'zuruckgeben', 'retoure', 'return',
                     'exchange', 'zuruck', 'retour', 'nicht passen', 'passt nicht', 'gefalt nicht'])) {
        wasResolved = true;
        response = '↩️ Rückgabe & Umtausch:\n\n✓ 30 Tage Rückgaberecht\n✓ Kostenloser Rückversand innerhalb CH\n✓ Artikel müssen ungetragen mit Etikett sein\n\nSo funktioniert\'s:\n1. Retourenschein ausfüllen (liegt jeder Sendung bei)\n2. Artikel sicher verpacken\n3. Kostenlos bei Post abgeben\n4. Rückerstattung innerhalb 5-7 Werktagen\n\nRückgabelabel erstellen: www.joumonde.com/retoure\n\nBrauchen Sie eine andere Größe? Wir tauschen gerne um!';
    }
    // Payment methods - expanded
    else if (containsAny(['zahlung', 'bezahlen', 'zahlungsmethode', 'payment', 'kreditkarte', 'paypal',
                     'rechnung', 'uberweisung', 'karte', 'bezahl', 'pay'])) {
        wasResolved = true;
        response = '💳 Zahlungsmethoden:\n\n✓ Kreditkarte (Visa, Mastercard, Amex)\n✓ PayPal\n✓ Rechnung (Klarna)\n✓ Apple Pay & Google Pay\n\nAlle Zahlungen sind SSL-verschlüsselt und sicher! 🔒';
    }
    // Sizing - expanded
    else if (containsAny(['grosse', 'passt', 'grossentabelle', 'grossenberatung', 'sizing', 'size',
                     'mass', 'ausmessen', 'welche grosse', 'fit', 'zu gross', 'zu klein', 'lang', 'kurz'])) {
        wasResolved = true;
        response = '📏 Größenberatung:\n\nUnsere Größen fallen normal aus. Bei jedem Produkt finden Sie:\n• Detaillierte Größentabelle\n• Maßangaben (Brust, Taille, Hüfte, Länge)\n• Trageempfehlungen\n\nTipp: Bei Unsicherheit zwischen zwei Größen empfehlen wir die größere Variante.\n\nBrauchen Sie Hilfe bei einem bestimmten Artikel? Nennen Sie mir das Produkt!';
    }
    // Products - Old Money - expanded
    else if (containsAny(['old money', 'blazer', 'elegant', 'klassisch', 'chino', 'polo', 'strickpullover',
                     'business', 'formal', 'schick', 'anzug', 'hemd'])) {
        wasResolved = true;
        response = '🎩 Old Money Collection:\n\nUnsere Old Money Kollektion steht für zeitlose Eleganz und Qualität:\n\n• Premium Blazer aus italienischer Wolle\n• Polo-Hemden aus ägyptischer Baumwolle\n• Perfekt geschnittene Chinos\n• Kaschmir-Pullover\n\nDer klassische Look, der nie aus der Mode kommt. Investieren Sie in Qualität, die bleibt!\n\nZur Kollektion: Scrollen Sie zu "Old Money Collection"';
    }
    // Products - Streetwear - expanded
    else if (containsAny(['streetwear', 'hoodie', 'sneaker', 'urban', 'cargo', 'trainerhose', 'jogger',
                     'street', 'oversized', 'graphic', 'print', 'tee', 'shirt', 'sporty', 'casual'])) {
        wasResolved = true;
        response = 'Casual Collection:\n\nUnsere Casual Styles verbinden Komfort mit Premium-Qualität:\n\n• Oversized Hoodies aus 100% Baumwolle\n• Exklusive Graphic Tees (Limited Edition)\n• Cargo Pants mit Multi-Pocket Design\n• Premium Sneakers\n\nFür alle, die Statement setzen wollen!\n\nZur Kollektion: Scrollen Sie zu "Casual Collection"';
    }
    // Price questions - new
    else if (containsAny(['preis', 'kosten', 'teuer', 'billig', 'gunstig', 'price', 'kostet', 'viel', 'wert'])) {
        wasResolved = true;
        response = '💰 Unsere Preise:\n\nOld Money Collection: CHF 79.90 - CHF 89.90\nCasual Collection: CHF 24.90 - CHF 79.90\n\n✓ Premium Qualität zu fairen Preisen\n✓ Kostenloser Versand ab CHF 50\n✓ 10% Newsletter-Rabatt für Neukunden\n\nAlle Preise sind bereits in CHF, EUR oder USD verfügbar (siehe Währungsauswahl oben rechts).';
    }
    // Contact - expanded
    else if (containsAny(['kontakt', 'email', 'telefon', 'erreichen', 'anruf', 'contact', 'mail',
                     'sprechen', 'mitarbeiter', 'kunde', 'support', 'service'])) {
        wasResolved = true;
        response = '📞 Kontakt:\n\nSie erreichen unser Team:\n\n📧 E-Mail:\n• info@joumonde.com\n• Antwort innerhalb 24h\n\n☎️ Telefon:\n• +41 44 123 45 67\n• Mo-Fr: 9:00 - 18:00 Uhr\n\n📍 Adresse:\n• Musterstrasse 123, 8000 Zürich, Schweiz\n• Termine nach Vereinbarung';
    }
    // Stock/availability - expanded
    else if (containsAny(['verfugbar', 'lager', 'lieferbar', 'stock', 'ausverkauft', 'available',
                     'vorratig', 'sofort', 'wieder', 'nachschub'])) {
        wasResolved = true;
        response = 'Die Verfügbarkeit sehen Sie direkt beim jeweiligen Produkt.\n\nBei ausverkauften Artikeln bieten wir:\n✓ E-Mail-Benachrichtigung bei Wiederverfügbarkeit\n✓ Alternative Produktvorschläge\n\nWelcher Artikel interessiert Sie?';
    }
    // Discount/promo codes - expanded
    else if (containsAny(['rabatt', 'gutschein', 'code', 'prozent', 'angebot', 'sale', 'discount',
                     'aktion', 'spar', 'reduziert', 'nachlass', 'voucher', 'coupon'])) {
        wasResolved = true;
        response = '🎁 Aktuelle Angebote:\n\n• Newsletter-Anmeldung: 10% Rabatt auf erste Bestellung\n• Kostenloser Versand ab CHF 50\n• Combo-Angebot: Hoodie + Trainerhose = -5%\n\nGutschein-Code im Warenkorb eingeben!\n\nNewsletter abonnieren: www.joumonde.com/newsletter';
    }
    // Material/quality questions - new
    else if (containsAny(['material', 'qualitat', 'stoff', 'baumwolle', 'cotton', 'wolle', 'leder',
                     'herstellung', 'produziert', 'gemacht', 'fabric', 'quality'])) {
        wasResolved = true;
        response = '✨ Qualität & Materialien:\n\n• Premium-Materialien aus Europa\n• Old Money: Italienische Wolle, Ägyptische Baumwolle, Kaschmir\n• Casual: 100% Baumwolle, nachhaltige Produktion\n• Fair Trade zertifiziert\n• Langlebig & pflegeleicht\n\nWir setzen auf höchste Qualität für maximale Zufriedenheit!';
    }
    // Thanks - expanded
    else if (containsAny(['danke', 'vielen dank', 'super', 'perfekt', 'toll', 'thanks', 'thank',
                     'gut', 'klasse', 'prima', 'genial', 'top'])) {
        wasResolved = true;
        response = 'Sehr gerne! 😊 Kann ich Ihnen noch bei etwas anderem helfen?\n\nViel Freude beim Shoppen bei Joumonde!';
    }
    // Goodbye - expanded
    else if (containsAny(['tschuss', 'auf wiedersehen', 'bye', 'ciao', 'ade', 'adieu', 'bis bald'])) {
        wasResolved = true;
        chatbotContext = { awaitingOrderNumber: false, lastQuestion: null, userName: null };
        response = 'Auf Wiedersehen! 👋 Danke, dass Sie Joumonde besucht haben. Bei Fragen bin ich jederzeit für Sie da!';
    }
    // Default response with helpful suggestions
    else {
        wasResolved = false;
        response = 'Ich bin mir nicht sicher, wie ich Ihnen da helfen kann. 🤔\n\nHäufig gestellte Fragen:\n\n1️⃣ Bestellung verfolgen\n2️⃣ Rücksendung\n3️⃣ Versandkosten & -dauer\n4️⃣ Größenberatung\n5️⃣ Kontakt zum Kundenservice\n6️⃣ Preise & Angebote\n\nGeben Sie einfach ein Stichwort ein oder kontaktieren Sie uns direkt:\n📧 info@joumonde.com\n📞 +41 44 123 45 67';
    }
    
    // Track analytics
    trackChatbotQuery(userMessage, wasResolved);
    
    return response;
}

function trackOrder(orderNumber) {
    // Simulate order tracking (in real app, this would call an API)
    const orderStatuses = [
        {
            status: 'Zugestellt',
            info: `✅ Bestellung #${orderNumber} wurde zugestellt!\n\n📍 Zustellort: An Empfänger übergeben\n📅 Zugestellt am: ${getRecentDate(1)}\n\nIhr Paket wurde erfolgreich zugestellt. Bei Problemen kontaktieren Sie uns bitte!`
        },
        {
            status: 'Unterwegs',
            info: `📦 Bestellung #${orderNumber} ist unterwegs!\n\n🚚 Status: In Zustellung\n📍 Aktuelle Position: Paketzentrum Berlin\n⏰ Voraussichtliche Zustellung: ${getFutureDate(1)}\n\nTracking-Link:\nwww.dhl.de/tracking?id=${encodeURIComponent(orderNumber)}\n\nIhr Paket ist auf dem Weg zu Ihnen! 🎉`
        },
        {
            status: 'Bearbeitung',
            info: `⏳ Bestellung #${orderNumber} wird bearbeitet\n\n📋 Status: In Bearbeitung\n🏭 Standort: Versandzentrum\n📅 Bestelldatum: ${getRecentDate(2)}\n⏰ Voraussichtlicher Versand: Heute\n\nIhre Bestellung wird gerade für den Versand vorbereitet. Sie erhalten eine E-Mail mit der Tracking-Nummer sobald das Paket versendet wurde!`
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

// Close cart when clicking outside
document.addEventListener('click', function(event) {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartBtn = document.querySelector('.cart-btn');
    
    if (cartSidebar && cartBtn && cartSidebar.classList.contains('active') &&
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

// Chatbot closes only via its toggle button (not outside click)

// Initialize
document.addEventListener('DOMContentLoaded', async function() {
    // Load translations for saved language first
    await loadLanguage(currentLanguage);

    // Set saved language and currency
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) languageSelector.value = currentLanguage;
    const currencySelector = document.getElementById('currency-selector');
    if (currencySelector) currencySelector.value = currentCurrency;
    
    // Apply saved preferences
    applyPreferredSizeToProductSelectors();
    normalizeCartItemSizes();
    updatePageContent();
    updateAllPrices();
    updateCart();
    
    // Fix chatbot scroll behavior
    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatbotMessages = document.getElementById('chatbot-messages');
    
    if (chatbotWidget && chatbotMessages) {
        chatbotWidget.addEventListener('wheel', function(e) {
            if (chatbotOpen) {
                e.preventDefault();
                e.stopPropagation();
                chatbotMessages.scrollTop += e.deltaY;
            }
        }, { passive: false });
    }
    
    console.log('Joumonde Shop loaded successfully!');
});

// Re-apply language when page is restored from bfcache (browser back/forward)
window.addEventListener('pageshow', async function(event) {
    if (event.persisted) {
        await loadLanguage(currentLanguage);
        updatePageContent();
        updateAboutPageContent();
        const sel = document.getElementById('language-selector');
        if (sel) sel.value = currentLanguage;
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
            imageBg: imageBg || 'linear-gradient(135deg, #f5f5dc 0%, #d3d3d3 100%)',
            addedAt: Date.now()
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

function addWishlistItemToCart(productName) {
    const item = wishlist.find(entry => entry.name === productName);
    if (!item) return;

    addToCart(item.name, item.price);
    showNotification(`${productName} aus Wunschliste in den Warenkorb gelegt`);
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
    if (!wishlistItems) return;
    
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
        const sortedWishlist = [...wishlist].sort((a, b) => (b.addedAt || 0) - (a.addedAt || 0));
        wishlistItems.innerHTML = sortedWishlist.map(item => `
            <div class="cart-item">
                <div class="cart-item-image" style="background: ${item.imageBg};">
                    <span style="font-size: 0.7rem;">Bild</span>
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">${formatPrice(item.price)}</p>
                    <button class="wishlist-move-btn" onclick="addWishlistItemToCart('${item.name}')">In den Warenkorb</button>
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
// Account functions are now in account-system.js
// This section is kept for backward compatibility with click-outside-to-close

// Account modal: close on outside click ONLY when showing login/register (not dashboard)
document.addEventListener('click', function(e) {
    const modal = document.getElementById('account-modal');
    if (e.target === modal && modal.classList.contains('active')) {
        const hasDashboard = modal.querySelector('.account-dashboard');
        if (!hasDashboard && typeof toggleAccount === 'function') {
            toggleAccount();
        }
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



function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===== COOKIE CONSENT MANAGEMENT (GDPR/CCPA Compliant) =====
const cookieConsent = {
    categories: {
        necessary: true, // Always true, cannot be disabled
        analytics: false,
        marketing: false
    },
    
    init() {
        this.loadPreferences();
        this.checkAndShowBanner();
        this.initializeTracking();
    },
    
    loadPreferences() {
        const saved = localStorage.getItem('cookiePreferences');
        if (saved) {
            try {
                const preferences = JSON.parse(saved);
                this.categories = { ...this.categories, ...preferences };
            } catch (e) {
                console.error('Error loading cookie preferences:', e);
            }
        }
    },
    
    savePreferences() {
        localStorage.setItem('cookiePreferences', JSON.stringify(this.categories));
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
        localStorage.setItem('cookieConsent', 'configured');
    },
    
    checkAndShowBanner() {
        const consent = localStorage.getItem('cookieConsent');
        const banner = document.getElementById('cookie-banner');
        
        if (!consent && banner) {
            setTimeout(() => {
                banner.classList.add('active');
            }, 1500);
        }
    },
    
    initializeTracking() {
        // Only initialize analytics if user consented
        if (this.categories.analytics && typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    },
    
    acceptAll() {
        this.categories.analytics = true;
        this.categories.marketing = true;
        this.savePreferences();
        this.hideBanner();
        this.initializeTracking();
        showNotification(t('cookieAcceptedMessage'), 'success');
    },
    
    acceptNecessary() {
        this.categories.analytics = false;
        this.categories.marketing = false;
        this.savePreferences();
        this.hideBanner();
        
        // Disable analytics
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
        
        showNotification(t('cookieNecessaryMessage'), 'info');
    },
    
    saveCustomPreferences() {
        const analyticsCheckbox = document.getElementById('cookie-analytics');
        const marketingCheckbox = document.getElementById('cookie-marketing');
        
        if (analyticsCheckbox) this.categories.analytics = analyticsCheckbox.checked;
        if (marketingCheckbox) this.categories.marketing = marketingCheckbox.checked;
        
        this.savePreferences();
        this.hideBanner();
        this.hideSettings();
        this.initializeTracking();
        showNotification(t('cookiePreferencesSavedMessage'), 'success');
    },
    
    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('active');
            setTimeout(() => {
                banner.style.display = 'none';
            }, 500);
        }
    },
    
    showSettings() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.add('active'), 10);
            
            // Load current preferences into checkboxes
            const analyticsCheckbox = document.getElementById('cookie-analytics');
            const marketingCheckbox = document.getElementById('cookie-marketing');
            
            if (analyticsCheckbox) analyticsCheckbox.checked = this.categories.analytics;
            if (marketingCheckbox) marketingCheckbox.checked = this.categories.marketing;
        }
    },
    
    hideSettings() {
        const modal = document.getElementById('cookie-settings-modal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    },
    
    resetConsent() {
        localStorage.removeItem('cookiePreferences');
        localStorage.removeItem('cookieConsentDate');
        localStorage.removeItem('cookieConsent');
        this.categories = {
            necessary: true,
            analytics: false,
            marketing: false
        };
        location.reload();
    }
};

// Wrapper functions for global access
function acceptCookies() {
    cookieConsent.acceptAll();
}

function rejectCookies() {
    cookieConsent.acceptNecessary();
}

function showCookieSettings() {
    cookieConsent.showSettings();
}

function saveCookiePreferences() {
    cookieConsent.saveCustomPreferences();
}

function closeCookieSettings() {
    cookieConsent.hideSettings();
}

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
    cookieConsent.init();
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

// Filter System Functions
function toggleFilters() {
    const sidebar = document.getElementById('filterSidebar');
    sidebar.classList.toggle('active');
}

function toggleFiltersStreetwear() {
    const sidebar = document.getElementById('filterSidebarStreetwear');
    sidebar.classList.toggle('active');
}

function updatePriceRange(value) {
    document.getElementById('rangeValue').textContent = value;
    document.getElementById('maxPrice').value = value;
    applyFilters();
}

function applyFilters() {
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
    
    const selectedSizes = Array.from(document.querySelectorAll('#filterSidebar .filter-checkbox input:checked'))
        .map(cb => cb.value);
    
    const selectedColors = Array.from(document.querySelectorAll('#filterSidebar .color-checkbox input:checked'))
        .map(cb => cb.value);
    
    const products = document.querySelectorAll('#old-money .product-card');
    
    // Add loading state
    showFilterLoading('old-money');
    
    // Simulate processing time for smooth transition
    setTimeout(() => {
        products.forEach(product => {
            const priceText = product.querySelector('.product-price').getAttribute('data-price');
            const price = parseFloat(priceText);
            
            let show = true;
            
            // Price filter
            if (price < minPrice || price > maxPrice) {
                show = false;
            }
            
            // Size filter (if any size is selected)
            if (selectedSizes.length > 0) {
                const productSizes = Array.from(product.querySelectorAll('.size-select option')).map(opt => opt.value);
                const hasMatchingSize = selectedSizes.some(size => productSizes.includes(size));
                if (!hasMatchingSize) {
                    show = false;
                }
            }
            
            // Smooth fade transition
            if (show) {
                product.style.opacity = '0';
                product.style.display = '';
                setTimeout(() => { product.style.opacity = '1'; }, 50);
            } else {
                product.style.opacity = '0';
                setTimeout(() => { product.style.display = 'none'; }, 300);
            }
        });
        
        hideFilterLoading('old-money');
    }, 200);
}

function applyFiltersStreetwear() {
    const minPrice = parseFloat(document.getElementById('minPriceStreet').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPriceStreet').value) || Infinity;
    
    const selectedSizes = Array.from(document.querySelectorAll('#filterSidebarStreetwear .filter-checkbox input:checked'))
        .map(cb => cb.value);
    
    const products = document.querySelectorAll('#streetwear .product-card');
    
    // Add loading state
    showFilterLoading('streetwear');
    
    setTimeout(() => {
        products.forEach(product => {
            const priceText = product.querySelector('.product-price').getAttribute('data-price');
            const price = parseFloat(priceText);
            
            let show = true;
            
            if (price < minPrice || price > maxPrice) {
                show = false;
            }
            
            if (selectedSizes.length > 0) {
                const productSizes = Array.from(product.querySelectorAll('.size-select option')).map(opt => opt.value);
                const hasMatchingSize = selectedSizes.some(size => productSizes.includes(size));
                if (!hasMatchingSize) {
                    show = false;
                }
            }
            
            // Smooth fade transition
            if (show) {
                product.style.opacity = '0';
                product.style.display = '';
                setTimeout(() => { product.style.opacity = '1'; }, 50);
            } else {
                product.style.opacity = '0';
                setTimeout(() => { product.style.display = 'none'; }, 300);
            }
        });
        
        hideFilterLoading('streetwear');
    }, 200);
}

// Loading state helpers
function showFilterLoading(section) {
    const grid = document.querySelector(`#${section} .product-grid`);
    if (grid) {
        grid.style.opacity = '0.5';
        grid.style.pointerEvents = 'none';
    }
}

function hideFilterLoading(section) {
    const grid = document.querySelector(`#${section} .product-grid`);
    if (grid) {
        grid.style.opacity = '1';
        grid.style.pointerEvents = 'auto';
    }
}

function resetFilters() {
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    document.getElementById('priceRange').value = 500;
    document.getElementById('rangeValue').textContent = '500';
    
    document.querySelectorAll('#filterSidebar input[type="checkbox"]').forEach(cb => cb.checked = false);
    
    applyFilters();
}

function resetFiltersStreetwear() {
    document.getElementById('minPriceStreet').value = '';
    document.getElementById('maxPriceStreet').value = '';
    
    document.querySelectorAll('#filterSidebarStreetwear input[type="checkbox"]').forEach(cb => cb.checked = false);
    
    applyFiltersStreetwear();
}

function sortProducts(sortBy) {
    const grid = document.querySelector('#old-money .product-grid');
    const products = Array.from(grid.children);
    
    products.sort((a, b) => {
        switch(sortBy) {
            case 'price-asc':
                return parseFloat(a.querySelector('.product-price').getAttribute('data-price')) - 
                       parseFloat(b.querySelector('.product-price').getAttribute('data-price'));
            case 'price-desc':
                return parseFloat(b.querySelector('.product-price').getAttribute('data-price')) - 
                       parseFloat(a.querySelector('.product-price').getAttribute('data-price'));
            case 'name-asc':
                return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
            case 'newest':
                return a.querySelector('.product-badge')?.classList.contains('badge-new') ? -1 : 1;
            default:
                return 0;
        }
    });
    
    products.forEach(product => grid.appendChild(product));
}

function sortProductsStreetwear(sortBy) {
    const grid = document.querySelector('#streetwear .product-grid');
    const products = Array.from(grid.children);
    
    products.sort((a, b) => {
        switch(sortBy) {
            case 'price-asc':
                return parseFloat(a.querySelector('.product-price').getAttribute('data-price')) - 
                       parseFloat(b.querySelector('.product-price').getAttribute('data-price'));
            case 'price-desc':
                return parseFloat(b.querySelector('.product-price').getAttribute('data-price')) - 
                       parseFloat(a.querySelector('.product-price').getAttribute('data-price'));
            case 'name-asc':
                return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
            case 'newest':
                return a.querySelector('.product-badge')?.classList.contains('badge-new') ? -1 : 1;
            default:
                return 0;
        }
    });
    
    products.forEach(product => grid.appendChild(product));
}

// Discount Code System
const validDiscountCodes = {
    'WELCOME10': { type: 'percentage', value: 10, description: '10% Willkommensrabatt' },
    'SAVE20': { type: 'percentage', value: 20, description: '20% Rabatt' },
    'SUMMER25': { type: 'percentage', value: 25, description: '25% Sommerrabatt' },
    'FIXED15': { type: 'fixed', value: 15, description: '15 CHF Rabatt' },
    'VIP30': { type: 'percentage', value: 30, description: '30% VIP-Rabatt' }
};

function applyDiscountCode() {
    const codeInput = document.getElementById('discountCode');
    const messageElement = document.getElementById('discountMessage');
    const code = codeInput.value.trim().toUpperCase();
    
    if (!code) {
        showDiscountMessage('Bitte gib einen Rabattcode ein.', 'error');
        return;
    }
    
    const discountInfo = validDiscountCodes[code];
    
    if (!discountInfo) {
        showDiscountMessage('Ungültiger Rabattcode. Bitte versuche es erneut.', 'error');
        return;
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let discountAmount = 0;
    
    if (discountInfo.type === 'percentage') {
        discountAmount = subtotal * (discountInfo.value / 100);
    } else if (discountInfo.type === 'fixed') {
        discountAmount = Math.min(discountInfo.value, subtotal);
    }
    
    localStorage.setItem('appliedDiscountCode', code);
    localStorage.setItem('appliedDiscountAmount', discountAmount.toString());
    
    showDiscountMessage(' ' + discountInfo.description + ' erfolgreich angewendet!', 'success');
    updateCart();
    
    codeInput.disabled = true;
    document.querySelector('.apply-discount-btn').textContent = 'Angewendet';
    document.querySelector('.apply-discount-btn').disabled = true;
}

function showDiscountMessage(message, type) {
    const messageElement = document.getElementById('discountMessage');
    messageElement.textContent = message;
    messageElement.className = 'discount-message ' + type;
    
    if (type === 'error') {
        setTimeout(function() {
            messageElement.textContent = '';
            messageElement.className = 'discount-message';
        }, 3000);
    }
}

// Loading Animations
function showLoadingSpinner() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = '<div class="loading-spinner"></div>';
    overlay.id = 'loadingOverlay';
    document.body.appendChild(overlay);
    return overlay;
}

function hideLoadingSpinner() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.remove();
    }
}

// Add fade-in animation to product cards on load
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(function(card, index) {
        card.style.opacity = '0';
        setTimeout(function() {
            card.classList.add('fade-in');
            card.style.opacity = '1';
        }, index * 100);
    });
    
    // Initialize currency selector to saved value
    const currencySelector = document.getElementById('currency-selector');
    if (currencySelector) {
        currencySelector.value = currentCurrency;
    }
    
    // Initialize language selector to saved value
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.value = currentLanguage;
    }
    
    // Update all prices on load
    updateAllPrices();
    updateCart();
});

// Update About Page Content
function updateAboutPageContent() {
    // About Hero
    const aboutHeroTitle = document.querySelector('.about-hero h1');
    const aboutHeroSubtitle = document.querySelector('.about-hero .hero-subtitle');
    if (aboutHeroTitle) aboutHeroTitle.textContent = t('aboutPageTitle');
    if (aboutHeroSubtitle) aboutHeroSubtitle.textContent = t('aboutPageSubtitle');
    
    // About Cards
    const aboutCards = document.querySelectorAll('.about-card');
    if (aboutCards[0]) {
        aboutCards[0].querySelector('h2').textContent = t('ourStory');
        const storyPs = aboutCards[0].querySelectorAll('p');
        if (storyPs[0]) storyPs[0].textContent = t('ourStoryText1');
        if (storyPs[1]) storyPs[1].textContent = t('ourStoryText2');
    }
    if (aboutCards[1]) {
        aboutCards[1].querySelector('h2').textContent = t('ourMission');
        const missionPs = aboutCards[1].querySelectorAll('p');
        if (missionPs[0]) missionPs[0].textContent = t('ourMissionText1');
        if (missionPs[1]) missionPs[1].textContent = t('ourMissionText2');
    }
    
    // Values Section
    const valuesTitle = document.querySelector('.values-section .section-title');
    if (valuesTitle) valuesTitle.textContent = t('ourValues');
    
    const valueItems = document.querySelectorAll('.value-item');
    if (valueItems[0]) {
        valueItems[0].querySelector('h4').textContent = t('premiumQuality');
        valueItems[0].querySelector('p').textContent = t('premiumQualityText');
    }
    if (valueItems[1]) {
        valueItems[1].querySelector('h4').textContent = t('sustainability');
        valueItems[1].querySelector('p').textContent = t('sustainabilityText');
    }
    if (valueItems[2]) {
        valueItems[2].querySelector('h4').textContent = t('customerService');
        valueItems[2].querySelector('p').textContent = t('customerServiceText');
    }
    if (valueItems[3]) {
        valueItems[3].querySelector('h4').textContent = t('timelessDesign');
        valueItems[3].querySelector('p').textContent = t('timelessDesignText');
    }
    
    // Instagram Section
    const instagramTitle = document.querySelector('.instagram-section .section-title');
    const instagramSubtitle = document.querySelector('.instagram-section .instagram-subtitle');
    const instagramBtn = document.querySelector('.instagram-section .btn-primary');
    if (instagramTitle) instagramTitle.textContent = t('followInstagram');
    if (instagramSubtitle) instagramSubtitle.textContent = t('instagramSubtitle');
    if (instagramBtn) {
        const btnText = instagramBtn.childNodes[instagramBtn.childNodes.length - 1];
        if (btnText) btnText.textContent = ' ' + t('followInstagram');
    }
    
    // Footer
    const footerSections = document.querySelectorAll('.footer-section');
    if (footerSections[1]) {
        footerSections[1].querySelector('h4').textContent = t('shop');
        const shopLinks = footerSections[1].querySelectorAll('a');
        if (shopLinks[0]) shopLinks[0].textContent = t('oldMoney');
        if (shopLinks[1]) shopLinks[1].textContent = t('streetwear');
    }
    if (footerSections[2]) {
        footerSections[2].querySelector('h4').textContent = t('information');
        const infoLinks = footerSections[2].querySelectorAll('a');
        if (infoLinks[0]) infoLinks[0].textContent = t('about');
        if (infoLinks[1]) infoLinks[1].textContent = t('contact');
        if (infoLinks[2]) infoLinks[2].textContent = t('shippingTitle');
        if (infoLinks[3]) infoLinks[3].textContent = t('terms');
        if (infoLinks[4]) infoLinks[4].textContent = t('privacy');
    }
    if (footerSections[3]) {
        footerSections[3].querySelector('h4').textContent = t('newsletter');
        footerSections[3].querySelector('p').textContent = t('newsletterText');
        const newsletterInput = footerSections[3].querySelector('input');
        const newsletterBtn = footerSections[3].querySelector('button');
        if (newsletterInput) newsletterInput.placeholder = t('newsletterPlaceholder');
        if (newsletterBtn) newsletterBtn.textContent = t('subscribe');
    }
    
    // Footer Bottom
    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom) footerBottom.textContent = `© 2025 Joumonde. ${t('allRightsReserved')}.`;
    
    const trustBadges = document.querySelectorAll('.trust-badge');
    if (trustBadges[0]) trustBadges[0].textContent = t('sslSecure');
    if (trustBadges[1]) trustBadges[1].textContent = t('securePayment');
    if (trustBadges[2]) trustBadges[2].textContent = t('fastShipping');
    if (trustBadges[3]) trustBadges[3].textContent = t('dayReturn');
    
    // Navigation
    document.querySelectorAll('.nav-links a').forEach((link, i) => {
        const keys = ['home', 'oldMoney', 'streetwear', 'about', 'contact'];
        if (keys[i] && link.textContent.trim()) link.textContent = t(keys[i]);
    });
}

/* ===== RESPONSIVE & MOBILE ENHANCEMENTS ===== */

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Swipe to close cart sidebar on mobile
let touchStartX = 0;
let touchEndX = 0;

const cartSidebar = document.getElementById('cart-sidebar');
if (cartSidebar) {
    cartSidebar.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    cartSidebar.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        // Swipe right to close (minimum 100px swipe)
        if (touchEndX > touchStartX + 100) {
            if (cartSidebar.classList.contains('active')) {
                toggleCart();
            }
        }
    }
}

// Optimize images on mobile (lazy loading)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Handle orientation change
window.addEventListener('orientationchange', function() {
    // Close modals/sidebars on orientation change for better UX
    const openModals = document.querySelectorAll('.checkout-modal, .contact-modal, .account-modal');
    openModals.forEach(modal => modal.remove());
    
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar && cartSidebar.classList.contains('active')) {
        toggleCart();
    }
    
    // Recalculate viewport height for mobile browsers
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
});

// Set CSS custom property for viewport height (fixes mobile browser address bar issues)
window.addEventListener('resize', function() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
});

// Initial viewport height setup
document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);

// Detect touch device
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-device');
}

// Performance: Debounce window resize events
let resizeTimer;
window.addEventListener('resize', function() {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Newsletter sign-up (footer forms on shop/about/product-detail pages)
async function submitNewsletter(event) {
    event.preventDefault();
    const form = event.target;
    const emailInput = form.querySelector('input[type="email"]');
    const submitBtn = form.querySelector('button[type="submit"]');
    const email = emailInput ? emailInput.value.trim().toLowerCase() : '';

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showNotification('Bitte gib eine gültige E-Mail-Adresse ein.');
        return;
    }

    const originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) { submitBtn.textContent = 'Senden...'; submitBtn.disabled = true; }

    try {
        const res = await fetch(`${window.__ENV__?.SUPABASE_URL}/functions/v1/send-newsletter-confirmation`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'newsletter', email, source: 'footer-form' })
        });

        let data = null;
        try {
            data = await res.json();
        } catch (_jsonErr) {
            data = null;
        }

        if (!res.ok) {
            const msg = data && data.error
                ? data.error
                : 'Fehler beim Senden. Bitte später erneut versuchen.';
            showNotification(msg);
            return;
        }

        if (data && data.alreadySubscribed) {
            showNotification('Diese E-Mail wurde bereits hinzugefügt.');
        } else {
            showNotification('Vielen Dank für deine Anmeldung! Du bekommst bald eine Bestätigungsmail.');
            form.reset();
        }
    } catch (err) {
        console.error('Newsletter error:', err);
        showNotification('Fehler beim Senden. Bitte später erneut versuchen.');
    } finally {
        if (submitBtn) { submitBtn.textContent = originalText; submitBtn.disabled = false; }
    }
}

// Close any open modal/sidebar with the Escape key
document.addEventListener('keydown', function(e) {
    if (e.key !== 'Escape') return;

    const searchModal = document.querySelector('.search-modal');
    if (searchModal) {
        searchModal.classList.remove('active');
        setTimeout(() => searchModal.remove(), 300);
        return;
    }

    const checkoutModal = document.querySelector('.checkout-modal');
    if (checkoutModal) {
        checkoutModal.remove();
        document.body.classList.remove('modal-open');
        return;
    }

    const otherModal = document.querySelector('.contact-modal, .account-modal, .address-form-modal, .order-details-modal');
    if (otherModal) {
        otherModal.remove();
        return;
    }

    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar && cartSidebar.classList.contains('active')) {
        toggleCart();
    }
});
