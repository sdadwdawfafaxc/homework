<?php
header('Content-Type: application/json');
$data_file = __DIR__ . '/homework-data.json';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($data_file)) {
        echo file_get_contents($data_file);
    } else {
        echo '[]';
    }
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    file_put_contents($data_file, $json);
    echo '{"success":true}';
    exit;
}
?>