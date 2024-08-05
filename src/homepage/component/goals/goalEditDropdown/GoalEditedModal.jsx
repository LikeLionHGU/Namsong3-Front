import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
function GoalEditedModal() {
  const closeModal = () => {
    window.location.reload();
  };

  return (
    <div>
      <ModalBackground>
        <Overlay onClick={closeModal} />

        <Wrapper>
          <div className="title">목표가 수정되었어요</div>
          <div className="save-content">
            홈화면에서 수정된 목표를
            <br />
            확인해보세요!
          </div>
          <CompleteBtn>
            <button onClick={closeModal}>확인하기</button>
          </CompleteBtn>
        </Wrapper>
      </ModalBackground>
    </div>
  );
}

export default GoalEditedModal;

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
  min-height: 166px;
  border-radius: 12px;
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 18px;
    margin-bottom: 8px;
    line-height: 150%;
  }
  .save-content {
    width: 310px;
    /* height: 100px; */
    font-size: 14px;
    text-align: center;
    /* border: 2px solid red; */
    line-height: 150%;
  }
`;
const CompleteBtn = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
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
