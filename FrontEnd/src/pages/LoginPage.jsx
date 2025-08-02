import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail]   = useState('');
  const [pw, setPw]         = useState('');
  const [slide, setSlide]   = useState(0);

  const images = [
    '/public/images/carouselImg/banner4.png',
    '/public/images/carouselImg/banner5.png',
    '/public/images/carouselImg/banner6.png',
  ];

  // 背景輪播
  useEffect(() => {
    const iv = setInterval(() => {
      setSlide(s => (s + 1) % images.length);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  // 動態更新 CSS 變數
  useEffect(() => {
    document
      .querySelector('.auth-page')
      ?.style.setProperty('--bg-url', `url(${images[slide]})`);
  }, [slide]);

  const handleSubmit = e => {
    e.preventDefault();
    // TODO: 呼叫登入 API
    console.log({ email, pw });
  };

  return (
    <div className="auth-page" style={{ '--bg-url': `url(${images[0]})` }}>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>登入</h2>
        <label>
          電子郵件
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          密碼
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="auth-btn auth-btn--primary">
          登入 →
        </button>
        <div className="auth-footer-links">
          <Link to="/register">註冊帳號</Link>
          <Link to="/forgot">忘記密碼？</Link>
        </div>
      </form>
    </div>
  );
}
