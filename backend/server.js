const app = require("./app");
const connectDatabase = require("./config/database");

const cloudinary = require("cloudinary").v2;
//const dotenv = require("dotenv");

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down due to uncaught exception");
  process.exit(1);
});

//setting up config file
if (process.env.NODE_ENV === "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" });

// Connecting to database

connectDatabase();

// Setting up cloudinary config
cloudinary.config({
  cloud_name: "first-mern-project",
  api_key: "814697546669288",
  api_secret: "33KKRfx9JVeKW4zERnO4MBBqvks",
});

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

// Handle Unhandled Promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log("Shutting down server due to unhandled promise rejection");
  server.close(() => process.exit(1));
});
