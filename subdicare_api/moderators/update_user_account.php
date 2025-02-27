<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../db_connection.php";

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['userId'] ?? '';
$username = $data['username'] ?? null;
$email = $data['email'] ?? null;
$password = $data['password'] ?? null;

if (!$userId) {
    echo json_encode(["error" => "User ID is required"]);
    exit;
}

$updates = [];
$params = [];

if ($username !== null) {
    $updates[] = "username = :username";
    $params[':username'] = $username;
}

if ($email !== null) {
    $updates[] = "email = :email";
    $params[':email'] = $email;
}

if ($password !== null) {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $updates[] = "password = :password";
    $params[':password'] = $hashedPassword;
}

if (empty($updates)) {
    echo json_encode(["error" => "No fields to update"]);
    exit;
}

$query = "UPDATE moderators SET " . implode(", ", $updates) . " WHERE id = :userId";
$params[':userId'] = $userId;

try {
    $stmt = $conn->prepare($query);
    $stmt->execute($params);

    if ($stmt->rowCount() > 0) {
        echo json_encode(["message" => "User updated successfully"]);
    } else {
        echo json_encode(["message" => "No changes made"]);
    }
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}

$conn = null; // Close the connection
?>
