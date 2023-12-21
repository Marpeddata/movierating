import {useContext, useState} from "react"
import { AuthContext } from "../context/authContext"
import { useForm } from "../utility/hooks";
import { useNavigate } from "react-router-dom"
import { useMutation } from "@apollo/client";
import {ADD_USER} from "../queries/allQueries";

const RegisterForm = (props: any) => {
const context = useContext(AuthContext);
let navigate = useNavigate();
//currently we're not handling errors
const [errors, setErrors] = useState([]);

const registerUserCallback = () => {
        console.log("Callback hit")
        console.log(values)
        registerUser();
}

const {onChange, onSubmit, values}= useForm(
    registerUserCallback, {
    username: "",
    password: "",
});

const [registerUser, { loading }] = useMutation(ADD_USER, {
    update(proxy, { data: { createUser: userData } }) {
    
        context.login(userData);
        navigate('/');
    },
    onError(error) {

        console.log(error);
       
    },
    variables: {
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword,
    }
})

    return (
    
       <div>

        <h2>Register User</h2>
    
        <form onChange={onChange} >
        <div className="text-end">
          <input type="text" className="form-control-sm mx-1" id="username" name="username" placeholder="Brugernavn" />
          <input type="password" className="form-control-sm mb-2" id="password" name="password" placeholder="Adgangskode" />
          <input type="password" className="form-control-sm mb-2" id="confirmPassword" name="confirmPassword" placeholder="Gentag Adgangskode" />

          <br/>
          <button type="submit" className="btn btn-sm greenBg whiteTekst mx-1" onClick={onSubmit}>Register</button>

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

export default RegisterForm
