import mongoose, { Schema, Document } from "mongoose";

export interface IImage extends Document {
  public_id: string;
  url: string;
}

export interface IReview extends Document {
  user: mongoose.Schema.Types.ObjectId;
  rating: number;
  comment: string;
}

export interface ILoction {
  type: string;
  coordinates: number[];
  formattedAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface IRoom extends Document {
  name: string;
  description: string;
  pricePerNight: number;
  address: string;
  location: ILoction;
  guestCapacity: number;
  numOfBeds: number;
  isInternet: boolean;
  isBreakfast: boolean;
  isAirCondition: boolean;
  isPetsAllowed: boolean;
  isRoomCleaning: boolean;
  ratings: number;
  numOfReviews: number;
  images: IImage[];
  category: string;
  reviews: IReview[];
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}
const roomSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter a room name"],
    trim: true,
    maxLength: [200, "Room name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter a room description"],
  },
  pricePerNight: {
    type: Number,
    required: [true, "Please enter a room price per night"],
    default: 0.0,
  },
  address: {
    type: String,
    required: [true, "Please enter a room address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],

      index: "2dsphere",
    },
    formattedAddress: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  guestCapacity: {
    type: Number,
    required: [true, "Please enter a room guest capacity"],
  },
  numOfBeds: {
    type: Number,
    required: [true, "Please enter number of beds in room"],
  },
  isInternet: {
    type: Boolean,
    default: false,
  },
  isBreakfast: {
    type: Boolean,
    default: false,
  },
  isAirCondition: {
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
    type: [Number],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
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
    required: [true, "Please select a room category"],
    enum: {
      values: ["King", "Single", "Twins"],
      message: "Please select correct room category",
    },
  },
  reviews: [
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
