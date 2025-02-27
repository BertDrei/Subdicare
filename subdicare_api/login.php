<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "db_connection.php"; // Include database connection

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents("php://input"), true);

        $email = trim($data['email'] ?? '');
        $password = trim($data['password'] ?? '');

        if (empty($email) || empty($password)) {
            echo json_encode(["success" => false, "message" => "Email and password are required."]);
            exit;
        }

        // Tables to check
        $tables = ['admin', 'moderators', 'members'];
        $user = null;
        $tableName = null;
        $status = null;

        // Check each table for the user
        foreach ($tables as $table) {
            $stmt = $conn->prepare("SELECT id, email, password FROM $table WHERE email = :email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                $tableName = $table;
                break;
            }
        }

        if ($tableName === 'moderators') {
            // Check status for moderators
            $stmt = $conn->prepare("SELECT status FROM moderators WHERE email = :email");
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $status = $stmt->fetchColumn();

            if ($status === 'inactive') {
                echo json_encode(["success" => false, "message" => "Your account is deactivated by the admin."]);
                exit;
            }
        }

        if ($user && password_verify($password, $user['password'])) {
            // Use "email" for members and "username" for others
            $name = $tableName === 'members' ? $user['email'] : ($user['username'] ?? $user['email']);

            echo json_encode([
                "success" => true,
                "message" => "Login successful.",
                "data" => [
                    "id" => $user['id'],
                    "name" => $name,
                    "table" => $tableName,
                ],
            ]);
        } else {
            echo json_encode(["success" => false, "message" => "Invalid email or password."]);
        }
    } catch (PDOException $e) {
        error_log("Database Error: " . $e->getMessage());
        echo json_encode(["success" => false, "message" => "An error occurred during login."]);
    } catch (Exception $e) {
        error_log("General Error: " . $e->getMessage());
        echo json_encode(["success" => false, "message" => "An unexpected error occurred."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>
