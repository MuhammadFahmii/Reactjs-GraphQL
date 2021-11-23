import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { MdSearch } from "react-icons/md";
const Header = () => {
  return (
    <Navbar variant="dark">
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Navbar.Brand href="#home">Movie App</Navbar.Brand>
          <Nav.Link href="#">Home</Nav.Link>
          <NavDropdown title="Genre" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Adventure</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Comedy</NavDropdown.Item>
          </NavDropdown>
          <form className="d-flex">
            <input
              id="search-movie"
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ borderRadius: "10px" }}
            />
            <MdSearch style={{ marginLeft: "-40px", fontSize: "40px" }} />
          </form>
          <NavDropdown title="Username" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">My Favourite</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Setting</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
