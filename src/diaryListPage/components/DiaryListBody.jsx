import React from "react";
import styled from "styled-components";
import Diaries from "./Diaries";
import GoalCard from "./GoalCard";
import Calendar from "./Calendar";

function DiaryListBody(goalId) {
  console.log("프롭스로 받은 골아이디", goalId);
  return (
    <Container>
      <CenterBox>
        <ContentWrapper>
          {/* ContentWrapper는 나중에 삭제해도 될지도...  */}
          <SidePart>
            <GoalCardBox>
              {/* GoalCardBox: 목표 카드(왼쪽 상단부분위치) */}
              <GoalCard goalIdNumber={goalId.goalId} />
            </GoalCardBox>
            <CalendarCard>
              <Calendar />
              {/* 달력 들어갈 부분 */}
              {/* CalendarCard: 달력 들어갈 부분 */}
            </CalendarCard>
          </SidePart>
          <ListPart>
            <Diaries goalIdNumber={goalId.goalId} />
          </ListPart>
        </ContentWrapper>
      </CenterBox>
    </Container>
  );
}

export default DiaryListBody;

const Container = styled.div`
  display: flex;
  padding-top: 32px;
  justify-content: center;
  width: 100%; // !! 나중에 변경해야할 부분.
  height: 100%;
  /* border: 2px solid red; */
`;
const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  /* border: 2px solid black; */
`;
const ContentWrapper = styled.div`
  // 필요없으면 나중에 삭제해도 될지도...
  display: flex;
  /* border: 2px solid gray; */
  width: 100%;
`;

const SidePart = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 23px;
  /* border: 2px solid blue; */
  /* width: 40%; */
`;
const GoalCardBox = styled.div`
  display: flex;
  justify-content: center;
`;
const CalendarCard = styled.div`
  display: flex;
  /* height: 292px; */
  /* width: 282px; */
  justify-content: center;
  align-items: center;
  /* border: 2px solid red; */
`;
const ListPart = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 2px solid cyan; */
  width: 60%;
`;
