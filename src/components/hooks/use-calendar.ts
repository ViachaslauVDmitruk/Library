/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react';

import { getWeekDaysNames } from '../../helpers/calendar';
import { createDate } from '../../helpers/calendar/create-date';
import { createMonth } from '../../helpers/calendar/create-month';
import { getMonthNumberOfDays } from '../../helpers/calendar/get-month-number-of-days';
import { getMonthesNames } from '../../helpers/calendar/get-monthes-names';

export type UseCalendarParams = {
  type: 'date' | 'period';
  locale?: string;
  selectedDate: Date;
  selectDate: (date: Date) => void;
  firstWeekDayNumber?: number;
};

const DAYS_IN_WEEK = 7;

const getYearsInterval = (year: number) => {
  const startYear = Math.floor(year / 10) * 10;

  return [...Array(10)].map((_, index) => startYear + index);
};

export const useCalendar = ({
  type = 'date',
  locale = 'default',
  selectDate,
  selectedDate: date,
  firstWeekDayNumber = 2,
}: UseCalendarParams) => {
  const [mode, setMode] = useState<'days' | 'monthes' | 'years'>('days');
  const [selectedDay, setSelectedDay] = useState(createDate({ date }));
  const [period, setPeriod] = React.useState<{
    startDate: null | ReturnType<typeof createDate>;
    endDate: null | ReturnType<typeof createDate>;
  }>({ startDate: selectedDay, endDate: null });
  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({ date: new Date(selectedDay.year, selectedDay.monthIndex), locale })
  );
  const [selectedYear, setSelectedYear] = useState(selectedDay.year);
  const [selectedYearsInterval, setSelectedYearsInterval] = useState(getYearsInterval(selectedDay.year));

  const monthesNames = useMemo(() => getMonthesNames(locale), []);
  const weekDaysNames = useMemo(() => getWeekDaysNames(firstWeekDayNumber, locale), []);

  const days = useMemo(() => selectedMonth.createMonthDays(), [selectedMonth, selectedYear]);

  const calendarDays = useMemo(() => {
    const monthNumberOfDays = getMonthNumberOfDays(selectedMonth.monthIndex, selectedYear);

    const prevMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex - 1),
      locale,
    }).createMonthDays();

    const nextMonthDays = createMonth({
      date: new Date(selectedYear, selectedMonth.monthIndex + 1),
      locale,
    }).createMonthDays();

    const firstDay = days[0];
    const lastDay = days[monthNumberOfDays - 1];

    const shiftIndex = firstWeekDayNumber - 1;
    const numberOfPrevDays =
      firstDay.dayNumberInWeek - 1 - shiftIndex < 0
        ? DAYS_IN_WEEK - (firstWeekDayNumber - firstDay.dayNumberInWeek)
        : firstDay.dayNumberInWeek - 1 - shiftIndex;

    const numberOfNextDays =
      DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex > 6
        ? DAYS_IN_WEEK - lastDay.dayNumberInWeek - (DAYS_IN_WEEK - shiftIndex)
        : DAYS_IN_WEEK - lastDay.dayNumberInWeek + shiftIndex;

    const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays;

    const result = [];

    for (let i = 0; i < numberOfPrevDays; i++) {
      const inverted = numberOfPrevDays - i;

      result.push(prevMonthDays[prevMonthDays.length - inverted]);
    }

    for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i++) {
      result.push(days[i - numberOfPrevDays]);
    }

    for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i++) {
      result.push(nextMonthDays[i - totalCalendarDays + numberOfNextDays]);
    }

    return result;
  }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

  const onClickArrow = (direction: 'right' | 'left') => {
    if (mode === 'years' && direction === 'left') {
      return setSelectedYearsInterval(getYearsInterval(selectedYearsInterval[0] - 10));
    }

    if (mode === 'years' && direction === 'right') {
      return setSelectedYearsInterval(getYearsInterval(selectedYearsInterval[0] + 10));
    }

    if (mode === 'monthes' && direction === 'left') {
      const year = selectedYear - 1;

      if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));

      return setSelectedYear(selectedYear - 1);
    }

    if (mode === 'monthes' && direction === 'right') {
      const year = selectedYear + 1;

      if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));

      return setSelectedYear(selectedYear + 1);
    }

    if (mode === 'days') {
      const monthIndex = direction === 'left' ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;

      if (monthIndex === -1) {
        const year = selectedYear - 1;

        setSelectedYear(year);
        if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));

        return setSelectedMonth(createMonth({ date: new Date(selectedYear - 1, 11), locale }));
      }

      if (monthIndex === 12) {
        const year = selectedYear + 1;

        setSelectedYear(year);
        if (!selectedYearsInterval.includes(year)) setSelectedYearsInterval(getYearsInterval(year));

        return setSelectedMonth(createMonth({ date: new Date(year, 0), locale }));
      }

      setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }));
    }
  };

  const selectedMonthByIndex = (monthIndex: number) => {
    setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }));
  };

  const selectDay = (day: ReturnType<typeof createDate>) => {
    if (type === 'period') {
      if (!period.startDate || !!period.endDate) {
        setPeriod({ startDate: day, endDate: null });

        return;
      }

      setPeriod({ ...period, endDate: day });

      return;
    }

    if (type === 'date') {
      setSelectedDay(day);
      selectDate(day.date);
    }
  };

  return {
    state: {
      period,
      mode,
      calendarDays,
      weekDaysNames,
      monthesNames,
      selectedDay,
      selectedMonth,
      selectedYear,
      selectedYearsInterval,
    },
    functions: {
      selectDay,
      onClickArrow,
      setMode,
      setSelectedDay,
      selectedMonthByIndex,
      setSelectedYear,
      setSelectedYearsInterval,
    },
  };
};
