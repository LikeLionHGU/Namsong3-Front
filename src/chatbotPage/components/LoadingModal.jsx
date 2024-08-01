import React from "react";
import styled from "styled-components";
import loadingImg from "../../asset/Loading/loading.svg";
function LoadingModal({ setModalOpen }) {
  const closeLoadingModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      {/* 사실 사용자가 모달을 닫을 필요는 없어서 나중에 closeLoadingModal부분은 지워주면 된다. */}
      <ModalBackground onClick={closeLoadingModal}>
        {/* <Overlay> */}
        <Wrapper>
          {/* <img src={loadingGif} alt="loading" width="60px"></img> */}
          <img
            src={loadingImg}
            alt="loading"
            className="loading-img"
            width="60px"
          ></img>
          <h3>steppy가 일지를 요약중이에요!</h3>
          <div className="loading-content">
            steppy와 대화 중 일지에 추가하고 싶은 내용이 있었나요?
            <br />
            일지 수정하기 페이지에 담아주세요 :)
          </div>
        </Wrapper>
        {/* </Overlay> */}
      </ModalBackground>
    </div>
  );
}

export default LoadingModal;

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
  z-index: 3;
`;

// const Overlay = styled.div`
//   ${modalBase}
//   background: rgba(0, 0, 0, 0.2);
//   cursor: pointer;
// `;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  width: 350px; // 로딩모달 크기
  height: 230px;
  border-radius: 12px;

  /* border: 2px solid red; */
  .loading-content {
    width: 210px;
    font-size: 15px;
    text-align: center;
    /* border: 2px solid red; */
  }

  // => 이미지를 360도로 회전시켜서 로딩!!
  .loading-img {
    // rotate_image라는 애니메이션을 2초동안 무한으로 반복한다 (초시간 작게 바꿀수록 빠르게 돌아감)
    animation: rotate_image 2s linear infinite;
    transform-origin: 50% 50%; // 회전 중심
  }
  @keyframes rotate_image {
    100% {
      // 0~100퍼센트동안
      transform: rotate(360deg); // 360도를 계속 돈다
    }
  }
`;
