import React, { useState } from "react";
import "../styles/ImageAdjust.css";
import WhiteBalanceGrid from "../components/WhiteBalanceGrid";
import ImageUploader from "../components/ImageUploader";
import Header from "../components/Header";


export default function ImageAdjust() {
  const [showPanel, setShowPanel] = useState(true);

  return (
    <div className="image-adjust-container">
      <Header />
      {/* 左側圖片區 */}
      <div className="image-upload-panel">
        <h2>圖片處理</h2>

        {/* ✅ 將 ImageUploader 放在這裡 */}
        <ImageUploader onImageChange={(imgUrl) => console.log("已上傳", imgUrl)} />

        <div className="button-group">
          <button className="action-btn">AI 修圖</button>
          <button className="action-btn">去背</button>
        </div>
      </div>

      {/* 白平衡區塊容器 */}
      <div className={`white-balance-wrapper ${showPanel ? "open" : "closed"}`}>
        <button
          className="toggle-arrow"
          onClick={() => setShowPanel(!showPanel)}
        >
          {showPanel ? "→" : "←"}
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
