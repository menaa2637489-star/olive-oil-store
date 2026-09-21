<?php

session_start();

header("Content-Type: application/json; charset=UTF-8");

require_once "config.php";


/* =========================
   ONLY POST REQUESTS
========================= */

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    http_response_code(405);

    echo json_encode([
        "success" => false,
        "message" => "Method not allowed."
    ], JSON_UNESCAPED_UNICODE);

    exit;
}


/* =========================
   READ DATA
========================= */

$data = json_decode(
    file_get_contents("php://input"),
    true
);


$username = trim($data["username"] ?? "");
$password = $data["password"] ?? "";


/* =========================
   VALIDATION
========================= */

if ($username === "" || $password === "") {

    http_response_code(400);

    echo json_encode([
        "success" => false,
        "message" => "Username and password are required."
    ], JSON_UNESCAPED_UNICODE);

    exit;
}


/* =========================
   FIND ADMIN
========================= */

try {

    $stmt = $pdo->prepare("
        SELECT
            id,
            username,
            password_hash
        FROM admins
        WHERE username = ?
        LIMIT 1
    ");

    $stmt->execute([$username]);

    $admin = $stmt->fetch();


    /* =========================
       CHECK LOGIN
    ========================= */

    if (!$admin || !password_verify($password, $admin["password_hash"])) {

        http_response_code(401);

        echo json_encode([
            "success" => false,
            "message" => "Invalid username or password."
        ], JSON_UNESCAPED_UNICODE);

        exit;
    }


    /* =========================
       CREATE ADMIN SESSION
    ========================= */

    session_regenerate_id(true);

    $_SESSION["admin_id"] = $admin["id"];
    $_SESSION["admin_username"] = $admin["username"];


    echo json_encode([
        "success" => true,
        "message" => "Login successful."
    ], JSON_UNESCAPED_UNICODE);


} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Login failed."
    ], JSON_UNESCAPED_UNICODE);

}
