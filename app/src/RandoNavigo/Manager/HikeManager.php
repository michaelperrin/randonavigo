<?php

namespace RandoNavigo\Manager;

use Psr\Cache\CacheItemPoolInterface;
use RandoNavigo\Document\Hike;
use RandoNavigo\Gpx\SegmentMergerTransformer;

class HikeManager
{
    private $segmentMergerTransformer;
    private $cache;

    public function __construct(SegmentMergerTransformer $segmentMergerTransformer, CacheItemPoolInterface $cache)
    {
        $this->segmentMergerTransformer = $segmentMergerTransformer;
        $this->cache = $cache;
    }

    public function getGpxFileContent(Hike $hike)
    {
        $filePath = $hike->getGpxFilePath();

        $cachedXmlContent = $this->cache->getItem(sprintf('hike-gpx-file-%s', $hike->getSlug()));

        if (!$cachedXmlContent->isHit()) {
            $xmlContent = $this->segmentMergerTransformer->transform($filePath);
            $cachedXmlContent->set($xmlContent);
            $this->cache->save($cachedXmlContent);
        } else {
            $xmlContent = $cachedXmlContent->get();
        }

        return $xmlContent;
    }
}
