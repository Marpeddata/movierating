import { Container, Row, Col, Card } from "react-bootstrap";
import { Movie } from "../types";
import CreateReview from "./CreateReview";

const MovieDetails = ({ movie }: { movie: Movie }) => {

  console.log("movie id:" + movie.id);
  console.log("movie title:" + movie.title);
  console.log("movie year:" + movie.year);
  console.log("movie genre:" + movie.genre.type);
  console.log("movie director:" + movie.director);
  console.log("movie actors:" + movie.actors);
  console.log("movie description:" + movie.description);
  console.log("movie reviews:" + movie.reviews);

  return (
    <div>
      <Container>
        <Row>
          <Col md={8}>
            <h3 className="mt-4 mb-3 text-start">
              {movie.title} ({movie.year})
            </h3>
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
                src={
                  "https://c8.alamy.com/comp/2JH2MYR/robbinsposter-the-shawshank-redemption-1994-2JH2MYR.jpg"
                }
              />
            </div>
          </Col>
        </Row>

        <Card className="mt-2 mb-4">
          <h4>Reviews</h4>
          <Card.Body>
            <Card.Text className="text-start">
              {movie.reviews?.map((review, index) => (
                <div key={index}>
                  <p className="lead">Username: {review.user.username}</p>
                  <p className="lead">Date: {review.date}</p>
                  <p className="lead">Rating: {review.text}</p>
                  <p className="lead">Text: {review.rating}</p>
                </div>
              ))}
              <CreateReview movie={movie} />
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default MovieDetails;
