import React from "react";
import { Container } from "react-bootstrap";
import { GET_ALL_REQUESTS } from "../queries/allQueries";
import { useQuery } from "@apollo/client";
import { Request } from "../types";

const AdminRequests = () => {
  const { loading, error, data } = useQuery(GET_ALL_REQUESTS);
  const requests: Request[] = [];
  requests.push(data?.request);

  return (
    <div>
      <Container className="d-flex justify-content-center shadow-sm p-3 my-5 bg-white rounded">
        <h1>Admin Requests</h1>

        {data?.request.map((request: Request) => {
          return (
            <Container className="d-flex justify-content-center shadow-sm p-3 my-5 bg-white rounded">
              <h1>{request.title}</h1>
              <h1>{request.year}</h1>
              <h1>{request.director}</h1>
              <h1>{request.comment}</h1>
              <h1>{request.username}</h1>
            </Container>
          );
        })}
      </Container>
    </div>
  );
};

export default AdminRequests;
