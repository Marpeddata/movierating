import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { User } from "../types";

const Header = () => {
  let navigate = useNavigate();
  const { user, logout }: { user: User | null; logout: Function } =
    useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate("/");
  };
  console.log(user);

  return (
    <ul className="header">
      {!user ? (
        <>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {user.role === "admin" ? (
            <>
              <li>
                <NavLink to="/showRequests">Show requests</NavLink>
              </li>
              <li>
                <NavLink to="/addMovie">Add movie</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/requestMovie">Request movie</NavLink>
              </li>
              <li>
                <NavLink to="/reviews">Your reviews</NavLink>
              </li>
            </>
          )}

          <li>
            <NavLink onClick={onLogout} to="/">
              Logout
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default Header;
