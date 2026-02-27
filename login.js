(function () {
  const form = document.getElementById('loginForm');
  const message = document.getElementById('loginMessage');

  function getReturnTarget() {
    const params = new URLSearchParams(window.location.search);
    const target = (params.get('returnTo') || '').trim();
    if (!target) {
      return 'index.html';
    }
    if (/^https?:\/\//i.test(target)) {
      return 'index.html';
    }
    return target;
  }

  if (window.EcomStore.isLoggedIn()) {
    window.location.href = getReturnTarget();
    return;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const user = window.EcomStore.login(email, password, name);
    if (!user) {
      message.textContent = 'Enter a valid email and password.';
      message.className = 'error';
      return;
    }

    message.textContent = 'Login successful. Redirecting...';
    message.className = 'success';
    window.location.href = getReturnTarget();
  });
})();
