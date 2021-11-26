import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Card, Col, Image, Row } from "react-bootstrap";
import gql from "graphql-tag";
const getFavouriteMovie = gql`
  query MyQuery($id: Int!) {
    movie_app_favourite_movies(where: { id_user: { _eq: $id } }) {
      image
      overview
      title
      id_movie
    }
  }
`;
export default function FavouriteMovie() {
  const { id_user } = useParams();
  const { data: dataFavourite, loading: loadingDataFavourite } = useQuery(
    getFavouriteMovie,
    {
      variables: { id: id_user },
    }
  );
  const [data, setData] = useState();
  useEffect(() => {
    if (dataFavourite) setData(dataFavourite.movie_app_favourite_movies);
  }, [dataFavourite]);
  const navigate = useNavigate();

  const handleOnClick = (id) => navigate(`/detail-movie/${id}`);

  if (loadingDataFavourite) return <h1>Harap Tunggu</h1>;
  return (
    <>
      <h1 style={{ textAlign: "center", color: "white" }}>
        My Favourite Movie
      </h1>
      {data?.map((e, i) => {
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
