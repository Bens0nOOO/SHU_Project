// Import the functions you need from the SDKs you need
"use client";  // 確保這支程式只在 client side 執行
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    // test
    apiKey: "AIzaSyAfDrWEa05qTxyqwdlpQi4Nod7hqbb2HBc",
    authDomain: "test-2ea39.firebaseapp.com",
    projectId: "test-2ea39",
    storageBucket: "test-2ea39.firebasestorage.app",
    messagingSenderId: "37136238313",
    appId: "1:37136238313:web:30b1687248639e532c1278",
    measurementId: "G-6NG0Z3H33F",
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
