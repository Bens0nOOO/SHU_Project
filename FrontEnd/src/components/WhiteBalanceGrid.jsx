import React, { useState, useRef, useEffect } from "react";
import "./WhiteBalanceGrid.css";

export default function WhiteBalanceGrid() {
  const scrollRef = useRef(null);

  const defaultValues = {
    色溫: 0, 色調: 0, 鮮明度: 0, 飽和度: 0, 藍色色調: 0,
    亮度: 0, 對比: 0, 白點: 0, HDR效果: 0, 陰影: 0, 黑點: 0,
    銳利化: 0, 降噪: 0, 曝影: 0
  };

  const [values, setValues] = useState(defaultValues);
  const [removeBg, setRemoveBg] = useState(null);

  const handleSliderChange = (key, value) => {
    setValues({ ...values, [key]: parseInt(value) });
  };

  const handleInputChange = (key, e) => {
    let val = parseInt(e.target.value);
    if (isNaN(val)) val = 0;
    val = Math.min(100, Math.max(-100, val));
    setValues({ ...values, [key]: val });
  };

  const handleReset = () => {
    setValues(defaultValues);
    setRemoveBg(null);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight / 2 - scrollRef.current.clientHeight / 2,
        behavior: "smooth"
      });
    }
  };

  const renderSlider = (label) => (
    <div className="wb-slider" key={label}>
      <label>{label}</label>
      <input
        type="range"
        min="-100"
        max="100"
        value={values[label]}
        onChange={(e) => handleSliderChange(label, e.target.value)}
      />
      <input
        type="number"
        min="-100"
        max="100"
        value={values[label]}
        onChange={(e) => handleInputChange(label, e)}
        className="number-input"
      />
    </div>
  );

  return (
    <div className="wb-panel" ref={scrollRef}>
      <div className="wb-section">
        <h3>色彩類</h3>
        {["藍色色調", "色溫", "飽和度", "色調", "鮮明度"].map(renderSlider)}
      </div>

      <div className="wb-section">
        <h3>光線與對比類</h3>
        {["亮度", "對比", "白點", "HDR效果", "陰影", "黑點"].map(renderSlider)}
      </div>

      <div className="wb-section">
        <h3>細節類</h3>
        {["銳利化", "降噪", "曝影"].map(renderSlider)}
      </div>

      <div className="wb-section">
        <h3>其他</h3>
        <div className="wb-slider">
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
        <button className="confirm-btn">確定修改</button>
        <button className="cancel-btn" onClick={handleReset}>全部取消</button>
      </div>
    </div>
  );
}