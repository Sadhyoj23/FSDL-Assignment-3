(function () {
  function money(value) {
    return 'Rs ' + Number(value).toLocaleString('en-IN');
  }

  const cartContainer = document.getElementById('cartContainer');
  const totalItem = document.getElementById('totalItem');

  function renderEmpty() {
    cartContainer.innerHTML = '<div id="boxContainer"><div id="box"><h3>Your cart is empty.</h3><p>Add products to continue checkout.</p></div></div>';
    totalItem.textContent = 'Total Items: 0';
  }

  function renderCart() {
    const items = window.EcomStore.getCartItems();
    const totals = window.EcomStore.getCartTotals();
    window.EcomStore.updateBadge();

    if (!items.length) {
      renderEmpty();
      return;
    }

    totalItem.textContent = 'Total Items: ' + totals.itemCount;
    cartContainer.innerHTML = '';

    const boxContainerDiv = document.createElement('div');
    boxContainerDiv.id = 'boxContainer';

    items.forEach(function (item) {
      const boxDiv = document.createElement('div');
      boxDiv.id = 'box';
      boxDiv.dataset.id = item.product.id;

      boxDiv.innerHTML =
        '<img src="' + item.product.preview + '" alt="' + item.product.name + '">' +
        '<h3>' + item.product.name + '</h3>' +
        '<h4>' + money(item.product.price) + ' each</h4>' +
        '<div class="qtyActions">' +
          '<button class="qtyBtn" data-action="dec">-</button>' +
          '<span>' + item.quantity + '</span>' +
          '<button class="qtyBtn" data-action="inc">+</button>' +
          '<button class="removeBtn" data-action="remove">Remove</button>' +
        '</div>' +
        '<p class="lineTotal">Line Total: ' + money(item.lineTotal) + '</p>';

      boxContainerDiv.appendChild(boxDiv);
    });

    const totalContainerDiv = document.createElement('div');
    totalContainerDiv.id = 'totalContainer';
    totalContainerDiv.innerHTML =
      '<h2>Total Amount</h2>' +
      '<h4 class="summaryLine">Original: ' + money(totals.originalTotal) + '</h4>' +
      '<h4 class="summaryLine">Discount: -' + money(totals.discount) + '</h4>' +
      '<h3 class="summaryFinal">Payable: ' + money(totals.total) + '</h3>' +
      '<div id="button"><button id="checkoutBtn">Proceed to Checkout</button></div>';

    cartContainer.appendChild(boxContainerDiv);
    cartContainer.appendChild(totalContainerDiv);

    document.getElementById('checkoutBtn').addEventListener('click', function () {
      window.location.href = 'checkout.html';
    });
  }

  cartContainer.addEventListener('click', function (event) {
    const action = event.target.getAttribute('data-action');
    if (!action) {
      return;
    }

    const itemBox = event.target.closest('#box');
    const id = Number(itemBox && itemBox.dataset.id);
    if (!id) {
      return;
    }

    const current = window.EcomStore.getCartItems().find(function (item) { return item.product.id === id; });
    if (!current) {
      return;
    }

    if (action === 'inc') {
      window.EcomStore.updateCartItem(id, current.quantity + 1);
    } else if (action === 'dec') {
      window.EcomStore.updateCartItem(id, current.quantity - 1);
    } else if (action === 'remove') {
      window.EcomStore.removeFromCart(id);
    }

    renderCart();
  });

  renderCart();
})();
