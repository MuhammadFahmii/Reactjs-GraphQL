import { useNavigate, useParams } from "react-router";
import { Container, Row, Col, Image, Badge, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { parseCookies } from "nookies";
import InsertFavouriteMovie from "../../hooks/InsertFavouriteMovie";
import Comment from "./Comment";
import TrailerButton from "./TrailerButton";

export default function DetailMovie() {
  const { id_movie } = useParams();
  const { id_user } = parseCookies();
  const dataFavourite = useSelector((state) => {
    return state.movies.favouriteMovie;
  });
  const navigate = useNavigate();
  const [detailMovie, setDetailMovie] = useState();
  const [similarMovie, setSimilarMovie] = useState();
  const [urlMovieVideo, setUrlMovieVideo] = useState();
  const [idAlreadyFavourite, setIdAlreadyFavourite] = useState();
  const {
    insertFavouriteMovie,
    insertFavouriteMovieLoading,
    insertFavouriteMovieError,
  } = InsertFavouriteMovie(id_movie);

  useEffect(() => {
    dataFavourite.includes(parseInt(id_movie))
      ? setIdAlreadyFavourite(true)
      : setIdAlreadyFavourite(false);
    const urlDetail = `${process.env.REACT_APP_URL_API}/movie/${id_movie}?api_key=${process.env.REACT_APP_API_KEY}`;
    const urlSimiliarMovie = `${process.env.REACT_APP_URL_API}/movie/${id_movie}/similar?api_key=${process.env.REACT_APP_API_KEY}`;
    const urlGetMovieVideo = `${process.env.REACT_APP_URL_API}/movie/${id_movie}/videos?api_key=${process.env.REACT_APP_API_KEY}`;
    const getDetail = async () => {
      const response = await fetch(urlDetail);
      const result = await response.json();
      setDetailMovie(result);
    };
    const getSimiliarMovie = async () => {
      const response = await fetch(urlSimiliarMovie);
      const { results } = await response.json();
      setSimilarMovie(results);
    };
    const getMovieVideo = async () => {
      const response = await fetch(urlGetMovieVideo);
      const { results } = await response.json();
      results.map((e) => (e.type === "Trailer" ? setUrlMovieVideo(e.key) : ""));
    };
    getDetail();
    getSimiliarMovie();
    getMovieVideo();
  }, [id_movie, dataFavourite, idAlreadyFavourite]);

  let genreArr = [];
  detailMovie?.genres?.map(({ name }) => genreArr.push(name));

  const handleOnClick = (e, props = null) => {
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
        alert("Success");
        break;
      default:
        break;
    }

    if (e.target.tagName === "DIV") {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
      return navigate(`/detail-movie/${props}`);
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
                  <div
                    style={{
                      textAlign: "justify",
                    }}
                  >
                    <h5>
                      Countries:{" "}
                      {detailMovie.production_companies[0]?.origin_country}
                    </h5>
                    <h5>Year: {detailMovie.release_date?.split("-")[0]}</h5>
                    <h5>Category: {genreArr.join(", ")}</h5>
                    <h5>Release: {detailMovie.release_date}</h5>
                    <h5>Rating: {detailMovie.vote_average}</h5>
                    <h5>Overview: </h5>
                    <h5>{detailMovie.overview}</h5>
                  </div>
                  <Badge
                    style={
                      idAlreadyFavourite
                        ? { marginRight: "10px" }
                        : { cursor: "pointer", marginRight: "10px" }
                    }
                    onClick={(e) => handleOnClick(e)}
                  >
                    {id_user
                      ? idAlreadyFavourite
                        ? "Favourite"
                        : "Add to favourite"
                      : "Login to add favourite"}
                  </Badge>
                  <TrailerButton path={urlMovieVideo} />
                </Col>
              </Row>

              <Comment id_movie={id_movie} detailMovie={detailMovie} />
            </Col>
            <Col lg={2}>
              <h4 className="text-white">Similar Movie</h4>
              {similarMovie?.map((e, i) => {
                if (i < 5) {
                  return (
                    <Card
                      key={i}
                      className="mx-4 my-3"
                      onClick={(i) => handleOnClick(i, e.id)}
                      style={{ border: "none", cursor: "pointer" }}
                    >
                      <Card.Img
                        variant="down"
                        src={`https://image.tmdb.org/t/p/w200/${e.poster_path}`}
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
                            fontSize: "15px",
                          }}
                        >
                          {e.title}
                        </Card.Title>
                      </Card.ImgOverlay>
                    </Card>
                  );
                }
                return true;
              })}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
