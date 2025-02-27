import React, { useState, useEffect } from "react";
import { Table, Alert } from "react-bootstrap";

function Accounts() {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

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

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Members Management</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <p>Loading...</p>
      ) : (
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
      )}
    </div>
  );
}

export default Accounts;
