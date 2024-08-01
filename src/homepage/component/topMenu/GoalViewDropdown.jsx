import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { CSSTransition } from "react-transition-group";
import GoalViewDropdownIcon from "../../../asset/Icon/GoalViewDropdown.svg";

function GoalViewDropdown({ currentSort, setCurrentSort }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setCurrentSort(option);
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <Wrapper onClick={toggleDropdown}>
        <div style={{ marginLeft: "12px" }}>{currentSort}</div>
        <Icon src={GoalViewDropdownIcon} alt="Dropdown Icon" isOpen={isDropdownOpen} />
      </Wrapper>
      <CSSTransition in={isDropdownOpen} timeout={300} classNames="dropdown" unmountOnExit>
        <DropdownMenu>
          {currentSort !== "최신순" && <DropdownItem onClick={() => handleOptionClick("최신순")}>최신순</DropdownItem>}
          {currentSort !== "오름차순" && (
            <>
              <DropdownItem onClick={() => handleOptionClick("오름차순")}>오름차순</DropdownItem>
            </>
          )}
          {currentSort !== "내림차순" && (
            <>
              <Separator />
              <DropdownItem onClick={() => handleOptionClick("내림차순")}>내림차순</DropdownItem>
            </>
          )}
        </DropdownMenu>
      </CSSTransition>
    </DropdownContainer>
  );
}

export default GoalViewDropdown;

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
  position: relative;
`;

const Wrapper = styled.div`
  width: 120px;
  height: 32px;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 12px;
  color: #242424;
`;

const Icon = styled.img`
  transition: transform 0.3s;
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  margin-right: 10px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 108%;
  left: 0;
  background-color: white;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  width: 120px;
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
    background-color: #eef1ff;
  }
`;

const Separator = styled.div`
  height: 1px;
  background-color: #e6e6e6;
`;
