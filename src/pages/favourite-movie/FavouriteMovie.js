import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Card, Col, Image, Row } from "react-bootstrap";
import { parseCookies } from "nookies";
import GetFavouriteMovie from "../../hooks/GetFavouriteMovie";
import DeleteFavouriteMovie from "../../hooks/DeleteFavouriteMovie";
import { myFavouriteMovie } from "../../stores/MovieSlices";

export default function FavouriteMovie() {
  const { id_user } = parseCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    getFavouriteMovieData,
    getFavouriteMovieLoading,
    getFavouriteMovieError,
    getFavouriteMovieRefetch,
  } = GetFavouriteMovie(id_user);
  const {
    deleteFavouriteMovie,
    deleteFavouriteMovieData,
    deleteFavouriteMovieLoading,
    deleteFavouriteMovieError,
  } = DeleteFavouriteMovie();

  useEffect(() => {
    getFavouriteMovieRefetch();
    window.scrollTo(0, document.body.scrollHeight);
  }, [getFavouriteMovieRefetch, deleteFavouriteMovieData]);

  const handleOnClick = (e, id) => {
    if (e.target.innerHTML === "Delete") {
      window.confirm("Apakah anda yakin?") &&
        deleteFavouriteMovie({
          variables: {
            id,
          },
        });
    } else {
      const idFavouriteMovieData = [];
      getFavouriteMovieData?.map((e) => idFavouriteMovieData.push(e.id_movie));
      dispatch(myFavouriteMovie(idFavouriteMovieData));
      navigate(`/detail-movie/${id}`);
    }
  };

  if (getFavouriteMovieLoading || deleteFavouriteMovieLoading) {
    return <h1>Harap tunggu</h1>;
  } else if (getFavouriteMovieError || deleteFavouriteMovieError) {
    return <h1>Terjadi kesalahan</h1>;
  }
  return (
    <div style={{ color: "white" }}>
      <h1>My Favourite Movie</h1>
      {getFavouriteMovieData.length !== 0 ? (
        getFavouriteMovieData?.map((e, i) => {
          return (
            <Row key={i} className="my-2">
              <Col>
                {" "}
                <Image
                  onClick={(i) => handleOnClick(i, e.id_movie)}
                  src={`https://image.tmdb.org/t/p/w200${e.image}`}
                  style={{ marginBottom: "20px", cursor: "pointer" }}
                />
              </Col>
              <Col md="9">
                {" "}
                <Card.Body style={{ color: "white" }}>
                  <Card.Title
                    style={{ cursor: "pointer" }}
                    onClick={(i) => handleOnClick(i, e.id_movie)}
                  >
                    {e.title}
                  </Card.Title>
                  <Card.Subtitle
                    className="mb-2 badge bg-danger"
                    style={{ cursor: "pointer" }}
                    onClick={(i) => handleOnClick(i, e.id)}
                  >
                    Delete
                  </Card.Subtitle>
                  <Card.Text style={{ textAlign: "justify" }}>
                    {e.overview}
                  </Card.Text>
                </Card.Body>
              </Col>
              <hr />
            </Row>
          );
        })
      ) : (
        <h3 className="mt-5">Oops... Data Not Found</h3>
      )}
    </div>
  );
}
