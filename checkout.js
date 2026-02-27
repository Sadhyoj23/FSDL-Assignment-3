(function () {
  function money(value) {
    return 'Rs ' + Number(value).toLocaleString('en-IN');
  }

  const summaryItems = document.getElementById('summaryItems');
  const summaryTotal = document.getElementById('summaryTotal');
  const form = document.getElementById('checkoutFormData');
  const otpBtn = document.getElementById('sendOtpBtn');
  const otpInput = document.getElementById('otp');
  const otpStatus = document.getElementById('otpStatus');
  const returnToCheckout = encodeURIComponent('checkout.html');

  let generatedOtp = '';
  let otpVerified = false;

  function renderSummary() {
    const items = window.EcomStore.getCartItems();
    const totals = window.EcomStore.getCartTotals();
    window.EcomStore.updateBadge();

    if (!items.length) {
      window.location.href = 'cart.html';
      return;
    }

    summaryItems.innerHTML = '';
    items.forEach(function (item) {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'summaryItem';
      itemDiv.innerHTML =
        '<p>' + item.product.name + ' x ' + item.quantity + '</p>' +
        '<p>' + money(item.lineTotal) + '</p>';
      summaryItems.appendChild(itemDiv);
    });

    summaryTotal.innerHTML =
      '<div class="summaryTotal">Original: ' + money(totals.originalTotal) + '</div>' +
      '<div class="summaryTotal">Discount: -' + money(totals.discount) + '</div>' +
      '<div class="summaryTotal summaryGrand">Total: ' + money(totals.total) + '</div>';
  }

  if (!window.EcomStore.isLoggedIn()) {
    window.location.href = 'login.html?returnTo=' + returnToCheckout;
  }

  function luhnCheck(cardNumber) {
    const digits = (cardNumber || '').replace(/\D/g, '');
    let sum = 0;
    let alternate = false;

    for (let i = digits.length - 1; i >= 0; i -= 1) {
      let n = parseInt(digits.charAt(i), 10);
      if (alternate) {
        n *= 2;
        if (n > 9) {
          n -= 9;
        }
      }
      sum += n;
      alternate = !alternate;
    }

    return digits.length >= 12 && sum % 10 === 0;
  }

  function generateOtp() {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  otpBtn.addEventListener('click', function () {
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    const expiry = document.getElementById('expiry').value.trim();

    if (!luhnCheck(cardNumber)) {
      otpStatus.textContent = 'Enter a valid card number before authentication.';
      otpStatus.className = 'otpError';
      return;
    }

    if (!/^\d{3,4}$/.test(cvv) || !/^(0[1-9]|1[0-2])\/(\d{2})$/.test(expiry)) {
      otpStatus.textContent = 'Enter a valid expiry (MM/YY) and CVV.';
      otpStatus.className = 'otpError';
      return;
    }

    generatedOtp = generateOtp();
    otpVerified = false;
    otpInput.value = '';
    otpStatus.textContent = 'Dummy OTP sent. Use code: ' + generatedOtp;
    otpStatus.className = 'otpInfo';
  });

  otpInput.addEventListener('input', function () {
    otpVerified = otpInput.value.trim() === generatedOtp && generatedOtp.length > 0;
    if (otpInput.value.trim().length === 0) {
      otpStatus.textContent = 'Authenticate payment to continue.';
      otpStatus.className = 'otpInfo';
      return;
    }
    otpStatus.textContent = otpVerified ? 'Payment authenticated.' : 'Invalid OTP.';
    otpStatus.className = otpVerified ? 'otpSuccess' : 'otpError';
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!otpVerified) {
      otpStatus.textContent = 'Complete payment authentication before placing the order.';
      otpStatus.className = 'otpError';
      return;
    }

    const customer = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      address: document.getElementById('address').value.trim(),
      city: document.getElementById('city').value.trim(),
      zip: document.getElementById('zip').value.trim()
    };

    const cardNumber = document.getElementById('cardNumber').value.replace(/\D/g, '');

    const order = window.EcomStore.createOrder(customer, {
      method: 'Card',
      cardLast4: cardNumber.slice(-4),
      authCode: generatedOtp
    });

    if (!order) {
      window.location.href = 'cart.html';
      return;
    }

    window.location.href = 'orderPlaced.html?orderId=' + encodeURIComponent(order.id);
  });

  renderSummary();
})();
