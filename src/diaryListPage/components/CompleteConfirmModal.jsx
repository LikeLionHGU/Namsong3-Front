import React from "react";
import styled from "styled-components";
import updateGoal from "../../apis/updateGoal";

const parseDate = (dateString) => {
  if (!dateString) return ""; // dateString이 없을 경우 빈 문자열 반환
  const [year, month, day] = dateString.split(".").map(Number);
  const fullYear = year < 50 ? 2000 + year : 1900 + year;
  return `${fullYear}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

function CompleteConfirmModal({
  goalInfo,
  setIsConfirmModalOpen,
  csrfToken,
  setIsCompModalOpen,
  expiredData,
  setIsModalOpen,
}) {
  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const handleClickCancle = () => {
    setIsConfirmModalOpen(false);
    if (expiredData !== undefined) {
      setIsModalOpen(true);
    }
  };

  const completeGoal = async () => {
    const data = expiredData || goalInfo.goal;
    if (!data) {
      console.error("No valid data provided");
      return;
    }

    try {
      const { title, startDate, endDate, thumbnail, goalId } = data;

      const formDataToSend = new FormData();
      formDataToSend.append("title", title);
      formDataToSend.append("startDate", parseDate(startDate)); // 날짜 형식 변환
      formDataToSend.append("endDate", parseDate(endDate)); // 날짜 형식 변환
      formDataToSend.append("status", "CLOSED");

      if (thumbnail) {
        formDataToSend.append("thumbnail", thumbnail);
      } else {
        formDataToSend.append("thumbnail", "");
      }
      await updateGoal(formDataToSend, csrfToken, goalId);
      setIsConfirmModalOpen(false);
      setIsCompModalOpen(true);
    } catch (error) {
      console.error("Error updating goal status:", error);
    }
  };

  return (
    <div>
      <ModalBackground>
        <Overlay onClick={closeConfirmModal} />
        <Wrapper isExpired={expiredData !== undefined}>
          {expiredData !== undefined ? <h3>목표 기간이 만료되었어요</h3> : <h3>도전을 완료하시겠어요?</h3>}

          <div className="complete-content">
            {expiredData !== undefined && <div>목표기한을 수정하시거나 완료해주세요.</div>}
            완료한 도전은 재도전이 불가합니다.
            <br />
            도전을 완료하시겠어요?
          </div>
          <Buttons>
            <CancelBtn>
              <button onClick={handleClickCancle}>{expiredData !== undefined ? "수정하기" : "취소"}</button>
            </CancelBtn>
            <CompleteBtn>
              <button onClick={completeGoal}>완료하기</button>
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
  height: ${(props) => (props.isExpired ? "187px" : "180px")};
  /* min-height: 187px; */
  border-radius: 12px;
  padding-top: 5px;
  padding-bottom: 5px;
  z-index: 5;
  .complete-content {
    line-height: 150%;
    width: 310px;
    /* height: 100px; */
    font-size: 14px;
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
  margin-bottom: 18px;
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
