<?php

$videoIds = ["ETfiUYij5UE", "FiARsQSlzDc", "oyA8odjCzZ4"];
$idx = rand(0, count($videoIds) - 1);

$response = [
    "success" => true,
    "videoId" => "$videoIds[$idx]"
];

$jsonResponse = json_encode($response);

header('Content-Type: application/json');
echo($jsonResponse);

die();

?>