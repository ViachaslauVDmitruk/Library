/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { calendarState } from '../../const/calendar';
import { checkBookingDay, checkIsToday } from '../../helpers/calendar';
import { checkIsBlockedDate } from '../../helpers/calendar/check-is-bloked';
import { dateOrderSelector } from '../../selectors';
import { getDateOrder } from '../../store/order-date';
import { Button } from '../button';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useCalendar, UseCalendarParams } from '../hooks/use-calendar';

import dropDown from './assets/drop-down.png';
import nextSrc from './assets/next.png';
import prevSrc from './assets/prev.png';

import styles from './calendar-form.module.scss';

export const CalendarForm = ({
  type = 'date',
  locale = 'default',
  selectedDate: date,
  selectDate,
  firstWeekDayNumber = 2,
  bookDateOrder,
}: UseCalendarParams) => {
  const { weekDayNames } = calendarState;

  const { functions, state } = useCalendar({
    type,
    locale,
    selectDate,
    selectedDate: date,
    firstWeekDayNumber,
  });
  const [isShowMonthes, setIsShowMonthes] = useState<boolean>(false);
  const { dateOrder } = useAppSelector(dateOrderSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (bookDateOrder) {
      dispatch(getDateOrder(new Date(bookDateOrder)));
    }
  }, [bookDateOrder, dispatch]);

  return (
    <div className={styles.wrapper} data-test-id='calendar'>
      <header className={styles.header}>
        <div className={styles.listWrapper} data-test-id='month-select'>
          <ul className={classNames(styles.listMonthes, { [styles.visibleMonth]: isShowMonthes })}>
            {state.monthesNames.map((monthesName) => (
              <li
                key={monthesName.month}
                aria-hidden={true}
                onClick={() => {
                  functions.selectedMonthByIndex(monthesName.monthIndex);
                  setIsShowMonthes(!isShowMonthes);
                }}
                className={classNames(styles.listItemMonth)}
              >
                {monthesName.month}
              </li>
            ))}
          </ul>
          <div className={styles.selectedMonth}>
            {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
          </div>
          <Button
            type='button'
            src={dropDown}
            passStyle={styles.dropDown}
            onClick={() => setIsShowMonthes(!isShowMonthes)}
          />
        </div>
        <div className={styles.controlButtons}>
          <Button
            type='button'
            src={prevSrc}
            passStyle={styles.selectArrow}
            onClick={() => functions.onClickArrow('left')}
            id='button-prev-month'
          />
          <Button
            type='button'
            src={nextSrc}
            passStyle={styles.selectArrow}
            onClick={() => functions.onClickArrow('right')}
            id='button-next-month'
          />
        </div>
      </header>
      <table className={styles.month}>
        <thead className={styles.week}>
          {weekDayNames.map((day, i) => (
            <tr key={day} className={styles.weekDayName}>
              {day}
            </tr>
          ))}
        </thead>
        <tbody className={styles.arrayDays}>
          {state.calendarDays.map((day) => {
            const isToday = checkIsToday(day.date);

            const isSelectedDay = dateOrder && dateOrder.toISOString() === day.date.toISOString();

            const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;

            const isWeekendDay = day.dayNumberInWeek === 7 || day.dayNumberInWeek === 1;
            const isBookingDay = checkBookingDay(day.dayNumber);
            const isSelectedWeekend = isSelectedDay && isWeekendDay;

            return (
              <button
                type='button'
                key={`${day.dayNumber}-${day.monthIndex}`}
                onClick={() => {
                  functions.selectDay(day);
                  dispatch(getDateOrder(day.date));
                }}
                className={classNames(
                  styles.dayNumber,
                  styles[isSelectedDay ? 'selectedDay' : ''],
                  styles[isToday ? 'todayItem' : ''],
                  styles[isWeekendDay ? 'weekendItem' : ''],
                  styles[isBookingDay ? 'bookingDay' : ''],
                  styles[isSelectedWeekend ? 'selectWeekend' : '']
                )}
                data-test-id='day-button'
                disabled={checkIsBlockedDate(day)}
              >
                {day.dayNumber}
              </button>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
