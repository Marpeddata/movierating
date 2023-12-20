import mongoose from "mongoose";
import { User } from "../types";


const userSchema = new mongoose.Schema<User>(
  {
    username: {type: String, unique: true, default: null},
    password: {type: String },
    token: {type: String},
    role: {type: String, default: "user"},
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;