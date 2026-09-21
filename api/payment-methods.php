<?php

header("Content-Type: application/json; charset=UTF-8");

require_once "config.php";


/* =========================
   GET PAYMENT METHODS
========================= */

try {

    $stmt = $pdo->prepare("
        SELECT
            id,
            method_key,
            name_ar,
            name_en,
            active,
            config_json
        FROM payment_methods
        WHERE active = 1
        ORDER BY id ASC
    ");

    $stmt->execute();

    $paymentMethods = $stmt->fetchAll();


    echo json_encode(
        [
            "success" => true,
            "payment_methods" => $paymentMethods
        ],
        JSON_UNESCAPED_UNICODE
    );


} catch (PDOException $e) {

    http_response_code(500);

    echo json_encode(
        [
            "success" => false,
            "message" => "Failed to load payment methods."
        ],
        JSON_UNESCAPED_UNICODE
    );

}
