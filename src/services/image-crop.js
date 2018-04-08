export function imageCrop(src, width, height, startX, startY) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const cropedimageDataUrl = getImagePortion(img, width, height, startX, startY, 1);
      resolve(cropedimageDataUrl);
    };
    img.src = src;
  });
}

// TODO 释放 canvas
// FROM: https://yellowpencil.com/blog/cropping-images-with-javascript/
function getImagePortion(imgObj, newWidth, newHeight, startX, startY, ratio) {
  /* the parameters: - the image element - the new width - the new height - the x point we start taking pixels - the y point we start taking pixels - the ratio */
  //set up canvas for thumbnail
  const tnCanvas = document.createElement('canvas');
  const tnCanvasContext = tnCanvas.getContext('2d');
  tnCanvas.width = newWidth;
  tnCanvas.height = newHeight;
  tnCanvasContext.drawImage(imgObj, 0, 0);
  /* use the sourceCanvas to duplicate the entire image. This step was crucial for iOS4 and under devices. Follow the link at the end of this post to see what happens when you don’t do this */
  const bufferCanvas = document.createElement('canvas');
  const bufferContext = bufferCanvas.getContext('2d');
  bufferCanvas.width = imgObj.width;
  bufferCanvas.height = imgObj.height;
  bufferContext.drawImage(imgObj, 0, 0);

  /* now we use the drawImage method to take the pixels from our bufferCanvas and draw them into our thumbnail canvas */
  tnCanvasContext.drawImage(
    bufferCanvas,
    startX,
    startY,
    newWidth * ratio,
    newHeight * ratio,
    0,
    0,
    newWidth,
    newHeight
  );
  return tnCanvas.toDataURL();
}
