import React from "react";
import "./PlantCard.css";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../../AppContext/AppContext";

import { AiFillStar } from "react-icons/ai";

function PlantCard(plant) {
  const { cart, addToCart } = useGlobalContext();
  // console.log(plant.img);

  return (
    <div className="plant-card__container col-lg-3 col-md-6 col-sm-6 mb-4">
      <Link
        // type="button"
        className="card_link"
        to={`/product/${plant.id}`}
      >
        <div className="card">
          <img
            src={plant.img}
            className="card-img-top"
            alt={plant.name}
          />
          <div className="card-body">
            <h5 className="card-title card-name">{plant.name}</h5>
            <div className="star-rating">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>
            <p className="card-price">₱{plant.price}</p>
            {/* <p className="card-description">{plant.description}</p> */}
            {/* <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
            {/* <button className="continue-reading-btn">Continue Reading</button> */}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PlantCard;
