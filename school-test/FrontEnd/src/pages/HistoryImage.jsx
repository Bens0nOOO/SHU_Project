import Header from "../components/Header";
import React from "react";
import "../styles/HistoryImage.css"; // 引入CSS樣式檔案
  
  export default function HistoryImage() {
    return (
        <div className="History-Image-container">
            <h1>歷史圖片頁面</h1>
            <Header />
        </div>
    );
  }