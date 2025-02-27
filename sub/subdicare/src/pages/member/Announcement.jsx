import React, { useState, useEffect } from "react";

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

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
    </div>
  );
};

export default Announcement;
