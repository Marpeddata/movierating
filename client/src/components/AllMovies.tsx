import { useQuery } from "@apollo/client";
import { GET_ALL_MOVIES } from "../queries/allQueries";
import "../styles/App.css";
import { Movie } from "../types";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AllMovies = () => {
  const { loading, error, data } = useQuery(GET_ALL_MOVIES);
  const movies: Movie[] = [];
  movies.push(data?.movies);

  return (
    <>
      <Container>
        <h2 className="mt-5 mb-5">All Movies</h2>
        {movies.length > 0 && (
          <>
            {data?.movies.map(
              (movie: Movie, index: number) =>
                index % 3 === 0 && (
                  <Row key={index}>
                    {data?.movies
                      .slice(index, index + 3)
                      .map((movieslice: Movie, innerIndex: number) => {
                        const cardIndex = index + innerIndex;

                        return (
                          <Col key={innerIndex} md={4}>
                            <Card className="mb-4">
                              <Card.Body>
                                <Card.Title className="mb-3">
                                  {movieslice.title}
                                </Card.Title>
                                <Card.Text>
                                  {movieslice.genre.type} - {movieslice.year}
                                </Card.Text>

                                <Card.Img
                                  style={{ width: "80%", height: "60%" }}
                                  variant="top"
                                  src={
                                    "https://c8.alamy.com/comp/2JH2MYR/robbinsposter-the-shawshank-redemption-1994-2JH2MYR.jpg"
                                  }
                                />

                                <div className="text-center mt-4 ">
                                  <Link
                                    to={`/movie`}
                                    state={{ movie: movieslice }}
                                  >
                                    <Button variant="warning btn">
                                      View Movie
                                    </Button>
                                  </Link>
                                </div>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      })}
                  </Row>
                )
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default AllMovies;
