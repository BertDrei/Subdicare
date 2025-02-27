import React, { useState, useEffect } from "react";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Fetch user_id from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Fetch announcements
  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const response = await fetch(
          "http://localhost:8080/subdicare_api/admins/fetch_announcements.php"
        );
        const data = await response.json();
        if (data.success) {
          setAnnouncements(data.data);
        } else {
          console.error("Failed to fetch announcements:", data.message);
        }
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncements();
  }, []);

  // Add announcement
  async function handleAddAnnouncement(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/subdicare_api/admins/create_announcement.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description, filed_by: userId }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setAnnouncements((prev) => [data.announcement, ...prev]);
        setShowModal(false);
        setTitle("");
        setDescription("");
      } else {
        console.error("Failed to add announcement:", data.message);
      }
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ margin: 0 }}>Announcements</h1>
        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Announcement
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {loading ? (
          <p>Loading announcements...</p>
        ) : announcements.length > 0 ? (
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
              }}
            >
              <h3 style={{ margin: "0 0 10px" }}>{announcement.title}</h3>
              <hr
                style={{
                  border: "none",
                  borderTop: "2px solid #000",
                  margin: "10px 0",
                }}
              />
              <p style={{ margin: "0 0 15px", color: "#555" }}>
                {announcement.description}
              </p>
              <small style={{ color: "#888" }}>
                Published: {announcement.date_published}
              </small>
            </div>
          ))
        ) : (
          <p>No announcements found.</p>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "8px",
              width: "400px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ marginBottom: "20px" }}>Add Announcement</h2>
            <form onSubmit={handleAddAnnouncement}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                  }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    resize: "none",
                    height: "100px",
                  }}
                ></textarea>
              </div>
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Post Announcement
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{
                  marginLeft: "10px",
                  padding: "10px 20px",
                  backgroundColor: "#ddd",
                  color: "#333",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcement;
