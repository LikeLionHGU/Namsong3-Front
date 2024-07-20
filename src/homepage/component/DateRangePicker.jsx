import React, { useState, forwardRef } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <StyledInput onClick={onClick} ref={ref} value={value} placeholder={placeholder} readOnly />
));

function DateRangePicker() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <PeriodContainer>
      <ExplainText>목표 진행기간 설정</ExplainText>
      <DateInputs>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          customInput={
            <CustomInput
              placeholder="시작일자"
              value={
                startDate
                  ? startDate.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
                  : ""
              }
            />
          }
          dateFormat="yyyy/MM/dd"
        />

        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          customInput={
            <CustomInput
              placeholder="종료일자"
              value={
                endDate
                  ? endDate.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
                  : ""
              }
            />
          }
          dateFormat="yyyy/MM/dd"
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

const StyledInput = styled.input`
  width: 194px;
  height: 54px;
  border: 1px solid #ccc;
  background-color: #e0e0e0;
  padding: 0 8px;
  box-sizing: border-box;
  border-radius: ${(props) => (props.placeholder === "시작일자" ? "4px 0 0 4px" : "0 4px 4px 0")};
  &:focus {
    outline: none;
    border-color: #999;
  }
  cursor: pointer;
`;
