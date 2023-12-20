import { Container, Col, Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { SEND_REQUEST } from "../queries/allQueries";
import { GET_ALL_REQUESTS } from "../queries/allQueries";
import { useState } from "react";

const SendRequest = () => {
  const [sendRequest, sendRequestResponse] = useMutation(SEND_REQUEST);
  const [showAlert, setShowAlert] = useState(false);

  const [requestObj, setRequestObj] = useState({
    title: "",
    year: NaN,
    director: "",
    comment: "",
    username: "",
  });

  function handleSendRequest(e) {
    // DETTE SKAL IKKE VÆRE HARDCODET
    e.preventDefault();
    requestObj.username = "israa";

    sendRequest({
      variables: {
        title: requestObj.title,
        year: requestObj.year,
        director: requestObj.director,
        comment: requestObj.comment,
        username: requestObj.username,
      },
    });
    setRequestObj({
      title: "",
      year: NaN,
      director: "",
      comment: "",
      username: "",
    });

    setShowAlert(true);
  }

  return (
    <div>
      <Container className="d-flex justify-content-center shadow-sm p-3 my-5 bg-white rounded">
        <Col md={3}></Col>
        <Col>
          <h1 className="display-6">Send a movie request</h1>
          <p className="lead">
            Can't find a movie? Send a request and we will add it to the
            webpage! :-)
          </p>

          <Container className="d-flex justify-content-center shadow-lg p-3 my-5 bg-white rounded">
            <br />
            <Form onSubmit={(e) => handleSendRequest(e)}>
              <Form.Group className="mb-3 mt-3" controlId="formBasicTitle">
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={requestObj.title}
                  onChange={(evt) => {
                    setRequestObj({ ...requestObj, title: evt.target.value });
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDirector">
                <Form.Control
                  type="text"
                  placeholder="Enter director"
                  value={requestObj.director}
                  onChange={(evt) => {
                    setRequestObj({
                      ...requestObj,
                      director: evt.target.value,
                    });
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicYear">
                <Form.Control
                  type="number"
                  placeholder="Enter year"
                  value={requestObj.year}
                  onChange={(evt) => {
                    setRequestObj({
                      ...requestObj,
                      year: parseInt(evt.target.value),
                    });
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicComment">
                <Form.Control
                  type="text"
                  placeholder="Comment"
                  value={requestObj.comment}
                  onChange={(evt) => {
                    setRequestObj({ ...requestObj, comment: evt.target.value });
                  }}
                />
              </Form.Group>

              <Button variant="success" type="submit">
                Submit
              </Button>
              {showAlert ? (
                <div className="alert alert-success mt-4" role="alert">
                  Your request has been sent!
                </div>
              ) : null}
            </Form>
          </Container>
        </Col>
        <Col md={3}></Col>
      </Container>
    </div>
  );
};

export default SendRequest;
