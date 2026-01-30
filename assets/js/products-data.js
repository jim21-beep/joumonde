/**
 * Joumonde Product Catalog
 * 
 * Central data source for all products.
 * Edit this file to add, remove, or modify products.
 */

const PRODUCTS = [
    // ==================== OLD MONEY COLLECTION ====================
    {
        id: 'blazer-001',
        name: 'Klassischer Blazer',
        description: 'Eleganter Woll-Blazer in Navy',
        price: 79.99,
        originalPrice: null,
        category: 'old-money',
        image: 'assets/images/klassischer_blazer.png',
        badge: 'new', // 'new', 'sale', 'limited', or null
        rating: 5,
        reviews: 48,
        colors: [
            { id: 'black', name: 'Schwarz', hex: '#000000' },
            { id: 'white', name: 'Weiß', hex: '#ffffff' },
            { id: 'navy', name: 'Navy', hex: '#001f3f' },
            { id: 'gray', name: 'Grau', hex: '#808080' },
            { id: 'beige', name: 'Beige', hex: '#f5f5dc' },
            { id: 'burgundy', name: 'Burgundy', hex: '#800020' },
            { id: 'camel', name: 'Camel', hex: '#C19A6B' }
        ],
        defaultColor: 'black',
        sizes: ['S', 'M', 'L', 'XL'],
        defaultSize: 'M'
    },
    {
        id: 'polo-001',
        name: 'Polo Hemd',
        description: 'Premium Baumwolle in Weiß',
        price: 34.99,
        originalPrice: null,
        category: 'old-money',
        image: 'assets/images/polo.png',
        badge: null,
        rating: 4,
        reviews: 32,
        colors: [
            { id: 'white', name: 'Weiß', hex: '#ffffff' },
            { id: 'navy', name: 'Navy', hex: '#001f3f' },
            { id: 'black', name: 'Schwarz', hex: '#000000' }
        ],
        defaultColor: 'white',
        sizes: ['S', 'M', 'L', 'XL'],
        defaultSize: 'M'
    },
    {
        id: 'chino-001',
        name: 'Chino Hose',
        description: 'Slim-Fit in Khaki',
        price: 51.99,
        originalPrice: 64.99,
        category: 'old-money',
        image: 'assets/images/chino_hose.png',
        badge: 'sale',
        rating: 5,
        reviews: 56,
        colors: [
            { id: 'camel', name: 'Camel', hex: '#C19A6B' },
            { id: 'beige', name: 'Beige', hex: '#f5f5dc' },
            { id: 'gray', name: 'Grau', hex: '#808080' },
            { id: 'black', name: 'Schwarz', hex: '#000000' }
        ],
        defaultColor: 'camel',
        sizes: ['30', '32', '34', '36'],
        defaultSize: '34'
    },
    {
        id: 'weste-001',
        name: 'Elegante Weste',
        description: 'Premium Woll-Weste in Creme',
        price: 69.99,
        originalPrice: null,
        category: 'old-money',
        image: 'assets/images/weste.png',
        badge: null,
        rating: 5,
        reviews: 28,
        colors: [
            { id: 'beige', name: 'Creme', hex: '#f5f5dc' },
            { id: 'navy', name: 'Navy', hex: '#001f3f' },
            { id: 'gray', name: 'Grau', hex: '#808080' },
            { id: 'black', name: 'Schwarz', hex: '#000000' }
        ],
        defaultColor: 'beige',
        sizes: ['S', 'M', 'L', 'XL'],
        defaultSize: 'M'
    },
    {
        id: 'quarterzip-001',
        name: 'Quarter Zipper Pullover',
        description: 'Kaschmir-Mix mit Reißverschluss',
        price: 79.99,
        originalPrice: null,
        category: 'old-money',
        image: 'assets/images/quarter_zipper.png',
        badge: null,
        rating: 4,
        reviews: 35,
        colors: [
            { id: 'beige', name: 'Creme', hex: '#f5f5dc' },
            { id: 'navy', name: 'Navy', hex: '#001f3f' },
            { id: 'gray', name: 'Grau', hex: '#808080' },
            { id: 'black', name: 'Schwarz', hex: '#000000' }
        ],
        defaultColor: 'beige',
        sizes: ['S', 'M', 'L', 'XL'],
        defaultSize: 'M'
    },
    {
        id: 'pullover-001',
        name: 'Strickpullover',
        description: 'Kaschmir in Dunkelblau',
        price: 89.99,
        originalPrice: null,
        category: 'old-money',
        image: 'assets/images/kashmir_pullover.png',
        badge: null,
        rating: 4,
        reviews: 41,
        colors: [
            { id: 'darkblue', name: 'Dunkelblau', hex: '#2c3e50' },
            { id: 'white', name: 'Weiß', hex: '#ffffff' },
            { id: 'gray', name: 'Grau', hex: '#808080' },
            { id: 'beige', name: 'Beige', hex: '#f5f5dc' }
        ],
        defaultColor: 'darkblue',
        sizes: ['S', 'M', 'L', 'XL'],
        defaultSize: 'M'
    },

    // ==================== STREETWEAR COLLECTION ====================
    {
        id: 'hoodie-001',
        name: 'Oversized Hoodie',
        description: 'Premium Cotton in Schwarz',
        price: 49.99,
        originalPrice: null,
        category: 'streetwear',
        image: 'assets/images/hoodie.png',
        badge: null,
        rating: 5,
        reviews: 89,
        colors: [
            { id: 'black', name: 'Schwarz', hex: '#000000' },
            { id: 'white', name: 'Weiß', hex: '#ffffff' },
            { id: 'gray', name: 'Grau', hex: '#808080' },
            { id: 'navy', name: 'Navy', hex: '#001f3f' },
            { id: 'olive', name: 'Olive', hex: '#556B2F' },
            { id: 'beige', name: 'Beige', hex: '#f5f5dc' }
        ],
        defaultColor: 'black',
        sizes: ['S', 'M', 'L', 'XL'],
        defaultSize: 'L'
    },
    {
        id: 'tshirt-001',
        name: 'T-Shirt',
        description: 'Limited Edition Print',
        price: 24.99,
        originalPrice: null,
        category: 'streetwear',
        image: null, // placeholder
        imagePlaceholder: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
        badge: 'new',
        rating: 4,
        reviews: 23,
        colors: [
            { id: 'black', name: 'Schwarz', hex: '#000000' },
            { id: 'white', name: 'Weiß', hex: '#ffffff' },
            { id: 'gray', name: 'Grau', hex: '#808080' },
            { id: 'navy', name: 'Navy', hex: '#001f3f' },
            { id: 'olive', name: 'Olive', hex: '#556B2F' },
            { id: 'beige', name: 'Beige', hex: '#f5f5dc' }
        ],
        defaultColor: 'black',
        sizes: ['S', 'M', 'L', 'XL'],
        defaultSize: 'M'
    },
    {
        id: 'cargo-001',
        name: 'Cargo Pants',
        description: 'Multi-Pocket Design',
        price: 59.99,
        originalPrice: null,
        category: 'streetwear',
        image: null, // placeholder
        imagePlaceholder: 'linear-gradient(135deg, #4a69bd 0%, #3c5aa6 100%)',
        badge: null,
        rating: 4,
        reviews: 67,
        colors: [
            { id: 'black', name: 'Schwarz', hex: '#000000' },
            { id: 'white', name: 'Weiß', hex: '#ffffff' },
            { id: 'gray', name: 'Grau', hex: '#808080' },
            { id: 'navy', name: 'Navy', hex: '#001f3f' },
            { id: 'olive', name: 'Olive', hex: '#556B2F' },
            { id: 'beige', name: 'Beige', hex: '#f5f5dc' }
        ],
        defaultColor: 'black',
        sizes: ['30', '32', '34', '36'],
        defaultSize: '32'
    },
    {
        id: 'tracksuit-001',
        name: 'Trainerhose',
        description: 'Perfekt für Tracksuit Kombination',
        price: 44.99,
        originalPrice: null,
        category: 'streetwear',
        image: null, // placeholder
        imagePlaceholder: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        badge: null,
        rating: 4,
        reviews: 76,
        colors: [
            { id: 'black', name: 'Schwarz', hex: '#000000' },
            { id: 'white', name: 'Weiß', hex: '#ffffff' },
            { id: 'gray', name: 'Grau', hex: '#808080' },
            { id: 'navy', name: 'Navy', hex: '#001f3f' },
            { id: 'olive', name: 'Olive', hex: '#556B2F' },
            { id: 'beige', name: 'Beige', hex: '#f5f5dc' }
        ],
        defaultColor: 'black',
        sizes: ['S', 'M', 'L', 'XL'],
        defaultSize: 'L'
    }
];

/**
 * Get products by category
 * @param {string} category - 'old-money' or 'streetwear'
 * @returns {Array} Filtered products
 */
function getProductsByCategory(category) {
    return PRODUCTS.filter(p => p.category === category);
}

/**
 * Get product by ID
 * @param {string} id - Product ID
 * @returns {Object|null} Product object or null
 */
function getProductById(id) {
    return PRODUCTS.find(p => p.id === id) || null;
}

/**
 * Get product by name
 * @param {string} name - Product name
 * @returns {Object|null} Product object or null
 */
function getProductByName(name) {
    return PRODUCTS.find(p => p.name === name) || null;
}

/**
 * Search products by query
 * @param {string} query - Search query
 * @returns {Array} Matching products
 */
function searchProducts(query) {
    const q = query.toLowerCase();
    return PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
}
