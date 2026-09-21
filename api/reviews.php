<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "config.php";


/* =========================
   GET APPROVED REVIEWS
========================= */

try {

    $stmt = $pdo->prepare("
        SELECT
            id,
            customer_name,
            review_ar,
            review_en,
            rating,
            created_at
        FROM reviews
        WHERE approved = 1
        ORDER BY created_at DESC
    ");

    $stmt->execute();

    $reviews = $stmt->fetchAll();


    echo json_encode(
        [
            "success" => true,
            "reviews" => $reviews
        ],
        JSON_UNESCAPED_UNICODE
    );


} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode(
        [
            "success" => false,
            "message" => "Failed to load reviews."
        ],
        JSON_UNESCAPED_UNICODE
    );

}
