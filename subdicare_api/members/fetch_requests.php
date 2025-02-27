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
        // Explicitly cast user_id to string to match the VARCHAR type in the database
        $user_id = (string)$user_id;

        // Fetch requests for the specific resident
        $stmt = $conn->prepare("
            SELECT id, name, event, status, description, address, date, resident_id 
            FROM requests 
            WHERE resident_id = :resident_id 
            ORDER BY date DESC
        ");
        $stmt->bindParam(':resident_id', $user_id, PDO::PARAM_STR); // Ensure string binding
        $stmt->execute();

        $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($requests) {
            echo json_encode([
                'success' => true,
                'requests' => $requests
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'No requests found for this user.'
            ]);
        }
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage()); // Log database errors for debugging
        echo json_encode([
            'success' => false,
            'message' => 'An error occurred while fetching the requests. Error: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}
?>
