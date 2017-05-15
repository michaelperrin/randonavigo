<?php

namespace RandoNavigo\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;
use RandoNavigo\Document\Hike\Point as HikePoint;

/**
 * @MongoDB\Document
 */
class Hike
{
    /**
     * @MongoDB\Id
     */
    protected $id;

    /**
     * @MongoDB\Field(type="string")
     */
    protected $title;

    /**
     * @MongoDB\Field(type="string")
     */
    protected $summary;

    /**
     * @MongoDB\Field(type="string")
     */
    protected $content;

    /**
     * @MongoDB\Field(type="string")
     */
    protected $slug;

    /**
     * @MongoDB\Field(type="date", name="publication_date")
     */
    protected $publicationDate;

    /**
     * @MongoDB\Field(type="collection")
     */
    protected $categories;

    /**
     * @MongoDB\Field(type="collection")
     */
    protected $tags;

    /**
     * @MongoDB\Field(type="collection")
     */
    protected $pictures;

    /**
     * @MongoDB\Field(type="string", name="main_picture")
     */
    protected $mainPicture;

    /**
     * Distance in kilometers
     *
     * @MongoDB\Field(type="float")
     */
    protected $distance;

    /**
     * @MongoDB\Field(type="string", name="gpx_file")
     */
    protected $gpxFile;

    /**
     * @MongoDB\EmbedOne(targetDocument="RandoNavigo\Document\Hike\Point", name="starting_point")
     */
    protected $startingPoint;

    /**
     * @MongoDB\EmbedOne(targetDocument="RandoNavigo\Document\Hike\Point", name="ending_point")
     */
    protected $endingPoint;

    /**
     * @MongoDB\Field(type="boolean")
     */
    protected $favorite;

    /**
     * Get id
     *
     * @return id $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return $this
     */
    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }

    /**
     * Get title
     *
     * @return string $title
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set summary
     *
     * @param string $summary
     * @return $this
     */
    public function setSummary($summary)
    {
        $this->summary = $summary;
        return $this;
    }

    /**
     * Get summary
     *
     * @return string $summary
     */
    public function getSummary()
    {
        return $this->summary;
    }

    /**
     * Set content
     *
     * @param string $content
     * @return $this
     */
    public function setContent($content)
    {
        $this->content = $content;
        return $this;
    }

    /**
     * Get content
     *
     * @return string $content
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set slug
     *
     * @param string $slug
     * @return $this
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;
        return $this;
    }

    /**
     * Get slug
     *
     * @return string $slug
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * Set publicationDate
     *
     * @param date $publicationDate
     * @return $this
     */
    public function setPublicationDate($publicationDate)
    {
        $this->publicationDate = $publicationDate;
        return $this;
    }

    /**
     * Get publicationDate
     *
     * @return date $publicationDate
     */
    public function getPublicationDate()
    {
        return $this->publicationDate;
    }

    /**
     * Set categories
     *
     * @param collection $categories
     * @return $this
     */
    public function setCategories($categories)
    {
        $this->categories = $categories;
        return $this;
    }

    /**
     * Get categories
     *
     * @return collection $categories
     */
    public function getCategories()
    {
        return $this->categories;
    }

    /**
     * Set tags
     *
     * @param collection $tags
     * @return $this
     */
    public function setTags($tags)
    {
        $this->tags = $tags;
        return $this;
    }

    /**
     * Get tags
     *
     * @return collection $tags
     */
    public function getTags()
    {
        return $this->tags;
    }

    /**
     * Set pictures
     *
     * @param collection $pictures
     * @return $this
     */
    public function setPictures($pictures)
    {
        $this->pictures = $pictures;
        return $this;
    }

    /**
     * Get pictures
     *
     * @return collection $pictures
     */
    public function getPictures()
    {
        return $this->pictures;
    }

    /**
     * Set mainPicture
     *
     * @param string $mainPicture
     * @return $this
     */
    public function setMainPicture($mainPicture)
    {
        $this->mainPicture = $mainPicture;
        return $this;
    }

    /**
     * Get mainPicture
     *
     * @return string $mainPicture
     */
    public function getMainPicture()
    {
        return $this->mainPicture;
    }

    /**
     * Set distance
     *
     * @param float $distance
     * @return $this
     */
    public function setDistance($distance)
    {
        $this->distance = $distance;
        return $this;
    }

    /**
     * Get distance
     *
     * @return float $distance
     */
    public function getDistance()
    {
        return $this->distance;
    }

    /**
     * Set gpxFile
     *
     * @param string $gpxFile
     * @return $this
     */
    public function setGpxFile($gpxFile)
    {
        $this->gpxFile = $gpxFile;
        return $this;
    }

    /**
     * Get gpxFile
     *
     * @return string $gpxFile
     */
    public function getGpxFile()
    {
        return $this->gpxFile;
    }

    /**
     * Set startingPoint
     *
     * @param HikePoint $startingPoint
     * @return $this
     */
    public function setStartingPoint(HikePoint $startingPoint)
    {
        $this->startingPoint = $startingPoint;
        return $this;
    }

    /**
     * Get startingPoint
     *
     * @return HikePoint $startingPoint
     */
    public function getStartingPoint()
    {
        return $this->startingPoint;
    }

    /**
     * Set endingPoint
     *
     * @param HikePoint $endingPoint
     * @return $this
     */
    public function setEndingPoint(HikePoint $endingPoint)
    {
        $this->endingPoint = $endingPoint;
        return $this;
    }

    /**
     * Get endingPoint
     *
     * @return HikePoint $endingPoint
     */
    public function getEndingPoint()
    {
        return $this->endingPoint;
    }

    /**
     * Set favorite
     *
     * @param boolean $favorite
     * @return $this
     */
    public function setFavorite($favorite)
    {
        $this->favorite = $favorite;
        return $this;
    }

    /**
     * Get favorite
     *
     * @return boolean $favorite
     */
    public function getFavorite()
    {
        return $this->favorite;
    }
}
