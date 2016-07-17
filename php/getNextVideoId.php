<?php

$response = [
    "success" => false,
    "videoId" => ""
];

try {
    $db = new PDO("sqlite:../db/qtube");

    $sql = "SELECT * FROM video_ids ORDER BY id ASC LIMIT 1";
    $id = -1;
    if ($stmt = $db->query($sql)) {
        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $response["success"] = $row !== false;
            $response["videoId"] = $row["video_id"];
            $id = $row["id"];
        }
    }

    $sql = "DELETE FROM video_ids WHERE id = $id";
    if ($stmt = $db->query($sql)) {
        $stmt->execute();
    }
} catch (PDOException $e) {
    
}

$jsonResponse = json_encode($response);

header('Content-Type: application/json');
echo($jsonResponse);

die();

?>