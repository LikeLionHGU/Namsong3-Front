import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import CreateGoalModal from "./CreateGoalModal/CreateGoalModal";
import CreateGoal from "../../../asset/Icon/CreateGoal.svg";
import GoalEditDropdown from "./goalEditDropdown/GoalEditDropdown";
import Taps from "../topMenu/Taps";
import { useNavigate } from "react-router-dom";
import GoalViewDropdown from "../topMenu/GoalViewDropdown";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DeleteGoalModal from "./goalEditDropdown/DeleteGoalModal";
import getGoalList from "../../../apis/getGoalList";
import { tokenState } from "../../../atom/atom";
import { useRecoilState } from "recoil";
import GoalDoesNotExistImg from "../../../asset/Icon/GoalDoesNotExist.svg";
import GoalDoesNotExistPink from "../../../asset/Icon/GoalDoesNotExistPink.svg";
import img1 from "../../../asset/Random/random1.svg";
import img2 from "../../../asset/Random/random2.svg";
import GoalCreatedModal from "./CreateGoalModal/GoalCreatedModal";
import GoalEditedModal from "./goalEditDropdown/GoalEditedModal";
import CompleteGoalModal from "../../../diaryListPage/components/CompleteGoalModal";
import CompleteConfirmModal from "../../../diaryListPage/components/CompleteConfirmModal";

import stamp1 from "../../../asset/Random/stamp1.svg";
import stamp2 from "../../../asset/Random/stamp2.svg";
import stamp3 from "../../../asset/Random/stamp3.svg";

const backgroundArr = [img1, img2];
const complete_stamps = [stamp1, stamp2, stamp3];

function Goals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGoalCreatedModalOpen, setIsGoalCreatedModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isGoalEditedModalOpen, setIsGoalEditedModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isCompModalOpen, setIsCompModalOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState("도전 중");
  const [currentSort, setCurrentSort] = useState("최신순");
  const [goalList, setGoalList] = useState({ goals: [] });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const [csrfToken, setCsrfToken] = useRecoilState(tokenState);

  const [isUpdate, setIsUpdate] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  const [isExpiredBox, setIsExpiredBox] = useState(false);
  const [expiredData, setExpiredData] = useState(null);

  // useEffect(()=>{
  // const randomStampIndex = Math.floor(
  //   Math.random() * complete_stamps.length
  // );
  // const completeStamps = complete_stamps[randomStampIndex];
  // })

  useEffect(() => {
    if (!csrfToken) return;
    const fetchGoalList = async () => {
      try {
        const fetchedGoalList = await getGoalList(csrfToken);
        setGoalList(fetchedGoalList);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          setCsrfToken(null);
          navigate("/");
        } else {
          console.error("Error fetching goal list", error);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchGoalList();
  }, [csrfToken, navigate, setCsrfToken]);

  const openCreateGoalsModal = () => {
    setExpiredData(undefined);
    setIsModalOpen(true);
  };

  const handleClickGoal = (goalId) => {
    navigate(`/diarylist`, { state: { goalId } });
  };

  const today = new Date();

  const isExpired = (endDate) => {
    if (!endDate) return false;
    let [year, month, day] = endDate.split(".").map(Number);
    year += year < 50 ? 2000 : 1900;
    const goalDate = new Date(year, month - 1, day);
    return goalDate < today;
  };

  const getDaysLeft = (endDate) => {
    if (!endDate) return null;
    let [year, month, day] = endDate.split(".").map(Number);
    year += year < 50 ? 2000 : 1900;
    const goalDate = new Date(year, month - 1, day);
    const diffTime = goalDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getFilteredGoals = () => {
    let goals = goalList.goals || [];

    if (currentTab === "도전 중") {
      goals = goals.filter((goal) => goal.status === "OPEN");
    } else if (currentTab === "완료한 도전") {
      goals = goals.filter((goal) => goal.status === "CLOSED");
    }

    if (currentSort === "오름차순") {
      goals = goals.sort((a, b) => a.title.localeCompare(b.title));
    } else if (currentSort === "내림차순") {
      goals = goals.sort((a, b) => b.title.localeCompare(a.title));
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
        {!isLoading && filteredGoals.length === 0 && currentTab !== "완료한 도전" && (
          <GoalDoesNotExist>
            <img src={GoalDoesNotExistImg} alt="" style={{ marginTop: "59px", width: "40px", height: "41px" }} />
            <div
              style={{
                color: "#676767",
                fontWeight: "bold",
                fontSize: "18px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "16px",
              }}
            >
              <div>첫 걸음을 내딛는 순간</div>
              <div style={{ marginTop: "5px" }}>성장이 시작됩니다!</div>
            </div>
            <div
              style={{
                color: "#AEAEAE",
                fontSize: "14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <div>하고 싶은 일을 적어볼까요? </div>{" "}
              <div style={{ marginTop: "5px" }}>작은 목표부터 큰 목표까지 모두 좋아요!</div>
            </div>
          </GoalDoesNotExist>
        )}
        {!isLoading && filteredGoals.length === 0 && currentTab === "완료한 도전" && (
          <GoalDoesNotExist>
            <img src={GoalDoesNotExistPink} alt="" style={{ marginTop: "59px", width: "40px", height: "41px" }} />
            <div
              style={{
                color: "#676767",
                fontWeight: "bold",
                fontSize: "18px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "16px",
              }}
            >
              <div>작은 목표부터 시작해서</div>
              <div style={{ marginTop: "5px" }}>하나씩 채워나가봐요!</div>
            </div>
            <div
              style={{
                color: "#AEAEAE",
                fontSize: "14px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <div>곧 이곳이 당신의 성취로</div> <div style={{ marginTop: "5px" }}>가득 찰 거예요!</div>
            </div>
          </GoalDoesNotExist>
        )}
        <TransitionGroup component={null}>
          {filteredGoals.map((goal) => {
            const randomIndex = Math.floor(Math.random() * backgroundArr.length);
            const backgroundImg = backgroundArr[randomIndex];
            const daysLeft = getDaysLeft(goal.endDate);
            const expired = isExpired(goal.endDate);
            const randomStampIndex = Math.floor(Math.random() * complete_stamps.length);
            const completeStamps = complete_stamps[randomStampIndex];
            return (
              <CSSTransition key={goal.id} timeout={500} classNames="goal">
                <GoalWrapper
                  onClick={() => {
                    if (expired && goal?.status !== "CLOSED") {
                      // op
                      setIsExpiredBox(true);
                      setIsConfirmModalOpen(true);
                      setExpiredData(goal);
                    } else {
                      handleClickGoal(goal.goalId);
                    }
                  }}
                >
                  {goal?.status === "CLOSED" ? (
                    <>
                      <CompleteStamp>
                        <img src={completeStamps} alt="" />
                        {/* // style={{
                        //   backgroundImage: `url(${completeStamps})`,
                        // }} */}
                      </CompleteStamp>
                      <ImageContainer>
                        {goal.thumbnail ? (
                          <Image
                            style={{
                              backgroundImage: `url(${goal.thumbnail})`,
                              filter: "brightness(0.5) saturate(0%)",
                            }}
                          />
                        ) : (
                          <Image
                            style={{
                              backgroundImage: `url(${backgroundImg})`,
                              filter: "saturate(0%)",
                            }}
                          />
                        )}
                        <GoalEditDropdown
                          setIsDeleteModalOpen={setIsDeleteModalOpen}
                          setIsUpdate={setIsUpdate}
                          setIsModalOpen={setIsModalOpen}
                          goal={goal}
                          onEdit={setUpdateData}
                        />
                      </ImageContainer>
                    </>
                  ) : (
                    <ImageContainer>
                      {goal.thumbnail ? (
                        <Image
                          style={{
                            backgroundImage: `url(${goal.thumbnail})`,
                          }}
                        />
                      ) : (
                        <Image style={{ backgroundImage: `url(${backgroundImg})` }} />
                      )}
                      <GoalEditDropdown
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        setIsUpdate={setIsUpdate}
                        setIsModalOpen={setIsModalOpen}
                        goal={goal}
                        onEdit={setUpdateData}
                      />
                    </ImageContainer>
                  )}

                  <Info>
                    <InfoContainer>
                      {daysLeft !== null && daysLeft <= 5 && daysLeft > 0 && goal?.status === "OPEN" && (
                        <DeadlineComing>
                          <span>D-{daysLeft}</span>
                        </DeadlineComing>
                      )}
                      {expired && goal?.status === "OPEN" && (
                        <ExpirationText>
                          <span>기한이 지났어요!</span>
                        </ExpirationText>
                      )}
                      {daysLeft === null || daysLeft > 5 ? !expired && <div style={{ marginTop: "4px" }} /> : null}
                      <TitleFireContainer>
                        <Title isOpen={goal?.status === "OPEN"}>{goal.title}</Title>
                        {goal.streak >= 3 && (
                          <FireContainer>
                            <Fire>
                              {goal.streak}🔥
                              {goal.streak >= 10 && <span>🔥</span>}
                            </Fire>
                            <Tooltip>연속{goal.streak}일 작성</Tooltip>
                          </FireContainer>
                        )}
                      </TitleFireContainer>
                      {(goal.startDate || goal.endDate) && (
                        <Period isOpen={goal?.status === "OPEN"}>
                          {goal.startDate && <StartDate>{goal.startDate}</StartDate>}
                          {goal.startDate && goal.endDate && <span> → </span>}
                          {goal.endDate && <DueDate>{goal.endDate}</DueDate>}
                        </Period>
                      )}
                    </InfoContainer>
                  </Info>
                </GoalWrapper>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </GoalContainer>
      {isModalOpen && (
        <CreateGoalModal
          setIsModalOpen={setIsModalOpen}
          setIsGoalCreatedModalOpen={setIsGoalCreatedModalOpen}
          updateData={updateData}
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          setIsGoalEditedModalOpen={setIsGoalEditedModalOpen}
          expiredData={expiredData}
          setExpiredData={setExpiredData}
        />
      )}
      {isGoalCreatedModalOpen && (
        <GoalCreatedModal
          setIsGoalCreatedModalOpen={setIsGoalCreatedModalOpen}
          isUpdate={isUpdate}
          updateData={updateData}
        />
      )}
      {isDeleteModalOpen && <DeleteGoalModal setIsDeleteModalOpen={setIsDeleteModalOpen} goalId={updateData.goalId} />}
      {isGoalEditedModalOpen && <GoalEditedModal />}
      {isConfirmModalOpen && (
        <CompleteConfirmModal
          expiredData={expiredData}
          setIsConfirmModalOpen={setIsConfirmModalOpen}
          csrfToken={csrfToken}
          setIsCompModalOpen={setIsCompModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {isCompModalOpen && <CompleteGoalModal setIsCompModalOpen={setIsCompModalOpen} isExpiredBox={isExpiredBox} />}
    </Container>
  );
}

export default Goals;

const CompleteStamp = styled.div`
  display: flex;
  position: absolute;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  border-radius: 12px;
  > img {
    position: absolute;
    top: 25%;
    left: 25%;
    width: 100%;
    height: 100%;
    width: 141px;
    height: 135px;
  }
  /* border: 4px solid blue; */

  /* background-size: 100px 100px; */
`;

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
  cursor: pointer;
`;

const GoalDoesNotExist = styled.div`
  width: 282px;
  height: 270px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px;
  border: 1px solid #aeaeae;
  border-style: dashed;
  margin-top: 20px;
`;

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

const GoalWrapper = styled.div`
  width: 282px;
  height: 270px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-right: 12px;
  margin-left: 12px;
  /* border: 2px solid red; */
  cursor: pointer;
  animation: ${enterAnimation} 0.5s forwards;

  &.goal-enter {
    animation: ${enterAnimation} 0.5s forwards;
  }

  &.goal-exit {
    animation: ${exitAnimation} 0.5s forwards;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  /* position: absolute; */
  height: 168px;
`;

const Image = styled.div`
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 12px 12px 0 0;
`;

const ExpirationText = styled.div`
  padding: 4px 6px;
  width: fit-content;
  border: 1.5px solid transparent;
  background: linear-gradient(to right, #f0efec, #f0efec) padding-box,
    linear-gradient(to right, #586eff, #bea0e6) border-box;
  border-radius: 4px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  span {
    font-size: 12px;
    font-weight: bold;
    background-image: linear-gradient(to right, #586eff, #bea0e6);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
`;

const Info = styled.div`
  background-color: #f0efec;
  height: 102px;
  border-radius: 0 0 12px 12px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 20px;
`;

const DeadlineComing = styled.div`
  padding: 4px 6px;
  width: fit-content;
  border: 1.5px solid transparent;
  background: linear-gradient(to right, #f0efec, #f0efec) padding-box,
    linear-gradient(to right, #586eff, #bea0e6) border-box;
  border-radius: 4px;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  span {
    font-size: 12px;
    font-weight: bold;
    background-image: linear-gradient(to right, #586eff, #bea0e6);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
`;

const TitleFireContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 242px;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: bolder;
  margin-bottom: 3px;
  color: ${(props) => (props.isOpen ? "black" : "lightgray")};
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

const Fire = styled.div`
  font-size: 20px;
  display: flex;
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
  /* color: #afafaf; */
  color: ${(props) => (props.isOpen ? "#9a9a9a" : "#afafaf")};
`;

const StartDate = styled.div`
  margin-right: 3px;
`;

const DueDate = styled.div`
  margin-left: 3px;
`;
