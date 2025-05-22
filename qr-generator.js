document.getElementById('generate-qr').addEventListener('click', function () {
    const videoUrl = document.getElementById('video-url').value;
    if (!videoUrl) {
        alert('Сначала вставьте ссылку на видео!');
        return;
    }

    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = ''; // Очистка предыдущего QR

    new QRCode(qrContainer, {
        text: videoUrl,
        width: 256,
        height: 256
    });
});
