import { ObjectId } from "mongodb";

type Movie = {
  id: ObjectId;
  title: string;
  year: number;
  director: string;
  description: string;
  actors: string[];
  genre: ObjectId;
  reviews: ObjectId[];
};

type Review = {
  id: string;
  rating: string;
  date: Date;
  text: string;
  movie: ObjectId;
  user: ObjectId;
};

type Genre = {
  id: ObjectId;
  type: string;
  movies: ObjectId[];
};

type User = {
  id: ObjectId;
  username: string;
  password: string;
  role: string;
  reviews: ObjectId[];
}

export type { Movie, Review, Genre, User };
