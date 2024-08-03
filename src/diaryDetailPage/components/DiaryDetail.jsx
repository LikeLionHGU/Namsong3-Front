import React, { useState } from "react";
// import QuillEditor from "../../diaryWritePage/components/QuillEditor";

import styled from "styled-components";
import DeleteConfirmModal from "./DeleteConfirmModal";
import DiaryEditDropdown from "./DiaryEditDropdown";

function DiaryDetail({ diaryId }) {
  const [deleteModal, setDeleteModal] = useState(false);

  var goalId = 2;
  const dummyTitle = "아이디에이션";
  const dummyDate = "24.07.16";
  const dummyContent =
    "'중앙해커톤 우승'이라는 새로운 목표를 새롭게 만들었다. <p>테스트 테스트</p> <h1>html테스트</h1>";
  // 컨텐츠 내용 많아지면 스크롤로 내려서 확인할 수 있도록 만듦.

  return (
    <Wrapper>
      <BoxWrapper>
        <CenterBox>
          <DiaryHeader>
            <TitleDate>
              <DiaryTitle name="title">{dummyTitle}</DiaryTitle>
              <DiaryDate>{dummyDate}</DiaryDate>
            </TitleDate>
            <Dropdown>
              {/* 각 일지 수정 및 삭제 드롭다운 */}
              <DiaryEditDropdown
                setDeleteModal={setDeleteModal}
                // diaryId={diaryId} // 각 일지 아이디
              />
            </Dropdown>
          </DiaryHeader>
          <ContentArea>
            <Contents>
              {/* html 태그 적용된 일지 내용 보여주는 부분 */}
              <div dangerouslySetInnerHTML={{ __html: dummyContent }}></div>
            </Contents>
          </ContentArea>
        </CenterBox>

        {deleteModal && (
          <DeleteConfirmModal setDeleteModal={setDeleteModal} goalId={goalId} />
        )}
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