import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./component/Header";
import FavouriteMovie from "./pages/favourite-movie/FavouriteMovie";
import SignUp from "./pages/sign-up/SignUp";
import SignIn from "./pages/sign-in/SignIn";
import Home from "./pages/home/Home";
import ResultSearchMovie from "./pages/result-search-movie/ResultSearchMovie";
import Footer from "./component/Footer";
import DetailMovie from "./pages/detail-movie/DetailMovie";

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
          <Footer />
        </Container>
      </Router>
    </>
  );
}

export default App;
