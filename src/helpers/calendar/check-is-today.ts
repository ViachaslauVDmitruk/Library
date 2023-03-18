/* eslint-disable no-debugger */
/* eslint-disable consistent-return */
import { checkDateIsEqual } from './check-date-is-equal';

export const checkIsToday = (date: Date) => {
  const today = new Date();

  return checkDateIsEqual(today, date);
};

export const checkBookingDay = (dayNumber: number) => {
  const daySunday = 1;
  const dayFriday = 6;
  const daySaturday = 7;

  const today = new Date();
  const current = today.getDate();

  const availableDays = [];
  const dayNumberInWeek = today.getDay() + 1;

  if (dayNumberInWeek === dayFriday) {
    availableDays.push(current + 3);
  }

  if (dayNumberInWeek === daySaturday) {
    availableDays.push(current + 2);
  }

  if (dayNumberInWeek === daySunday) {
    availableDays.push(current + 1);
  }

  if (availableDays.length === 0) {
    availableDays.push(current + 1);
  }

  return availableDays.includes(dayNumber);
};
