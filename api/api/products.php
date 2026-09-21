<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "config.php";


/* =========================
   GET PRODUCTS
========================= */

try {

    $stmt = $pdo->prepare("
        SELECT
            id,
            slug,
            name_ar,
            name_en,
            type_ar,
            type_en,
            hero_title_ar,
            hero_title_en,
            season_ar,
            season_en,
            main_image,
            active
        FROM products
        WHERE active = 1
        ORDER BY id ASC
    ");

    $stmt->execute();

    $products = $stmt->fetchAll();

    echo json_encode(
        [
            "success" => true,
            "products" => $products
        ],
        JSON_UNESCAPED_UNICODE
    );

} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode(
        [
            "success" => false,
            "message" => "Failed to load products."
        ],
        JSON_UNESCAPED_UNICODE
    );

}
