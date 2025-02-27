import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";

const YourAccount = () => {
  const userId = localStorage.getItem("user_id");
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [reports, setReports] = useState([]);
  
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    middle_initial: "",
    address: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchUserAccount();
    fetchRequests();
    fetchReports();
  }, []);

  const fetchUserAccount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/subdicare_api/members/fetch_user_account.php?userId=${userId}`
      );
      setUser(response.data);
      setFormData({
        email: response.data.email || "",
        first_name: response.data.first_name || "",
        last_name: response.data.last_name || "",
        middle_initial: response.data.middle_initial || "",
        address: response.data.address || "",
        number: response.data.number || "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error fetching user account:", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/subdicare_api/members/fetch_requests.php?user_id=${userId}`
      );
      if (response.data.success) {
        setRequests(response.data.requests.filter(req => req.status === "approved"));
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/subdicare_api/members/fetch_reports.php?user_id=${userId}`
      );
      if (response.data.success) {
        setReports(response.data.reports.filter(rep => rep.status === "Resolved"));
      }
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  
    const handleUpdate = async () => {
        if (formData.password && formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
        }

        try {
        const updatedData = {};
        if (formData.email !== user.email) updatedData.email = formData.email;
        if (formData.first_name !== user.first_name) updatedData.first_name = formData.first_name;
        if (formData.last_name !== user.last_name) updatedData.last_name = formData.last_name;
        if (formData.middle_initial !== user.middle_initial) updatedData.middle_initial = formData.middle_initial;
        if (formData.address !== user.address) updatedData.address = formData.address;
        if (formData.number !== user.number) updatedData.number = formData.number;
        if (formData.password) updatedData.password = formData.password;

        if (Object.keys(updatedData).length === 0) {
            alert("No changes detected.");
            return;
        }

        updatedData.userId = userId;
        await axios.post("http://localhost:8080/subdicare_api/members/update_user_account.php", updatedData);
        alert("Profile updated successfully!");
        setEditMode(false);
        fetchUserAccount();
        } catch (error) {
        console.error("Error updating user:", error);
        }
    };


  return (
    <div style={{ padding: "20px", maxWidth: "800px", marginLeft: "0 auto" }}>
    {/* User Profile Section */}
    <div style={styles.card}>
      <h2>Member Profile</h2>
      <p>
        <strong>Full Name:</strong>{" "}
        {user.first_name} {user.middle_initial ? user.middle_initial + " " : ""} {user.last_name}
      </p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>Phone Number:</strong> {user.number}</p>
      <button onClick={() => setEditMode(true)} style={styles.button}>Edit</button>
    </div>

    {/* Tabs for Requests & Reports */}
    <div style={styles.tabContainer}>
      <button
        onClick={() => setActiveTab("requests")}
        style={activeTab === "requests" ? styles.activeTab : styles.tab}
      >
        Approved Requests
      </button>
      <button
        onClick={() => setActiveTab("reports")}
        style={activeTab === "reports" ? styles.activeTab : styles.tab}
      >
        Resolved Reports
      </button>
    </div>

    {/* Content based on Active Tab */}
    <div>
      {activeTab === "requests" ? (
        <div>
          <h3>Approved Requests</h3>
          {requests.length > 0 ? (
            <Carousel>
              {requests.map((req) => (
                <Carousel.Item key={req.id}>
                  <div style={styles.requestCard}>
                    <div style={styles.greenCircle}></div>
                    <strong>{req.event}</strong>
                    <p>{req.description}</p>
                    <p><strong>Location:</strong> {req.address}</p>
                    <p><strong>Date:</strong> {req.date}</p>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <p>No approved requests found.</p>
          )}
        </div>
      ) : (
        <div>
          <h3>Resolved Reports</h3>
          {reports.length > 0 ? (
            <Carousel>
              {reports.map((rep) => (
                <Carousel.Item key={rep.id}>
                  <div style={styles.requestCard}>
                    <div style={styles.greenCircle}></div>
                    <strong>{rep.title}</strong>
                    <p><strong>Priority:</strong> {rep.priority_level}</p>
                    <p><strong>Date Filed:</strong> {rep.date_filed}</p>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <p>No resolved reports found.</p>
          )}
        </div>
      )}
    </div>
  </div>

  
  );
};

const styles = {
    button: { padding: "10px", borderRadius: "5px", backgroundColor: "#007BFF", color: "white", cursor: "pointer" },
    cancelButton: { padding: "10px", borderRadius: "5px", backgroundColor: "#DC3545", color: "white", cursor: "pointer" },
    input: { width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" },
    card: { padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#fff", boxShadow: "0 4px 6px rgba(0,0,0,0.1)", marginBottom: "20px" },
    tabContainer: { display: "flex", gap: "10px", marginBottom: "20px" },
    tab: { padding: "10px 20px", borderRadius: "5px", cursor: "pointer", backgroundColor: "#ddd" },
    activeTab: { padding: "10px 20px", borderRadius: "5px", cursor: "pointer", backgroundColor: "#007BFF", color: "white" },
    requestCard: {
      position: "relative",
      padding: "15px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#5DBb63",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      marginBottom: "10px",
    },
    greenCircle: {
      position: "absolute",
      top: "10px",
      right: "10px",
      width: "12px",
      height: "12px",
      backgroundColor: "green",
      borderRadius: "50%",
    }
  };

export default YourAccount;
