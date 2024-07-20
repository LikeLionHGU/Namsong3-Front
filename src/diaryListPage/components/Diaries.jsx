import React from "react";
import styled from "styled-components";
import dummy from "../../db/data.json";
import SearchIcon from "@mui/icons-material/Search";
function Diaries() {
  // 일지 검색 + 일지 추가 + 일지 리스트 부분

  //TODO: 일지 검색
  //TODO: 일지 필터링(드롭다운, 최신순 오래된순)
  //TODO: 일지 추가
  //TODO: 일지 내용 보기

  return (
    <ListPart>
      <Searchbar>
        <SearchIcon />
        <input
          className="search-bar"
          placeholder="제목+내용을 입력해보세요."
        ></input>
      </Searchbar>
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
                  <div className="diary-end-date">{goal.dueDate}</div>
                </div>
              </div>
              {goal.imgUrl ? ( // 이미지url이 있는지 없는지 판별, 있으면 Image 컴포넌트 보여주고 없으면 안넣음
                <Image style={{ backgroundImage: `url(${goal.imgUrl})` }} />
              ) : null}
            </Diary>
          ))}
        </DiaryList>
      </DairyListBox>
    </ListPart>
  );
}

export default Diaries;
const ListPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Searchbar = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid lightgray;
  margin: 10px;
  height: 40px;
  /* width: 100%; */
  padding-left: 10px;
  > svg {
    font-size: 20px;
    color: gray;
  }
  .search-bar {
    margin-left: 5px;
    width: 100%;
    height: 95%;
    outline: none;
    border: none;
  }
`;
const DairyListBox = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 2px solid lime; */
  height: 100%;

  .diary-list-head {
    // 일지추가하기, 필터링 드롭다운 부분
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 10px;
    .diary-add,
    .diary-dropdown {
      cursor: pointer;
      border: 2px solid lightgray;

      padding: 4px 8px;
    }
    /* .diary-dropdown {
      border: 2px solid red;
      border-radius: 5px;
      padding: 2px 3px;
    } */
  }
`;

const DiaryList = styled.div`
  // 일지 목록 (스크롤되는 부분)
  display: flex;
  height: 530px;
  flex-direction: column;
  /* border: 2px solid blue; */
  overflow: auto;
`;

const Diary = styled.div`
  // 각 일지 (이미지 없으면 작아짐)
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
  border: 1px solid lightgray;
  background-color: lightgray;
  cursor: pointer;
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
