import { useNavigate, useParams } from "react-router";
import { Card, Col, Image, Row } from "react-bootstrap";
import GetFavouriteMovie from "../../hooks/GetFavouriteMovie";

export default function FavouriteMovie() {
  const { id_user } = useParams();
  const navigate = useNavigate();
  const {
    getFavouriteMovieData,
    getFavouriteMovieLoading,
    getFavouriteMovieError,
  } = GetFavouriteMovie(id_user);

  const handleOnClick = (id) => navigate(`/detail-movie/${id}`);

  if (getFavouriteMovieLoading) {
    return <h1>Harap tunggu</h1>;
  } else if (getFavouriteMovieError) {
    return <h1>Terjadi kesalahan</h1>;
  }
  return (
    <>
      <h1 style={{ textAlign: "center", color: "white" }}>
        My Favourite Movie
      </h1>
      {getFavouriteMovieData?.map((e, i) => {
        return (
          <Row
            key={i}
            style={{ cursor: "pointer" }}
            className="mx-4 my-2"
            onClick={() => handleOnClick(e.id_movie)}
          >
            <Col>
              {" "}
              <Image src={`https://image.tmdb.org/t/p/w200${e.image}`} />
            </Col>
            <Col md="9">
              {" "}
              <Card.Body style={{ color: "white" }}>
                <Card.Title>{e.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Card Subtitle
                </Card.Subtitle>
                <Card.Text style={{ textAlign: "justify" }}>
                  {e.overview}
                </Card.Text>
              </Card.Body>
            </Col>
          </Row>
        );
      })}
    </>
  );
}
