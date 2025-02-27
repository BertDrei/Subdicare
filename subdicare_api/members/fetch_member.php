<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../db_connection.php"; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get ID from query params
    $id = $_GET['id'] ?? '';

    if (empty($id)) {
        error_log("ID is missing from the request.");
        echo json_encode(["success" => false, "message" => "ID is required."]);
        exit;
    }

    try {
        // Log the ID for debugging
        error_log("Fetching member details for ID: $id");

        // Adjust query to include address
        $stmt = $conn->prepare("SELECT first_name, last_name, address FROM members WHERE id = :id");
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $member = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($member) {
            echo json_encode([
                "success" => true,
                "first_name" => $member['first_name'],
                "last_name" => $member['last_name'],
                "address" => $member['address'],
            ]);
        } else {
            error_log("Member not found for ID: $id");
            echo json_encode(["success" => false, "message" => "Member not found."]);
        }
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage());
        echo json_encode(["success" => false, "message" => "An error occurred while fetching the member details."]);
    }
}
?>
