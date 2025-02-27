<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../db_connection.php";

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data['userId'] ?? '';
$email = $data['email'] ?? null;
$password = $data['password'] ?? null;
$first_name = $data['first_name'] ?? null;
$last_name = $data['last_name'] ?? null;
$middle_initial = $data['middle_initial'] ?? null;
$address = $data['address'] ?? null;
$number = $data['number'] ?? null;

if (!$userId) {
    echo json_encode(["error" => "User ID is required"]);
    exit;
}

$updates = [];
$params = [];

if ($email !== null) {
    $updates[] = "email = :email";
    $params[':email'] = $email;
}

if ($password !== null) {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $updates[] = "password = :password";
    $params[':password'] = $hashedPassword;
}

if ($first_name !== null) {
    $updates[] = "first_name = :first_name";
    $params[':first_name'] = $first_name;
}

if ($last_name !== null) {
    $updates[] = "last_name = :last_name";
    $params[':last_name'] = $last_name;
}

if ($middle_initial !== null) {
    $updates[] = "middle_initial = :middle_initial";
    $params[':middle_initial'] = $middle_initial;
}

if ($address !== null) {
    $updates[] = "address = :address";
    $params[':address'] = $address;
}

if ($number !== null) {
    $updates[] = "number = :number";
    $params[':number'] = $number;
}

if (empty($updates)) {
    echo json_encode(["error" => "No fields to update"]);
    exit;
}

$query = "UPDATE members SET " . implode(", ", $updates) . " WHERE id = :userId";
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
