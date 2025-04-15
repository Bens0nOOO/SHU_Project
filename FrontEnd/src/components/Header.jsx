import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="main-header">
      <div className={`account-btn ${menuOpen ? "account-btn-moved" : ""}`} onClick={toggleMenu}>
        帳號
      </div>

      {menuOpen && (
        <div className="mobile-menu full-menu">
          <div className="menu-section">
            <h3>頁面</h3>
            <Link to="/" onClick={closeMenu}>首頁</Link>
            <Link to="/adjust" onClick={closeMenu}>圖片調整</Link>
            <Link to="/repair" onClick={closeMenu}>圖片修復</Link>
            <Link to="/history" onClick={closeMenu}>歷史圖片</Link>
          </div>
          <div className="menu-section">
            <h3>個人化</h3>
            <Link to="/profile" onClick={closeMenu}>個人檔案</Link>
            <Link to="/settings" onClick={closeMenu}>設定</Link>
          </div>
        </div>
      )}
    </header>
  );
}
