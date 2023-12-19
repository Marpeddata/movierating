import { useQuery } from "@apollo/client";
import { GET_ALL_MOVIES } from "../queries/allQueries";
import "../styles/App.css";
import { Movie } from "../types";

const AllMovies = () => {
  const { loading, error, data } = useQuery(GET_ALL_MOVIES);

  return (
    <>
      <h1>Movie Rating</h1>
      <ul>
        {data?.movies.map((movie: Movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </>
  );
};

export default AllMovies;
