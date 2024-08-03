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

// Props set하고,,, 모달에서 완료하기 버튼을 누르면 그 변화된 내용을 post로 저장해야함. (DB에 저장, 이 목표가 끝났다는 걸 알 수 있도록)
function GoalCard() {
  const [goalInfo, setGoalInfo] = useState({ goal: {}, journals: [] });
  const [startedFrom, setStartedFrom] = useState(0);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCompModalOpen, setIsCompModalOpen] = useState(false);
  // const [isCompleted, setIsCompleted] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const goalId = queryParams.get("id");
  const csrfToken = useRecoilValue(tokenState);

  //랜덤 이미지 설정
  const randomIndex = Math.floor(Math.random() * backgroundArr.length);
  const backgroundImg = backgroundArr[randomIndex];

  const isValidDate = (dateString) => {
    const regEx = /^\d{2}\.\d{2}\.\d{2}$/;
    return dateString.match(regEx) != null;
  };

  const calculateDaysFromStart = (startDate) => {
    if (!isValidDate(startDate)) return 0; // 기본값 설정
    const [year, month, day] = startDate
      .split(".")
      .map((part) => parseInt(part, 10));
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

        const daysFromStart = calculateDaysFromStart(
          fetchedGoalInfo.goal.startDate
        );
        setStartedFrom(daysFromStart);
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
          <Image
            style={{ backgroundImage: `url(${goalInfo.goal.thumbnail})` }}
          />
        ) : (
          <Image style={{ backgroundImage: `url(${backgroundImg})` }} />
        )}
        {/* <Image style={{ backgroundImage: `url(${backgroundImg})` }} /> */}
        <Info>
          <Title>{goalInfo.goal.title}</Title>
          <Period>
            <StartDate>{goalInfo.goal.startDate}</StartDate>
            <ArrowForwardIcon />
            <DueDate>{goalInfo.goal.endDate}</DueDate>
          </Period>
          <Line />
          <ExtrtaInfo>
            <div className="info-day-count">{startedFrom}일차</div>
            <div className="info-diary-count">
              작성한 일지 {goalInfo.journals ? goalInfo.journals.length : 0}개
            </div>
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
          status={goalInfo.goal.status}
          setGoalInfo={setGoalInfo}
          setIsConfirmModalOpen={setIsConfirmModalOpen}
          goalId={goalId}
          csrfToken={csrfToken}
          setIsCompModalOpen={setIsCompModalOpen}
        />
      )}
      {isCompModalOpen && (
        <CompleteGoalModal setIsCompModalOpen={setIsCompModalOpen} />
      )}
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

const Title = styled.div`
  font-size: 20px;
  font-weight: bolder;
  margin-top: 12px;
  /* border: 2px solid red; */
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

const StartDate = styled.div``;

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
  background-color: ${(props) =>
    props.status === "OPEN" ? "transparent" : "#EEF1FF"};

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
