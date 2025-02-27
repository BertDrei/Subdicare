import React from "react";
import { Carousel } from "react-bootstrap";
import image1 from "../../assets/image1.jpg"; // Replace with your actual image paths
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/cam3.jpg";
import image5 from "../../assets/cam2.jpg";

function Home() {
  return (
    <div className="home-page">
      <Carousel fade interval={3000} className="carousel-container">
        <Carousel.Item>
          <img className="d-block w-100" src={image1} alt="First slide" />
          <Carousel.Caption>
            <h3>Welcome to SubdiCare</h3>
            <p>Your one-stop platform for community services.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image2} alt="Second slide" />
          <Carousel.Caption>
            <h3>Stay Connected</h3>
            <p>Connecting communities and people together.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image3} alt="Third slide" />
          <Carousel.Caption>
            <h3>Easy Access</h3>
            <p>Access a variety of services in one place.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image4} alt="Fourth slide" />
          <Carousel.Caption>
            <h3>Explore Services</h3>
            <p>Discover the services that best suit your needs.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={image5} alt="Fifth slide" />
          <Carousel.Caption>
            <h3>Join Us Today</h3>
            <p>Become part of the SubdiCare community now.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Home;
