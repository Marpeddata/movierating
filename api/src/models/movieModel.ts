import mongoose from "mongoose";
import { Movie} from "../types";

const movieSchema = new mongoose.Schema<Movie>(
  {
    url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    actors: {
      type: [String],
      required: true,
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    collection: "movies",
  }
);

const MovieModel = mongoose.model<Movie>("Movie", movieSchema);

export default MovieModel;
