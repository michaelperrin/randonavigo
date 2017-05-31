<?php

namespace RandoNavigo\Gpx;

use \DOMDocument;

/**
 * Takes a GPX file and merge all segments into one.
 *
 * Example:
 *
 * <?xml version="1.0" encoding="UTF-8"?>
 * <gpx>
 *   <trk>
 *     <name><![CDATA[Étangs de Hollande]]></name>
 *     <trkseg>
 *       <trkpt lat="48.722263" lon="1.890299" />
 *     </trkseg>
 *     <trkseg>
 *       <trkpt lat="48.727716" lon="1.858349" />
 *     </trkseg>
 *   </trk>
 * </gpx>
 *
 * Gets transformed to:
 *
 * <gpx>
 *   <trk>
 *     <name><![CDATA[Étangs de Hollande]]></name>
 *     <trkseg>
 *       <trkpt lat="48.722263" lon="1.890299" />
 *       <trkpt lat="48.727716" lon="1.858349" />
 *     </trkseg>
 *   </trk>
 * </gpx>
 */
class SegmentMergerTransformer
{
    public function transform(string $filePath)
    {
        $document = $this->getDocument($filePath);
        $document = $this->transformDocument($document);

        return $document->saveXML();
    }

    public function transformDocument(DOMDocument $document) : DOMDocument
    {
        $segments = $document->getElementsByTagName('trkseg');

        if ($segments->length === 0) {
            return $document;
        }

        $trk = $document->getElementsByTagName('trk')->item(0);
        $firstSegment = $segments->item(0);
        $segmentsToRemove = [];

        for ($i = 1; $i < $segments->length; $i++) {
            $segment = $segments->item($i);

            $points = $segment->getElementsByTagName('trkpt');

            for ($j = 0; $j < $points->length; $j++) {
                $point = $points->item($j);
                $firstSegment->appendChild($point->cloneNode(true));
            }

            $segmentsToRemove[] = $segment;
        }

        foreach ($segmentsToRemove as $segment) {
            $trk->removeChild($segment);
        }

        return $document;
    }

    /**
     * Gets DOMDocument from file path
     *
     * @param  string $filePath
     * @return DOMDocument
     */
    protected function getDocument(string $filePath) : DOMDocument
    {
        $document = new DOMDocument();
        $document->load($filePath);

        return $document;
    }
}
