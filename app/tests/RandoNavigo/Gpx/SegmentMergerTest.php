<?php

use RandoNavigo\Gpx\SegmentMergerTransformer;
use PHPUnit\Framework\TestCase;

class SegmentMergerTest extends TestCase
{
    public function testMergeSegments()
    {
        $document = new \DOMDocument();
        $document->formatOutput = true;
        $document->preserveWhiteSpace = false;
        $document->load(__DIR__.'/gpx-files/multi-segment.gpx');

        $expectedDocument = new \DOMDocument();
        $expectedDocument->formatOutput = true;
        $expectedDocument->preserveWhiteSpace = false;
        $expectedDocument->load(__DIR__.'/gpx-files/single-segment.gpx');

        $segmentMerger = new SegmentMergerTransformer();
        $mergedDocument = $segmentMerger->transformDocument($document);

        $this->assertEquals($expectedDocument->saveXML(), $mergedDocument->saveXML());
    }
}
