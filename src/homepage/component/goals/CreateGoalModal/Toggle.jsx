import { useState } from "react";
import styled from "styled-components";

export const Toggle = ({ setIsDateSetting, isDateSetting }) => {
  const [isOn, setisOn] = useState(true); // 맨 처음에는 true로 토글 버튼 눌린 상태

  const toggleHandler = () => {
    // 토글의 상태 관리
    setisOn(!isOn);
    setIsDateSetting(!isDateSetting);
  };

  return (
    <>
      <ToggleContainer onClick={toggleHandler}>
        <div
          className={`toggle-container ${isOn ? "toggle--checked" : null}`}
        />
        <div className={`toggle-circle ${isOn ? "toggle--checked" : null}`} />
      </ToggleContainer>
    </>
  );
};

const ToggleContainer = styled.div`
  display: flex;
  position: relative;
  margin-right: 24px;
  margin-top: 16px;

  cursor: pointer;
  /* border: 2px solid red; */
  > .toggle-container {
    width: 40px;
    height: 20px;
    border-radius: 30px;
    background-color: rgb(233, 233, 234);
  }
  > .toggle--checked {
    background-color: #798bff;
    transition: 0.5s;
  }

  > .toggle-circle {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: rgb(255, 255, 255);
    transition: 0.4s;
  }
  > .toggle--checked {
    left: 22px;
    transition: 0.4s;
  }
`;
