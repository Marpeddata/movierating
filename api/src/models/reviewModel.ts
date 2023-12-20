import mongoose from "mongoose";
import { Review } from "../types";

const reviewSchema = new mongoose.Schema<Review>(
  {
    rating: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
    
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  {
    collection: "reviews",
  }
);

const reviewModel = mongoose.model<Review>("Review", reviewSchema);

export default reviewModel;
