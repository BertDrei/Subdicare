import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RequestCharts = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch request status data
    async function fetchRequests() {
      try {
        const response = await fetch("http://localhost:8080/subdicare_api/admins/fetch_requests.php");
        const data = await response.json();

        if (data.success) {
          // Process data for chart
          const statuses = ["pending", "approved", "rejected"];
          const counts = statuses.map(
            (status) => data.data.find((item) => item.status === status)?.count || 0
          );

          setChartData({
            labels: statuses,
            datasets: [
              {
                label: "Request Status Count",
                data: counts,
                backgroundColor: ["#FF0000", "#008000", "#0000FF"], // Red (Pending), Green (Approved), Blue (Rejected)
                borderColor: ["#FF0000", "#008000", "#0000FF"],
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.error("Failed to fetch request data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching request data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, []);

  if (loading) {
    return <div>Loading chart...</div>;
  }

  return (
    <div style={{ width: "99vw", height: "400px", margin: "0 auto", overflowX: "hidden" }}>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            indexAxis: "y", // Horizontal bar chart
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              title: {
                display: true,
                text: "Request Status Overview",
                font: {
                  size: 18,
                },
              },
            },
            scales: {
              x: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Count",
                  font: {
                    size: 14,
                  },
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Status",
                  font: {
                    size: 14,
                  },
                },
              },
            },
          }}
        />
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default RequestCharts;
