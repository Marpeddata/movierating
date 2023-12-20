import { Movie, Review, User, Request } from "../types";
import { ObjectId } from "mongodb";
import MovieModel from "../models/movieModel";
import ReviewModel from "../models/reviewModel";
import GenreModel from "../models/genreModel";
import UserModel from "../models/userModel";
import RequestModel from "../models/requestModel";

export default {
  createMovie: async (_parent: any, args: Movie) => {
    console.log(args);
    const newMovie = new MovieModel({
      id: new ObjectId(),
      title: args.title,
      year: args.year,
      director: args.director,
      description: args.description,
      actors: args.actors,
      genre: args.genre,
      reviews: [],
    });
    console.log(newMovie);

    const gen = await GenreModel.findOne({ _id: args.genre });
    gen?.movies.push(newMovie.id);
    gen?.save();

    await newMovie.save();
    return newMovie.populate("genre");
  },
  createReview: async (_parent: any, args: Review) => {
    console.log(args);
    const newReview = new ReviewModel({
      id: new ObjectId(),
      rating: args.rating,
      date: args.date,
      text: args.text,
      movie: args.movie,
      user: args.user,
    });

    const usr = await UserModel.findOne({ _id: args.user });
    usr?.reviews.push(newReview.id);
    usr?.save();

    const movie = await MovieModel.findOne({ _id: args.movie });
    movie?.reviews.push(newReview.id);
    movie?.save();

    console.log(newReview);
    await newReview.save();
    return newReview.populate(["movie", "user"]);
  },

  deleteMovie: async (_: any, { id }: ObjectId) => {
    if (await MovieModel.findById(id)) {
      const movie = await MovieModel.findById(id);
      await MovieModel.findByIdAndDelete(movie?.id);
      return true;
    } else {
      return false;
    }
  },

  createUser: async (_: any, args: User) => {
    console.log(args);
    const newUser = new UserModel({
      id: new ObjectId(),
      username: args.username,
      password: args.password,
      role: "user",
    });
    console.log(newUser);
    await newUser.save();
    return newUser;
  },

  createRequest: async (_: any, args: Request) => {
    console.log(args);
    const newRequest = new RequestModel({
      id: new ObjectId(),
      title: args.title,
      year: args.year,
      director: args.director,
      comment: args.comment,
      username: args.username,
    });
    console.log(newRequest);
    await newRequest.save();
    return newRequest;
  },

  deleteRequest: async (_: any, { id }: ObjectId) => {
    if (await RequestModel.findById(id)) {
      const request = await RequestModel.findById(id);
      await RequestModel.findByIdAndDelete(request?.id);
      return true;
    } else {
      return false;
    }
  },
};
