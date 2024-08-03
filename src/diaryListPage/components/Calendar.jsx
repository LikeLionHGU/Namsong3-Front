import React, { useEffect, useState } from "react";
import UseCalendar from "./UseCalendar";
import styled from "styled-components";
import monthNext from "../../asset/Icon/monthNext.svg";
import monthPrev from "../../asset/Icon/monthPrev.svg";
const Calendar = () => {
  const {
    weekCalendarList,
    currentDate,
    setCurrentDate,
    prevMonthDaysLength,
    totalMonthDays,
  } = UseCalendar();

  // 날짜 선택하고 저장할 useState
  const [selectedDates, setSelectedDates] = useState([]);

  //날짜 더미 데이터.
  const dummyDates = ["2024-08-12", "2024-08-13", "2024-08-14"];

  useEffect(() => {
    // 특정 날짜를 받아와서 선택된 날짜 상태로 설정
    setSelectedDates(dummyDates);
    // eslint-disable-next-line
  }, []);

  // const month = monthNames[currentDate.getMonth()];
  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // 현재 년도 + 월  //
  const monthYear = `${currentDate.getFullYear()} ${
    currentDate.getMonth() + 1
  }월`;

  // 1~9일까지를 두자릿수로 변경하는 부분 01,02,03 ... 09일
  const formatDay = (day) => (day < 10 ? `0${day}` : day);
  // 보여질 날짜가 선택되었는지 확인
  const isSelected = (date) => {
    const formattedDate = `${currentDate.getFullYear()}-${formatDay(
      currentDate.getMonth() + 1
    )}-${formatDay(date)}`;
    return selectedDates.includes(formattedDate);
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <CalendarHeader>
          <button onClick={handlePrevMonth}>
            <img src={monthPrev} alt="" />
          </button>
          {/* <span>{month}</span> */}
          <span>{monthYear}</span>
          <button onClick={handleNextMonth}>
            <img src={monthNext} alt="" />
          </button>
        </CalendarHeader>
      </CalendarHeader>
      <WeekDays>
        {["m", "t", "w", "t", "f", "s", "s"].map((day) => (
          <WeekDay key={day}>{day}</WeekDay>
        ))}
      </WeekDays>
      <Dates>
        {weekCalendarList.map((week, weekIndex) => (
          <Week key={weekIndex}>
            {week.map((date, dateIndex) => {
              const isCurrentMonth =
                weekIndex * 7 + dateIndex >= prevMonthDaysLength &&
                weekIndex * 7 + dateIndex <
                  prevMonthDaysLength + totalMonthDays;
              return (
                <MonthDates
                  key={dateIndex}
                  isCurrentMonth={isCurrentMonth}
                  isSelected={isSelected(date)}
                >
                  <div className="wrote-date">{formatDay(date)}</div>
                </MonthDates>
              );
            })}
          </Week>
        ))}
      </Dates>
    </CalendarContainer>
  );
};

export default Calendar;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 282px;
  /* height: 331px; */
  min-height: 320px;
  margin-top: 20px;
  border: 1.5px solid #e2e2e2;
  border-radius: 12px;
  overflow: hidden;
  padding-bottom: 10px;
  cursor: default;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 52px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 15px;
  /* border: 2px solid red; */
  span {
    display: flex;
    justify-content: center;
    /* border: 2px solid red; */
    width: 80px;
    font-weight: bold;
    /* padding: 5px; */
  }
  > button {
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
  }
`;

const WeekDays = styled.div`
  display: flex;
  flex: 1;
  max-height: 20px;
  font-size: 13px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 5px 0;
  margin-bottom: 5px;
`;

const WeekDay = styled.div`
  flex: 1;
  font-size: 14px;
  text-align: center;
  color: #6d6d6d;
  border: 2px solid transparent; // (날짜들이 몇픽셀씩 위아래로 움직여서 넣어준 부분)
`;

const Dates = styled.div``;

const Week = styled.div`
  display: flex;
  font-size: 14px;
  margin-bottom: 5px;
  margin-left: 10px;
  margin-right: 10px;
  /* border: 2px solid red; */
`;

const MonthDates = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  padding: 5px 0;
  font-size: 13px;

  //일지를 작성한 날짜라면 배경색을 바꿈
  .wrote-date {
    display: flex;
    align-self: auto;
    justify-self: auto;
    justify-content: center;
    align-items: center;
    z-index: 3;
    width: 22px;
    height: 25px;
    border-radius: 25px;
    /* border: 2px solid red; */
    //일지 작성한 날짜라면 초록색으로, 그렇지 않으면 흰색으로.
    background-color: ${(props) => (props.isSelected ? "#5AC388" : "#fff")};
  }

  // 현재 달에 있는 날짜가 아니면 회색처리.
  color: ${(props) => (props.isCurrentMonth ? "#000" : "#ccc")};
`;
