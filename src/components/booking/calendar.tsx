/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import classNames from 'classnames';

import { alertSelector, bookingSelector, dateOrderSelector, loginSelector, oneBookSelector } from '../../selectors';
import { sendBookingData, sendCancelBooking, sendChangeBooking } from '../../store/order';
import { BookingDataProps } from '../../store/order/type';
import { clearDateOrder } from '../../store/order-date';
import { ModalFromState } from '../../types/modal';
import { Button } from '../button';
import { CalendarForm } from '../calendar-form';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Loader } from '../loader';

import closeSrc from './assets/close.png';

import styles from './calendar.module.scss';

const modalCalendar = document.getElementById('modalCalendar') as HTMLElement;

export const Calendar = ({ isOpen, setIsOpen, bookId, booking }: ModalFromState) => {
  const [selectedDate, setSelectedDay] = useState(new Date());
  const { book } = useAppSelector(oneBookSelector);
  const { user } = useAppSelector(loginSelector);
  const { dateOrder } = useAppSelector(dateOrderSelector);
  const { alertMessage } = useAppSelector(alertSelector);
  const dispatch = useAppDispatch();
  const bookingId = (book.booking?.id || booking?.id) ?? '';
  const bookIdUpdate = bookId ?? '';

  const bookDateOrder = booking?.dateOrder || book.booking?.dateOrder;

  const methods = useForm<BookingDataProps>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      order: true,
      dateOrder: '',
      book: bookId,
      customer: user?.id,
    },
  });

  const { handleSubmit, reset } = methods;

  const customerId = book.booking?.customerId || booking?.customerId;

  const userId = user?.id;

  const onSubmit = (data: BookingDataProps) => {
    if (bookDateOrder) {
      dispatch(
        sendChangeBooking({
          order: data.order,
          dateOrder: dateOrder,
          book: data.book,
          customer: data.customer,
          bookingId: bookingId,
        })
      );
    } else {
      dispatch(
        sendBookingData({
          order: data.order,
          dateOrder: dateOrder,
          book: data.book,
          customer: data.customer,
        })
      );
    }

    dispatch(clearDateOrder());
    setSelectedDay(new Date());
    reset();
  };

  const CancelBooking = () => {
    dispatch(sendCancelBooking({ bookingId, bookIdUpdate }));
    dispatch(clearDateOrder());
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const closeReviewModal = () => {
    setIsOpen(false);
    dispatch(clearDateOrder());
    setSelectedDay(new Date());
    reset();
  };

  useEffect(() => {
    if (alertMessage) {
      setIsOpen(false);
    }
  });

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <FormProvider {...methods}>
      <div
        className={classNames(styles.calendar, { [styles.visible]: isOpen })}
        onClick={closeReviewModal}
        data-test-id='modal-outer'
      >
        <div
          onClick={(e) => e.stopPropagation()}
          data-test-id='booking-modal'
          className={styles.wrapperStopPropagination}
        >
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.closeButton} onClick={closeReviewModal} data-test-id='modal-close-button'>
              <img src={closeSrc} alt='img' />
            </div>
            <div className={styles.formTitle} data-test-id='modal-title'>
              {customerId === userId ? (
                <div>
                  Изменение даты <br /> бронирования
                </div>
              ) : (
                <div>
                  Выбор даты <br /> бронирования
                </div>
              )}
            </div>
            <CalendarForm
              type='date'
              selectedDate={selectedDate}
              selectDate={(date) => setSelectedDay(date)}
              bookDateOrder={booking?.dateOrder || book.booking?.dateOrder}
            />
            <Button
              type='submit'
              disabled={
                !dateOrder ||
                !!(bookDateOrder && new Date(bookDateOrder)?.toLocaleDateString() === dateOrder.toLocaleDateString())
              }
              buttonText='Забронировать'
              passStyle={styles.button}
              id='booking-button'
            />
            {customerId === userId && (
              <Button
                type='button'
                buttonText='Отменить бронь'
                passStyle={classNames(styles.button, styles.cancel)}
                id='booking-cancel-button'
                onClick={CancelBooking}
              />
            )}
          </form>
        </div>
      </div>
    </FormProvider>,
    modalCalendar
  );
};
