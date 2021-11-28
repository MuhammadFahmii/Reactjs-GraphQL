import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addActive } from "../component/stores/UserSlices";
import { Link } from "react-router-dom";
import GetUsername from "../hooks/GetUsername";

export default function SignIn() {
  const { getUsername, getUsernameData, getUsernameLoading, getUsernameError } =
    GetUsername();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    if (getUsernameData?.length > 0) {
      dispatch(addActive(getUsernameData[0]));
      alert("welcome");
      navigate("/", { replace: true });
    }
  }, [getUsernameData, navigate, dispatch]);

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetByUsername = () => {
    getUsername({
      variables: {
        username: data.username,
        password: data.password,
      },
    });
  };

  if (getUsernameLoading) {
    return <h1>Harap tunggu</h1>;
  } else if (getUsernameError) {
    return <h1>Terjadi kesalahan</h1>;
  }

  return (
    <>
      <div id="div-auth" className="row">
        <div className="col-md">
          <div className="logo mb-3 mt-2">
            <div className="col-md-12 text-center">
              <h1 id="signin-title">Sign In</h1>
            </div>
          </div>
          <form className="myform">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                name="username"
                className="form-control"
                id="username"
                placeholder="Enter Username"
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
            <div className="col-md-12 text-center mt-3 mb-3">
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
                <Link to={"/sign-up"} style={{ margin: "0 5px" }}>
                  Sign up here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
