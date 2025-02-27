<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "../db_connection.php"; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Fetch all members
        $stmt = $conn->prepare("
            SELECT id, email, address, number, first_name, last_name, middle_initial 
            FROM members 
            ORDER BY last_name ASC
        ");
        $stmt->execute();
        $members = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Get the total count of members
        $countStmt = $conn->prepare("SELECT COUNT(*) as total_members FROM members");
        $countStmt->execute();
        $countResult = $countStmt->fetch(PDO::FETCH_ASSOC);
        $total_members = $countResult['total_members'];

        echo json_encode([
            'success' => true,
            'total_members' => $total_members, // Include total member count
            'members' => $members
        ]);
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage());
        echo json_encode([
            'success' => false,
            'message' => 'An error occurred while fetching members.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}
?>
