"use client";

import dynamic from "next/dynamic";
import { IRoom } from "@/backend/models/room";
import React from "react";
import StarRatings from "react-star-ratings";
import RoomImageSlider from "./RoomImageSlider";
import RoomFeatures from "./RoomFeatures";
import BookingDatePicker from "./BookingDatePicker";
import ListReviews from "../review/ListReviews";
import NewReview from "../review/NewReview";
// import RoomMap from "./RoomMap";
const RoomMap = dynamic(() => import("./RoomMap"), { ssr: false });

interface Props {
  data: {
    room: IRoom;
  };
}

const RoomDetails = ({ data }: Props) => {
  const { room } = data;

  return (
    <div className="container container-fluid">
      <h2 className="mt-5">{room.name}</h2>
      <p>{room.address}</p>

      <div className="ratings mt-auto mb-3">
        <StarRatings
          rating={room?.ratings}
          starRatedColor="#e61e4d"
          numberOfStars={5}
          starDimension="22px"
          starSpacing="1px"
          name="rating"
        />
        <span className="no-of-reviews">({room?.numOfReviews} Reviews)</span>
      </div>
      <RoomImageSlider images={room?.images} />

      <div className="row my-5">
        <div className="col-12 col-md-6 col-lg-8">
          <h3>Description</h3>
          <p>{room?.description}</p>

          <RoomFeatures room={room} />
        </div>

        <div className="col-12 col-md-6 col-lg-4">
          <BookingDatePicker room={room} />
          <RoomMap room={room} />
        </div>
      </div>

      <NewReview roomId={room?._id} />
      <ListReviews reviews={room?.reviews} />
    </div>
  );
};

export default RoomDetails;
