import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import GetUsername from "../../hooks/GetUsername";
import { setCookie } from "nookies";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getUsername, getUsernameData, getUsernameLoading, getUsernameError } =
    GetUsername();
  const [data, setData] = useState();
  useEffect(() => {
    if (getUsernameData?.length > 0) {
      setCookie(null, "id_user", getUsernameData[0].id);
      setCookie(null, "username", getUsernameData[0].username);
      alert("welcome");
      navigate("/", { replace: true });
    }
  }, [getUsernameData, navigate, dispatch]);

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    if (
      data === undefined ||
      data.username === undefined ||
      data.password === undefined
    ) {
      alert("Pastikan semua data terisi");
    } else {
      getUsername({
        variables: {
          username: data.username,
          password: data.password,
        },
      });
    }
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
          <form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="username"
                name="username"
                className="form-control"
                id="username"
                placeholder="Enter Username"
                onChange={handleOnChange}
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
                onChange={handleOnChange}
              />
            </div>
            <div className="col-md-12 text-center mt-3 mb-3">
              <button
                type="submit"
                className=" btn btn-block btn-primary"
                onClick={(e) => handleOnClick(e)}
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
