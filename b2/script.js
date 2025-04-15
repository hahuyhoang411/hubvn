const canvas = document.getElementById('palaceCanvas');
const ctx = canvas.getContext('2d');

if (canvas.getContext) {
    console.log("Canvas đã sẵn sàng để vẽ Dinh Độc Lập với vườn!");

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const centerX = canvasWidth / 2;

    // --- Màu sắc ---
    const palaceColor = '#DAA520';
    const backgroundColor = 'white';
    const strokeColor = '#444';
    const skyColor = '#87CEEB';
    const lawnColor = '#2E8B57';
    const bushColor = '#006400';
    const brickColor = '#D2B48C';
    const potColor = '#A0522D'; // Màu chậu (NÂU)
    const fountainBaseColor = '#A9A9A9';
    const waterColor = '#ADD8E6';

    const strokeWidth = 1;

    // --- Offset để dịch chuyển Dinh lên trên ---
    const palaceOffsetY = -60;

    // --- Hàm vẽ ngôi sao ---
    function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
        // ... (Giữ nguyên hàm drawStar)
        let rot = Math.PI / 2 * 3; let x = cx; let y = cy; let step = Math.PI / spikes;
        ctx.beginPath(); ctx.moveTo(cx, cy - outerRadius);
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius; y = cy + Math.sin(rot) * outerRadius; ctx.lineTo(x, y); rot += step;
            x = cx + Math.cos(rot) * innerRadius; y = cy + Math.sin(rot) * innerRadius; ctx.lineTo(x, y); rot += step;
        }
        ctx.lineTo(cx, cy - outerRadius); ctx.closePath(); ctx.fillStyle = palaceColor; ctx.fill();
    }

    // --- Vẽ nền trời ---
    ctx.fillStyle = skyColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // --- Kích thước và vị trí cơ bản của Dinh ---
    const palaceTotalWidth = 400; const mainBodyHeight = 120; const baseHeight = 20; const roofHeight = 15; const centralRoofHeight = 25; const centralRoofWidth = 100; const roofOverhang = 10; const starSize = 8;
    const topY = 80 + palaceOffsetY; const mainRoofY = topY + centralRoofHeight; const mainBodyY = mainRoofY + roofHeight; const palaceBaseY = mainBodyY + mainBodyHeight; const palaceBottomY = palaceBaseY + baseHeight;
    const palaceLeftX = centerX - palaceTotalWidth / 2;

    // --- Vẽ Khu vườn và Nền ---
    const brickBaseHeight = 30; const brickBaseY = palaceBottomY;
    ctx.fillStyle = brickColor; ctx.fillRect(0, brickBaseY, canvasWidth, brickBaseHeight); ctx.strokeStyle = '#8B4513'; ctx.lineWidth = 0.5; ctx.strokeRect(0, brickBaseY, canvasWidth, brickBaseHeight);
    const lawnY = brickBaseY + brickBaseHeight;
    ctx.fillStyle = lawnColor; ctx.fillRect(0, lawnY, canvasWidth, canvasHeight - lawnY);
    const bushHeight = 40; const bushY = brickBaseY - bushHeight / 2; const bushWidth = canvasWidth * 0.8; const bushLeftX = centerX - bushWidth / 2;
    ctx.fillStyle = bushColor; ctx.fillRect(bushLeftX, bushY, bushWidth, bushHeight); ctx.fillRect(bushLeftX + 20, bushY - 5, bushWidth - 40, bushHeight);
    const fountainBaseRadius = 30; const fountainBaseY = brickBaseY + brickBaseHeight / 2; const fountainCenterX = centerX;
    ctx.fillStyle = fountainBaseColor; ctx.beginPath(); ctx.arc(fountainCenterX, fountainBaseY, fountainBaseRadius, 0, 2 * Math.PI); ctx.fill();
    ctx.strokeStyle = waterColor; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(fountainCenterX, fountainBaseY); ctx.lineTo(fountainCenterX, fountainBaseY - 50); ctx.moveTo(fountainCenterX - 10, fountainBaseY); ctx.quadraticCurveTo(fountainCenterX - 20, fountainBaseY - 40, fountainCenterX - 5, fountainBaseY - 50); ctx.moveTo(fountainCenterX + 10, fountainBaseY); ctx.quadraticCurveTo(fountainCenterX + 20, fountainBaseY - 40, fountainCenterX + 5, fountainBaseY - 50); ctx.stroke();

    // --- Vẽ Dinh Độc Lập ---
    ctx.fillStyle = palaceColor; ctx.fillRect(palaceLeftX, palaceBaseY, palaceTotalWidth, baseHeight); ctx.strokeStyle = strokeColor; ctx.lineWidth = strokeWidth; ctx.strokeRect(palaceLeftX, palaceBaseY, palaceTotalWidth, baseHeight);
    ctx.fillStyle = backgroundColor; ctx.fillRect(palaceLeftX, mainBodyY, palaceTotalWidth, mainBodyHeight); ctx.strokeStyle = strokeColor; ctx.lineWidth = strokeWidth; ctx.strokeRect(palaceLeftX, mainBodyY, palaceTotalWidth, mainBodyHeight);
    ctx.fillStyle = palaceColor; const gapWidth = 10; const columnWidth = 12; const numColumnsTotal = Math.floor(palaceTotalWidth / (columnWidth + gapWidth)); const actualContentWidth = numColumnsTotal * (columnWidth + gapWidth) - gapWidth; let startDrawX = centerX - actualContentWidth / 2; let currentX = startDrawX;
    for (let i = 0; i < numColumnsTotal; i++) { ctx.fillRect(currentX, mainBodyY, columnWidth, mainBodyHeight); currentX += columnWidth + gapWidth; }
    ctx.fillStyle = palaceColor; ctx.fillRect(palaceLeftX - roofOverhang, mainRoofY, palaceTotalWidth + 2 * roofOverhang, roofHeight); ctx.strokeStyle = strokeColor; ctx.lineWidth = strokeWidth; ctx.strokeRect(palaceLeftX - roofOverhang, mainRoofY, palaceTotalWidth + 2 * roofOverhang, roofHeight);
    const centralRoofLeftX = centerX - centralRoofWidth / 2; ctx.fillStyle = palaceColor; ctx.fillRect(centralRoofLeftX - roofOverhang, topY, centralRoofWidth + 2 * roofOverhang, centralRoofHeight); ctx.strokeStyle = strokeColor; ctx.lineWidth = strokeWidth; ctx.strokeRect(centralRoofLeftX - roofOverhang, topY, centralRoofWidth + 2 * roofOverhang, centralRoofHeight);
    const starCenterX = centerX; const starCenterY = topY - starSize * 1.5;
    drawStar(starCenterX, starCenterY, 5, starSize, starSize / 2);

    // --- Vẽ cây trong chậu (ĐÃ SỬA LỖI) ---
    const potWidth = 15;
    const potHeight = 20;
    const plantRadius = 10;
    const potY = brickBaseY - potHeight;
    const numPotsSide = 2;
    const potSpacing = 80;

    ctx.strokeStyle = '#5C2E11'; // Chỉ cần đặt strokeStyle một lần trước các vòng lặp
    ctx.lineWidth = 1;

    // Chậu bên trái
    for(let i=0; i<numPotsSide; i++){
        const potX = palaceLeftX + potSpacing * (i + 1) - potWidth/2;
        // === SỬA LỖI: Đặt lại fillStyle MỖI LẦN vẽ chậu ===
        ctx.fillStyle = potColor;
        ctx.fillRect(potX, potY, potWidth, potHeight);
        ctx.strokeRect(potX, potY, potWidth, potHeight); // Vẽ viền
        // Cây
        ctx.fillStyle = bushColor; // Đặt màu cho cây
        ctx.beginPath();
        ctx.arc(potX + potWidth / 2, potY - plantRadius / 2, plantRadius, 0, Math.PI * 2);
        ctx.fill();
    }
     // Chậu bên phải
     for(let i=0; i<numPotsSide; i++){
        const potX = palaceLeftX + palaceTotalWidth - potSpacing * (i + 1) - potWidth/2;
        // === SỬA LỖI: Đặt lại fillStyle MỖI LẦN vẽ chậu ===
        ctx.fillStyle = potColor;
        ctx.fillRect(potX, potY, potWidth, potHeight);
        ctx.strokeRect(potX, potY, potWidth, potHeight); // Vẽ viền
        // Cây
        ctx.fillStyle = bushColor; // Đặt màu cho cây
        ctx.beginPath();
        ctx.arc(potX + potWidth / 2, potY - plantRadius / 2, plantRadius, 0, Math.PI * 2);
        ctx.fill();
    }

} else {
    console.error("Trình duyệt không hỗ trợ Canvas!");
}