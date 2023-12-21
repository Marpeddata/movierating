import { Container, Row, Col, Card } from "react-bootstrap";
import { Movie } from "../types";
import CreateReview from "./CreateReview";

const MovieDetails = ({ movie }: { movie: Movie }) => {
  return (
    <div>
      <Container>
        <Row>
          <Col md={8}>
            <div className="display-6 mt-4 mb-3 text-start">
              {movie.title} ({movie.year})
            </div>
            <div className="text-start">
              <p className="lead">Genre: {movie.genre.type}</p>
              <p className="lead">Year: {movie.year}</p>
              <p className="lead">Director: {movie.director}</p>
              <p className="lead">
                Actors:
                {movie.actors.map((actor, index) => (
                  <span key={index}> {actor}, </span>
                ))}
              </p>
              <p className="lead">Description: {movie.description}</p>
            </div>
          </Col>
          <Col
            md={4}
            className="
          d-flex
          align-items-center
          justify-content-center
          mt-4
          mb-4
          text-end
          "
          >
            <div className="text-end">
              <Card.Img
                style={{ width: "60%" }}
                variant="top"
                src={movie.url}
              />
            </div>
          </Col>
        </Row>
        <CreateReview movie={movie} />
      </Container>
    </div>
  );
};

export default MovieDetails;
