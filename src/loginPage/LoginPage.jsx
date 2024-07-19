import { Link } from "react-router-dom";
import styled from "styled-components";

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
`;
const LoginPage = () => {
  return (
    <Wrapper>
      <Login>로그인</Login>
      <Link to={"/HomePage"}>
        <GoogleLoginBtn>구글로 로그인</GoogleLoginBtn>
      </Link>
    </Wrapper>
  );
};

export default LoginPage;
