import room from "../backend/models/room";
import mongoose from "mongoose";
import { rooms } from "./data";

const seedRooms = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/bookit");

    await room.deleteMany();
    console.log("Rooms are deleted");

    await room.insertMany(rooms);
    console.log("Rooms are added");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

seedRooms();
