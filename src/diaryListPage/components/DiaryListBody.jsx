import React from "react";

import styled from "styled-components";
import dummy from "../../db/data.json";
function DiaryListBody() {
  return (
    <Container>
      <CenterBox>
        <ContentWrapper>
          {" "}
          {/* 필요없으면 나중에 삭제해도 될지도...  */}
          <SidePart>
            <GoalCard></GoalCard>
            <CalendarCard></CalendarCard>
          </SidePart>
          <ListPart>
            <Searchbar></Searchbar>
            <DairyListBox>
              <div className="diary-list-head">
                <div className="diary-add">일지 추가하기</div>
                <div className="diary-dropdown">드롭다운</div>
              </div>
              <DiaryList>
                {dummy.goals.map((goal, index) => (
                  <Diary key={index}>
                    <div className="diary-title-date">
                      <div className="diary-title">{goal.title}</div>
                      <div className="diary-date">
                        {/* <div className="diary-start-date">
                          {goal.startDate} ~{" "}
                        </div> */}
                        <div className="diary-end-date">{goal.dueDate}</div>
                      </div>
                    </div>
                    {goal.imgUrl ? (
                      <Image
                        style={{ backgroundImage: `url(${goal.imgUrl})` }}
                      />
                    ) : (
                      <></>
                    )}
                  </Diary>
                ))}
              </DiaryList>
            </DairyListBox>
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
  border: 2px solid red;
`;
const CenterBox = styled.div`
  display: flex;
  justify-content: center;
  width: 60%; //
  border: 2px solid black;
`;
const ContentWrapper = styled.div`
  // 필요없으면 나중에 삭제해도 될지도...
  display: flex;
  border: 2px solid purple;
  width: 100%;
`;

const SidePart = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid blue;
  width: 40%;
`;
const GoalCard = styled.div`
  display: flex;
  height: 320px;
  border: 2px solid gold;
`;
const CalendarCard = styled.div`
  display: flex;
  height: 300px;
  border: 2px solid red;
`;
const ListPart = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid cyan;
  width: 60%;
`;
const Searchbar = styled.div`
  display: flex;
  border: 2px solid red;
  margin: 10px;
  height: 40px;
`;
const DairyListBox = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 2px solid lime; */
  height: 100%;

  .diary-list-head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .diary-add {
      cursor: pointer;
      border: 2px solid red;
    }
    .diary-dropdown {
      border: 2px solid red;
    }
  }
`;

const DiaryList = styled.div`
  display: flex;
  height: 530px;
  flex-direction: column;
  border: 2px solid blue;
  overflow: auto;
`;
const Diary = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
  border: 1px solid lightgray;
  background-color: lightgray;
  .diary-title-date {
    display: flex;
    /* border: 2px solid red; */
    flex-direction: column;
    padding-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 15px;
    .diary-title {
      /* border: 2px solid black; */
      font-weight: bold;
    }
    .diary-date {
      .diary-end-date {
        color: gray;
        margin-top: 5px;
        font-size: 13px;
        /* border: 2px solid purple; */
      }
    }
  }
`;
const Image = styled.div`
  /* border: 2px solid red; */
  display: flex;
  height: 100px;
  width: 130px;
  background-size: cover;
  background-position: center;
`;
