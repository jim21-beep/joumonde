(function initializeInventoryDisplay() {
    let variants = [];

    function translate(key, fallback) {
        return typeof window.t === 'function' ? window.t(key) : fallback;
    }

    function normalize(value) {
        return String(value || '').trim().toLocaleLowerCase();
    }

    function setPurchaseState(state) {
        const status = document.getElementById('product-stock-status');
        const button = document.querySelector('.btn-add-to-cart');
        const label = button?.querySelector('[data-add-to-cart-label]');
        if (!status) return;

        status.dataset.preorder = String(state === 'preorder');
        if (button) {
            button.disabled = state === 'unavailable' || state === 'sold-out';
            if (label) {
                label.textContent = state === 'preorder'
                    ? translate('preorderButton', 'Vorbestellen')
                    : state === 'sold-out'
                        ? translate('inventorySoldOut', 'Ausverkauft')
                        : translate('addToCart', 'In den Warenkorb');
            }
        }
    }

    function renderSelectedVariantStock(size, color) {
        const status = document.getElementById('product-stock-status');
        if (!status) return;

        const selectedSize = size || document.getElementById('selectedSize')?.textContent;
        const selectedColor = color || document.getElementById('selectedColor')?.textContent;
        const variant = variants.find(item => (
            normalize(item.size) === normalize(selectedSize)
            && normalize(item.color) === normalize(selectedColor)
        ));

        if (!variant) {
            status.textContent = translate('inventoryUnavailable', 'Bestand derzeit nicht verfügbar');
            status.removeAttribute('data-stock-quantity');
            setPurchaseState('unavailable');
            return;
        }

        if (variant.stock_quantity === null) {
            status.textContent = translate('inventoryUnknown', 'Vorverkauf');
            status.removeAttribute('data-stock-quantity');
            const quantityInput = document.getElementById('quantity');
            if (quantityInput) quantityInput.max = '5';
            setPurchaseState('preorder');
            return;
        }

        const quantityInput = document.getElementById('quantity');
        if (quantityInput) {
            quantityInput.max = String(Math.max(1, Math.min(5, variant.stock_quantity)));
            if (Number(quantityInput.value) > Number(quantityInput.max)) quantityInput.value = quantityInput.max;
        }

        status.textContent = variant.stock_quantity === 0
            ? translate('inventorySoldOut', 'Ausverkauft')
            : translate('inventoryVariantCount', 'Noch {count} in dieser Variante verfügbar')
                .replace('{count}', String(variant.stock_quantity));
        status.dataset.stockQuantity = String(variant.stock_quantity);
        setPurchaseState(variant.stock_quantity === 0 ? 'sold-out' : 'available');
    }

    async function loadInventory() {
        const client = window.supabaseClient;
        if (!client) {
            const status = document.getElementById('product-stock-status');
            if (status) status.textContent = translate('inventoryUnavailable', 'Bestand derzeit nicht verfügbar');
            setPurchaseState('unavailable');
            console.error('Inventory display could not load: Supabase client is unavailable.');
            return;
        }

        const selectedProduct = JSON.parse(sessionStorage.getItem('selectedProduct') || 'null');
        const productName = selectedProduct?.name
            || document.querySelector('.product-detail-title')?.textContent.trim()
            || '';
        const { data, error } = await client
            .from('products')
            .select('name, product_variants(size, color, stock_quantity)')
            .eq('is_active', true)
            .eq('name', productName)
            .maybeSingle();
        if (error) {
            const status = document.getElementById('product-stock-status');
            if (status) status.textContent = translate('inventoryUnavailable', 'Bestand derzeit nicht verfügbar');
            setPurchaseState('unavailable');
            console.error('Inventory display could not load product stock:', error);
            return;
        }

        variants = (data?.product_variants || []).map(variant => ({
            size: variant.size,
            color: variant.color,
            stock_quantity: variant.stock_quantity === null ? null : Number(variant.stock_quantity)
        }));
        renderSelectedVariantStock();
    }

    window.updateSelectedVariantStock = renderSelectedVariantStock;
    document.addEventListener('DOMContentLoaded', () => {
        const status = document.getElementById('product-stock-status');
        if (!status) return;
        status.textContent = translate('inventoryLoading', 'Bestand wird geladen...');
        setPurchaseState('unavailable');
        loadInventory();
    });
})();
