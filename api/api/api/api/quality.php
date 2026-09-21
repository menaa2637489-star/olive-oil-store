<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "config.php";


/* =========================
   GET QUALITY CARDS
========================= */

try {

    /*
       لو اتبعت product_id
       هنجيب كروت الجودة الخاصة بالمنتج.

       مثال:
       api/quality.php?product_id=1

       ولو مفيش product_id
       هنجيب كروت الجودة العامة.
    */

    if (isset($_GET["product_id"])) {

        $productId = (int) $_GET["product_id"];

        $stmt = $pdo->prepare("
            SELECT
                id,
                product_id,
                icon,
                title_ar,
                title_en,
                text_ar,
                text_en,
                sort_order,
                active
            FROM quality_cards
            WHERE product_id = ?
            AND active = 1
            ORDER BY sort_order ASC, id ASC
        ");

        $stmt->execute([$productId]);

    } else {

        $stmt = $pdo->prepare("
            SELECT
                id,
                product_id,
                icon,
                title_ar,
                title_en,
                text_ar,
                text_en,
                sort_order,
                active
            FROM quality_cards
            WHERE product_id IS NULL
            AND active = 1
            ORDER BY sort_order ASC, id ASC
        ");

        $stmt->execute();
    }


    $qualityCards = $stmt->fetchAll();


    echo json_encode(
        [
            "success" => true,
            "quality_cards" => $qualityCards
        ],
        JSON_UNESCAPED_UNICODE
    );


} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode(
        [
            "success" => false,
            "message" => "Failed to load quality cards."
        ],
        JSON_UNESCAPED_UNICODE
    );

}
