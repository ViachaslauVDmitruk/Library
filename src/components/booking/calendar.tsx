/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { bookingSelector, dateOrderSelector, loginSelector, oneBookSelector } from '../../selectors';
import { sendBookingData } from '../../store/order';
import { BookingDataProps } from '../../store/order/type';

import { Button } from '../button';
import { CalendarForm } from '../calendar-form';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Loader } from '../loader';

import closeSrc from './assets/close.png';

import styles from './calendar.module.scss';
import { ModalFromState } from '../../types/modal';

const modalCalendar = document.getElementById('modalCalendar') as HTMLElement;

export const Calendar = ({ isOpen, setIsOpen, bookId }: ModalFromState) => {
  const [selectedDate, setSelectedDay] = useState(new Date());
  const { id } = useParams();
  const { book } = useAppSelector(oneBookSelector);
  const { user } = useAppSelector(loginSelector);
  const { dateOrder } = useAppSelector(dateOrderSelector);
  const { isLoadingModal, alertMessage } = useAppSelector(bookingSelector);
  const dispatch = useAppDispatch();

  const methods = useForm<BookingDataProps>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      order: true,
      dateOrder: dateOrder,
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

  const onSubmit = (data: BookingDataProps) => {
    dispatch(
      sendBookingData({
        order: data.order,
        dateOrder: data.dateOrder,
        book: data.book,
        customer: data.customer,
      })
    );
    reset();
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
              Выбор даты <br /> бронирования
            </div>
            <CalendarForm type='date' selectedDate={selectedDate} selectDate={(date) => setSelectedDay(date)} />
            <Button type='submit' buttonText='Забронировать' passStyle={styles.button} id='booking-button' />
            <Button
              type='submit'
              buttonText='Забронировать'
              passStyle={classNames(styles.button, styles.cancel)}
              id='booking-cancel-button'
            />
          </form>
        </div>
      </div>
    </FormProvider>,
    modalCalendar
  );
};
