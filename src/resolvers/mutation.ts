import { Movie, Review } from "../types";
import { ObjectId } from "mongodb";
import MovieModel from "../models/movieModel";
import ReviewModel from "../models/reviewModel";
import GenreModel from "../models/genreModel";

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
      rating: args.rating,
      date: args.date,
      text: args.text,
      movie: args.movie,
    });
    console.log(newReview);
    await newReview.save();
    return newReview.populate("movies");
  },

  deleteMovie: async (_: any, { id }: ObjectId) => {
    if (await MovieModel.findById(id)) {
      const movie = await MovieModel.findById(id);
      if (movie?.reviews.length !== -1) {
        movie?.reviews.forEach(async (review) => {
          const rev = await ReviewModel.findOne({ _id: review });
          rev?.movie.splice(rev?.movie.indexOf(movie.id), 1);
          rev?.save();
        });
      } else {
      }
      await MovieModel.findByIdAndDelete(movie?.id);
      return true;
    } else {
      return false;
    }
  },
};
