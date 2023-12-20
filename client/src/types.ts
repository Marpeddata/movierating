type Movie = {
  id?: string;
  title: string;
  year: number;
  director: string;
  description: string;
  actors: string[];
  genre: Genre;
  reviews?: Review[];
};

type User = {
  id: String;
  username: string;
  password: string;
  role: string;
  reviews: Review[];
};

type Genre = {
  id: string;
  type: string;
};

type Review = {
  id: string;
  rating: string;
  date: String;
  text: string;
  movie: Movie;
  user: User;
};

type Request = {
  id: string;
  title: string;
  year: number;
  director: string;
  comment: string;
  username: string;
};

type ReviewInput = {
  rating: number;
  date: String;
  text: string;
};

export type { Movie, User, Genre, Review, ReviewInput, Request };
