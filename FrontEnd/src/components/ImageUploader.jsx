import React, { useState, useRef } from "react";
import "./ImageUploader.css";

export default function ImageUploader({ onImageChange }) {
  const inputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file) => {
    const imageURL = URL.createObjectURL(file);
    setImage(imageURL);
    if (onImageChange) onImageChange(imageURL);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    setImage(null);
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
        <div className="resizable-container">
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
