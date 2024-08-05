import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { tokenState, UserTokenState } from "../atom/atom";
import { useEffect } from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Login = styled.div`
  font-size: 32px;
`;

const GoogleLoginBtn = styled.div`
  width: 384px;
  height: 74px;
  background-color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LoginPage = () => {
  const navigate = useNavigate();
  const UserToken = useRecoilValue(UserTokenState);
  const Token = useRecoilValue(tokenState);

  useEffect(() => {
    if (Token !== null && UserToken !== false) {
      navigate(`/HomePage`);
    }
  }, [UserToken, navigate]);
  const handleGoogleLogin = () => {
    // 구글 로그인 화면으로 이동시키기
    window.location.href = `${process.env.REACT_APP_HOST_URL}/oauth2/authorization/google`;
  };
  return (
    <Wrapper>
      <Login>로그인</Login>
      <GoogleLoginBtn onClick={handleGoogleLogin}>구글로 로그인</GoogleLoginBtn>
    </Wrapper>
  );
};

export default LoginPage;
