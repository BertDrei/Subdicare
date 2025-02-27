<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "../db_connection.php";

// Handle DELETE request
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Read the raw POST data, which will be a JSON body
    $input = json_decode(file_get_contents("php://input"), true);

    // Extract the moderator ID from the JSON
    $moderator_id = $input['id'] ?? null;

    // If no moderator ID is provided, return an error
    if (!$moderator_id) {
        echo json_encode(['success' => false, 'message' => 'Moderator ID is required.']);
        exit;
    }

    try {
        // Prepare the DELETE SQL query
        $stmt = $conn->prepare("DELETE FROM moderators WHERE id = :id");
        $stmt->bindParam(':id', $moderator_id, PDO::PARAM_STR);  // Use PDO::PARAM_STR for varchar IDs
        $stmt->execute();

        // Check if the row was deleted
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Moderator deleted successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'No moderator found with the given ID.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error deleting moderator: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
