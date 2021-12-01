import { useEffect, useState } from "react";
import { Card, Col, Badge } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Genre } from "../../constant/Genre";

export default function PopularMovie() {
  const [trendingWeek, setTrendingWeek] = useState();
  const navigate = useNavigate("");

  useEffect(() => {
    const genre = Genre;
    const url = `
    https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`;
    const getTrendingWeek = async () => {
      const response = await fetch(url);
      const { results } = await response.json();
      const best = [];
      results?.forEach((e) => {
        if (best.length === 10) return setTrendingWeek(best);
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
    };
    getTrendingWeek();
  }, []);

  const handleOnClick = (id) => navigate(`/detail-movie/${id}`);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          color: "white",
        }}
      >
        Popular Movies This Week
      </h1>
      <Col
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {trendingWeek?.map((e, i) => {
          return (
            <Card
              key={i}
              className="mx-4 my-3"
              onClick={() => handleOnClick(e.id)}
              style={{ border: "none", cursor: "pointer" }}
            >
              <Card.Img
                variant="down"
                src={e.img}
                style={{ filter: "brightness(70%)" }}
              />
              <Card.ImgOverlay>
                <Badge bg="warning" text="dark">
                  {e.genre}
                </Badge>
                <Card.Title
                  style={{
                    position: "absolute",
                    bottom: "0",
                    color: "white",
                    textShadow: "2px 1px grey",
                  }}
                >
                  {e.title}
                </Card.Title>
              </Card.ImgOverlay>
            </Card>
          );
        })}
      </Col>
    </>
  );
}
