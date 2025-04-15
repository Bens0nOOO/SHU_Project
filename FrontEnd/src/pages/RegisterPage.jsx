import React from 'react';
import RegisterForm from '../components/RegisterForm';
import '../styles/register.css';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <h2>註冊頁面</h2>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
