import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLocation } from "react-router-dom";
import getDiaryList from "../../apis/getDiaryList";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../atom/atom";
import CompleteGoalModal from "./CompleteGoalModal";
import CompleteConfirmModal from "./CompleteConfirmModal";

import img1 from "../../asset/Random/random1.svg";
import img2 from "../../asset/Random/random2.svg";
const backgroundArr = [img1, img2];
const randomIndex = Math.floor(Math.random() * backgroundArr.length);
const backgroundImg = backgroundArr[randomIndex];
// Props set하고,,, 모달에서 완료하기 버튼을 누르면 그 변화된 내용을 post로 저장해야함. (DB에 저장, 이 목표가 끝났다는 걸 알 수 있도록)
function GoalCard() {
  const [goalInfo, setGoalInfo] = useState({ goal: {}, journals: [] });
  const [startedFrom, setStartedFrom] = useState(0);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCompModalOpen, setIsCompModalOpen] = useState(false);
  // const [isCompleted, setIsCompleted] = useState(false);
  const csrfToken = useRecoilValue(tokenState);
  const location = useLocation();
  const goalId = location.state.goalId;

  //랜덤 이미지 설정

  const isValidDate = (dateString) => {
    const regEx = /^\d{2}\.\d{2}\.\d{2}$/;
    return dateString.match(regEx) != null;
  };

  const calculateDaysFromStart = (startDate) => {
    if (!isValidDate(startDate)) return 0; // 기본값 설정
    const [year, month, day] = startDate.split(".").map((part) => parseInt(part, 10));
    const start = new Date(year + 2000, month - 1, day); // 2000년대를 가정
    const today = new Date();
    const diffTime = today - start;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  useEffect(() => {
    const fetchGoalInfo = async () => {
      try {
        const fetchedGoalInfo = await getDiaryList(goalId, csrfToken);
        setGoalInfo(fetchedGoalInfo);

        const daysFromStart = calculateDaysFromStart(fetchedGoalInfo.goal.startDate);
        setStartedFrom(daysFromStart);
        console.log("목표정보", goalInfo);
      } catch (error) {
        console.error("Error fetching goal info:", error);
      }
    };
    fetchGoalInfo();
  }, [goalId, csrfToken]);

  if (!goalInfo.goal.title) {
    return <div>Loading...</div>;
  }

  const openCompModal = () => {
    setIsConfirmModalOpen(true);
  };

  return (
    <Container>
      <Wrapper>
        {goalInfo.goal.thumbnail ? (
          <Image style={{ backgroundImage: `url(${goalInfo.goal.thumbnail})` }} />
        ) : (
          <Image style={{ backgroundImage: `url(${backgroundImg})` }} />
        )}
        {/* <Image style={{ backgroundImage: `url(${backgroundImg})` }} /> */}
        <Info>
          <TitleFireContainer>
            <Title>{goalInfo.goal.title}</Title>
            {goalInfo.goal.streak >= 3 && (
              <FireContainer>
                <Fire>🔥{goalInfo.goal.streak >= 10 && <span>🔥</span>}</Fire>
                <Tooltip>연속{goalInfo.goal.streak}일 작성</Tooltip>
              </FireContainer>
            )}
          </TitleFireContainer>

          <Period>
            <StartDate>{goalInfo.goal.startDate}</StartDate>
            {goalInfo.goal.startDate && goalInfo.goal.endDate && <ArrowForwardIcon />}
            <DueDate>{goalInfo.goal.endDate}</DueDate>
          </Period>
          <Line />
          <ExtrtaInfo>
            {startedFrom >= 1 && <div className="info-day-count">{startedFrom}일차</div>}
            <div className="info-diary-count">작성한 일지 {goalInfo.journals ? goalInfo.journals.length : 0}개</div>
          </ExtrtaInfo>
          <div className="accomplish-btn">
            <Accomplished
              status={goalInfo.goal.status}
              onClick={goalInfo.goal.status === "OPEN" ? openCompModal : null}
            >
              {goalInfo.goal.status === "OPEN" ? "도전 완료하기" : "도전 완료"}
              {/* 도전 완료하기 */}
            </Accomplished>
          </div>
        </Info>
      </Wrapper>
      {isConfirmModalOpen && (
        <CompleteConfirmModal
          goalInfo={goalInfo}
          setIsConfirmModalOpen={setIsConfirmModalOpen}
          csrfToken={csrfToken}
          setIsCompModalOpen={setIsCompModalOpen}
        />
      )}
      {isCompModalOpen && <CompleteGoalModal setIsCompModalOpen={setIsCompModalOpen} />}
    </Container>
  );
}

export default GoalCard;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 282px;
  height: 341px;
  background-color: #f6f5f4;
  border-radius: 12px;
  /* border: 2px solid red; */
`;

const Image = styled.div`
  display: flex;
  height: 168px;
  background-size: cover;
  background-position: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 19px;

  /* background-color: #d9d9d9; */
`;

const TitleFireContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 242px;
  margin-top: 12px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bolder;
  /* border: 2px solid red; */
`;

const Fire = styled.div`
  font-size: 14px;
  display: flex;
`;

const FireContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 3px;

  &:hover div {
    display: block;
  }
`;

const Tooltip = styled.div`
  display: none;
  position: absolute;
  bottom: -34px;
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  padding: 8px;
  background-color: white;
  text-align: center;
  border-radius: 4px;
  font-size: 12px;
  z-index: 4;
  box-shadow: 2px 6px 12px rgba(0, 0, 0, 0.12), 0 0 4px rgba(0, 0, 0, 0.12);

  &:before {
    content: "";
    border-color: white transparent;
    border-style: solid;
    border-width: 0 6px 8px 6.5px;
    display: block;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    top: -5px;
    width: 0;
    z-index: 4;
  }
`;

const Period = styled.div`
  display: flex;
  font-size: 16px;
  color: gray;
  margin-top: 3px;
  /* margin-left: 20px; */

  align-items: center; // "yyyy.mm.dd", "->", "yyyy.mm.dd" 내용 모두 정렬
  font-size: 15px;
  > svg {
    display: flex;
    font-size: 15px;
  }
`;

const StartDate = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
`;

const DueDate = styled.div``;

const Line = styled.div`
  display: flex;
  width: 30px;
  height: 2px;
  padding-top: 10px;
  border-bottom: 1px solid #b5b5b5;
`;
const ExtrtaInfo = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 8px;
  font-size: 12px;

  .info-day-count,
  .info-diary-count {
    /* width: 95px; */
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 6px;
    padding-right: 6px;
    margin-right: 8px;
    height: 26px;
    color: #586eff;
    background-color: #cbd2ff7e;
    border-radius: 4px;
    /* border: 1px solid green; */
  }
`;
const Accomplished = styled.button`
  /* display: flex; */

  /* border: none; */
  border: 1px solid #aeaeae;
  height: 36px;
  width: 242px;
  margin-top: 12px;
  margin-bottom: 16px;
  border-radius: 8px;
  /* background-color: transparent; */
  background-color: ${(props) => (props.status === "OPEN" ? "transparent" : "#EEF1FF")};

  cursor: pointer;
  font-weight: bold;
  /* border: 1px solid
    ${(props) => (props.status === "OPEN" ? "#798bff;" : "#CBD2FF")};
  color: ${(props) => (props.status === "OPEN" ? "#798bff;" : "#CBD2FF")}; */

  /* 상태가 OPEN인지 CLOSED인지에 따라서 버튼 보더, 텍스트 색, 커서 모양 등 변경*/
  ${(props) =>
    props.status === "OPEN"
      ? `border: 1px solid #798bff; color: #798bff; &:active {
    border: 1px solid #798bff;
    background-color: #eef1ff;
    color: #798bff;}`
      : `border: 1px solid #CBD2FF; color: #CBD2FF;
      cursor: default;
      `}

  &:active {
    border: 1px solid #798bff;
    background-color: #eef1ff;
    color: #798bff;
  }
`;
