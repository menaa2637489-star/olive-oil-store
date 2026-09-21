<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "config.php";


/* =========================
   GET ABOUT US
========================= */

try {

    $stmt = $pdo->prepare("
        SELECT
            id,
            title_ar,
            title_en,
            subtitle_ar,
            subtitle_en,
            content_ar,
            content_en,
            image,
            active
        FROM about_us
        WHERE active = 1
        ORDER BY id ASC
        LIMIT 1
    ");

    $stmt->execute();

    $about = $stmt->fetch();


    echo json_encode(
        [
            "success" => true,
            "about" => $about
        ],
        JSON_UNESCAPED_UNICODE
    );


} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode(
        [
            "success" => false,
            "message" => "Failed to load about us."
        ],
        JSON_UNESCAPED_UNICODE
    );

}
