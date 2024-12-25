import mongoose from "mongoose";

// Gets the name of the URI from the environment variabled
const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  // 0 = disconnected
  // 1 = connected
  // 2 = connecting
  // 3 = disconnecting
  // 99 = uninitialized


  if (connectionState === 1) return; // Already connected
  if (connectionState === 2) return; // Already connected

  try {
    await mongoose.connect(MONGODB_URI!, {
      dbName: "KeepFit", // From Mongo.
      bufferCommands: false,
    });
    // Successfully connected to the database
    console.log("Connected successfully!!");
  } catch (err) {
    // Else there was an error connecting to the db, could be network or anything
    console.log("Error from DB connection", err);
    throw new Error("Error connecting");
  }
};

export default connect;
