/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { bookingSelector, dateOrderSelector, loginSelector, oneBookSelector } from '../../selectors';
import { sendBookingData, sendCancelBooking } from '../../store/order';
import { BookingDataProps } from '../../store/order/type';
import { ModalFromState } from '../../types/modal';
import { Button } from '../button';
import { CalendarForm } from '../calendar-form';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Loader } from '../loader';

import closeSrc from './assets/close.png';

import styles from './calendar.module.scss';
import { clearDateOrder } from '../../store/order-date';

const modalCalendar = document.getElementById('modalCalendar') as HTMLElement;

export const Calendar = ({ isOpen, setIsOpen, bookId }: ModalFromState) => {
  const [selectedDate, setSelectedDay] = useState(new Date());
  const { id } = useParams();
  const { book } = useAppSelector(oneBookSelector);
  const { user } = useAppSelector(loginSelector);
  const { dateOrder } = useAppSelector(dateOrderSelector);
  const { isLoadingModal, alertMessage } = useAppSelector(bookingSelector);
  const dispatch = useAppDispatch();
  const bookingId = book.booking?.id ?? '';
  const bookIdUpdate = bookId ?? '';

  console.log('day order', dateOrder);
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

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty },
  } = methods;

  const customerId = book.booking?.customerId;

  const userId = user?.id;

  const onSubmit = (data: BookingDataProps) => {
    dispatch(
      sendBookingData({
        order: data.order,
        dateOrder: dateOrder,
        book: data.book,
        customer: data.customer,
      })
    );
    dispatch(clearDateOrder());
    reset();
  };

  const CancelBooking = () => {
    dispatch(sendCancelBooking({ bookingId, bookIdUpdate }));
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
      {isLoadingModal && <Loader />}
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
            <CalendarForm type='date' selectedDate={selectedDate} selectDate={(date) => setSelectedDay(date)} />
            <Button
              type='submit'
              disabled={customerId === userId || !!dateOrder === false}
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
