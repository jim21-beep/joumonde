(function initializeShopCollectionPage() {
    const collection = new URLSearchParams(window.location.search).get('collection');
    const collectionTargets = {
        'old-money': {
            title: 'Old Money Collection | Joumonde'
        },
        casual: {
            title: 'Casual Collection | Joumonde'
        }
    };
    const page = Object.prototype.hasOwnProperty.call(collectionTargets, collection)
        ? collectionTargets[collection]
        : null;

    if (!page) return;

    document.body.dataset.shopCollection = collection;
    document.title = page.title;

    const categoryLink = document.querySelector(`.nav-links a[href="shop.html?collection=${collection}"]`);
    if (categoryLink) categoryLink.setAttribute('aria-current', 'page');
})();
