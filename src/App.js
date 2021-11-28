import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./component/home/Home";
import Header from "./component/header/Header";
import SignIn from "./component/sign-in/SignIn";
import { Container } from "react-bootstrap";
import "./App.css";
import FavouriteMovie from "./pages/FavouriteMovie";
import SignUp from "./pages/SignUp";
import DetailMovie from "./pages/DetailMovie";

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
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
