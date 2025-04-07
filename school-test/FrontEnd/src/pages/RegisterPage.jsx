import React from 'react';
import RegisterForm from '../components/RegisterForm';
import '../styles/register.css';
import axios from 'axios';

const RegisterPage = () => {
  const handleRegisterSubmit = async ({ email, password }) => {
    try {
      console.log('前端發送的註冊資料:', email, password);  // 打印發送的資料

      // 發送 POST 請求到後端進行註冊
      const response = await axios.post('http://localhost:5000/api/register', {
        email,
        password
      });

      alert(`註冊成功！電子郵件: ${email}`);
      console.log('後端回應:', response.data);

      // 註冊成功後的後續操作，例如跳轉頁面
      // 可以使用 navigate() 來跳轉頁面，例如：
      // navigate('/login');
    } catch (error) {
      console.error('註冊失敗:', error);
      alert('註冊失敗，請檢查帳號或密碼');
    }
  };

  return (
    <div className="register-page">
      <h2>註冊頁面</h2>
      <RegisterForm onSubmit={handleRegisterSubmit} />
    </div>
  );
};

export default RegisterPage;
