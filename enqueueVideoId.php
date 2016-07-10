<?php

$success = false;

if (array_key_exists("videoId", $_POST)) {
    $videoId = $_POST["videoId"];
    $success = insertVideo($videoId);
}

$jsonResponse = json_encode([
    "success" => $success
]);

header('Content-Type: application/json');
echo($jsonResponse);

die();

function insertVideo($id) {
    try {
        $db = new PDO("sqlite:db/qtube");
        $sql = "INSERT INTO `video_ids` (`video_id`, `time`) VALUES (:video_id, :time)";

        $stmt = $db->prepare($sql, [
            PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY
            ]);

        return $stmt->execute([
            ":video_id" => $id,
            ":time" => time()
            ]);

    } catch (PDOException $e) {
        return false;
    }
}

?>