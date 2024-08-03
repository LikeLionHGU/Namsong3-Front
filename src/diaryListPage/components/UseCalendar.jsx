import { getDaysInMonth, subMonths } from "date-fns";
import React, { useEffect, useState } from "react";

const DAY_OF_WEEK = 7;

const UseCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const calculateCalendarData = (date) => {
    const totalMonthDays = getDaysInMonth(date);

    const prevMonthDate = subMonths(date, 1);
    const totalPrevMonthDays = getDaysInMonth(prevMonthDate);
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const prevMonthDays = Array.from({
      length: (firstDayOfMonth.getDay() + 6) % 7,
    }).map(
      (_, i) =>
        totalPrevMonthDays - ((firstDayOfMonth.getDay() + 6) % 7) + i + 1
    );

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

    //   // 해당 달 보여줄때 5주일지 6주일지 보여줌
    const totalDays = prevMonthDays.length + totalMonthDays;
    const calendarLength = totalDays > 35 ? 42 : 35;

    return {
      weekCalendarList: weekCalendarList.slice(0, calendarLength / DAY_OF_WEEK),
      prevMonthDaysLength: prevMonthDays.length,
      totalMonthDays: totalMonthDays,
    };
  };

  const [calendarData, setCalendarData] = useState(
    calculateCalendarData(currentDate)
  );

  useEffect(() => {
    setCalendarData(calculateCalendarData(currentDate));
  }, [currentDate]);

  return {
    ...calendarData,
    currentDate,
    setCurrentDate,
  };
};

export default UseCalendar;
