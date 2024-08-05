import React, { useEffect, useState } from "react";
import styled from "styled-components";
import emotional from "../../asset/emoji/emotional.png";
import getUserName from "../../apis/getUserName";

function CompleteGoalModal({ setIsCompModalOpen }) {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const fetchedUserName = await getUserName();
      setUserName(fetchedUserName);
      console.log("Fetched name!!!:", fetchedUserName);
    };
    fetchUserName();
  }, []);

  const closeCompModal = () => {
    setIsCompModalOpen(false);
  };

  const completeGoal = () => {
    setIsCompModalOpen(false);
    window.location.reload();
    /* 
여기에 빵빠레 효과 넣어줘야할듯 ? 
*/
  };

  return (
    <div>
      <ModalBackground>
        <Overlay onClick={closeCompModal} />
        {/* <ModalBackground> */}
        <Wrapper>
          <img
            src={emotional}
            alt="celebrate"
            className="celebrate"
            // width="30px"
          ></img>
          <h3>도전 완료를 축하드려요</h3>
          <div className="complete-content">
            축하드려요! 꾸준히 성장 일지를 작성한 {userName.name}님의 모습에 큰
            감동을 받았습니다
            <br />
            계속해서 멋진 성장을 이루어나갈 수 있도록 stepper가 함께할게요 :D
          </div>
          <CompleteBtn>
            <button onClick={completeGoal}>도전 완료하기!</button>
          </CompleteBtn>
        </Wrapper>
        {/* </Overlay> */}
      </ModalBackground>
    </div>
  );
}

export default CompleteGoalModal;

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
  height: 284px;
  border-radius: 12px;

  /* border: 2px solid red; */
  .celebrate {
    margin-top: 32px;
    display: flex;
    width: 40px;
    height: 40px;
  }
  .complete-content {
    width: 310px;
    /* height: 100px; */
    font-size: 15px;
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
