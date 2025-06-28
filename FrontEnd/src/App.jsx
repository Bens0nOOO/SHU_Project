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

  const teamData = [
    {
      name: "陳振洲",
      img: "/images/teamPeople/chen.jpg",
      details: ["功能設計", "網頁前端處理", "專案負責人"]
    },
    {
      name: "林品君",
      img: "/images/teamPeople/lin.jpg",
      details: ["機器學習", "資料庫架設"]
    },
    {
      name: "卓晏霆",
      img: "/images/teamPeople/zhou.png",
      details: ["機器學習、功能確認"]
    },
    {
      name: "郭旻憲",
      img: "/images/teamPeople/kuo.jpg",
      details: ["機器學習","網頁後端處理", "網頁測試"]
    },
    {
      name: "葉鎮宇",
      img: "/images/teamPeople/yeh.jpg",
      details: ["網頁後端處理", "網頁測試",  "資料庫架設"]
    }
  ];

  const adjustImages = [
    '/public/images/carousel/adjust1.png',
    '/public/images/carousel/adjust2.png',
    '/public/images/carousel/adjust3.png'];
  const repairImages = [
    '/public/images/carousel/repair1.png',
    '/public/images/carousel/repair2.png',
    '/public/images/carousel/repair3.png'];

  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedType, setSelectedType] = useState('adjust');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);

  const images = selectedType === 'adjust' ? adjustImages : repairImages;

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedType]);

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

  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
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
          <Link to="/" onClick={() => setMenuOpen(false)}>首頁</Link>
          <Link to="/adjust" onClick={() => setMenuOpen(false)}>圖片調整</Link>
          <Link to="/repair" onClick={() => setMenuOpen(false)}>圖片修復</Link>
          <Link to="/history" onClick={() => setMenuOpen(false)}>歷史圖片</Link>
        </div>
      )}

      <section id="section1" className="hero-carousel">
        {[1, 2, 3, 4, 5].map((num, idx) => (
          <div
            key={idx}
            className={`slide ${idx === currentSlide ? 'active' : ''}`}
            style={{
              backgroundImage: `url(/public/images/carouselImg/banner${num}.png)`
            }}
          />
        ))}
        <div className="hero-overlay">
          <h1>智能影像處理系統</h1>
          <p>我們提供最佳的影像優化與修復服務</p>
          <div>
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

      <section id="section2" className="section2">
        <div className="feature-card">
          <h3>圖片調整</h3>
          <p>提供亮度、對比、色調...等手動參數調整，也有AI自動調整及去背功能，讓圖片更加完美。</p>
          <span className="learn-more" onClick={() => navigate('/repair')}>LEARN MORE</span>
        </div>
        <div className="feature-card">
          <h3>圖片修復</h3>
          <p>支援殘缺修補、模糊處理、褪色修復等功能，重現原始影像風貌。</p>
          <span className="learn-more" onClick={() => navigate('/repair')}>LEARN MORE</span>
        </div>
        <div className="feature-card">
          <h3>歷史圖片</h3>
          <p>瀏覽並回顧過往上傳與修圖紀錄，追蹤處理歷程。</p>
          <span className="learn-more" onClick={() => navigate('/history')}>LEARN MORE</span>
        </div>

        <div className="work-gallery">
          <h2 className="gallery-title">成果作品</h2>
          <div className="carousel-menu">
            <div
              className={selectedType === 'adjust' ? 'active' : ''}
              onClick={() => {
                setSelectedType('adjust');
                setCurrentSlide(0);
              }}
            >圖片調整</div>
            <div
              className={selectedType === 'repair' ? 'active' : ''}
              onClick={() => {
                setSelectedType('repair');
                setCurrentSlide(0);
              }}
            >圖片修復</div>
          </div>
          <div className="slider-wrapper">
            <div className="slider-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {images.map((img, idx) => (
                <img key={idx} src={img} alt={`slide-${idx}`} />
              ))}
            </div>
            <div className="dots">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`dot ${currentSlide === idx ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="section3" className="section section3">
        <h2>關於我們</h2>
        <div className="team-carousel-container">
          <button className="carousel-arrow left" onClick={() => setCurrentTeamIndex((prev) => (prev - 1 + teamData.length) % teamData.length)}>❮</button>
          <div className="team-carousel">
            {teamData
              .slice(currentTeamIndex, currentTeamIndex + 3)
              .concat(teamData.slice(0, Math.max(0, currentTeamIndex + 3 - teamData.length)))
              .map((member, index) => (
                <div className="team-card" key={index}>
                  <img src={member.img} alt={member.name} />
                  <h3>{member.name}</h3>
                  <ul>{member.details.map((d, i) => <li key={i}>{d}</li>)}</ul>
                </div>
              ))}
          </div>
          <button className="carousel-arrow right" onClick={() => setCurrentTeamIndex((prev) => (prev + 1) % teamData.length)}>❯</button>
        </div>
      </section>
    </div>
  );
};

export default App;
