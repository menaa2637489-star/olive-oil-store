<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "config.php";


/* =========================
   GET FAQ
========================= */

try {

    /*
       لو اتبعت product_id
       هنجيب أسئلة المنتج ده فقط.

       مثال:
       api/faq.php?product_id=1

       ولو مفيش product_id
       هنجيب الأسئلة العامة.
    */

    if (isset($_GET["product_id"])) {

        $productId = (int) $_GET["product_id"];

        $stmt = $pdo->prepare("
            SELECT
                id,
                product_id,
                question_ar,
                question_en,
                answer_ar,
                answer_en,
                sort_order,
                active
            FROM faq
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
                question_ar,
                question_en,
                answer_ar,
                answer_en,
                sort_order,
                active
            FROM faq
            WHERE product_id IS NULL
            AND active = 1
            ORDER BY sort_order ASC, id ASC
        ");

        $stmt->execute();
    }


    $faq = $stmt->fetchAll();


    echo json_encode(
        [
            "success" => true,
            "faq" => $faq
        ],
        JSON_UNESCAPED_UNICODE
    );


} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode(
        [
            "success" => false,
            "message" => "Failed to load FAQ."
        ],
        JSON_UNESCAPED_UNICODE
    );

}
