type Movie = {
  id?: string;
  title: string;
  year: number;
  director: string;
  description: string;
  actors: string[];
  genre: string;
  reviews?: string[];
};

type Genre = {
  id: string;
  type: string;
};

export type { Movie, Genre };
