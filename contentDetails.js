(function () {
  function money(value) {
    return 'Rs ' + Number(value).toLocaleString('en-IN');
  }

  function getProductId() {
    const raw = location.search.split('?')[1];
    return Number(raw || 0);
  }

  function renderProductDetails(product) {
    const container = document.getElementById('containerProduct');
    if (!container) {
      return;
    }

    const mainContainer = document.createElement('div');
    mainContainer.id = 'containerD';

    const imageSectionDiv = document.createElement('div');
    imageSectionDiv.id = 'imageSection';

    const imgTag = document.createElement('img');
    imgTag.id = 'imgDetails';
    imgTag.src = product.preview;
    imgTag.alt = product.name;

    const previewRow = document.createElement('div');
    previewRow.id = 'productPreview';
    product.photos.forEach(function (photo) {
      const thumb = document.createElement('img');
      thumb.src = photo;
      thumb.alt = product.name;
      thumb.addEventListener('click', function () {
        imgTag.src = photo;
      });
      previewRow.appendChild(thumb);
    });

    imageSectionDiv.appendChild(imgTag);
    imageSectionDiv.appendChild(previewRow);

    const productDetailsDiv = document.createElement('div');
    productDetailsDiv.id = 'productDetails';

    const h1 = document.createElement('h1');
    h1.textContent = product.name;

    const h4 = document.createElement('h4');
    h4.textContent = product.brand;

    const priceWrap = document.createElement('div');
    priceWrap.className = 'priceWrap';

    const priceNow = document.createElement('h3');
    priceNow.textContent = money(product.price);

    const priceOld = document.createElement('p');
    priceOld.className = 'originalPrice';
    priceOld.textContent = product.onSale ? money(product.originalPrice) : '';

    const descTitle = document.createElement('h3');
    descTitle.textContent = 'Description';

    const para = document.createElement('p');
    para.textContent = product.description;

    const qtyWrap = document.createElement('div');
    qtyWrap.className = 'qtyWrap';
    qtyWrap.innerHTML = '<label for="qty">Quantity:</label><input id="qty" type="number" min="1" max="10" value="1">';

    const buttonDiv = document.createElement('div');
    buttonDiv.id = 'button';

    const buttonTag = document.createElement('button');
    buttonTag.textContent = 'Add to Cart';
    buttonTag.onclick = function () {
      const qtyInput = document.getElementById('qty');
      const qty = Math.max(1, Number(qtyInput.value) || 1);
      window.EcomStore.addToCart(product.id, qty);
      buttonTag.textContent = 'Added';
      setTimeout(function () {
        buttonTag.textContent = 'Add to Cart';
      }, 1200);
    };

    buttonDiv.appendChild(buttonTag);

    priceWrap.appendChild(priceNow);
    priceWrap.appendChild(priceOld);

    productDetailsDiv.appendChild(h1);
    productDetailsDiv.appendChild(h4);
    productDetailsDiv.appendChild(priceWrap);
    productDetailsDiv.appendChild(descTitle);
    productDetailsDiv.appendChild(para);
    productDetailsDiv.appendChild(qtyWrap);
    productDetailsDiv.appendChild(buttonDiv);

    mainContainer.appendChild(imageSectionDiv);
    mainContainer.appendChild(productDetailsDiv);
    container.appendChild(mainContainer);
  }

  const productId = getProductId();
  const product = window.EcomStore.getProductById(productId);
  window.EcomStore.updateBadge();

  if (!product) {
    const container = document.getElementById('containerProduct');
    if (container) {
      container.innerHTML = '<p style="padding: 120px 40px;">Product not found.</p>';
    }
    return;
  }

  renderProductDetails(product);
})();
