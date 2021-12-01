import { useSelector } from "react-redux";
import { Col, Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function ResultSearchMovie() {
  const navigate = useNavigate();
  const dataResult = useSelector((state) => {
    return state.movies.movies;
  });
  console.log(dataResult);
  const handleOnClick = (id) => navigate(`/detail-movie/${id}`);

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          color: "white",
        }}
      >
        Search Result
      </h1>
      <Col
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {dataResult
          ? dataResult.map((e, i) => {
              return (
                <Card
                  key={i}
                  className="mx-3 my-3"
                  style={{ border: "none", cursor: "pointer" }}
                  onClick={() => handleOnClick(e.id)}
                >
                  <Card.Img
                    variant="down"
                    src={`https://image.tmdb.org/t/p/w200/${e.poster_path}`}
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
            })
          : ""}
      </Col>
    </>
  );
}
