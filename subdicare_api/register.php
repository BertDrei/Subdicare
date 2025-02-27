<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "db_connection.php"; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    // Validate input
    $email = trim($data['email'] ?? '');
    $password = trim($data['password'] ?? '');
    $first_name = trim($data['first_name'] ?? '');
    $last_name = trim($data['last_name'] ?? '');
    $middle_initial = isset($data['middle_initial']) ? trim($data['middle_initial']) : null;
    $address = trim($data['address'] ?? '');
    $number = trim($data['number'] ?? '');

    // Check for required fields
    if (empty($email) || empty($password) || empty($first_name) || empty($last_name) || empty($address) || empty($number)) {
        echo json_encode(["success" => false, "message" => "All fields are required."]);
        exit;
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Invalid email format."]);
        exit;
    }

    // Validate phone number format
    if (!preg_match('/^\+63\d{10}$/', $number)) {
        echo json_encode(["success" => false, "message" => "Phone number must start with +63 and have exactly 10 digits."]);
        exit;
    }

    // Validate password format
    if (!preg_match('/^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/', $password)) {
        echo json_encode(["success" => false, "message" => "Password must be at least 6 characters long, include at least one number, and one special character."]);
        exit;
    }

    // Check if the email already exists
    $stmt = $conn->prepare("SELECT COUNT(*) FROM members WHERE email = :email");
    $stmt->bindParam(':email', $email);
    $stmt->execute();
    $emailCount = $stmt->fetchColumn();

    if ($emailCount > 0) {
        echo json_encode(["success" => false, "message" => "Email is already taken."]);
        exit;
    }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_BCRYPT);

    try {
        // Generate a unique id
        $stmt = $conn->prepare("SELECT MAX(id) AS max_id FROM members");
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        $lastId = $result['max_id'] ?? "SD000"; // Default to "SD000" if no records
        $numberPart = (int)substr($lastId, 2); // Extract numeric part
        $newId = "SD" . str_pad($numberPart + 1, 3, "0", STR_PAD_LEFT); // Increment and format

        // Insert user into database
        $stmt = $conn->prepare("
            INSERT INTO members (id, email, password, first_name, last_name, middle_initial, address, number, created_at) 
            VALUES (:id, :email, :password, :first_name, :last_name, :middle_initial, :address, :number, NOW())
        ");
        $stmt->bindParam(':id', $newId);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $hashedPassword);
        $stmt->bindParam(':first_name', $first_name);
        $stmt->bindParam(':last_name', $last_name);
        $stmt->bindParam(':middle_initial', $middle_initial);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':number', $number);

        $stmt->execute();
        echo json_encode(["success" => true, "message" => "Sign-up successful.", "id" => $newId]);
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage()); // Log error
        echo json_encode(["success" => false, "message" => "An error occurred while processing your request. Please try again."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>
