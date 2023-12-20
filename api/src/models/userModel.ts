import mongoose from "mongoose";
import { User } from "../types";
import bcrypt from "bcrypt";

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

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    // if password is not modified, then do nothing
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password);
  next();
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
