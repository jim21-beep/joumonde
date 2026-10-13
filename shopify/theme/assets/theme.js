(function () {
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var HAMBURGER = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
  var CLOSE = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

  /* Navigation */
  var menuBtn = qs('[data-mobile-menu]');
  var navLinks = qs('[data-nav-links]');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      var open = navLinks.classList.toggle('mobile-active');
      menuBtn.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
      menuBtn.innerHTML = open ? CLOSE : HAMBURGER;
    });
  }
  var dd = qs('[data-nav-dropdown]');
  if (dd) {
    dd.addEventListener('click', function () {
      var li = document.getElementById('nav-dropdown-kollektionen');
      var open = li.classList.toggle('open');
      dd.setAttribute('aria-expanded', String(open));
    });
  }

  /* Hero-Button scrollt zur Kollektion */
  qsa('[data-scroll-to]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = qs(btn.getAttribute('data-scroll-to'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* Filter und Sortierung je Kollektionsblock */
  qsa('[data-collection-block]').forEach(function (block) {
    var sidebar = qs('[data-filter-sidebar]', block);
    var grid = qs('[data-product-grid]', block);
    var cards = qsa('.product-card', block);
    var minEl = qs('[data-min]', block);
    var maxEl = qs('[data-max]', block);
    var rangeEl = qs('[data-range]', block);
    var rangeVal = qs('[data-range-value]', block);

    qsa('[data-filter-toggle]', block).forEach(function (btn) {
      btn.addEventListener('click', function () { sidebar.classList.toggle('active'); });
    });

    function apply() {
      var min = parseFloat(minEl.value) || 0;
      var max = parseFloat(maxEl.value) || Infinity;
      var sizes = qsa('[data-size]:checked', block).map(function (i) { return i.value.toLowerCase(); });
      var colors = qsa('[data-color]:checked', block).map(function (i) { return i.value.toLowerCase(); });
      cards.forEach(function (card) {
        var price = parseFloat(card.getAttribute('data-price')) || 0;
        var cSizes = (card.getAttribute('data-sizes') || '').toLowerCase().split(',');
        var cColors = (card.getAttribute('data-colors') || '').toLowerCase().split(',');
        var ok = price >= min && price <= max;
        if (ok && sizes.length) ok = sizes.some(function (s) { return cSizes.indexOf(s) > -1; });
        if (ok && colors.length) ok = colors.some(function (c) {
          return cColors.indexOf(c) > -1 || (c === 'weiß' && cColors.indexOf('weiss') > -1);
        });
        card.style.display = ok ? '' : 'none';
      });
    }

    qsa('input', sidebar).forEach(function (input) {
      input.addEventListener('change', apply);
    });
    if (rangeEl) {
      rangeEl.addEventListener('input', function () {
        rangeVal.textContent = rangeEl.value;
        maxEl.value = rangeEl.value;
        apply();
      });
    }
    var reset = qs('[data-filter-reset]', block);
    if (reset) {
      reset.addEventListener('click', function () {
        qsa('input[type=checkbox]', sidebar).forEach(function (i) { i.checked = false; });
        minEl.value = '';
        maxEl.value = '';
        rangeEl.value = rangeEl.max;
        rangeVal.textContent = rangeEl.max;
        apply();
      });
    }

    var sort = qs('[data-sort]', block);
    if (sort) {
      sort.addEventListener('change', function () {
        var by = sort.value;
        var list = cards.slice();
        list.sort(function (a, b) {
          var pa = parseFloat(a.getAttribute('data-price')), pb = parseFloat(b.getAttribute('data-price'));
          if (by === 'price-asc') return pa - pb;
          if (by === 'price-desc') return pb - pa;
          if (by === 'name-asc') return a.getAttribute('data-title').localeCompare(b.getAttribute('data-title'), 'de');
          if (by === 'newest') return Number(b.getAttribute('data-created')) - Number(a.getAttribute('data-created'));
          return cards.indexOf(a) - cards.indexOf(b);
        });
        list.forEach(function (card) { grid.appendChild(card); });
      });
    }
  });

  /* Produktseite */
  qsa('[data-accordion]').forEach(function (header) {
    header.addEventListener('click', function () {
      var content = header.nextElementSibling;
      header.classList.toggle('active');
      if (content) content.classList.toggle('active');
    });
  });

  var product = qs('[data-product]');
  if (!product) return;

  var main = qs('[data-gallery-main]', product);
  qsa('[data-thumb]', product).forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      if (main) main.src = thumb.getAttribute('data-thumb');
      qsa('.thumbnail', product).forEach(function (t) { t.classList.remove('active'); });
      thumb.classList.add('active');
    });
  });

  var qty = qs('#quantity', product);
  var minus = qs('[data-qty-minus]', product);
  var plus = qs('[data-qty-plus]', product);
  if (qty && minus && plus) {
    minus.addEventListener('click', function () { qty.value = Math.max(1, Number(qty.value) - 1); });
    plus.addEventListener('click', function () { qty.value = Math.min(5, Number(qty.value) + 1); });
  }

  var variantsNode = qs('[data-variants]', product);
  var idInput = qs('[data-variant-id]', product);
  var priceNode = qs('[data-price]', product);
  var button = qs('[data-add-button]', product);
  var label = qs('[data-add-label]', product);
  if (!variantsNode || !idInput) return;

  var variants = JSON.parse(variantsNode.textContent);
  var currency = product.getAttribute('data-currency') || 'CHF';
  var chosen = [];
  qsa('[data-option-index].active', product).forEach(function (el) {
    chosen[Number(el.getAttribute('data-option-index'))] = el.getAttribute('data-value');
  });

  function formatPrice(cents) {
    return new Intl.NumberFormat('de-CH', { style: 'currency', currency: currency }).format(cents / 100);
  }

  function update() {
    var match = variants.find(function (v) {
      return v.options.every(function (value, i) { return chosen[i] === value; });
    });
    if (!match) {
      if (button) button.disabled = true;
      if (label) label.textContent = 'Nicht verfügbar';
      return;
    }
    idInput.value = match.id;
    if (priceNode) priceNode.textContent = formatPrice(match.price);
    if (button) button.disabled = !match.available;
    if (label) label.textContent = match.available ? 'In den Warenkorb' : 'Ausverkauft';
    var url = new URL(window.location.href);
    url.searchParams.set('variant', match.id);
    window.history.replaceState({}, '', url.toString());
  }

  qsa('[data-option-index]', product).forEach(function (el) {
    el.addEventListener('click', function () {
      var index = Number(el.getAttribute('data-option-index'));
      qsa('[data-option-index="' + index + '"]', product).forEach(function (o) { o.classList.remove('active'); });
      el.classList.add('active');
      chosen[index] = el.getAttribute('data-value');
      var lbl = qs('[data-selected-label="' + index + '"]', product);
      if (lbl) lbl.textContent = chosen[index];
      update();
    });
  });
})();
