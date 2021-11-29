import { useNavigate, useParams } from "react-router";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import InsertFavouriteMovie from "../../hooks/InsertFavouriteMovie";
import Comment from "./Comment";

export default function DetailMovie() {
  const { id_movie } = useParams();
  const [detailMovie, setDetailMovie] = useState();
  const navigate = useNavigate();

  const { id_user } = parseCookies();
  const {
    insertFavouriteMovie,
    insertFavouriteMovieLoading,
    insertFavouriteMovieError,
  } = InsertFavouriteMovie(id_movie);

  useEffect(() => {
    const urlDetail = `${process.env.REACT_APP_URL_API}/${id_movie}?api_key=${process.env.REACT_APP_API_KEY}`;
    const getDetail = async () => {
      const response = await fetch(urlDetail);
      const result = await response.json();
      setDetailMovie(result);
    };
    getDetail();
  }, [id_movie]);

  let genreArr = [];
  detailMovie?.genres?.map(({ name }) => genreArr.push(name));

  const handleOnClick = (e) => {
    switch (e.target.innerHTML) {
      case "Login to add favourite":
        navigate("/sign-in");
        break;
      case "Add to favourite":
        insertFavouriteMovie({
          variables: {
            id_user,
            id_movie: detailMovie.id,
            image: detailMovie.poster_path,
            overview: detailMovie.overview,
            title: detailMovie.title,
          },
        });
        navigate(`/favourite-movie/${id_user}`, { replace: true });
        alert("success");
        break;
      default:
        break;
    }
  };

  if (insertFavouriteMovieLoading) {
    return <h1>Harap tunggu</h1>;
  } else if (insertFavouriteMovieError) {
    return <h1>Terjadi kesalahan...</h1>;
  }

  return (
    <Container className="my-3">
      {detailMovie && (
        <>
          <Row>
            <Col>
              <Row className="text-white">
                <Col>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${detailMovie.poster_path}`}
                    fluid
                  />
                </Col>
                <Col>
                  <h4>
                    Countries:{" "}
                    {detailMovie.production_companies[0]?.origin_country}
                  </h4>
                  <h4>Year: {detailMovie.release_date?.split("-")[0]}</h4>
                  <h4>Category: {genreArr.join(", ")}</h4>
                  <h4>Release: {detailMovie.release_date}</h4>
                  <h4>Rating: {detailMovie.vote_average}</h4>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleOnClick(e)}
                  >
                    {id_user ? "Add to favourite" : "Login to add favourite"}
                  </button>
                </Col>
              </Row>
              <h3 className="text-white ">Overview:</h3>
              <h4 className="text-danger" style={{ textAlign: "justify" }}>
                {detailMovie.overview}
              </h4>
              <Comment id_movie={id_movie} detailMovie={detailMovie} />
            </Col>
            <Col xs={2}>
              <Image
                src={`https://image.tmdb.org/t/p/w200/${detailMovie.poster_path}`}
                fluid
              />
              <Image
                src={`https://image.tmdb.org/t/p/w200/${detailMovie.poster_path}`}
                fluid
              />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
