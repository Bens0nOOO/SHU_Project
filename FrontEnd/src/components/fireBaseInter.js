// Import the functions you need from the SDKs you need
"use client";  // 確保這支程式只在 client side 執行
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBeEm6spVannWRmf2l_MN6vquHGdi1oIYM",
    authDomain: "shutestdemo0504.firebaseapp.com",
    projectId: "shutestdemo0504",
    storageBucket: "shutestdemo0504.firebasestorage.app",
    messagingSenderId: "746370551515",
    appId: "1:746370551515:web:a80a919a7440b0296006fe",
    measurementId: "G-Z7SNG09E7R"
  };

// ✅ 初始化 Firebase 應用
const app = initializeApp(firebaseConfig);

// ✅ 初始化 Auth 與社群登入提供者
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// 👉 可選：加入 scope（例如要求 Email、基本資訊）
googleProvider.setCustomParameters({ prompt: "select_account" });
facebookProvider.setCustomParameters({ display: "popup" });

// ✅ 匯出
export { auth, googleProvider, facebookProvider };
