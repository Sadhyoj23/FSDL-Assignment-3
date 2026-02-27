(function () {
  function money(value) {
    return 'Rs ' + Number(value).toLocaleString('en-IN');
  }

  function getOrderIdFromQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get('orderId');
  }

  const orderId = getOrderIdFromQuery();
  const order = orderId ? window.EcomStore.getOrderById(orderId) : window.EcomStore.getLastOrder();
  window.EcomStore.updateBadge();

  const billDetails = document.getElementById('billDetails');
  if (!order) {
    billDetails.innerHTML = '<p>No recent order found.</p>';
    return;
  }

  order.items.forEach(function (item) {
    const row = document.createElement('div');
    row.className = 'billItem';
    row.innerHTML = '<p>' + item.name + ' x ' + item.quantity + '</p><p>' + money(item.lineTotal) + '</p>';
    billDetails.appendChild(row);
  });

  const totalDiv = document.createElement('div');
  totalDiv.className = 'billTotal';
  totalDiv.innerHTML =
    '<p>Original: ' + money(order.totals.originalTotal) + '</p>' +
    '<p>Discount: -' + money(order.totals.discount) + '</p>' +
    '<h3>Paid: ' + money(order.totals.total) + '</h3>';
  billDetails.appendChild(totalDiv);

  const shippingDiv = document.createElement('div');
  shippingDiv.className = 'billShipping';
  shippingDiv.innerHTML =
    '<h3>Shipping Details</h3>' +
    '<p>Name: ' + order.customer.name + '</p>' +
    '<p>Email: ' + order.customer.email + '</p>' +
    '<p>Phone: ' + order.customer.phone + '</p>' +
    '<p>Address: ' + order.customer.address + ', ' + order.customer.city + ' - ' + order.customer.zip + '</p>' +
    '<h3>Payment</h3>' +
    '<p>Method: ' + order.payment.method + ' ending ' + order.payment.cardLast4 + '</p>' +
    '<p>Auth Code: ' + order.payment.authCode + ' (' + order.payment.status + ')</p>' +
    '<p>Order ID: ' + order.id + '</p>';

  billDetails.appendChild(shippingDiv);
})();
