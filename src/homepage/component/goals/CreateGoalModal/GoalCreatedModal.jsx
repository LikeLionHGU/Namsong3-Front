import React from "react";
import styled from "styled-components";
import ball from "../../../../asset/Icon/CreatedGoal.png";

function GoalCreatedModal({ setIsGoalCreatedModalOpen }) {
  const closeModal = () => {
    setIsGoalCreatedModalOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <ModalBackground>
        <Overlay onClick={closeModal} />

        <Wrapper>
          <img
            src={ball}
            className="ball-emoji"
            // width="30px"
          ></img>
          <h3>목표가 추가되었어요!</h3>
          <div className="complete-content">
            홈화면에서 추가된 목표를
            <br />
            확인해보세요!
          </div>
          <CompleteBtn>
            <button onClick={closeModal}>파이팅 넘치게 시작!</button>
          </CompleteBtn>
        </Wrapper>
        {/* </Overlay> */}
      </ModalBackground>
    </div>
  );
}

export default GoalCreatedModal;

const modalBase = `
width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  `;

const ModalBackground = styled.div`
  ${modalBase}

  background: rgba(0, 0, 0, 0.2);
  z-index: 4;
  cursor: default;
`;
const Overlay = styled.div`
  ${modalBase}
  cursor: default;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  width: 350px; // 로딩모달 크기
  height: 242px;
  border-radius: 12px;

  /* border: 2px solid red; */
  .ball-emoji {
    margin-top: 32px;
    display: flex;
    width: 40px;
    height: 40px;
  }
  .complete-content {
    width: 310px;
    /* height: 100px; */
    font-size: 14px;
    text-align: center;
    /* border: 2px solid red; */
  }
`;
const CompleteBtn = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  /* border: 2px solid red; */
  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    border-radius: 8px;
    width: 201px;
    height: 37px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: #798bff;
    cursor: pointer;
    &:active {
      background-color: #586eff;
    }
  }
`;
