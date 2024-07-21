import React from "react";
import styled from "styled-components";
import Diaries from "./Diaries";
import GoalCard from "./GoalCard";

function DiaryListBody() {
  return (
    <Container>
      <CenterBox>
        <ContentWrapper>
          {/* ContentWrapper는 나중에 삭제해도 될지도...  */}
          <SidePart>
            <GoalCardBox>
              {/* GoalCardBox: 목표 카드(왼쪽 상단부분위치) */}
              <GoalCard />
            </GoalCardBox>
            <CalendarCard>
              달력 들어갈 부분
              {/* CalendarCard: 달력 들어갈 부분 */}
            </CalendarCard>
          </SidePart>
          <ListPart>
            <Diaries />
            {/* <Searchbar
              placeholder="제목+내용을 입력해보세요.
              "
            ></Searchbar>
            <DairyListBox>
              <div className="diary-list-head">
                <div className="diary-add">일지 추가하기</div>
                <div className="diary-dropdown">드롭다운</div>
              </div>
              <DiaryList>
                <Diaries />
              </DiaryList>
            </DairyListBox> */}
          </ListPart>
        </ContentWrapper>
      </CenterBox>
    </Container>
  );
}

export default DiaryListBody;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%; // !! 나중에 변경해야할 부분.
  height: 100%;
  /* border: 2px solid red; */
`;
const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  width: 60%; //
  /* border: 2px solid black; */
`;
const ContentWrapper = styled.div`
  // 필요없으면 나중에 삭제해도 될지도...
  display: flex;
  border: 2px solid gray;
  width: 100%;
`;

const SidePart = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 2px solid blue; */
  width: 40%;
`;
const GoalCardBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: start; // 이거 지우면 목표 카드가 위아래 중앙으로 오게됨
  /* height: 320px; */
  /* border: 2px solid gold; */
`;
const CalendarCard = styled.div`
  display: flex;
  height: 300px;
  justify-content: center;
  align-items: center;
  border: 2px solid red;
`;
const ListPart = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 2px solid cyan; */
  width: 60%;
`;
