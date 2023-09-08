import React, { useEffect, useState } from "react";
import CartCSS from "./Cart.module.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../../AppContext/AppContext";

import { FaTrashAlt } from "react-icons/fa";

function Cart() {
  const {
    plants,
    cart,
    setCart,
    addToCart,
    removeToCart,
    updateCartValue,
    getTotalAmount,
    setCheckout,
    checkout,
  } = useGlobalContext();

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);

  // const location = useLocation();
  // console.log(location);

  // const [reload, setReload] = useState(location.state.reload);

  // useEffect(() => {
  //   if (reload) {
  //     // delete location.state.reload;
  //     setReload(false);
  //     // window.location.reload();
  //   }
  // }, []);

  function handleChange(e, id) {
    const target = e.target;
    const { name, checked, type, value } = target;

    const updateList =
      checked && type == "checkbox" ? [...checkout, id] : checkout.filter((ids) => ids !== id);

    setCheckout(updateList);
  }

  function removeItem(id) {
    setCart((prevData) => ({
      ...prevData,
      [id]: {
        ...prevData[id],
        itemCount: 0,
      },
    }));
  }

  const hasNonZeroItemCount = Object.values(cart).every((item) =>
    item.itemCount === 0 ? true : false
  );

  if (hasNonZeroItemCount) {
    return (
      <div className={`${CartCSS["no_item_in_cart"]} container`}>
        <p>No Item In Cart</p>
        <Link to="/product">Buy Now</Link>
      </div>
    );
  }

  return (
    <div className={`${CartCSS["plant__wrapper"]} container`}>
      <h2>My Cart</h2>
      {/* <p>Select an item you want to checkout</p> */}
      {plants.map((plant) => {
        if (cart[plant.id]?.itemCount !== 0) {
          return (
            <div
              key={plant.id}
              className={`${CartCSS["parentCartContainer"]} ${CartCSS["chosen"]}`}
            >
              <div className={CartCSS["cart__container"]}>
                <input
                  type="checkbox"
                  name={plant.id}
                  id={plant.name}
                  checked={checkout.includes(plant.id)}
                  onChange={(e) => handleChange(e, plant.id)}
                />
                <label
                  htmlFor={plant.name}
                  className={`${CartCSS["cart_item-container"]} ${
                    checkout.includes(plant.id) ? CartCSS["active"] : ""
                  }`}

                  // style={{ backgroundColor: "red" }}
                >
                  <div className={CartCSS["cart__image--container"]}>
                    <img
                      src={plant.img}
                      alt={plant.name}
                      width="140px"
                    />
                  </div>

                  <div className={CartCSS["cart__description--container"]}>
                    <div className={CartCSS["plant__info"]}>
                      <p className={CartCSS["plant_name"]}>{plant.name}</p>
                      <p className={CartCSS["plant_price"]}>₱{plant.price}</p>
                    </div>
                    <div className={CartCSS["handleChangeContainer"]}>
                      <div>
                        <button
                          data-bs-toggle={`${cart[plant.id]?.itemCount == 1 && "modal"}`}
                          data-bs-target="#staticBackdrop"
                          onClick={() => {
                            if (cart[plant.id]?.itemCount != 1) {
                              setShowModal(true);
                              removeToCart(plant.id);
                            }
                          }}
                        >
                          <svg
                            width="12"
                            height="4"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          >
                            <defs>
                              <path
                                d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
                                id="a"
                              />
                            </defs>
                            <use
                              fill="#06c179"
                              fillRule="nonzero"
                              xlinkHref="#a"
                            />
                          </svg>
                        </button>

                        <input
                          type="text"
                          name="cartInput"
                          value={cart[plant.id].itemCount}
                          size={5}
                          // value={cartValue.cartInput || cart[plant.id].itemCount}
                          onChange={(e) => updateCartValue(Number(e.target.value), plant.id)}
                        />

                        <button onClick={(e) => addToCart(plant.id)}>
                          <svg
                            width="12"
                            height="12"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                          >
                            <defs>
                              <path
                                d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
                                id="b"
                              />
                            </defs>
                            <use
                              fill="#06c179"
                              fillRule="nonzero"
                              xlinkHref="#b"
                            />
                          </svg>
                        </button>
                      </div>

                      <div>
                        <Link
                          className={`${CartCSS["view__product"]}`}
                          to={`/product/${plant.id}`}
                        >
                          View Product
                        </Link>
                        {/* <button
                          className={`btn btn-danger ${CartCSS["removeItemToCart"]}`}
                          onClick={() => removeItem(plant.id)}
                        >
                          <FaTrashAlt />
                        </button> */}
                        {/* <!-- Button trigger modal --> */}
                        <button
                          className={`btn btn-danger ${CartCSS["removeItemToCart"]}`}
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          // onClick={() => removeItem(plant.id)}
                        >
                          <FaTrashAlt />
                        </button>
                        {/* <!-- Modal --> */}
                        <div
                          className="modal fade"
                          id="staticBackdrop"
                          data-bs-backdrop="static"
                          data-bs-keyboard="false"
                          tabIndex="-1"
                          aria-labelledby="staticBackdropLabel"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1
                                  className="modal-title fs-5"
                                  id="staticBackdropLabel"
                                >
                                  {plant.name}
                                </h1>
                                {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                              </div>
                              <div className="modal-body">
                                Are you sure you want to remove this item
                              </div>

                              <div className={`modal-footer ${CartCSS["cart__modal--btn"]}`}>
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-primary"
                                  data-bs-dismiss="modal"
                                  onClick={() => {
                                    removeItem(plant.id);
                                  }}
                                >
                                  Confirm
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
              <p className={CartCSS["sub_total"]}>
                Subtotal: <span>₱{cart[plant.id].itemCount * plant.price}</span>
              </p>
            </div>
          );
        }
      })}

      {getTotalAmount() ? (
        <div className={CartCSS["checkout"]}>
          <p className={CartCSS["total_amount"]}>
            Total Amount: <span>₱{getTotalAmount()}</span>
          </p>
          <button
            className={`${CartCSS["cart__checkout--btn"]}`}
            onClick={() => {
              navigate("/checkout");
            }}
          >
            Checkout
          </button>
        </div>
      ) : (
        <div className={CartCSS["checkout"]}>
          <p className={CartCSS["no-selected-text-message"]}>Select an item you want to checkout</p>
        </div>
      )}
    </div>
  );
}

export default Cart;

// updateCartValue(Number(e.target.value), plant.id)
