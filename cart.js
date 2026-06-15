let cart = JSON.parse(localStorage.getItem('ironCart') || '[]');
let discountApplied = false;

function saveCart() {
  localStorage.setItem('ironCart', JSON.stringify(cart));
}

function addToCart(productId, btn) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, icon: product.icon, qty: 1 });
  }
  saveCart();
  updateCartUI();

  if (btn) {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check me-2"></i> ADDED!';
    btn.classList.add('added');
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.classList.remove('added');
    }, 1500);
  }

  showToast(`${product.name} به سبد اضافه شد!`, 'success');
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
  renderCartItems();
}


function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(productId);
  else {
    saveCart();
    updateCartUI();
    renderCartItems();
  }
}

function clearCart() {
  cart = [];
  discountApplied = false;
  saveCart();
  updateCartUI();
  renderCartItems();
}

function getCartTotal() {
  return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, i) => sum + i.qty, 0);
}

function updateCartUI() {
  const count = getCartCount();
  document.querySelectorAll('#cartCount, #cartCountBadge').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
  document.querySelectorAll('#cartItemCount').forEach(el => el.textContent = count);

  const total = getCartTotal();
  const finalTotal = discountApplied ? total * 0.6 : total;
  document.querySelectorAll('#cartTotal').forEach(el => el.textContent = '$' + finalTotal.toFixed(0));

  const footer = document.getElementById('cartFooter');
  const empty = document.getElementById('cartEmpty');
  if (footer) footer.style.display = cart.length > 0 ? 'block' : 'none';
  if (empty) empty.style.display = cart.length === 0 ? 'flex' : 'none';

  renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-icon"><i class="fas ${item.icon}"></i></div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price}</div>
        <div class="cart-item-qty">
          <button onclick="changeQty(${item.id}, -1)"><i class="fas fa-minus"></i></button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${item.id}, 1)"><i class="fas fa-plus"></i></button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `).join('');
}

function applyPromo() {
  const code = document.getElementById('promoInput')?.value?.trim().toUpperCase();
  if (code === 'LASH2025') {
    if (!discountApplied) {
      discountApplied = true;
      const total = getCartTotal();
      const discount = total * 0.4;
      const discRow = document.getElementById('discountRow');
      const discAmt = document.getElementById('discountAmt');
      if (discRow) discRow.style.display = 'flex';
      if (discAmt) discAmt.textContent = '-$' + discount.toFixed(0);
      updateCartUI();
      showToast('کد تخفیف ۴۰٪ اعمال شد! 🎉', 'success');
    } else {
      showToast('کد تخفیف قبلاً اعمال شده.', 'warning');
    }
  } else {
    showToast('کد تخفیف نامعتبر!', 'error');
  }
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  if (!sidebar) return;
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
  if (sidebar.classList.contains('open')) renderCartItems();
}

function openProduct(productId) {
  const p = PRODUCTS.find(pr => pr.id === productId);
  if (!p) return;

  const modal = document.getElementById('productModal');
  if (!modal) {
    window.location.href = `product.html?id=${productId}`;
    return;
  }

  const stars = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));
  document.getElementById('modalContent').innerHTML = `
    <div class="modal-product-icon"><i class="fas ${p.icon}"></i></div>
    <div class="modal-product-info">
      <div class="product-cat">${p.cat.toUpperCase()}</div>
      <h2 class="product-title">${p.name}</h2>
      <div class="product-rating mb-3">
        <span class="stars">${stars}</span> <span class="review-count">(${p.reviews} نظر)</span>
      </div>
      <p class="text-dim">${p.detail}</p>
      <div class="product-price mb-4">$${p.price}</div>
      ${p.inStock
        ? `<button class="cta-dark btn w-100" onclick="addToCart(${p.id}, this); closeModal()">
             <i class="fas fa-shopping-cart me-2"></i> ADD TO CAGE
           </button>`
        : `<button class="cta-dark btn w-100 disabled">OUT OF STOCK</button>`
      }
    </div>
  `;
  modal.classList.add('open');
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('productModal')?.classList.remove('open');
  document.getElementById('modalOverlay')?.classList.remove('open');
}

function showToast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `iron-toast toast-${type}`;
  toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-exclamation-circle'} me-2"></i>${msg}`;
  container.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

function copyCode() {
  navigator.clipboard.writeText('LASH2025').then(() => showToast('کد LASH2025 کپی شد!', 'success'));
}

function openSearch() {
  document.getElementById('searchOverlay')?.classList.add('open');
  setTimeout(() => document.getElementById('searchInput')?.focus(), 100);
}

function closeSearch() {
  document.getElementById('searchOverlay')?.classList.remove('open');
}

function liveSearch(query) {
  const results = document.getElementById('searchResults');
  if (!results) return;
  if (query.length < 2) { results.innerHTML = ''; return; }

  const matches = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.cat.toLowerCase().includes(query.toLowerCase())
  );

  results.innerHTML = matches.length === 0
    ? '<p class="text-dim text-center mt-4">نتیجه‌ای پیدا نشد.</p>'
    : matches.map(p => `
        <div class="search-result-item" onclick="closeSearch(); openProduct(${p.id})">
          <i class="fas ${p.icon} me-3 text-red"></i>
          <div>
            <div class="fw-bold">${p.name}</div>
            <div class="text-dim small">${p.cat.toUpperCase()} — $${p.price}</div>
          </div>
        </div>
      `).join('');
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeSearch(); closeModal(); }
});