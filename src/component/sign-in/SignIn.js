import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addActive } from "../stores/UserSlices";

const queryGetByUsername = gql`
  query MyQuery($username: String!, $password: String!) {
    movie_app_users(
      where: {
        username: { _eq: $username }
        _and: { password: { _eq: $password } }
      }
    ) {
      username
    }
  }
`;

export default function SignIn() {
  const navigate = useNavigate();
  const [getByUsername, { data: dataByUsername, loading: loadingByUsername }] =
    useLazyQuery(queryGetByUsername);

  const dispatch = useDispatch();

  const [data, setData] = useState();

  useEffect(() => {
    if (dataByUsername) dispatch(addActive(dataByUsername.movie_app_users[0]));
  }, [dataByUsername]);

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetByUsername = () => {
    getByUsername({
      variables: {
        username: data.username,
        password: data.password,
      },
    });
  };

  if (loadingByUsername) return <h1>Harap tunggu</h1>;
  return (
    <>
      <div
        className="row"
        style={{
          backgroundColor: "white",
          borderRadius: "10px",
          margin: "50px auto",
          width: "500px",
        }}
      >
        <div className="col-md">
          <div className="logo mb-3 mt-2">
            <div className="col-md-12 text-center">
              <h1>Login</h1>
            </div>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                name="username"
                className="form-control"
                id="username"
                placeholder="Enter username"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Password"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <p className="text-center">
                By signing up you accept our
                <a href="#" style={{ textDecoration: "none", margin: "0 5px" }}>
                  Terms Of Use
                </a>
              </p>
            </div>
            <div className="col-md-12 text-center ">
              <button
                type="submit"
                className=" btn btn-block btn-primary"
                onClick={handleGetByUsername}
              >
                Login
              </button>
            </div>
            <div className="form-group">
              <p className="text-center">
                Don't have account?
                <a href="#" style={{ textDecoration: "none", margin: "0 5px" }}>
                  Sign up here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
