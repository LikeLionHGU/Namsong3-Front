import React, { useEffect, useState } from "react";
import styled from "styled-components";
import dummy from "../../../db/data.json";
import Background from "../../../asset/Background/ExperationBox.svg";
import MoveToGoalIcon from "../../../asset/Icon/moveToGoal.svg";

function ExpirationBox() {
  const [mostOverdueGoal, setMostOverdueGoal] = useState(null);

  useEffect(() => {
    const today = new Date();

    const overdueGoals = dummy.goals // 가장 기간이 많이 지난 목표 이름 가져오기
      .filter((goal) => {
        if (!goal.dueDate) return false;
        const [year, month, day] = goal.dueDate.split(".").map(Number);
        const goalDate = new Date(year, month - 1, day);
        return goalDate < today; // 기간 지난 목표 반환
      })
      .sort((a, b) => {
        // 그중에서 가장 많이 지난거 반환
        const [yearA, monthA, dayA] = a.dueDate.split(".").map(Number);
        const [yearB, monthB, dayB] = b.dueDate.split(".").map(Number);
        const dateA = new Date(yearA, monthA - 1, dayA);
        const dateB = new Date(yearB, monthB - 1, dayB);
        return dateA - dateB;
      });

    if (overdueGoals.length > 0) {
      setMostOverdueGoal(overdueGoals[0].title);
    }
  }, []);

  return (
    <Wrapper>
      <Container>
        <MainContents>
          <MainTextContainer>
            <MainText>완료날짜가 다가오고 있어요 !</MainText>
          </MainTextContainer>
          <SubText>
            <span style={{ fontWeight: "bold", textDecoration: "underline" }}>
              {mostOverdueGoal || "멋사인재풀등록"}
            </span>{" "}
            기간이 만료되었어요!
          </SubText>
          <SubText style={{ marginTop: "4px" }}>
            목표를 달성하셨다면 ‘목표 달성' 버튼을 누르고 진행 중이시라면 기간을 수정해주세요 :)
          </SubText>
        </MainContents>
        <MoveToGoal>
          목표로 이동하기
          <img src={MoveToGoalIcon} alt="" style={{ marginLeft: "4px" }} />
        </MoveToGoal>
      </Container>
    </Wrapper>
  );
}

export default ExpirationBox;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 792px;
  height: 110px;
  margin-top: 31px;
  border-radius: 12px;
  position: relative;
  padding: 16px;
  box-sizing: border-box;
  background-image: url(${Background});
  background-position: center;
  background-position-y: 23%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
`;

const MoveToGoal = styled.div`
  position: absolute;
  bottom: 24px;
  right: 22px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  display: flex;
`;

const MainContents = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainTextContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MainText = styled.div`
  color: white;
  font-size: 18px;
  font-weight: bold;
  margin-top: 5px;
`;

const SubText = styled.div`
  font-size: 14px;
  color: #f5f5f5;
  margin-top: 8px;
`;
