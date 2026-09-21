<?php

session_start();

header("Content-Type: application/json; charset=UTF-8");


/* =========================
   CHECK ADMIN SESSION
========================= */

if (
    !isset($_SESSION["admin_id"]) ||
    !isset($_SESSION["admin_username"])
) {

    http_response_code(401);

    echo json_encode(
        [
            "success" => false,
            "message" => "Unauthorized."
        ],
        JSON_UNESCAPED_UNICODE
    );

    exit;
}


/* =========================
   ADMIN IS AUTHENTICATED
========================= */

function requireAdmin()
{
    if (
        !isset($_SESSION["admin_id"]) ||
        !isset($_SESSION["admin_username"])
    ) {

        http_response_code(401);

        echo json_encode(
            [
                "success" => false,
                "message" => "Admin login required."
            ],
            JSON_UNESCAPED_UNICODE
        );

        exit;
    }
}
