<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../db_connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $conn->prepare("
            SELECT id, title, date_published, filed_by, description 
            FROM announcement 
            ORDER BY date_published DESC
        ");
        $stmt->execute();

        $announcements = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'data' => $announcements
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error fetching announcements: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}
?>
