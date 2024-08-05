import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { tokenState } from "../../../../atom/atom";
import deleteGoal from "../../../../apis/deleteGoal";

function DeleteGoalModal({ setIsDeleteModalOpen, goalId }) {
  const csrfToken = useRecoilValue(tokenState);
  const closeDeleteGoalModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteGoal = async () => {
    try {
      await deleteGoal(csrfToken, goalId);
      setIsDeleteModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error("목표 삭제 실패", error);
    }
  };
  return (
    <div>
      <ModalBackground>
        <Overlay onClick={closeDeleteGoalModal} />
        <Wrapper>
          <h3>목표를 삭제하시겠어요?</h3>
          <div className="complete-content">
            삭제한 목표는 복구가 불가능합니다.
            <br />
            목표를 삭제하시겠습니까?
          </div>
          <Buttons>
            <CancelBtn>
              <button onClick={closeDeleteGoalModal}>취소 </button>
            </CancelBtn>
            <CompleteBtn>
              <button onClick={handleDeleteGoal}>확인</button>
            </CompleteBtn>
          </Buttons>
        </Wrapper>
        {/* </Overlay> */}
      </ModalBackground>
    </div>
  );
}

export default DeleteGoalModal;

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
  height: 180px;
  border-radius: 12px;
  padding-top: 5px;
  z-index: 5;
  .complete-content {
    width: 310px;
    /* height: 100px; */
    font-size: 15px;
    text-align: center;
  }
`;
const CancelBtn = styled.div`
  display: flex;
  > button {
    background-color: white !important;
    color: #242424 !important;
    border: 1.5px solid #dfdfdf !important;
    margin-right: 4px;

    &:active {
      background-color: #f5f5f5 !important;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
  > div > button {
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    border-radius: 8px;
    width: 96px;
    height: 37px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: #798bff;
    cursor: pointer;
    margin-left: 4px;
    &:active {
      background-color: #586eff;
    }
  }
`;
const CompleteBtn = styled.div`
  display: flex;
`;

// const modalStyles = `
//   width: 100vw;
//   height: 100vh;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   position: fixed;
// `;

// const Modal = styled.div`
//   ${modalStyles}
//   z-index: 3;
// `;

// const Overlay = styled.div`
//   ${modalStyles}
//   background: rgba(158, 158, 158, 0.8);
//   cursor: pointer;
// `;

// const Wrapper = styled.div`
//   position: fixed; /* fixed로 변경 */
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background: #ffffff;
//   width: 350px;
//   height: 176px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const MainText = styled.div`
//   font-size: 18px;
//   font-weight: bolder;
//   margin-top: 18px;
// `;

// const SubTextContainer = styled.div`
//   margin-top: 5px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const SubText = styled.div`
//   font-size: 16px;
//   margin-top: 3px;
// `;

// const ButtonContainer = styled.div`
//   margin-top: 16px;
//   display: flex;
// `;

// const Cancel = styled.div`
//   width: 100px;
//   height: 40px;
//   margin-right: 4px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border: 1px solid lightgray;
// `;

// const Confirm = styled.div`
//   width: 100px;
//   height: 40px;
//   margin-left: 4px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: lightgray;
// `;
