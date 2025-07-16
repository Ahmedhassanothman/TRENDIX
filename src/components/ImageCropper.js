import React, { useState } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropper = ({ image, onCrop }) => {
  const [crop, setCrop] = useState();
  const [imgRef, setImgRef] = useState(null);

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: 90,
        },
        1,
        width,
        height
      ),
      width,
      height
    );
    setCrop(crop);
  }

  const getCroppedImg = () => {
    if (!imgRef || !crop) return;

    const canvas = document.createElement('canvas');
    const scaleX = imgRef.naturalWidth / imgRef.width;
    const scaleY = imgRef.naturalHeight / imgRef.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      imgRef,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Convert to base64
    const base64Image = canvas.toDataURL('image/jpeg');
    onCrop(base64Image);
  };

  return (
    <div className="space-y-4">
      <div className="max-h-[400px] overflow-auto">
        <ReactCrop
          crop={crop}
          onChange={(c) => setCrop(c)}
          aspect={1}
          className="max-w-full"
        >
          <img
            ref={setImgRef}
            src={image}
            alt="Crop me"
            onLoad={onImageLoad}
            className="max-w-full"
          />
        </ReactCrop>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          onClick={getCroppedImg}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          قص الصورة
        </button>
      </div>
    </div>
  );
};

export default ImageCropper; 