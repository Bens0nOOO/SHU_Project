import React, { useState, useRef } from "react";
import "../styles/ImageAdjust.css";
import ImageUploader from "../components/ImageUploader";
import Header from "../components/Header";

export default function ImageAdjust() {
  const [showPanel, setShowPanel] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const downloadRef = useRef(null);

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "修圖圖片.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="image-adjust-outer">
      <Header />

      {/* 主內容 */}
      <div className="image-main-wrapper">
        <div className="image-upload-panel">
          <h2>圖片處理</h2>

          <div className="image-box-wrapper">
            {/* 原圖 */}
            <div className="image-box">
              <h4 className="label">原圖:</h4>
              <ImageUploader onImageChange={(url) => setImageUrl(url)} />
            </div>

            {/* 修圖中 */}
            <div className="image-box">
              <h4 className="label">修圖中:</h4>
              <div className="upload-box preview-box">
                {imageUrl ? (
                  <img
                    ref={downloadRef}
                    src={imageUrl}
                    alt="修圖預覽"
                    className="preview-image"
                  />
                ) : (
                  <p>尚未選擇圖片</p>
                )}
              </div>
            </div>
          </div>

          <div className="button-group">
            <button className="action-btn">AI 修圖</button>
            <button className="action-btn" onClick={handleDownload}>
              下載
            </button>
          </div>
        </div>
      </div>

      {/* 白平衡側邊控制面板 */}
      <div className={`white-balance-wrapper ${showPanel ? "open" : "closed"}`}>
        <button
          className="toggle-arrow"
          onClick={() => setShowPanel(!showPanel)}
        >
          {showPanel ? "←" : "→"}
        </button>

        {showPanel && (
          <div className="white-balance-panel">
            <WhiteBalanceGrid />
          </div>
        )}
      </div>
    </div>
  );
}