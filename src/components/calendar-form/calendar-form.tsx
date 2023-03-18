import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

import { calendarState } from '../../const/calendar';
import { checkDateIsEqual, checkIsToday } from '../../helpers/calendar';
import { getDateOrder } from '../../store/order-date';
import { Button } from '../button';
import { useAppDispatch } from '../hooks';
import { useCalendar, UseCalendarParams } from '../hooks/use-calendar';

import nextSrc from './assets/next.png';
import prevSrc from './assets/prev.png';

import styles from './calendar-form.module.scss';

export const CalendarForm = ({
  type = 'date',
  locale = 'default',
  selectedDate: date,
  selectDate,
  firstWeekDayNumber = 2,
}: UseCalendarParams) => {
  const { years, monthNames, weekDayNames } = calendarState;

  const { functions, state } = useCalendar({
    type,
    locale,
    selectDate,
    selectedDate: date,
    firstWeekDayNumber,
  });

  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper} data-test-id='calendar'>
      <header className={styles.header}>
        <select data-test-id='month-select'>
          {state.monthesNames.map((month, i) => (
            <option key={`${month.month}+1`} value={i}>
              {month.month} {state.selectedYear}
            </option>
          ))}
        </select>
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
            const isSelectedDay = type === 'date' && checkDateIsEqual(day.date, state.selectedDay.date);
            const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
            const isEndPeriodDate =
              type === 'period' && state.period.startDate && checkDateIsEqual(day.date, state.period.startDate.date);
            const isStartPeriodDate =
              type === 'period' && state.period.endDate && checkDateIsEqual(day.date, state.period.endDate.date);
            const isDateBetweenPeriod =
              state.period.endDate &&
              state.period.endDate.date.getTime() > day.date.getTime() &&
              state.period.startDate &&
              state.period.startDate.date.getTime() < day.date.getTime();
            const isNotSelectedDate =
              state.period.startDate && state.period.startDate.date.getTime() > day.date.getTime();
            const isWeekendDay = day.dayNumberInWeek === 7 || day.dayNumberInWeek === 1;

            return (
              <tr
                key={`${day.dayNumber}-${day.monthIndex}`}
                onClick={() => {
                  functions.selectDay(day);
                  dispatch(getDateOrder(day.date));
                }}
                className={classNames(
                  styles.dayNumber,
                  styles[isToday ? 'todayItem' : ''],
                  styles[isWeekendDay ? 'weekendItem' : ''],
                  isDateBetweenPeriod ? 'calendar__today__item' : '',
                  styles[isSelectedDay ? 'selectedDay' : '']
                  // isEndPeriodDate ? 'calendar__selected__item' : '',
                  // isStartPeriodDate ? 'calendar__selected__item' : '',
                  // isAdditionalDay ? 'calendar__additional__day' : '',
                  // isNotSelectedDate ? 'calendar__additional__day' : '',
                )}
                data-test-id='day-button'
              >
                {day.dayNumber}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
