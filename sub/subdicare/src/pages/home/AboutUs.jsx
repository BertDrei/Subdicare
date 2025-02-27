import React from "react";
import newsIcon from "../../assets/news-icon.png"; // Replace with your image path
import servicesIcon from "../../assets/services-icon.png"; // Replace with your image path
import reportIcon from "../../assets/reports.jpg";

function AboutUs() {
  return (
    <div className="about-us-page" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50" }}>Here at SubdiCare</h1>
      <p style={{ textAlign: "center", color: "#7f8c8d", margin: "10px 0 30px" }}>
        Your exclusive platform for all homeowners of South Garden. Stay connected, informed, and engaged with your community.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {/* Card 1 */}
        <div style={cardStyle}>
          <img
            src={newsIcon}
            alt="News and Updates"
            style={imageStyle}
          />
          <h3 style={cardTitle}>News and Updates</h3>
          <p style={cardText}>
            Stay up-to-date with the latest announcements and happenings in our community.
          </p>
        </div>
        {/* Card 2 */}
        <div style={cardStyle}>
          <img
            src={reportIcon}
            alt="Report Issues"
            style={imageStyle}
          />
          <h3 style={cardTitle}>Report Issues</h3>
          <p style={cardText}>
            Easily report concerns or problems in your neighborhood for quick resolution.
          </p>
        </div>
        {/* Card 3 */}
        <div style={cardStyle}>
          <img
            src={servicesIcon}
            alt="Request Services"
            style={imageStyle}
          />
          <h3 style={cardTitle}>Request Services</h3>
          <p style={cardText}>
            Need help or assistance? Submit service requests and collaborate with neighbors.
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "30px" }}>
        <p style={{ color: "#34495e" }}>
          Your input matters—whether it's a suggestion, concern, or simply staying informed.
          Together, we can make South Garden a better place for everyone!
        </p>
      </div>
    </div>
  );
}

const cardStyle = {
  width: "250px",
  padding: "20px",
  border: "1px solid #ecf0f1",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  backgroundColor: "#ffffff",
};

const imageStyle = {
  width: "60px",
  height: "60px",
  marginBottom: "10px",
};

const cardTitle = {
  fontSize: "18px",
  color: "#2c3e50",
  marginBottom: "10px",
};

const cardText = {
  fontSize: "14px",
  color: "#7f8c8d",
};

export default AboutUs;
