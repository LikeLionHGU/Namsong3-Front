import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import DeleteGoalModal from "./DeleteGoalModal";
import GoalEditDropdownBtn from "../../../../asset/Icon/GoalEditDropdownBtn.svg";

function GoalEditDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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

  const handleDeleteClick = (event) => {
    event.stopPropagation(); //뒤에 goalclick event 방지용
    setIsDeleteModalOpen(true);
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
      <img src={GoalEditDropdownBtn} alt=""></img>
      {isDropdownOpen && (
        <DropdownMenu>
          <DropdownItem onClick={toggleDropdown}>수정하기</DropdownItem>
          <DropdownItem onClick={handleDeleteClick}>삭제하기</DropdownItem>
        </DropdownMenu>
      )}
      {isDeleteModalOpen && <DeleteGoalModal setIsDeleteModalOpen={setIsDeleteModalOpen} />}
    </DropdownContainer>
  );
}

export default GoalEditDropdown;

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
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 115%;
  right: -21%;
  background-color: white;
  border: 1px solid #e6e6e6;
  width: 66px;
  z-index: 3;
  font-size: 12px;
  color: #9a9a9a;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;
