import { useQuery } from "@apollo/client";
import { GET_REVIEW_BY_USER_ID } from "../queries/allQueries";
import "../styles/App.css";
import { Review, User } from "../types";
import { Card, Row, Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const UsersReviews = () => {
  const { user }: { user: User | null } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_REVIEW_BY_USER_ID, {
    variables: { userId: user!.id },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="display-6 mt-4">Hi {data?.user.username}! 😄</div>
      <p className="lead mt-2 mb-5">Here are all your reviews </p>
      <Row>
        {data?.user.reviews.map((review: Review) => (
          <Col key={review.id} sm={6} md={4} lg={3}>
            <Card>
              <Card.Body>
                <Card.Title>{review.movie.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {review.movie.director} ({review.movie.year})
                </Card.Subtitle>
                <Card.Text>"{review.text}"</Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Rating: {review.rating}</ListGroup.Item>
                <ListGroup.Item>Date: {review.date}</ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default UsersReviews;
