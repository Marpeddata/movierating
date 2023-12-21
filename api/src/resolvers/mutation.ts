import { Movie, Review, User, Request } from "../types";
import { ObjectId } from "mongodb";
import MovieModel from "../models/movieModel";
import ReviewModel from "../models/reviewModel";
import GenreModel from "../models/genreModel";
import UserModel from "../models/userModel";
import RequestModel from "../models/requestModel";
import * as dotenv from "dotenv";
dotenv.config({ path: "../config.env" });
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default {

  createMovie: async (_parent: any, args: Movie) => {
    console.log(args);
    const newMovie = new MovieModel({
      id: new ObjectId(),
      url: args.url,
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

  createUser: async (_: any, args: User) => {
    const oldUser = await UserModel.findOne({ username: args.username });
    if (oldUser) {
      console.log("user already exists");
    }

    const encryptedPassword = await bcrypt.hash(args.password, 10);

    const newUser = new UserModel({
      id: new ObjectId(),
      username: args.username,
      password: encryptedPassword,
    });

    const token = jwt.sign({ id: newUser.id, username: newUser.username, role: newUser.role }, process.env.JWT_SECRET!,{expiresIn: "2h"})

    newUser.token = token;
    console.log(newUser);
    const res = await newUser.save();
    return res.populate("reviews");
  },

  loginUser: async (_: any, args: User) => {
    const user = await UserModel.findOne({ username: args.username });

    if(user && (await bcrypt.compare(args.password, user.password))) {
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET!,{expiresIn: "2h"})
      user.token = token;
      UserModel.findOneAndUpdate({ username: args.username });
      return user;
    } else {
      console.log("incorrect username or password");
    }
  }
};