import {useState, } from 'react'


export const useForm = (callback: any, initialState = {}) => {
  const [values, setValues] = useState(initialState)
  const [confirmPassword, setConfirmPassword] = useState("");
  const onChange = (event: any) => {

    setValues({
    ...values,
      [event.target.name]: event.target.value
    })
    console.log(values)

    if (event.target.name === "confirmPassword") {
      setConfirmPassword(event.target.value);
    }
  
}

const onSubmit = (event: any) => {
  event.preventDefault()
  if (values.password !== confirmPassword) {
    console.log("Passwords do not match");
    return;
  }
  callback()
}

  return {
    onChange,
    onSubmit,
    values
}
}

