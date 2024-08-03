import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import DateRangePicker from "./DateRangePicker";
import createGoal from "../../../../apis/createGoal";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../../../atom/atom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ImgUpload from "../../../../asset/Icon/ImgUpload.svg";

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
            <ExitButton onClick={closeCreateGoalModal}>
              <CloseRoundedIcon />
            </ExitButton>
          </TopContainer>
          <MainContainer>
            <GoalTitleContainer>
              <ExplainText>
                목표명<span style={{ color: "red" }}>*</span>
              </ExplainText>
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
                <CheckboxText>종료일을 설정하지 않을래요!</CheckboxText>
              </NoPeriodContainer>
            </PeriodContainer>
            <ImgContainer>
              <ExplainText>사진</ExplainText>
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
                  <div
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}
                  >
                    <img src={ImgUpload} alt=""></img>
                    <div style={{ color: "#AEAEAE", fontSize: "14px", marginTop: "8px" }}>사진 추가하기</div>
                  </div>
                )}
                <input type="file" style={{ display: "none" }} onChange={handleFileInputChange} ref={fileInputRef} />
              </ImageUpload>
            </ImgContainer>
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
  border-radius: 12px;
`;

const TopContainer = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const TopText = styled.div`
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

const ExitButton = styled.div`
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: 22px;
  cursor: pointer;
  padding: 2px;
  border-radius: 5px;
  &:hover {
    background-color: #eef1ff;
  }
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
  font-size: 12px;
  margin-right: auto;
`;

const GoalTitleInput = styled.input`
  width: 373px;
  height: 45px;
  margin-top: 6px;
  border-radius: 8px;
  border: 1px solid #dfdfdf;
  padding-left: 12px;
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
  border: 1px solid #c5c5c5;
  border-radius: 4px;
`;

const CheckboxText = styled.div`
  font-size: 12px;
  margin-top: 3px;
  color: #676767;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 16px;
`;

const ImageUpload = styled.div`
  width: 387px;
  height: 208px;
  display: flex;
  border: 1px solid #dfdfdf;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 6px;
  cursor: pointer;
`;

const SubmitButton = styled.div`
  width: 108px;
  height: 37px;
  background-color: #798bff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  margin-top: 25px;
  margin-left: auto;
  margin-right: 20px;
  border-radius: 8px;
`;
