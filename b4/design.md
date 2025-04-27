# Tài liệu Thiết kế - Image Gallery (Pinterest Style)

## 1. Kế hoạch và Thiết kế (10 điểm)

### 1.1. Nghiên cứu giao diện Pinterest (5 điểm)

*   **Mục tiêu:** Hiểu rõ cách Pinterest sắp xếp hình ảnh, bố cục tổng thể, và các thành phần chính.
*   **Quan sát:**
    *   **Bố cục Masonry:** Pinterest sử dụng bố cục dạng lưới không đều (masonry), nơi các cột có chiều rộng cố định nhưng các item có chiều cao khác nhau, tối ưu hóa không gian hiển thị.
    *   **Header:** Thường bao gồm logo, thanh tìm kiếm, các nút điều hướng (Trang chủ, Tạo,...), và thông tin người dùng. Header thường cố định khi cuộn.
    *   **Item Ảnh:** Mỗi ảnh là một "pin", khi hover thường hiển thị lớp phủ mờ với các nút hành động (Lưu, Chia sẻ,...) và thông tin cơ bản (tiêu đề). Click vào ảnh sẽ mở chi tiết.
    *   **Infinite Scroll:** Nội dung được tải thêm khi người dùng cuộn xuống.
    *   **Responsive:** Giao diện thích ứng tốt với các kích thước màn hình khác nhau.

### 1.2. Phác thảo giao diện và Xác định thành phần (5 điểm)

*   **Phác thảo:** (Mô tả phác thảo đơn giản hoặc tham chiếu đến file ảnh phác thảo nếu có)
    *   **Header:** Logo bên trái, thanh tìm kiếm ở giữa hoặc bên phải. Giữ cố định khi cuộn.
    *   **Navigation (Optional):** Thanh điều hướng danh mục (ví dụ: All, Nature, Animals) bên dưới header.
    *   **Main Content:** Khu vực chính hiển thị ảnh theo bố cục Masonry.
    *   **Gallery Item:** Khung chứa ảnh, có bo góc. Khi hover hiển thị tiêu đề ngắn và nút "Lưu".
*   **Thành phần cần thiết:**
    *   `header`: Chứa logo (`<img>`) và search bar (`<input>`, `<button>`).
    *   `nav` (optional): Chứa danh sách các danh mục (`<ul>`, `<li>`, `<a>`).
    *   `main`: Container chính.
    *   `.gallery`: Container cho các item ảnh, sử dụng Masonry.
    *   `.gallery-item`: Khối chứa từng ảnh.
        *   `<img>`: Thẻ hiển thị ảnh.
        *   `.item-info` (hiển thị khi hover): Chứa tiêu đề (`<p>`) và nút lưu (`<button class="save-btn">`).

## 2. Xây dựng cấu trúc HTML (20 điểm)

*   **File `index.html`:** Tạo file HTML cơ bản với `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`. Liên kết đến `style.css` và `script.js`. (Xem <mcfile name="index.html" path="/Users/macbookairm2/hubvn/b4/index.html"></mcfile>)
*   **Header:** Sử dụng thẻ `<header>` với class `header`. Bên trong có `div.logo` chứa `<img>` và `div.search-bar` chứa `<input type="text">` và `<button>`. (Xem <mcfile name="index.html" path="/Users/macbookairm2/hubvn/b4/index.html"></mcfile>)
*   **Navigation (Đã thêm):** Sử dụng thẻ `<nav>` với class `category-nav` chứa danh sách `ul > li > a` để lọc ảnh. (Xem <mcfile name="index.html" path="/Users/macbookairm2/hubvn/b4/index.html"></mcfile>)
*   **Gallery Container:** Sử dụng thẻ `<main>` với class `gallery-container` và bên trong là `div.gallery`. (Xem <mcfile name="index.html" path="/Users/macbookairm2/hubvn/b4/index.html"></mcfile>)
*   **Gallery Items:** Mỗi ảnh được đặt trong `div.gallery-item` có thuộc tính `data-category` để lọc. Bên trong chứa `<img>` và `div.item-info` (chứa `<p>` và `<button class="save-btn">`). (Xem <mcfile name="index.html" path="/Users/macbookairm2/hubvn/b4/index.html"></mcfile>)
*   **Thư viện JS:** Nhúng thư viện ImagesLoaded và Masonry thông qua CDN ở cuối thẻ `<body>`. (Xem <mcfile name="index.html" path="/Users/macbookairm2/hubvn/b4/index.html"></mcfile>)

## 3. Tạo kiểu dáng CSS (40 điểm)

*   **File `style.css`:** Tạo file CSS và liên kết trong `<head>` của `index.html`. (Xem <mcfile name="style.css" path="/Users/macbookairm2/hubvn/b4/style.css"></mcfile>)
*   **Bố cục Gallery:**
    *   Ban đầu sử dụng Flexbox (`display: flex`, `flex-wrap: wrap`) để sắp xếp cơ bản.
    *   Sau đó chuyển sang sử dụng thư viện Masonry JS để tạo bố cục động, CSS chỉ cần định nghĩa kiểu dáng cho item, không cần `display: grid` hay `flex`. Class `.gallery` cần `position: relative`. (Xem <mcfile name="style.css" path="/Users/macbookairm2/hubvn/b4/style.css"></mcfile>)
*   **Kiểu dáng Item:**
    *   `.gallery-item`: Đặt `width` (ví dụ: `15.5%` hoặc giá trị pixel cố định nếu `columnWidth` trong JS được đặt), `margin-bottom`, `background-color`, `border-radius`, `overflow: hidden`, `position: relative`, `box-shadow`. (Xem <mcfile name="style.css" path="/Users/macbookairm2/hubvn/b4/style.css"></mcfile>)
    *   `img`: `display: block`, `width: 100%`, `height: auto`.
    *   `.item-info`: `position: absolute`, `top`, `left`, `width`, `height`, `background-color` (rgba), `opacity: 0` (mặc định), `transition: opacity`. Hiển thị khi `.gallery-item:hover`. (Xem <mcfile name="style.css" path="/Users/macbookairm2/hubvn/b4/style.css"></mcfile>)
    *   `.save-btn`: Kiểu dáng cho nút lưu.
*   **Responsive Design:** Sử dụng Media Queries (`@media`) để điều chỉnh:
    *   Bố cục header (chuyển sang dạng cột trên màn hình nhỏ).
    *   Kích thước/số cột của gallery item (`width` của `.gallery-item` hoặc thông qua cấu hình Masonry nếu cần).
    *   Khoảng cách (`gap`).
    *   (Xem các khối `@media` trong <mcfile name="style.css" path="/Users/macbookairm2/hubvn/b4/style.css"></mcfile>)

## 4. Thêm tương tác JavaScript (20 điểm - tùy chọn)

*   **File `script.js`:** Tạo file JS và liên kết ở cuối `<body>`. (Xem <mcfile name="script.js" path="/Users/macbookairm2/hubvn/b4/script.js"></mcfile>)
*   **Hiệu ứng Hover:** Được xử lý chủ yếu bằng CSS (`.gallery-item:hover .item-info { opacity: 1; }`). JS có thể thêm các tương tác khác nếu cần.
*   **Thư viện Masonry:**
    *   Khởi tạo Masonry sau khi tất cả ảnh đã tải xong (sử dụng `imagesLoaded`).
    *   Cấu hình `itemSelector`, `gutter`, `percentPosition` (nếu dùng width %). (Xem <mcsymbol name="DOMContentLoaded" filename="script.js" path="/Users/macbookairm2/hubvn/b4/script.js" startline="1" type="function"></mcsymbol> trong <mcfile name="script.js" path="/Users/macbookairm2/hubvn/b4/script.js"></mcfile>)
*   **Lọc ảnh (Filtering):**
    *   Thêm sự kiện `click` cho các link trong `category-nav`.
    *   Khi click, lấy `data-category` được chọn.
    *   Thêm/xóa class `active` cho link.
    *   Ẩn/hiện các `.gallery-item` không phù hợp bằng cách thêm/xóa class `hidden`.
    *   **Quan trọng:** Gọi `msnry.reloadItems()` và `msnry.layout()` sau khi ẩn/hiện item để Masonry cập nhật lại bố cục. (Xem xử lý sự kiện `click` trong <mcfile name="script.js" path="/Users/macbookairm2/hubvn/b4/script.js"></mcfile>)
*   **Sự kiện khác:** Thêm sự kiện `click` cho nút "Lưu" và item ảnh để hiển thị thông báo (ví dụ: `alert` hoặc `console.log`). (Xem <mcfile name="script.js" path="/Users/macbookairm2/hubvn/b4/script.js"></mcfile>)

## 5. Tích hợp với Gen AI (10 điểm - tùy chọn)

*   **Công cụ sử dụng:** ChatGPT (hoặc công cụ tương tự).
*   **Ví dụ Prompt đã sử dụng (Giả định):**
    *   `"Tạo cấu trúc HTML cơ bản cho một trang gallery ảnh kiểu Pinterest với header (logo, search bar) và một khu vực gallery chính."`
    *   `"Viết CSS để tạo bố cục Masonry cho các div có class 'gallery-item' bên trong div 'gallery', sử dụng CSS Grid."` (Sau đó có thể đã chuyển sang dùng Masonry JS)
    *   `"Tạo hiệu ứng hover cho '.gallery-item': hiển thị một lớp phủ màu đen mờ với nút 'Lưu' ở góc dưới bên phải khi hover vào item."`
    *   `"Viết mã JavaScript sử dụng thư viện Masonry (CDN) để sắp xếp các phần tử '.gallery-item' trong '.gallery'. Đảm bảo khởi tạo sau khi ảnh đã tải xong."`
    *   `"Thêm chức năng lọc ảnh vào mã JavaScript Masonry hiện có. Có một thanh điều hướng với các link chứa thuộc tính 'data-category'. Khi click vào link, chỉ hiển thị các item có 'data-category' tương ứng và cập nhật layout Masonry."`
    *   `"Làm thế nào để làm cho bố cục Masonry này responsive? Cần thay đổi gì trong CSS và JavaScript?"`
*   **Điều chỉnh và Tối ưu hóa:** Code do AI tạo ra cần được xem xét, điều chỉnh class, cấu trúc, và tối ưu hóa để phù hợp với yêu cầu cụ thể và hoạt động chính xác (ví dụ: đảm bảo gọi `msnry.layout()` sau khi lọc).

## 6. Video Demo

*   **Link video:** https://drive.google.com/file/d/1lGXMw2tYvc0oGM2p6XEMkNjLqdCCRS0m/view?usp=drive_link