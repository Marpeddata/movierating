import { useQuery } from "@apollo/client";
import { GET_REVIEW_BY_USER_ID } from "../queries/allQueries";
import "../styles/App.css";
import { Review } from "../types";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

const UsersReviews = () => {
  const { loading, error, data } = useQuery(GET_REVIEW_BY_USER_ID, {
    variables: { userId: '6580d3f5ff6a41872f3d6b92' },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h1>Hi {data?.user.username}</h1>
      <h3>Here are all your reviews</h3>
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
