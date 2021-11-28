import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import DetailMovie from "./pages/DetailMovie";
import Header from "./component/Header";
import FavouriteMovie from "./pages/FavouriteMovie";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/home/Home";
import ResultSearchMovie from "./pages/ResultSearchMovie";

function App() {
  return (
    <>
      <Router>
        <Container>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail-movie/:id_movie" element={<DetailMovie />} />
            <Route
              path="/favourite-movie/:id_user"
              element={<FavouriteMovie />}
            />
            <Route
              path="/result-search-movie"
              element={<ResultSearchMovie />}
            />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
