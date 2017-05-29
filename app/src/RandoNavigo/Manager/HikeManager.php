<?php

namespace RandoNavigo\Manager;

use RandoNavigo\Document\Hike;
use RandoNavigo\Gpx\SegmentMergerTransformer;
use Symfony\Component\Cache\Adapter\AdapterInterface;

class HikeManager
{
    private $segmentMergerTransformer;
    private $cache;

    public function __construct(SegmentMergerTransformer $segmentMergerTransformer, AdapterInterface $cache)
    {
        $this->segmentMergerTransformer = $segmentMergerTransformer;
        $this->cache = $cache;
    }

    public function getGpxFileContent(Hike $hike)
    {
        $filePath = $hike->getGpxFilePath();

        $cachedXmlContent = $this->cache->getItem('categories');

        if (!$cachedXmlContent->isHit()) {
            $xmlContent = $this->get('app.gpx.segment_merger_transformer')->transform($filePath);
            $cachedXmlContent->set($xmlContent);
            $this->cache->save($cachedXmlContent);
        } else {
            $xmlContent = $cachedXmlContent->get();
        }

        return $xmlContent;
    }
}
