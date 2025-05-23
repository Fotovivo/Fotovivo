const supabaseUrl = 'https://nuhzrylyfakrsopxywlc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51aHpyeWx5ZmFrcnNvcHh5d2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzY3MTUsImV4cCI6MjA2MzUxMjcxNX0.gCQUlsfWuO16aewHAzieIFGCKMzi3MvJIVnwlyCMI9c';
const bucketName = 'media';

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById('videoInput').addEventListener('change', function () {
  const file = this.files[0];
  const sizeMB = (file.size / 1024 / 1024).toFixed(2);
  const label = document.getElementById('videoSizeLabel');
  if (file.size > 20 * 1024 * 1024) {
    label.textContent = `Размер видео: ${sizeMB} МБ (слишком большой!)`;
    label.style.color = "red";
  } else {
    label.textContent = `Размер видео: ${sizeMB} МБ (нормально)`;
    label.style.color = "green";
  }
});

document.getElementById('uploadForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const photoFile = document.getElementById('photoInput').files[0];
  const videoFile = document.getElementById('videoInput').files[0];
  const canvas = document.getElementById('qrCanvas');
  const status = document.getElementById('status');

  if (!photoFile || !videoFile) {
    status.textContent = 'Загрузите фото и видео!';
    return;
  }

  const timestamp = Date.now();

  const { data: photoUpload, error: photoError } = await supabase.storage
    .from(bucketName)
    .upload(`photos/${timestamp}_${photoFile.name}`, photoFile);
  const { data: videoUpload, error: videoError } = await supabase.storage
    .from(bucketName)
    .upload(`videos/${timestamp}_${videoFile.name}`, videoFile);

  if (photoError || videoError) {
    status.textContent = 'Ошибка загрузки файлов';
    return;
  }

  const videoUrl = `${supabaseUrl}/storage/v1/object/public/${videoUpload.path}`;
  const photoUrl = `${supabaseUrl}/storage/v1/object/public/${photoUpload.path}`;

  await supabase.from('ar_photos').insert([
    { title, description, photo_path: photoUpload.path, video_path: videoUpload.path }
  ]);

  QRCode.toCanvas(canvas, videoUrl, { width: 256 }, function (error) {
    if (error) status.textContent = 'Ошибка генерации QR-кода';
    else status.textContent = 'QR-код сгенерирован. Распечатайте его.';
  });
});
