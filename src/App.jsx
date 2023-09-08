import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

import "./App.css";

import { Route, Routes, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useGlobalContext } from "./AppContext/AppContext";
import Product from "./Pages//Product/Product";
import Cart from "./Pages/Cart/Cart";
import Plant from "./Pages/Plant/Plant";
import Login from "./Pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Checkout from "./Pages/Checkout/Checkout";
import Loading from "./components/Loading/Loading";
import Footer from "./components/Footer/Footer";
import SignUp from "./Pages/SignUp/SignUp";
import Home from "./Pages/Home/Home";
import Orders from "./Pages/Orders/Orders";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  const { setCheckout, cart } = useGlobalContext();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location.pathname);

  const isNotFoundPage = location.pathname === "*";

  useEffect(() => {
    if (
      (location.state?.prevLocation == "/cart" && location.pathname !== "/checkout") ||
      location.state?.prevLocation == "/checkout"
    ) {
      setTimeout(() => {
        navigate(location.pathname, { state: null });
      }, 0);
      setCheckout([]);
      // console.log("clear");
    }
  }, [location]);

  // console.log(cart);

  // console.log(location.pathname);

  return (
    <>
      {/* <Navbar /> */}
      {!isNotFoundPage && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<SignUp />}
        />

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/product"
          element={<Product />}
        />

        <Route
          path="/product/:id"
          element={<Plant />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="*"
          element={<Navigate to="/404" />}
        />

        <Route
          path="/404"
          element={<NotFound />}
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
