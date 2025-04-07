import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import UsersPage from './pages/UsersPage';  // 引入 UsersPage 作為預設頁面

const App = () => {
  const navigate = useNavigate();  // 使用 useNavigate 來導航

  return (
    <div className="container">
      <Header />
      <h1>智能影像處理系統</h1>
      <h2>介紹</h2>
      <div className="buttons">
        <button className="btn" onClick={() => navigate('/login')}>登入</button>
        <button className="btn" onClick={() => navigate('/register')}>註冊</button>
      </div>
      <div className="cards">
        <Card title="圖片修復" description="介紹..." buttonText="點擊進入" onClick={() => navigate('/repair')} />
        <Card title="圖片調整" description="介紹..." buttonText="點擊進入" onClick={() => navigate('/adjust')} />
        <Card title="歷史圖片" description="瀏覽更多..." buttonText="瀏覽更多" onClick={() => navigate('/history')} />
      </div>
    </div>
  );
};

const Card = ({ title, description, buttonText, onClick }) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <button className="card-btn" onClick={onClick}>{buttonText}</button>
    </div>
  );
};

export default App;
