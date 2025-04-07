import React, { useState } from "react";
import "./WhiteBalanceGrid.css";

export default function WhiteBalanceGrid() {
  const [values, setValues] = useState(Array(16).fill(0));

  const handleChange = (index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);
  };

  return (
    <div className="wb-grid">
      {/* 每 8 個為一列 */}
      {[0, 1].map((col) => (
        <div className="wb-column" key={col}>
          {[...Array(8)].map((_, row) => {
            const index = col * 8 + row;
            return (
              <div className="wb-item" key={index}>
                <span className="wb-label">白平衡 {index + 1}</span>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={values[index]}
                  onChange={(e) => handleChange(index, parseInt(e.target.value))}
                />
                <span className="wb-value">({values[index]})</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
