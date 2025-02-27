<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../db_connection.php"; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Fetch all service requests with resident name
        $stmt = $conn->prepare("
            SELECT 
                r.id, 
                r.name, 
                r.date, 
                r.event, 
                r.status, 
                r.description, 
                r.address,  
                r.resident_id,
                CONCAT(m.first_name, ' ', m.last_name) AS filed_by
            FROM 
                requests r
            LEFT JOIN 
                members m ON r.resident_id = m.id
            ORDER BY 
                r.date DESC
        ");
        $stmt->execute();

        $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'requests' => $requests
        ]);
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage()); // Log any database errors
        echo json_encode([
            'success' => false,
            'message' => 'An error occurred while fetching the service requests. Error: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}
?>
