import React, { useEffect, useState } from "react";
import UseCalendar from "./UseCalendar";
import styled from "styled-components";
import monthNext from "../../asset/Icon/monthNext.svg";
import monthPrev from "../../asset/Icon/monthPrev.svg";
import { useLocation } from "react-router-dom";
import { tokenState } from "../../atom/atom";
import { useRecoilValue } from "recoil";
import getDiaryList from "../../apis/getDiaryList";
import markDate from "../../asset/Icon/markDate.svg";
import markDateBright from "../../asset/Icon/markDateBright.svg";
const Calendar = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // 현재 목표 번호
  const goalId = queryParams.get("id");
  const csrfToken = useRecoilValue(tokenState);
  const [isLoading, setIsLoading] = useState(true);
  const {
    weekCalendarList,
    currentDate,
    setCurrentDate,
    prevMonthDaysLength,
    totalMonthDays,
  } = UseCalendar();
  // localstorage에 날짜들 저장해서 새로고침해도 사라지지 않도록 함.
  const [selectedDates, setSelectedDates] = useState(() => {
    const storedDates = localStorage.getItem("selectedDates");
    return storedDates ? JSON.parse(storedDates) : [];
  });

  useEffect(() => {
    const fetchGoalList = async () => {
      setIsLoading(true);
      try {
        const fetchedGoalList = await getDiaryList(goalId, csrfToken);
        const datesArray = fetchedGoalList.journals.map((date) => {
          const [year, month, day] = date.createdDate.split(".");
          return `20${year}-${month}-${day}`;
        });
        setSelectedDates(datesArray);
      } catch (error) {
        console.error("Error fetching goal List:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGoalList();
  }, [goalId, csrfToken]);

  useEffect(() => {
    // 로컬 저장소에 일지 작성한 날짜들 저장
    localStorage.setItem("selectedDates", JSON.stringify(selectedDates));
  }, [selectedDates]);

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
  // const isSelected = (date, isCurrentMonth) => {
  //   if (!isCurrentMonth) {
  //     // 현재 보여지고 있는 달을 기준으로 색칠 필요 (8/1 일지 작성했는데, 8월 달력에 9월 내용이 보일떄 9/1도 표시됨을 방지 )
  //     return false;
  //   }
  //   // 현재 달려겡 보여지는 날짜(yyyy-mm-dd)와 비교해서 선택된 날짜와 일치하면 색칠하도록.
  //   const formattedDate = `${currentDate.getFullYear()}-${formatDay(
  //     currentDate.getMonth() + 1
  //   )}-${formatDay(date)}`;
  //   return selectedDates.includes(formattedDate);
  // };

  const isSelected = (date, isCurrentMonth, monthOffset) => {
    const displayMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + monthOffset,
      1
    );
    const formattedDate = `${displayMonth.getFullYear()}-${formatDay(
      displayMonth.getMonth() + 1
    )}-${formatDay(date)}`;
    return selectedDates.includes(formattedDate);
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        <button onClick={handlePrevMonth}>
          <img src={monthPrev} alt="" />
        </button>
        <span>{monthYear}</span>
        <button onClick={handleNextMonth}>
          <img src={monthNext} alt="" />
        </button>
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
              let monthOffset = 0;
              if (
                !isCurrentMonth &&
                weekIndex * 7 + dateIndex < prevMonthDaysLength
              ) {
                monthOffset = -1;
              } else if (
                !isCurrentMonth &&
                weekIndex * 7 + dateIndex >=
                  prevMonthDaysLength + totalMonthDays
              ) {
                monthOffset = 1;
              }
              return (
                <MonthDates
                  key={dateIndex}
                  isCurrentMonth={isCurrentMonth}
                  // isSelected={isSelected(date, isCurrentMonth,monthOffset)}
                  isSelected={isSelected(date, isCurrentMonth, monthOffset)}
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
  span {
    display: flex;
    justify-content: center;
    width: 80px;
    font-weight: bold;
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
`;

const Dates = styled.div``;

const Week = styled.div`
  display: flex;
  font-size: 14px;
  margin-bottom: 5px;
  margin-left: 10px;
  margin-right: 10px;
`;

const MonthDates = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  text-align: center;
  padding: 4px 0;
  font-size: 13px;
  .wrote-date {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;
    width: 28px;
    height: 28px;
    /* 일지 작성한 날짜 && 현재 보여지는 달이면 마킹 그대로 */
    background-image: ${(props) =>
      props.isSelected && props.isCurrentMonth ? `url(${markDate})` : "#fff"};
    /* 일지 작성한 날짜 && 다른 달에서 보여지는 일지 작성 날이면 투명도 낮춘 마킹 */
    // 예) 7월 달력인데 8월 1일에 일지 작성해서 날짜 표시 연하게 해둠
    background-image: ${(props) =>
      props.isSelected && !props.isCurrentMonth
        ? `url(${markDateBright})`
        : "#fff"};
  }
  color: ${(props) => (props.isCurrentMonth ? "#000" : "#bdbdbd")};
`;
