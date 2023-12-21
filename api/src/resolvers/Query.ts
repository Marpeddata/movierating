import { ObjectId } from "mongodb";
import movieModel from "../models/movieModel";
import reviewModel from "../models/reviewModel";
import genreModel from "../models/genreModel";
import userModel from "../models/userModel";
import requestModel from "../models/requestModel";

export default {
  movies: async () => {
    const movies = await movieModel
      .find()
      .populate(["genre", { path: "reviews", populate: { path: "user" } }]);
    return movies;
  },
  movie: async (_: any, { id }: ObjectId) => {
    console.log(id);
    const mov = await movieModel
      .findById(id)
      .populate(["genre", { path: "reviews", populate: { path: "user" } }]);
    return mov;
  },
  reviews: async () => {
    const reviews = await reviewModel.find().populate(["movie", "user"]);
    return reviews;
  },
  review: async (_: any, { id }: ObjectId) => {
    const review = await reviewModel.findById(id).populate(["movie", "user"]);
    return review;
  },
  genres: async () => {
    const genres = await genreModel.find().populate("movies");
    return genres;
  },
  genre: async (_: any, { id }: ObjectId) => {
    const genre = await genreModel.findById(id).populate("movies");
    return genre;
  },
  users: async () => {
    const users = await userModel.find().populate({ path: "reviews", populate: { path: "movie" , populate: { path: "genre" }} });
    return users;
  },
  user: async (_: any, { id }: ObjectId) => {
    const user = await userModel.findById(id).populate({
      path: "reviews",
      populate: { path: "movie", populate: { path: "genre" } },
    });
    return user;
  },
  requests: async () => {
    const requests = await requestModel.find();
    return requests;
  },
};
