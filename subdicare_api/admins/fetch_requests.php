<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../db_connection.php"; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Fetch all requests grouped by status
        $stmt = $conn->prepare("
            SELECT status, COUNT(*) as count 
            FROM requests 
            GROUP BY status
        ");
        $stmt->execute();

        $statusCounts = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'data' => $statusCounts
        ]);
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage()); // Log any database errors
        echo json_encode([
            'success' => false,
            'message' => 'An error occurred while fetching the request statuses. Error: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}
?>
