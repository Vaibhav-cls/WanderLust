if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL =
  "mongodb+srv://vaibhavghanekar14:wSyiYstMTSgrANeg@wanderlust.s8aig.mongodb.net/";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}
const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "67bc2c8e6425cb7a42acde63",
  }));
  await Listing.insertMany(initData.data);
  console.log("Data was initialized");
};

initDB();
