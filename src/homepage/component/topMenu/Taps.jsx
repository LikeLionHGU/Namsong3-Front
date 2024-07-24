import React from "react";
import styled from "styled-components";

function Taps({ currentTab, setCurrentTab }) {
  return (
    <Wrapper>
      <TapMenu isActive={currentTab === "전체"} onClick={() => setCurrentTab("전체")}>
        전체
      </TapMenu>
      <TapMenu isActive={currentTab === "도전 중"} onClick={() => setCurrentTab("도전 중")}>
        도전 중
      </TapMenu>
      <TapMenu isActive={currentTab === "달성한 목표"} onClick={() => setCurrentTab("달성한 목표")}>
        달성한 목표
      </TapMenu>
    </Wrapper>
  );
}

export default Taps;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TapMenu = styled.div`
  width: 106px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  border-bottom: ${({ isActive }) => (isActive ? "2px solid #089746" : "1px solid #d9d9d9")};
  color: ${({ isActive }) => (isActive ? "#5B5B5B" : "#d9d9d9")};
  cursor: pointer;
  transition: border-bottom 0.3s ease-in-out, color 0.3s ease-in-out;
`;
