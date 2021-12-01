import { Image, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export default function Hero() {
  const [topTrending, setTopTrending] = useState();
  const posterPath = `https://image.tmdb.org/t/p/original${topTrending?.poster_path}`;
  const navigate = useNavigate();
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`;
    const getTopTrending = async () => {
      const responseTop = await fetch(url);
      const { results } = await responseTop.json();
      const id = results[0].id;
      const detailMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`;
      const responseDetail = await fetch(detailMovie);
      const res = await responseDetail.json();
      setTopTrending(res);
    };
    getTopTrending();
  }, []);
  const handleOnClick = () => navigate(`/detail-movie/${topTrending.id}`);
  return (
    <>
      <Image
        src={posterPath}
        style={{ borderRadius: "20px", cursor: "pointer" }}
        fluid
        onClick={handleOnClick}
      />
      <Row
        style={{ color: "white", textAlign: "center" }}
        className="mx-3 mb-5"
      >
        <Col>Release Date: {topTrending?.release_date}</Col>
        <Col>Rating: {topTrending?.vote_average}</Col>
        <Col>Duration: {topTrending?.runtime} min</Col>
      </Row>
    </>
  );
}
