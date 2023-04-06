import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Toast from "../components/common/Toast";
import LoginAndSignup from "../components/LoginAndSignup/LoginAndSignup";

const LOGIN_FRAME = {
  title: "Login",
  text: "가입한 계정이 없으신가요?",
};
const SIGNUP_FRAME = {
  title: "Signup",
  text: "이미 계정이 있으신가요?",
};

export default function LoginAndSignupPage() {
  const [isUser, setIsUser] = useState(false);
  const { pathname } = useLocation();

  /**유저가 로그인을할지 회원가입을할지 구분해주는 함수 */
  const userHandler = useCallback(() => {
    if (pathname === "/signup") {
      setIsUser(false);
    } else {
      setIsUser(true);
    }
  }, [pathname]);
  useEffect(() => {
    userHandler();
  }, [pathname, userHandler]);
  return (
    <>
      <Toast />
      <LoginAndSignup
        isUser={isUser}
        frame={isUser ? LOGIN_FRAME : SIGNUP_FRAME}
      />
    </>
  );
}
