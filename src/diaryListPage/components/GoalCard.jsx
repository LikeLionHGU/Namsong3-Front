import React from "react";
import styled from "styled-components";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
function GoalCard() {
  return (
    <Container>
      <Wrapper>
        <Image
          style={{ backgroundImage: `url(https://ifh.cc/g/ZzgWw6.jpg)` }}
        />
        <Info>
          <Title>중앙해커톤 우승</Title>
          <Period>
            <StartDate>2024.07.17 </StartDate>
            <ArrowForwardIcon />
            <DueDate>2024.08.07</DueDate>
          </Period>
          <div className="accomplish-btn">
            <Accomplished>목표 달성!</Accomplished>
          </div>
        </Info>
        <ExtrtaInfo>
          <div className="info-day-count">12일째</div>
          <div className="info-diary-count">작성한 일지 3개</div>
        </ExtrtaInfo>
      </Wrapper>
    </Container>
  );
}

export default GoalCard;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-wrap: wrap; */
  /* padding-left: 15px;
  padding-right: 15px; */
`;

const Wrapper = styled.div`
  display: flex;
  width: 250px;
  /* height: 100%; */
  flex-direction: column;
  /* border: 2px solid red; */
`;

const Image = styled.div`
  display: flex;
  height: 150px;
  background-size: cover;
  background-position: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #a7a7a7;
  .accomplish-btn {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
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

  align-items: center; // "yyyy.mm.dd", "->", "yyyy.mm.dd" 내용 모두 정렬
  font-size: 15px;
  > svg {
    display: flex;
    font-size: 15px;
  }
`;

const StartDate = styled.div``;

const DueDate = styled.div``;

const Accomplished = styled.button`
  /* outline: none; */
  border: 2px solid gray;
  height: 35px;
  width: 70%;
  /* background-color: lightgray; */
  cursor: pointer;
  &:hover {
    background-color: #d8d8d8;
    /* border: 2px solid lightgray; */
    /* color: white; */
  }
`;

const ExtrtaInfo = styled.div`
  display: flex;
  padding: 10px;
  padding-left: 15px;
  flex-direction: column;
  background-color: #a7a7a7;
`;
