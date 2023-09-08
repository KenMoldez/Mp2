import React, { useState, useEffect } from "react";
import "./Orders.css";
import { v4 as uuidv4 } from "uuid";

import { Link, NavLink } from "react-router-dom";

import { useGlobalContext } from "../../AppContext/AppContext";
import Loading from "../../components/Loading/Loading";

function Orders() {
  const { orders, plants } = useGlobalContext();

  const [itemOrders, setItemOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopyId, setIsCopyId] = useState({
    id: null,
    state: false,
  });

  useEffect(() => {
    const updatedItemOrder = [];

    for (const order of orders) {
      for (const id of order.id) {
        const matchingProduct = plants.find((plant) => plant.id === id);

        if (matchingProduct) {
          const uniqueId = uuidv4();
          updatedItemOrder.unshift({
            orderId: uniqueId,
            id: matchingProduct.id,
            name: matchingProduct.name,
            img: matchingProduct.img,
            price: matchingProduct.price,
            address: order.address,
            quantity: order.itemCount,
            phoneNumber: order.phoneNumber,
            firstName: order.firstName,
            lastName: order.lastName,
          });
        }
      }
    }

    setItemOrders(updatedItemOrder);
    setIsLoading(false);
  }, [orders, plants]);

  const copyId = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      setIsCopyId(() => ({
        id: id,
        state: true,
      }));

      setTimeout(() => {
        setIsCopyId((prevState) => ({
          ...prevState,
          state: false,
        }));
      }, 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="orders__title">Orders</h2>
      <div className="order__items--wrapper">
        {isLoading ? (
          <Loading /> // Render a loading state
        ) : itemOrders.length > 0 ? (
          itemOrders.map((item) => (
            <div key={item.orderId}>
              <div className="item__order--container">
                <div className="order__id--wrapper">
                  <p className="order__item--id">
                    Order ID: <span>{item.orderId}</span>
                  </p>
                  <button
                    className="copyText--btn"
                    onClick={() => copyId(item.orderId)}
                    // disabled={}
                  >
                    {isCopyId.id === item.orderId && isCopyId.state ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="item__order__description--wrapper">
                  <img
                    src={item.img}
                    alt=""
                  />

                  <div className="item__order__description">
                    <p className="item__order--name">{item.name}</p>
                    <div className="item__order--quantity">
                      <p>
                        <span className="order__item--price">₱{item.price}</span>
                        <span>x{item.quantity}</span>
                      </p>

                      <p className="order__item--totalPrice">
                        Total: ₱{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="order__item--status--address">
                  <p>
                    Contact Person:
                    <span> {item.firstName} {item.lastName}</span>
                  </p>
                  <div>
                    <p className="order__item--address">
                      Delivery Address:{" "}
                      <span>
                        {item.address} | {item.phoneNumber} | Cash On Delivery
                      </span>
                    </p>
                    <div className="order__item--status">Status: Pending</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no_orders_found">
            <p>No orders found.</p>
            <NavLink to="/cart">Go to your cart</NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
