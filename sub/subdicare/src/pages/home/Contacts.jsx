import React from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa"; // Importing icons

function Contacts() {
  return (
    <div className="contacts-page" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "20px" }}>Get in Touch</h1>
      <p style={{ textAlign: "center", color: "#7f8c8d", fontSize: "16px", marginBottom: "30px" }}>
        Have a question, concern, or need assistance? We're here to help. Reach out to us via email or phone, 
        and we’ll get back to you as soon as possible.
      </p>
      <div style={infoContainerStyle}>
        {/* Contact Information Section */}
        <div style={infoBoxStyle}>
          <h2 style={infoTitleStyle}>Contact Information</h2>
          <div style={infoItemStyle}>
            <FaEnvelope style={iconStyle} />
            <p style={infoTextStyle}>
              <strong>Email:</strong> <a href="mailto:support@southgarden.com">support@southgarden.com</a>
            </p>
          </div>
          <div style={infoItemStyle}>
            <FaPhoneAlt style={iconStyle} />
            <p style={infoTextStyle}>
              <strong>Phone:</strong> <a href="tel:+639171234567">0917-123-4567</a>
            </p>
          </div>
          <div style={infoItemStyle}>
            <FaMapMarkerAlt style={iconStyle} />
            <p style={infoTextStyle}>
              <strong>Address:</strong> 45 Garden Street, South Garden Subdivision, Cavite City, Cavite
            </p>
          </div>
        </div>
        {/* Operating Hours Section */}
        <div style={infoBoxStyle}>
          <h2 style={infoTitleStyle}>Our Operating Hours</h2>
          <div style={infoItemStyle}>
            <FaClock style={iconStyle} />
            <p style={infoTextStyle}>Monday – Friday: 9:00 AM – 5:00 PM</p>
          </div>
          <p style={infoTextStyle}>
            <strong>For urgent inquiries:</strong> Please call us at <a href="tel:+639171234567">0917-123-4567</a>.
          </p>
        </div>
      </div>
    </div>
  );
}

const infoContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  gap: "20px",
  flexWrap: "wrap",
  marginTop: "20px",
};

const infoBoxStyle = {
  flex: "1 1 calc(50% - 20px)",
  minWidth: "300px",
  padding: "20px",
  border: "1px solid #ecf0f1",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  backgroundColor: "#ffffff",
};

const infoTitleStyle = {
  fontSize: "20px",
  color: "#2c3e50",
  marginBottom: "15px",
};

const infoItemStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "15px",
};

const iconStyle = {
  fontSize: "20px",
  color: "#3498db",
  marginRight: "10px",
};

const infoTextStyle = {
  fontSize: "16px",
  color: "#7f8c8d",
  margin: 0,
};

export default Contacts;
