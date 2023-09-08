import React, { useState } from "react";
import { Link, useLocation, useNavigate, NavLink } from "react-router-dom";
import { animateScroll as scroll, scroller } from "react-scroll";
import { useGlobalContext } from "../../AppContext/AppContext";
import logo from "/image/Tanim-logo.png";
import "./Navbar.css";

import { FaUser, FaUserLarge } from "react-icons/fa6";

function Navbar() {
  const { getCartItemNumber, loggedIn, userInfo } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();

  const [isUserInfo, setIsUserInfo] = useState(false);

  if (
    location.pathname == "/login" ||
    location.pathname == "/register" ||
    location.pathname === "/404"
  ) {
    return;
  }

  const scrollToAboutSection = () => {
    scroller.scrollTo("about-us", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
        <div
          className="container"
          id="nav"
        >
          <Link
            className="navbar-brand"
            to="/"
            id="logo_pic"
          >
            <img
              src={logo}
              alt="Logo"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="home-button">
                <Link
                  className="nav-link"
                  to="/"
                >
                  <strong>Home</strong>
                </Link>
              </li>

              <li className="home-button">
                <Link
                  className="nav-link"
                  to="/orders"
                >
                  <strong>Orders</strong>
                </Link>
              </li>

              <li className="about-us">
                <a
                  className="nav-link"
                  // activeclass="active"
                  href="/#about-us"
                  // spy="true"
                  // smooth="true"
                  // offset={-70}
                  // duration={500}
                  // onClick={scrollToAboutSection}
                >
                  <strong>About Us</strong>
                </a>
              </li>

              <li className="product">
                {/* <a
                  className="nav-link"
                  href="#"
                >
                  <strong>Products</strong>
                </a> */}

                <Link
                  to="/product"
                  state={{ prevLocation: location.pathname }}
                  className="nav-link"
                >
                  <strong>Products</strong>
                </Link>
              </li>

              <li className="cart-nav">
                <Link
                  className="nav-link"
                  to="/cart"
                  state={{ prevLocation: location.pathname, reload: true }}
                >
                  <svg
                    className="cart"
                    width="22"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                      fill="#69707D"
                      fillRule="nonzero"
                    />
                  </svg>
                  {/* <sup>{`${getCartItemNumber() ? getCartItemNumber() : ""}`}</sup> */}
                  {getCartItemNumber() ? <p>{getCartItemNumber()}</p> : ""}
                </Link>
              </li>

              {loggedIn ? (
                <li className="user-nav">
                  <button
                    className="nav-link"
                    onClick={() => setIsUserInfo((prevState) => !prevState)}
                  >
                    <FaUserLarge />
                  </button>

                  <div className={`user-info__logout ${isUserInfo ? "active" : ""}`}>
                    <p>{userInfo?.userName}</p>
                    <button
                      className="logout-btn"
                      onClick={() => {
                        localStorage.removeItem("keepMeLoggedIn");
                        localStorage.removeItem("cart");
                        localStorage.removeItem("orders");
                        navigate("/product");
                        window.location.reload();
                      }}
                    >
                      Log out
                    </button>
                  </div>
                </li>
              ) : (
                <li className="login-button">
                  <Link
                    to="/login"
                    className="nav-link"
                  >
                    <strong>Log In</strong>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
