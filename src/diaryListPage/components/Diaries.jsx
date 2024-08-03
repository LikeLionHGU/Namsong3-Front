import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import goPencil from "../../asset/Icon/goPencil.svg";
import CreateDiaryModal from "./CreateDiaryModal";
import DiaryViewDropdown from "./DiaryViewDropdown";
import getDiaryList from "../../apis/getDiaryList";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../atom/atom";
import { useLocation, useNavigate } from "react-router-dom";

function Diaries() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState("최신순");
  const [goalList, setGoalList] = useState({ journals: [] });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const goalId = queryParams.get("id");
  const csrfToken = useRecoilValue(tokenState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoalList = async () => {
      try {
        const fetchedGoalList = await getDiaryList(goalId, csrfToken);
        setGoalList(fetchedGoalList);
      } catch (error) {
        console.error("Error fetching goal List:", error);
      }
    };
    fetchGoalList();
  }, [goalId, csrfToken]);

  const openCreateDiaryModal = () => {
    setIsModalOpen(true);
  };

  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split(".").map(Number);
    return new Date(year + 2000, month - 1, day); // assuming the year is in 2000s
  };

  const getFilteredDiaries = () => {
    let diaries = goalList.journals;

    if (currentSort === "최신순") {
      diaries = diaries.sort((a, b) => formatDate(b.createdDate) - formatDate(a.createdDate));
    } else if (currentSort === "오래된 순") {
      diaries = diaries.sort((a, b) => formatDate(a.createdDate) - formatDate(b.createdDate));
    }

    return diaries;
  };

  const filteredDiaries = getFilteredDiaries();

  return (
    <ListPart>
      <Searchbar>
        <SearchIcon />
        <input className="search-bar" placeholder="제목+내용을 입력해보세요."></input>
      </Searchbar>
      <DairyListBox>
        <div className="diary-list-head">
          <div onClick={openCreateDiaryModal} className="diary-add">
            일지 추가하기 <img src={goPencil} alt="" />
          </div>
          <DiaryViewDropdown currentSort={currentSort} setCurrentSort={setCurrentSort} />
        </div>
        <DiaryList>
          {filteredDiaries.map((diaries, index) => (
            <Diary
              key={index}
              onClick={() => {
                navigate(`/detail/${diaries.journalId}`);
              }}
            >
              <div className="diary-title-date">
                <div className="diary-title">{diaries.title}</div>
                <div className="diary-date">
                  <div className="diary-end-date">{diaries.createdDate}</div>
                </div>
              </div>
              {diaries.thumbnail ? ( // 이미지url이 있는지 없는지 판별, 있으면 Image 컴포넌트 보여주고 없으면 안넣음
                <Image style={{ backgroundImage: `url(${diaries.thumbnail})` }} />
              ) : null}
            </Diary>
          ))}
        </DiaryList>
      </DairyListBox>
      {isModalOpen && <CreateDiaryModal setIsModalOpen={setIsModalOpen} goalId={goalId} />}
    </ListPart>
  );
}

export default Diaries;

const ListPart = styled.div`
  display: flex;
  flex-direction: column;
  width: 470px;
`;

const Searchbar = styled.div`
  display: flex;
  align-items: center;
  /* border: 1px solid lightgray; */
  margin-bottom: 12px;
  border-radius: 8px;
  height: 50px;
  background-color: #f5f5f5;
  /* width: 100%; */
  padding-left: 22px;
  > svg {
    font-size: 20px;
    color: gray;
  }
  .search-bar {
    // 진짜로 입력받을 필드 부분
    margin-left: 5px;
    width: 92%;
    height: 90%;
    outline: none;
    border: none;
    background-color: #f5f5f5;
    /* border: 1px solid lightgray; */
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
    align-items: center;
    margin-top: 12px;
    font-weight: bold;
    /* border: 2px solid red; */
    /* margin-bottom: 10px; */
    .diary-add {
      display: flex;
      align-self: end;
      cursor: pointer;
      /* color: #4c9e5e; */
      border-bottom: 1.5px solid transparent;
      background: linear-gradient(to right, #586eff, #bea0e6) border-box;
      border-image: linear-gradient(to right, #586eff 0%, #bea0e6 100%);
      border-image-slice: 1;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 14px;
      font-weight: lighter;
      > img {
        /* border: 2px solid red; */
        margin-left: 4px;
        margin-right: 2px;
        margin-bottom: 5px;
      }
    }
    .diary-dropdown {
      /* cursor: pointer; */
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid lightgray;
      width: 120px;
      height: 32px;

      /* padding: 4px 8px; */
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
  margin-top: 8px;
  height: 530px;
  width: 500px;
  flex-direction: column;
  /* border: 2px solid blue; */
  overflow: auto;
`;

const Diary = styled.div`
  // 각 일지 (이미지 없으면 작아짐)
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 466px;
  margin-bottom: 8px;
  border-radius: 12px;
  border: 1px solid #e2e2e2;
  align-items: center;
  /* border: 1px solid lightgray; */
  background-color: white;
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
  width: 157px;
  height: 92px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  background-size: cover;
  background-position: center;
`;
