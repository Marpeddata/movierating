import { ObjectId } from "mongodb";
import movieModel from "../models/movieModel";
import reviewModel from "../models/reviewModel";
import genreModel from "../models/genreModel";
import userModel from "../models/userModel";

export default {
  movies: async () => {
    const movies = await movieModel.find().populate(["genre", "reviews"]);
    return movies;
  },
  //the argument list takes: async (parent, args, context) args is the id, if only the args arguemtn is needed, the parent still needs to be parsed. _:any is a common way to state that the parent arguemtn is not needed, while still defining it.
  //Had issues with this syntax for a few hours since I was trying to pass async (id: String) leaving the return on the query as "undefined".
  movie: async (_: any, { id }: ObjectId) => {
    console.log(id);
    const mov = await movieModel.findById(id).populate(["genre", "reviews"]);
    return mov;
  },
  reviews: async () => {
    const reviews = await reviewModel.find().populate(["movies", "reviews"]);
    return reviews;
  },
  review: async (_: any, { id }: ObjectId) => {
    const review = await reviewModel.findById(id).populate(["movies", "reviews"]);
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
    const users = await userModel.find().populate("reviews");
    return users;
  },
  user: async (_: any, { id }: ObjectId) => {
    const user = await userModel.findById(id).populate("reviews");
    return user;
  },
};
