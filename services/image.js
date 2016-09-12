
export function getImageBase64(img) {
  let canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, img.height);
  const dataURL = canvas.toDataURL('image/png');
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
}
