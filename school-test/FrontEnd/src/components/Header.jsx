import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="main-header">
      {/* 桌面版按鈕隱藏
      <div className="nav-desktop">
        <Link to="/">首頁</Link>
        <Link to="/adjust">圖片調整</Link>
        <Link to="/repair">圖片修復</Link>
        <Link to="/history">歷史圖片</Link>
      </div>
      */}

      <div className="account-btn" onClick={toggleMenu}>
        帳號
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={closeMenu}>首頁</Link>
          <Link to="/adjust" onClick={closeMenu}>圖片調整</Link>
          <Link to="/repair" onClick={closeMenu}>圖片修復</Link>
          <Link to="/history" onClick={closeMenu}>歷史圖片</Link>
        </div>
      )}
    </header>
  );
}
