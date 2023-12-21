import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { User } from "../types";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

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
    <div>
      <ul className="menu px-1">
        <Navbar className="lightGreyBg" expand="lg">
          <Navbar.Brand href="/" className="greenText ms-4">
            MovieRating
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {!user ? (
                <>

                  <li>
                    <Nav.Link href="/login">Login</Nav.Link>
                  </li>
                  <li>
                    <Nav.Link href="/register">Sign up</Nav.Link>
                  </li>
                </>
              ) : (
                <>

                  {user.role === "admin" ? (
                    <>
                      <li>
                        <Nav.Link href="/showRequests">Show requests</Nav.Link>
                      </li>
                      <li>
                        <Nav.Link href="/addMovie">Add movie</Nav.Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        {" "}
                        <Nav.Link href="/reviews">Reviews</Nav.Link>
                      </li>
                      <li>
                        {" "}
                        <Nav.Link href="/requestMovie">Request movie</Nav.Link>
                      </li>
                    </>
                  )}

                  <li>
                    <Nav.Link onClick={onLogout} href="/">
                      Log out
                    </Nav.Link>
                  </li>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </ul>
    </div>
  );
};

export default Header;
