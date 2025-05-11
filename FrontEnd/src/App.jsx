// src/App.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';
import { loginWithSocial } from "./utils/loginWithSocial";


const useAnimateOnScroll = (ref, setInView) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
};

const App = () => {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let timer = null;
    const handleScroll = () => {
      setShowHeader(false);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setShowHeader(true);
      }, 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const section1ContentRef = useRef(null);
  const section1BtnRef = useRef(null);
  const redCardRef = useRef(null);
  const blueCardRef = useRef(null);
  const greenCardRef = useRef(null);
  const teamTopRef = useRef(null);
  const teamBottomRef = useRef(null);

  const [section1Visible, setSection1Visible] = useState(false);
  const [section1BtnVisible, setSection1BtnVisible] = useState(false);
  const [redVisible, setRedVisible] = useState(false);
  const [blueVisible, setBlueVisible] = useState(false);
  const [greenVisible, setGreenVisible] = useState(false);
  const [teamTopVisible, setTeamTopVisible] = useState(false);
  const [teamBottomVisible, setTeamBottomVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useAnimateOnScroll(section1ContentRef, setSection1Visible);
  useAnimateOnScroll(section1BtnRef, setSection1BtnVisible);
  useAnimateOnScroll(redCardRef, setRedVisible);
  useAnimateOnScroll(blueCardRef, setBlueVisible);
  useAnimateOnScroll(greenCardRef, setGreenVisible);
  useAnimateOnScroll(teamTopRef, setTeamTopVisible);
  useAnimateOnScroll(teamBottomRef, setTeamBottomVisible);

  const handleLogin = async (providerType) => {
    if (loading) return;
    setLoading(true);
    try {
      const { user } = await loginWithSocial(providerType);
      setUser(user);
      alert(`歡迎 ${user.displayName}`);
    } catch (err) {
      alert("登入失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="main-container no-border">
      <div className={`header ${showHeader ? 'show' : 'hide'}`}>
        <button onClick={() => scrollTo('section1')}>首頁</button>
        <button onClick={() => scrollTo('section2')}>影像處理</button>
        <button onClick={() => scrollTo('section3')}>關於我們</button>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={closeMenu}>首頁</Link>
          <Link to="/adjust" onClick={closeMenu}>圖片調整</Link>
          <Link to="/repair" onClick={closeMenu}>圖片修復</Link>
          <Link to="/history" onClick={closeMenu}>歷史圖片</Link>
        </div>
      )}

      <section id="section1" className="section section1">
        <div className="section1-main">
          <div className={`section1-content animated-slide ${section1Visible ? 'in' : 'out'}`} ref={section1ContentRef}>
            <h1>智能影像處理系統</h1>
            <p>影像優化影像優化影像優化影像優化影像優化影像優化影像優化影像優化影像優化影像優化</p>
          </div>
          <div className={`section1-buttons animated-slide-right ${section1BtnVisible ? 'in' : 'out'}`} ref={section1BtnRef}>
            <button onClick={() => handleLogin("google")} disabled={loading}>
              {user ? `👋 歡迎 ${user.displayName}` : loading ? "Google 登入中..." : "使用 Google 登入"}
            </button>
            <button onClick={() => handleLogin("facebook")} disabled={loading}>
              {user ? `👋 歡迎 ${user.displayName}` : loading ? "Facebook 登入中..." : "使用 Facebook 登入"}
            </button>
            <button onClick={() => navigate('/login')}>傳統帳號登入</button>
          </div>
        </div>
      </section>

      

      <section id="section2" className="section section2">
        <div className={`card red animated-slide ${redVisible ? 'in' : 'out'}`} ref={redCardRef}>
          <h3>圖片調整</h3>
          <p>影像優化影像優化影像優化影像優化影像優化影像優化影像優化影像優化影像優化影像優化
            <span className="link-text" onClick={() => navigate('/adjust')}>點擊前往</span>
          </p>
        </div>
        <div className={`card blue animated-slide-right ${blueVisible ? 'in' : 'out'}`} ref={blueCardRef}>
          <h3>圖片修復</h3>
          <p>影像優化影像優化影像優化影像優化影像優化影像優化影像優化影像優化影像優化影像優化
            <span className="link-text" onClick={() => navigate('/repair')}>點擊前往</span>
          </p>
        </div>
        <div className={`card green animated-slide ${greenVisible ? 'in' : 'out'}`} ref={greenCardRef}>
          <h3>歷史圖片</h3>
          <p>影像優化影像優化影像優化影像優化影像優化影像優化影像優化影像優化影像優化影像優化
            <span className="link-text" onClick={() => navigate('/history')}>點擊前往</span>
          </p>
        </div>
      </section>

      <section id="section3" className="section section3">
        <h2>關於我們</h2>
        <div className="team-grid-wrapper">
          <div className={`team-grid-row animated-slide-top ${teamTopVisible ? 'in' : 'out'}`} ref={teamTopRef}>
            {["陳振洲", "林品君"].map((name, index) => (
              <div key={index} className="team-card">
                <h3>{name}</h3>
                <ul>{Array(6).fill('條列').map((text, idx) => <li key={idx}>{text}</li>)}</ul>
                <img src="/images/chen.jpg" alt=".img" />
              </div>
            ))}
          </div>
          <div className={`team-grid-row animated-slide-bottom ${teamBottomVisible ? 'in' : 'out'}`} ref={teamBottomRef}>
            {["卓晏霆", "郭旻憲", "葉鎮宇"].map((name, index) => (
              <div key={index} className="team-card">
                <h3>{name}</h3>
                <ul>{Array(6).fill('條列').map((text, idx) => <li key={idx}>{text}</li>)}</ul>
                <img src="/images/kuo.jpg" alt=".img" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
