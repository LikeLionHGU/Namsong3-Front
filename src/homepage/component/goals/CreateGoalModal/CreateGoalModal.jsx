import React, { useRef, useState } from "react";
import styled from "styled-components";
import DateRangePicker from "./DateRangePicker";

function CreateGoalModal({ setIsModalOpen }) {
  const closeCreateGoalModal = () => {
    setIsModalOpen(false);
  };
  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
        console.log("Uploaded image:", reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("전달된 파일이 유효하지 않습니다.");
    }
  };

  return (
    <div>
      <Modal>
        <Overlay onClick={closeCreateGoalModal} />
        <Wrapper>
          <TopContainer>
            <TopText>목표 추가하기</TopText>
            <ExitButton onClick={closeCreateGoalModal}>나가기</ExitButton>
          </TopContainer>
          <MainContainer>
            <GoalTitleContainer>
              <ExplainText>목표작성</ExplainText>
              <GoalTitleInput type="text" placeholder="목표이름 작성하기"></GoalTitleInput>
            </GoalTitleContainer>
            <PeriodContainer>
              <DateRangePicker />
              <NoPeriodContainer>
                <Checkbox type="checkbox" />
                <CheckboxText>진행기간을 설정하지 않을래요!</CheckboxText>
              </NoPeriodContainer>
            </PeriodContainer>

            <ImageUpload onClick={handleImageUploadClick}>
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Uploaded"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                "이미지(선택)"
              )}
              <input type="file" style={{ display: "none" }} onChange={handleFileInputChange} ref={fileInputRef} />
            </ImageUpload>
            <SubmitButton onClick={closeCreateGoalModal}>목표 추가하기</SubmitButton>
          </MainContainer>
        </Wrapper>
      </Modal>
    </div>
  );
}

export default CreateGoalModal;

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
  width: 431px;
  height: 580px;
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

const GoalTitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ExplainText = styled.div`
  font-size: 16px;
  margin-right: auto;
`;

const GoalTitleInput = styled.input`
  width: 387px;
  height: 54px;
  margin-top: 3px;
`;

const PeriodContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const NoPeriodContainer = styled.div`
  display: flex;
  margin-right: auto;

  margin-top: 3px;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
`;

const CheckboxText = styled.div`
  font-size: 12px;
  margin-top: 3px;
`;

const ImageUpload = styled.div`
  width: 387px;
  height: 208px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
  margin-top: 16px;
  cursor: pointer;
`;

const SubmitButton = styled.div`
  width: 153px;
  height: 40px;
  background-color: lightgray;
  color: gray;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  margin-top: 25px;
  margin-left: auto;
  margin-right: 20px;
`;
