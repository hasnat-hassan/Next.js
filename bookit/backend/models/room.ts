import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user";

export interface IImage extends Document {
  public_id: string;
  url: string;
}

export interface IReview extends Document {
  user: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
}
export interface ILocation {
  type: string;
  coordinates: number[];
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
export interface IRoom extends Document {
  name: String;
  description: string;
  pricePerNight: number;
  address: string;
  location: ILocation;
  guestCapacity: number;
  numOfBeds: number;
  isInternet: Boolean;
  isBreakFast: Boolean;
  isAirConditioned: Boolean;
  isPetsAllowed: Boolean;
  isRoomCleaning: Boolean;
  ratings: number;
  numOfReviews: number;
  images: IImage;
  category: string;
  review: IReview[];
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const roomSchema: Schema<IRoom> = new Schema({
  name: {
    type: String,
    required: [true, "Please enter room name"],
    trim: true,
    maxLength: [200, "Room name connot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter room name"],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Please enter room price per night"],
    default: 0.0,
  },
  address: {
    type: String,
    required: [true, "Please enter room address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordintes: {
      type: [Number],
      index: "2dspere",
    },
    formattedAddress: String,
    city: String,
    state: String,
    zipCode: String,
    countery: String,
  },
  guestCapacity: {
    type: Number,
    required: [true, "Please enter room guest capacity"],
  },
  numOfBeds: {
    type: Number,
    required: [true, "Please enter number of beds in room"],
  },
  isInternet: {
    type: Boolean,
    default: false,
  },
  isBreakFast: {
    type: Boolean,
    default: false,
  },
  isAirConditioned: {
    type: Boolean,
    default: false,
  },
  isPetsAllowed: {
    type: Boolean,
    default: false,
  },
  isRoomCleaning: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: Number,
    dafault: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter room category"],
    enum: {
      values: ["King", "Single", "Twins"],
      message: "Please select correct category for room",
    },
  },
  review: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Room ||
  mongoose.model<IRoom>("Room", roomSchema);
