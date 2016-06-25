<?php

require_once "../classes/cl_QueuedVideo.php";

$db = new QueuedVideo();

$db->id = 1;
$db->video_id = "oogabooga";
$db->queued_time = time();

$db->insert();

?>