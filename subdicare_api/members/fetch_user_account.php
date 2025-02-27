<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../db_connection.php";

$userId = $_GET['userId'] ?? '';

if (!$userId) {
    echo json_encode(["error" => "User ID is required"]);
    exit;
}

$query = "SELECT id, email, first_name, last_name, middle_initial, address, number FROM members WHERE id = :userId";

try {
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
