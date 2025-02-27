<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "../db_connection.php"; // Include database connection

// Handle DELETE request
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Read the raw POST data, which will be a JSON body
    $input = json_decode(file_get_contents("php://input"), true);

    // Extract the admin ID from the JSON
    $admin_id = $input['id'] ?? null;

    // If no admin ID is provided, return an error
    if (!$admin_id) {
        echo json_encode(['success' => false, 'message' => 'Admin ID is required.']);
        exit;
    }

    try {
        // Prepare the DELETE SQL query
        $stmt = $conn->prepare("DELETE FROM admin WHERE id = :id");
        $stmt->bindParam(':id', $admin_id, PDO::PARAM_STR);  // Use PDO::PARAM_STR for varchar IDs
        $stmt->execute();

        // Check if the row was deleted
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Admin deleted successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'No admin found with the given ID.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error deleting admin: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
