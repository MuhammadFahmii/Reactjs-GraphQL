import { Image, Row, Col } from "react-bootstrap";

export default function Hero({ topTrending }) {
  const posterPath = `https://image.tmdb.org/t/p/original/${topTrending?.poster_path}`;
  return (
    <>
      <Image src={posterPath} style={{ borderRadius: "20px" }} fluid />
      <Row style={{ color: "white" }} className="mx-5 mb-5">
        <Col>Release Date: {topTrending?.release_date}</Col>
        <Col>Rating: {topTrending?.vote_average}</Col>
        <Col>Duration: {topTrending?.runtime} min</Col>
      </Row>
    </>
  );
}
