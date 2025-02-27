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
    $query = "SELECT id, title, date_published, filed_by, description FROM announcement WHERE filed_by = :userId";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":userId", $userId, PDO::PARAM_STR);
    $stmt->execute();

    $announcements = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (!empty($announcements)) {
        echo json_encode($announcements);
    } else {
        echo json_encode(["message" => "No announcements yet"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

$conn = null; // Close connection
?>
