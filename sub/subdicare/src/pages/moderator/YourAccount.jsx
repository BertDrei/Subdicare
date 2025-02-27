import React, { useEffect, useState } from "react";
import axios from "axios";

const YourAccount = () => {
  const userId = localStorage.getItem("user_id");
  const [user, setUser] = useState({});
  const [announcements, setAnnouncements] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchUserAccount();
    fetchUserAnnouncements();
  }, []);

  const fetchUserAccount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/subdicare_api/moderators/fetch_user_account.php?userId=${userId}`
      );
      setUser(response.data);
      setFormData({
        username: response.data.username,
        email: response.data.email,
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error fetching user account:", error);
    }
  };

  const fetchUserAnnouncements = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/subdicare_api/moderators/fetch_user_announcement.php?userId=${userId}`
      );
      if (Array.isArray(response.data)) {
        setAnnouncements(response.data);
      } else {
        setAnnouncements([]);
      }
    } catch (error) {
      console.error("Error fetching announcements:", error);
      setAnnouncements([]);
    }
  };

  const handleUpdate = async () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const updatedData = {};
      if (formData.username !== user.username) updatedData.username = formData.username;
      if (formData.email !== user.email) updatedData.email = formData.email;
      if (formData.password) updatedData.password = formData.password;

      if (Object.keys(updatedData).length === 0) {
        alert("No changes detected.");
        return;
      }

      updatedData.userId = userId;
      await axios.post("http://localhost:8080/subdicare_api/moderators/update_user_account.php", updatedData);
      alert("Profile updated successfully!");
      setEditMode(false);
      fetchUserAccount();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
<div style={{ padding: "20px", maxWidth: "800px", marginLeft: "0" }}>

      {/* User Profile Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          marginBottom: "20px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <h2>User Profile</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Status:</strong> {user.status}</p>
        <button onClick={() => setEditMode(true)} style={styles.button}>Edit</button>
      </div>

      <hr style={{ margin: "20px 0", borderTop: "2px solid #ddd" }} />

      {/* Announcements Section */}
      <h2>My Announcements</h2>
      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <div
            key={announcement.id}
            style={{
              width: "97vw",
              maxWidth: "100vw",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "20px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
              marginBottom: "10px",
            }}
          >
            <h3 style={{ margin: "0 0 10px" }}>{announcement.title}</h3>
            <hr style={{ border: "none", borderTop: "2px solid #000", margin: "10px 0" }} />
            <p style={{ margin: "0 0 15px", color: "#555" }}>{announcement.description}</p>
            <small style={{ color: "#888" }}>Published: {announcement.date_published}</small>
          </div>
        ))
      ) : (
        <p>No announcements yet</p>
      )}

      {/* Edit Profile Modal */}
      {editMode && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Edit Profile</h3>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              placeholder="Username"
              style={styles.input}
            />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Email"
              style={styles.input}
            />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="New Password"
              style={styles.input}
            />
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              placeholder="Confirm Password"
              style={styles.input}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleUpdate} style={styles.button}>Save</button>
              <button onClick={() => setEditMode(false)} style={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  button: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#007BFF",
    color: "white",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#DC3545",
    color: "white",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default YourAccount;
