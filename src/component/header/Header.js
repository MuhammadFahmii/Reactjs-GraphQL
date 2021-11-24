import { Navbar, Nav, NavDropdown, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function Header() {
  const user = useSelector((state) => {
    if (state.userActive.users.username !== "") return state.userActive.users;
  });
  const [userActive, setUserActive] = useState();
  useEffect(() => {
    setUserActive(user);
  }, [user]);
  return (
    <Navbar variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse
        id="navbarScroll"
        style={{
          justifyContent: "space-evenly",
        }}
      >
        <Nav navbarScroll>
          <Navbar.Brand>Movie App</Navbar.Brand>
          <Nav.Link as={Link} to={"/"}>
            Home
          </Nav.Link>
          <NavDropdown title="Genre" id="navbarScrollingDropdown">
            <NavDropdown.Item>Action</NavDropdown.Item>
            <NavDropdown.Item>Adventure</NavDropdown.Item>
            <NavDropdown.Item>Comedy</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link>Contact Us</Nav.Link>
          <Form
            className="d-flex"
            style={{ width: "250px", margin: "0px 50px" }}
          >
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <MdSearch style={{ marginLeft: "-50px", fontSize: "40px" }} />
          </Form>
          {userActive ? (
            <NavDropdown
              title={userActive.username}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item>My Favourite</NavDropdown.Item>
              <NavDropdown.Item>Setting</NavDropdown.Item>
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Link as={Link} to="/sign-in">
              Sign In
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
