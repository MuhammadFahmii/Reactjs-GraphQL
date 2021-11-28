import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { resultSearchMovie } from "./stores/MovieSlices";
import { Genre } from "../constant/Genre";
export default function Header() {
  const username = useSelector((state) => {
    if (state.userActive.users.username !== "")
      return state.userActive.users.username;
  });
  const id_user = useSelector((state) => {
    if (state.userActive.users.id !== "") return state.userActive.users.id;
  });
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (search) => setSearch(search);
  const handleOnSearch = async (e) => {
    if (e.key === "Enter") {
      const genre = Genre;
      const urlSearch = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${search}&include_adult=false`;
      const response = await fetch(urlSearch);
      const { results } = await response.json();
      let best = [];
      results?.forEach((e) => {
        genre.forEach(({ id, name }) => {
          if (id === e.genre_ids[0]) {
            const newData = {
              id: e.id,
              genre: name,
              title: e.title,
              img: `https://image.tmdb.org/t/p/w200/${e.poster_path}`,
            };
            best.push(newData);
          }
        });
      });
      dispatch(resultSearchMovie(best));
      navigate("/result-search-movie");
      setSearch("");
    }
  };
  return (
    <Navbar variant="dark" expand="lg">
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse
        style={{
          justifyContent: "space-around",
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
          <input
            type="search"
            placeholder="Search"
            value={search}
            style={{
              height: "30px",
              width: "250px",
              borderRadius: "10px",
              textDecoration: "none",
              marginTop: "5px",
            }}
            onChange={(e) => handleOnChange(e.target.value)}
            onKeyDown={(e) => handleOnSearch(e)}
          />
          {username !== undefined ? (
            <NavDropdown title={username} className="mx-3">
              <NavDropdown.Item as={Link} to={`/favourite-movie/${id_user}`}>
                My Favourite
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={"/setting"}>
                Setting
              </NavDropdown.Item>
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
