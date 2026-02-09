/**
 * Analytics Tracking Helper Functions
 * Tracks e-commerce events and user interactions
 */

// Check if gtag is available
function isGtagAvailable() {
    return typeof gtag !== 'undefined';
}

// Track page view
function trackPageView(pagePath, pageTitle) {
    if (isGtagAvailable()) {
        gtag('event', 'page_view', {
            page_path: pagePath,
            page_title: pageTitle
        });
    }
}

// Track add to cart event
function trackAddToCart(productName, price, quantity = 1) {
    if (isGtagAvailable()) {
        gtag('event', 'add_to_cart', {
            currency: 'CHF',
            value: price * quantity,
            items: [{
                item_name: productName,
                price: price,
                quantity: quantity
            }]
        });
        
        console.log('Analytics: Add to cart tracked -', productName);
    }
}

// Track remove from cart event
function trackRemoveFromCart(productName, price, quantity = 1) {
    if (isGtagAvailable()) {
        gtag('event', 'remove_from_cart', {
            currency: 'CHF',
            value: price * quantity,
            items: [{
                item_name: productName,
                price: price,
                quantity: quantity
            }]
        });
    }
}

// Track begin checkout event
function trackBeginCheckout(cartItems, total) {
    if (isGtagAvailable()) {
        const items = cartItems.map(item => ({
            item_name: item.name,
            price: item.price,
            quantity: item.quantity
        }));
        
        gtag('event', 'begin_checkout', {
            currency: 'CHF',
            value: total,
            items: items
        });
        
        console.log('Analytics: Begin checkout tracked - Total:', total);
    }
}

// Track purchase/order completion
function trackPurchase(orderId, cartItems, total, discount = 0) {
    if (isGtagAvailable()) {
        const items = cartItems.map(item => ({
            item_name: item.name,
            price: item.price,
            quantity: item.quantity
        }));
        
        gtag('event', 'purchase', {
            transaction_id: orderId,
            currency: 'CHF',
            value: total,
            tax: 0,
            shipping: 0,
            items: items,
            coupon: discount > 0 ? 'TRACKSUIT_DISCOUNT' : undefined
        });
        
        console.log('Analytics: Purchase tracked -', orderId, 'Total:', total);
    }
}

// Track view item event (product detail page)
function trackViewItem(productName, price, category) {
    if (isGtagAvailable()) {
        gtag('event', 'view_item', {
            currency: 'CHF',
            value: price,
            items: [{
                item_name: productName,
                item_category: category,
                price: price
            }]
        });
        
        console.log('Analytics: View item tracked -', productName);
    }
}

// Track search event
function trackSearch(searchTerm, resultsCount) {
    if (isGtagAvailable()) {
        gtag('event', 'search', {
            search_term: searchTerm,
            results_count: resultsCount
        });
    }
}

// Track newsletter signup
function trackNewsletterSignup(email) {
    if (isGtagAvailable()) {
        gtag('event', 'newsletter_signup', {
            method: 'email',
            email: email
        });
        
        console.log('Analytics: Newsletter signup tracked');
    }
}

// Track user login
function trackLogin(method = 'email') {
    if (isGtagAvailable()) {
        gtag('event', 'login', {
            method: method
        });
        
        console.log('Analytics: Login tracked -', method);
    }
}

// Track user registration
function trackSignup(method = 'email') {
    if (isGtagAvailable()) {
        gtag('event', 'sign_up', {
            method: method
        });
        
        console.log('Analytics: Signup tracked -', method);
    }
}

// Track social share
function trackSocialShare(platform, contentUrl) {
    if (isGtagAvailable()) {
        gtag('event', 'share', {
            method: platform,
            content_type: 'product',
            item_id: contentUrl
        });
    }
}

// Track custom event
function trackCustomEvent(eventName, parameters = {}) {
    if (isGtagAvailable()) {
        gtag('event', eventName, parameters);
        
        console.log('Analytics: Custom event tracked -', eventName);
    }
}
