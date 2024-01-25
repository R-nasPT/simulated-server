import mongoose, { ConnectOptions } from "mongoose";

// interface MyConnectOptions extends ConnectOptions {
//   useNewUrlParser?: boolean;
//   useUnifiedTopology?: boolean;
//   // Add any other options you want to include here
// }

const connectDB = async () => {
  try {
    // const options: MyConnectOptions = {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // };

    const databaseURL = process.env.DATABASE_URL;

    if (!databaseURL) {
      throw new Error("DATABASE_URL is not defined");
    }

    // await mongoose.connect(databaseURL, options);
    await mongoose.connect(databaseURL);
    console.log("===== MongoDB connected =====");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};  

export default connectDB;
