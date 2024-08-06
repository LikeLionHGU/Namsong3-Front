import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QuillEditor from "./QuillEditor";
import { useLocation } from "react-router-dom";
import ThumbnailModal from "./ThumbnailModal";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../atom/atom";
import DiaryEditModal from "./DiaryEditModal";
import Header from "../../common/Header";
import Footer from "../../common/Footer";

function UpdateDiary() {
  const csrfToken = useRecoilValue(tokenState);
  const location = useLocation();
  const { diaryDetail, goalId } = location.state;
  const [editedModal, setEditedModal] = useState(false); //일지가 추가되었다는 걸 알려주는 모달
  // const [postedModal, setPostedModal] = useState(false); //일지가 추가되었다는 걸 알려주는 모달
  const [formData, setFormData] = useState({
    title: diaryDetail.title,
    content: diaryDetail.content,
  });
  const [thumbnailModal, setThumbnailModal] = useState(false); // 썸네일 사진 추가하는 모달
  const [isTitleEmpty, setIsTitleEmpty] = useState(false); // State to track empty title

  const openThumbnailModal = () => {
    // setThumbnailModal(true);
    if (formData.title.trim() === "") {
      setIsTitleEmpty(true); // Set the validation state to true if title is empty
      alert("제목을 입력해 주세요!"); // Show alert message
    } else {
      setIsTitleEmpty(false); // Reset the validation state if title is not empty
      setThumbnailModal(true);
    }
  };

  useEffect(() => {}, [diaryDetail]);

  const journalId = diaryDetail.journalId;
  const thumbnail = diaryDetail.thumbnail;

  return (
    <>
      <Header />
      <Wrapper>
        <BoxWrapper>
          <CenterBox>
            <DiaryHeader>
              <DiaryTitle
                placeholder="오늘의 일지를 잘 표현할 수 있는 제목을 작성해주세요 (최대 10자)"
                name="title"
                value={formData.title}
                onChange={(e) => {
                  setFormData((formData) => ({
                    ...formData,
                    title: e.target.value,
                  }));
                  setIsTitleEmpty(false);
                }}
                style={{
                  borderColor: isTitleEmpty ? "red" : "#ccc", // Apply red border if validation fails, default to gray
                }}
              >
                {/* */}
              </DiaryTitle>
            </DiaryHeader>
            <EditorArea>
              <QuillEditor
                mainText={diaryDetail.content}
                onChange={(content) =>
                  setFormData((formData) => ({
                    ...formData,
                    content: content,
                  }))
                }
              />
            </EditorArea>
            <SaveButton>
              <button className="save-button" onClick={openThumbnailModal}>
                수정 완료하기
              </button>
            </SaveButton>
          </CenterBox>
          {thumbnailModal && (
            <ThumbnailModal
              setThumbnailModal={setThumbnailModal}
              setEditedModal={setEditedModal}
              formData={formData}
              diaryDetail={diaryDetail}
              csrfToken={csrfToken}
              journalId={journalId}
              thumbnail={thumbnail}
            />
          )}
          {!thumbnailModal && editedModal && <DiaryEditModal setEditedModal={setEditedModal} goalId={goalId} />}
        </BoxWrapper>
      </Wrapper>
      <Footer />
    </>
  );
}

export default UpdateDiary;

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

const DiaryHeader = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  /* border: 2px solid gold; */
`;
const DiaryTitle = styled.input`
  display: flex;
  height: 90%;
  width: 100%;
  padding-left: 20px;
  outline: none;
  border: none;
  /* border: 2px solid blue; */
  font-size: 18px;
  background-color: #eef1ff;
  border-bottom: 1.5px solid #dfdfdf;
`;

const EditorArea = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  /* border: 2px solid green; */
`;
const SaveButton = styled.div`
  display: flex;
  width: 100%;

  /* height: 100%; */
  /* border: 2px solid purple; */
  justify-content: end;
  .save-button {
    width: 153px;
    height: 36px;
    border-radius: 6px;
    outline: none;
    border: none;
    background-color: #798bff;
    color: white;
    font-weight: bold;
    transition: 50ms;
    cursor: pointer;
    &:active {
      background-color: #586eff;
    }
  }
`;
