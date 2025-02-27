<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../db_connection.php"; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $id = $data['id'] ?? null;
    $status = $data['status'] ?? null;

    if (!$id || !$status) {
        echo json_encode([
            'success' => false,
            'message' => 'Report ID and status are required.'
        ]);
        exit;
    }

    try {
        // Update the report's status
        $stmt = $conn->prepare("
            UPDATE reports 
            SET status = :status 
            WHERE id = :id
        ");
        $stmt->bindParam(':status', $status, PDO::PARAM_STR);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if ($stmt->execute()) {
            echo json_encode([
                'success' => true,
                'message' => 'Report status updated successfully.'
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'Failed to update report status.'
            ]);
        }
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage()); // Log any database errors
        echo json_encode([
            'success' => false,
            'message' => 'An error occurred while updating the report status. Error: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}
?>
