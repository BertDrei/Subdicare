import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";

function Request() {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    event: "",
    description: "",
    address: "",
  });
  const [userAddress, setUserAddress] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      fetchRequests(userId);
      fetchMemberAddress(userId);
    }
  }, []);

  const fetchRequests = async (userId) => {
    try {
      setError(null);
      const response = await fetch(
        `http://localhost:8080/subdicare_api/members/fetch_requests.php?user_id=${userId}`
      );
      const data = await response.json();
      if (data.success) {
        setRequests(data.requests);
      } else {
        setRequests([]);
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch requests.");
    }
  };

  const fetchMemberAddress = async (userId) => {
    try {
      setError(null);
      const response = await fetch(
        `http://localhost:8080/subdicare_api/members/fetch_member.php?id=${userId}`
      );
      const data = await response.json();
      if (data.success) {
        setUserAddress(data.address);
        setFormData((prev) => ({ ...prev, address: data.address }));
      } else {
        setUserAddress("");
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch member address.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      alert("User ID not found.");
      return;
    }

    const requestData = {
      ...formData,
      resident_id: userId,
    };

    try {
      setError(null);
      const response = await fetch(
        "http://localhost:8080/subdicare_api/members/service.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      const data = await response.json();
      if (data.success) {
        setSuccessMessage("Service request submitted successfully.");
        setFormData({
          name: "",
          date: "",
          event: "",
          description: "",
          address: userAddress,
        });
        fetchRequests(userId);
        setShowModal(false);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to submit request.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ marginBottom: "20px", color: "#2c3e50" }}>
        Submit a Service Request
      </h2>
      {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
      {successMessage && (
        <p style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>
      )}
      <Button
        style={{
          backgroundColor: "#007bff",
          border: "none",
          marginBottom: "20px",
        }}
        onClick={() => setShowModal(true)}
      >
        File a Service Request
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submit a New Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {[
              { label: "Request Title", name: "name", type: "text" },
              { label: "Date", name: "date", type: "date" },
              { label: "Event", name: "event", type: "text" },
              { label: "Description", name: "description", type: "textarea" },
              { label: "Address", name: "address", type: "text" },
            ].map((field, index) => (
              <Form.Group
                key={index}
                controlId={`form${field.name}`}
                style={{ marginBottom: "15px" }}
              >
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  as={field.type === "textarea" ? "textarea" : "input"}
                />
              </Form.Group>
            ))}
            <Button
              style={{
                backgroundColor: "#007bff",
                border: "none",
                width: "100%",
              }}
              type="submit"
            >
              Submit Request
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <div style={{ marginTop: "30px" }}>
        <h3 style={{ color: "#2c3e50", marginBottom: "15px" }}>
          Submitted Requests
        </h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              {[
                
                "Resident Id",
               
                "Event",
                "Date",
                "Status",
                "Description",
                "Address",
                "Status",
              ].map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((req) => (
                <tr key={req.id}>
                   <td>{req.resident_id}</td>
                  <td>{req.name}</td>
                  <td>{req.date}</td>
                  <td>{req.event}</td>
                  
                  <td>{req.description}</td>
                  <td>{req.address}</td>
                  <td>
          {req.status === "deleted" ? (
            <span style={{ color: "red", fontWeight: "bold" }}>
              Your request has been deleted by the admin
            </span>
          ) : (
            req.status
          )}
        </td>
                 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Request;
