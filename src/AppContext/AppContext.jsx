import { useContext, createContext, useState, useEffect } from "react";
import { debounce } from "lodash";
import { PLANTS } from "../data";
const categories = ["All", ...new Set(PLANTS.map((plant) => plant.family))];

export const AppContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  PLANTS.map((plant) => {
    cart[plant.id] = { availability: plant.availability, itemCount: 0 };
  });
  return cart;
};

const storedCart = localStorage.getItem("cart");
const storedUserInfo = localStorage.getItem("userInfo");
const storedOrders = localStorage.getItem("orders");

export const AppProvider = ({ children }) => {
  const [plants, setPlants] = useState([]);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("keepMeLoggedIn") !== null ? true : false
  );

  const [userInfo, setUserInfo] = useState(JSON.parse(storedUserInfo) || null);
  const [cart, setCart] = useState(JSON.parse(storedCart) || getDefaultCart());
  const [checkout, setCheckout] = useState([]);
  const [orders, setOrders] = useState(JSON.parse(storedOrders) || []);
  const [filterByCategory, setFilterByCategory] = useState("All");
  const [filterByName, setFilterByName] = useState("");
  const [loading, setLoading] = useState(false);

  // console.log(cart);
  // console.log(orders);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const filter = () => {
    setLoading(true);
    let updatedList = [...PLANTS];

    if (filterByCategory == "All") {
      updatedList = updatedList.filter((plant) =>
        plant.name.toLowerCase().includes(filterByName.toLocaleLowerCase())
      );

      setTimeout(() => {
        setLoading(false);
      }, 1000);

      setPlants(updatedList);
    } else {
      updatedList = updatedList.filter(
        (plant) =>
          plant.family.toLowerCase() === filterByCategory.toLowerCase() &&
          plant.name.toLowerCase().includes(filterByName.toLocaleLowerCase())
      );

      setTimeout(() => {
        setLoading(false);
      }, 1000);

      setPlants(updatedList);
    }
  };

  useEffect(() => {
    filter();
  }, [filterByName, filterByCategory]);

  const getCartItemNumber = () => {
    let total = 0;
    for (let keyCart in cart) {
      if (cart[keyCart].itemCount != 0) total++;
    }
    return total;
  };

  const getTotalAmount = () => {
    let total = 0;
    for (let keyCart in cart) {
      if (cart[keyCart].itemCount != 0) {
        let item = plants.find((plant) => plant.id == keyCart);

        if (checkout.includes(item?.id)) {
          total += cart[keyCart].itemCount * item?.price;
        }
      }
    }

    return total;
  };

  // useEffect(() => {
  //   getTotalAmount();
  //   console.log(getTotalAmount());
  // }, [checkout]);

  const addToCart = (itemId) => {
    if (cart[itemId].availability <= cart[itemId].itemCount) {
      return;
    }

    setCart((prevData) => ({
      ...prevData,
      [itemId]: {
        ...prevData[itemId],
        itemCount: prevData[itemId].itemCount + 1,
        // availability: prevData[itemId].availability - 1,
      },
    }));
  };

  const buyNow = (itemId) => {
    setCart((prevData) => ({
      ...prevData,
      [itemId]: {
        ...prevData[itemId],
        itemCount: prevData[itemId].itemCount == 0 ? 1 : prevData[itemId].itemCount,
      },
    }));

    setCheckout([...checkout, itemId]);

    // console.log(cart);
  };

  const removeToCart = (itemId) => {
    setCart((prevData) => ({
      ...prevData,
      [itemId]: {
        ...prevData[itemId],
        itemCount: prevData[itemId].itemCount - 1,
        // availability: prevData[itemId].availability + 1,
      },
    }));
  };

  const updateCartValue = (amount, itemId) => {
    if (isNaN(amount) || amount < 0 || amount > 100 || amount === 0) return;

    // if (amount <= 0) {
    //   prompt("sure");
    // }
    // // console.log(amount + 10);
    // let updatedAvailability;
    // let product = cart[itemId];

    // if (amount > product.itemCount) {
    //   // updatedAvailability = product.availability - (amount - product.itemCount);
    // } else if (amount < product.itemCount) {
    //   // updatedAvailability = product.availability + (amount + product.itemCount);
    // } else {
    //   console.log("neutral");
    // }

    setCart((prevData) => ({
      ...prevData,
      [itemId]: {
        ...prevData[itemId],
        // availability: updatedAvailability,
        itemCount: amount,
      },
    }));
  };
  return (
    <AppContext.Provider
      value={{
        plants,
        setPlants,
        cart,
        setCart,
        addToCart,
        removeToCart,
        updateCartValue,
        getCartItemNumber,
        getTotalAmount,
        filterByName,
        setFilterByName,
        categories,
        setFilterByCategory,
        loading,
        setLoading,
        checkout,
        setCheckout,
        buyNow,
        loggedIn,
        userInfo,
        setUserInfo,
        orders,
        setOrders,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
