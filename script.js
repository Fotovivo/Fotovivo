document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const photo = document.getElementById('photoInput').files[0];
    const video = document.getElementById('videoInput').files[0];
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (!photo || !video) {
        alert('Загрузите фото и видео!');
        return;
    }

    if (video.size > 20 * 1024 * 1024) {
        alert('Видео превышает 20MB!');
        return;
    }

    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('video', video);
    formData.append('title', title);
    formData.append('description', description);

    const res = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData
    });
    const data = await res.json();
    const canvas = document.getElementById('qrCanvas');
    QRCode.toCanvas(canvas, data.qr_url, function (error) {
        if (error) console.error(error);
        document.getElementById('preview').appendChild(canvas);
    });
});
