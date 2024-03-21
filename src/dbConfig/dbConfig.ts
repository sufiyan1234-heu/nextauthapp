import mongoose from "mongoose";

export async function connectdb() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    connection.on("error", (err) => {
      console.log(
        "Mongodb connnection error,please make sure db is up and running: " +
          err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something went wrong in connecting to DB", error);
  }
}
