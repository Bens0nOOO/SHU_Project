import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, facebookProvider } from "../components/fireBaseInter"; // 根據你實際檔案路徑

export const loginWithSocial = async (providerType) => {
  try {
    const provider =
      providerType === "google"
        ? googleProvider
        : providerType === "facebook"
        ? facebookProvider
        : null;

    if (!provider) throw new Error("無效的 provider");

    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const idToken = await user.getIdToken();

    console.log(`[${providerType}] 使用者登入成功：`, user.displayName);
    console.log(`[${providerType}] Firebase ID Token:`, idToken);

    // 可選：傳給後端
    // await fetch("/api/login", {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${idToken}`,
    //   },
    // });

    return { user, idToken };
  } catch (error) {
    console.error(`[${providerType}] 登入失敗`, error);
    throw error;
  }
};