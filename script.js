
document.getElementById('videoInput').addEventListener('change', function() {
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

document.getElementById('uploadForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const canvas = document.getElementById('qrCanvas');
  const qrData = JSON.stringify({ title, description, time: Date.now() });
  QRCode.toCanvas(canvas, qrData, { width: 256 }, function (error) {
    const status = document.getElementById('status');
    if (error) {
      status.textContent = "Ошибка генерации QR-кода.";
    } else {
      status.textContent = "QR-код сгенерирован. Распечатайте его.";
    }
  });
});
