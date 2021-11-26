import { useNavigate, useParams } from "react-router";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { useSelector } from "react-redux";
import GetAllComments from "../hooks/GetAllComments";

const insert = gql`
  mutation MyMutation(
    $id_user: Int!
    $image: String!
    $overview: String!
    $title: String!
    $id_movie: Int!
  ) {
    insert_movie_app_favourite_movies_one(
      object: {
        id_user: $id_user
        image: $image
        overview: $overview
        title: $title
        id_movie: $id_movie
      }
    ) {
      id
    }
  }
`;

export default function DetailMovie() {
  const { id_movie } = useParams();
  const API_KEY = "bb3fb3b2c47fd1ac46c54121cec5a620";
  const urlDetail = `https://api.themoviedb.org/3/movie/${id_movie}?api_key=${API_KEY}`;
  const [detailMovie, setDetailMovie] = useState();
  const { getAllComments, allComments, loadingAllComments, errorAllComments } =
    GetAllComments();
  const [
    insertFavourite,
    { data: dataInsert, loading: loadingInsertFavourite },
  ] = useMutation(insert);
  const id_user = useSelector((state) => {
    if (state.userActive.users.id !== "") return state.userActive.users.id;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (dataInsert) {
      alert("Success");
      navigate(`/favourite-movie/${id_user}`, { replace: true });
    }
  }, [dataInsert, navigate]);
  useEffect(() => {
    const getDetail = async () => {
      const response = await fetch(urlDetail);
      const result = await response.json();
      setDetailMovie(result);
    };
    getDetail();
    getAllComments({
      variables: {
        id_movie,
      },
    });
  }, []);

  let genreArr = [];
  detailMovie?.genres?.map(({ name }) => genreArr.push(name));

  const handleOnClick = (e) => {
    if (e.target.innerHTML == "Login to add favourite") {
      navigate("/sign-in");
    } else {
      insertFavourite({
        variables: {
          id_user,
          id_movie: detailMovie.id,
          image: detailMovie.poster_path,
          overview: detailMovie.overview,
          title: detailMovie.title,
        },
      });
    }
  };

  console.log(allComments);
  if ((loadingInsertFavourite, loadingAllComments))
    return <h1 style={{ color: "white" }}>Harap tunggu</h1>;
  return (
    <Container className="my-3">
      {detailMovie ? (
        <>
          <Row className="text-white">
            <Col>
              <Image
                src={`https://image.tmdb.org/t/p/original${detailMovie.poster_path}`}
                fluid
              />
            </Col>
            <Col>
              <h3>
                Countries: {detailMovie.production_companies[0].origin_country}
              </h3>
              <h3>Year: {detailMovie.release_date.split("-")[0]}</h3>
              <h3>Category: {genreArr.join(", ")}</h3>
              <h3>Release: {detailMovie.release_date}</h3>
              <h3>Rating: {detailMovie.vote_average}</h3>
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
        </>
      ) : (
        <h1>Data Not Found</h1>
      )}
      <div>
        <div className="row" style={{ width: "102%" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Recent Comments</h4>
                <h6 className="card-subtitle">
                  Latest Comments section by users
                </h6>
              </div>
              <div>
                {allComments?.map((e) => {
                  return (
                    <div className="d-flex flex-row comment-row mx-3">
                      <div className="comment-text w-100">
                        <h5>{e.user.username}</h5>
                        <div className="comment-footer">
                          {" "}
                          <span className="date">April 14, 2019</span>{" "}
                        </div>
                        <p className="m-b-5 m-t-10">{e.comment}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
