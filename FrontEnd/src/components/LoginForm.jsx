import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('請填寫所有欄位');
      return;
    }
    setError('');
    if (onSubmit) {
      onSubmit({ email, password }); // ✅ 呼叫父層傳來的函數
    } else {
      console.warn('onSubmit 尚未定義！');
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="email">電子郵件</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">密碼</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="error">{error}</p>}

      <div className="button-group">
        <button type="submit" className="btn-small">登入</button>
        <Link to="/register">
          <button type="button" className="btn-small">註冊</button>
        </Link>
      </div>

      <button type="button" className="btn-back" onClick={() => navigate('/')}>
        返回
      </button>

    </form>

  );
};

export default LoginForm;
