document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    const galleryItems = gallery.querySelectorAll('.gallery-item'); // Lấy tất cả item ban đầu
    const categoryLinks = document.querySelectorAll('.category-nav a');
    const searchInput = document.querySelector('.search-bar input'); // Corrected selector

    // New elements for image generation
    const imagePromptInput = document.getElementById('imagePromptInput');
    const generateImageBtn = document.getElementById('generateImageBtn');

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

    // --- Event listener for Image Generation Button ---
    if (generateImageBtn && imagePromptInput) {
        generateImageBtn.addEventListener('click', async function() {
            const prompt = imagePromptInput.value.trim();
            if (!prompt) {
                alert('Please enter a prompt to generate an image.');
                return;
            }

            // Visual feedback: disable button, show loading state (optional)
            generateImageBtn.disabled = true;
            generateImageBtn.textContent = 'Generating...';

            try {
                console.log(`Sending prompt to backend: ${prompt}`);
                const response = await fetch('/api/generate-image', { // No need for http://localhost:3000 if served from same origin
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: prompt }),
                });

                const data = await response.json();

                if (!response.ok || !data.success) {
                    console.error('Backend error:', data.error, data.details || '');
                    alert(`Error generating image: ${data.error || 'Unknown error from server'}`);
                    throw new Error(data.error || 'Image generation failed on server');
                }

                console.log('Received from backend:', data.prompt, `Image size (base64): ${data.imageBase64 ? data.imageBase64.length : 0}`);

                if (data.imageBase64) {
                    const newImageSrc = `data:image/png;base64,${data.imageBase64}`;
                    const newItem = document.createElement('div');
                    newItem.classList.add('gallery-item');
                    // You might want a specific category or way to identify generated images
                    newItem.setAttribute('data-category', 'generated'); 
                    
                    const img = document.createElement('img');
                    img.src = newImageSrc;
                    img.alt = data.prompt; // Use the returned prompt for alt text

                    const itemInfo = document.createElement('div');
                    itemInfo.classList.add('item-info');
                    const p = document.createElement('p');
                    p.textContent = data.prompt; // Use the returned prompt for the caption
                    const saveBtn = document.createElement('button');
                    saveBtn.classList.add('save-btn');
                    saveBtn.textContent = 'Lưu';

                    // Add event listener for the new save button
                    saveBtn.addEventListener('click', (event) => {
                        event.stopPropagation();
                        alert(`Đã lưu ảnh: ${data.prompt}`);
                    });

                    itemInfo.appendChild(p);
                    itemInfo.appendChild(saveBtn);
                    newItem.appendChild(img);
                    newItem.appendChild(itemInfo);

                    // Add click listener for the new item itself (like other gallery items)
                    newItem.addEventListener('click', () => {
                        console.log(`Đã click vào ảnh: ${data.prompt}`);
                    });

                    gallery.appendChild(newItem);
                    // Add to the original galleryItems collection for filtering if needed (though it might be better to re-query)
                    // galleryItems = gallery.querySelectorAll('.gallery-item'); 

                    if (msnry) {
                        // Ensure the image is loaded before Masonry tries to lay it out
                        imagesLoaded(newItem, function() {
                            msnry.appended(newItem);
                            msnry.layout();
                            console.log('Masonry layout updated for new generated item.');
                        });
                    } else {
                        console.error('Masonry instance (msnry) not available to append new item.');
                    }
                    imagePromptInput.value = ''; // Clear the prompt input
                } else {
                    alert('Image generation succeeded but no image data received.');
                }

            } catch (error) {
                console.error('Error during image generation process:', error);
                alert(`Failed to generate image. ${error.message}`);
            } finally {
                // Re-enable button
                generateImageBtn.disabled = false;
                generateImageBtn.textContent = 'Generate Image';
            }
        });
    } else {
        if (!imagePromptInput) console.warn('Image prompt input not found.');
        if (!generateImageBtn) console.warn('Generate image button not found.');
    }

});