<?php

namespace App\RandoNavigo\Document\Hike;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\EmbeddedDocument
 */
class Point
{
    /**
     * @MongoDB\Field(type="string")
     */
    protected $station;

    /**
     * @MongoDB\Field(type="string")
     */
    protected $line;

    /**
     * @MongoDB\Field(type="string")
     */
    protected $comment;

    /**
     * Set station
     *
     * @param string $station
     * @return $this
     */
    public function setStation($station)
    {
        $this->station = $station;
        return $this;
    }

    /**
     * Get station
     *
     * @return string $station
     */
    public function getStation()
    {
        return $this->station;
    }

    /**
     * Set line
     *
     * @param string $line
     * @return $this
     */
    public function setLine($line)
    {
        $this->line = $line;
        return $this;
    }

    /**
     * Get line
     *
     * @return string $line
     */
    public function getLine()
    {
        return $this->line;
    }

    /**
     * Set comment
     *
     * @param string $comment
     * @return $this
     */
    public function setComment($comment)
    {
        $this->comment = $comment;
        return $this;
    }

    /**
     * Get comment
     *
     * @return string $comment
     */
    public function getComment()
    {
        return $this->comment;
    }
}
