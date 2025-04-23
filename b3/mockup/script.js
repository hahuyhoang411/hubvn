document.addEventListener('DOMContentLoaded', () => {
    const newChatBtn = document.getElementById('new-chat-btn');
    const messageList = document.getElementById('message-list');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const uploadBtn = document.getElementById('upload-btn');
    const chatTitle = document.getElementById('chat-title');
    const loadingIndicator = document.getElementById('loading-indicator');
    const chatHistoryList = document.getElementById('chat-history-list');

    // Hàm thêm tin nhắn vào danh sách
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender); // sender là 'user' hoặc 'ai'
        messageDiv.textContent = text;

        // Thêm trích dẫn giả cho AI
        if (sender === 'ai') {
            const citationSpan = document.createElement('span');
            citationSpan.classList.add('citation');
            citationSpan.textContent = 'Nguồn: [Tài liệu ABC, trang X]'; // Trích dẫn giả
            messageDiv.appendChild(document.createElement('br')); // Xuống dòng trước trích dẫn
            messageDiv.appendChild(citationSpan);
        }

        messageList.appendChild(messageDiv);
        messageList.scrollTop = messageList.scrollHeight; // Cuộn xuống dưới cùng
    }

    // Hàm mô phỏng AI trả lời
    function simulateAiResponse(userMessage) {
        loadingIndicator.style.display = 'block'; // Hiển thị chỉ báo đang xử lý
        messageInput.disabled = true;
        sendBtn.disabled = true;

        setTimeout(() => {
            let aiText = "Đây là câu trả lời mẫu cho: '" + userMessage + "'. ";
            aiText += "Thông tin này được lấy từ các nguồn đáng tin cậy.";
            addMessage(aiText, 'ai');
            loadingIndicator.style.display = 'none'; // Ẩn chỉ báo
            messageInput.disabled = false;
            sendBtn.disabled = false;
            messageInput.focus();
        }, 1500); // Giả lập độ trễ 1.5 giây
    }

    // Xử lý nút Gửi
    sendBtn.addEventListener('click', () => {
        const text = messageInput.value.trim();
        if (text) {
            addMessage(text, 'user');
            messageInput.value = ''; // Xóa input
            simulateAiResponse(text); // Gọi AI trả lời (mô phỏng)
        }
    });

    // Cho phép gửi bằng Enter (Shift+Enter để xuống dòng)
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Ngăn xuống dòng mặc định
            sendBtn.click(); // Kích hoạt nút gửi
        }
    });

    // Xử lý nút Tải lên (demo)
    uploadBtn.addEventListener('click', () => {
        alert('Chức năng Tải lên chưa được triển khai trong mockup này.');
        // Trong ứng dụng thực tế, bạn sẽ mở hộp thoại chọn file ở đây
    });

    // Xử lý nút Cuộc trò chuyện mới
    newChatBtn.addEventListener('click', () => {
        messageList.innerHTML = ''; // Xóa tin nhắn cũ
        chatTitle.textContent = 'Cuộc trò chuyện mới';
        addMessage('Chào bạn! Bắt đầu cuộc trò chuyện mới.', 'ai'); // Tin nhắn chào mừng mới
        messageInput.value = '';
        messageInput.focus();
    });

     // Xử lý chọn cuộc trò chuyện từ lịch sử (demo)
    chatHistoryList.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
            const selectedTitle = e.target.textContent;
            chatTitle.textContent = selectedTitle;
            messageList.innerHTML = ''; // Xóa tin nhắn hiện tại
            // Thêm tin nhắn giả lập cho cuộc trò chuyện đã chọn
            addMessage(`Chào mừng quay trở lại cuộc trò chuyện "${selectedTitle}"`, 'ai');
            addMessage('Đây là tin nhắn trước đó của bạn...', 'user');
            addMessage('Và đây là câu trả lời của AI...', 'ai');
             messageInput.focus();
        }
    });

});