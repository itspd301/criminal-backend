const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fname: String,
  monumber: Number,
  email: String,
  password: String,
});

const UserS = mongoose.model("user", userSchema);

const criminalSchema = mongoose.Schema({
  SrNo: String,
  UniqueNo: String,
  FName: String,
  LName: String,
  Crime: String,
  Gender: String, 
  Age: Number,
  Group: String,
});

const Criminal = mongoose.model("criminal", criminalSchema);

module.exports = { UserS, Criminal };
