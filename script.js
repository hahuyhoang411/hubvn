const products = [
    {
        title: "iPhone 15 Pro Max",
        image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009279096",
        description: "iPhone 15 Pro Max với chip A17 Pro, màn hình Super Retina XDR 6.7 inch, camera 48MP và thiết kế titan cao cấp.",
        price: "34.999.000₫",
        url: "https://cellphones.com.vn/iphone-15-pro-max.html"
    },
    {
        title: "Samsung Galaxy S23 Ultra",
        image: "https://images.samsung.com/vn/smartphones/galaxy-s23-ultra/images/galaxy-s23-ultra-highlights-kv.jpg",
        description: "Samsung Galaxy S23 Ultra với chip Snapdragon 8 Gen 2, màn hình Dynamic AMOLED 2X 6.8 inch, camera 200MP.",
        price: "29.999.000₫",
        url: "https://cellphones.com.vn/samsung-galaxy-s23-ultra.html"
    },
    {
        title: "Xiaomi 13 Pro",
        image: "https://cdn.tgdd.vn/Products/Images/42/289700/xiaomi-13-pro-1.jpg",
        description: "Xiaomi 13 Pro với chip Snapdragon 8 Gen 2, màn hình AMOLED 6.73 inch, camera 50MP Leica.",
        price: "21.999.000₫",
        url: "https://cellphones.com.vn/xiaomi-13-pro.html"
    }
];

let currentProduct = 0;

let cart = [];

// Add this near the top with other variables
let filteredProducts = [...products];

// Add this function to handle filtering
function filterProducts() {
    const filterValue = document.getElementById('priceFilter').value;
    
    switch(filterValue) {
        case 'under-20':
            filteredProducts = products.filter(p => parseFloat(p.price.replace(/[^\d]/g, '')) < 20000000);
            break;
        case '20-30':
            filteredProducts = products.filter(p => {
                const price = parseFloat(p.price.replace(/[^\d]/g, ''));
                return price >= 20000000 && price <= 30000000;
            });
            break;
        case 'over-30':
            filteredProducts = products.filter(p => parseFloat(p.price.replace(/[^\d]/g, '')) > 30000000);
            break;
        default:
            filteredProducts = [...products];
    }
    
    // Reset to first product after filtering
    currentProduct = 0;
    updateProduct();
}

// Update the navigation functions to use filteredProducts
document.getElementById('prevProduct').addEventListener('click', function() {
    currentProduct = (currentProduct - 1 + filteredProducts.length) % filteredProducts.length;
    updateProduct();
});

document.getElementById('nextProduct').addEventListener('click', function() {
    currentProduct = (currentProduct + 1) % filteredProducts.length;
    updateProduct();
});

// Update updateProduct to use filteredProducts
function updateProduct() {
    const product = filteredProducts[currentProduct];
    document.getElementById('productTitle').textContent = product.title;
    document.getElementById('productImage').src = product.image;
    document.getElementById('productImage').alt = product.title;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('productPrice').textContent = `Giá: ${product.price}`;
    document.getElementById('productLink').href = product.url;
    document.getElementById('productLink').textContent = `Xem chi tiết ${product.title}`;
}

// Add event listener for the filter
document.getElementById('priceFilter').addEventListener('change', filterProducts);

// Add to cart function
function addToCart() {
    const product = products[currentProduct];
    cart.push(product);
    updateCartUI();
    alert(`Sản phẩm ${product.title} đã được thêm vào giỏ hàng!`);
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length > 0 ? 'block' : 'none';
    
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = cart.map(item => `
        <li>
            <img src="${item.image}" alt="${item.title}" width="50">
            <span>${item.title} - ${item.price}</span>
        </li>
    `).join('');
}

// Toggle cart modal
function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

// Event listeners
document.getElementById('prevProduct').addEventListener('click', function() {
    currentProduct = (currentProduct - 1 + products.length) % products.length;
    updateProduct();
});

document.getElementById('nextProduct').addEventListener('click', function() {
    currentProduct = (currentProduct + 1) % products.length;
    updateProduct();
});

document.getElementById('addToCart').addEventListener('click', addToCart);
document.getElementById('cartButton').addEventListener('click', toggleCart);
document.getElementById('closeCart').addEventListener('click', toggleCart);

// Initialize
updateProduct();