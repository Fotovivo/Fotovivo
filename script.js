import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://YOUR_PROJECT_ID.supabase.co";
const supabaseKey = "YOUR_PUBLIC_API_KEY";
const bucketName = "media";

const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById('generateBtn').addEventListener('click', async () => {
    const photo = document.getElementById('photoInput').files[0];
    const video = document.getElementById('videoInput').files[0];

    if (!photo || !video) {
        alert("Please upload both a photo and a video.");
        return;
    }

    const photoPath = `photo-${Date.now()}-${photo.name}`;
    const videoPath = `video-${Date.now()}-${video.name}`;

    const { error: photoError } = await supabase.storage.from(bucketName).upload(photoPath, photo);
    const { error: videoError } = await supabase.storage.from(bucketName).upload(videoPath, video);

    if (photoError || videoError) {
        alert("Upload failed.");
        return;
    }

    const { data: photoUrlData } = supabase.storage.from(bucketName).getPublicUrl(photoPath);
    const { data: videoUrlData } = supabase.storage.from(bucketName).getPublicUrl(videoPath);

    const qrData = JSON.stringify({
        photo: photoUrlData.publicUrl,
        video: videoUrlData.publicUrl,
    });

    const canvas = document.getElementById("qrCanvas");
    QRCode.toCanvas(canvas, qrData, function (error) {
        if (error) console.error(error);
        else document.getElementById("preview").innerText = "QR-код сгенерирован!";
    });
});