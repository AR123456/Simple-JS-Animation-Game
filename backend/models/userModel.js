import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    // in this object define all the user fields
    // data types and required or not
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
// create a model from this schema
const User = mongoose.model("User", userSchema);
// export
export default User;
