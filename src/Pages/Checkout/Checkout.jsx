import React, { useEffect, useRef, useState } from "react";
import checkoutCSS from "./Checkout.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useGlobalContext } from "../../AppContext/AppContext";
import { forEach } from "lodash";

function Checkout() {
  const {
    plants,
    cart,
    getTotalAmount,
    userInfo,
    setCart,
    setCheckout,
    checkout,
    orders,
    setOrders,
  } = useGlobalContext();

  const modalRef = useRef();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    phoneNumber: userInfo.phoneNumber,
    zipCode: userInfo.zipCode,
    address: userInfo.address,
  });

  const schema = yup.object().shape({
    // firstName: yup.number().typeError('Age must be a number').required("First Name Required!"),
    firstName: yup.string().required("First Name is Required."),
    lastName: yup.string().required("Last Name is Required."),
    phoneNumber: yup
      .number()
      .typeError("Must be a number.")
      .positive()
      .integer()
      .required("Phone Number is Required."),
    zipCode: yup.number().typeError("Must be a number.").required("Zip code is required"),
    address: yup.string().required("Address is required"),
  });

  function onSubmit(values) {
    console.log("Address Complete");
    setUserData(values);
    modalRef.current.close();
  }

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      ...userData,
      // firstName: userInfo.firstName,
      // lastName: userInfo.lastName,
      // phoneNumber: userInfo.phoneNumber,
      // zipCode: userInfo.zipCode,
      // address: userInfo.address,
    },
    validationSchema: schema,
    onSubmit,
  });

  function submitOrder() {
    // if (!userData) {
    //   alert("Adrress is Required");
    //   return;
    // }

    console.log("order Submit");
    plants.map((plant) => {
      if (cart[plant.id].itemCount !== 0 && checkout.includes(plant.id)) {
        // let newOrder = {
        //   id: plant.id,
        //   address: userData.address,
        //   zipCode: userData.zipCode,
        //   itemCount: cart[plant.id].itemCount,
        // };

        setOrders([
          ...orders,
          {
            id: [...checkout],
            address: userData.address,
            phoneNumber: userData.phoneNumber,
            itemCount: cart[plant.id].itemCount,
            firstName: userData.firstName,
            lastName: userData.lastName,
          },
        ]);

        // setOrders((prevOrders) => [
        //   ...prevOrders,
        //   { id: [...checkout], address: userData.address },
        // ]);

        setCart((prevData) => ({
          ...prevData,
          [plant.id]: {
            availability: prevData[plant.id].availability - prevData[plant.id].itemCount,
            itemCount: 0,
          },
        }));
      }
    });

    setCheckout([]);
    navigate("/orders");
  }

  return (
    <div className={`container ${checkoutCSS["checkout__parent"]}`}>
      <h2 className={checkoutCSS["checkout__title"]}>checkout</h2>
      <dialog
        className={checkoutCSS["checkout__modal__form"]}
        ref={modalRef}
      >
        <h2>Delivery Address Details</h2>
        <form
          className={checkoutCSS["address__form"]}
          method="dialog"
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="firstName">First Name: </label>
            <input
              className={errors.firstName ? checkoutCSS["input__error"] : ""}
              type="text"
              id="firstName"
              placeholder="ex. Juan"
              // {...register("firstName")}
              value={values.firstName}
              onChange={handleChange}
            />

            <p>{errors.firstName}</p>
          </div>

          <div>
            <label htmlFor="lastName">Last Name: </label>
            <input
              className={errors.lastName ? checkoutCSS["input__error"] : ""}
              type="text"
              id="lastName"
              placeholder="ex. dela Cruz"
              // {...register("lastName")}
              value={values.lastName}
              onChange={handleChange}
            />
            <p>{errors.lastName}</p>
          </div>

          <div>
            <label htmlFor="phoneNumber">Phone Number: </label>
            <input
              className={errors.phoneNumber ? checkoutCSS["input__error"] : ""}
              type="text"
              id="phoneNumber"
              placeholder="094512345678"
              // {...register("phoneNumber")}
              value={values.phoneNumber}
              onChange={handleChange}
            />
            <p>{errors.phoneNumber}</p>
          </div>

          <div>
            <label htmlFor="zipCode">Zip Code: </label>
            <input
              className={errors.zipCode ? checkoutCSS["input__error"] : ""}
              type="text"
              id="zipCode"
              placeholder="4112"
              maxLength="4"
              // {...register("baranggay")}
              value={values.zipCode}
              onChange={handleChange}
            />
            <p>{errors.zipCode}</p>
          </div>

          <div>
            <label htmlFor="address">Complete Address: </label>
            <input
              className={errors.address ? checkoutCSS["input__error"] : ""}
              type="text"
              id="address"
              placeholder="ex. 185 De Leon St. "
              // {...register("address")}
              value={values.address}
              onChange={handleChange}
            />
            <p>{errors.address}</p>
          </div>

          <div className={checkoutCSS["form__buttons--container"]}>
            <button
              type="submit"
              className={checkoutCSS["submit__address__form--btn"]}
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => modalRef.current.close()}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>

      <div className={checkoutCSS["address__container"]}>
        <div className={checkoutCSS["change__address"]}>
          <p>Address Delivery</p>
          <button
            // className="btn btn-primary"
            onClick={() => {
              modalRef.current.showModal();
            }}
          >
            {true ? "Change Address" : "Add Adress"}
          </button>
        </div>

        {true ? (
          <div className={checkoutCSS["delivery__address--info"]}>
            <p className="person__name">
              {userData?.firstName} {userData?.lastName} | {userData?.phoneNumber}
            </p>
            <p className="complete__address">
              {userData?.address} | {userData.zipCode}
            </p>
          </div>
        ) : (
          <p>Address Is Required</p>
        )}
      </div>

      <div className={checkoutCSS["checkout__container--parent"]}>
        <div className={checkoutCSS["checkout__items--container"]}>
          {checkout.length === 0 ? (
            <div className={checkoutCSS["no_item_in_checkou--container"]}>
              <p>Checkout your item in cart first</p>
              <Link to="/cart">Go to your cart</Link>
            </div>
          ) : (
            plants.map((plant) => {
              if (cart[plant.id].itemCount !== 0 && checkout.includes(plant.id)) {
                return (
                  <div
                    key={plant.id}
                    className={checkoutCSS["checkout__wrapper"]}
                  >
                    <div
                      key={plant.id}
                      className={checkoutCSS["checkout__items"]}
                    >
                      <img
                        src={plant.img}
                        alt={plant.name}
                      />
                      <div className={checkoutCSS["checkout__item--details"]}>
                        <div className={checkoutCSS["item__descripttion"]}>
                          <p className={checkoutCSS["item--name"]}>{plant.name}</p>
                          <p className={checkoutCSS["category"]}>{plant.family} Plant</p>
                        </div>
                        <p className={checkoutCSS["item--price"]}>
                          ₱{plant.price} <span>x {cart[plant.id].itemCount}</span>
                        </p>
                      </div>
                    </div>
                    <p className={checkoutCSS["checkout__subtotal"]}>
                      Subtotal: <span>₱{cart[plant.id].itemCount * plant.price}</span>
                    </p>
                  </div>
                );
              }
            })
          )}
        </div>

        <div className={checkoutCSS["checkout__totalAmount"]}>
          <p>
            Merchendise subtotal:
            <span>
              <strong>₱{getTotalAmount()}</strong>
            </span>
          </p>
          <p>
            Shipping fee subtotal:
            <span>
              <strong>Free</strong>
            </span>
          </p>
          <p>
            Shipping method:
            <span>
              <strong>Cash On Delivery</strong>
            </span>
          </p>
          <p className={checkoutCSS["checkout__totalPayment"]}>
            Total Payment:
            <span>
              <strong>₱{getTotalAmount()}</strong>
            </span>
          </p>
          <button
            disabled={checkout.length === 0 ? true : false}
            className={` ${checkoutCSS["checkout_submit_btn"]}`}
            onClick={submitOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
