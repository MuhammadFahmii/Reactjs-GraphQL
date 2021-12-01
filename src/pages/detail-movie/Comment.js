import { useState } from "react";
import { Modal, Form, Button, Badge } from "react-bootstrap";
import { parseCookies } from "nookies";
import FormatDate from "../../helper/FormatDate";
import GetAllComments from "../../hooks/GetAllComments";
import InsertComment from "../../hooks/InsertComment";
import GetCommentById from "../../hooks/GetCommentById";
import DeleteComment from "../../hooks/DeleteComment";
import UpdateComment from "../../hooks/UpdateComment";
import { useNavigate } from "react-router";

export default function Comment({ id_movie, detailMovie }) {
  const { id_user, username } = parseCookies();
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState();
  const [comment, setComment] = useState();
  const [show, setShow] = useState(false);

  const { allComments, loadingAllComments, errorAllComments } =
    GetAllComments(id_movie);
  const { insertComment, insertCommentLoading, insertCommentError } =
    InsertComment(id_movie);
  const {
    getCommentById,
    getCommentByIdData,
    getCommentByIdLoading,
    getCommentByIdError,
  } = GetCommentById();
  const { deleteComment, deleteCommentLoading, deleteCommentError } =
    DeleteComment(id_movie);
  const { updateComment, updateCommentLoading, updateCommentError } =
    UpdateComment(id_movie);

  const handleOnClick = (e, props = null) => {
    switch (e.target.innerHTML) {
      case "Sign in to add comment":
        navigate("/sign-in");
        break;
      case "Add comment":
        if (newComment === "") return alert("comment masih kosong");
        insertComment({
          variables: {
            id_user,
            id_movie: detailMovie.id,
            comment: newComment,
          },
        });
        alert("Success");
        break;
      case "Delete":
        if (window.confirm("Apakah anda yakin?")) {
          deleteComment({
            variables: {
              id: props,
            },
          });
          alert("Success");
        }
        break;
      case "Update":
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
        break;
      case "Close":
        setShow(false);
        break;
      case "Save Update":
        updateComment({
          variables: {
            id: comment.id,
            comment: comment.text,
          },
        });
        alert("Success");
        setShow(false);
        break;
      default:
        break;
    }
  };

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
    loadingAllComments ||
    insertCommentLoading ||
    deleteCommentLoading ||
    getCommentByIdLoading ||
    updateCommentLoading
  ) {
    return <h1>Harap tunggu</h1>;
  } else if (
    deleteCommentError ||
    errorAllComments ||
    getCommentByIdError ||
    insertCommentError ||
    updateCommentError
  ) {
    return <h1>Terjadi kesalahan...</h1>;
  }
  return (
    <>
      <div className="row" style={{ width: "102%" }}>
        <div className="col-sm-10">
          {id_user && (
            <Badge className="my-3" bg="light" text="dark">
              Comment as {username}
            </Badge>
          )}
          {id_user && (
            <textarea
              placeholder="comment"
              className="form-control"
              name="new-comment"
              onChange={(e) => handleOnChange(e)}
            ></textarea>
          )}
          <Badge
            style={{ cursor: "pointer" }}
            className="mt-3"
            onClick={(e) => handleOnClick(e, id_user)}
          >
            {`${id_user ? "Add comment" : "Sign in to add comment"}`}
          </Badge>
        </div>

        <div className="my-3" style={{ color: "white" }}>
          <h4>Recent Comments</h4>
          <hr />
          {allComments.length !== 0 ? (
            allComments.map((e) => {
              return (
                <div key={e.id}>
                  <div>
                    <h5>{e.user.username}</h5>
                    <div className=" d-flex flex-row">
                      <span>{FormatDate(e.created_at)}</span>
                      {e.user.id === parseInt(id_user) && (
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
                    <p>"{e.comment}"</p>
                  </div>
                  <hr />
                </div>
              );
            })
          ) : (
            <h5>Comment not found</h5>
          )}
        </div>
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your Comment</Modal.Title>
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
    </>
  );
}
