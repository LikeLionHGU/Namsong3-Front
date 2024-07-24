import React, { useState } from "react";
import styled from "styled-components";
import dummy from "../../../db/data.json";
import CreateGoalModal from "./CreateGoalModal/CreateGoalModal";
import CreateGoal from "../../../asset/Icon/CreateGoal.svg";
import GoalEditDropdown from "./goalEditDropdown/GoalEditDropdown";
import Taps from "../topMenu/Taps";
import { useNavigate } from "react-router-dom";
import GoalViewDropdown from "../topMenu/GoalViewDropdown";

function Goals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("전체");
  const [currentSort, setCurrentSort] = useState("최신순");
  const navigate = useNavigate();

  const openCreateGoalsModal = () => {
    setIsModalOpen(true);
  };

  const handleClickGoal = () => {
    navigate("/diarylist");
  };

  const today = new Date();

  const isExpired = (dueDate) => {
    // 마감되었는지 판별
    if (!dueDate) return false;
    const [year, month, day] = dueDate.split(".").map(Number);
    const goalDate = new Date(year, month - 1, day);
    return goalDate < today;
  };

  const getDaysLeft = (dueDate) => {
    // 다가오는 마감 감지
    if (!dueDate) return null;
    const [year, month, day] = dueDate.split(".").map(Number);
    const goalDate = new Date(year, month - 1, day);
    const diffTime = goalDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getFilteredGoals = () => {
    //  목표 최신순, 오래된순 필더 드롭다운
    let goals = dummy.goals;

    if (currentTab === "도전 중") {
      goals = goals.filter((goal) => goal.isComplete === "No");
    } else if (currentTab === "달성한 목표") {
      goals = goals.filter((goal) => goal.isComplete === "Yes");
    }

    if (currentSort === "최신순") {
      goals = goals.sort((a, b) => new Date(b.createDate) - new Date(a.createDate));
    } else if (currentSort === "오래된 순") {
      goals = goals.sort((a, b) => new Date(a.createDate) - new Date(b.createDate));
    }

    return goals;
  };

  const filteredGoals = getFilteredGoals();

  return (
    <Container>
      <TopMenu>
        <Taps currentTab={currentTab} setCurrentTab={setCurrentTab} />
        <GoalViewDropdown currentSort={currentSort} setCurrentSort={setCurrentSort} />
      </TopMenu>
      <GoalContainer>
        <CreateGoalModalBtn onClick={openCreateGoalsModal}>
          <img src={CreateGoal} alt="" style={{ marginBottom: "15px" }} />
          목표 추가하기
        </CreateGoalModalBtn>
        {filteredGoals.map((goal, index) => {
          const daysLeft = getDaysLeft(goal.dueDate);
          return (
            <Wrapper key={index} onClick={handleClickGoal}>
              <ImageContainer>
                <Image style={{ backgroundImage: `url(${goal.imgUrl})` }} />
                {isExpired(goal.dueDate) && <ExpirationText>기한만료</ExpirationText>}
                <GoalEditDropdown />
              </ImageContainer>
              <Info>
                <InfoContainer>
                  {daysLeft !== null && daysLeft <= 5 && daysLeft > 0 && (
                    <DeadlineComing>⏰ 기간까지 {daysLeft}일 남았어요!</DeadlineComing>
                  )}
                  <Title>{goal.title}</Title>
                  {(goal.startDate || goal.dueDate) && (
                    <Period>
                      {goal.startDate && <StartDate>{goal.startDate}</StartDate>}
                      {goal.startDate && goal.dueDate && <span> →</span>}
                      {goal.dueDate && <DueDate>{goal.dueDate}</DueDate>}
                    </Period>
                  )}
                </InfoContainer>
              </Info>
            </Wrapper>
          );
        })}
      </GoalContainer>
      {isModalOpen && <CreateGoalModal setIsModalOpen={setIsModalOpen} />}
    </Container>
  );
}

export default Goals;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 32px;
`;

const TopMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 1200px;
`;

const GoalContainer = styled.div`
  width: 1224px;
  display: flex;
  flex-wrap: wrap;
`;

const CreateGoalModalBtn = styled.div`
  margin-top: 20px;
  margin-right: 12px;
  margin-left: 12px;
  width: 282px;
  height: 270px;
  background-color: #f0efec;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #c5c5c5;
`;

const Wrapper = styled.div`
  width: 282px;
  height: 270px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-right: 12px;
  margin-left: 12px;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 168px;
`;

const Image = styled.div`
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 12px 12px 0 0;
`;

const ExpirationText = styled.div`
  position: absolute;
  top: 11px;
  left: 11px;
  background-color: #3ab871;
  color: white;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 700;
  width: 60px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Info = styled.div`
  background-color: #f0efec;
  height: 102px;
  border-radius: 0 0 12px 12px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 14px;
  margin-left: 22px;
`;

const DeadlineComing = styled.div`
  color: #f2421b;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 3px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bolder;
  margin-bottom: 3px;
`;

const Period = styled.div`
  display: flex;
  font-size: 16px;
  color: #9a9a9a;
`;

const StartDate = styled.div`
  margin-right: 3px;
`;

const DueDate = styled.div`
  margin-left: 3px;
`;
