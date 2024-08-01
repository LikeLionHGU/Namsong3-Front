import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLocation } from "react-router-dom";
import getDiaryList from "../../apis/getDiaryList";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../atom/atom";

function GoalCard() {
  const [goalInfo, setGoalInfo] = useState({ goal: {}, journals: [] });
  const [startedFrom, setStartedFrom] = useState(0);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const goalId = queryParams.get("id");
  const csrfToken = useRecoilValue(tokenState);

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
      } catch (error) {
        console.error("Error fetching goal info:", error);
      }
    };
    fetchGoalInfo();
  }, [goalId, csrfToken]);

  if (!goalInfo.goal.title) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Wrapper>
        <Image style={{ backgroundImage: `url(https://ifh.cc/g/ZzgWw6.jpg)` }} />
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
            <div className="info-diary-count">작성한 일지 {goalInfo.journals ? goalInfo.journals.length : 0}개</div>
          </ExtrtaInfo>
          <div className="accomplish-btn">
            <Accomplished>도전 완료하기</Accomplished>
          </div>
        </Info>
      </Wrapper>
    </Container>
  );
}

export default GoalCard;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
  background-color: transparent;
  cursor: pointer;
  font-weight: bold;
  border: 1px solid #798bff;
  color: #798bff;
  &:active {
    border: 1px solid #798bff;
    background-color: #eef1ff;
    color: #798bff;
  }

  /* &:hover {
    border: 1px solid #798bff;
    background-color: #eef1ff;
    color: #798bff;
  } */
`;
