import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 60px;
  background-color: gray;
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
`;
const HomeBtn = styled.div`
  margin-right: 10px;
`;
const ProfileBtn = styled.div``;

function Header() {
  return (
    <div>
      <Wrapper>
        <LogoImg>로고</LogoImg>
        <RightContainer>
          <Link to={"/HomePage"}>
            <HomeBtn>홈</HomeBtn>
          </Link>
          <ProfileBtn>프로필</ProfileBtn>
        </RightContainer>
      </Wrapper>
    </div>
  );
}

export default Header;
