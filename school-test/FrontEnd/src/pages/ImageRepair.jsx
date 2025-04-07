import React from "react";
import "../styles/ImageRepair.css";
import ImageUploader from "../components/ImageUploader";
import Header from "../components/Header";


export default function ImageRepair() {
  return (
    <div className="repair-container">
      <Header />
      {/* 右上角帳號圓圈
      <div className="account-badge">帳號</div> */}

      {/* 中央內容 */}
      <div className="repair-content">
        <h2>圖片修復</h2>

        {/* ✅ 正確放在 return 裡 */}
        <ImageUploader onImageChange={(imgUrl) => console.log("已上傳", imgUrl)} />

        <div className="button-group">
          <button className="repair-btn">一鍵修復</button>
          <button className="repair-btn">破損消除</button>
          <button className="repair-btn">褪色恢復</button>
          <button className="repair-btn">模糊修復</button>
        </div>
      </div>
    </div>
  );
}
