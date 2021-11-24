import { Image, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Hero({ topTrending }) {
  const posterPath = `https://image.tmdb.org/t/p/original/${topTrending?.poster_path}`;
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate("/detail-film");
  };
  return (
    <>
      <Image
        src={posterPath}
        style={{ borderRadius: "20px", cursor: "pointer" }}
        fluid
        onClick={handleOnClick}
      />
      <Row style={{ color: "white" }} className="mx-5 mb-5">
        <Col>Release Date: {topTrending?.release_date}</Col>
        <Col>Rating: {topTrending?.vote_average}</Col>
        <Col>Duration: {topTrending?.runtime} min</Col>
      </Row>
    </>
  );
}
