<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "config.php";


/* =========================
   GET SOCIAL MEDIA
========================= */

try {

    $stmt = $pdo->prepare("
        SELECT
            id,
            platform,
            url,
            active
        FROM social_media
        WHERE active = 1
        ORDER BY id ASC
    ");

    $stmt->execute();

    $socialMedia = $stmt->fetchAll();


    echo json_encode(
        [
            "success" => true,
            "social_media" => $socialMedia
        ],
        JSON_UNESCAPED_UNICODE
    );


} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode(
        [
            "success" => false,
            "message" => "Failed to load social media."
        ],
        JSON_UNESCAPED_UNICODE
    );

}
