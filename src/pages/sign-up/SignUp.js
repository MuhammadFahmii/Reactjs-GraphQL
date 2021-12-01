import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import InsertUser from "../../hooks/InsertUser";

export default function SignUp() {
  const { insertUser, insertUserData, insertUserLoading, insertUserError } =
    InsertUser();
  const [data, setData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    if (insertUserData) {
      alert("Akun anda berhasil dibuat, silahkan login");
      navigate("/sign-in", { replace: true });
    }
  }, [insertUserData, navigate]);

  const handleOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    document.querySelector("#username-error").innerHTML = "";
    document.querySelector("#password-error").innerHTML = "";
    document.querySelector("#confirm-password-error").innerHTML = "";
  };
  const handleOnClick = (e) => {
    e.preventDefault();
    if (data === undefined) {
      alert("Pastikan semua data terisi");
    } else if (data.password === undefined || data.password === "") {
      document.querySelector("#password-error").innerHTML =
        "Password tidak boleh kosong";
    } else if (
      data.confirmpassword === undefined ||
      data.confirmpassword === ""
    ) {
      document.querySelector("#confirm-password-error").innerHTML =
        "Confirm Password tidak boleh kosong";
    } else if (data.confirmpassword !== data.password) {
      document.querySelector("#confirm-password-error").innerHTML =
        "Password tidak sama";
    } else if (data.username === undefined || data.username === "") {
      document.querySelector("#username-error").innerHTML =
        "Username tidak boleh kosong";
    } else {
      insertUser({
        variables: {
          username: data.username,
          password: data.password,
        },
      });
    }
  };

  if (insertUserLoading) {
    return <h1>Harap Tunggu</h1>;
  } else if (insertUserError) {
    return <h1>Terjadi Kesalahan</h1>;
  }

  return (
    <div id="div-auth" className="row">
      <div className="logo mb-3">
        <div className="col-12 text-center">
          <h1 id="signup-title">Signup</h1>
        </div>
      </div>
      <form action="#" name="registration">
        <div className="form-group mb-3">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            placeholder="Enter Username"
            onChange={(e) => handleOnChange(e)}
          />
          <span id="username-error" style={{ color: "red" }}></span>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter Password"
            onChange={(e) => handleOnChange(e)}
          />
          <span id="password-error" style={{ color: "red" }}></span>
        </div>
        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            name="confirmpassword"
            className="form-control"
            placeholder="Enter Password"
            onChange={(e) => handleOnChange(e)}
          />
          <span id="confirm-password-error" style={{ color: "red" }}></span>
        </div>
        <div className="col-12 text-center mb-3 mt-3">
          <button
            className=" btn btn-block btn-primary"
            onClick={(e) => handleOnClick(e)}
          >
            Get Started For Free
          </button>
        </div>
        <div className="col-12">
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
