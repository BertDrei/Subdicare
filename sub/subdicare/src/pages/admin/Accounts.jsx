import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Alert } from "react-bootstrap";

function Accounts() {
  const [activeTab, setActiveTab] = useState("members"); // Toggle between 'members' and 'moderators'
  const [members, setMembers] = useState([]);
  const [moderators, setModerators] = useState([]);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showModeratorModal, setShowModeratorModal] = useState(false);
  
  const [newModerator, setNewModerator] = useState({ username: "", email: "", password: "" });
  const [alertMessage, setAlertMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState({ username: "", email: "", password: "" });
  


  useEffect(() => {
    fetchMembers();
    fetchModerators();
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/subdicare_api/admins/fetch_all_admins.php");
      const data = await response.json();
  
      if (data.success) {
        setAdmins(data.admins || []);
      } else {
        setError(data.message || "Failed to fetch admins.");
      }
    } catch (err) {
      setError("An error occurred while fetching admins.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const handleCreateAdmin = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/subdicare_api/admins/create_admin.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAdmin),
        }
      );
  
      const result = await response.json(); // Await the JSON response
  
      if (response.ok && result.success) {  // Ensure response is successful
        setAdmins((prev) => [
          ...prev,
          { id: result.id, username: newAdmin.username, email: newAdmin.email },
        ]);
        setAlertMessage("Admin created successfully!");
        setTimeout(() => setAlertMessage(null), 3000);
        setShowAdminModal(false);
        setNewAdmin({ username: "", email: "", password: "" });
      } else {
        // If response is not successful, show the error message from the PHP response
        alert(result.message || "Failed to create admin.");
      }
    } catch (err) {
      alert("An error occurred while creating the admin.");
      console.error(err);
    }
  };
  

  const handleDeleteAdmin = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/subdicare_api/admins/delete_admin.php`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );
  
      const result = await response.json();
      console.log(result);  // Log result for debugging
  
      if (result.success) {
        setAdmins((prev) => prev.filter((admin) => admin.id !== id));
        setAlertMessage("Admin deleted successfully!");
        setTimeout(() => setAlertMessage(null), 3000);
      } else {
        alert(result.message || "Failed to delete admin.");
      }
    } catch (err) {
      alert("An error occurred while deleting the admin.");
      console.error(err);
    }
  };
  
  

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/subdicare_api/admins/fetch_all_members.php");
      const data = await response.json();

      if (data.success) {
        setMembers(data.members || []);
      } else {
        setError(data.message || "Failed to fetch members.");
      }
    } catch (err) {
      setError("An error occurred while fetching members.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchModerators = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/subdicare_api/admins/fetch_all_moderators.php");
      const data = await response.json();

      if (data.success) {
        setModerators(data.moderators || []);
      } else {
        setError(data.message || "Failed to fetch moderators.");
      }
    } catch (err) {
      setError("An error occurred while fetching moderators.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateModerator = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/subdicare_api/admins/create_moderator.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...newModerator, status: "active" }), // Auto-set status
        }
      );
  
      const result = await response.json();
  
      if (result.success) {
        setModerators((prev) => [
          ...prev,
          { id: result.id, username: newModerator.username, email: newModerator.email, status: "active" }
        ]);
        setAlertMessage("Moderator created successfully!");
        setTimeout(() => setAlertMessage(null), 3000);
        setShowModeratorModal(false);
        setNewModerator({ username: "", email: "", password: "" });
      } else {
        alert(result.message || "Failed to create moderator.");
      }
    } catch (err) {
      alert("An error occurred while creating the moderator.");
      console.error(err);
    }
  };
  
  

  const handleDeleteModerator = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/subdicare_api/admins/delete_moderator.php`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }), // Make sure the ID is passed as JSON
        }
      );
  
      const result = await response.json();
  
      if (result.success) {
        setModerators((prev) => prev.filter((moderator) => moderator.id !== id));
        setAlertMessage("Moderator deleted successfully!");
        setTimeout(() => setAlertMessage(null), 3000);
      } else {
        alert(result.message || "Failed to delete moderator.");
      }
    } catch (err) {
      alert("An error occurred while deleting the moderator.");
      console.error(err);
    }
  };
  

  const handleToggleModeratorStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8080/subdicare_api/admins/toggle_moderator_status.php`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status: currentStatus }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setModerators((prev) =>
          prev.map((moderator) =>
            moderator.id === id
              ? { ...moderator, status: result.newStatus }
              : moderator
          )
        );
        setAlertMessage("Moderator status updated successfully!");
        setTimeout(() => setAlertMessage(null), 3000);
      } else {
        alert(result.message || "Failed to update moderator status.");
      }
    } catch (err) {
      alert("An error occurred while updating the moderator status.");
      console.error(err);
    }
  };

  const renderTable = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p className="text-danger">{error}</p>;
    }

    if (activeTab === "members") {
      return (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Address</th>
              <th>Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Middle Initial</th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((member) => (
                <tr key={member.id}>
                  <td>{member.id}</td>
                  <td>{member.email}</td>
                  <td>{member.address}</td>
                  <td>{member.number}</td>
                  <td>{member.first_name}</td>
                  <td>{member.last_name}</td>
                  <td>{member.middle_initial || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No members available.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      );
    } else if (activeTab === "moderators") {
      return (
        <div>
          <Button variant="primary" onClick={() => setShowModeratorModal(true)}>Add Moderator</Button>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {moderators.length > 0 ? (
                moderators.map((moderator) => (
                  <tr key={moderator.id}>
                    <td>{moderator.id}</td>
                    <td>{moderator.username}</td>
                    <td>{moderator.email}</td>
                    <td>{moderator.status}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteModerator(moderator.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        className="ms-2"
                        onClick={() =>
                          handleToggleModeratorStatus(
                            moderator.id,
                            moderator.status
                          )
                        }
                      >
                        {moderator.status === "active" ? "Deactivate" : "Activate"}
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No moderators available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      );
    }
    else if (activeTab === "admins") {
      return (
        <div>
        <Button variant="primary" onClick={() => setShowAdminModal(true)}>Add Admin</Button>
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.id}</td>
                    <td>{admin.username}</td>
                    <td>{admin.email}</td>
                    <td>
                      <Button variant="danger" size="sm" onClick={() => handleDeleteAdmin(admin.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No admins available.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      );
    }
    
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Accounts Management</h2>
      {alertMessage && <Alert variant="success">{alertMessage}</Alert>}
      <div className="mb-3">
        <Button
          variant={activeTab === "members" ? "primary" : "outline-primary"}
          onClick={() => setActiveTab("members")}
        >
          Members
        </Button>
        <Button
          variant={activeTab === "moderators" ? "primary" : "outline-primary"}
          onClick={() => setActiveTab("moderators")}
          className="ms-2"
        >
          Moderators
        </Button>
                <Button
          variant={activeTab === "admins" ? "primary" : "outline-primary"}
          onClick={() => setActiveTab("admins")}
          className="ms-2"
        >
          Admins
        </Button>

      </div>
      {renderTable()}

      {/* Create Moderator Modal */}
      <Modal show={showAdminModal} onHide={() => setShowAdminModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Create Admin</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={newAdmin.username}
          onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={newAdmin.email}
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={newAdmin.password}
          onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowAdminModal(false)}>
      Close
    </Button>
    <Button variant="primary" onClick={handleCreateAdmin}>
      Create
    </Button>
  </Modal.Footer>
</Modal>


<Modal show={showModeratorModal} onHide={() => setShowModeratorModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Create Moderator</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={newModerator.username}
          onChange={(e) => setNewModerator({ ...newModerator, username: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={newModerator.email}
          onChange={(e) => setNewModerator({ ...newModerator, email: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={newModerator.password}
          onChange={(e) => setNewModerator({ ...newModerator, password: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Status (Default: Active)</Form.Label>
        <Form.Control type="text" value="Active" readOnly />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModeratorModal(false)}>
      Close
    </Button>
    <Button variant="primary" onClick={handleCreateModerator}>
      Create
    </Button>
  </Modal.Footer>
</Modal>


    </div>
  );
}

export default Accounts;
