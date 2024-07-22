const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: "string",
    required: true,
  },
});
userSchema.plugin(passportLocalMongoose); // it automatically add username,password and salting

module.exports = mongoose.model("User", userSchema);
