import React, { useState, useRef } from "react";
import "../styles/Sidebar.css";
import { Link } from "react-router-dom";


export default function Sidebar({ activeMode, onToggleMode, onAdjustmentsChange }) {
  const scrollRef = useRef(null);
  const [adjustments, setAdjustments] = useState({});
  const defaultSliderValues = {
    藍色色調: 0, 色溫: 0, 飽和度: 0, 色調: 0, 鮮明度: 0,
    亮度: 0, 對比: 0, 白點: 0, HDR效果: 0, 陰影: 0, 黑點: 0,
    銳利化: 0, 降噪: 0, 曝影: 0,
  };

  const sliderGroups = {
    "色彩類": ["藍色色調", "色溫", "飽和度", "色調", "鮮明度"],
    "光線與對比類": ["亮度", "對比", "白點", "HDR效果", "陰影", "黑點"],
    "細節類": ["銳利化", "降噪", "曝影"]
  };

  const [sliderValues, setSliderValues] = useState(defaultSliderValues);
  const [removeBg, setRemoveBg] = useState(null);


  const toggleMode = (mode) => {
    if (onToggleMode) {
      onToggleMode(mode);
    }
  };

  const handleSliderChange = (key, value) => {
    const updated = { ...sliderValues, [key]: parseInt(value) };
    setSliderValues({ ...sliderValues, [key]: parseInt(value) });
    if (onAdjustmentsChange) onAdjustmentsChange(updated);

  };

  const handleInputChange = (key, e) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) val = 0;
    val = Math.min(100, Math.max(-100, val));
    const updated = { ...sliderValues, [key]: val };
    setSliderValues({ ...sliderValues, [key]: val });
    if (onAdjustmentsChange) onAdjustmentsChange(updated);
  };

  const handleReset = () => {
    setSliderValues(defaultSliderValues);
    setRemoveBg(null);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight / 2 - scrollRef.current.clientHeight / 2,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className={`sidebar-extended ${activeMode ? "with-right" : "without-right"}`}>
      <div className="sidebar-left">
        {/* <div className="sidebar-section account-section">
          <div className="account-display">帳號</div>
        </div> */}

        <hr />

        <div className="sidebar-section feature-section">
          <h4 className="section-title">功能</h4>
          <button
            className={`sidebar-btn ${activeMode === "adjust" ? "active" : ""}`}
            onClick={() => toggleMode("adjust")}
          >
            圖片調整
          </button>
          <button
            className={`sidebar-btn ${activeMode === "repair" ? "active" : ""}`}
            onClick={() => toggleMode("repair")}
          >
            圖片修復
          </button>
        </div>

        <hr />

        <div className="sidebar-section page-section">
          <h4 className="section-title">其他頁面</h4>

          <Link className="sidebar-link" to={"/"}>首頁</Link>
          <Link className="sidebar-link" to={"/history"}>歷史圖片</Link>
          <Link className="sidebar-link" to={"/"}>設定</Link>
        </div>
      </div>

      {/* 分隔線（僅當面板開啟時顯示） */}
      <div className={`vertical-divider ${!activeMode ? "hidden" : ""}`} />

      {/* 右側面板固定結構，用 display 控制顯示 */}
      <div className={`sidebar-right ${!activeMode ? "hidden" : ""}`} ref={scrollRef}>
        {activeMode === "adjust" && (
          <>
            <h4 className="section-title">圖片參數調整</h4>
            <div className="slider-scroll">
              {Object.entries(sliderGroups).map(([group, labels]) => (
                <div key={group} className="slider-group-category">
                  <h5 className="group-title">{group}</h5>
                  {labels.map((label) => (
                    <div className="slider-group" key={label}>
                      <label>{label}</label>
                      <input
                        type="range"
                        min="-100"
                        max="100"
                        value={sliderValues[label]}
                        onChange={(e) => handleSliderChange(label, e.target.value)}
                      />
                      <input
                        type="number"
                        min="-100"
                        max="100"
                        value={sliderValues[label]}
                        onChange={(e) => handleInputChange(label, e)}
                      />
                    </div>
                  ))}
                </div>
              ))}

              <div className="slider-group-category">
                <h5 className="group-title">其他</h5>
                <div className="slider-group">
                  <label>去背</label>
                  <div className="checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={removeBg === true}
                        onChange={() => setRemoveBg(true)}
                      />
                      是
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        checked={removeBg === false}
                        onChange={() => setRemoveBg(false)}
                      />
                      否
                    </label>
                  </div>
                  <span>({removeBg === null ? "未選擇" : removeBg ? "是" : "否"})</span>
                </div>
              </div>

              <div className="wb-buttons">
                <button className="cancel-btn" onClick={handleReset}>全部重置</button>
              </div>
            </div>
          </>
        )}

        {activeMode === "repair" && (
          <>
            <h4 className="section-title">修復選項</h4>
            <div className="repair-list">
              {[
                {
                  title: "缺損修復",
                  desc: "利用生成對抗網路（GAN），重建大範圍損壞或缺失區域，恢復影像的完整性與語義內容。",
                },
                {
                  title: "褪色修復",
                  desc: "利用 CNN 分析影像色彩，自動校正色溫與偏差，有效處理發黃、褪色問題。",
                },
                {
                  title: "模糊修補",
                  desc: "透過深度學習模型提升銳利度，修正動態模糊或失焦現象。",
                },
                {
                  title: "一鍵修復",
                  desc: "針對以上三種情況由 AI 自動判斷處理。",
                },
              ].map((item, idx) => (
                <div className="repair-block" key={idx}>
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                  <button className="repair-action">立即修復</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
