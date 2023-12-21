import { Form, Button, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../queries/allQueries";
import { ReviewInput, Movie } from "../types";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { User } from "../types";

const CreateReview = ({ movie }: { movie: Movie }) => {
  const { user }: { user: User | null } = useContext(AuthContext);

  const [reviewsArray, setReviewsArray] = useState<any[]>();

useEffect(() => {
  if (movie.reviews){
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
  }

  const [reviewObj, setReviewObj] = useState<ReviewInput>({
    rating: NaN,
    date: "",
    text: "",
  });

  const [addReview, addReviewResponse] = useMutation(ADD_REVIEW);

  return (
    <div>

      <h2>Add Review</h2>

      <Card className="mt-2 mb-4">
          <h4>Reviews</h4>
          <Card.Body>
            <Card.Text className="text-start">
              {reviewsArray?.map((review, index) => (
                <div key={index}>
                  <p className="lead">Username: {review.user.username}</p>
                  <p className="lead">Date: {review.date}</p>
                  <p className="lead">Rating: {review.text}</p>
                  <p className="lead">Text: {review.rating}</p>
                </div>
              ))}
              
            </Card.Text>
          </Card.Body>
        </Card>

      <Form
        onSubmit={(e) => {
          handleAddReview(e);
        }}
      >
        <br />
        <input
          type="number"
          name="rating"
          placeholder="rating"
          value={reviewObj.rating}
          onChange={(evt) => {
            setReviewObj({ ...reviewObj, rating: parseInt(evt.target.value) });
          }}
        />
        <br />
        <input
          type="date"
          name="date"
          placeholder="date"
          value={reviewObj.date}
          onChange={(evt) => {
            setReviewObj({ ...reviewObj, date: evt.target.value });
          }}
        />
        <br />
        <input
          type="text"
          name="text"
          placeholder="text"
          value={reviewObj.text}
          onChange={(evt) => {
            setReviewObj({ ...reviewObj, text: evt.target.value });
          }}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Button type="submit" onClick={handleAddReview}>
          Add Review
        </Button>
      </Form>
    </div>
  );
};

export default CreateReview;
