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

    // Extract the report ID from the JSON
    $report_id = $input['id'] ?? null;

    // If no report ID is provided, return an error
    if (!$report_id) {
        echo json_encode(['success' => false, 'message' => 'Report ID is required.']);
        exit;
    }

    try {
        // Prepare the DELETE SQL query
        $stmt = $conn->prepare("DELETE FROM reports WHERE id = :id");
        $stmt->bindParam(':id', $report_id, PDO::PARAM_INT);
        $stmt->execute();

        // Check if the row was deleted
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true, 'message' => 'Report deleted successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'No report found with the given ID.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Error deleting report: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
