import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./components.css";

function NavigationBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear local storage
    navigate("/"); // Redirect to homepage
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="custom-navbar">
    <div className="container-fluid">
      {/* Left Section: SubdiCare Brand */}
      <div className="navbar-left">
        <Navbar.Brand as={Link} to="/admin/home" className="subdicare-name">
          Admin
        </Navbar.Brand>
      </div>
  
      {/* Center Section: Navigation Links */}
      <div className="navbar-center">
        <Nav className="navbar-links">
          <Nav.Link as={Link} to="/admin/home" className="nav-link">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/announcements" className="nav-link">
            Announcements
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/report" className="nav-link">
            Reports
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/request" className="nav-link">
            Request Services
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/account" className="nav-link">
            Accounts
          </Nav.Link>
        </Nav>
      </div>
  
      {/* Right Section: Logout */}
      <div className="navbar-right">
        <Nav>
          <Nav.Link onClick={handleLogout} className="logout-link">
            Logout
          </Nav.Link>
        </Nav>
      </div>
    </div>
  </Navbar>
  
  );
}

export default NavigationBar;
