<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../db_connection.php";

$userId = $_GET['userId'] ?? '';

if (!$userId) {
    echo json_encode(["error" => "User ID is required"]);
    exit;
}

try {
    $query = "SELECT id, username, email, status FROM moderators WHERE id = :userId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":userId", $userId, PDO::PARAM_STR);

    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        echo json_encode($user);
    } else {
        echo json_encode(["error" => "User not found"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

$conn = null; // Close the connection
?>
