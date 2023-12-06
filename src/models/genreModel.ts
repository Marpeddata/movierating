import mongoose from "mongoose";
import { Genre } from "../types";

const genreSchema = new mongoose.Schema<Genre>(
  {
    type: {
      type: String,
      required: true,
    },
    movies: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    },
  },
  {
    collection: "genres",
  }
);

const genreModel = mongoose.model<Genre>("Genre", genreSchema);

export default genreModel;
