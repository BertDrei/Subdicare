<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../db_connection.php"; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Fetch all admins
        $stmt = $conn->prepare("
            SELECT id, username, email 
            FROM admin 
            ORDER BY username ASC
        ");
        $stmt->execute();

        $admins = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'admins' => $admins
        ]);
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage());
        echo json_encode([
            'success' => false,
            'message' => 'An error occurred while fetching admins.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}
?>
