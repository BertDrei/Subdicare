<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../db_connection.php"; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    $id = $input['id'] ?? null;
    $status = $input['status'] ?? null;

    if (!$id || !$status) {
        echo json_encode([
            'success' => false,
            'message' => 'Both ID and status are required.'
        ]);
        exit;
    }

    try {
        // Update the status of the specific request
        $stmt = $conn->prepare("
            UPDATE requests 
            SET status = :status 
            WHERE id = :id
        ");
        $stmt->bindParam(':status', $status, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Request status updated successfully.'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Failed to update the request status.'
            ]);
        }
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage()); // Log any database errors
        echo json_encode([
            'success' => false,
            'message' => 'An error occurred while updating the request status. Error: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}
?>
