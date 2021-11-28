import { Navbar, Nav, NavDropdown, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
export default function Header() {
  let user = useSelector((state) => {
    if (state.userActive.users.username !== "") return state.userActive.users;
  });
  const id_user = useSelector((state) => {
    if (state.userActive.users.id !== "") return state.userActive.users.id;
  });
  const [userActive, setUserActive] = useState(false);
  useEffect(() => {
    setUserActive(user);
  }, [user]);

  const handleLogout = () => setUserActive(false);

  return (
    <Navbar variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse
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
              className="me-2 mt-1"
              style={{ height: "30px" }}
            />
            <MdSearch style={{ marginLeft: "-50px", fontSize: "40px" }} />
          </Form>
          {userActive ? (
            <NavDropdown
              title={userActive.username}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item as={Link} to={`/favourite-movie/${id_user}`}>
                My Favourite
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/setting"}>
                Setting
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
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
