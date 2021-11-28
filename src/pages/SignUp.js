import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

const InsertUser = gql`
  mutation MyMutation($username: String!, $password: String!) {
    insert_movie_app_users_one(
      object: { username: $username, password: $password }
    ) {
      id
    }
  }
`;
export default function SignUp() {
  const [insertUser, { data: dataInsert, loading: loadingInsert }] =
    useMutation(InsertUser);
  const [data, setData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (dataInsert) navigate("/sign-in", { replace: true });
  }, [dataInsert, navigate]);

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnClick = () => {
    insertUser({
      variables: {
        username: data.username,
        password: data.password,
      },
    });
  };

  if (loadingInsert) return <h1>Harap Tunggu</h1>;

  return (
    <div id="div-auth" className="row">
      <div className="logo mb-3">
        <div className="col-md-12 text-center">
          <h1 id="signup-title">Signup</h1>
        </div>
      </div>
      <form action="#" name="registration">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Enter Username"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter Password"
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="col-md-12 text-center mb-3 mt-3">
          <button
            className=" btn btn-block btn-primary"
            onClick={handleOnClick}
          >
            Get Started For Free
          </button>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <p className="text-center">
              <Link to={"/sign-in"}>Already have an account?</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
