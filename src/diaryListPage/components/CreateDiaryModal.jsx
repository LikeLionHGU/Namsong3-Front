import React from "react";
import styled from "styled-components";

function CreateDiaryModal({ setIsModalOpen }) {
  const closeCreateDiaryModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal>
        <Overlay onClick={closeCreateDiaryModal} />
        <Wrapper>
          <TopContainer>
            <TopText>어떤 방법으로 일지를 작성하시겠어요?</TopText>
            <ExitButton onClick={closeCreateDiaryModal}>나가기</ExitButton>
          </TopContainer>
          <MainContainer>
            <WriteMethod>
              <TextContainer>
                <MainText>👾 (봇이름)이와 함께 일지 작성하기</MainText>
                <SubText>
                  <div>무슨 일지를 써야할지 고민이 되는 날에도, 고된 일정으로 피곤한 하루에도</div>{" "}
                  <div style={{ marginTop: "3px" }}>(봇이름)이가 chicky님의 꾸준한 기록을 도와줄게요!</div>
                </SubText>
              </TextContainer>
            </WriteMethod>
            <WriteMethod>
              <TextContainer>
                <MainText>✍️ 직접 작성하기</MainText>
                <SubText>
                  <div>오늘만큼은 적고 싶은게 너무 많은 날, 떠오르는 생각과 느낌을 적고 싶은 날</div>{" "}
                  <div style={{ marginTop: "3px" }}>자유롭게 하루의 일지를 적어보아요!</div>
                </SubText>
              </TextContainer>
            </WriteMethod>
          </MainContainer>
        </Wrapper>
      </Modal>
    </div>
  );
}

export default CreateDiaryModal;

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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  width: 520px;
  height: 375px;
`;

const TopContainer = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const TopText = styled.div`
  font-size: 20px;
  font-weight: bolder;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 316px;
`;

const ExitButton = styled.div`
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: 22px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 32px;
`;

const WriteMethod = styled.div`
  width: 472px;
  height: 120px;
  border: 1px solid lightgray;
  margin-bottom: 16px;
  color: gray;
`;

const TextContainer = styled.div`
  margin-left: 15px;
  margin-top: 23px;
`;

const MainText = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

const SubText = styled.div`
  font-size: 14px;
  margin-top: 8px;
`;