import { useNavigate, useParams } from "react-router";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import InsertFavouriteMovie from "../../hooks/InsertFavouriteMovie";
import Comment from "./Comment";
import TrailerButton from "./TrailerButton";

export default function DetailMovie() {
  const { id_movie } = useParams();
  const navigate = useNavigate();
  const [detailMovie, setDetailMovie] = useState();
  const [similarMovie, setSimilarMovie] = useState();
  const [urlMovieVideo, setUrlMovieVideo] = useState();
  const { id_user } = parseCookies();
  const {
    insertFavouriteMovie,
    insertFavouriteMovieLoading,
    insertFavouriteMovieError,
  } = InsertFavouriteMovie(id_movie);

  useEffect(() => {
    const urlDetail = `${process.env.REACT_APP_URL_API}/${id_movie}?api_key=${process.env.REACT_APP_API_KEY}`;
    const urlSimiliarMovie = `${process.env.REACT_APP_URL_API}/${id_movie}/similar?api_key=${process.env.REACT_APP_API_KEY}`;
    const urlGetMovieVideo = `${process.env.REACT_APP_URL_API}/${id_movie}/videos?api_key=${process.env.REACT_APP_API_KEY}`;
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
  }, [id_movie]);

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
        alert("success");
        break;
      default:
        break;
    }

    if (e.target.tagName === "IMG") {
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
                  <TrailerButton path={urlMovieVideo} />
                </Col>
              </Row>
              <h3 className="text-white ">Overview:</h3>
              <h4 className="text-danger" style={{ textAlign: "justify" }}>
                {detailMovie.overview}
              </h4>
              <Comment id_movie={id_movie} detailMovie={detailMovie} />
            </Col>
            <Col xs={2}>
              <h4 className="text-white">Similar Movie</h4>
              {similarMovie?.map((e, i) => {
                if (i < 5) {
                  return (
                    <Image
                      key={i}
                      src={`https://image.tmdb.org/t/p/w200/${e.poster_path}`}
                      className="my-3"
                      fluid
                      onClick={(i) => handleOnClick(i, e.id)}
                      style={{ cursor: "pointer" }}
                    />
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
