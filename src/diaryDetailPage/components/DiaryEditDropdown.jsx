import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import DiaryEditDropdownBtn from "../../asset/Icon/DiaryEditDropdownBtn.svg";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";

function DiaryEditDropdown({ setDeleteModal, diaryDetail, goalId }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const toggleDropdown = (event) => {
    setIsDropdownOpen(!isDropdownOpen);
    event.stopPropagation();
  };

  const handleEditclick = () => {
    setIsDropdownOpen(!isDropdownOpen);
    navigate(`/UpdateDiary`, { state: { diaryDetail, goalId } });
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation(); //뒤에 goalclick event 방지용
    setDeleteModal(true);
    toggleDropdown(event);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef} onClick={toggleDropdown}>
      <img src={DiaryEditDropdownBtn} alt=""></img>
      <CSSTransition in={isDropdownOpen} timeout={300} classNames="dropdown" unmountOnExit>
        <DropdownMenu>
          <DropdownItem onClick={handleEditclick}>수정하기</DropdownItem>
          <Separator />
          <DropdownItem onClick={handleDeleteClick}>삭제하기</DropdownItem>
        </DropdownMenu>
      </CSSTransition>
    </DropdownContainer>
  );
}

export default DiaryEditDropdown;

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

const DropdownContainer = styled.div`
  display: flex;
  position: relative; // relative로 수정해야 내가 설정해두는 곳에 드롭다운 위치 가능
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* border: 2px solid purple; */
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 115%;
  right: -120%;
  background-color: white;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  width: 66px;
  z-index: 3;
  font-size: 12px;
  color: #242424;

  &.dropdown-enter {
    animation: ${fadeIn} 300ms forwards;
  }
  &.dropdown-exit {
    animation: ${fadeOut} 300ms forwards;
  }
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #dfdfdf;
  }
`;

const Separator = styled.div`
  height: 1px;
  background-color: #dfdfdf;
`;
