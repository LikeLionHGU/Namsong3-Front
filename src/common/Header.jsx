import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../asset/Logo/Logo.svg";
import ProfileBtn from "./Profile";

const Wrapper = styled.div`
  width: 100vw;
  height: 60px;
  border-bottom: 1px solid #e0dfde;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 792px;
  display: flex;
  justify-content: space-between;
`;

const LogoImg = styled.img``;
const RightContainer = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 500;
`;
const HomeBtn = styled.div`
  margin-right: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

function Header() {
  const navigate = useNavigate();
  const handleClickHome = () => {
    navigate("/HomePage");
  };
  return (
    <div>
      <Wrapper>
        <Container>
          <LogoImg src={Logo} alt="" />
          <RightContainer>
            <HomeBtn onClick={handleClickHome}>홈화면</HomeBtn>
            <ProfileBtn />
          </RightContainer>
        </Container>
      </Wrapper>
    </div>
  );
}

export default Header;
