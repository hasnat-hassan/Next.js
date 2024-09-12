require("dotenv").config({ path: "next.config.js" });
import Room from "../backend/models/room";
import mongoose from "mongoose";
import { rooms } from "./data";

const seedRooms = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://hasnatrevnix:aDfqcMrfKVUAkChH@bookit.cv6h0.mongodb.net/?retryWrites=true&w=majority&appName=bookit"
    );

    await Room.deleteMany();
    console.log("Rooms are deleted");

    await Room.insertMany(rooms);
    console.log("Rooms are added");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

seedRooms();
