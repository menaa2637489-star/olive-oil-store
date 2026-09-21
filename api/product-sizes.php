<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "config.php";


/* =========================
   GET PRODUCT SIZES
========================= */

try {

    if (!isset($_GET["product_id"])) {

        http_response_code(400);

        echo json_encode(
            [
                "success" => false,
                "message" => "Product ID is required."
            ],
            JSON_UNESCAPED_UNICODE
        );

        exit;
    }


    $productId = (int) $_GET["product_id"];


    $stmt = $pdo->prepare("
        SELECT
            id,
            product_id,
            size_key,
            size_ar,
            size_en,
            price,
            image,
            active,
            sort_order
        FROM product_sizes
        WHERE product_id = ?
        AND active = 1
        ORDER BY sort_order ASC, id ASC
    ");


    $stmt->execute([$productId]);


    $sizes = $stmt->fetchAll();


    echo json_encode(
        [
            "success" => true,
            "sizes" => $sizes
        ],
        JSON_UNESCAPED_UNICODE
    );


} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode(
        [
            "success" => false,
            "message" => "Failed to load product sizes."
        ],
        JSON_UNESCAPED_UNICODE
    );

}
