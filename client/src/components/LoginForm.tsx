import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utility/hooks";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../queries/allQueries";
import { Container, Button } from "react-bootstrap";

const LoginForm = (props: any) => {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errorL, setErrorL] = useState("");

  const loginUserCallback = () => {
    
    loginUser();
  };

  const { onChange, onSubmit, values, error } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });


  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError(error) {
      setErrorL(error.message);    
      console.log(errorL);  
    },
    variables: {
      username: values.username,
      password: values.password,
    },
  });

  

  return (
    <div>
      <Container className=" shadow min-vh-100 py-2 pt-4">
        <p className="display-6 mb-5"> Sign in </p>
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
                  <div className="text-center">
                    <Button
                      type="submit"
                      value="log-in"
                      className="btn btn-sm greenBg whiteTekst mx-1"
                      onClick={onSubmit}
                    >
                      Login
                    </Button>
                  </div>
                  
                  
                  {errorL !== "" ?
                     
                      <div
                        className="alert alert-danger"
                        role="alert"
                      >
                        incorrect username or password
                      </div> :
                      null
                    }
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default LoginForm;
