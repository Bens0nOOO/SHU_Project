// ImageRepair.jsx
import React, { useState, useEffect, useRef } from "react";
import "../styles/ImageRepair.css";
import ImageUploader from "../components/ImageUploader";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function ImageRepair() {
  const [imageUrl, setImageUrl] = useState(null);
  const [adjustedUrl, setAdjustedUrl] = useState(null);
  const [activeMode, toggleMode] = useState(null);
  const [adjustments, setAdjustments] = useState({});
  const canvasRef = useRef(null);

  const handleToggleMode = (mode) => {
    toggleMode((prev) => (prev === mode ? null : mode));
  };

  const handleDownload = () => {
    if (!adjustedUrl) return;
    const link = document.createElement("a");
    link.href = adjustedUrl;
    link.download = "修復圖片.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (!imageUrl) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const brightness = (adjustments["亮度"] || 0) / 100;
      const contrast = (adjustments["對比"] || 0) / 100;
      const temperature = (adjustments["色溫"] || 0) / 100;
      const blueTone = (adjustments["藍色色調"] || 0) / 100;
      const saturation = (adjustments["飽和度"] || 0) / 100;
      const sharpness = (adjustments["銳利化"] || 0) / 100;
      const blur = Math.abs((adjustments["降噪"] || 0)) / 10;
      const exposure = (adjustments["曝影"] || 0) / 100;
      const shadow = (adjustments["陰影"] || 0) / 100;
      const blackPoint = (adjustments["黑點"] || 0) / 100;
      const whitePoint = (adjustments["白點"] || 0) / 100;
      const vividness = (adjustments["鮮明度"] || 0) / 100;
      const hdr = (adjustments["HDR效果"] || 0) / 100;

      for (let i = 0; i < data.length; i += 4) {
        let r = data[i] / 255;
        let g = data[i + 1] / 255;
        let b = data[i + 2] / 255;

        // 對比與亮度
        [r, g, b] = [r, g, b].map(c => ((c - 0.5) * (contrast + 1) + 0.5 + brightness));

        // 色溫與藍色色調
        r += temperature * 0.1;
        b -= temperature * 0.1;
        b += blueTone * 0.2;

        // 飽和度
        const avg = (r + g + b) / 3;
        r = avg + (r - avg) * (1 + saturation);
        g = avg + (g - avg) * (1 + saturation);
        b = avg + (b - avg) * (1 + saturation);

        // 曝影與白點
        [r, g, b] = [r, g, b].map(c => c + exposure + whitePoint * 0.2);

        // 陰影與黑點
        [r, g, b] = [r, g, b].map(c => c - shadow * 0.2 - blackPoint * 0.2);

        // 鮮明度 (vividness) 強調中間亮度
        const vividBoost = 1 + vividness * (0.5 - Math.abs(avg - 0.5));
        r *= vividBoost;
        g *= vividBoost;
        b *= vividBoost;

        // HDR 模擬（簡單加亮）
        [r, g, b] = [r, g, b].map(c => c + hdr * (1 - c));

        // 降噪模擬為模糊（此處略過卷積處理）

        // 限制範圍 0~255
        data[i] = Math.min(255, Math.max(0, r * 255));
        data[i + 1] = Math.min(255, Math.max(0, g * 255));
        data[i + 2] = Math.min(255, Math.max(0, b * 255));
      }

      ctx.putImageData(imageData, 0, 0);

      // 銳利化（簡易 kernel）
      if (sharpness > 0) {
        const kernel = [
          0, -sharpness, 0,
          -sharpness, 1 + 4 * sharpness, -sharpness,
          0, -sharpness, 0
        ];
        const output = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const src = imageData.data;
        const dst = output.data;
        for (let y = 1; y < canvas.height - 1; y++) {
          for (let x = 1; x < canvas.width - 1; x++) {
            for (let c = 0; c < 3; c++) {
              let sum = 0;
              for (let ky = -1; ky <= 1; ky++) {
                for (let kx = -1; kx <= 1; kx++) {
                  const idx = ((y + ky) * canvas.width + (x + kx)) * 4 + c;
                  const weight = kernel[(ky + 1) * 3 + (kx + 1)];
                  sum += src[idx] * weight;
                }
              }
              const idx = (y * canvas.width + x) * 4 + c;
              dst[idx] = Math.min(255, Math.max(0, sum));
            }
            dst[(y * canvas.width + x) * 4 + 3] = 255;
          }
        }
        ctx.putImageData(output, 0, 0);
      }

      setAdjustedUrl(canvas.toDataURL());
    };
  }, [imageUrl, adjustments]);

  return (
    <div className="repair-container">
      <Header
        onActionClick={(action) => {
          if (action === "download") handleDownload();
          else if (action === "save") {
            alert("圖片已存至歷史圖片");
          }
        }}
      />
      <Sidebar
        activeMode={activeMode}
        onToggleMode={handleToggleMode}
        onAdjustmentsChange={(newValues) => setAdjustments(newValues)}
      />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div className={`repair-content-wrapper ${activeMode ? "with-sidebar" : "without-sidebar"}`}>
        <div className="repair-content">
          <div className="image-box-wrapper">
            <div className="image-box">
              <h4 className="label">原圖:</h4>
              <ImageUploader onImageChange={(url) => setImageUrl(url)} />
            </div>
            <div className="image-box">
              <h4 className="label">修復中:</h4>
              <div className="upload-box preview-box">
                {adjustedUrl ? (
                  <img src={adjustedUrl} alt="修復預覽" className="preview-image" />
                ) : (
                  <p>尚未選擇圖片</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}