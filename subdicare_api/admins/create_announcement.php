<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "../db_connection.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);

    $title = $input['title'] ?? null;
    $description = $input['description'] ?? null;
    $filed_by = $input['filed_by'] ?? null;

    if (!$title || !$description || !$filed_by) {
        echo json_encode([
            'success' => false,
            'message' => 'All fields are required.'
        ]);
        exit;
    }

    try {
        $stmt = $conn->prepare("
            INSERT INTO announcement (title, date_published, filed_by, description) 
            VALUES (:title, NOW(), :filed_by, :description)
        ");
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':filed_by', $filed_by);

        $stmt->execute();

        echo json_encode([
            'success' => true,
            'message' => 'Announcement created successfully.',
            'announcement' => [
                'id' => $conn->lastInsertId(),
                'title' => $title,
                'date_published' => date('Y-m-d H:i:s'),
                'filed_by' => $filed_by,
                'description' => $description
            ]
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Error creating announcement: ' . $e->getMessage()
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);
}
?>
