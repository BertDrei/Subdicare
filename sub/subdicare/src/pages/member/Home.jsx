import React from "react";
import Carousel from "react-bootstrap/Carousel";
// Import images from assets
import Image1 from "../../assets/cam4.jpg"; // Update the path as needed
import Image2 from "../../assets/cam2.jpg";
import Image3 from "../../assets/cam3.jpg";

function Home() {
  return (
    <div style={{ paddingTop: "10px" }}>
      {/* Carousel Component */}
      <Carousel>
        <Carousel.Item interval={3000}>
          <img
            src={Image1}
            alt="Community Park"
            style={{ height: "50vh", width: "100%", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Community Park</h3>
            <p>A serene space for relaxation and meaningful gatherings.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            src={Image2}
            alt="Clubhouse"
            style={{ height: "50vh", width: "100%", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Modern Clubhouse</h3>
            <p>The perfect venue for events and special occasions.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={3000}>
          <img
            src={Image3}
            alt="Swimming Pool"
            style={{ height: "50vh", width: "100%", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Resort-Style Swimming Pool</h3>
            <p>Relax, rejuvenate, and enjoy our premium amenities.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Welcoming Text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginTop: "30px",
          paddingLeft: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "#2c3e50",
          }}
        >
          Welcome to South Garden
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            color: "#34495e",
            maxWidth: "800px",
            lineHeight: "1.8",
          }}
        >
          Experience a lifestyle like no other. At South Garden, you're part of a community that values elegance, comfort, and exclusivity. Discover premium amenities, forge lasting connections, and enjoy a place you'll be proud to call home.
        </p>
      </div>
    </div>
  );
}

export default Home;
