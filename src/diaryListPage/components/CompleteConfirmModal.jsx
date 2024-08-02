import React from "react";
import styled from "styled-components";

function CompleteConfirmModal({
  status,
  setGoalInfo,
  setIsConfirmModalOpen,
  goalId,
  csrfToken,
  setIsCompModalOpen,
}) {
  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const completeGoal = async () => {
    // console.log("current status before update is : " + status);

    const updatedGoalInfo = {
      goal: { status: "CLOSED" },
    };
    setGoalInfo((prevGoalInfo) => ({
      ...prevGoalInfo,
      goal: { ...prevGoalInfo.goal, status: "CLOSED" },
    }));

    console.log("current status after update is : " + status);
    // 모달 닫기

    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify(updatedGoalInfo),
      });

      if (!response.ok) {
        throw new Error("Failed to update goal status");
      }

      console.log("Goal status updated successfully");
    } catch (error) {
      console.error("Error updating goal status:", error);
    }

    setIsConfirmModalOpen(false);
    setIsCompModalOpen(true);
  };

  return (
    <div>
      <ModalBackground>
        <Overlay onClick={closeConfirmModal} />
        <Wrapper>
          <h3>도전을 완료하시겠어요?</h3>
          <div className="complete-content">
            완료한 도전은 재도전이 불가합니다.
            <br />
            도전을 완료하시겠어요?
          </div>
          <Buttons>
            <CancelBtn>
              <button onClick={closeConfirmModal}>취소 </button>
            </CancelBtn>
            <CompleteBtn>
              <button onClick={completeGoal}>확인</button>
            </CompleteBtn>
          </Buttons>
        </Wrapper>
        {/* </Overlay> */}
      </ModalBackground>
    </div>
  );
}
export default CompleteConfirmModal;

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
    color: #6c6c6c !important;
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
