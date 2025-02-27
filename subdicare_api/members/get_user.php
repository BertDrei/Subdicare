<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../db_connection.php"; // Ensure this file properly initializes $conn

if (!isset($_GET['user_id'])) { // Ensure correct parameter name
    echo json_encode(["success" => false, "message" => "User ID is required."]);
    exit;
}

$user_id = $_GET['user_id']; // Get user ID from request

try {
    // Check if database connection is valid
    if (!$conn) {
        echo json_encode(["success" => false, "message" => "Database connection failed."]);
        exit;
    }

    // Prepare and execute SQL query
    $stmt = $conn->prepare("SELECT first_name, last_name FROM users WHERE id = :user_id");
    $stmt->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode(["success" => true, "first_name" => $user['first_name'], "last_name" => $user['last_name']]);
    } else {
        echo json_encode(["success" => false, "message" => "User not found."]);
    }
} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    echo json_encode(["success" => false, "message" => "An error occurred while fetching user details."]);
}
?>
