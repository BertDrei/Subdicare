<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../db_connection.php"; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get data from POST request
    $data = json_decode(file_get_contents("php://input"), true);

    // Log received data for debugging
    error_log("Received Data: " . print_r($data, true));

    // Validate input fields
    $name = trim($data['name'] ?? '');
    $date = trim($data['date'] ?? '');
    $event = trim($data['event'] ?? '');
    $description = trim($data['description'] ?? '');
    $address = trim($data['address'] ?? '');
    $resident_id = trim($data['resident_id'] ?? '');

    // Check for required fields
    $missingFields = [];
    if (empty($name)) $missingFields[] = 'name';
    if (empty($date)) $missingFields[] = 'date';
    if (empty($event)) $missingFields[] = 'event';
    if (empty($description)) $missingFields[] = 'description';
    if (empty($resident_id)) $missingFields[] = 'resident_id';
    if (empty($address)) $missingFields[] = 'address';

    // If there are missing fields, return an error
    if (!empty($missingFields)) {
        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Missing fields: " . implode(', ', $missingFields)
        ]);
        exit;
    }

    // Set default status
    $status = 'pending';

    try {
        // Insert the service request data into the database
        $stmt = $conn->prepare("
            INSERT INTO requests (name, date, event, status, description, address, resident_id) 
            VALUES (:name, :date, :event, :status, :description, :address, :resident_id)
        ");

        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':date', $date);
        $stmt->bindParam(':event', $event);
        $stmt->bindParam(':status', $status);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':resident_id', $resident_id);

        $stmt->execute();

        // Respond with success
        http_response_code(201); // Created
        echo json_encode([
            "success" => true,
            "message" => "Service request submitted successfully."
        ]);
    } catch (PDOException $e) {
        // Log error to server
        error_log("Database Error: " . $e->getMessage());

        http_response_code(500); // Internal Server Error
        echo json_encode([
            "success" => false,
            "message" => "An error occurred while processing your request."
        ]);
    }
} else {
    // Respond with an error for invalid methods
    http_response_code(405); // Method Not Allowed
    echo json_encode([
        "success" => false,
        "message" => "Invalid request method."
    ]);
}
?>
