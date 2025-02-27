<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../db_connection.php"; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    // Validate input
    $username = trim($data['username'] ?? '');
    $email = trim($data['email'] ?? '');
    $password = trim($data['password'] ?? '');
    $status = $data['status'] ?? 'active'; // Default status is 'active'


    if (empty($username) || empty($email) || empty($password) || empty($status)) {
        echo json_encode(["success" => false, "message" => "All fields are required."]);
        exit;
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Invalid email format."]);
        exit;
    }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    try {
        // Generate a unique ID for moderator
        $stmt = $conn->prepare("SELECT MAX(id) AS max_id FROM moderators");
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $lastId = $result['max_id'] ?? "MD000"; // Default to "MD000" if no records
        $numberPart = (int)substr($lastId, 2); // Extract numeric part
        $newId = "MD" . str_pad($numberPart + 1, 3, "0", STR_PAD_LEFT); // Increment and format

        // Insert moderator into database with status
        $stmt = $conn->prepare("
            INSERT INTO moderators (id, username, email, password, status) 
            VALUES (:id, :username, :email, :password, :status)
        ");
        $stmt->bindParam(':id', $newId);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindParam(':status', $status);

        $stmt->execute();
        echo json_encode(["success" => true, "message" => "Moderator created successfully.", "id" => $newId]);
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage());
        echo json_encode(["success" => false, "message" => "An error occurred while creating the moderator."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>
