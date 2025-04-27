document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    const galleryItems = gallery.querySelectorAll('.gallery-item'); // Lấy tất cả item ban đầu
    const categoryLinks = document.querySelectorAll('.category-nav a');
    const searchInput = document.getElementById('searchInput'); // Giả sử input có id="searchInput"

    let msnry; // Khai báo msnry ở scope rộng hơn

    imagesLoaded(gallery, function() {
        msnry = new Masonry(gallery, {
            itemSelector: '.gallery-item',
            gutter: 15, // Khoảng cách giữa các item
            percentPosition: true
        });
        console.log('Masonry initialized');
    });

    categoryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Bỏ active class khỏi link cũ, thêm vào link mới
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const selectedCategory = this.getAttribute('data-category');
            const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : ''; // Lấy lại search term hiện tại
            let hasVisibleItems = false;

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                const titleElement = item.querySelector('.item-info p');
                const itemText = titleElement ? titleElement.textContent.toLowerCase() : '';

                // Kiểm tra khớp cả danh mục VÀ tìm kiếm
                const matchesCategory = (selectedCategory === 'all' || itemCategory === selectedCategory);
                const matchesSearch = itemText.includes(searchTerm);

                if (matchesCategory && matchesSearch) {
                    item.classList.remove('hidden');
                    hasVisibleItems = true;
                } else {
                    item.classList.add('hidden');
                }
            });

            // Cập nhật Masonry layout
            if (msnry) {
                msnry.reloadItems();
                msnry.layout();
                console.log('Masonry layout updated after category filter');
            } else {
                 console.error('Masonry instance (msnry) not available for category update.');
            }

             // (Tùy chọn) Cập nhật thông báo không có kết quả
            const noResultsMessage = document.getElementById('noResultsMessage');
            if (noResultsMessage) {
                noResultsMessage.style.display = hasVisibleItems ? 'none' : 'block';
            }
        });
    });
     // --- Kết thúc xử lý lọc danh mục ---


    // --- Thêm code xử lý tìm kiếm ---
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            let hasVisibleItems = false; // Biến kiểm tra xem có item nào hiển thị không

            galleryItems.forEach(item => {
                // Lấy tiêu đề từ thẻ p bên trong item-info, hoặc phần tử khác nếu cấu trúc HTML khác
                const titleElement = item.querySelector('.item-info p'); // Điều chỉnh selector nếu cần
                const itemText = titleElement ? titleElement.textContent.toLowerCase() : '';
                const currentCategory = item.getAttribute('data-category');
                const activeCategoryLink = document.querySelector('.category-nav a.active');
                const selectedCategory = activeCategoryLink ? activeCategoryLink.getAttribute('data-category') : 'all';

                // Kiểm tra xem item có khớp với tìm kiếm VÀ danh mục đang chọn không
                const matchesSearch = itemText.includes(searchTerm);
                const matchesCategory = (selectedCategory === 'all' || currentCategory === selectedCategory);

                if (matchesSearch && matchesCategory) {
                    item.classList.remove('hidden');
                    hasVisibleItems = true;
                } else {
                    item.classList.add('hidden');
                }
            });

            // Cập nhật Masonry layout sau khi ẩn/hiện items
            if (msnry) {
                msnry.reloadItems(); // Thông báo cho Masonry về các item đã thay đổi (bị ẩn/hiện)
                msnry.layout(); // Yêu cầu Masonry sắp xếp lại layout
                console.log('Masonry layout updated after search');
            } else {
                console.error('Masonry instance (msnry) not available for search update.');
            }

            // (Tùy chọn) Hiển thị thông báo nếu không có kết quả
            const noResultsMessage = document.getElementById('noResultsMessage'); // Thêm thẻ này vào HTML nếu muốn
            if (noResultsMessage) {
                noResultsMessage.style.display = hasVisibleItems ? 'none' : 'block';
            }
        });
    } else {
        console.warn('Search input element not found.');
    }
     // --- Kết thúc code xử lý tìm kiếm ---


    // --- Xử lý lọc danh mục (Cập nhật để hoạt động cùng tìm kiếm) ---
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Bỏ active class khỏi link cũ, thêm vào link mới
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const selectedCategory = this.getAttribute('data-category');
            const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : ''; // Lấy lại search term hiện tại
            let hasVisibleItems = false;

            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                const titleElement = item.querySelector('.item-info p');
                const itemText = titleElement ? titleElement.textContent.toLowerCase() : '';

                // Kiểm tra khớp cả danh mục VÀ tìm kiếm
                const matchesCategory = (selectedCategory === 'all' || itemCategory === selectedCategory);
                const matchesSearch = itemText.includes(searchTerm);

                if (matchesCategory && matchesSearch) {
                    item.classList.remove('hidden');
                    hasVisibleItems = true;
                } else {
                    item.classList.add('hidden');
                }
            });

            // Cập nhật Masonry layout
            if (msnry) {
                msnry.reloadItems();
                msnry.layout();
                console.log('Masonry layout updated after category filter');
            } else {
                 console.error('Masonry instance (msnry) not available for category update.');
            }

             // (Tùy chọn) Cập nhật thông báo không có kết quả
            const noResultsMessage = document.getElementById('noResultsMessage');
            if (noResultsMessage) {
                noResultsMessage.style.display = hasVisibleItems ? 'none' : 'block';
            }
        });
    });
     // --- Kết thúc xử lý lọc danh mục ---


    // --- Xử lý sự kiện cho từng ảnh (giữ nguyên) ---
    galleryItems.forEach(item => {
        const saveButton = item.querySelector('.save-btn');
        if (saveButton) {
            saveButton.addEventListener('click', (event) => {
                event.stopPropagation();
                const imageSrc = item.querySelector('img')?.src;
                alert(`Đã lưu ảnh: ${imageSrc || 'Không tìm thấy ảnh'}`);
            });
        }
         item.addEventListener('click', () => {
             const imageSrc = item.querySelector('img')?.src;
             console.log(`Đã click vào ảnh: ${imageSrc || 'Không tìm thấy ảnh'}`);
         });
    });

});