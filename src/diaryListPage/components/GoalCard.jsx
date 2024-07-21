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
            <StartDate>24.07.17 </StartDate>
            <ArrowForwardIcon />
            <DueDate>24.08.07</DueDate>
          </Period>
          <Line />
          <ExtrtaInfo>
            <div className="info-day-count">12일째 목표 진행 중! </div>
            <div className="info-diary-count">작성한 일지 3개</div>
          </ExtrtaInfo>
          <div className="accomplish-btn">
            <Accomplished>목표 달성!</Accomplished>
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
  width: 250px;
  height: 100%;
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
  padding-left: 20px;

  background-color: #d9d9d9;
`;

const Title = styled.div`
  font-size: 17px;
  font-weight: bolder;
  margin-top: 14px;
  /* margin-left: 20px; */
`;

const Period = styled.div`
  display: flex;
  font-size: 13px;
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
  width: 20px;
  height: 2px;
  padding-top: 10px;
  border-bottom: 1px solid #b5b5b5;
`;
const ExtrtaInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  /* padding-left: 20px; */
  font-size: 12px;
  color: gray;
  .info-day-count,
  .info-diary-count {
    margin-bottom: 5px;
  }
`;
const Accomplished = styled.button`
  /* display: flex; */
  /* border: 2px solid gray; */
  border: none;
  height: 35px;
  width: 90%;
  margin-top: 10px;
  margin-bottom: 10px;
  background-color: #b4b4b4;
  cursor: pointer;
  font-weight: bold;
  color: #606060;
  &:hover {
  }
`;
