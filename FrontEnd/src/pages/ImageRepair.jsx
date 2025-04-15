import React, { useState } from "react";
import "../styles/ImageRepair.css";
import ImageUploader from "../components/ImageUploader";
import Header from "../components/Header";


export default function ImageRepair() {
  const [imageUrl, setImageUrl] = useState(null); // 加上狀態儲存圖片
  return (
    <div className="repair-container">
      <Header />
      {/* 右上角帳號圓圈
      <div className="account-badge">帳號</div> */}

      {/* 中央內容 */}
      <div className="repair-content">
        <h2>圖片修復</h2>
        <div className="image-box-wrapper">
          <div className="image-box">
            <h4 className="label">原圖:</h4>
            <ImageUploader onImageChange={(url) => setImageUrl(url)} />
          </div>

          <div className="image-box">
            <h4 className="label">修復中:</h4>
            <div className="upload-box preview-box">
              {imageUrl ? (
                <img src={imageUrl} alt="修復預覽" className="preview-image" />
              ) : (
                <p>尚未選擇圖片</p>
              )}
            </div>
          </div>
        </div>

        <div className="button-group">
          <button className="repair-btn">一鍵修復</button>
          <button className="repair-btn">破損消除</button>
          <button className="repair-btn">褪色恢復</button>
          <button className="repair-btn">模糊修復</button>
          <button className="repair-btn">下載</button>

        </div>
      </div>
    </div>
  );
}
