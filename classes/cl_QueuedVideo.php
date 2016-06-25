<?php

class QueuedVideo
{
    private $connection;

    private $tableName = "queued_videos";

    public $id;
    public $video_id;
    public $queued_time;

    public function __construct()
    {
        $path = "sqlite:../db/qtube";
        $this->connection = new PDO($path);
    }

    public function insert()
    {
        $sql = "INSERT INTO $this->tableName " . $this->getColumnNames() .
            "VALUES " . $this->getColumnValues();

        $rows = $this->connection->exec($sql);

        if (!$rows)
        {
            var_dump($this->connection->errorInfo());
        }

        return $rows;
    }

    private function getColumnNames()
    {
        return "(id, video_id, queued_time)";   
    }

    private function getColumnValues()
    {
        return "($this->id, '$this->video_id', $this->queued_time)";
    }
}

?>