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
}

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

export type { Movie, User, Genre, Review };
