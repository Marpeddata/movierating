import { Container, Table } from "react-bootstrap";
import { GET_ALL_REQUESTS } from "../queries/allQueries";
import { useQuery } from "@apollo/client";
import { Request } from "../types";

const AdminRequests = () => {
  const { loading, error, data } = useQuery(GET_ALL_REQUESTS);

  console.log("data", data);

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
              <tr key={request.id}>
                <td>{index + 1}</td>
                <td>{request.username}</td>
                <td>{request.title}</td>
                <td>{request.year}</td>
                <td>{request.director}</td>
                <td>{request.comment}</td>
                <td>
                  <div className="text-center">
                    <button className="btn btn-danger">Slet</button>
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
