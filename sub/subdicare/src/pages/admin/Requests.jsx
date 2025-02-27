import React, { useState, useEffect } from "react";
import { Table, Form, Modal, Button, Spinner } from "react-bootstrap";

function Requests() {
  const [requests, setRequests] = useState([]);
  const [statusOptions] = useState(["pending", "approved", "rejected"]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8080/subdicare_api/admins/fetch_all_requests.php"
        );
        const data = await response.json();

        if (data.success) {
          // Filter out requests with status "deleted"
          const filteredRequests = data.requests?.filter(request => request.status !== "deleted") || [];
          setRequests(filteredRequests);
        } else {
          setError(data.message || "Failed to fetch service requests.");
        }
      } catch (err) {
        setError("An error occurred while fetching service requests.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(
        "http://localhost:8080/subdicare_api/admins/update_requests_status.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status: newStatus }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === id ? { ...request, status: newStatus } : request
          )
        );
        setSuccessMessage("Status updated successfully!");
      } else {
        setSuccessMessage(result.message || "Failed to update status.");
      }
    } catch (err) {
      setSuccessMessage("An error occurred while updating the status.");
      console.error(err);
    }
  };

  const handleDeleteRequest = (id) => {
    handleStatusChange(id, "deleted"); // Reuse the status change function to mark as deleted
    window.location.reload(); // Refresh the page
  };
  

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Service Requests</h2>

      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Event</th>
              <th>Filed By</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.name}</td>
                  <td>{request.date}</td>
                  <td>{request.event || "N/A"}</td>
                  <td>{request.filed_by || "N/A"}</td>
                  <td>
                    <Form.Select
                      value={request.status}
                      onChange={(e) =>
                        handleStatusChange(request.id, e.target.value)
                      }
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => setSelectedRequest(request)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteRequest(request.id)}
                      style={{ marginLeft: "10px" }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No service requests available.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* Modal for Request Details */}
      <Modal
        show={!!selectedRequest}
        onHide={() => setSelectedRequest(null)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Request Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRequest && (
            <div>
              <p>
                <strong>Name:</strong> {selectedRequest.name}
              </p>
              <p>
                <strong>Date:</strong> {selectedRequest.date}
              </p>
              <p>
                <strong>Event:</strong> {selectedRequest.event || "N/A"}
              </p>
              <p>
                <strong>Description:</strong> {selectedRequest.description || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {selectedRequest.address}
              </p>
              <p>
                <strong>Filed By:</strong> {selectedRequest.filed_by || "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {selectedRequest.status}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelectedRequest(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Message Modal */}
      <Modal show={!!successMessage} onHide={() => setSuccessMessage(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{successMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setSuccessMessage(null)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Requests;
