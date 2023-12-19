import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <ul className="header">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
      <li>
        <NavLink to="/addMovie">Add movie</NavLink>
      </li>
      <li>
        <NavLink to="/requestMovie">Request movie</NavLink>
      </li>
      <li>
        <NavLink to="/reviews">Your reviews</NavLink>
      </li>
    </ul>
  );
};

export default Header;
