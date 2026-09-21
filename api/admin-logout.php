<?php

session_start();

header("Content-Type: application/json; charset=UTF-8");


/* =========================
   LOGOUT
========================= */

$_SESSION = [];


/* =========================
   DELETE SESSION COOKIE
========================= */

if (ini_get("session.use_cookies")) {

    $params = session_get_cookie_params();

    setcookie(
        session_name(),
        "",
        time() - 42000,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}


/* =========================
   DESTROY SESSION
========================= */

session_destroy();


echo json_encode(
    [
        "success" => true,
        "message" => "Logged out successfully."
    ],
    JSON_UNESCAPED_UNICODE
);
