import React, { useEffect, useState } from "react";
// import QuillEditor from "../../diaryWritePage/components/QuillEditor";

import styled from "styled-components";
import DeleteConfirmModal from "./DeleteConfirmModal";
import DiaryEditDropdown from "./DiaryEditDropdown";
import getDiaryDetail from "../../apis/getDiaryDetail";
import { useLocation, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../atom/atom";

function DiaryDetail() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [diaryDetail, setDiaryDetail] = useState([]);
  const location = useLocation();
  const { goalId } = location.state;
  const { diaries } = location.state;
  const diaryId = diaries.journalId;
  console.log("id is : ", goalId, diaries);
  const csrfToken = useRecoilValue(tokenState);

  // 컨텐츠 내용 많아지면 스크롤로 내려서 확인할 수 있도록 만듦.

  useEffect(() => {
    const fetchGoalList = async () => {
      try {
        const fetchedDiary = await getDiaryDetail(diaryId, csrfToken);
        setDiaryDetail(fetchedDiary);
      } catch (error) {
        console.error("Error fetching diary detail:", error);
      }
    };
    fetchGoalList();
  }, [diaryId, csrfToken]);

  return (
    <Wrapper>
      <BoxWrapper>
        <CenterBox>
          <DiaryHeader>
            <TitleDate>
              <DiaryTitle name="title">{diaryDetail.title}</DiaryTitle>
              <DiaryDate>{diaryDetail.createdDate}</DiaryDate>
            </TitleDate>
            <Dropdown>
              {/* 각 일지 수정 및 삭제 드롭다운 */}
              <DiaryEditDropdown
                setDeleteModal={setDeleteModal}
                diaryDetail={diaryDetail}
                goalId={goalId}
                // diaryId={diaryId} // 각 일지 아이디
              />
            </Dropdown>
          </DiaryHeader>
          <ContentArea>
            <Contents>
              {/* html 태그 적용된 일지 내용 보여주는 부분 */}
              <div dangerouslySetInnerHTML={{ __html: diaryDetail.content }}></div>
            </Contents>
          </ContentArea>
        </CenterBox>

        {deleteModal && <DeleteConfirmModal setDeleteModal={setDeleteModal} goalId={goalId} journalId={diaryId} />}
      </BoxWrapper>
    </Wrapper>
  );
}

export default DiaryDetail;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: default;
  /* border: 2px solid red; */
`;
const BoxWrapper = styled.div`
  display: flex;
  /* justify-content: center; */
  flex-direction: column;
  /* border: 2px solid red; */
`;
const CenterBox = styled.div`
  display: flex;
  /* display: center; */
  margin-top: 32px;
  flex-direction: column;
  justify-content: space-around;
  width: 792px;
  height: 707px;
  border-radius: 12px;
  background-color: #eef1ff;
  /* border: 2px solid orange; */
  padding: 8px 24px;
`;
const TitleDate = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
`;

const DiaryHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  /* border: 2px solid gold; */
  padding-left: 10px;
  border-bottom: 1.5px solid #dfdfdf;
`;
const DiaryTitle = styled.div`
  display: flex;
  height: 90%;
  /* width: 100%; */
  padding-bottom: 4px;
  font-size: 18px;
  /* border: 2px solid blue; */
`;
const DiaryDate = styled.div`
  display: flex;
  margin-bottom: 10px;
  color: #aeaeae;
  font-size: 14px;
`;

const Dropdown = styled.div`
  display: flex;
  /* width: 10px; */
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  height: 25px;
  width: 20px;
  /* border: 2px solid red; */
  cursor: pointer;
`;

const ContentArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  /* border: 2px solid green; */
`;
const Contents = styled.div`
  display: flex;
  /* height: 520px; */
  height: 590px;
  width: 100%;
  padding: 10px;
  overflow-y: auto;
  /* border: 2px solid red; */
`;
