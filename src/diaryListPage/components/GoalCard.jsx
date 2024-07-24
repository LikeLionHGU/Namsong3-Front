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
  width: 20px;
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
    padding-left: 4px;
    padding-right: 4px;
    margin-right: 8px;
    height: 26px;
    color: #4c9e5e;
    background-color: #dbecdf;
    border-radius: 4px;
    /* border: 1px solid green; */
  }
`;
const Accomplished = styled.button`
  /* display: flex; */
  border: 2px solid black;
  border: none;
  height: 40px;
  width: 242px;
  margin-top: 8px;
  margin-bottom: 17px;
  border-radius: 8px;
  background-color: #4c9e5e;
  cursor: pointer;
  font-weight: bold;
  color: #ffffff;
  &:hover {
  }
`;
