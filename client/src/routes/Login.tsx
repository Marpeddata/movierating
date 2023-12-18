//import InputField from "./basic/InputField";
//import Button from "./basic/Button";
import Button from 'react-bootstrap/Button';
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { emptyUser } from "../types";
import { useNavigate } from "react-router-dom"; // redirect to another route
import { useAuth } from "../AuthContext";


// const BASE_API_URL = 'http://localhost:4001/graphql'

interface loginProps {
    toggleModal: () => void;
}

const Login = ({ toggleModal }: loginProps) => {
	const [formData, setFormData] = useState(emptyUser);
	const navigate = useNavigate();
	const {login} = useAuth();

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setFormData((curr) => {
			return { ...curr, [e.target.name]: e.target.value };
		});
	}, []);

	const reset = useCallback(() => {
		setFormData(emptyUser);
	}, []);

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		login(formData.username, formData.userPass);
		navigate("/");
		reset();
        toggleModal();
	};

	return (
		<form onSubmit={onSubmit}>
			<div className="flex gap-5">
				
				<input
					value={formData.username}
					onChange={onChange}
					name="username"
					type="text"
					required
				/>
				<input
					value={formData.userPass}
					onChange={onChange}
					name="userPass"
					type="password"
					required
				/>
				
			</div>
			<div className="flex gap-5 pt-2">
				<Button className="bg-slate-700" type="submit">
				Login
				</Button>
			</div>
				<p className="pt-7 pb-2 text-white">Not a member? You can register here:
				</p>
					<Button 
					onClick={ ()=> navigate("/user/registration")} 
					className=" bg-slate-700 w-[clamp(100px,_100%_,10vw)]" type="button">
					Register
					</Button>
					{/* <Button onClick={ ()=>{window.location.href='/math-app/user/registration'}} className=" bg-slate-700 w-[clamp(100px,_100%_,10vw)]" type="button">Register</Button> */}
		</form>
	);
};

export default Login;