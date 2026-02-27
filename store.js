(function () {
  const STORAGE = {
    cart: 'shoplane_cart_v2',
    orders: 'shoplane_orders_v2',
    lastOrderId: 'shoplane_last_order_id',
    user: 'shoplane_user_v1'
  };

  // Manual image mapping:
  // Update the `cover` value for each product id with your own image path.
  // Example: 1: { cover: 'img/my-products/tshirt-main.jpg' }
  const PRODUCT_IMAGES = {
    1: { cover: 'img/product1.png' },
    2: { cover: 'img/product2.png' },
    3: { cover: 'img/product3.png' },
    4: { cover: 'img/product4.png' },
    5: { cover: 'img/product5.png' },
    6: { cover: 'img/product6.png' },
    7: { cover: 'img/product7.png' },
    8: { cover: 'img/product8.png' },
    9: { cover: 'img/product9.png' },
    10: { cover: 'img/product10.png' },
    11: { cover: 'img/tissotminimal.png' },
    12: { cover: 'img/rayban.png' },
    13: { cover: 'img/lvbelt.png' },
    14: { cover: 'img/lvearrings.png' },
    15: { cover: 'img/silkscarf.png' },
    16: { cover: 'img/fitbit.jpg' },
    17: { cover: 'img/wallet.png' },
    18: { cover: 'img/nechlace.png' },
    19: { cover: 'img/cap.png' },
    20: { cover: 'img/airpods.jpg' },
    21: { cover: 'img/bag1.png' },
    22: { cover: 'img/bag2.png' },
    23: { cover: 'img/bag3.png' },
    24: { cover: 'img/bag4.png' },
    25: { cover: 'img/bag5.png' },
    26: { cover: 'img/bag6.png' },
    27: { cover: 'img/bag7.png' },
    28: { cover: 'img/bag8.png' },
    29: { cover: 'img/bag9.png' },
    30: { cover: 'img/bag10.png' }
  };

  function imageFor(id) {
    const manual = PRODUCT_IMAGES[id] && PRODUCT_IMAGES[id].cover;
    if (manual && String(manual).trim()) {
      return manual;
    }
    const imgIndex = ((id - 1) % 10) + 1;
    return 'img/product' + imgIndex + '.jpg';
  }

  function buildProduct(id, category, name, brand, price, originalPrice, description) {
    const coverImage = imageFor(id);
    return {
      id,
      category,
      name,
      brand,
      price,
      originalPrice,
      onSale: originalPrice > price,
      description,
      preview: coverImage,
      coverImage,
      photos: [coverImage, coverImage, coverImage]
    };
  }

  const products = [
    buildProduct(1, 'clothing', 'Classic Cotton T-Shirt', 'Urban Stitch', 799, 999, 'Soft cotton tee for daily wear.'),
    buildProduct(2, 'clothing', 'Slim Fit Denim Jeans', 'Denim Forge', 1599, 1999, 'Stretch denim with a modern slim fit.'),
    buildProduct(3, 'clothing', 'Linen Casual Shirt', 'Blue Harbor', 1299, 1699, 'Breathable linen shirt for day to night styling.'),
    buildProduct(4, 'clothing', 'Athletic Joggers', 'Motion Lab', 1199, 1499, 'Tapered joggers with comfort waistband.'),
    buildProduct(5, 'clothing', 'Summer Floral Dress', 'Bloomline', 1899, 2399, 'Lightweight floral dress with flowy fit.'),
    buildProduct(6, 'clothing', 'Formal Blazer', 'Tailor Prime', 3299, 4299, 'Sharp blazer for office and events.'),
    buildProduct(7, 'clothing', 'Hooded Sweatshirt', 'North Thread', 1699, 2199, 'Warm fleece hoodie with kangaroo pocket.'),
    buildProduct(8, 'clothing', 'Pleated Midi Skirt', 'Atelier Nine', 1499, 1899, 'Elegant pleated skirt with soft drape.'),
    buildProduct(9, 'clothing', 'Polo Performance Tee', 'Courtline', 999, 1299, 'Moisture-wicking polo for active days.'),
    buildProduct(10, 'clothing', 'Kurta Set', 'Saffron Loom', 2499, 3299, 'Festive-ready kurta set with dupatta.'),

    buildProduct(11, 'accessories', 'Minimal Analog Watch', 'TimeCraft', 2199, 2999, 'Classic dial watch with premium strap.'),
    buildProduct(12, 'accessories', 'Polarized Sunglasses', 'SunArc', 1199, 1699, 'UV-protected lenses with lightweight frame.'),
    buildProduct(13, 'accessories', 'Leather Belt', 'HideWorks', 899, 1199, 'Genuine leather belt with matte buckle.'),
    buildProduct(14, 'accessories', 'Silver Hoop Earrings', 'Luna Jewels', 699, 999, 'Everyday hoops with polished finish.'),
    buildProduct(15, 'accessories', 'Silk Scarf', 'Velvet Vine', 799, 1099, 'Printed silk scarf for layered looks.'),
    buildProduct(16, 'accessories', 'Smart Fitness Band', 'PulseTech', 2499, 3199, 'Track steps, sleep and workouts.'),
    buildProduct(17, 'accessories', 'Classic Wallet', 'Urban Hide', 1099, 1499, 'Compact wallet with RFID protection.'),
    buildProduct(18, 'accessories', 'Statement Necklace', 'Nova Gems', 1399, 1899, 'Occasion necklace with premium plating.'),
    buildProduct(19, 'accessories', 'Travel Cap', 'Trailmark', 599, 799, 'Adjustable cap with breathable eyelets.'),
    buildProduct(20, 'accessories', 'Wireless Earbuds Case', 'EchoNest', 499, 699, 'Protective hard shell carry case.'),

    buildProduct(21, 'bags', 'Everyday Tote Bag', 'CarryLane', 1299, 1699, 'Roomy tote with interior zip pocket.'),
    buildProduct(22, 'bags', 'Office Laptop Backpack', 'PackGrid', 2599, 3399, 'Padded 15-inch laptop compartment.'),
    buildProduct(23, 'bags', 'Mini Sling Bag', 'Mode Mini', 999, 1399, 'Compact sling for essentials.'),
    buildProduct(24, 'bags', 'Gym Duffel', 'Active Haul', 1999, 2599, 'Durable duffel with shoe section.'),
    buildProduct(25, 'bags', 'Canvas Messenger', 'Street Satchel', 1499, 2099, 'Crossbody canvas bag with flap closure.'),
    buildProduct(26, 'bags', 'Hard Shell Trolley', 'Voyager Pro', 5499, 6999, 'Cabin-size trolley with spinner wheels.'),
    buildProduct(27, 'bags', 'Party Clutch', 'Gala Grip', 899, 1299, 'Elegant clutch with chain strap.'),
    buildProduct(28, 'bags', 'Kids School Bag', 'BrightPack', 1199, 1599, 'Ergonomic school backpack for kids.'),
    buildProduct(29, 'bags', 'Leather Weekender', 'Route Luxe', 4299, 5599, 'Premium overnight travel bag.'),
    buildProduct(30, 'bags', 'Waist Utility Bag', 'MoveLite', 799, 1099, 'Hands-free waist bag for travel.'),
  ];

  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (err) {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getProducts() {
    return products.slice();
  }

  function getProductById(id) {
    const parsed = Number(id);
    return products.find(function (item) {
      return item.id === parsed;
    }) || null;
  }

  function getCartMap() {
    return readJSON(STORAGE.cart, {});
  }

  function saveCartMap(cart) {
    writeJSON(STORAGE.cart, cart);
  }

  function getCartCount() {
    const cart = getCartMap();
    return Object.keys(cart).reduce(function (total, id) {
      return total + Number(cart[id] || 0);
    }, 0);
  }

  function addToCart(id, quantity) {
    const qty = Math.max(1, Number(quantity) || 1);
    const product = getProductById(id);
    if (!product) {
      return false;
    }
    const cart = getCartMap();
    const key = String(product.id);
    cart[key] = Number(cart[key] || 0) + qty;
    saveCartMap(cart);
    updateBadge();
    return true;
  }

  function updateCartItem(id, quantity) {
    const product = getProductById(id);
    if (!product) {
      return false;
    }
    const cart = getCartMap();
    const key = String(product.id);
    const qty = Number(quantity) || 0;
    if (qty <= 0) {
      delete cart[key];
    } else {
      cart[key] = qty;
    }
    saveCartMap(cart);
    updateBadge();
    return true;
  }

  function removeFromCart(id) {
    return updateCartItem(id, 0);
  }

  function clearCart() {
    localStorage.removeItem(STORAGE.cart);
    updateBadge();
  }

  function getCartItems() {
    const cart = getCartMap();
    const items = [];

    Object.keys(cart).forEach(function (id) {
      const product = getProductById(id);
      const quantity = Number(cart[id] || 0);
      if (!product || quantity <= 0) {
        return;
      }
      items.push({
        product,
        quantity,
        lineTotal: product.price * quantity,
        lineOriginal: product.originalPrice * quantity
      });
    });

    return items;
  }

  function getCartTotals() {
    return getCartItems().reduce(function (acc, item) {
      acc.originalTotal += item.lineOriginal;
      acc.total += item.lineTotal;
      return acc;
    }, { originalTotal: 0, total: 0, discount: 0, itemCount: getCartCount() });
  }

  function finalizeTotals(totals) {
    totals.discount = totals.originalTotal - totals.total;
    return totals;
  }

  function getOrderList() {
    return readJSON(STORAGE.orders, []);
  }

  function sanitizeNameFromEmail(email) {
    const localPart = String(email || '').split('@')[0] || '';
    return localPart.replace(/[^a-zA-Z0-9]/g, ' ').trim() || 'Shopper';
  }

  function getCurrentUser() {
    return readJSON(STORAGE.user, null);
  }

  function isLoggedIn() {
    return !!getCurrentUser();
  }

  function login(email, password, name) {
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanPassword = String(password || '').trim();
    if (!cleanEmail || !cleanPassword) {
      return null;
    }

    const user = {
      email: cleanEmail,
      name: String(name || '').trim() || sanitizeNameFromEmail(cleanEmail),
      loginAt: new Date().toISOString()
    };
    writeJSON(STORAGE.user, user);
    updateHeaderAuth();
    return user;
  }

  function logout() {
    localStorage.removeItem(STORAGE.user);
    updateHeaderAuth();
  }

  function createOrder(customer, payment) {
    const items = getCartItems();
    if (!items.length) {
      return null;
    }

    const totals = finalizeTotals(getCartTotals());
    const order = {
      id: 'OD' + Date.now(),
      createdAt: new Date().toISOString(),
      items: items.map(function (item) {
        return {
          id: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          originalPrice: item.product.originalPrice,
          lineTotal: item.lineTotal
        };
      }),
      totals,
      customer,
      payment: {
        method: payment.method,
        cardLast4: payment.cardLast4,
        authCode: payment.authCode,
        status: 'Authorized'
      }
    };

    const orders = getOrderList();
    orders.push(order);
    writeJSON(STORAGE.orders, orders);
    localStorage.setItem(STORAGE.lastOrderId, order.id);
    clearCart();
    return order;
  }

  function getOrderById(orderId) {
    const id = String(orderId || '');
    return getOrderList().find(function (order) {
      return order.id === id;
    }) || null;
  }

  function getLastOrder() {
    const orderId = localStorage.getItem(STORAGE.lastOrderId);
    return getOrderById(orderId);
  }

  function updateHeaderAuth() {
    const userArea = document.getElementById('user');
    const authName = document.getElementById('authName');
    const authLink = document.getElementById('authLink');
    const logoutBtn = document.getElementById('logoutBtn');
    const user = getCurrentUser();

    if (userArea) {
      if (user) {
        userArea.classList.add('loggedIn');
      } else {
        userArea.classList.remove('loggedIn');
      }
    }

    if (authName) {
      authName.textContent = user ? user.name : 'Login';
    }

    if (authLink) {
      authLink.href = user ? '#' : 'login.html';
      authLink.setAttribute('aria-label', user ? 'Logged in user profile' : 'Login');
    }

    if (logoutBtn) {
      logoutBtn.style.display = user ? 'inline-block' : 'none';
      if (!logoutBtn.dataset.bound) {
        logoutBtn.addEventListener('click', function () {
          logout();
          window.location.href = 'index.html';
        });
        logoutBtn.dataset.bound = 'true';
      }
    }
  }

  function updateBadge() {
    const badge = document.getElementById('badge');
    if (badge) {
      badge.textContent = String(getCartCount());
    }
    updateHeaderAuth();
  }

  window.EcomStore = {
    getProducts,
    getProductById,
    getCartCount,
    getCartItems,
    getCartTotals: function () {
      return finalizeTotals(getCartTotals());
    },
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    createOrder,
    getOrderById,
    getLastOrder,
    getCurrentUser,
    isLoggedIn,
    login,
    logout,
    updateHeaderAuth,
    updateBadge
  };

  document.addEventListener('DOMContentLoaded', function () {
    updateBadge();
  });
})();
