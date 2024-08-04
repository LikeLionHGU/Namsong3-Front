import React from "react";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { tokenState, UserTokenState } from "../atom/atom";
import logout from "../apis/logout";
import { useNavigate } from "react-router-dom";
function LogoutModal({ setLogoutModalOpen }) {
  const setUserToken = useSetRecoilState(UserTokenState);
  const [csrfToken, setCsrfToekn] = useRecoilState(tokenState);
  const navigate = useNavigate();
  const closeConfirmModal = () => {
    setLogoutModalOpen(false);
  };
  const handleLogOut = async (event) => {
    event.stopPropagation();
    try {
      await logout(csrfToken);
      setUserToken({ isLogin: false });
      setCsrfToekn(null);
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패", error);
    }
  };
  return (
    <div>
      <ModalBackground>
        <Overlay onClick={closeConfirmModal} />
        <Wrapper>
          <h3>잠시 머물러 내일을 준비해보세요</h3>
          <div className="logout-content">
            당신은 계속해서 성장하고 있어요!
            <li>내일의 목표 설정하기 🎯</li>
            <li>앞으로의 목표 다듬기 🛠</li>
            <br />
          </div>
          <Buttons>
            <CancelBtn>
              <button onClick={closeConfirmModal}>취소 </button>
            </CancelBtn>
            <LogoutBtn>
              <button onClick={handleLogOut}>로그아웃</button>
            </LogoutBtn>
          </Buttons>
        </Wrapper>
      </ModalBackground>
    </div>
  );
}

export default LogoutModal;

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
  min-width: 350px; // 로딩모달 크기
  height: 187px;
  border-radius: 12px;
  padding-top: 5px;
  z-index: 5;
  .logout-content {
    width: 310px;
    /* height: 100px; */
    font-size: 14px;
    text-align: center;
  }
`;
const CancelBtn = styled.div`
  display: flex;
  > button {
    background-color: white !important;
    color: #242424 !important;
    border: 1.5px solid #dfdfdf !important;
    margin-right: 4px;

    &:active {
      background-color: #f5f5f5 !important;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  /* margin-top: 16px; */
  > div > button {
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    border: none;
    border-radius: 8px;
    width: 96px;
    height: 37px;
    font-size: 14px;
    font-weight: bold;
    color: white;
    background-color: #798bff;
    cursor: pointer;
    margin-left: 4px;
    &:active {
      background-color: #586eff;
    }
  }
`;
const LogoutBtn = styled.div`
  display: flex;
`;
