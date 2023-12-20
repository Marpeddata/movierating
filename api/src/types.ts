import { ObjectId } from "mongodb";

type Movie = {
  id: ObjectId;
  title: string;
  year: number;
  director: string;
  description: string;
  actors: string[];
  genre: Genre;
  reviews: Review[];
};

type User = {
  id: ObjectId;
  username: string;
  password: string;
  role: string;
  reviews: Review[];
}

type Review = {
  id: ObjectId;
  rating: string;
  date: string;
  text: string;
  movie: ObjectId;
  user: ObjectId;
};

type Genre = {
  id: ObjectId;
  type: string;
  movies: ObjectId[];
};

export type { Movie, Review, Genre, User };
