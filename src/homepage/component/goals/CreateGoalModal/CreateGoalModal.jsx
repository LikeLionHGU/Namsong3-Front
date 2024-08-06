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
import updateGoal from "../../../../apis/updateGoal";
import { fi } from "date-fns/locale";
import createImg from "../../../../apis/createImg";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseDate = (dateString) => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split(".").map(Number);
  const fullYear = year < 50 ? 2000 + year : 1900 + year;
  return `${fullYear}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

function CreateGoalModal({
  setIsModalOpen,
  setIsGoalCreatedModalOpen,
  updateData,
  isUpdate,
  setIsUpdate,
  setIsGoalEditedModalOpen,
  expiredData,
  setExpiredData,
}) {
  const [isDateSetting, setIsDateSetting] = useState(true);
  const csrfToken = useRecoilValue(tokenState);
  // const [isStartValid, setIsStartValid] = useState(true);
  // const [isEndValid, setIsEndValid] = useState(true);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [dateChanged, setDateChanged] = useState({
    startDate: false,
    endDate: false,
  });

  const titleInputRef = useRef(null);

  // 날짜 데이터 두개 들어갈 ref
  // const refs = {
  //   startInputRef: useRef(null),
  //   endInputRef: useRef(null),
  // };
  const [formData, setFormData] = useState({
    title: isUpdate && updateData?.title ? updateData.title : expiredData?.title ? expiredData.title : "",
    startDate:
      isUpdate && updateData?.startDate
        ? parseDate(updateData.startDate)
        : expiredData?.startDate
        ? parseDate(expiredData.startDate)
        : "",
    endDate:
      isUpdate && updateData?.endDate
        ? parseDate(updateData.endDate)
        : expiredData?.endDate
        ? parseDate(expiredData.endDate)
        : "",
    thumbnail:
      isUpdate && updateData?.thumbnail ? updateData.thumbnail : expiredData?.thumbnail ? expiredData.thumbnail : "",
  });

  const [imageUrl, setImageUrl] = useState("");

  const goalId = isUpdate && updateData.goalId ? updateData.goalId : expiredData?.goalId;
  const status = isUpdate && updateData.status ? updateData.status : expiredData?.status;
  const [previewUrl, setPreviewUrl] = useState(
    isUpdate && updateData?.thumbnail ? updateData.thumbnail : expiredData?.thumbnail ? expiredData.thumbnail : null
  );

  const closeCreateGoalModal = () => {
    setIsModalOpen(false);
    setIsUpdate(false);
    setExpiredData(undefined);
  };

  const handleImageUploadClick = () => {
    fileInputRef.current.click();
  };

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "title") {
      setIsTitleValid(true);
    }
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    setImageUrl(await createImg(csrfToken, formData));

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("전달된 파일이 유효하지 않습니다.");
    }
  };

  const handleStartDateChange = (date) => {
    setDateChanged({ ...dateChanged, startDate: true });
    setFormData({
      ...formData,
      startDate: formatDate(date),
    });
  };

  const handleEndDateChange = (date) => {
    setDateChanged({ ...dateChanged, endDate: true });
    setFormData({
      ...formData,
      endDate: formatDate(date),
    });
  };

  const handleSubmit = async () => {
    if (!formData.title) {
      setIsTitleValid(false);
      titleInputRef.current.focus();
      return;
    }

    /* 날짜 데이터 없으면 빨간색으로. */
    // if (!formData.startDate) {
    //   setIsTitleValid(false);
    //   refs.startInputRef.current.focus();
    //   return;
    // }
    // if (!formData.startDate) {
    //   setIsTitleValid(false);
    //   refs.endInputRef.current.focus();
    //   return;
    // }

    try {
      const { title, startDate, endDate } = formData;

      const formDataToSend = new FormData();
      formDataToSend.append("title", title);
      formDataToSend.append("startDate", startDate);
      formDataToSend.append("endDate", endDate);

      if (imageUrl) {
        formDataToSend.append("thumbnail", imageUrl);
      }
      await createGoal(formDataToSend, csrfToken);
      closeCreateGoalModal();
      setIsGoalCreatedModalOpen(true);
    } catch (error) {
      console.error("목표 생성 실패", error);
    }
  };

  const handleUpdateSubmit = async () => {
    if (!formData.title) {
      setIsTitleValid(false);
      titleInputRef.current.focus();
      return;
    }

    try {
      const { title, startDate, endDate } = formData;
      const updateDataSource = expiredData || updateData; // expiredData가 있으면 사용, 없으면 updateData 사용

      const formDataToSend = new FormData();
      formDataToSend.append("title", title);
      formDataToSend.append(
        "startDate",
        dateChanged.startDate ? startDate : isDateSetting ? parseDate(updateDataSource.startDate) : ""
      );
      formDataToSend.append(
        "endDate",
        dateChanged.endDate ? endDate : isDateSetting ? parseDate(updateDataSource.endDate) : ""
      );
      formDataToSend.append("status", status);

      if (imageUrl) {
        formDataToSend.append("thumbnail", imageUrl);
      }
      await updateGoal(formDataToSend, csrfToken, goalId);
      closeCreateGoalModal();
      setIsGoalEditedModalOpen(true);
    } catch (error) {
      console.error("목표 수정 실패", error);
    }
    setExpiredData(undefined);
  };

  const handleToggleDateSetting = () => {
    const newIsDateSetting = !isDateSetting;
    setIsDateSetting(newIsDateSetting);
    if (!newIsDateSetting) {
      setFormData({
        ...formData,
        startDate: "",
        endDate: "",
      });
      setDateChanged({
        startDate: false,
        endDate: false,
      });
    }
  };

  return (
    <div>
      <Modal>
        <Overlay onClick={closeCreateGoalModal} />
        <Wrapper>
          <TopContainer>
            <TopText>{expiredData || isUpdate ? "목표 수정하기" : "목표 추가하기"}</TopText>
            <ExitButton onClick={closeCreateGoalModal}>
              <CloseRoundedIcon />
            </ExitButton>
          </TopContainer>
          {expiredData !== undefined && <ExpiredText>만료된 기간을 수정해주세요!</ExpiredText>}
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
                maxLength={10}
                isValid={isTitleValid}
                ref={titleInputRef}
              />
            </GoalTitleContainer>
            <NoPeriodContainer>
              <DatePickText>
                <div>기간</div>
                <div className="date-pick-explain">목표 진행 기간을 설정할 수 있어요!</div>
              </DatePickText>
              <Toggle setIsDateSetting={handleToggleDateSetting} isDateSetting={isDateSetting} />
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
                      // ref={refs}
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
            {expiredData || isUpdate ? (
              <SubmitButton onClick={handleUpdateSubmit}>수정 완료하기</SubmitButton>
            ) : (
              <SubmitButton onClick={handleSubmit}>목표 추가하기</SubmitButton>
            )}
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

const ExpiredText = styled.div`
  color: #fd5e2b;
  border-bottom: 1px solid #fd7e55;
  height: 25px;
  display: flex;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
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
