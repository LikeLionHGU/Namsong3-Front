import React from "react";
import styled from "styled-components";

function DeleteGoalModal({ setIsDeleteModalOpen }) {
  const closeDeleteGoalModal = (event) => {
    setIsDeleteModalOpen(false);
    event.stopPropagation(event); //뒤에 goalclick event 방지용
  };
  const handleModalClick = (event) => {
    event.stopPropagation(event); //뒤에 goalclick event 방지용
  };

  return (
    <div>
      <Modal>
        <Overlay onClick={(event) => closeDeleteGoalModal(event)} />
        <Wrapper onClick={(event) => handleModalClick(event)}>
          <MainText>목표를 삭제하시겠어요?</MainText>
          <SubTextContainer>
            <SubText>삭제한 목표는 복구가 불가능합니다.</SubText>
            <SubText>목표를 삭제하시겠습니까?</SubText>
          </SubTextContainer>
          <ButtonContainer>
            <Cancel onClick={(event) => closeDeleteGoalModal(event)}>취소</Cancel>
            <Confirm onClick={(event) => closeDeleteGoalModal(event)}>확인</Confirm>
          </ButtonContainer>
        </Wrapper>
      </Modal>
    </div>
  );
}

export default DeleteGoalModal;

const modalStyles = `
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`;

const Modal = styled.div`
  ${modalStyles}
  z-index: 3;
`;

const Overlay = styled.div`
  ${modalStyles}
  background: rgba(158, 158, 158, 0.8);
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: fixed; /* fixed로 변경 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  width: 350px;
  height: 176px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainText = styled.div`
  font-size: 18px;
  font-weight: bolder;
  margin-top: 18px;
`;

const SubTextContainer = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubText = styled.div`
  font-size: 16px;
  margin-top: 3px;
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
`;

const Cancel = styled.div`
  width: 100px;
  height: 40px;
  margin-right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid lightgray;
`;

const Confirm = styled.div`
  width: 100px;
  height: 40px;
  margin-left: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgray;
`;
