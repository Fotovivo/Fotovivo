import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://nuhzrylyfakrsopxywlc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51aHpyeWx5ZmFrcnNvcHh5d2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzY3MTUsImV4cCI6MjA2MzUxMjcxNX0.gCQUlsfWuO16aewHAzieIFGCKMzi3MvJIVnwlyCMI9c";
const bucketName = "media";
console.log('SUPABASE_URL:', SUPABASE_URL);
console.log('SUPABASE_KEY (короче):', SUPABASE_KEY?.slice(0, 10)); // обрезаем для безопасности
console.log('BUCKET_NAME:', BUCKET_NAME);
const supabase = createClient(supabaseUrl, supabaseKey);
console.log('Кнопка нажата, начинаем генерацию QR-кода');
document.getElementById('generateBtn').addEventListener('click', async () => {
    const photo = document.getElementById('photoInput').files[0];
    const video = document.getElementById('videoInput').files[0];
console.log('Загружаем файл:', file.name);
    if (!photo || !video) {
        alert("Please upload both a photo and a video.");
        return;
    }
console.log('Загружаем файл:', file.name);
    const photoPath = `photo-${Date.now()}-${photo.name}`;
    const videoPath = `video-${Date.now()}-${video.name}`;

    const { error: photoError } = await supabase.storage.from(bucketName).upload(photoPath, photo);
    const { error: videoError } = await supabase.storage.from(bucketName).upload(videoPath, video);
console.log('Загружаем файл:', file.name);
    if (photoError || videoError) {
        alert("Upload failed.");
        return;
    }

    const { data: photoUrlData } = supabase.storage.from(bucketName).getPublicUrl(photoPath);
    const { data: videoUrlData } = supabase.storage.from(bucketName).getPublicUrl(videoPath);

    const qrParams = new URLSearchParams({
  photo: photoUrlData.publicUrl,
  video: videoUrlData.publicUrl,
});
const qrLink = `${window.location.origin}/view.html?${qrParams.toString()}`;
    });

    const canvas = document.getElementById("qrCanvas");
    QRCode.toCanvas(canvas, qrLink, function (error) {
        if (error) console.error(error);
        else document.getElementById("preview").innerText = "QR-код сгенерирован!";
        console.log('QR-код создан, ссылка:', qrCodeUrl);
    });
});
