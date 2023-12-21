import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../queries/allQueries";
import { Container, Button } from "react-bootstrap";

const RegisterForm = (props: any) => {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  //currently we're not handling errors
  const [errors, setErrors] = useState([]);

  const registerUserCallback = () => {
    console.log("Callback hit");
    console.log(values);
    registerUser();
  };

  const { onChange, onSubmit, values, error } = useForm(registerUserCallback, {
    username: "",
    password: "",
  });

  const [registerUser, { loading }] = useMutation(ADD_USER, {
    update(proxy, { data: { createUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError(error) {
      console.log(error);
    },
    variables: {
      username: values.username,
      password: values.password,
      confirmPassword: values.confirmPassword,
    },
  });

  return (
    <>
      <Container className=" shadow min-vh-100 py-2 pt-4">
        <p className="display-6 mb-5"> Register user </p>
        <div className="container mt-3">
          <div className="row d-flex justify-content-center">
            <div className="col-md-6">
              <div className="card px-5 py-5" id="form1">
                <form onChange={onChange}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="Username"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Password"
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div className="text-center">
                    <Button
                      type="submit"
                      value="register"
                      className="btn btn-sm greenBg whiteTekst mx-1"
                      onClick={onSubmit}
                    >
                      Register
                    </Button>
                  </div>
                  {/* Once again we dont handle errors correctly so this doesnt work, but leaving it here for reference - should give alert on wrong password or username */}
                  {error !== "" ?
                     
                      <div
                        className="alert alert-danger"
                        role="alert"
                      >
                        {error} test
                      </div> :
                      null
                    }
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default RegisterForm;
