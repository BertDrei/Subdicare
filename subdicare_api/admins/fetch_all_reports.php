<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../db_connection.php"; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Fetch all reports with detailed information
        $stmt = $conn->prepare("
            SELECT id, title, priority_level, filed_by, resident_id, date_filed, description, status, image 
            FROM reports 
            ORDER BY date_filed DESC
        ");
        $stmt->execute();

        $reports = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($reports) {
            // Format image paths
            $base_url = "http://localhost:8080/uploads/"; // Adjust to your actual image directory
            foreach ($reports as &$report) {
                if (!empty($report['image'])) {
                    $report['image_path'] = $base_url . $report['image'];
                } else {
                    $report['image_path'] = null; // No image
                }
            }

            echo json_encode([
                'success' => true,
                'reports' => $reports
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'No reports found.'
            ]);
        }
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage()); // Log any database errors
        echo json_encode([
            'success' => false,
            'message' => 'An error occurred while fetching the reports. Error: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}
?>
