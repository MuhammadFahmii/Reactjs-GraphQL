import { useEffect, useState } from "react";
import { Card, Col, Badge } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Genre } from "../../constant/Genre";

export default function NowPlaying() {
  const [nowPlaying, setNowPlaying] = useState();
  const [hover, setHover] = useState(false);
  const navigate = useNavigate("");

  useEffect(() => {
    const genre = Genre;
    const url = `
    https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`;
    const getnowPlaying = async () => {
      const response = await fetch(url);
      const { results } = await response.json();
      const best = [];
      results?.forEach((e) => {
        if (best.length === 10) return setNowPlaying(best);
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
    getnowPlaying();
  }, []);

  let hoverImg;
  if (hover) {
    hoverImg = { filter: "brightness(70%)" };
  } else {
    hoverImg = { filter: "brightness(50%)" };
  }

  const toogleHover = () => setHover(!hover);
  const handleOnClick = (id) => navigate(`/detail-movie/${id}`);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          color: "white",
          marginTop: "5%",
        }}
      >
        Now Playing On Theater
      </h1>
      <Col
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {nowPlaying?.map((e, i) => {
          return (
            <Card
              key={i}
              className="mx-4 my-3"
              onMouseEnter={toogleHover}
              onMouseLeave={toogleHover}
              onClick={() => handleOnClick(e.id)}
              style={{ border: "none", cursor: "pointer" }}
            >
              <Card.Img variant="down" src={e.img} style={hoverImg} />
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
