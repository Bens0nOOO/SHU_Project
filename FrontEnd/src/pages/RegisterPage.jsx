import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthPage.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail]   = useState('');
  const [pw, setPw]         = useState('');
  const [pw2, setPw2]       = useState('');
  const [slide, setSlide]   = useState(0);

  const images = [
    '/public/images/carouselImg/banner6.png',
    '/public/images/carouselImg/banner5.png',
    '/public/images/carouselImg/banner4.png',
  ];

  useEffect(() => {
    const iv = setInterval(() => {
      setSlide(s => (s + 1) % images.length);
    }, 5000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    document
      .querySelector('.auth-page')
      ?.style.setProperty('--bg-url', `url(${images[slide]})`);
  }, [slide]);

  const handleSubmit = e => {
    e.preventDefault();
    if (pw !== pw2) return alert('兩次密碼不一致');
    // TODO: 呼叫註冊 API
    console.log({ email, pw });
  };

  return (
    <div className="auth-page" style={{ '--bg-url': `url(${images[0]})` }}>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>註冊</h2>
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
        <label>
          確認密碼
          <input
            type="password"
            value={pw2}
            onChange={e => setPw2(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="auth-btn auth-btn--primary">
          註冊
        </button>
        <div className="auth-footer-links">
          <Link to="/login">已有帳號？登入</Link>
          <button type="button" className="auth-btn auth-btn--secondary" onClick={() => navigate(-1)}>
            返回
          </button>
        </div>
      </form>
    </div>
  );
}
