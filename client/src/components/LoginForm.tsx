import React, { useState } from "react";

const LoginForm = () => {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt: any) => {
    evt.preventDefault();
    // login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt: any) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };
  return (
    <div>
      <form onChange={onChange}>
        <div className="text-end">
          <input
            type="text"
            className="form-control-sm mx-1"
            id="username"
            name="username"
            placeholder="Brugernavn"
          />
          <input
            type="password"
            className="form-control-sm mb-2"
            id="password"
            name="password"
            placeholder="Adgangskode"
          />
          <br />
          <button
            type="submit"
            className="btn btn-sm greenBg whiteTekst mx-1"
            onClick={performLogin}
          >
            Log på{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
