import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

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
      </Wrapper>
      {isDropdownOpen && (
        <DropdownMenu>
          {currentSort !== "최신순" && <DropdownItem onClick={() => handleOptionClick("최신순")}>최신순</DropdownItem>}
          {currentSort !== "오래된 순" && (
            <DropdownItem onClick={() => handleOptionClick("오래된 순")}>오래된 순</DropdownItem>
          )}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
}

export default GoalViewDropdown;

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
  cursor: pointer;
  font-size: 12px;
  color: #9a9a9a;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 108%;
  left: 0;
  background-color: white;
  border: 1px solid #e6e6e6;
  width: 120px;
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
