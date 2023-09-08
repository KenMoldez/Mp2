import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import LoginCSS from "./Login.module.css";

import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useGlobalContext } from "../../AppContext/AppContext";


let loggedIn = JSON.parse(localStorage.getItem("keepMeLoggedIn"));

function Login() {
  const { userInfo } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    userName: "",
    password: "",
    showPass: false,
    keepMe: false,
  });

  // useEffect(() => {
  //   setFormState((prevSate) => ({
  //     ...prevSate,
  //     userName: userInfo.userName,
  //     password: userInfo.password,
  //   }));
  // }, []);

  // if (loggedIn) {
  //   // navigate('/product')
  //   navigate("/product");
  // }

  const [formErrors, setFormErrors] = useState(null);

  function handleChange(e) {
    const target = e.target;
    const { name, value, type, checked } = target;
    setFormErrors(null);

    setFormState((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // console.log(formErrors);

  function handleSubmit(e) {
    e.preventDefault();

    let errors = {};
    let isValid = true;

    if (formState.userName !== userInfo.userName || formState.password !== userInfo.password) {
      errors.both = "Incorrect Username and Password.";
      isValid = false;
    }

    setFormErrors(errors);

    if (isValid) {
      if (formState) {
        localStorage.setItem("keepMeLoggedIn", JSON.stringify(formState.userName));
        // console.log("LogIn");
      }

      navigate(location.state?.prevUrl || "/product");
      window.location.reload();
    }
  }

  return (
    <section className={LoginCSS["portal"]}>
      <form
        action="#"
        onSubmit={handleSubmit}
      >
        <div className={LoginCSS["title"]}>
          <h1>LOG IN</h1>
          <p>Welcome back! Please enter your details.</p>
        </div>
        <button id={LoginCSS["google-signin"]}>
          <img
            src="assets/google-logo.svg"
            alt=""
          />
          Log in with Google
        </button>
        <span className={LoginCSS["or"]}>or</span>
        <div className={LoginCSS["input-field"]}>
          <input
            type="text"
            id="username"
            placeholder=""
            name="userName"
            value={formState.userName}
            onChange={handleChange}
          />
          <p htmlFor="username">Username</p>
        </div>
        <div className={LoginCSS["input-field"]}>
          <input
            type={formState.showPass ? "text" : "password"}
            id="password"
            placeholder=""
            name="password"
            value={formState.password}
            onChange={handleChange}
          />
          <p htmlFor="password">Password</p>

          <label
            htmlFor="hide-show"
            id={LoginCSS["show-hide-pass"]}
          >
            {formState.showPass ? <AiFillEye /> : <AiFillEyeInvisible />}
          </label>

          <input
            type="checkbox"
            name="showPass"
            id="hide-show"
            className={LoginCSS["hide-show"]}
            checked={formState.showPass}
            onChange={handleChange}
          />

          {/* <img
            id={LoginCSS["show-hide-pass"]}
            src="assets/show-eye.svg"
            alt=""
          /> */}
        </div>
        {formErrors?.both && <p className={LoginCSS["userLoginErrorMessage"]}>{formErrors.both}</p>}
        <div className={LoginCSS["forgot-keepMeLogIn"]}>
          <label htmlFor="keepMe">
            <input
              type="checkbox"
              name="keepMe"
              id="keepMe"
              checked={formState.keepMe}
              onChange={handleChange}
            />
            <span>Keep Me Logged In</span>
          </label>
          <a
            href="#"
            id={LoginCSS["forgot-pass"]}
          >
            Forgot Password
          </a>
        </div>
        <button id={LoginCSS["signin"]}>Sign in</button>
        <p id={LoginCSS["signup"]}>
          Don't have an account?
          <Link to="/register">Sign up here</Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
