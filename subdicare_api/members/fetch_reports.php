<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../db_connection.php"; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user_id = $_GET['user_id'] ?? null;

    if (!$user_id) {
        echo json_encode([
            'success' => false,
            'message' => 'User ID is required.'
        ]);
        exit;
    }

    try {
        // Explicitly cast user_id to string for consistency with the database
        $user_id = (string)$user_id;

        // Fetch reports for the specific user
        $stmt = $conn->prepare("
            SELECT id, title, priority_level, status, date_filed, resident_id 
            FROM reports 
            WHERE resident_id = :resident_id 
            ORDER BY date_filed DESC
        ");
        $stmt->bindParam(':resident_id', $user_id, PDO::PARAM_STR); // Bind as a string
        $stmt->execute();

        $reports = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($reports) {
            echo json_encode([
                'success' => true,
                'reports' => $reports
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'No reports found for this user.'
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
