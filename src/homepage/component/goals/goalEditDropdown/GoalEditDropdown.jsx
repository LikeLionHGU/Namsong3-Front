import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import GoalEditDropdownBtn from "../../../../asset/Icon/GoalEditDropdownBtn.svg";
import { CSSTransition } from "react-transition-group";

function GoalEditDropdown({
  setIsDeleteModalOpen,
  setIsUpdate,
  setIsModalOpen,
  goal,
  onEdit,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = (event) => {
    setIsDropdownOpen(!isDropdownOpen);
    event.stopPropagation();
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleUpdateClick = (event) => {
    event.stopPropagation(); // 뒤에 goalclick event 방지용
    setIsUpdate(true);
    setIsModalOpen(true);
    setIsDropdownOpen(false);
    if (onEdit) onEdit(goal);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation(); // 뒤에 goalclick event 방지용
    setIsDeleteModalOpen(true);
    if (onEdit) onEdit(goal);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef} onClick={toggleDropdown}>
      <img src={GoalEditDropdownBtn} alt=""></img>
      <CSSTransition
        in={isDropdownOpen}
        timeout={300}
        classNames="dropdown"
        unmountOnExit
      >
        <DropdownMenu>
          <DropdownItem onClick={handleUpdateClick}>수정하기</DropdownItem>
          <Separator />
          <DropdownItem onClick={handleDeleteClick}>삭제하기</DropdownItem>
        </DropdownMenu>
      </CSSTransition>
    </DropdownContainer>
  );
}

export default GoalEditDropdown;

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
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background: rgba(0, 0, 0, 0.18);
    border-radius: 6px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 115%;
  right: -21%;
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
