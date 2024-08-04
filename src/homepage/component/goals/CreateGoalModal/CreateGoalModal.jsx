import React, { useRef, useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import DateRangePicker from "./DateRangePicker";
import createGoal from "../../../../apis/createGoal";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../../../atom/atom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ImgUpload from "../../../../asset/Icon/ImgUpload.svg";
import { Toggle } from "./Toggle";
import { CSSTransition, TransitionGroup } from "react-transition-group";

/* 
- 이미지 업로드 부분 안됨
- 날짜 선택 안해도 목표 설정 가능해야함
 */
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function CreateGoalModal({ setIsModalOpen, setIsGoalCreatedModalOpen }) {
  const [isDateSetting, setIsDateSetting] = useState(true);
  const csrfToken = useRecoilValue(tokenState);
  const [isTitleValid, setIsTitleValid] = useState(true); // 제목 유효성 상태 추가

  const titleInputRef = useRef(null); // 제목 입력 필드에 대한 ref 추가

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    thumbnail: "",
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
    if (name === "title") {
      setIsTitleValid(true); // 제목 변경 시 유효성 상태를 true로 설정
    }
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
    if (!formData.title) {
      setIsTitleValid(false); // 제목이 없으면 유효성 상태를 false로 설정
      titleInputRef.current.focus(); // 제목 입력 필드에 포커스 설정
      return;
    }

    console.log("Form Data Submitted: ", formData);
    try {
      const { title, startDate, endDate } = formData;

      const formDataToSend = new FormData();
      formDataToSend.append("title", title);
      formDataToSend.append("startDate", startDate);
      formDataToSend.append("endDate", endDate);

      // 이미지 파일이 존재할 경우에만 추가
      if (fileInputRef.current.files[0]) {
        formDataToSend.append("thumbnail", fileInputRef.current.files[0]);
      }
      await createGoal(formDataToSend, csrfToken);
      closeCreateGoalModal();
    } catch (error) {
      console.error("목표 생성 실패", error);
    }
    setIsGoalCreatedModalOpen(true);
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
                maxLength={10} // 최대 글자 수 10자로 제한
                isValid={isTitleValid} // 유효성 상태 전달
                ref={titleInputRef} // ref 설정
              />
            </GoalTitleContainer>
            <NoPeriodContainer>
              <DatePickText>
                <div>기간</div>
                <div className="date-pick-explain">목표 진행 기간을 설정할 수 있어요!</div>
              </DatePickText>
              <Toggle setIsDateSetting={setIsDateSetting} isDateSetting={isDateSetting} />
            </NoPeriodContainer>
            <TransitionGroup component={null}>
              {isDateSetting && (
                <CSSTransition timeout={500} classNames="period">
                  <PeriodContainer>
                    <DateRangePicker
                      startDate={formData.startDate}
                      setStartDate={handleStartDateChange}
                      endDate={formData.endDate}
                      setEndDate={handleEndDateChange}
                    />
                  </PeriodContainer>
                </CSSTransition>
              )}
            </TransitionGroup>
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <img src={ImgUpload} alt=""></img>
                    <div
                      style={{
                        color: "#AEAEAE",
                        fontSize: "14px",
                        marginTop: "8px",
                      }}
                    >
                      사진 추가하기
                    </div>
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

const enterAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const exitAnimation = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.9);
  }
`;

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
  background: rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  width: 431px;
  min-height: 440px;
  border-radius: 12px;
  cursor: default;

  &.modal-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  &.modal-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 0.5s, transform 0.5s;
  }
  &.modal-exit {
    opacity: 1;
    transform: scale(1);
  }
  &.modal-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 0.5s, transform 0.5s;
  }
`;

const TopContainer = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const TopText = styled.div`
  display: flex;
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
  margin-top: 32px;
`;

const GoalTitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ExplainText = styled.div`
  display: flex;
  font-size: 12px;
  margin-left: 24px;
  margin-right: auto;
`;

const DatePickText = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;
  margin-top: 16px;
  margin-left: 24px;
  .date-pick-explain {
    color: #676767;
    font-size: 12px;
    margin-top: 5px;
  }
`;

const GoalTitleInput = styled.input`
  width: 373px;
  height: 45px;
  margin-top: 6px;
  border-radius: 8px;
  border: 1px solid #dfdfdf;
  padding-left: 12px;
  outline: none;
  ${(props) =>
    !props.isValid &&
    css`
      border: 1px solid red;
      &::placeholder {
        color: red;
      }
    `}
  ${(props) =>
    props.isValid &&
    css`
      &:focus {
        border: 1px solid #676767;
      }
    `}
`;

const PeriodContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  &.period-enter {
    animation: ${enterAnimation} 0.5s forwards;
  }
  &.period-exit {
    animation: ${exitAnimation} 0.5s forwards;
  }
`;

const NoPeriodContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 3px;
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
  margin-bottom: 18px;
  cursor: pointer;

  &:active {
    background-color: #586eff;
  }
`;
