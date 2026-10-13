(function () {
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.querySelector('[data-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var sort = document.querySelector('[data-sort-select]');
  if (sort) {
    sort.addEventListener('change', function () {
      var url = new URL(window.location.href);
      url.searchParams.set('sort_by', sort.value);
      url.searchParams.delete('page');
      window.location.href = url.toString();
    });
  }

  var product = document.querySelector('[data-product]');
  if (!product) return;

  var main = product.querySelector('[data-gallery-main]');
  product.querySelectorAll('[data-thumb]').forEach(function (thumb) {
    thumb.addEventListener('click', function () {
      if (main) main.src = thumb.getAttribute('data-thumb');
      product.querySelectorAll('.thumb').forEach(function (t) { t.classList.remove('is-active'); });
      thumb.classList.add('is-active');
    });
  });

  var variantsNode = product.querySelector('[data-variants]');
  var idInput = product.querySelector('[data-variant-id]');
  var priceNode = product.querySelector('[data-price]');
  var button = product.querySelector('[data-add-button]');
  if (!variantsNode || !idInput) return;

  var variants = JSON.parse(variantsNode.textContent);
  var currency = product.getAttribute('data-currency') || 'CHF';
  var radios = product.querySelectorAll('input[data-option-index]');

  function formatPrice(cents) {
    return new Intl.NumberFormat('de-CH', { style: 'currency', currency: currency }).format(cents / 100);
  }

  function selectedOptions() {
    var values = [];
    radios.forEach(function (radio) {
      if (radio.checked) values[Number(radio.getAttribute('data-option-index'))] = radio.value;
    });
    return values;
  }

  function update() {
    var chosen = selectedOptions();
    var match = variants.find(function (variant) {
      return variant.options.every(function (value, index) { return chosen[index] === value; });
    });
    if (!match) {
      if (button) { button.disabled = true; button.textContent = 'Nicht verfügbar'; }
      return;
    }
    idInput.value = match.id;
    if (priceNode) priceNode.textContent = formatPrice(match.price);
    if (button) {
      button.disabled = !match.available;
      button.textContent = match.available ? 'In den Warenkorb' : 'Ausverkauft';
    }
    var url = new URL(window.location.href);
    url.searchParams.set('variant', match.id);
    window.history.replaceState({}, '', url.toString());
  }

  radios.forEach(function (radio) { radio.addEventListener('change', update); });
})();
