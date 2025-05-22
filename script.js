
// Подключение к Supabase
const SUPABASE_URL = 'https://nuhzrylyfakrsopxywlc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51aHpyeWx5ZmFrcnNvcHh5d2xjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzY3MTUsImV4cCI6MjA2MzUxMjcxNX0.gCQUlsfWuO16aewHAzieIFGCKMzi3MvJIVnwlyCMI9c';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Обработчик кнопки
document.getElementById('generateBtn').addEventListener('click', async () => {
  const photo = document.getElementById('photoInput').files[0];
  const video = document.getElementById('videoInput').files[0];

  if (!photo || !video) {
    alert('Пожалуйста, загрузите и фото, и видео');
    return;
  }

  const storageKey = 'ar-' + Date.now();

  // Загрузка фото
  const { data: photoData, error: photoError } = await supabase.storage
    .from('media')
    .upload(`${storageKey}/photo.jpg`, photo);

  if (photoError) {
    alert('Ошибка при загрузке фото');
    return;
  }

  // Загрузка видео
  const { data: videoData, error: videoError } = await supabase.storage
    .from('media')
    .upload(`${storageKey}/video.mp4`, video);

  if (videoError) {
    alert('Ошибка при загрузке видео');
    return;
  }

  // Создание QR-кода
  const url = `${window.location.origin}/view.html?ref=${storageKey}`;
  new QRCode(document.getElementById('qrCanvas'), {
    text: url,
    width: 256,
    height: 256
  });

  document.getElementById('preview').innerText = 'Сканируй QR-код для просмотра';
});
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
