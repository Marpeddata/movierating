import { useState } from "react";

export const useForm = (callback: any, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const onChange = (event: any) => {
    event.preventDefault();
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
   

    if (event.target.name === "confirmPassword") {
      setConfirmPassword(event.target.value);
      
    }
  };
  const onSubmit = (event: any) => {
    event.preventDefault();

    // need to check if passwords match and if confirmpassword is empty do the callback

    if (confirmPassword !== "") {
      if (values.password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }
    callback();
  };

  return {
    onChange,
    onSubmit,
    values,
    error,
  };
};
