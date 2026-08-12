/**
 * Main Application Script for Tea House
 * Handles dynamic content rendering, state management, cart, search, and modals.
 */

// Application State
const state = {
  activeCategory: 'all',
  searchQuery: '',
  cart: JSON.parse(localStorage.getItem('teahouse_cart')) || [],
  currentTestimonialIndex: 0,
  autoPlayInterval: null,
  activeProductModalId: null,
  selectedModalQuantity: 1
};

// Initialize Application when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  renderProducts();
  renderTestimonials();
  renderNews();
  updateCartBadge();
  initCategoryFilters();
  initSearch();
  initNewsletter();
  startTestimonialAutoPlay();
});

/* ==========================================================================
   1. NAVBAR & CART BADGE
   ========================================================================== */
function initNavbar() {
  const menuToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartModal = document.getElementById('cart-modal');
  const cartOverlay = document.getElementById('cart-overlay');

  if (menuToggleBtn && mobileMenu) {
    menuToggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  if (openCartBtn && cartModal) {
    openCartBtn.addEventListener('click', () => openCart());
  }

  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => closeCart());
  }

  if (cartOverlay) {
    cartOverlay.addEventListener('click', () => closeCart());
  }
}

function updateCartBadge() {
  const badgeElement = document.getElementById('cart-badge-count');
  if (badgeElement) {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    badgeElement.innerText = totalItems;
    badgeElement.classList.toggle('hidden', totalItems === 0);
  }
}

function openCart() {
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) {
    renderCartItems();
    cartModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const cartModal = document.getElementById('cart-modal');
  if (cartModal) {
    cartModal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   2. PRODUCTS SECTION (DYNAMIC RENDER + FILTER + SEARCH)
   ========================================================================== */
function initCategoryFilters() {
  const filterContainer = document.getElementById('category-filters');
  if (!filterContainer) return;

  filterContainer.addEventListener('click', (e) => {
    const button = e.target.closest('.filter-btn');
    if (!button) return;

    // Update active UI tab state
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('bg-gradient', 'text-white', 'shadow-md');
      btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
    });

    button.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');
    button.classList.add('bg-gradient', 'text-white', 'shadow-md');

    state.activeCategory = button.getAttribute('data-category');
    renderProducts();
  });
}

function initSearch() {
  const searchInput = document.getElementById('product-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value.toLowerCase().trim();
    renderProducts();
  });
}

function renderProducts() {
  const productGrid = document.getElementById('product-grid');
  if (!productGrid) return;

  // Filter products by category and search keyword
  const filteredProducts = productsData.filter(product => {
    const matchesCategory = state.activeCategory === 'all' || product.category === state.activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(state.searchQuery) ||
                          product.description.toLowerCase().includes(state.searchQuery);
    return matchesCategory && matchesSearch;
  });

  if (filteredProducts.length === 0) {
    productGrid.innerHTML = `
      <div class="col-span-full text-center py-12">
        <i class="fa-solid fa-mug-hot text-4xl text-gray-300 mb-3"></i>
        <h4 class="text-xl font-bold text-gray-700">No Tea Blends Found</h4>
        <p class="text-gray-500 text-sm mt-1">Try adjusting your category filter or search query.</p>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = filteredProducts.map(product => `
    <div class="product-card bg-white rounded-3xl p-6 text-center shadow-sm flex flex-col justify-between group">
      <div class="relative bg-gray-50 rounded-2xl p-6 mb-5 overflow-hidden flex items-center justify-center min-h-[200px]">
        <span class="absolute top-3 left-3 bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full">
          <i class="fa-solid fa-star text-amber-500 mr-1"></i>${product.rating}
        </span>
        <img src="${product.image}" alt="${product.name}" class="w-36 h-36 object-contain transition-transform duration-300 group-hover:scale-110">
      </div>
      <div>
        <h3 class="text-2xl font-bold text-gray-900 mb-2">${product.name}</h3>
        <p class="text-gray-500 text-sm leading-relaxed mb-4">${product.description}</p>
      </div>
      <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
        <span class="text-2xl font-extrabold text-amber-600">$${product.price.toFixed(2)}</span>
        <div class="flex gap-2">
          <button onclick="openProductModal(${product.id})" class="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition" title="Quick View">
            <i class="fa-solid fa-eye"></i>
          </button>
          <button onclick="addToCart(${product.id})" class="btn-gradient px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-1.5 shadow">
            <i class="fa-solid fa-plus"></i> Add
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   3. PRODUCT DETAIL MODAL & CART MANAGEMENT
   ========================================================================== */
function openProductModal(productId) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  state.activeProductModalId = productId;
  state.selectedModalQuantity = 1;

  const modalContainer = document.getElementById('product-modal-content');
  const modal = document.getElementById('product-modal');

  if (!modalContainer || !modal) return;

  modalContainer.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <div class="bg-amber-50 rounded-2xl p-6 flex justify-center items-center">
        <img src="${product.image}" alt="${product.name}" class="w-48 h-48 object-contain">
      </div>
      <div>
        <span class="bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full inline-block mb-2">
          ${product.categoryLabel}
        </span>
        <h2 class="text-3xl font-extrabold text-gray-900 mb-2">${product.name}</h2>
        <div class="flex items-center gap-2 mb-3 text-sm text-gray-600">
          <span class="flex items-center text-amber-500 font-bold">
            <i class="fa-solid fa-star mr-1"></i>${product.rating}
          </span>
          <span>(${product.reviewsCount} reviews)</span>
        </div>
        <p class="text-gray-600 text-sm mb-4 leading-relaxed">${product.description}</p>
        
        <div class="mb-4">
          <h5 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Key Ingredients</h5>
          <div class="flex flex-wrap gap-1.5">
            ${product.ingredients.map(ing => `<span class="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md">${ing}</span>`).join('')}
          </div>
        </div>

        <div class="flex items-center justify-between mb-6 pt-3 border-t border-gray-100">
          <div>
            <span class="text-xs text-gray-400 block">Unit Price</span>
            <span class="text-2xl font-black text-gray-900">$${product.price.toFixed(2)}</span>
          </div>
          
          <div class="flex items-center border border-gray-200 rounded-full overflow-hidden">
            <button onclick="updateModalQuantity(-1)" class="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold">-</button>
            <span id="modal-qty-display" class="px-4 font-bold text-gray-800">1</span>
            <button onclick="updateModalQuantity(1)" class="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold">+</button>
          </div>
        </div>

        <button onclick="addActiveModalToCart()" class="w-full btn-gradient py-3 rounded-full font-bold text-center flex items-center justify-center gap-2">
          <i class="fa-solid fa-basket-shopping"></i> Add to Order ($<span id="modal-total-price">${product.price.toFixed(2)}</span>)
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const modal = document.getElementById('product-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function updateModalQuantity(delta) {
  const newQty = state.selectedModalQuantity + delta;
  if (newQty < 1) return;
  state.selectedModalQuantity = newQty;

  const product = productsData.find(p => p.id === state.activeProductModalId);
  const qtyDisplay = document.getElementById('modal-qty-display');
  const totalPriceDisplay = document.getElementById('modal-total-price');

  if (qtyDisplay) qtyDisplay.innerText = state.selectedModalQuantity;
  if (totalPriceDisplay && product) {
    totalPriceDisplay.innerText = (product.price * state.selectedModalQuantity).toFixed(2);
  }
}

function addActiveModalToCart() {
  if (!state.activeProductModalId) return;
  addToCart(state.activeProductModalId, state.selectedModalQuantity);
  closeProductModal();
}

function addToCart(productId, quantity = 1) {
  const product = productsData.find(p => p.id === productId);
  if (!product) return;

  const existingItemIndex = state.cart.findIndex(item => item.id === productId);

  if (existingItemIndex > -1) {
    state.cart[existingItemIndex].quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCart();
  updateCartBadge();
  showToast(`Added ${quantity}x "${product.name}" to your cart!`);
}

function updateCartItemQuantity(productId, delta) {
  const itemIndex = state.cart.findIndex(item => item.id === productId);
  if (itemIndex === -1) return;

  state.cart[itemIndex].quantity += delta;
  if (state.cart[itemIndex].quantity <= 0) {
    state.cart.splice(itemIndex, 1);
  }

  saveCart();
  updateCartBadge();
  renderCartItems();
}

function removeCartItem(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  saveCart();
  updateCartBadge();
  renderCartItems();
}

function saveCart() {
  localStorage.setItem('teahouse_cart', JSON.stringify(state.cart));
}

function renderCartItems() {
  const cartList = document.getElementById('cart-items-list');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');

  if (!cartList) return;

  if (state.cart.length === 0) {
    cartList.innerHTML = `
      <div class="text-center py-12">
        <i class="fa-solid fa-basket-shopping text-4xl text-gray-300 mb-3"></i>
        <h4 class="text-lg font-bold text-gray-700">Your Cart is Empty</h4>
        <p class="text-gray-500 text-xs mt-1">Explore our teas and add your favorites!</p>
      </div>
    `;
    if (subtotalEl) subtotalEl.innerText = "$0.00";
    if (totalEl) totalEl.innerText = "$0.00";
    return;
  }

  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  cartList.innerHTML = state.cart.map(item => `
    <div class="flex items-center justify-between p-3 bg-gray-50 rounded-2xl mb-3">
      <div class="flex items-center gap-3">
        <img src="${item.image}" alt="${item.name}" class="w-14 h-14 object-contain bg-white rounded-xl p-1">
        <div>
          <h4 class="font-bold text-gray-900 text-sm">${item.name}</h4>
          <span class="text-xs text-amber-600 font-semibold">$${item.price.toFixed(2)} each</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="flex items-center border border-gray-200 bg-white rounded-lg overflow-hidden">
          <button onclick="updateCartItemQuantity(${item.id}, -1)" class="px-2 py-0.5 text-xs text-gray-600 font-bold hover:bg-gray-100">-</button>
          <span class="px-2 text-xs font-bold text-gray-800">${item.quantity}</span>
          <button onclick="updateCartItemQuantity(${item.id}, 1)" class="px-2 py-0.5 text-xs text-gray-600 font-bold hover:bg-gray-100">+</button>
        </div>
        <button onclick="removeCartItem(${item.id})" class="text-red-500 hover:text-red-700 text-xs p-1" title="Remove">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  `).join('');

  if (subtotalEl) subtotalEl.innerText = `$${subtotal.toFixed(2)}`;
  if (totalEl) totalEl.innerText = `$${subtotal.toFixed(2)}`;
}

function checkoutCart() {
  if (state.cart.length === 0) return;
  showToast("🎉 Thank you! Your Tea House order has been placed successfully.");
  state.cart = [];
  saveCart();
  updateCartBadge();
  closeCart();
}

/* ==========================================================================
   4. TESTIMONIALS SLIDER
   ========================================================================== */
function renderTestimonials() {
  const container = document.getElementById('testimonial-slider-container');
  const dotsContainer = document.getElementById('testimonial-dots');
  if (!container) return;

  const current = testimonialsData[state.currentTestimonialIndex];

  container.innerHTML = `
    <div class="relative bg-white rounded-3xl p-8 md:p-10 shadow-2xl max-w-xl mx-auto border border-gray-100 testimonial-card">
      <div class="absolute -top-6 -left-6 bg-white p-3 rounded-2xl shadow-md border border-gray-100">
        <img src="${current.avatar}" alt="${current.name}" class="w-14 h-14 rounded-full object-cover border-2 border-amber-500">
      </div>
      
      <p class="text-gray-600 text-sm md:text-base leading-relaxed mb-6 pt-4 italic">
        "${current.comment}"
      </p>

      <div class="flex items-center justify-between border-t border-gray-100 pt-4">
        <div>
          <h4 class="font-bold text-gray-900 text-lg">${current.name}</h4>
          <span class="text-xs text-gray-400">${current.role}</span>
        </div>
        <div class="flex text-amber-400 text-sm">
          ${Array(current.rating).fill('<i class="fa-solid fa-star"></i>').join('')}
        </div>
      </div>
    </div>
  `;

  if (dotsContainer) {
    dotsContainer.innerHTML = testimonialsData.map((_, idx) => `
      <button onclick="setTestimonial(${idx})" class="w-3 h-3 rounded-full transition-all duration-300 ${idx === state.currentTestimonialIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/70'}"></button>
    `).join('');
  }
}

function nextTestimonial() {
  state.currentTestimonialIndex = (state.currentTestimonialIndex + 1) % testimonialsData.length;
  renderTestimonials();
}

function prevTestimonial() {
  state.currentTestimonialIndex = (state.currentTestimonialIndex - 1 + testimonialsData.length) % testimonialsData.length;
  renderTestimonials();
}

function setTestimonial(index) {
  state.currentTestimonialIndex = index;
  renderTestimonials();
}

function startTestimonialAutoPlay() {
  state.autoPlayInterval = setInterval(() => {
    nextTestimonial();
  }, 5000);
}

/* ==========================================================================
   5. NEWS & EVENTS SECTION
   ========================================================================== */
function renderNews() {
  const newsGrid = document.getElementById('news-grid');
  if (!newsGrid) return;

  newsGrid.innerHTML = newsData.map(news => `
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-lg transition duration-300">
      <div>
        <div class="rounded-2xl overflow-hidden mb-5">
          <img src="${news.image}" alt="${news.title}" class="w-full h-48 object-cover group-hover:scale-105 transition duration-300">
        </div>
        <span class="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-2">${news.date} • ${news.author}</span>
        <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition">${news.title}</h3>
        <p class="text-gray-500 text-sm leading-relaxed mb-4">${news.excerpt}</p>
      </div>
      <button onclick="openNewsModal(${news.id})" class="text-amber-600 font-bold text-sm inline-flex items-center gap-2 hover:gap-3 transition-all">
        Learn More <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  `).join('');
}

function openNewsModal(newsId) {
  const news = newsData.find(n => n.id === newsId);
  const modal = document.getElementById('news-modal');
  const content = document.getElementById('news-modal-content');

  if (!news || !modal || !content) return;

  content.innerHTML = `
    <div class="rounded-2xl overflow-hidden mb-4">
      <img src="${news.image}" alt="${news.title}" class="w-full h-64 object-cover">
    </div>
    <div class="flex items-center justify-between text-xs text-gray-400 mb-3">
      <span><i class="fa-solid fa-calendar mr-1"></i>${news.date}</span>
      <span><i class="fa-solid fa-user mr-1"></i>${news.author}</span>
    </div>
    <h2 class="text-2xl font-extrabold text-gray-900 mb-3">${news.title}</h2>
    <p class="text-gray-600 text-sm leading-relaxed mb-4">${news.content}</p>
    <button onclick="closeNewsModal()" class="btn-gradient w-full py-2.5 rounded-full font-bold text-center">Close Article</button>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeNewsModal() {
  const modal = document.getElementById('news-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   6. NEWSLETTER & TOAST NOTIFICATION
   ========================================================================== */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('newsletter-email');
    if (!input || !input.value.includes('@')) {
      showToast("⚠️ Please enter a valid email address!");
      return;
    }

    showToast("🎉 Thank you for subscribing to Tea House newsletter!");
    input.value = '';
  });
}

function showToast(message) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'fixed top-5 right-5 z-50 flex flex-col gap-2';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'bg-gray-900 text-white text-sm font-semibold px-5 py-3.5 rounded-2xl shadow-xl border border-gray-700 flex items-center gap-3 animate-slide-in';
  toast.innerHTML = `<span>${message}</span>`;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 4000);
}
