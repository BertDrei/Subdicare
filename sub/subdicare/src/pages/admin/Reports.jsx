import React, { useState, useEffect } from "react";
import { Table, Form, Modal, Button } from "react-bootstrap";

function Reports() {
  const [reports, setReports] = useState([]);
  const [statusOptions] = useState(["Pending", "Ongoing", "Resolved"]); // Status dropdown options
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null); // For modal details
  const [showAlert, setShowAlert] = useState(false); // Modal alert state

  // Fetch reports
  useEffect(() => {
    async function fetchReports() {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:8080/subdicare_api/admins/fetch_all_reports.php"
        );
        const data = await response.json();

        if (data.success) {
          // Filter out deleted reports
          const activeReports = data.reports.filter(report => report.status !== "Deleted");
          setReports(activeReports || []);
        } else {
          setError(data.message || "Failed to fetch reports.");
        }
      } catch (err) {
        setError("An error occurred while fetching reports.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  // Handle status change (Update or Delete)
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(
        "http://localhost:8080/subdicare_api/admins/update_report_status.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status: newStatus }),
        }
      );

      const result = await response.json();

      if (result.success) {
        if (newStatus === "Deleted") {
          // "Delete" the report by updating the status to 'Deleted'
          setReports((prevReports) =>
            prevReports.filter((report) => report.id !== id) // Remove from UI
          );
        } else {
          // Update the report status if not deleted
          setReports((prevReports) =>
            prevReports.map((report) =>
              report.id === id ? { ...report, status: newStatus } : report
            )
          );
        }
        setShowAlert(true); // Show success alert
        setTimeout(() => setShowAlert(false), 3000); // Auto-hide alert after 3 seconds
      } else {
        alert(result.message || "Failed to update status.");
      }
    } catch (err) {
      alert("An error occurred while updating the status.");
      console.error(err);
    }
  };

  const handleRowClick = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReport(null);
  };

  if (loading) {
    return <p>Loading reports...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Reports</h2>
      {showAlert && (
        <Modal show={showAlert} onHide={() => setShowAlert(false)} centered>
          <Modal.Body>
            <p className="text-success text-center">
              Status updated successfully!
            </p>
          </Modal.Body>
        </Modal>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Filed By</th>
            <th>Status</th>
            <th>Actions</th> {/* Add actions column */}
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <tr key={report.id} onClick={() => handleRowClick(report)}>
                <td>{report.title}</td>
                <td>{report.priority_level}</td>
                <td>{report.filed_by}</td>
                <td>
                  <Form.Select
                    value={report.status}
                    onClick={(e) => e.stopPropagation()} // Prevent modal from opening
                    onChange={(e) =>
                      handleStatusChange(report.id, e.target.value)
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
                    variant="danger"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent modal from opening
                      handleStatusChange(report.id, "Deleted"); // Update status to Deleted
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No reports available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal for displaying detailed information */}
      {selectedReport && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Report Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Title:</strong> {selectedReport.title}
            </p>
            <p>
              <strong>Description:</strong> {selectedReport.description}
            </p>
            <p>
              <strong>Date Filed:</strong>{" "}
              {new Date(selectedReport.date_filed).toLocaleString()}
            </p>
            <p>
              <strong>Filed By:</strong> {selectedReport.filed_by}
            </p>
            <p>
              <strong>Status:</strong> {selectedReport.status}
            </p>
            {selectedReport.image && (
              <div>
                <strong>Image:</strong>
                <br />
                <img
                  src={selectedReport.image}
                  alt="Report"
                  style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
                />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Reports;
