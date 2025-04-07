import React from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/login.css';
import axios from 'axios';

const LoginPage = () => {
  const handleLoginSubmit = async ({ email, password }) => {
    try {
      // 向後端發送 POST 請求
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });
      // 登入成功後的處理
      alert(`登入成功！電子郵件: ${email}`);
      console.log('後端回應:', response.data);
    } catch (error) {
      // 錯誤處理
      console.error('登入失敗:', error);
      alert('登入失敗，請檢查帳號或密碼');
    }
  };

  return (
    <div className="login-page">
      <h2>登入頁面</h2>
      <LoginForm onSubmit={handleLoginSubmit} />
    </div>
  );
};

export default LoginPage;
