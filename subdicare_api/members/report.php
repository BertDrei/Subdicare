<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../db_connection.php"; // Include database connection

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$title = trim($data['title'] ?? '');
$priority_level = strtolower(trim($data['priority_level'] ?? 'medium'));
$description = trim($data['description'] ?? '');
$resident_id = trim($data['resident_id'] ?? '');
$date_filed = date('Y-m-d H:i:s');
$status = "Pending";
$image_path = null;

// Validate required fields
if (empty($title) || empty($description) || empty($resident_id)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Missing required fields."]);
    exit;
}

// Fetch the resident's full name
try {
    $stmt = $conn->prepare("SELECT first_name, last_name FROM members WHERE id = :resident_id");
    $stmt->bindParam(':resident_id', $resident_id);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        http_response_code(404);
        echo json_encode(["success" => false, "message" => "User not found."]);
        exit;
    }

    // Combine first name and last name
    $filed_by = $user['first_name'] . ' ' . $user['last_name'];
} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Failed to fetch user details."]);
    exit;
}

// Handle base64 image (if provided)
if (!empty($data['image'])) {
    $image_data = $data['image'];
    $image_name = uniqid() . ".png";
    $uploads_dir = "../uploads/";

    if (!is_dir($uploads_dir)) {
        mkdir($uploads_dir, 0777, true);
    }

    $image_path = $uploads_dir . $image_name;
    $server_image_path = "http://localhost:8080/subdicare_api/uploads/" . $image_name;

    if (!preg_match('/^data:image\/\w+;base64,/', $image_data)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Invalid image format."]);
        exit;
    }

    if (file_put_contents($image_path, base64_decode(preg_replace('/^data:image\/\w+;base64,/', '', $image_data))) === false) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Failed to save image."]);
        exit;
    }
}

try {
    // Insert report into the database
    $stmt = $conn->prepare("INSERT INTO reports (title, priority_level, filed_by, resident_id, date_filed, description, status, image) 
                            VALUES (:title, :priority_level, :filed_by, :resident_id, :date_filed, :description, :status, :image)");

    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':priority_level', $priority_level);
    $stmt->bindParam(':filed_by', $filed_by);
    $stmt->bindParam(':resident_id', $resident_id);
    $stmt->bindParam(':date_filed', $date_filed);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':status', $status);
    $stmt->bindParam(':image', $server_image_path);

    $stmt->execute();

    http_response_code(201);
    echo json_encode(["success" => true, "message" => "Report submitted successfully."]);
} catch (PDOException $e) {
    error_log("Database Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "An error occurred while processing your request."]);
}
