const products = [
    {
        title: "iPhone 15 Pro Max",
        image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009279096",
        description: "iPhone 15 Pro Max với chip A17 Pro, màn hình Super Retina XDR 6.7 inch, camera 48MP và titan cao cấp.",
        price: "34.999.000₫",
        url: "https://cellphones.com.vn/iphone-15-pro-max.html"
    },
    {
        title: "Samsung Galaxy S23 Ultra",
        image: "https://images.samsung.com/vn/smartphones/galaxy-s23-ultra/images/galaxy-s23-ultra-highlights-kv.jpg",
        description: "S23 Ultra với chip Snapdragon 8 Gen 2, màn hình Dynamic AMOLED 2X 6.8 inch, camera 200MP.",
        price: "29.999.000₫",
        url: "https://cellphones.com.vn/samsung-galaxy-s23-ultra.html"
    },
    {
        title: "Xiaomi 13 Pro",
        image: "https://i02.appmifile.com/974_operator_sg/15/02/2023/25063acab659d7f38d5f2959ad808d04.png",
        description: "Xiaomi 13 Pro với chip Snapdragon 8 Gen 2, màn hình AMOLED 6.73 inch, camera 50MP Leica.",
        price: "21.999.000₫",
        url: "https://cellphones.com.vn/xiaomi-13-pro.html"
    },
    {
        title: "iPhone 14 Pro",
        image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-1inch?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1663703841896",
        description: "iPhone 14 Pro với chip A16 Bionic, màn hình Super Retina XDR 6.1 inch, camera 48MP.",
        price: "26.999.000₫",
        url: "https://cellphones.com.vn/iphone-14-pro.html"
    },
    {
        title: "Samsung Galaxy Z Flip5",
        image: "https://mobile.free.fr/webpublic/Master_Phone_Samsung_23_9699ada3f0.png",
        description: "Samsung Galaxy Z Flip5 điện thoại màn hình gập với chip Snapdragon 8 Gen 2.",
        price: "19.999.000₫",
        url: "https://cellphones.com.vn/samsung-galaxy-z-flip-5.html"
    },
    {
        title: "Oppo Find N2 Flip",
        image: "https://cdn.tgdd.vn/Products/Images/42/299034/oppo-find-n2-flip-purple-thumb-1-600x600-1-600x600.jpg",
        description: "Oppo Find N2 Flip điện thoại màn hình gập với chip Dimensity 9000+.",
        price: "17.999.000₫",
        url: "https://cellphones.com.vn/oppo-find-n2-flip.html"
    },
    {
        title: "iPhone 15 Pro",
        image: "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009279096",
        description: "iPhone 15 Pro với chip A17 Pro, màn hình Super Retina XDR 6.1 inch, camera 48MP.",
        price: "31.999.000₫",
        url: "https://cellphones.com.vn/iphone-15-pro.html"
    },
    {
        title: "Samsung Galaxy S23+",
        image: "https://www.tecnosell.fr/media/catalog/product/cache/60c31028333b516fd0f8945d994bb7aa/b/k/bk1_23_3.jpg",
        description: "Samsung Galaxy S23+ với chip Snapdragon 8 Gen 2, màn hình Dynamic AMOLED 2X 6.6 inch.",
        price: "13.999.000₫",
        url: "https://cellphones.com.vn/samsung-galaxy-s23-plus.html"
    },
    {
        title: "Xiaomi 13T Pro",
        image: "https://m.media-amazon.com/images/I/51uTlVOY6DL.jpg",
        description: "Xiaomi 13T Pro với chip Dimensity 9200+, màn hình AMOLED 6.67 inch.",
        price: "15.999.000₫",
        url: "https://cellphones.com.vn/xiaomi-13t-pro.html"
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

// Keep only these event listeners (they use filteredProducts)
document.getElementById('prevProduct').addEventListener('click', function() {
    currentProduct = (currentProduct - 1 + filteredProducts.length) % filteredProducts.length;
    updateProduct();
});

document.getElementById('nextProduct').addEventListener('click', function() {
    currentProduct = (currentProduct + 1) % filteredProducts.length;
    updateProduct();
});

document.getElementById('addToCart').addEventListener('click', addToCart);
document.getElementById('cartButton').addEventListener('click', toggleCart);
document.getElementById('closeCart').addEventListener('click', toggleCart);

// Initialize
updateProduct();

// Add this function
function checkout() {
    if (cart.length === 0) {
        alert('Giỏ hàng của bạn đang trống!');
        return;
    }
    
    const total = cart.reduce((sum, item) => {
        return sum + parseFloat(item.price.replace(/[^\d]/g, ''));
    }, 0);
    
    const formattedTotal = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(total);
    
    if (confirm(`Xác nhận thanh toán ${formattedTotal}?`)) {
        alert('Thanh toán thành công! Cảm ơn bạn đã mua hàng.');
        cart = [];
        updateCartUI();
        toggleCart();
    }
}

// Add this event listener (place it with other event listeners)
document.getElementById('checkoutButton').addEventListener('click', checkout);