import { Form, Button,  } from "react-bootstrap";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../queries/allQueries";
import { ReviewInput, Movie } from "../types";

const CreateReview = ({ movie }: { movie: Movie }) => {

  function handleAddReview(e: any) {
    e.preventDefault();
    addReview({
      variables: {
        rating: reviewObj.rating,
        date: reviewObj.date,
        text: reviewObj.text,
        movie: movie.id,
        user: "6580d3f5ff6a41872f3d6b92",
      },
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
          type="text"
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
