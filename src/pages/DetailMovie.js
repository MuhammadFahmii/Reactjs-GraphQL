import { useNavigate, useParams } from "react-router";
import {
  Container,
  Row,
  Col,
  Image,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import GetAllComments from "../hooks/GetAllComments";
import FormatDate from "../helper/FormatDate";
import GetUserActive from "../hooks/GetUserActive";
import InsertComment from "../hooks/InsertComment";
import DeleteComment from "../hooks/DeleteComment";
import GetCommentById from "../hooks/GetCommentById";
import UpdateComment from "../hooks/UpdateComment";

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
  const [detailMovie, setDetailMovie] = useState();
  const [newComment, setNewComment] = useState();
  const [comment, setComment] = useState();
  const [show, setShow] = useState(false);
  const { id_user, username } = GetUserActive();
  const { getAllComments, allComments, loadingAllComments, errorAllComments } =
    GetAllComments();
  const { insertComment, insertCommentLoading, insertCommentError } =
    InsertComment();
  const {
    getCommentById,
    getCommentByIdData,
    getCommentByIdLoading,
    getCommentByIdError,
  } = GetCommentById();
  const { deleteComment, deleteCommentLoading, deleteCommentError } =
    DeleteComment();
  const { updateComment, updateCommentLoading, updateCommentError } =
    UpdateComment();
  const [
    insertFavourite,
    { data: dataInsert, loading: loadingInsertFavourite },
  ] = useMutation(insert);
  const navigate = useNavigate();

  useEffect(() => {
    if (id_movie) {
      const API_KEY = "bb3fb3b2c47fd1ac46c54121cec5a620";
      const urlDetail = `https://api.themoviedb.org/3/movie/${id_movie}?api_key=${API_KEY}`;
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
    }
    if (dataInsert) {
      alert("Success");
      navigate(`/favourite-movie/${id_user}`, { replace: true });
    }
  }, [
    getAllComments,
    id_movie,
    dataInsert,
    navigate,
    id_user,
    getCommentByIdData,
  ]);

  let genreArr = [];
  detailMovie?.genres?.map(({ name }) => genreArr.push(name));

  const handleOnClick = (e, props = null) => {
    if (
      e.target.innerHTML === "Login to add favourite" ||
      e.target.innerHTML === "Login to add comment"
    ) {
      navigate("/sign-in");
    } else if (e.target.innerHTML === "Add to favourite") {
      insertFavourite({
        variables: {
          id_user,
          id_movie: detailMovie.id,
          image: detailMovie.poster_path,
          overview: detailMovie.overview,
          title: detailMovie.title,
        },
      });
      alert("success");
    } else if (e.target.innerHTML === "Add comment") {
      insertComment({
        variables: {
          id_user,
          id_movie: detailMovie.id,
          comment: newComment,
        },
      });
      alert("success");
    } else if (e.target.innerHTML === "Delete") {
      deleteComment({
        variables: {
          id: props,
        },
      });
      alert("success");
    } else if (e.target.innerHTML === "Update") {
      getCommentById({
        variables: {
          id: props,
        },
      });
      setComment({
        ...comment,
        id: props,
      });
      setShow(true);
    } else if (e.target.innerHTML === "Close") {
      setShow(false);
    } else if (e.target.innerHTML === "Save Update") {
      updateComment({
        variables: {
          id: comment.id,
          comment: comment.text,
        },
      });
      alert("success");
      setShow(false);
    }
  };

  /**
   * HandleOnChange
   * @param {*} e
   */
  const handleOnChange = (e) => {
    switch (e.target.name) {
      case "new-comment":
        setNewComment(e.target.value);
        break;
      case "comment":
        setComment({
          ...comment,
          text: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  if (
    loadingInsertFavourite ||
    loadingAllComments ||
    insertCommentLoading ||
    deleteCommentLoading ||
    getCommentByIdLoading ||
    updateCommentLoading
  ) {
    return <h1>Harap tunggu</h1>;
  } else if (
    errorAllComments ||
    insertCommentError ||
    deleteCommentError ||
    getCommentByIdError ||
    updateCommentError
  ) {
    return <h1>{updateCommentError}</h1>;
  }

  return (
    <Container className="my-3">
      {detailMovie && (
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
      )}
      <div>
        <div className="row" style={{ width: "102%" }}>
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-10">
                    <div className="input-group">
                      {id_user && (
                        <textarea
                          className="form-control"
                          name="new-comment"
                          onChange={(e) => handleOnChange(e)}
                        ></textarea>
                      )}
                      <div className="input-group-prepend">
                        {id_user && (
                          <span className="input-group-text">
                            Comment as {username}
                          </span>
                        )}
                        <button
                          className="btn btn-warning"
                          onClick={(e) => handleOnClick(e)}
                        >{`${
                          id_user ? "Add comment" : "Login to add comment"
                        }`}</button>
                      </div>
                    </div>
                  </div>
                  <div className="col"></div>
                </div>
                <h4 className="card-title">Recent Comments</h4>
                <h6 className="card-subtitle">
                  Latest Comments section by users
                </h6>
              </div>
              <div>
                {allComments?.map((e) => {
                  return (
                    <div className="mx-3 mb-3" key={e.id}>
                      <div>
                        <h5>{e.user.username}</h5>
                        <div className=" d-flex flex-row">
                          <span>{FormatDate(e.created_at)}</span>
                          {e.user.id === id_user && (
                            <>
                              <span
                                className="badge bg-danger mx-2"
                                style={{ cursor: "pointer" }}
                                onClick={(i) => handleOnClick(i, e.id)}
                              >
                                Delete
                              </span>
                              <span
                                className="badge bg-warning"
                                style={{ cursor: "pointer" }}
                                onClick={(i) => handleOnClick(i, e.id)}
                              >
                                Update
                              </span>
                            </>
                          )}
                        </div>
                        <p>{e.comment}</p>
                      </div>
                      <hr />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              name="comment"
              defaultValue={getCommentByIdData && getCommentByIdData}
              onChange={(e) => handleOnChange(e)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={(e) => handleOnClick(e)}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => handleOnClick(e)}>
            Save Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
