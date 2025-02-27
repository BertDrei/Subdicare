import React, { useEffect, useState } from "react";
import ReportCharts from "../../components/ReportCharts";
import RequestCharts from "../../components/RequestCharts";
import Table from "react-bootstrap/Table";

const Home = () => {
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("report");
  const [reportData, setReportData] = useState([]);
  const [requestData, setRequestData] = useState([]);

  useEffect(() => {
    async function fetchMemberCount() {
      try {
        const response = await fetch("http://localhost:8080/subdicare_api/admins/fetch_all_members.php");
        const data = await response.json();
        if (data.success) {
          setTotalMembers(data.total_members);
        } else {
          console.error("Failed to fetch member count:", data.message);
        }
      } catch (error) {
        console.error("Error fetching member count:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchReports() {
      try {
        const response = await fetch("http://localhost:8080/subdicare_api/admins/fetch_all_reports.php");
        const data = await response.json();
        if (data.success) {
          // Filter out reports that are marked as deleted
          const filteredReports = data.reports.filter(report => report.status !== 'Deleted');
          setReportData(filteredReports);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    }

    async function fetchRequests() {
      try {
        const response = await fetch("http://localhost:8080/subdicare_api/admins/fetch_all_requests.php");
        const data = await response.json();
        if (data.success) {
          // Filter out requests that are marked as deleted
          const filteredRequests = data.requests.filter(request => request.status !== 'deleted');
          setRequestData(filteredRequests);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    }

    fetchMemberCount();
    fetchReports();
    fetchRequests();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", width: "80%", margin: "auto" }}>
      {/* Top Section */}
      <div style={{ display: "flex", width: "100%", justifyContent: "flex-start", alignItems: "center", gap: "15px" }}>
        {/* Member Count Card */}
        <div style={{ 
          width: "300px", padding: "20px", backgroundColor: "#f5f5f5", borderRadius: "10px", alignSelf: "flex-start",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)" 
        }}>
          <h3>Total Registered Residents</h3>
          {loading ? <p>Loading...</p> : <h1>{totalMembers}</h1>}
        </div>
        
        {/* Chart Section (Smaller & Moved Left) */}
        {activeTab === "report" ? <ReportCharts /> : <RequestCharts />}
      </div>
      
      {/* Tab Navigation */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        <button onClick={() => setActiveTab("report")} style={{ padding: "10px", cursor: "pointer", borderBottom: activeTab === "report" ? "2px solid blue" : "none" }}>Report</button>
        <button onClick={() => setActiveTab("request")} style={{ padding: "10px", cursor: "pointer", borderBottom: activeTab === "request" ? "2px solid blue" : "none" }}>Request</button>
      </div>

      {/* Table Section (Scrollable if height exceeds 300px) */}
      <div style={{ width: "100%", marginTop: "5px", maxHeight: "300px", overflowY: "auto" }}>
        <Table striped bordered hover style={{ width: "100%" }}>
          <thead>
            <tr>
              {activeTab === "report" ? (
                <>
                  <th>Resident ID</th>
                  <th>Filed By</th>
                  <th>Priority Level</th>
                  <th>Title</th>
                </>
              ) : (
                <>
                  <th>Name</th>
                  <th>Resident ID</th>
              
                  <th>Description</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {activeTab === "report" ? (
              reportData.map((report, index) => (
                <tr key={index}>
                  <td>{report.resident_id}</td>
                  <td>{report.filed_by}</td>
                  <td>{report.priority_level}</td>
                  <td>{report.title}</td>
                </tr>
              ))
            ) : (
              requestData.map((request, index) => (
                <tr key={index}>
                  <td>{request.name}</td>
                  <td>{request.resident_id}</td>
                 
                  <td>{request.description}</td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
