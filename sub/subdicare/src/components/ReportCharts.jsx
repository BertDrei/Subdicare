import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportCharts = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch report status data
    async function fetchReports() {
      try {
        const response = await fetch("http://localhost:8080/subdicare_api/admins/fetch_reports.php");
        const data = await response.json();

        if (data.success) {
          // Process data for chart
          const statuses = ["Pending", "Ongoing", "Resolved"];
          const counts = statuses.map(
            (status) => data.data.find((item) => item.status === status)?.count || 0
          );

          setChartData({
            labels: statuses,
            datasets: [
              {
                label: "Report Status Count",
                data: counts,
                backgroundColor: ["#FF0000", "#FFA500", "#008000"], // Red, Orange, Green
                borderColor: ["#FF0000", "#FFA500", "#008000"],
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.error("Failed to fetch report data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
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
            maintainAspectRatio: false, // Allows custom height
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              title: {
                display: true,
                text: "Report Status Overview ",
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
                  text: "",
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

export default ReportCharts;
