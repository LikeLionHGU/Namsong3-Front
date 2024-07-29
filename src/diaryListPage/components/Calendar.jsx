import React, { useEffect, useState } from "react";
import UseCalendar from "./UseCalendar";
import styled from "styled-components";

const Calendar = () => {
  const {
    weekCalendarList,
    currentDate,
    // eslint-disable-next-line
    setCurrentDate,
    prevMonthDaysLength,
    totalMonthDays,
  } = UseCalendar();

  // 날짜 선택하고 저장할 useState
  const [selectedDates, setSelectedDates] = useState([]);

  //날짜 더미 데이터.
  const dummyDates = ["2024-07-12", "2024-07-13", "2024-07-14"];
  useEffect(() => {
    // 특정 날짜를 받아와서 선택된 날짜 상태로 설정
    setSelectedDates(dummyDates);
    // eslint-disable-next-line
  }, []);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[currentDate.getMonth()];

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
        <span>{month}</span>
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
                <Date
                  key={dateIndex}
                  isCurrentMonth={isCurrentMonth}
                  isSelected={isSelected(date)}
                >
                  <div className="wrote-date">{formatDay(date)}</div>
                </Date>
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
  /* display: flex; */
  display: flex;
  flex-direction: column;
  width: 282px;
  height: 331px;
  /* margin: 0 auto; */
  margin-top: 20px;
  border: 1.5px solid #e2e2e2;
  border-radius: 8px;
  overflow: hidden;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  height: 52px;
  /* padding: 10px; */
  padding-left: 8px;
  font-size: 20px;
  margin-bottom: 10px;
  span {
    font-weight: bold;
    padding: 5px;
  }
`;

const WeekDays = styled.div`
  display: flex;
  font-size: 11px;
  /* background-color: #f5f5f5; */
  padding: 5px 0;
  margin-bottom: 5px;
`;

const WeekDay = styled.div`
  flex: 1;
  font-size: 11px;
  text-align: center;
  color: #6d6d6d;
`;

const Dates = styled.div``;

const Week = styled.div`
  display: flex;
  font-size: 11px;
  margin-bottom: 2px;
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  padding: 8px 0;
  /* background-color: #fff; */

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
