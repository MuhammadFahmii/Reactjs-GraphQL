import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import InsertUser from "../hooks/InsertUser";

export default function SignUp() {
  const { insertUser, insertUserData, insertUserLoading, insertUserError } =
    InsertUser();
  const [data, setData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (insertUserData) navigate("/sign-in", { replace: true });
  }, [insertUserData, navigate]);

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

  if (insertUserLoading) {
    return <h1>Harap Tunggu</h1>;
  } else if (insertUserError) {
    return <h1>Terjadi Kesalahan</h1>;
  }

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
