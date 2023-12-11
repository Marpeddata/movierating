import mongoose from "mongoose";
import { User } from "../types";

const userSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    collection: "users",
  }
);

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;