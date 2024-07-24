import React, { useState, forwardRef } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomInputStart = forwardRef(({ value, onClick }, ref) => (
  <StyledButtonStart onClick={onClick} ref={ref}>
    {value || "시작일자"}
  </StyledButtonStart>
));

const CustomInputEnd = forwardRef(({ value, onClick }, ref) => (
  <StyledButtonEnd onClick={onClick} ref={ref}>
    {value || "종료일자"}
  </StyledButtonEnd>
));

function DateRangePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <PeriodContainer>
      <ExplainText>목표 진행기간 설정</ExplainText>
      <DateInputs>
        <StyledDatePicker
          dateFormat="yyyy.MM.dd"
          shouldCloseOnSelect
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          customInput={<CustomInputStart />}
        />
        <StyledDatePicker
          dateFormat="yyyy.MM.dd"
          shouldCloseOnSelect
          selected={endDate}
          onChange={(date) => setEndDate(date)}
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
  margin-top: 16px;
`;

const ExplainText = styled.div`
  font-size: 16px;
  margin-bottom: 8px;
`;

const DateInputs = styled.div`
  display: flex;
  align-items: center;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
`;

const StyledButtonStart = styled.button`
  width: 205px;
  height: 54px;
  border: 1px solid #ccc;
  background-color: #e0e0e0;
  padding: 0 8px;
  box-sizing: border-box;
  border-radius: 4px 0 0 4px;
  clip-path: polygon(0 0, 90% 0, 100% 50%, 90% 100%, 0 100%);
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #999;
  }
  margin-right: -13px; /* 중간의 틈을 없애기 위해 조정 */
`;

const StyledButtonEnd = styled.button`
  width: 205px;
  height: 54px;
  border: 1px solid #ccc;
  background-color: #e0e0e0;
  padding: 0 8px;
  box-sizing: border-box;
  border-radius: 0 4px 4px 0;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 10% 50%);
  cursor: pointer;
  position: relative;
  &:focus {
    outline: none;
    border-color: #999;
  }
  margin-left: -7px;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(90% 0, 100% 50%, 90% 100%, 100% 100%, 100% 0);
  }
`;
