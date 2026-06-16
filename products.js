const PRODUCTS = [
  {
    id: 1, name: "Chrome Hearts", cat: "ring", price: 89,
    badge: "LIMITED", badgeColor: "red",
    image: "https://cdn.snkrdunk.com/upload_bg_removed/CHA-0678.webp?size=l",
    featured: true, inStock: true, rating: 4.9, reviews: 245
  },
  {
    id: 2, name: "Chrome Hearts Waist Chain", cat: "chain", price: 105,
    badge: "BESTSELLER", badgeColor: "cyan",
    image: "https://tr.rbxcdn.com/180DAY-f188c1d6e254af7c8d2ea0c102fe3007/420/420/WaistAccessory/Webp/noFilter",
    featured: true, inStock: true, rating: 4.9, reviews: 87
  },
  {
    id: 3, name: "Chrome Hearts Belt", cat: "belt", price: 49,
    badge: null, badgeColor: null,
    image: "https://lh3.googleusercontent.com/proxy/8B4taYC7zRZf87PFzaEMjo85mBl921YFG3Ij5uMob76_7J2ag9QX_Ub57Fnh47d2axGvirOYbTXRLVy11ZO20GIvdefCS3yLEkGDzLyGCi6ckM0mDSrN3z9n3_a_te-G75NstHBTTJ0tC3YF",
    featured: true, inStock: true, rating: 4.8, reviews: 125
  },
  {
    id: 4, name: "G-Shock watch", cat: "watch", price: 269,
    badge: "NEW", badgeColor: "red",
    image: "https://casiostore.bhawar.com/cdn/shop/files/DWN-5600-1.png?v=1769249264&width=1200",
    featured: true, inStock: true, rating: 4.9, reviews: 177
  },
  {
    id: 5, name: "LA New Era", cat: "cap", price: 99,
    badge: null, badgeColor: null,
    image: "https://fanatics.frgimages.com/los-angeles-dodgers/mens-new-era-black-los-angeles-dodgers-2024/25-back-to-back-champions-diamond-side-patch-9fifty-snapback-hat_ss5_p-203625035+pv-1+u-zmlq2taoo7bh5hsrqtqr+v-zfhy0jwkm30gzkoe2gd8.png?_hv=2&w=1018",
    featured: true, inStock: true, rating: 4.4, reviews: 97
  },
  {
    id: 6, name: "Crystal Chain & Ring", cat: "set", price: 599,
    badge: "VIP", badgeColor: "gold",
    image: "https://www.danielwellington.com/cdn/shop/files/kjrrfarbweqhtwql5qef.png?v=1744271557",
    featured: true, inStock: true, rating: 5.0, reviews: 140
  },
  {
    id: 7, name: "Chrome Hearts silver ring", cat: "ring", price: 87,
    badge: "HOT", badgeColor: "red",
    image: "https://www.tisento-milano.com/cdn/shop/files/12418ZI_1_8ddaa24c-4bd1-40e5-9d1f-84295f315898_grande.png?v=1772552078",
    featured: false, inStock: true, rating: 4.7, reviews: 79
  },
  {
    id: 8, name: "LA Seoul Snapback Black", cat: "cap", price: 101,
    badge: null, badgeColor: null,
    image: "https://images.squarespace-cdn.com/content/v1/54e2dcefe4b089d9bcf8e8ad/8ef8c473-f137-4ed1-82ea-e8f4df95088e/Tommii+Lim_Doyer+Black+Snap+Back+Hat+Front_small.png?format=1000w",
    featured: false, inStock: true, rating: 4.8, reviews: 124
  },
  {
    id: 9, name: "New Era NewYork", cat: "cap", price: 88,
    badge: "LIMITED", badgeColor: "red",
    image: "https://n.nordstrommedia.com/it/19850047-b119-464f-a9ce-5942483d0d1d.png?crop=pad&w=780&h=1196",
    featured: false, inStock: false, rating: 3.5, reviews: 35
  },
  {
    id: 10, name: "Chrome Hearts Ring", cat: "ring", price: 56,
    badge: null, badgeColor: null,
    image: "https://cdn.snkrdunk.com/upload_bg_removed/CHA-0576.webp?size=l",
    featured: false, inStock: true, rating: 4.3, reviews: 54
  },
  {
    id: 11, name: "Waist Chain", cat: "chain", price: 126,
    badge: "NEW", badgeColor: "red",
    image: "https://uk.static.designerexchange.com/product_images/uk/Accessories/Belts/SBELVER7871_1_XL.PNG",
    featured: false, inStock: true, rating: 4.4, reviews: 38
  },
  {
    id: 12, name: "Chrome Hearts", cat: "belt", price: 99,
    badge: null, badgeColor: null,
    image: "https://cdn.snkrdunk.com/upload_bg_removed/CHA-0824.webp?size=l",
    featured: false, inStock: true, rating: 4.5, reviews: 41
  }
];

function buildProductCard(p) {
  const stockBadge = !p.inStock ? '<span class="out-badge">OUT OF STOCK</span>' : '';
  const badge = p.badge ? `<span class="product-badge badge-${p.badgeColor}">${p.badge}</span>` : '';
  const stars = '★'.repeat(Math.round(p.rating)) + '☆'.repeat(5 - Math.round(p.rating));
  return `
  <div class="col-md-6 col-lg-4" data-cat="${p.cat}" data-product-id="${p.id}">
    <div class="product-card rounded-2">
      ${badge}
      ${stockBadge}
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.name}" class="product-image">
      </div>
      <div class="product-info">
        <span class="product-cat">${p.cat.toUpperCase()}</span>
        <h3 class="product-title">${p.name}</h3>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          <span class="review-count">(${p.reviews})</span>
        </div>
        <div class="d-flex align-items-center justify-content-between mt-2">
          <span class="product-price">$${p.price}</span>
        </div>
        <div class="mt-3">
          <button class="btn-add ${!p.inStock ? 'disabled' : ''}"
            onclick="event.stopPropagation(); ${p.inStock ? `addToCart(${p.id}, this)` : ''}">
            <i class="fas fa-shopping-cart me-2"></i>
            ${p.inStock ? 'ADD TO CAGE' : 'OUT OF STOCK'}
          </button>
        </div>
      </div>
    </div>
  </div>`;
}
