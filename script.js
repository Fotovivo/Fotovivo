
document.getElementById('generateBtn').addEventListener('click', async () => {
    const photo = document.getElementById('photoInput').files[0];
    const video = document.getElementById('videoInput').files[0];

    if (!photo || !video) {
        alert('Пожалуйста, загрузите и фото, и видео');
        return;
    }

    const readerPhoto = new FileReader();
    const readerVideo = new FileReader();

    readerPhoto.onload = function () {
        const photoData = readerPhoto.result;
        readerVideo.onload = function () {
            const videoData = readerVideo.result;

            const storageKey = 'ar-' + Date.now();
            localStorage.setItem(storageKey, JSON.stringify({
                photo: photoData,
                video: videoData
            }));

            const url = window.location.origin + '/view.html?ref=' + storageKey;
            const qr = new QRCode(document.getElementById('qrCanvas'), {
                text: url,
                width: 256,
                height: 256
            });

            document.getElementById('preview').innerText = "Сканируй QR-код для просмотра";
        };
        readerVideo.readAsDataURL(video);
    };
    readerPhoto.readAsDataURL(photo);
});
