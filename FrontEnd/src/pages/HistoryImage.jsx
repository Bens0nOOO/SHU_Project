import Header from "../components/Header";
import React, { useState, useEffect } from "react";
import "../styles/HistoryImage.css";

export default function HistoryImage() {
  const [images, setImages] = useState([]);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const groupImagesByDate = (images) => {
    const grouped = {};

    images.forEach((img) => {
      const date = new Date(img.uploadTime);
      const dateKey = date.toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "short", // 顯示週幾
      });

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(img);
    });

    // 回傳排序後的物件陣列 [{ date: '7月2日 週三', images: [...] }, ...]
    return Object.entries(grouped)
      .sort((a, b) => new Date(b[1][0].uploadTime) - new Date(a[1][0].uploadTime)) // 依時間降冪
      .map(([date, imgs]) => ({ date, images: imgs }));
  };

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:8080/photo/getallimages", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      const imgs = data.map((file) => ({
        filename: file.filename,
        pictureURL: file.pictureURL,
        uploadTime: file.uploadTime,
      }));
      setGroupedImages(groupImagesByDate(imgs));
    } catch (error) {
      console.error("圖片載入發生錯誤:", error);
    }
  };

  const handleDelete = async (fileName) => {
    const confirmed = window.confirm(`確定要刪除 "${fileName}" 嗎？`);
    if (!confirmed) return;

    try {
      const res = await fetch("http://localhost:8080/photo/deleteimage", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ name: fileName }),
      });

      const text = await res.text();
      if (res.ok) {
        alert("✅ 圖片刪除成功");
        fetchImages(); // 重新載入
      } else {
        alert("❌ 刪除失敗：" + text);
      }
    } catch (err) {
      console.error("刪除時發生錯誤:", err);
      alert("❌ 發生錯誤，請稍後再試");
    }
  };

  const handleSearch = async () => {
    const params = new URLSearchParams();
    if (year) params.append("year", year);
    if (month) params.append("month", month);
    if (day) params.append("day", day);

    try {
      const response = await fetch(`http://localhost:8080/files/searchByDate?${params.toString()}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      const imgs = data.map((file) => ({
        filename: file.filename,
        pictureURL: file.pictureURL,
        uploadTime: file.uploadTime,
      }));
      setGroupedImages(groupImagesByDate(imgs));
    } catch (error) {
      console.error("搜尋失敗:", error);
      alert("❌ 搜尋失敗，請確認日期是否正確");
    }
  };

  const forceDownload = (url, filename) => {
    const apiURL = `http://localhost:8080/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;
    const a = document.createElement("a");
    a.href = apiURL;
    a.setAttribute("download", filename); // optional
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const [groupedImages, setGroupedImages] = useState([]);
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="History-Image-container">
      <Header />
      <h1>歷史圖片頁面</h1>

      {/* 🔍 查詢條件區塊 */}
      <div className="date-filter" style={{ marginBottom: "20px", paddingLeft: "20px" }}>
        <input
          type="number"
          placeholder="年 (YYYY)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="月 (1-12)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          placeholder="日 (1-31)"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={handleSearch}>🔍 搜尋</button>
        <button onClick={fetchImages} style={{ marginLeft: "10px" }}>🔄 顯示全部</button>
      </div>

      {/* 圖片顯示區 */}
      <div className="history-images-grid">
        {groupedImages.map((group, idx) => (
          <div key={idx} className="history-group-wrapper">
            <div className="history-date-header">
              <h3 style={{ marginLeft: "20px", marginTop: "30px", color: "#333" }}>
                📅 {group.date}
              </h3>
            </div>
            {group.images.map((img, i) => (
              <div key={i} className="history-image-item" style={{ paddingLeft: "20px" }}>
                <img src={img.pictureURL} alt={img.filename} style={{ objectFit: "cover", borderRadius: "4px" }} />
                <p style={{ fontSize: "0.8rem", color: "#999" }}>🕒 {img.uploadTime}</p>
                <button
                  onClick={() => forceDownload(img.pictureURL, img.filename)}
                  className="download-btn"
                  style={{
                    marginTop: "6px",
                    backgroundColor: "#3498db",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "6px 12px",
                    cursor: "pointer",
                  }}
                >
                  ⬇️ 下載
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(img.filename)}
                  style={{
                    marginTop: "10px",
                    padding: "6px 12px",
                    backgroundColor: "#e74c3c",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  🗑 刪除
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}