import { useLocation } from "react-router-dom";
import MovieDetails from "../components/MovieDetails";

const Movie = () => {
  const location = useLocation();

  return (
    <div>
      <MovieDetails movie={location.state.movie} />
    </div>
  );
};

export default Movie;
