"use client";

import { IRoom } from "@/backend/models/room";
import { calculateDaysOfStay } from "@/helpers/helpers";
import {
  useGetBookedDatesQuery,
  useLazyCheckBookingAvailabilityQuery,
  useLazyStripeCheckoutQuery,
  useNewBookingMutation,
} from "@/redux/api/bookingApi";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ButtonLoader from "../layout/ButtonLoader";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

interface Props {
  room: IRoom;
}

const BookingDatePicker = ({ room }: Props) => {
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [daysOfStay, setDaysOfStay] = useState(0);

  const router = useRouter();

  const [newBooking] = useNewBookingMutation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [checkBookingAvailability, { data }] =
    useLazyCheckBookingAvailabilityQuery();
  const isAvailable = data?.isAvailable;

  const { data: { bookedDates: dates } = {} } = useGetBookedDatesQuery(
    room._id
  );
  const excludeDates = dates?.map((date: string) => new Date(date)) || [];

  const onChange = (dates: any) => {
    const [checkInDate, checkOutDate] = dates;

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      const days = calculateDaysOfStay(checkInDate, checkOutDate);

      checkBookingAvailability({
        id: room._id,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
      });
      setDaysOfStay(days);
    }
  };

  const [stripeCheckout, { error, isLoading, data: checkoutData }] =
    useLazyStripeCheckoutQuery();

  useEffect(() => {
    if (error && "data" in error) {
      // toast.error(error?.data.errMessage);
    }

    if (checkoutData) {
      router.replace(checkoutData.url);
    }
  }, [error, checkoutData]);

  const bookRoom = () => {
    const amount = room.pricePerNight * daysOfStay;

    const checkoutData = {
      checkInDate: checkInDate.toISOString(),
      checkOutDate: checkOutDate.toISOString(),
      daysOfStay,
      amount,
    };

    stripeCheckout({ id: room?._id, checkoutData });
  };

  // const bookRoom = () => {
  //   const bookingData = {
  //     room: room?._id,
  //     checkInDate,
  //     checkOutDate,
  //     daysOfStay,
  //     amountPaid: room.pricePerNight * daysOfStay,
  //     paymentInfo: {
  //       id: "STRIPE_ID",
  //       status: "PAID",
  //     },
  //   };
  //   newBooking(bookingData);
  // };

  return (
    <div className="booking-card shadow p-4 mb-5">
      <p className="price-per-night">
        <b>${room.pricePerNight}</b> / Night
      </p>
      <hr />
      <p className="mt5 mb-3">Pick Check & Check out Date</p>

      <DatePicker
        className="w-100`"
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
        <div className="alert alert-success my-3">
          Room is avalable.Book now.
        </div>
      )}
      {isAvailable === false && (
        <div className="alert alert-danger my-3">
          Sorry! Room is not available. Try different Dates
        </div>
      )}
      {isAvailable && !isAuthenticated && (
        <div className="alert alert-danger my-3">Login First to book room</div>
      )}

      {isAvailable && isAuthenticated && (
        <button
          className="btn py-3 form-btn w-100"
          onClick={bookRoom}
          disabled={isLoading}
        >
          {isLoading ? (
            <ButtonLoader />
          ) : (
            `Pay -  $${daysOfStay * room?.pricePerNight}`
          )}
        </button>
      )}
    </div>
  );
};

export default BookingDatePicker;
