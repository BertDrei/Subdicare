import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Table, Alert } from "react-bootstrap";

function Report() {
  const [reports, setReports] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    priority_level: "medium",
    description: "",
    image: null,
  });
  const [selectedReport, setSelectedReport] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    if (!userId) {
      alert("User ID not found in local storage.");
      return;
    }

    const fetchReports = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/subdicare_api/members/fetch_reports.php?user_id=${userId}`
        );
        const data = await response.json();
        if (data.success) {
          setReports(data.reports);
        } else {
          setFetchError(data.message);
        }
      } catch (error) {
        setFetchError("An error occurred while fetching reports.");
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, GIF). ");
      return;
    }
    setFormData((prevState) => ({ ...prevState, image: file }));
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Error: User ID not found.");
      return;
    }
    const { title, priority_level, description, image } = formData;
    const reportData = {
      title,
      priority_level,
      description,
      resident_id: userId,
      filed_by: userId,
      image: image ? await toBase64(image) : null,
    };
    try {
      const response = await fetch(
        "http://localhost:8080/subdicare_api/members/report.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reportData),
        }
      );
      const result = await response.json();
      if (result.success) {
        alert("Report submitted successfully!");
        setFormData({ title: "", priority_level: "medium", description: "", image: null });
        setShowCreateModal(false);
        const updatedReportsResponse = await fetch(
          `http://localhost:8080/subdicare_api/members/fetch_reports.php?user_id=${userId}`
        );
        const updatedReportsData = await updatedReportsResponse.json();
        if (updatedReportsData.success) {
          setReports(updatedReportsData.reports);
        }
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("An error occurred while submitting the report. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Report Management</h2>
      <p className="text-muted">Submit reports related to your community or view previously filed reports.</p>
      <Button variant="primary" onClick={() => setShowCreateModal(true)} className="mb-3">
        File a New Report
      </Button>
      {fetchError && <Alert variant="danger">{fetchError}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Resident ID</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
  {reports.length > 0 ? (
    reports.map((report) => (
      <tr
        key={report.id}
        onClick={() => {
          setSelectedReport(report);
          setShowDetailsModal(true);
        }}
        style={{ cursor: "pointer" }}
      >
        <td>{report.resident_id}</td>
        <td>{report.title}</td>
        <td>{report.priority_level}</td>
        <td>
          {report.status === "Deleted" ? (
            <span style={{ color: "red", fontWeight: "bold" }}>
              Your report has been deleted by the admin
            </span>
          ) : (
            report.status
          )}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" className="text-center">No reports available.</td>
    </tr>
  )}
</tbody>

      </Table>
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>File a New Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={formData.title} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formPriority">
              <Form.Label>Priority Level</Form.Label>
              <Form.Control as="select" name="priority_level" value={formData.priority_level} onChange={handleInputChange}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" name="description" value={formData.description} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Attach Image (optional)</Form.Label>
              <Form.Control type="file" name="image" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">Submit Report</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Report;
