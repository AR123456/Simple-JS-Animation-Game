import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    // created at updated at fields can be created automatically this way
    timestamps: true,
  }
);
// putting method to match the password here
userSchema.methods.matchPassword = async function (enteredPassword) {
  // bcrypt - match the users entered plain text pw with the hashed one in db
  return await bcrypt.compare(enteredPassword, this.password);
};

// create a model from this schema
const User = mongoose.model("User", userSchema);
// export
export default User;
