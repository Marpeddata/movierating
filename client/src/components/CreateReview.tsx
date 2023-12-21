import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../queries/allQueries";
import { ReviewInput, Movie } from "../types";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { User } from "../types";
import { log } from "console";

const CreateReview = ({ movie }: { movie: Movie }) => {
  const { user }: { user: User | null } = useContext(AuthContext);

  const [reviewsArray, setReviewsArray] = useState<any[]>();

  const star = "⭐";

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (movie.reviews) {
      console.log("movie.reviews");
      console.log(movie.reviews);
      setReviewsArray(movie.reviews);
    }
  }, [reviewsArray]);

  function handleAddReview(e: any) {
    e.preventDefault();
    addReview({
      variables: {
        rating: reviewObj.rating,
        date: reviewObj.date,
        text: reviewObj.text,
        movie: movie.id,
        user: user!.id,
      },
    });
    console.log("user!.username");
    console.log(user!.username);
    reviewsArray?.push({
      rating: reviewObj.rating,
      date: reviewObj.date,
      text: reviewObj.text,
      movie: movie.id,
      user: user!.username,
    });
    setReviewObj({
      rating: NaN,
      date: "",
      text: "",
    });

    setShowAlert(true);
  }

  const [reviewObj, setReviewObj] = useState<ReviewInput>({
    rating: NaN,
    date: "",
    text: "",
  });

  const [addReview, addReviewResponse] = useMutation(ADD_REVIEW);

  return (
    <div>
      <hr />
      <Row>
        <Col>
          <Card className="mt-2 mb-4">
            <p className="lead">Reviews</p>
            <Card.Body>
              <Card.Text className="text-start">
                {reviewsArray?.map((review, index) => (
                  <div key={index}>
                    <Card.Title>{review.text}</Card.Title>
                    <p>Date: {review.date}</p>
                    <p>Username: {review.user.username}</p>
                    <p>
                      Rating: {star.repeat(review.rating)} ({review.rating}/10)
                    </p>
                    <hr />
                  </div>
                ))}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          {user ? (
            <Card className="mt-2 mb-4">
              <p className="lead">Create review</p>
              <Form
                onSubmit={(e) => {
                  handleAddReview(e);
                }}
              >
                <Form.Group className="mb-3" controlId="formBasicDirector">
                  <Form.Control
                    type="number"
                    max={10}
                    min={0}
                    placeholder="Enter rating"
                    value={reviewObj.rating}
                    onChange={(evt) => {
                      setReviewObj({
                        ...reviewObj,
                        rating: parseInt(evt.target.value),
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDirector">
                  <Form.Control
                    type="date"
                    placeholder="Enter date"
                    value={reviewObj.date}
                    onChange={(evt) => {
                      setReviewObj({ ...reviewObj, date: evt.target.value });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDirector">
                  <Form.Control
                    type="text"
                    placeholder="Enter comment"
                    value={reviewObj.text}
                    onChange={(evt) => {
                      setReviewObj({ ...reviewObj, text: evt.target.value });
                    }}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="success"
                  onClick={handleAddReview}
                >
                  Add Review
                </Button>

                {showAlert ? (
                  <div className="alert alert-success mt-4" role="alert">
                    Your review has been added!
                  </div>
                ) : null}
              </Form>
            </Card>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

export default CreateReview;
