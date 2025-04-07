import React, { useState, useRef } from "react";
import "./ImageUploader.css";

export default function ImageUploader({ onImageChange }) {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [boxSize, setBoxSize] = useState({ width: 300, height: 300 });
  const [isDragging, setIsDragging] = useState(false);

  const MAX_WIDTH = 500;
  const MAX_HEIGHT = 500;

  const handleFile = (file) => {
    const imageURL = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;

      // ✅ 等比限制在最大寬高
      const widthRatio = MAX_WIDTH / width;
      const heightRatio = MAX_HEIGHT / height;
      const ratio = Math.min(widthRatio, heightRatio, 1); // 不放大小圖

      setBoxSize({
        width: Math.round(width * ratio),
        height: Math.round(height * ratio),
      });

      setImage(imageURL);
      if (onImageChange) onImageChange(imageURL);
    };

    img.src = imageURL;
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setImage(null);
    setBoxSize({ width: 300, height: 300 });
    if (onImageChange) onImageChange(null);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className={`upload-box ${isDragging ? "dragging" : ""}`}
      style={{
        width: boxSize.width,
        height: boxSize.height,
      }}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleChange}
        style={{ display: "none" }}
      />

      {image ? (
        <div className="preview-wrapper">
          <img src={image} alt="預覽" className="preview-image" />
          <button className="clear-btn" onClick={handleClear}>
            移除圖片
          </button>
        </div>
      ) : (
        <p>點擊或拖曳圖片上傳</p>
      )}
    </div>
  );
}
