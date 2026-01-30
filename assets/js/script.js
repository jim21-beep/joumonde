// Dropdown-Logik für alle Old Money Produkte
function toggleBlazerColorDropdown() {
    const btn = document.getElementById('blazer-color-dropdown-btn');
    const list = document.getElementById('blazer-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}
function toggleChinoColorDropdown() {
    const btn = document.getElementById('chino-color-dropdown-btn');
    const list = document.getElementById('chino-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}
function togglePulloverColorDropdown() {
    const btn = document.getElementById('pullover-color-dropdown-btn');
    const list = document.getElementById('pullover-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}
function togglePoloColorDropdown() {
    const btn = document.getElementById('polo-color-dropdown-btn');
    const list = document.getElementById('polo-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}
function toggleWesteColorDropdown() {
    const btn = document.getElementById('weste-color-dropdown-btn');
    const list = document.getElementById('weste-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}
function toggleQuarterzipColorDropdown() {
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
window.selectedChinoColor = 'Camel';
window.selectedPulloverColor = 'Dunkelblau';
window.selectedWesteColor = 'Creme';
window.selectedQuarterzipColor = 'Creme';
window.selectedHoodieColor = 'Schwarz';
window.selectedTshirtColor = 'Schwarz';
window.selectedCargoColor = 'Schwarz';
window.selectedTrackSuitColor = 'Schwarz';

// Dropdown-Auswahl Old Money
function selectBlazerColorDropdown(color, hex, label) {
    applyColorSelection('blazer', hex, label, 'selectedBlazerColor');
}

function selectPoloColorDropdown(color, hex, label) {
    applyColorSelection('polo', hex, label, 'selectedPoloColor');
}

function selectChinoColorDropdown(color, hex, label) {
    applyColorSelection('chino', hex, label, 'selectedChinoColor');
}

function selectPulloverColorDropdown(color, hex, label) {
    applyColorSelection('pullover', hex, label, 'selectedPulloverColor');
}

function selectWesteColorDropdown(color, hex, label) {
    applyColorSelection('weste', hex, label, 'selectedWesteColor');
}

function selectQuarterzipColorDropdown(color, hex, label) {
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
function toggleHoodieColorDropdown() {
    const btn = document.getElementById('hoodie-color-dropdown-btn');
    const list = document.getElementById('hoodie-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}

function selectHoodieColorDropdown(color, hex, label) {
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
    var descMap = {
        black: 'Premium Cotton in Schwarz',
        white: 'Premium Cotton in Weiß',
        gray: 'Premium Cotton in Grau',
        navy: 'Premium Cotton in Navy',
        olive: 'Premium Cotton in Olive',
        beige: 'Premium Cotton in Beige'
    };
    // Setze Hintergrund
    var hoodieImage = document.getElementById('hoodie-image');
    if (hoodieImage && bgMap[color]) hoodieImage.style.background = bgMap[color];
    // Setze Beschreibung
    var desc = document.getElementById('hoodie-desc');
    if (desc && descMap[color]) desc.textContent = descMap[color];
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
function toggleTshirtColorDropdown() {
    const btn = document.getElementById('tshirt-color-dropdown-btn');
    const list = document.getElementById('tshirt-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}

function selectTshirtColorDropdown(color, hex, label) {
    applyColorSelection('tshirt', hex, label, 'selectedTshirtColor');
}

// Farbauswahl Dropdown für Cargo Pants (Streetwear)
function toggleCargoColorDropdown() {
    const btn = document.getElementById('cargo-color-dropdown-btn');
    const list = document.getElementById('cargo-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}

function selectCargoColorDropdown(color, hex, label) {
    applyColorSelection('cargo', hex, label, 'selectedCargoColor');
}

// Farbauswahl Dropdown für Trainerhose (Streetwear)
function toggleTrackSuitColorDropdown() {
    const btn = document.getElementById('tracksuit-color-dropdown-btn');
    const list = document.getElementById('tracksuit-color-dropdown-list');
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    list.style.display = expanded ? 'none' : 'block';
}

function selectTrackSuitColorDropdown(color, hex, label) {
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
    colorLabel.textContent = 'Farbe: ' + colorName;
    window.selectedBlazerColor = colorName;
}
// Elegante Farbauswahl für Hoodie (Streetwear)
window.selectedHoodieColor = 'Schwarz';
function selectHoodieColor(color, btn) {
    const hoodieImg = document.getElementById('hoodie-img');
    const hoodieImageDiv = document.getElementById('hoodie-image');
    const colorLabel = document.getElementById('hoodie-color-label');
    const desc = document.getElementById('hoodie-desc');
    let colorName = 'Schwarz';
    let bg = 'linear-gradient(135deg, #000000 0%, #434343 100%)';
    let img = 'assets/images/hoodie-mockup.png';
    let descText = 'Premium Cotton in Schwarz';
    switch (color) {
        case 'white':
            colorName = 'Weiß';
            bg = 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)';
            img = 'assets/images/hoodie-mockup-white.png';
            descText = 'Premium Cotton in Weiß';
            break;
        case 'gray':
            colorName = 'Grau';
            bg = 'linear-gradient(135deg, #808080 0%, #b0b0b0 100%)';
            img = 'assets/images/hoodie-mockup-gray.png';
            descText = 'Premium Cotton in Grau';
            break;
        case 'navy':
            colorName = 'Navy';
            bg = 'linear-gradient(135deg, #001f3f 0%, #3a3a60 100%)';
            img = 'assets/images/hoodie-mockup-navy.png';
            descText = 'Premium Cotton in Navy';
            break;
        case 'olive':
            colorName = 'Olive';
            bg = 'linear-gradient(135deg, #556B2F 0%, #8FBC8F 100%)';
            img = 'assets/images/hoodie-mockup-olive.png';
            descText = 'Premium Cotton in Olive';
            break;
        case 'beige':
            colorName = 'Beige';
            bg = 'linear-gradient(135deg, #f5f5dc 0%, #e9e4c9 100%)';
            img = 'assets/images/hoodie-mockup-beige.png';
            descText = 'Premium Cotton in Beige';
            break;
    }
    hoodieImageDiv.style.background = bg;
    hoodieImg.src = img;
    colorLabel.textContent = 'Farbe: ' + colorName;
    if (desc) desc.textContent = descText;
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
        elegantVest: 'Elegante Weste',
        vestDesc: 'Premium Woll-Weste in Creme',
        quarterZipPullover: 'Quarter Zipper Pullover',
        quarterZipDesc: 'Kaschmir-Mix mit Reißverschluss',
        knitSweater: 'Strickpullover',
        sweaterDesc: 'Kaschmir in Dunkelblau',
        oversizedHoodie: 'Oversized Hoodie',
        hoodieDesc: 'Premium Cotton in Schwarz',
        graphicTee: 'T-Shirt',
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
        
        // About Page
        aboutPageTitle: 'Über Joumonde',
        aboutPageSubtitle: 'Wo Eleganz auf Streetwear trifft',
        ourStory: 'Unsere Geschichte',
        ourStoryText1: 'Joumonde wurde 2025 mit der Vision gegründet, zeitlose Eleganz mit modernem Streetwear zu verbinden. Unser Name vereint das französische "Jour" (Tag) mit "Monde" (Welt) - jeden Tag die Welt der Mode neu interpretieren.',
        ourStoryText2: 'Wir glauben an Qualität, Nachhaltigkeit und zeitloses Design. Jedes unserer Stücke wird sorgfältig ausgewählt und kombiniert Old Money Ästhetik mit urbaner Streetwear-Kultur.',
        ourMission: 'Unsere Mission',
        ourMissionText1: 'Bei Joumonde geht es nicht nur um Mode - es geht um einen Lifestyle. Wir möchten Menschen dabei helfen, ihren individuellen Stil zu finden und sich selbstbewusst zu fühlen, egal ob im Business-Meeting oder beim Street-Festival.',
        ourMissionText2: 'Unsere Kollektionen werden von den besten Manufakturen produziert, mit Fokus auf faire Arbeitsbedingungen und nachhaltige Materialien. Premium-Qualität bedeutet für uns nicht nur erstklassige Stoffe, sondern auch Verantwortung gegenüber Mensch und Umwelt.',
        ourValues: 'Unsere Werte',
        premiumQuality: 'Premium Qualität',
        premiumQualityText: 'Hochwertige Materialien und erstklassige Verarbeitung für langlebige Fashion-Pieces',
        sustainability: 'Nachhaltigkeit',
        sustainabilityText: 'Verantwortungsvolle Produktion, faire Arbeitsbedingungen und umweltbewusste Materialauswahl',
        customerService: 'Kundenservice',
        customerServiceText: 'Persönliche Beratung, schneller Versand und erstklassiger Support für ein perfektes Shopping-Erlebnis',
        timelessDesign: 'Zeitloses Design',
        timelessDesignText: 'Klassische Eleganz trifft moderne Trends - Mode die nicht mit der Saison verschwindet',
        followInstagram: 'Folge uns auf Instagram',
        instagramSubtitle: 'Entdecke unsere neuesten Styles und werde Teil der Joumonde Community',
        newsletter: 'Newsletter',
        newsletterText: 'Erhalte exklusive Angebote & Neuigkeiten',
        newsletterPlaceholder: 'Deine E-Mail',
        subscribe: 'Abonnieren',
        allRightsReserved: 'Alle Rechte vorbehalten',
        sslSecure: '🔒 SSL Verschlüsselt',
        securePayment: '💳 Sichere Zahlung',
        fastShipping: '🚚 Schneller Versand',
        dayReturn: '↩️ 14 Tage Rückgabe',
        
        // Testimonials
        testimonialsTitle: 'Das sagen unsere Kunden',
        
        // FAQ
        faqTitle: 'Häufig gestellte Fragen',
        
        // Shipping
        shippingTitle: 'Versand & Retouren',
        
        // Contact Form
        sendMessage: 'Nachricht senden',
        
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
        confirm: 'Warenkorb leeren',
        
        // Newsletter
        newsletterSuccess: 'Danke für deine Anmeldung! Wir senden dir bald exklusive Angebote.',
        invalidEmail: 'Bitte gib eine gültige E-Mail-Adresse ein.',
        emailAlreadyRegistered: 'Diese E-Mail ist bereits registriert!',
        newsletterError: 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.'
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
        elegantVest: 'Elegant Vest',
        vestDesc: 'Premium Wool Vest in Cream',
        quarterZipPullover: 'Quarter Zip Pullover',
        quarterZipDesc: 'Cashmere Blend with Zipper',
        knitSweater: 'Knit Sweater',
        sweaterDesc: 'Cashmere in Dark Blue',
        oversizedHoodie: 'Oversized Hoodie',
        hoodieDesc: 'Premium Cotton in Black',
        graphicTee: 'T-Shirt',
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
        
        // About Page
        aboutPageTitle: 'About Joumonde',
        aboutPageSubtitle: 'Where Elegance Meets Streetwear',
        ourStory: 'Our Story',
        ourStoryText1: 'Joumonde was founded in 2025 with the vision of combining timeless elegance with modern streetwear. Our name unites the French "Jour" (day) with "Monde" (world) - reinterpreting the world of fashion every day.',
        ourStoryText2: 'We believe in quality, sustainability and timeless design. Each of our pieces is carefully selected and combines Old Money aesthetics with urban streetwear culture.',
        ourMission: 'Our Mission',
        ourMissionText1: 'At Joumonde, it\'s not just about fashion - it\'s about a lifestyle. We want to help people find their individual style and feel confident, whether at a business meeting or at a street festival.',
        ourMissionText2: 'Our collections are produced by the best manufacturers, with a focus on fair working conditions and sustainable materials. Premium quality for us means not only first-class fabrics, but also responsibility towards people and the environment.',
        ourValues: 'Our Values',
        premiumQuality: 'Premium Quality',
        premiumQualityText: 'High-quality materials and first-class workmanship for durable fashion pieces',
        sustainability: 'Sustainability',
        sustainabilityText: 'Responsible production, fair working conditions and environmentally conscious material selection',
        customerService: 'Customer Service',
        customerServiceText: 'Personal advice, fast shipping and first-class support for a perfect shopping experience',
        timelessDesign: 'Timeless Design',
        timelessDesignText: 'Classic elegance meets modern trends - fashion that doesn\'t disappear with the season',
        followInstagram: 'Follow us on Instagram',
        instagramSubtitle: 'Discover our latest styles and become part of the Joumonde community',
        newsletter: 'Newsletter',
        newsletterText: 'Get exclusive offers & news',
        newsletterPlaceholder: 'Your email',
        subscribe: 'Subscribe',
        allRightsReserved: 'All rights reserved',
        sslSecure: '🔒 SSL Encrypted',
        securePayment: '💳 Secure Payment',
        fastShipping: '🚚 Fast Shipping',
        dayReturn: '↩️ 14 Day Returns',
        
        // Testimonials
        testimonialsTitle: 'What Our Customers Say',
        
        // FAQ
        faqTitle: 'Frequently Asked Questions',
        
        // Shipping
        shippingTitle: 'Shipping & Returns',
        
        // Contact Form
        sendMessage: 'Send Message',
        
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
        confirm: 'Clear Cart',
        
        // Newsletter
        newsletterSuccess: 'Thank you for subscribing! We\'ll send you exclusive offers soon.',
        invalidEmail: 'Please enter a valid email address.',
        emailAlreadyRegistered: 'This email is already registered!',
        newsletterError: 'An error occurred. Please try again later.'
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
        elegantVest: 'Gilet Élégant',
        vestDesc: 'Gilet en Laine Premium Crème',
        quarterZipPullover: 'Pull Quarter Zip',
        quarterZipDesc: 'Mélange Cachemire avec Fermeture',
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
        
        // About Page
        aboutPageTitle: 'À Propos de Joumonde',
        aboutPageSubtitle: 'Où l\'Élégance Rencontre le Streetwear',
        ourStory: 'Notre Histoire',
        ourStoryText1: 'Joumonde a été fondée en 2025 avec la vision de combiner l\'élégance intemporelle avec le streetwear moderne. Notre nom unit le français "Jour" avec "Monde" - réinterpréter le monde de la mode chaque jour.',
        ourStoryText2: 'Nous croyons en la qualité, la durabilité et le design intemporel. Chacune de nos pièces est soigneusement sélectionnée et combine l\'esthétique Old Money avec la culture streetwear urbaine.',
        ourMission: 'Notre Mission',
        ourMissionText1: 'Chez Joumonde, il ne s\'agit pas seulement de mode - il s\'agit d\'un style de vie. Nous voulons aider les gens à trouver leur style individuel et à se sentir confiants, que ce soit lors d\'une réunion d\'affaires ou lors d\'un festival de rue.',
        ourMissionText2: 'Nos collections sont produites par les meilleurs fabricants, en mettant l\'accent sur des conditions de travail équitables et des matériaux durables. La qualité premium signifie pour nous non seulement des tissus de première classe, mais aussi la responsabilité envers les personnes et l\'environnement.',
        ourValues: 'Nos Valeurs',
        premiumQuality: 'Qualité Premium',
        premiumQualityText: 'Matériaux de haute qualité et fabrication de première classe pour des pièces de mode durables',
        sustainability: 'Durabilité',
        sustainabilityText: 'Production responsable, conditions de travail équitables et sélection de matériaux respectueux de l\'environnement',
        customerService: 'Service Client',
        customerServiceText: 'Conseil personnalisé, expédition rapide et support de première classe pour une expérience d\'achat parfaite',
        timelessDesign: 'Design Intemporel',
        timelessDesignText: 'L\'élégance classique rencontre les tendances modernes - une mode qui ne disparaît pas avec la saison',
        followInstagram: 'Suivez-nous sur Instagram',
        instagramSubtitle: 'Découvrez nos derniers styles et rejoignez la communauté Joumonde',
        newsletter: 'Newsletter',
        newsletterText: 'Recevez des offres exclusives et des nouvelles',
        newsletterPlaceholder: 'Votre email',
        subscribe: 'S\'abonner',
        allRightsReserved: 'Tous droits réservés',
        sslSecure: '🔒 Cryptage SSL',
        securePayment: '💳 Paiement Sécurisé',
        fastShipping: '🚚 Livraison Rapide',
        dayReturn: '↩️ Retour 14 Jours',
        
        // Testimonials
        testimonialsTitle: 'Ce que disent nos clients',
        
        // FAQ
        faqTitle: 'Questions Fréquemment Posées',
        
        // Shipping
        shippingTitle: 'Expédition & Retours',
        
        // Contact Form
        sendMessage: 'Envoyer le message',
        
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
        confirm: 'Vider le Panier',
        
        // Newsletter
        newsletterSuccess: 'Merci pour votre inscription! Nous vous enverrons bientôt des offres exclusives.',
        invalidEmail: 'Veuillez entrer une adresse email valide.',
        emailAlreadyRegistered: 'Cet email est déjà enregistré!',
        newsletterError: 'Une erreur s\'est produite. Veuillez réessayer plus tard.'
    }
};

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
    
    // Products
    const productTitles = [
        'classicBlazer', 'poloShirt', 'chinosPants', 'elegantVest', 'quarterZipPullover', 'knitSweater',
        'oversizedHoodie', 'graphicTee', 'cargoPants', 'trackPants'
    ];
    const productDescs = [
        'blazerDesc', 'poloDesc', 'chinosDesc', 'vestDesc', 'quarterZipDesc', 'sweaterDesc',
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
        if (btn.childNodes[0]) btn.childNodes[0].textContent = t('addToCart');
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
        if (links[2]) links[2].textContent = t('terms');
        if (links[3]) links[3].textContent = t('privacy');
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
    if (cartHeader) cartHeader.textContent = t('cart');
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
// Navigate to Product Detail Page
function viewProductDetail(productName, price, description, colors, sizes) {
    // Store product data in sessionStorage
    const productData = {
        name: productName,
        price: price,
        description: description,
        colors: colors || [],
        sizes: sizes || ['S', 'M', 'L', 'XL']
    };
    
    sessionStorage.setItem('selectedProduct', JSON.stringify(productData));
    
    // Navigate to product detail page
    window.location.href = 'product-detail.html';
}

// Add to Cart
function addToCart(productName, price, color, size) {
    // Default values if not provided
    color = color || '';
    size = size || '';
    
    // Check if item already exists in cart with same color and size
    const existingItem = cart.find(item => 
        item.name === productName && 
        item.color === color && 
        item.size === size
    );
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: price,
            color: color,
            size: size,
            quantity: 1
        });
    }
    
    updateCart();
    
    // Show cart briefly
    const cartSidebar = document.getElementById('cart-sidebar');
    cartSidebar.classList.add('active');
    
    // Show notification with details
    let details = [];
    if (size) details.push(size);
    if (color) details.push(color);
    const detailStr = details.length > 0 ? ` (${details.join(', ')})` : '';
    showNotification(`${productName}${detailStr} ${t('added')}`);
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
    
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        let details = [];
        if (item.size) details.push(item.size);
        if (item.color) details.push(item.color);
        const detailStr = details.length > 0 ? `<span class="cart-item-details">${details.join(' / ')}</span>` : '';
        return `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                ${detailStr}
                <p class="cart-item-price">${formatPrice(item.price)}</p>
                <div class="cart-item-quantity">
                    <button class="qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart(${index})">&times;</button>
        </div>
    `;
    }).join('');
    
    // Calculate subtotal
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // Apply currency conversion to subtotal
    subtotal = subtotal * currencyRates[currentCurrency];
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
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

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
        { name: 'Klassischer Blazer', price: 79.99, category: 'Old Money' },
        { name: 'Polo Hemd', price: 34.99, category: 'Old Money' },
        { name: 'Chino Hose', price: 51.99, category: 'Old Money' },
        { name: 'Elegante Weste', price: 69.99, category: 'Old Money' },
        { name: 'Quarter Zipper Pullover', price: 79.99, category: 'Old Money' },
        { name: 'Strickpullover', price: 89.99, category: 'Old Money' },
        { name: 'Oversized Hoodie', price: 49.99, category: 'Streetwear' },
        { name: 'T-Shirt', price: 24.99, category: 'Streetwear' },
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
        const orderNumber = userMessage.match(/\d+/);
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
        response = 'Hallo! 👋 Willkommen bei Joumonde. Ich bin Ihr virtueller Assistent. Wie kann ich Ihnen heute helfen?\n\nIch kann Ihnen bei folgenden Themen helfen:\n• Bestellstatus verfolgen\n• Versand & Lieferung\n• Rückgabe & Umtausch\n• Größenberatung\n• Zahlungsmethoden\n• Produktinformationen';
    }
    
    // Order tracking - expanded variations
    if (containsAny(['bestellung', 'sendung', 'paket', 'tracking', 'status', 'wo ist', 'lieferstatus', 
                     'verfolg', 'bestell', 'order', 'shipment', 'geliefert', 'angekommen', 'kommt',
                     'erhalten', 'bekommen', 'lieferung'])) {
        wasResolved = true;
        chatbotContext.awaitingOrderNumber = true;
        chatbotContext.lastQuestion = 'tracking';
        response = 'Ich helfe Ihnen gerne, Ihre Bestellung zu verfolgen! 📦\n\nBitte geben Sie Ihre Bestellnummer ein. Sie finden diese in Ihrer Bestätigungs-E-Mail (Format: z.B. JM12345).';
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
                     'twint', 'rechnung', 'uberweisung', 'karte', 'bezahl', 'pay'])) {
        wasResolved = true;
        response = '💳 Zahlungsmethoden:\n\n✓ Kreditkarte (Visa, Mastercard, Amex)\n✓ PayPal\n✓ TWINT (Schweizer Mobile Payment)\n✓ Rechnung (Klarna)\n✓ Apple Pay & Google Pay\n\nAlle Zahlungen sind SSL-verschlüsselt und sicher! 🔒';
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
        response = '🔥 Streetwear Collection:\n\nUnsere Streetwear kombiniert urbanen Style mit Premium-Qualität:\n\n• Oversized Hoodies aus 100% Baumwolle\n• Exklusive Graphic Tees (Limited Edition)\n• Cargo Pants mit Multi-Pocket Design\n• Premium Sneakers\n\nFür alle, die Statement setzen wollen!\n\nZur Kollektion: Scrollen Sie zu "Streetwear Collection"';
    }
    // Price questions - new
    else if (containsAny(['preis', 'kosten', 'teuer', 'billig', 'gunstig', 'price', 'kostet', 'viel', 'wert'])) {
        wasResolved = true;
        response = '💰 Unsere Preise:\n\nOld Money Collection: CHF 79.90 - CHF 89.90\nStreetwear Collection: CHF 24.90 - CHF 79.90\n\n✓ Premium Qualität zu fairen Preisen\n✓ Kostenloser Versand ab CHF 50\n✓ 10% Newsletter-Rabatt für Neukunden\n\nAlle Preise sind bereits in CHF, EUR oder USD verfügbar (siehe Währungsauswahl oben rechts).';
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
        response = '✨ Qualität & Materialien:\n\n• Premium-Materialien aus Europa\n• Old Money: Italienische Wolle, Ägyptische Baumwolle, Kaschmir\n• Streetwear: 100% Baumwolle, nachhaltige Produktion\n• Fair Trade zertifiziert\n• Langlebig & pflegeleicht\n\nWir setzen auf höchste Qualität für maximale Zufriedenheit!';
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
// Account functions are now in account-system.js
// This section is kept for backward compatibility with click-outside-to-close

// Close account modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('account-modal');
    if (e.target === modal && modal.classList.contains('active')) {
        if (typeof toggleAccount === 'function') {
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

// ===== NEWSLETTER =====
function submitNewsletter(e) {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    
    if (!email || !validateEmail(email)) {
        showNotification(t('invalidEmail') || 'Bitte gib eine gültige E-Mail-Adresse ein.');
        return;
    }
    
    // Store in localStorage temporarily (backend-ready structure)
    const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
    
    // Check for duplicates
    if (subscribers.some(sub => sub.email === email)) {
        showNotification(t('emailAlreadyRegistered') || 'Diese E-Mail ist bereits registriert!');
        return;
    }
    
    // Add new subscriber
    const newSubscriber = {
        email: email,
        timestamp: new Date().toISOString(),
        source: 'footer-newsletter',
        confirmed: false,
        language: localStorage.getItem('selectedLanguage') || 'de'
    };
    
    subscribers.push(newSubscriber);
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    
    // TODO: Send to backend API when ready
    // fetch('/api/newsletter/subscribe', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(newSubscriber)
    // }).then(response => {
    //     if (response.ok) {
    //         showNotification(t('newsletterSuccess'));
    //     }
    // }).catch(error => {
    //     console.error('Newsletter signup failed:', error);
    //     showNotification(t('newsletterError'), 'error');
    // });
    
    showNotification(t('newsletterSuccess') || 'Danke für deine Anmeldung! Wir senden dir bald exklusive Angebote.');
    e.target.reset();
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    const banner = document.getElementById('cookie-banner');
    banner.classList.remove('active');
    // Force hide after animation
    setTimeout(() => {
        banner.style.display = 'none';
    }, 500);
    showNotification('Cookie-Einstellungen gespeichert');
}

function rejectCookies() {
    localStorage.setItem('cookieConsent', 'rejected');
    const banner = document.getElementById('cookie-banner');
    banner.classList.remove('active');
    // Force hide after animation
    setTimeout(() => {
        banner.style.display = 'none';
    }, 500);
    showNotification('Nur notwendige Cookies werden verwendet');
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
        showDiscountMessage('Bitte geben Sie einen Rabattcode ein.', 'error');
        return;
    }
    
    const discountInfo = validDiscountCodes[code];
    
    if (!discountInfo) {
        showDiscountMessage('Ung�ltiger Rabattcode. Bitte versuchen Sie es erneut.', 'error');
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

