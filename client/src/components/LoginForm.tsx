import {useContext, useState} from "react"
import { AuthContext } from "../context/authContext"
import { useForm } from "../utility/hooks";
import { useNavigate } from "react-router-dom"
import { useMutation } from "@apollo/client";
import {LOGIN_USER} from "../queries/allQueries";

const LoginForm = (props:any) => {
    let navigate = useNavigate();
    const context = useContext(AuthContext);
    const [errors, setErrors] =  useState([]);

    const loginUserCallback = () => {
        console.log("Callback hit")
        console.log(values)
        loginUser();
    }

    const {onChange, onSubmit, values}= useForm(
        loginUserCallback, {
        username: "",
        password: "",
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(proxy, { data: { loginUser: userData } }) {
    
            context.login(userData);
            navigate('/');
        },
        onError(error) {
            console.log(error);
        },
        variables: {
            username: values.username,
            password: values.password,
        }
        
    });

  return (
    
      <div>

<h2>Login</h2>

<form onChange={onChange} >
<div className="text-end">
  <input type="text" className="form-control-sm mx-1" id="username" name="username" placeholder="Brugernavn" />
  <input type="password" className="form-control-sm mb-2" id="password" name="password" placeholder="Adgangskode" />

  <br />
  <button type="submit" className="btn btn-sm greenBg whiteTekst mx-1" onClick={onSubmit}>Login</button>

</div>
{/* Once again we dont handle errors correctly so this doesnt work, but leaving it here for reference - should give alert on wrong password or username */}
{errors.length > 0 &&
errors.map((error, index) => (
  <div className="alert alert-danger" key={index} role="alert">
    {error}
  </div>
))}
</form >


</div>
    
  )
}

export default LoginForm
