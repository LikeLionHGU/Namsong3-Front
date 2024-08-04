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
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const goalId = queryParams.get("id");
  const csrfToken = useRecoilValue(tokenState);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoalList = async () => {
      setIsLoading(true);
      try {
        const fetchedGoalList = await getDiaryList(goalId, csrfToken);
        setGoalList(fetchedGoalList);
      } catch (error) {
        console.error("Error fetching goal List:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGoalList();
  }, [goalId, csrfToken]);

  const openCreateDiaryModal = () => {
    setIsModalOpen(true);
  };

  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split(".").map(Number);
    return new Date(year + 2000, month - 1, day);
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
          {!isLoading && filteredDiaries.length === 0 && (
            <DiaryDoesNotExist>📝 일지 작성으로 목표에 한걸음 더! 📝</DiaryDoesNotExist>
          )}
          {filteredDiaries.map((diaries, index) => (
            <Diary
              key={index}
              onClick={() => {
                navigate(`${goalId}/detail/${diaries.journalId}`);
                // navigate(`?id=${goalId}/detail/${diaries.journalId}`);
                // navigate(`/detail/${diaries.journalId}`);
                // navigate(`/diarylist?id=${goalId}/detail/${diaries.journalId}`);
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
  margin-bottom: 12px;
  border-radius: 8px;
  height: 50px;
  background-color: #f5f5f5;
  padding-left: 22px;
  > svg {
    font-size: 20px;
    color: gray;
  }
  .search-bar {
    margin-left: 5px;
    width: 92%;
    height: 90%;
    outline: none;
    border: none;
    background-color: #f5f5f5;
  }
`;
const DairyListBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .diary-list-head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    font-weight: bold;

    .diary-add {
      display: flex;
      align-self: end;
      cursor: pointer;
      border-bottom: 1.5px solid transparent;
      background: linear-gradient(to right, #586eff, #bea0e6) border-box;
      border-image: linear-gradient(to right, #586eff 0%, #bea0e6 100%);
      border-image-slice: 1;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 14px;
      font-weight: lighter;
      > img {
        margin-left: 4px;
        margin-right: 2px;
        margin-bottom: 5px;
      }
    }
    .diary-dropdown {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid lightgray;
      width: 120px;
      height: 32px;
    }
  }
`;

const DiaryList = styled.div`
  display: flex;
  margin-top: 8px;
  height: 530px;
  width: 500px;
  flex-direction: column;
  overflow: auto;
`;

const Diary = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 466px;
  margin-bottom: 8px;
  border-radius: 12px;
  border: 1px solid #e2e2e2;
  align-items: center;
  background-color: white;
  cursor: pointer;
  .diary-title-date {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 15px;
    .diary-title {
      font-weight: bold;
    }
    .diary-date {
      .diary-end-date {
        color: gray;
        margin-top: 5px;
        font-size: 13px;
      }
    }
  }
`;
const Image = styled.div`
  display: flex;
  width: 157px;
  height: 92px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  background-size: cover;
  background-position: center;
`;

const DiaryDoesNotExist = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 466px;
  height: 592px;
  border: 1px solid #aeaeae;
  border-radius: 12px;
  border-style: dashed;
  color: #676767;
  font-size: 14px;
  font-weight: bold;
`;
