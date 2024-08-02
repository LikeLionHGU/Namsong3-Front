import React from "react";
import styled from "styled-components";
import fire from "../../asset/emoji/fire.png";
import { useNavigate } from "react-router-dom";
function DiaryPostModal({ setPostedModal }) {
  const navigate = useNavigate();
  const closeModal = () => {
    setPostedModal(false);
    navigate("/homepage"); // !!!! 중요, 나중에 연결할때 이 부분이 diaryList?id= 링크로 연결되어야함.
  };

  return (
    <div>
      <ModalBackground>
        <Overlay onClick={closeModal} />

        <Wrapper>
          <img
            src={fire}
            alt="fire"
            className="fire-emoji"
            // width="30px"
          ></img>
          <h3>일지가 추가되었어요!</h3>
          <div className="complete-content">
            개별 목표 화면에서 추가된 일지를
            <br />
            확인해보세요!
          </div>
          <CompleteBtn>
            <button onClick={closeModal}>목표에 다가가기!</button>
          </CompleteBtn>
        </Wrapper>
        {/* </Overlay> */}
      </ModalBackground>
    </div>
  );
}

export default DiaryPostModal;

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
  height: 242px;
  border-radius: 12px;

  /* border: 2px solid red; */
  .fire-emoji {
    margin-top: 32px;
    display: flex;
    width: 40px;
    height: 40px;
  }
  .complete-content {
    width: 310px;
    /* height: 100px; */
    font-size: 14px;
    text-align: center;
    /* border: 2px solid red; */
  }
`;
const CompleteBtn = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
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
