import React, { useState } from "react";
import styled from "styled-components";
import dummy from "../../db/data.json";
import CreateGoalModal from "./CreateGoalModal/CreateGoalModal";
import GoalEditDropdown from "./goalEditDropdown/GoalEditDropdown";
import { useNavigate } from "react-router-dom";

function Goals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openCreateGoalsModal = () => {
    setIsModalOpen(true);
  };

  const handleClickGoal = () => {
    navigate("/diarylist");
  };
  return (
    <Container>
      <CreateGoalModalBtn onClick={openCreateGoalsModal}>목표생성</CreateGoalModalBtn>
      {dummy.goals.map((goal, index) => (
        <Wrapper key={index} onClick={handleClickGoal}>
          <ImageContainer>
            <Image style={{ backgroundImage: `url(${goal.imgUrl})` }} />
            <GoalEditDropdown />
          </ImageContainer>
          <Info>
            <Title>{goal.title}</Title>
            <Period>
              <StartDate>{goal.startDate} ~ </StartDate>
              <DueDate>{goal.dueDate}</DueDate>
            </Period>
          </Info>
        </Wrapper>
      ))}
      {isModalOpen && <CreateGoalModal setIsModalOpen={setIsModalOpen} />}
    </Container>
  );
}

export default Goals;

const CreateGoalModalBtn = styled.div`
  margin-top: 24px;
  margin-left: 24px;
  width: 282px;
  height: 270px;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Wrapper = styled.div`
  width: 282px;
  height: 270px;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  margin-left: 24px;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 168px;
`;

const Image = styled.div`
  height: 100%;
  background-size: cover;
  background-position: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  background-color: gray;
  height: 102px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bolder;
  margin-top: 14px;
  margin-left: 22px;
`;

const Period = styled.div`
  display: flex;
  font-size: 16px;
  color: lightgray;
  margin-top: 3px;
  margin-left: 22px;
`;

const StartDate = styled.div``;

const DueDate = styled.div``;
