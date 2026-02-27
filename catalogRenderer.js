(function () {
  function money(value) {
    return 'Rs ' + Number(value).toLocaleString('en-IN');
  }

  function createCard(product) {
    const boxDiv = document.createElement('div');
    boxDiv.className = 'productCard';

    const boxLink = document.createElement('a');
    boxLink.href = 'contentDetails.html?' + product.id;

    const imgTag = document.createElement('img');
    imgTag.src = product.preview;
    imgTag.alt = product.name;

    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'details';

    const title = document.createElement('h3');
    title.textContent = product.name;

    const brand = document.createElement('h4');
    brand.textContent = product.brand;

    const priceRow = document.createElement('div');
    priceRow.className = 'priceRow';

    const salePrice = document.createElement('span');
    salePrice.className = 'salePrice';
    salePrice.textContent = money(product.price);

    const originalPrice = document.createElement('span');
    originalPrice.className = 'originalPrice';
    if (product.onSale) {
      originalPrice.textContent = money(product.originalPrice);
    }

    const badge = document.createElement('span');
    badge.className = 'saleBadge';
    badge.textContent = product.onSale ? 'Sale' : 'New';

    const buttonTag = document.createElement('button');
    buttonTag.className = 'addButton';
    buttonTag.textContent = 'Add to Cart';
    buttonTag.onclick = function () {
      window.EcomStore.addToCart(product.id, 1);
    };

    priceRow.appendChild(salePrice);
    priceRow.appendChild(originalPrice);
    detailsDiv.appendChild(title);
    detailsDiv.appendChild(brand);
    detailsDiv.appendChild(priceRow);
    detailsDiv.appendChild(badge);

    boxLink.appendChild(imgTag);
    boxLink.appendChild(detailsDiv);
    boxDiv.appendChild(boxLink);
    boxDiv.appendChild(buttonTag);

    return boxDiv;
  }

  function applySort(items, sortBy) {
    const sorted = items.slice();
    if (sortBy === 'priceLow') {
      sorted.sort(function (a, b) { return a.price - b.price; });
    } else if (sortBy === 'priceHigh') {
      sorted.sort(function (a, b) { return b.price - a.price; });
    } else if (sortBy === 'discount') {
      sorted.sort(function (a, b) { return (b.originalPrice - b.price) - (a.originalPrice - a.price); });
    } else {
      sorted.sort(function (a, b) { return a.id - b.id; });
    }
    return sorted;
  }

  function mountControls(container, state, onUpdate) {
    const controls = document.createElement('div');
    controls.className = 'catalogControls';

    const search = document.createElement('input');
    search.type = 'text';
    search.placeholder = 'Search products...';
    search.className = 'catalogSearch';
    search.addEventListener('input', function () {
      state.search = search.value.trim().toLowerCase();
      onUpdate();
    });

    const sort = document.createElement('select');
    sort.className = 'catalogSort';
    [
      { value: 'featured', label: 'Featured' },
      { value: 'priceLow', label: 'Price: Low to High' },
      { value: 'priceHigh', label: 'Price: High to Low' },
      { value: 'discount', label: 'Best Discount' }
    ].forEach(function (option) {
      const item = document.createElement('option');
      item.value = option.value;
      item.textContent = option.label;
      sort.appendChild(item);
    });
    sort.addEventListener('change', function () {
      state.sort = sort.value;
      onUpdate();
    });

    const saleToggle = document.createElement('label');
    saleToggle.className = 'saleToggle';
    const saleCheckbox = document.createElement('input');
    saleCheckbox.type = 'checkbox';
    saleCheckbox.addEventListener('change', function () {
      state.saleOnly = saleCheckbox.checked;
      onUpdate();
    });
    saleToggle.appendChild(saleCheckbox);
    saleToggle.appendChild(document.createTextNode(' Sale only'));

    const viewWrap = document.createElement('div');
    viewWrap.className = 'viewToggle';
    const gridBtn = document.createElement('button');
    gridBtn.type = 'button';
    gridBtn.textContent = 'Grid';
    gridBtn.className = 'active';
    const listBtn = document.createElement('button');
    listBtn.type = 'button';
    listBtn.textContent = 'List';

    gridBtn.addEventListener('click', function () {
      state.view = 'grid';
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
      onUpdate();
    });

    listBtn.addEventListener('click', function () {
      state.view = 'list';
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
      onUpdate();
    });

    viewWrap.appendChild(gridBtn);
    viewWrap.appendChild(listBtn);

    controls.appendChild(search);
    controls.appendChild(sort);
    controls.appendChild(saleToggle);
    controls.appendChild(viewWrap);
    container.prepend(controls);
  }

  function renderCatalogSection(section, state) {
    const container = document.getElementById(section.containerId);
    if (!container) {
      return;
    }

    const allProducts = window.EcomStore.getProducts().filter(function (product) {
      if (typeof section.filter === 'function') {
        return section.filter(product);
      }
      return true;
    });

    let products = allProducts.filter(function (product) {
      const inSearch = !state.search || product.name.toLowerCase().includes(state.search) || product.brand.toLowerCase().includes(state.search);
      const inSale = !state.saleOnly || product.onSale;
      return inSearch && inSale;
    });

    products = applySort(products, state.sort);

    container.classList.toggle('listView', state.view === 'list');
    container.innerHTML = '';

    if (!products.length) {
      const empty = document.createElement('p');
      empty.className = 'emptyState';
      empty.textContent = 'No products match these filters.';
      container.appendChild(empty);
      return;
    }

    products.forEach(function (product) {
      container.appendChild(createCard(product));
    });
  }

  window.renderCatalogPage = function (sections) {
    const mainContainer = document.getElementById('mainContainer');
    if (!mainContainer || !Array.isArray(sections)) {
      return;
    }

    const state = {
      search: '',
      sort: 'featured',
      saleOnly: false,
      view: 'grid'
    };

    function renderAll() {
      sections.forEach(function (section) {
        renderCatalogSection(section, state);
      });
    }

    mountControls(mainContainer, state, renderAll);
    window.EcomStore.updateBadge();
    renderAll();
  };
})();
