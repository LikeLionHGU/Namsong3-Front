import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { CSSTransition } from "react-transition-group";
import ProfileImg from "../asset/Icon/Profile.svg";
import getUserName from "../apis/getUserName";
import LogoutModal from "./LogoutModal";

function Profile() {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const [userName, setUserName] = useState("");

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleClickOutside = (event) => {
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setIsProfileOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchUserName = async () => {
      const fetchedUserName = await getUserName();
      setUserName(fetchedUserName);
      console.log("Fetched goalList:", fetchedUserName);
    };
    fetchUserName();
  }, []);

  const handleLogoutClick = () => {
    setLogoutModalOpen(true);
  };

  return (
    <>
      <ProfileBtn ref={profileRef} onClick={toggleProfile}>
        <div style={{ cursor: "pointer" }}>프로필</div>
        <CSSTransition
          in={isProfileOpen}
          timeout={300}
          classNames="profile"
          unmountOnExit
        >
          <ProfileMenu>
            <ProfileInfo>
              <img src={ProfileImg} alt="" />
              <div style={{ marginTop: "5px" }}>{userName.name}님</div>
            </ProfileInfo>
            <LogoutBtn onClick={handleLogoutClick}>로그아웃</LogoutBtn>
          </ProfileMenu>
        </CSSTransition>
      </ProfileBtn>
      {logoutModalOpen && (
        <LogoutModal setLogoutModalOpen={setLogoutModalOpen} />
      )}
    </>
  );
}

export default Profile;

const ProfileBtn = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* cursor: pointer; */
  > div {
    cursor: pointer;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const ProfileMenu = styled.div`
  position: absolute;
  top: 115%;
  right: -75%;
  background-color: #f5f5f5;
  border-radius: 8px;
  width: 98px;
  height: 140px;
  z-index: 3;
  font-size: 11px;
  /* font-family: Pretendard; */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */

  &.profile-enter {
    animation: ${fadeIn} 300ms forwards;
  }
  &.profile-exit {
    animation: ${fadeOut} 300ms forwards;
  }
`;

const ProfileInfo = styled.div`
  width: 73px;
  height: 82px;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: default;
`;

const LogoutBtn = styled.div`
  margin-top: 7px;
  width: 74px;
  height: 34px;
  border-top: 1px solid #dfdfdf;
  color: #676767;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
