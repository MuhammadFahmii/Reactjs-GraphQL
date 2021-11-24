import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./component/home/Home";
import SignIn from "./component/sign-in/SignIn";
import Header from "./component/header/Header";
import { Container } from "react-bootstrap";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Container>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
