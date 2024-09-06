import { NextRequest, NextResponse } from "next/server";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import Bookings, { IBooking } from "../models/bookings";
import Moment from "moment";
import { extendMoment } from "moment-range";
import ErrorHandler from "../utils/errorHandler";

const moment = extendMoment(Moment);

export const newBooking = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const {
    room,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
  } = body;

  const booking = await Bookings.create({
    room,
    user: req.user._id,
    checkInDate,
    checkOutDate,
    daysOfStay,
    amountPaid,
    paymentInfo,
    paidAt: Date.now(),
  });

  return NextResponse.json({
    booking,
  });
});

// Check Room Booking Availability
export const checkRoomBookingAvailablity = catchAsyncErrors(
  async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");

    const checkInDate: Date = new Date(
      searchParams.get("checkInDate") as string
    );
    const checkOutDate: Date = new Date(
      searchParams.get("checkOutDate") as string
    );

    const bookings: IBooking[] = await Bookings.find({
      room: roomId,
      $and: [
        {
          checkInDate: { $lt: checkOutDate }, // Existing booking starts before the desired check-out date
          checkOutDate: { $gt: checkInDate }, // Existing booking ends after the desired check-in date
        },
      ],
    });
    const isAvailable: boolean = bookings.length === 0;
    return NextResponse.json({
      isAvailable,
    });
  }
);

//get Room Booked Date => /api/bookings/get_booked_dates
export const getRoomBookedDates = catchAsyncErrors(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  const bookings = await Bookings.find({ room: roomId });

  const bookedDates = bookings.flatMap((booking) =>
    Array.from(
      moment
        .range(moment(booking.checkInDate), moment(booking.checkOutDate))
        .by("day")
    )
  );

  return NextResponse.json({ bookedDates });
});

// GET Current user booking => /api/bookings/me
export const myBookings = catchAsyncErrors(async (req: NextRequest) => {
  const bookings = await Bookings.find({ user: req.user._id });

  return NextResponse.json({ bookings });
});

// GET booking details => /api/bookings/:id
export const getBookingDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const booking = await Bookings.findById(params.id).populate("user room");
    if (booking.user?._id?.toString() !== req.user._id) {
      throw new ErrorHandler("You can not view this booking", 403);
    }

    return NextResponse.json({
      booking,
    });
  }
);
