import { Container, Table } from "react-bootstrap";
import { GET_ALL_REQUESTS, DELETE_REQUEST } from "../queries/allQueries";
import { useQuery, useMutation } from "@apollo/client";
import { Request } from "../types";
import { useState } from "react";

const AdminRequests = () => {
  const { loading, error, data } = useQuery(GET_ALL_REQUESTS);
  const [request_id, setRequest_id] = useState("");

  const [deleteRequest, deleteRequestResponse] = useMutation(DELETE_REQUEST, {
    variables: { deleteRequestId: request_id }, // Use deleteRequestId here
    refetchQueries: [{ query: GET_ALL_REQUESTS }],
  });

  function handleDeleteRequest(e: any) {
    e.preventDefault();

    deleteRequest({
      variables: {
        deleteRequestId: e.target.value,
      },
    });
  }

  return (
    <div>
      <div className="display-6 mt-4">Admin Requests</div>
      <Container className="d-flex justify-content-center shadow-sm p-3 my-5 bg-white rounded">
        <Table striped bordered hover className="text-start">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Title</th>
              <th>Year</th>
              <th>Director</th>
              <th>Comment</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.requests.map((request: Request, index: number) => (
              <tr key={request.id || index}>
                <td>{index + 1}</td>
                <td>{request.username}</td>
                <td>{request.title}</td>
                <td>{request.year}</td>
                <td>{request.director}</td>
                <td>{request.comment}</td>
                <td>
                  <div className="text-center">
                    <button
                      className="btn btn-danger"
                      value={request.id}
                      onClick={(e) => {
                        handleDeleteRequest(e);
                        console.log("request.Id:");
                        console.log(request.id);
                      }}
                    >
                      Slet
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AdminRequests;
