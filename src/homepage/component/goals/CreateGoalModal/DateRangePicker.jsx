import React, { forwardRef, useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GoalViewDropdown from "../../../../asset/Icon/GoalViewDropdown.svg";

const CustomInputStart = forwardRef(({ value, onClick }, ref) => (
  <StyledButton onClick={onClick} ref={ref}>
    {value || <span style={{ color: "#676767" }}>시작일</span>}{" "}
    <img src={GoalViewDropdown} alt="" />
  </StyledButton>
));

const CustomInputEnd = forwardRef(({ value, onClick }, ref) => (
  <StyledButton onClick={onClick} ref={ref} style={{ marginLeft: "7px" }}>
    {value || <span style={{ color: "#676767" }}>종료일</span>}{" "}
    <img src={GoalViewDropdown} alt="" />
  </StyledButton>
));

function DateRangePicker({ startDate, setStartDate, endDate, setEndDate }) {
  return (
    <PeriodContainer>
      {/* <ExplainText>
        기간<span style={{ color: "red" }}>*</span>
      </ExplainText> */}
      <DateInputs>
        <StyledDatePicker
          dateFormat="yyyy-MM-dd"
          shouldCloseOnSelect
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          customInput={<CustomInputStart />}
        />
        <StyledDatePicker
          dateFormat="yyyy-MM-dd"
          shouldCloseOnSelect
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          minDate={startDate}
          customInput={<CustomInputEnd />}
        />
      </DateInputs>
    </PeriodContainer>
  );
}

export default DateRangePicker;

const PeriodContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 6px;
`;

const ExplainText = styled.div`
  font-size: 12px;
  margin-bottom: 6px;
`;

const DateInputs = styled.div`
  display: flex;
  width: 388px;
  justify-content: space-between;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 190px;
  height: 45px;
  border: 1px solid #dfdfdf;
  padding: 0 15px 0 12px;
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #999;
  }
`;
