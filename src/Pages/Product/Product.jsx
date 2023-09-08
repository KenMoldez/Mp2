import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PlantCard from "../../components/PlantCard/PlantCard";
import { useGlobalContext } from "../../AppContext/AppContext";
import productCSS from "./Product.module.css";
import Loading from "../../components/Loading/Loading";

function Product() {
  const {
    plants,
    filterByName,
    setFilterByName,
    categories,
    setFilterByCategory,
    loading,
    setLoading,
  } = useGlobalContext();

  const [toggleFilter, setToggleFilter] = useState(false);
  const [filterName, setFilterName] = useState("All");

  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   window.location.reload();
  // }, [location.pathname]);

  return (
    <>
      <div className={"container"}>
        <h2 className={productCSS["page-title"]}>Products</h2>
        {/* <button onClick={nav}>asd</button> */}

        <div className={productCSS["filter__plant"]}>
          <div className={productCSS["filterByName"]}>
            <input
              className={[productCSS["filterName"]]}
              type="text"
              placeholder="Search"
              name="plant"
              value={filterByName}
              onChange={(e) => setFilterByName(e.target.value)}
            />
          </div>
          <div className={productCSS["filterByFamily"]}>
            <label
              htmlFor="region"
              className={productCSS["dropdown__category"]}
            >
              <div
                className={productCSS["filter__category"]}
                onClick={() => setToggleFilter((prev) => !prev)}
              >
                {/* {category} */}
                <p className={productCSS["filter-text"]}>{filterName} Plants</p>
              </div>
              <ul
                className={`${productCSS["category__list"]} ${
                  toggleFilter && productCSS["active"]
                }`}
              >
                {categories.map((plant, idx) => {
                  return (
                    <li
                      className={productCSS["category__list--item"]}
                      key={idx}
                      onClick={() => {
                        setFilterName(plant);
                        setFilterByCategory(plant);
                        setToggleFilter(false);
                      }}
                    >
                      {plant}
                    </li>
                  );
                })}
              </ul>
            </label>
          </div>
        </div>
        {plants.length === 0 && loading == false && (
          <div className={productCSS["no-plant-found"]}>
            <p className="">There is no '{filterByName}' plant in our store</p>
          </div>
        )}
      </div>

      {loading ? (
        <div className="container">
          <Loading />
        </div>
      ) : (
        <div className={`container ${productCSS["plants__container"]}`}>
          <div className="row">
            {plants.map((plant) => {
              return (
                <PlantCard
                  {...plant}
                  key={plant.id}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
