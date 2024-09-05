"use client";

import { IRoom } from "@/backend/models/room";
import { calculateDaysOfStay } from "@/helpers/helpers";
import {
  useGetBookedDatesQuery,
  useLazyCheckBookingAvailabilityQuery,
  useNewBookingMutation,
} from "@/redux/api/bookingApi";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  room: IRoom;
}

const BookingDatePicker = ({ room }: Props) => {
  const [checkInDate, setcheckInDate] = useState(new Date());
  const [checkOutDate, setcheckOutDate] = useState(new Date());
  const [daysOfStay, setDaysOfStay] = useState(0);

  const [newBooking] = useNewBookingMutation();

  const [checkBookingAvailability, { data }] =
    useLazyCheckBookingAvailabilityQuery();

  const isAvailable = data?.isAvailable;

  const { data: { bookedDates: dates } = {} } = useGetBookedDatesQuery(
    room._id
  );

  const excludeDates = dates?.map((date: string) => new Date(date)) || [];

  const onChange = (dates: Date[]) => {
    const [checkInDate, checkOutDate] = dates;

    setcheckInDate(checkInDate);
    setcheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      const days = calculateDaysOfStay(checkInDate, checkOutDate);
      setDaysOfStay(days);

      // check Room availability
      checkBookingAvailability({
        id: room._id,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
      });
    }
  };

  const bookRoom = () => {
    const bookingData = {
      room: room?._id,
      checkInDate,
      checkOutDate,
      daysOfStay,
      amountPaid: room.pricePerNight * daysOfStay,
      paymentInfo: {
        id: "STRIPE_ID",
        status: "PAID",
      },
    };
    newBooking(bookingData);
  };

  return (
    <div className="booking-card shadow p-4">
      <p className="price-per-night">
        <b>${room?.pricePerNight}/night</b>
      </p>
      <hr />
      <p className="mt-5 mb-3">Pick Check In & Check Out Date</p>
      <DatePicker
        className="w-100"
        selected={checkInDate}
        onChange={onChange}
        startDate={checkInDate}
        endDate={checkOutDate}
        minDate={new Date()}
        excludeDates={excludeDates}
        selectsRange
        inline
      />

      {isAvailable === true && (
        <div className="alert alert-success mt-3">
          Room is available.Book now.
        </div>
      )}
      {isAvailable === false && (
        <div className="alert alert-danger mt-3">
          Room not available. Try Different dates.
        </div>
      )}

      <button className="btn py-3 form-btn w-100" onClick={bookRoom}>
        Pay
      </button>
    </div>
  );
};

export default BookingDatePicker;
