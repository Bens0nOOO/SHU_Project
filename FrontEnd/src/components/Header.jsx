import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Header.css";

export default function Header({ onActionClick }) {
  const location = useLocation();

  const getPageName = () => {
    switch (location.pathname) {
      case "/repair":
        return "圖片處理";
      case "/history":
        return "歷史圖片";
      case "/settings":
        return "設定";
      default:
        return "";
    }
  };

  const showActionButton = location.pathname === "/repair";

  return (
    <header className="header-container">
      <Link to="/" className="header-title-link">
       <div className="header-title">智能影像處理系統</div>
      </Link>
      <div className="header-page">{getPageName()}</div>

      <div className="header-actions">
        {showActionButton && (
          <div className="dropdown-wrapper">
            <button className="action-btn">下載 ▼</button>
            <div className="dropdown-menu">
              <div onClick={() => onActionClick("download")}>下載</div>
              <div onClick={() => onActionClick("save")}>存至歷史圖片</div>
            </div>
          </div>
        )}
        <div className="header-avatar">帳號</div>
      </div>
    </header>
  );
}
