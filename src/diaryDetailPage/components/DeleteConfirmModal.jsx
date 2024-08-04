import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function DeleteConfirmModal({ setDeleteModal, goalId }) {
  const navigate = useNavigate();
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };
  const deleteModal = () => {
    //일지 삭제하는 부분 필요.
    setDeleteModal(false);
    navigate(`/diarylist`, { state: { goalId } });
  };
  return (
    <div>
      <ModalBackground>
        <Overlay onClick={closeDeleteModal} />
        <Wrapper>
          <h3>일지를 삭제하시겠어요?</h3>
          <div className="complete-content">
            삭제한 일지는 복구가 불가능합니다.
            <br />
            일지를 삭제하시겠습니까?
          </div>
          <Buttons>
            <CancelBtn>
              <button onClick={closeDeleteModal}>취소 </button>
            </CancelBtn>
            <CompleteBtn>
              <button onClick={deleteModal}>확인</button>
            </CompleteBtn>
          </Buttons>
        </Wrapper>
        {/* </Overlay> */}
      </ModalBackground>
    </div>
  );
}

export default DeleteConfirmModal;

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
  height: 166px;
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
