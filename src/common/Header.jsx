import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 60px;
  border-bottom: 1px solid #e0dfde;
  display: flex;
  align-items: center;
`;

const LogoImg = styled.div`
  margin-right: auto;
  margin-left: 40px;
`;
const RightContainer = styled.div`
  margin-left: auto;
  margin-right: 40px;
  display: flex;
  font-size: 16px;
  font-weight: 500;

  cursor: pointer;
`;
const HomeBtn = styled.div`
  margin-right: 28px;
`;
const ProfileBtn = styled.div``;

function Header() {
  const navigate = useNavigate();
  const handleClickHome = () => {
    navigate("/HomePage");
  };
  return (
    <div>
      <Wrapper>
        <LogoImg>로고</LogoImg>
        <RightContainer>
          <HomeBtn onClick={handleClickHome}>Home</HomeBtn>
          <ProfileBtn>profile</ProfileBtn>
        </RightContainer>
      </Wrapper>
    </div>
  );
}

export default Header;
