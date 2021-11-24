import { useEffect, useState } from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";

export default function PopularMovie() {
  const [trendingWeek, setTrendingWeek] = useState();
  const genre = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 16,
      name: "Animation",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 80,
      name: "Crime",
    },
    {
      id: 99,
      name: "Documentary",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 10751,
      name: "Family",
    },
    {
      id: 14,
      name: "Fantasy",
    },
    {
      id: 36,
      name: "History",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 10402,
      name: "Music",
    },
    {
      id: 9648,
      name: "Mystery",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10770,
      name: "TV Movie",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 10752,
      name: "War",
    },
    {
      id: 37,
      name: "Western",
    },
  ];

  useEffect(() => {
    const API_KEY = "bb3fb3b2c47fd1ac46c54121cec5a620";
    const url = `
    https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
    const getTrendingWeek = async () => {
      const response = await fetch(url);
      const { results } = await response.json();
      let best5 = [];
      results?.map((e) => {
        if (best5.length === 10) return setTrendingWeek(best5);
        genre.map(({ id, name }) => {
          if (id === e.genre_ids[0]) {
            const newData = {
              id: e.id,
              genre: name,
              title: e.title,
              img: `https://image.tmdb.org/t/p/w200/${e.poster_path}`,
            };
            best5.push(newData);
          }
        });
      });
    };
    getTrendingWeek();
  }, []);

  const [hover, setHover] = useState(false);
  let hoverImg;
  const toogleHover = () => {
    setHover(!hover);
  };
  if (hover) {
    hoverImg = { filter: "brightness(70%)" };
  } else {
    hoverImg = { filter: "brightness(50%)" };
  }

  const handleOnClick = (id) => {
    console.log(id);
  };

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          color: "white",
        }}
      >
        Popular Movies this Week
      </h1>
      <Row xs={1} className="g-4">
        {Array.from({ length: 1 }).map((_, idx) => (
          <Col
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {trendingWeek?.map((e, i) => {
              return (
                <Col className="mx-4 my-2">
                  <Card
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
                </Col>
              );
            })}
          </Col>
        ))}
      </Row>
    </>
  );
}
