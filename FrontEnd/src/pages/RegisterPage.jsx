import React from 'react';
import RegisterForm from '../components/RegisterForm';
import '../styles/register.css';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const RegisterPage = () => {
  const handleRegisterSubmit = async ({ email, password, displayName }) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (displayName) {
        await updateProfile(user, { displayName });
      }

      alert(`✅ 註冊成功：${user.email}`);
    } catch (error) {
      console.error('註冊失敗:', error);
      alert('❌ 註冊失敗：' + error.message);
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