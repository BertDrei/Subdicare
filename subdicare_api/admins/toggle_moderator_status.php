<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../db_connection.php"; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $id = $data['id'] ?? '';
    $currentStatus = $data['status'] ?? '';

    if (empty($id) || empty($currentStatus)) {
        echo json_encode(["success" => false, "message" => "Moderator ID and current status are required."]);
        exit;
    }

    try {
        // Toggle the status
        $newStatus = $currentStatus === 'active' ? 'inactive' : 'active';

        $stmt = $conn->prepare("UPDATE moderators SET status = :status WHERE id = :id");
        $stmt->bindParam(':status', $newStatus);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "newStatus" => $newStatus, "message" => "Moderator status updated successfully."]);
        } else {
            echo json_encode(["success" => false, "message" => "Failed to update status."]);
        }
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage());
        echo json_encode(["success" => false, "message" => "An error occurred while updating the moderator's status."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>
