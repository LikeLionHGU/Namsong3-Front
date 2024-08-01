import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import DateRangePicker from "./DateRangePicker";
import createGoal from "../../../../apis/createGoal";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../../../atom/atom";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function CreateGoalModal({ setIsModalOpen }) {
  const csrfToken = useRecoilValue(tokenState);

  const [formData, setFormData] = useState({
    title: "",
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    console.log("formData updated:", formData, csrfToken);
  }, [formData]);

  const closeCreateGoalModal = () => {
    setIsModalOpen(false);
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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

  const handleStartDateChange = (date) => {
    setFormData({
      ...formData,
      startDate: formatDate(date),
    });
  };

  const handleEndDateChange = (date) => {
    setFormData({
      ...formData,
      endDate: formatDate(date),
    });
  };

  const handleSubmit = async () => {
    console.log("Form Data Submitted: ", formData);
    try {
      const { title, startDate, endDate } = formData;

      const formDataToSend = new FormData();
      formDataToSend.append("title", title);
      formDataToSend.append("startDate", startDate);
      formDataToSend.append("endDate", endDate);

      // 이미지 파일이 존재할 경우에만 추가
      if (fileInputRef.current.files[0]) {
        formDataToSend.append("image", fileInputRef.current.files[0]);
      }
      await createGoal(formDataToSend, csrfToken);
      closeCreateGoalModal();
    } catch (error) {
      console.error("목표 생성 실패", error);
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
              <GoalTitleInput
                type="text"
                placeholder="목표이름 작성하기"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </GoalTitleContainer>
            <PeriodContainer>
              <DateRangePicker
                startDate={formData.startDate}
                setStartDate={handleStartDateChange}
                endDate={formData.endDate}
                setEndDate={handleEndDateChange}
              />
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
            <SubmitButton onClick={handleSubmit}>목표 추가하기</SubmitButton>
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
