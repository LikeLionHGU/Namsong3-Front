import { getDaysInMonth, subMonths } from "date-fns";
import React from "react";

const DAY_OF_WEEK = 7;

const UseCalendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const totalMonthDays = getDaysInMonth(currentDate);

  // Get the previous month days
  const prevMonthDate = subMonths(currentDate, 1);
  const totalPrevMonthDays = getDaysInMonth(prevMonthDate);
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const prevMonthDays = Array.from({
    length: (firstDayOfMonth.getDay() + 6) % 7,
  }).map(
    (_, i) => totalPrevMonthDays - ((firstDayOfMonth.getDay() + 6) % 7) + i + 1
  );

  // Get the next month days
  // const lastDayOfMonth = new Date(
  //   currentDate.getFullYear(),
  //   currentDate.getMonth(),
  //   totalMonthDays
  // );
  const nextMonthDays = Array.from({
    length: 42 - totalMonthDays - prevMonthDays.length,
  }).map((_, i) => i + 1);

  const currentDayList = Array.from({ length: totalMonthDays }).map(
    (_, i) => i + 1
  );

  const currentCalendarList = [
    ...prevMonthDays,
    ...currentDayList,
    ...nextMonthDays,
  ];
  const weekCalendarList = currentCalendarList.reduce((acc, cur, idx) => {
    const chunkIndex = Math.floor(idx / DAY_OF_WEEK);
    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }
    acc[chunkIndex].push(cur);
    return acc;
  }, []);

  // 해당 달이 5주일지 6주일지 보여줌
  const totalDays = prevMonthDays.length + totalMonthDays;
  const calendarLength = totalDays > 35 ? 42 : 35;

  return {
    weekCalendarList: weekCalendarList.slice(0, calendarLength / DAY_OF_WEEK),
    currentDate: currentDate,
    setCurrentDate: setCurrentDate,
    prevMonthDaysLength: prevMonthDays.length,
    totalMonthDays: totalMonthDays,
  };
};

export default UseCalendar;
