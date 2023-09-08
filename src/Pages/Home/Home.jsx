import { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../AppContext/AppContext";
import PlantCard from "../../components/PlantCard/PlantCard";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function Home() {
  const { plants } = useGlobalContext();
  const [show, setShow] = useState(true);

  return (
    <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-12" id="logo1">
          <img src="image/Tanim-logo.png" alt="Logo" />
        </div>
        <div className="col-lg-12 d-none d-md-block">
          <div className="typewriter text-center">
            <h1>Rooted in nature, Delivered to your doorstep!</h1>
          </div>
        </div>
      </div>
    </div>

    <div className="container content">
      <div className="row">
        <div className="col-md-6">
          <div className="image-container">
            <img src="image/plant.jpg" alt="girl picking plants"></img>
          </div>
        </div>
        <div className="col-md-6">
          <h2 id="text-title">TANIM - Exclusive plant seller</h2>
          <p id="text-content">
            We're thrilled to have you step into our lush world of greenery
            and sustainable living. At <strong>TANIM</strong>, we believe in
            the power of plants to transform both our living spaces and our
            planet.
            <br />
            <br />
            Whether you're a seasoned plant parent or just starting your green
            journey, we're here to inspire and support you every step of the
            way.
            <br />
            <br />
            Prepare to be captivated by our carefully curated collection of
            exquisite plants, ranging from vibrant tropical beauties to
            delicate succulents. <br />
            <br />
          </p>
        </div>
      </div>
    </div>

    <div className="container content2">
      <div className="row center-grid">
        <div className="col-md-6">
          <h2 id="text-title">
            Bring nature indoors, unlock endless benefits
          </h2>
          <p id="text-content">
            Transform your home with the power of plants. Enjoy cleaner air,
            increased productivity, and a soothing ambiance.
            <br />
            <br />
            Experience the advantages of living among greenery.
            <br />
            Discover the magic today
          </p>
          <div className="col-md-3">
            <Link to="/product" className="btn btn-success shop-button">
              Shop Now!
            </Link>
          </div>
        </div>
        <div className="col-md-6">
          <img
            src="image/houseplant.jpg"
            alt="house plant"
            className="img-fluid"
          ></img>
        </div>
      </div>
    </div>

    <div className="container" id="about-us">
      <div className="row">
        <div className="col-md-6">
          <img
            src="image/kokedama.png"
            alt="About Us"
            className="img-fluid"
          ></img>
        </div>
        <div className="col-md-6">
          <h2 id="text-title">About Us</h2>
          <p id="text-content">
            At <strong>TANIM</strong>, we are passionate about promoting the
            beauty and benefits of plants in our everyday lives. We believe
            that surrounding ourselves with greenery not only enhances our
            living spaces but also nourishes our souls and contributes to a
            healthier planet.
            <br />
            <br />
            Our mission is to provide plant enthusiasts, both beginners and
            seasoned green thumbs, with an exceptional shopping experience. We
            offer a carefully curated selection of high-quality plants,
            sourced from reputable growers who share our commitment to
            sustainability and ethical practices. Each plant is handpicked,
            ensuring that it arrives at your doorstep in the best possible
            condition.
            <br />
            <br />
            We understand that selecting the perfect plant can be a daunting
            task, but fear not! Our team of plant experts is here to assist
            you every step of the way. Whether you need guidance on choosing
            the right plant for your space, tips on plant care and
            maintenance, or troubleshooting advice, we are just a message or
            phone call away. Your success in plant parenthood is our top
            priority.
            <br />
            <br />
            Happy planting! <br />
          </p>
          <div className="col-md-3">
            <Link to="/product" className="btn btn-success shop-button">
              Shop Now!
            </Link>
          </div>
        </div>
      </div>
    </div>

    <div className="container">
      <div className="featured_plant">
        <h2 className="featured_plants-title">Featured Plants </h2>
        <div className="row">
          {/* <!-- Card 1 --> */}
          {plants.map((plant) => {
            if (plant.rarity.toLowerCase() == "rare") {
              return <PlantCard {...plant} key={plant.id} />;
            }
          })}
        </div>
      </div>
    </div>

    <div className="container">
      <h2 className="partners">Our Other Partners</h2>
      <div className="row partner-logo">
        <div className="col-md-4 partner1">
          <img
            src="image/shopee-logo.svg"
            alt="Partner 1"
            className="img-fluid"
          ></img>
        </div>
        <div className="col-md-4 partner2">
          <img
            src="image/jnt-logo.png"
            alt="Partner 2"
            className="img-fluid"
          ></img>
        </div>
        <div className="col-md-4 partner3">
          <img
            src="image/lazada-logo.svg"
            alt="Partner 3"
            className="img-fluid"
          ></img>
        </div>
      </div>
    </div>
  </>
  );
}

export default Home;
