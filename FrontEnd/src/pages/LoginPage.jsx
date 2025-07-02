import React from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/login.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

const LoginPage = () => {
  const handleLoginSubmit = async ({ email, password }) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      await axios.post('http://localhost:8080/auth/login', {}, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        withCredentials: true,
      });

      alert(`✅ 登入成功！電子郵件: ${user.email}`);
    } catch (error) {
      console.error('登入失敗:', error);
      alert('❌ 登入失敗，請檢查帳號或密碼');
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