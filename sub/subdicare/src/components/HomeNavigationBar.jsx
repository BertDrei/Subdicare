import React, { useState } from "react";
import { Navbar, Nav, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import LogInPage from "../pages/home/LogInPage"; // Import the login modal component
import logo from "../assets/logo.jpg"; // Import the logo from the assets folder
import "./components.css";

function HomeNavigationBar() {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
        <div className="container-fluid d-flex align-items-center">
          {/* Logo and Brand */}
          <div className="d-flex align-items-center">
            <img
              src={logo}
              alt="SubdiCare Logo"
              className="rounded-circle"
              style={{ width: "40px", height: "40px", marginRight: "10px" }}
            />
            <Navbar.Brand as={Link} to="/" className="subdicare-name">
              SubdiCare
            </Navbar.Brand>
          </div>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-center">
            {/* Centered Navigation Links */}
            <Nav>
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about-us">
                About Us
              </Nav.Link>
              <Nav.Link as={Link} to="/contacts">
                Contacts
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button variant="outline-light" onClick={handleShow}>
            Log In
          </Button>
        </div>
      </Navbar>

 {/* Modal for Login */}
 <Modal
  show={showModal}
  onHide={handleClose}
  centered
  size="lg" // Adjust the size to make it larger
  aria-labelledby="contained-modal-title-vcenter"
>
  <Modal.Header closeButton>
    <Modal.Title className="text-center w-100">
      <img
        src={logo}
        alt="SubdiCare Logo"
        style={{ width: "100px", height: "100px", marginBottom: "15px" }} // Increased logo size
        className="rounded-circle"
      />
      <div className="mt-2" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        Welcome to SubdiCare
      </div>
    </Modal.Title>
  </Modal.Header>
  <Modal.Body className="d-flex justify-content-center align-items-center" style={{ padding: "40px" }}>
    <LogInPage />
  </Modal.Body>
</Modal>


    </>
  );
}

export default HomeNavigationBar;
