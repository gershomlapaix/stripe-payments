const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  names: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Provide a valid email"],
  },
  password: {
    type: String,
    minLength: 8,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  phone: {
    type: String,
    required: true,
    minlength: 11,
  },
});

// First of all, hash the password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.isNew) return next(); // it it's not the new document

  this.password = await bcrypt.hash(this.password, 10); // generate a hash for password
});

// compare the password with the incoming ones => attached function to the mongo db documents
userSchema.methods.correctPassword = async function (
  existingPassword,
  incomingPassword
) {
  return await bcrypt.compare(incomingPassword, existingPassword);
};

// create the model
const User = mongoose.model("users", userSchema);
module.exports = User;
