<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "config.php";


/* =========================
   GET SITE SETTINGS
========================= */

try {

    $stmt = $pdo->prepare("
        SELECT
            id,
            setting_key,
            value_ar,
            value_en
        FROM site_settings
        ORDER BY id ASC
    ");

    $stmt->execute();

    $settings = $stmt->fetchAll();


    echo json_encode(
        [
            "success" => true,
            "settings" => $settings
        ],
        JSON_UNESCAPED_UNICODE
    );


} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode(
        [
            "success" => false,
            "message" => "Failed to load site settings."
        ],
        JSON_UNESCAPED_UNICODE
    );

}
