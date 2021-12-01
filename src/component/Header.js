import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { resultSearchMovie } from "../stores/MovieSlices";
import { Genre } from "../constant/Genre";
import { destroyCookie, parseCookies } from "nookies";
export default function Header() {
  const genre = Genre;
  const { id_user, username } = parseCookies();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const urlSearch = `${process.env.REACT_APP_URL_API}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${search}&include_adult=false`;

  const handleOnChange = (search) => setSearch(search);
  const handleOnSearch = async (e) => {
    if (e.key === "Enter") {
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
              poster_path: e.poster_path,
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
  const handleClickLogout = async (e) => {
    switch (e.target.innerHTML) {
      case "Logout":
        destroyCookie(null, "id_user");
        destroyCookie(null, "username");
        navigate("/");
        alert("Success logout");
        break;
      default:
        break;
    }
  };

  const handleClickSearchGenre = async (id) => {
    const urlSearchMovieByGenre = `${process.env.REACT_APP_URL_API}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${id}`;
    const response = await fetch(urlSearchMovieByGenre);
    const { results } = await response.json();
    dispatch(resultSearchMovie(results));
    navigate("/result-search-movie");
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
            {genre?.map((e, i) => {
              if (i < 5) {
                return (
                  <NavDropdown.Item
                    key={i}
                    onClick={() => handleClickSearchGenre(e.id)}
                  >
                    {e.name}
                  </NavDropdown.Item>
                );
              }
              return true;
            })}
          </NavDropdown>
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
            <NavDropdown title={username}>
              <NavDropdown.Item as={Link} to={`/favourite-movie/${id_user}`}>
                My Favourite
              </NavDropdown.Item>
              <NavDropdown.Item onClick={(e) => handleClickLogout(e)}>
                Logout
              </NavDropdown.Item>
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
