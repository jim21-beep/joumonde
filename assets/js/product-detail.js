// Product Descriptions Database
const productDatabase = {
    'Klassischer Blazer': {
        description: 'Dieser klassische Blazer aus hochwertiger italienischer Wolle ist das perfekte Kleidungsstück für den anspruchsvollen Gentleman. Mit seiner zeitlosen Silhouette und erstklassigen Verarbeitung verleiht er jedem Outfit eine elegante Note. Ideal für Geschäftstreffen, formelle Anlässe und alltägliche Eleganz.',
        features: [
            'Premium italienische Wolle (Super 120s)',
            'Klassischer 2-Knopf-Schnitt',
            'Innenfutter aus Viskose',
            'Zwei Seitentaschen mit Paspeln',
            'Brusttasche für Einstecktuch',
            'Perfekt für Business & formelle Anlässe'
        ],
        materials: [
            '90% Schurwolle (italienisch, Super 120s)',
            '10% Kaschmir',
            'Futter: 100% Viskose'
        ],
        care: [
            'Nur chemische Reinigung',
            'Nicht bleichen',
            'Nicht im Trockner trocknen',
            'Bügeln bei niedriger Temperatur',
            'Mit Kleiderbügel aufhängen'
        ]
    },
    'Polo Hemd': {
        description: 'Das klassische Poloshirt aus ägyptischer Baumwolle kombiniert zeitlose Eleganz mit höchstem Tragekomfort. Die feine Verarbeitung und das Premium-Material machen es zum perfekten Begleiter für Freizeit und Business-Casual. Ein Klassiker, der niemals aus der Mode kommt.',
        features: [
            'Premium ägyptische Baumwolle',
            'Klassische Poloform',
            'Knopfleiste mit Druckknöpfen',
            'Kontrastfarbige Kragen- und Ärmelbiesen',
            'Locker geschnittenes Ärmelbündchen',
            'Verdickte Schulternähte für Langlebigkeit'
        ],
        materials: [
            '100% ägyptische Baumwolle',
            'Grammatur: 200 g/m²',
            'Hochwertige Verarbeitung'
        ],
        care: [
            'Maschinenwäsche bei 30°C',
            'Mit ähnlichen Farben waschen',
            'Im Schattentumbler trocknen',
            'Bei mittlerer Temperatur bügeln'
        ]
    },
    'Knit Zip-Polo': {
        description: 'Das innovative Knit Zip-Polo vereint den Charme eines klassischen Poloshirts mit der praktischen Funktionalität eines Reißverschlusses. Aus feinstem gestricktem Material gefertigt, bietet es optimale Bewegungsfreiheit und atmungsaktiven Komfort für aktive Träger.',
        features: [
            'Feinstrick-Struktur aus Premium-Baumwollmix',
            'Praktischer 1/4-Reißverschluss',
            'Figurbetonte Schnittform',
            'Hochwertige YKK-Reißverschlüsse',
            'Elastische Bund- und Ärmelabschlüsse',
            'Moderner, sportlicher Look'
        ],
        materials: [
            '90% Baumwolle, 10% Polyester',
            'Feinstrick-Qualität',
            'Strapazierfähig und formstabil'
        ],
        care: [
            'Maschinenwäsche bei 30°C (Feinwäsche)',
            'Innen waschen',
            'Flach trocknen',
            'Bei niedriger Temperatur bügeln'
        ]
    },
    'Bundfalthose': {
        description: 'Die klassische Bundfalthose verbindet zeitlose Eleganz mit hohem Tragekomfort. Der hochwertige Baumwoll-Mix und die präzise gearbeiteten Bundfalten machen sie zum vielseitigen Begleiter für Business und Freizeit.',
        features: [
            'Klassische Bundfalten für eine elegante Silhouette',
            'Verstärkte Nähte für Langlebigkeit',
            'Seitliche Eingrifftaschen',
            'Klassischer Knopfverschluss und Reißverschluss',
            'Verstellbare Innenbundweite für perfekte Passform',
            'Moderne, zeitlose Farbpalette'
        ],
        materials: [
            '98% Baumwolle, 2% Elasthan',
            'Strapazierfähiger Twill-Stoff',
            'Angenehm griff und langlebig'
        ],
        care: [
            'Maschinenwäsche bei 40°C',
            'Mit ähnlichen Farben waschen',
            'Tumbler auf niedriger Temperatur',
            'Bei Bedarf leicht ausbügeln'
        ]
    },
    'Elegante Weste': {
        description: 'Diese raffinierte Wollweste ist das Sahnestück für aufwändig zusammengestellte Outfits. Mit ihrer zierlichen Struktur und erstklassigen Verarbeitung verleiht sie dem Träger Souveränität und Stil. Perfekt als Layering-Piece für formelle und dressy-casual Gelegenheiten.',
        features: [
            'Premium Woll-Mischgewebe',
            'Klassischer V-Ausschnitt',
            'Vier Außentaschen',
            'Innentasche für kleine Gegenstände',
            'Verstellbare Rückenschnalle',
            'Elegante Knopfleiste mit Perlmuttknöpfen'
        ],
        materials: [
            '85% Schurwolle, 15% Seide',
            'Hochwertiges Jacquard-Futter',
            'Premium Verarbeitung'
        ],
        care: [
            'Nur chemische Reinigung empfohlen',
            'Auf Kleiderbügel lagern',
            'Vor starker Sonneneinstrahlung schützen',
            'Bei Bedarf fachgerecht reinigen'
        ]
    },
    'Quarter Zipper': {
        description: 'Der Quarter Zipper aus luxuriösem Kaschmir-Mix ist die perfekte Brücke zwischen Eleganz und Komfort. Der praktische 1/4-Reißverschluss ermöglicht flexible Temperaturanpassung, während die Premium-Materialien ein unvergleichliches Tragegefühl bieten. Ein Investment-Piece für anspruchsvolle Träger.',
        features: [
            'Kaschmir-Baumwolle Premium-Mix',
            '1/4-Reißverschluss für Flexibilität',
            'Gerippter Rundhals',
            'Elastische Bund- und Ärmelabschlüsse',
            'Hochwertige Verarbeitung',
            'Zeitloses Understatement-Design'
        ],
        materials: [
            '50% Kaschmir, 50% Baumwolle',
            'Ultrasoft und atmungsaktiv',
            'Langlebig und hochwertig'
        ],
        care: [
            'Handwäsche oder Feinwäsche bei 30°C',
            'Mit mildem Waschmittel',
            'Flach trocknen',
            'Nicht bügeln - an der Luft trocknen'
        ]
    },
    'Strickpullover': {
        description: 'Dieser Premium-Kaschmir Pullover verkörpert zeitlose Luxus und unvergleichlichen Komfort. Das ultraweiche Material schmiegt sich sanft an den Körper an und bietet eine elegante Silhouette, die zu jedem Anlass passt. Ein Klassiker, der ein Leben lang hält.',
        features: [
            '100% Premium-Kaschmir',
            'Nahtlose Rückseite (nur Seitennaht)',
            'Gerippter Rundhals und Bündchen',
            'Eleganter, figurbetonte Schnitt',
            'Hochwertige Verarbeitung',
            'Perfekte Balance zwischen Eleganz und Komfort'
        ],
        materials: [
            '100% Premium-Grade Kaschmir',
            'Langfaserig und weich',
            'Zeitlos elegant'
        ],
        care: [
            'Handwäsche in kaltem Wasser',
            'Mit Kaschmir-Spezialwaschmittel',
            'Flach trocknen auf ebener Fläche',
            'Nicht auswringen oder verdrehen'
        ]
    },
    'Leinenhose': {
        description: 'Die leichte Leinenhose ist das perfekte Sommer-Essential für den stilbewussten Mann. Aus purem, hochwertigem Leinen gefertigt, bietet sie atemberaubende Atmungsaktivität und einen eleganten, lockeren Look. Ideal für warme Tage und entspannte Eleganz.',
        features: [
            '100% reines irisches Leinen',
            'Lockerer, eleganter Schnitt',
            'Zwei große Vordertaschen',
            'Verstellbare Seitenbündel',
            'Klassischer Knopfverschluss',
            'Natürliche Farbvariationen für Authentizität'
        ],
        materials: [
            '100% irisches Leinen',
            'Naturbelassen und atmungsaktiv',
            'Umweltfreundlich'
        ],
        care: [
            'Maschinenwäsche bei 30°C',
            'Mit ähnlichen Farben waschen',
            'Flach oder hängend trocknen',
            'Leicht dampfen oder mit feuchtem Tuch glätten'
        ]
    },
    'Oversized Hoodie': {
        description: 'Das Oversized Hoodie ist das urbane Kultur-Stück schlechthin. Mit seinem entspannten Schnitt und Premium-Baumwolle bietet es maximalen Komfort ohne dabei Style zu opfern. Perfekt für Streetwear-Enthusiasten, die es casual und cool mögen.',
        features: [
            '100% hochwertige Baumwolle',
            'Oversized, entspannter Schnitt',
            'Kangaroo-Frontpocket mit Rei\u00dfverschluss',
            'Verstellbare Kordelz\u00fcge in Kapuze',
            'Geb\u00fcrstete Innenseite f\u00fcr Extra-Komfort',
            'Langlebige Flatlock-N\u00e4hte'
        ],
        materials: [
            '100% Bio-Baumwolle',
            '280 g/m\u00b2 Gewicht',
            'Strapazierfähig und formstabil'
        ],
        care: [
            'Maschinenwäsche bei 30°C',
            'Umkehren vor dem Waschen',
            'Tumbler auf niedriger Temperatur oder h\u00e4ngend trocknen',
            'Bei niedriger Temperatur bügeln, falls n\u00f6tig'
        ]
    },
    'T-Shirt': {
        description: 'Dieses Limited-Edition Graphic T-Shirt ist mehr als nur ein Kleidungsstück – es ist ein Statement. Mit hochwertiger Baumwolle und exklusiven Design-Prints, wird es zum Favoriten in jeder Garderobe. Limitierte St\u00fcckzahlen garantieren Exklusivit\u00e4t.',
        features: [
            '100% hochwertige Baumwolle',
            'Exklusives Limited-Edition Graphic',
            'Klassischer Rundhalsausschnitt',
            'Professionelle Druckverarbeitung',
            'Haltbare Farben durch spezielle Druck-Techniken',
            'Bequeme, klassische Passform'
        ],
        materials: [
            '100% Bio-Baumwolle',
            '150 g/m\u00b2 Leichtgewicht',
            'Sanfte Hautanf\u00fchligkeit'
        ],
        care: [
            'Maschinenwäsche bei 30°C (Schonwaschgang)',
            'Mit Grafik nach innen waschen',
            'Tumbler auf sehr niedriger Temperatur',
            'Nicht direkt auf der Grafik bügeln'
        ]
    },
    'Cargo Pants': {
        description: 'Die Cargo-Hose vereint Funktionalität mit modernem Streetwear-Style. Mit mehreren durchdachten Taschen bietet sie praktische L\u00f6sungen f\u00fcr Alltag und Abenteuer. Hochwertig verarbeitet und in zeitlosen Farben – ein Statement für den praktischen Fashionista.',
        features: [
            'Robustes Baumwoll-Canvas-Material',
            'Sechs funktionale Cargo-Taschen',
            'Verstellbare Seitenriegel f\u00fcr Fit',
            'Rei\u00dfverschluss-Details an den Beinen',
            'Tapered Silhouette f\u00fcr modernen Look',
            'Doppelte N\u00e4hte f\u00fcr Langlebigkeit'
        ],
        materials: [
            '100% Baumwoll-Canvas',
            '12 oz. Gewicht',
            'Strapazierfähig und wasserfest'
        ],
        care: [
            'Maschinenwäsche bei 40°C',
            'Mit ähnlichen Farben waschen',
            'Tumbler oder h\u00e4ngend trocknen',
            'Ausbügeln nur bei Bedarf'
        ]
    },
    'Trainerhose': {
        description: 'Die Trainerhose ist das moderne Athleisure-Essential das Komfort und Style perfekt verbindet. Mit ihrem tapered Cut und Premium-Materialien ist sie ideal f\u00fcr Training, Freizeit und entspannte Alltags-Eleganz. Zeitlos, vielseitig und absolut tragbar.',
        features: [
            'Premium Baumwolle-Polyester-Mix',
            'Tapered Schnitt mit modernem Appeal',
            'Zwei tiefe Vordertaschen',
            'Elastische R\u00fcckenseite mit Tunnelzug',
            'Rei\u00dfverschluss-Knöcheltaschen (optional)',
            'Softshell-Verarbeitung f\u00fcr Extra-Komfort'
        ],
        materials: [
            '80% Baumwolle, 20% Polyester',
            'Gewebt und gekämmt',
            'Atmungsaktiv und formstabil'
        ],
        care: [
            'Maschinenwäsche bei 30°C',
            'Mit ähnlichen Farben waschen',
            'Tumbler auf niedriger Temperatur',
            'Leicht ausbügeln falls gew\u00fcnscht'
        ]
    }
};

window.updateProductDetailContent = function updateProductDetailContent(productData, localeData = {}) {
    if (!productData) return;

    const productName = typeof translateProductName === 'function'
        ? translateProductName(productData.name)
        : productData.name;
    const streetwearNames = new Set(['Oversized Hoodie', 'T-Shirt', 'Cargo Pants', 'Jeans', 'Trainerhose']);
    const accessoryNames = new Set(['Ledergürtel']);
    const collectionKey = productData.collection || (streetwearNames.has(productData.name) ? 'streetwear' : accessoryNames.has(productData.name) ? 'collectionAccessories' : 'oldMoney');
    const productInfo = localeData.productDescriptions?.[productData.name] || productDatabase[productData.name];

    document.title = `${productName} - Joumonde`;
    const title = document.querySelector('.product-detail-title');
    const subtitle = document.querySelector('.product-detail-subtitle');
    if (title) title.textContent = productName;
    if (subtitle) subtitle.textContent = productInfo?.description || productData.description || '';

    const breadcrumb = document.querySelector('.breadcrumb');
    const breadcrumbLinks = breadcrumb?.querySelectorAll('a');
    if (breadcrumbLinks?.[0]) breadcrumbLinks[0].textContent = t('productHome');
    if (breadcrumbLinks?.[1]) {
        breadcrumbLinks[1].textContent = t(collectionKey);
        const collectionAnchor = collectionKey === 'streetwear' ? 'streetwear' : collectionKey === 'collectionAccessories' ? 'accessories' : 'old-money';
        breadcrumbLinks[1].href = `shop.html#${collectionAnchor}`;
    }
    const breadcrumbProduct = breadcrumb?.querySelector('span:last-child');
    if (breadcrumbProduct) breadcrumbProduct.textContent = productName;

    const priceNote = document.querySelector('.price-vat');
    if (priceNote) priceNote.textContent = t('productPriceVat');
    const sizeLabel = document.querySelector('.product-detail-size label');
    if (sizeLabel?.firstChild?.nodeType === Node.TEXT_NODE) sizeLabel.firstChild.textContent = `${t('productSizeLabel')} `;
    const sizeGuideLink = document.querySelector('.size-guide-link-detail');
    if (sizeGuideLink) sizeGuideLink.textContent = t('productSizeGuide');
    const colorLabel = document.querySelector('.product-detail-color label');
    if (colorLabel?.firstChild?.nodeType === Node.TEXT_NODE) colorLabel.firstChild.textContent = `${t('productColorLabel')} `;
    const quantityLabel = document.querySelector('.product-detail-quantity label');
    if (quantityLabel) quantityLabel.textContent = t('productQuantityLabel');
    document.querySelector('.zoom-btn')?.setAttribute('aria-label', t('productZoom'));
    const quantityButtons = document.querySelectorAll('.quantity-selector button');
    if (quantityButtons[0]) quantityButtons[0].setAttribute('aria-label', t('productDecreaseQuantity'));
    if (quantityButtons[1]) quantityButtons[1].setAttribute('aria-label', t('productIncreaseQuantity'));
    const addToCartButton = document.querySelector('.btn-add-to-cart');
    const addToCartText = addToCartButton && Array.from(addToCartButton.childNodes).find(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    if (addToCartText) addToCartText.textContent = `\n                            ${t('addToCart')}\n                        `;
    document.querySelector('.btn-add-to-wishlist')?.setAttribute('aria-label', t('wishlistAria'));

    const mainImage = document.querySelector('#mainImage img');
    if (mainImage) mainImage.alt = productName;
    const firstThumbnailImage = document.querySelector('.thumbnail.active img');
    if (firstThumbnailImage) firstThumbnailImage.alt = productName;
    document.querySelectorAll('.thumbnail .product-placeholder').forEach((placeholder, index) => {
        placeholder.textContent = t('productImageLabel').replace('{number}', String(index + 1));
    });
    const mainImagePlaceholder = document.querySelector('#mainImage .product-placeholder');
    if (mainImagePlaceholder) mainImagePlaceholder.textContent = t('productMainImagePlaceholder');

    const selectedColor = document.getElementById('selectedColor');
    if (selectedColor && typeof translateColorName === 'function') selectedColor.textContent = translateColorName(selectedColor.textContent);
    document.querySelectorAll('.color-option').forEach(option => {
        const color = option.getAttribute('title');
        if (color && typeof translateColorName === 'function') {
            const translatedColor = translateColorName(color);
            option.title = translatedColor;
            option.setAttribute('aria-label', `${t('productColorLabel')} ${translatedColor}`);
        }
    });

    const featureKeys = ['productFeatureShipping', 'productFeatureReturns', 'productFeaturePayment'];
    document.querySelectorAll('.product-features .feature-item span').forEach((feature, index) => {
        if (featureKeys[index]) feature.textContent = t(featureKeys[index]);
    });
    const accordionKeys = ['productDescriptionTitle', 'productMaterialsCareTitle', 'productShippingReturnsTitle'];
    document.querySelectorAll('.product-details-accordion .accordion-header span').forEach((heading, index) => {
        if (accordionKeys[index]) heading.textContent = t(accordionKeys[index]);
    });
    const materialLabel = document.querySelector('#product-material-list')?.previousElementSibling?.querySelector('strong');
    const careLabel = document.querySelector('#product-care-list')?.previousElementSibling?.querySelector('strong');
    if (materialLabel) materialLabel.textContent = t('productMaterialLabel');
    if (careLabel) careLabel.textContent = t('productCareLabel');
    const shippingPolicyText = document.getElementById('shippingPolicyText');
    const shippingPolicyLink = document.getElementById('shippingPolicyLink');
    if (shippingPolicyText) shippingPolicyText.textContent = t('productShippingPolicyText');
    if (shippingPolicyLink) shippingPolicyLink.textContent = t('productShippingPolicyLink');

    if (productInfo) {
        const renderList = (selector, items) => {
            const list = document.querySelector(selector);
            if (!list || !Array.isArray(items)) return;
            list.replaceChildren(...items.map(text => {
                const item = document.createElement('li');
                item.textContent = text;
                return item;
            }));
        };
        const description = document.getElementById('product-main-description');
        if (description) description.textContent = productInfo.description;
        renderList('#product-features-list', productInfo.features);
        renderList('#product-material-list', productInfo.materials);
        renderList('#product-care-list', productInfo.care);
    }

    const reviewsTitle = document.querySelector('#reviews .section-title');
    const reviewsEmpty = document.getElementById('reviewsEmpty');
    const reviewEligibility = document.getElementById('reviewEligibility');
    const writeReviewButton = document.getElementById('writeReviewButton');
    if (reviewsTitle) reviewsTitle.textContent = t('reviewsTitle');
    if (reviewsEmpty) reviewsEmpty.textContent = t('reviewsEmpty');
    if (reviewEligibility) reviewEligibility.textContent = t('reviewAfterVerifiedDelivery');
    if (writeReviewButton) writeReviewButton.textContent = t('reviewButton');
    updateReviewControlsLanguage();
    const reviewModal = document.getElementById('review-modal');
    if (reviewModal) {
        const modalTitle = reviewModal.querySelector('h2');
        const ratingLabel = reviewModal.querySelector('.review-form .form-group > label');
        const titleInput = reviewModal.querySelector('input[name="title"]');
        const reviewInput = reviewModal.querySelector('textarea[name="reviewText"]');
        const submitButton = reviewModal.querySelector('button[type="submit"]');
        if (modalTitle) modalTitle.textContent = t('reviewFormTitle');
        if (ratingLabel) ratingLabel.textContent = t('reviewRatingLabel');
        if (titleInput) titleInput.placeholder = t('reviewTitlePlaceholder');
        if (reviewInput) reviewInput.placeholder = t('reviewTextPlaceholder');
        if (submitButton) submitButton.textContent = t('reviewSubmit');
    }

};

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
function getCanonicalDetailProductName() {
    const productData = JSON.parse(sessionStorage.getItem('selectedProduct') || 'null');
    return productData?.name || document.querySelector('.product-detail-title')?.textContent || '';
}

function addToCartFromDetail() {
    const productName = getCanonicalDetailProductName();
    const price = parseFloat(document.querySelector('.current-price').getAttribute('data-price'));
    const quantity = parseInt(document.getElementById('quantity').value);
    
    // Add to cart with size and color
    for (let i = 0; i < quantity; i++) {
        addToCart(productName, price, selectedColor, selectedSize);
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
    const productName = getCanonicalDetailProductName();
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

let eligibleReviewOrderId = null;
let productReviews = [];
let currentReviewPage = 1;
let currentReviewSortOrder = 'highest';
const REVIEWS_PER_PAGE = 5;

function getDetailProductName() {
    const selectedProduct = JSON.parse(sessionStorage.getItem('selectedProduct') || 'null');
    return selectedProduct?.name || document.querySelector('.product-detail-title')?.textContent.trim() || '';
}

function getReviewLocale() {
    return { de: 'de-CH', en: 'en-GB', fr: 'fr-CH' }[currentLanguage] || 'de-CH';
}

async function invokeProductReviews(body) {
    if (!window.supabaseClient?.functions) return { data: null, error: new Error('review_service_unavailable') };
    return window.supabaseClient.functions.invoke('product-reviews', { body });
}

function setReviewEligibilityMessage(key) {
    const message = document.getElementById('reviewEligibility');
    if (message) message.textContent = t(key);
}

async function loadReviewEligibility(productName) {
    const button = document.getElementById('writeReviewButton');
    eligibleReviewOrderId = null;
    if (button) {
        button.hidden = true;
        button.style.display = 'none';
    }

    const client = window.supabaseClient;
    if (!client?.auth) {
        setReviewEligibilityMessage('reviewEligibilityUnavailable');
        return;
    }

    const { data: sessionData } = await client.auth.getSession();
    if (!sessionData?.session) {
        setReviewEligibilityMessage('reviewSignInRequired');
        return;
    }

    const { data, error } = await invokeProductReviews({ action: 'eligibility', productName });
    if (error) {
        setReviewEligibilityMessage('reviewEligibilityUnavailable');
        return;
    }

    eligibleReviewOrderId = data?.eligibleOrderIds?.[0] || null;
    if (eligibleReviewOrderId && button) {
        button.hidden = false;
        button.style.display = '';
        setReviewEligibilityMessage('reviewEligible');
    } else {
        setReviewEligibilityMessage('reviewAfterVerifiedDelivery');
    }
}

async function loadReviews() {
    const reviewList = document.getElementById('reviewList');
    const summary = document.getElementById('reviewSummary');
    const emptyState = document.getElementById('reviewsEmpty');
    const productName = getDetailProductName();
    if (!reviewList || !productName) return;

    await loadLanguage(currentLanguage);
    updateReviewControlsLanguage();
    const { data, error } = await invokeProductReviews({ action: 'list', productName });
    productReviews = error ? [] : (Array.isArray(data?.reviews) ? data.reviews : []);
    currentReviewPage = 1;

    if (summary) {
        summary.replaceChildren();
        summary.hidden = false;
        summary.style.display = '';
        renderReviewSummary(summary, productReviews);
    }
    if (emptyState) {
        emptyState.hidden = productReviews.length > 0;
        emptyState.textContent = error ? t('reviewListUnavailable') : t('reviewsEmpty');
    }

    const toolbar = document.getElementById('reviewsToolbar');
    if (toolbar) toolbar.hidden = productReviews.length === 0;
    renderReviewList();
    await loadReviewEligibility(productName);
}

function updateReviewControlsLanguage() {
    const sortOrder = document.getElementById('reviewSortOrder');
    if (sortOrder) {
        const optionKeys = ['reviewSortHighest', 'reviewSortNewest', 'reviewSortOldest', 'reviewSortLowest'];
        optionKeys.forEach((key, index) => {
            if (sortOrder.options[index]) sortOrder.options[index].textContent = t(key);
        });
    }
    const sortLabel = document.querySelector('label[for="reviewSortOrder"]');
    if (sortLabel) sortLabel.textContent = t('reviewSortLabel');
    const pagination = document.getElementById('reviewPagination');
    if (pagination) pagination.setAttribute('aria-label', t('reviewPaginationLabel'));
}

function renderReviewSummary(summary, reviews) {
    const distribution = [5, 4, 3, 2, 1].map(rating => ({
        rating,
        count: reviews.filter(review => Number(review.rating) === rating).length
    }));
    const average = reviews.length
        ? reviews.reduce((total, review) => total + Number(review.rating), 0) / reviews.length
        : 0;

    const overall = document.createElement('div');
    overall.className = 'summary-rating';
    const score = document.createElement('div');
    score.className = 'average-rating';
    score.textContent = t('reviewAverage').replace('{average}', average.toFixed(2));
    const stars = document.createElement('div');
    stars.className = 'stars-large';
    stars.textContent = `${'★'.repeat(Math.round(average))}${'☆'.repeat(5 - Math.round(average))}`;
    stars.setAttribute('aria-label', t('reviewStarsOutOfFive').replace('{rating}', average.toFixed(2)));
    const count = document.createElement('p');
    count.textContent = t('reviewCount').replace('{count}', String(reviews.length));
    overall.append(score, stars, count);

    const bars = document.createElement('div');
    bars.className = 'rating-distribution';
    distribution.forEach(({ rating, count: ratingCount }) => {
        const row = document.createElement('div');
        row.className = 'rating-bar';
        const label = document.createElement('span');
        label.className = 'rating-bar-label';
        label.textContent = `${rating} ★`;
        const bar = document.createElement('div');
        bar.className = 'bar';
        const fill = document.createElement('div');
        fill.className = 'fill';
        fill.style.width = `${reviews.length ? (ratingCount / reviews.length) * 100 : 0}%`;
        bar.append(fill);
        const total = document.createElement('span');
        total.className = 'rating-bar-count';
        total.textContent = String(ratingCount);
        row.append(label, bar, total);
        bars.append(row);
    });

    summary.append(overall, bars);
}

function setReviewSortOrder(sortOrder) {
    currentReviewSortOrder = sortOrder;
    currentReviewPage = 1;
    renderReviewList();
}

function renderReviewList() {
    const reviewList = document.getElementById('reviewList');
    const pagination = document.getElementById('reviewPagination');
    if (!reviewList || !pagination) return;

    const sortedReviews = [...productReviews];
    const dateValue = review => new Date(review.created_at).getTime() || 0;
    switch (currentReviewSortOrder) {
        case 'newest':
            sortedReviews.sort((a, b) => dateValue(b) - dateValue(a));
            break;
        case 'oldest':
            sortedReviews.sort((a, b) => dateValue(a) - dateValue(b));
            break;
        case 'lowest':
            sortedReviews.sort((a, b) => Number(a.rating) - Number(b.rating));
            break;
        default:
            sortedReviews.sort((a, b) => Number(b.rating) - Number(a.rating));
    }

    const pageCount = Math.ceil(sortedReviews.length / REVIEWS_PER_PAGE);
    currentReviewPage = Math.min(Math.max(currentReviewPage, 1), Math.max(pageCount, 1));
    const pageStart = (currentReviewPage - 1) * REVIEWS_PER_PAGE;
    reviewList.replaceChildren(...sortedReviews
        .slice(pageStart, pageStart + REVIEWS_PER_PAGE)
        .map(createReviewElement));

    pagination.replaceChildren();
    pagination.hidden = pageCount <= 1;
    if (pageCount <= 1) return;

    const addPageButton = (label, page, isActive = false, ariaLabel = '') => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `review-page-button${isActive ? ' active' : ''}`;
        button.textContent = label;
        button.disabled = isActive;
        if (ariaLabel) button.setAttribute('aria-label', ariaLabel);
        button.addEventListener('click', () => {
            currentReviewPage = page;
            renderReviewList();
        });
        pagination.append(button);
    };

    if (currentReviewPage > 1) {
        addPageButton('‹', currentReviewPage - 1, false, t('reviewPreviousPage'));
    }
    const firstVisiblePage = Math.max(1, Math.min(currentReviewPage - 2, pageCount - 4));
    const lastVisiblePage = Math.min(pageCount, firstVisiblePage + 4);
    for (let page = firstVisiblePage; page <= lastVisiblePage; page += 1) {
        addPageButton(String(page), page, page === currentReviewPage, `${t('reviewPage')} ${page}`);
    }
    if (currentReviewPage < pageCount) {
        addPageButton('›', currentReviewPage + 1, false, t('reviewNextPage'));
    }
}

function createReviewElement(review) {
    const reviewDiv = document.createElement('article');
    reviewDiv.className = 'review-item verified';
    const safeName = escapeHtml(review.display_name || '');
    const stars = '★'.repeat(Number(review.rating)) + '☆'.repeat(5 - Number(review.rating));
    const dateStr = new Date(review.created_at).toLocaleDateString(getReviewLocale());
    reviewDiv.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <div class="reviewer-avatar">${escapeHtml(safeName.split(' ').map(part => part[0] || '').join('').toUpperCase())}</div>
                <div>
                    <div class="reviewer-name">${safeName}</div>
                    <div class="review-verified">✓ ${escapeHtml(t('reviewVerifiedPurchase'))}</div>
                </div>
            </div>
            <div class="review-meta">
                <div class="review-stars">${stars}</div>
                <div class="review-date">${dateStr}</div>
            </div>
        </div>
        <h4 class="review-title">${escapeHtml(review.title || '')}</h4>
        <p class="review-text">${escapeHtml(review.review_text || '')}</p>
    `;
    return reviewDiv;
}

function openReviewForm() {
    if (!eligibleReviewOrderId) return;
    document.getElementById('review-modal').style.display = 'flex';
}

function closeReviewForm() {
    document.getElementById('review-modal').style.display = 'none';
}

async function submitReview(event) {
    event.preventDefault();
    if (!eligibleReviewOrderId) {
        setReviewEligibilityMessage('reviewAfterVerifiedDelivery');
        return;
    }

    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) submitButton.disabled = true;

    const { data, error } = await invokeProductReviews({
        action: 'submit',
        orderId: eligibleReviewOrderId,
        productName: getDetailProductName(),
        rating: Number(formData.get('rating')),
        title: String(formData.get('title') || ''),
        reviewText: String(formData.get('reviewText') || '')
    });

    if (submitButton) submitButton.disabled = false;
    if (error) {
        let errorCode = data?.error;
        try {
            errorCode ||= (await error.context?.clone?.().json())?.error;
        } catch {}
        const messageKey = errorCode === 'content_rejected'
            ? 'reviewContentRejected'
            : errorCode === 'review_already_submitted'
            ? 'reviewAlreadySubmitted'
            : errorCode === 'purchase_not_eligible'
            ? 'reviewAfterVerifiedDelivery'
            : 'reviewSubmitError';
        showNotification(t(messageKey), 'error');
        return;
    }

    showNotification(t('reviewPendingModeration'), 'success');
    form.reset();
    closeReviewForm();
    await loadReviews();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadReviews();
    
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
