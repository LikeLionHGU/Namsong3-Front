/*
상위 컴포넌트에 들어갈 내용(DiaryWrite 참고):
  const [editedModal, setEditedModal] = useState(false); //일지가 추가되었다는 걸 알려주는 모달
  const [thumbnailModal, setThumbnailModal] = useState(false); // 썸네일 사진 추가하는 모달

 {thumbnailModal && (
          <ThumbnailModal
            setThumbnailModal={setThumbnailModal}
            setEditedModal={setEditedModal}
            formData={formData}
            goalId={goalId}
            csrfToken={csrfToken}
          />
        )}
        {!thumbnailModal && postedModal && (
          <DiaryPostModal setEditedModal={setEditedModal} goalId={goalId} />
        )}
*/
import React from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

function DiaryEditModal({ setEditedModal }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { goalId, diaryDetail } = location.state;
  const diaries = diaryDetail;

  // location.state가 존재하고, goalId와 diaryDetail이 존재하는지 확인
  if (!location.state || !location.state.goalId || !location.state.diaryDetail) {
    console.error("Missing required state data");
    return null; // 필수 데이터가 없으면 null 반환
  }

  const closeModal = () => {
    setEditedModal(false); // !! 주석 풀기 !!
    navigate(`/detail/`, { state: { diaries, goalId } });
  };

  return (
    <div>
      <ModalBackground>
        <Overlay onClick={closeModal} />

        <Wrapper>
          <div className="title">일지가 수정되었어요</div>
          <div className="save-content">
            변경 사항이 성공적으로 저장되었습니다
            <br />
            계속해서 기록을 이어가보세요!
          </div>
          <CompleteBtn>
            <button onClick={closeModal}>확인하기</button>
          </CompleteBtn>
        </Wrapper>
      </ModalBackground>
    </div>
  );
}

export default DiaryEditModal;

const modalBase = `
width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  `;

const ModalBackground = styled.div`
  ${modalBase}

  background: rgba(0, 0, 0, 0.2);
  z-index: 4;
  cursor: default;
`;
const Overlay = styled.div`
  ${modalBase}
  cursor: default;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  width: 350px; // 로딩모달 크기
  min-height: 166px;
  border-radius: 12px;
  .title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 18px;
    margin-bottom: 8px;
    line-height: 150%;
  }
  .save-content {
    width: 310px;
    /* height: 100px; */
    font-size: 14px;
    text-align: center;
    /* border: 2px solid red; */
    line-height: 150%;
  }
`;
const CompleteBtn = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  /* border: 2px solid red; */
  > button {
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    border-radius: 8px;
    width: 201px;
    height: 37px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: #798bff;
    cursor: pointer;
    &:active {
      background-color: #586eff;
    }
  }
`;
