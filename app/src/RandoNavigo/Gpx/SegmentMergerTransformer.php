<?php

namespace RandoNavigo\Gpx;

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
    public function transform($filePath)
    {
        $document = new \DOMDocument();
        $document->load($filePath);

        $segments = $document->getElementsByTagName('trkseg');

        $trk = $document->getElementsByTagName('trk')->item(0);

        $firstSegment = $segments->item(0);

        $segmentsToRemove = [];

        for ($i = 1; $i < $segments->length; $i++) {
            $segment = $segments->item($i);

            $points = $segment->getElementsByTagName('trkpt');

            for ($j = 0; $j < $points->length; $j++) {
                $point = $points->item($j);
                $firstSegment->appendChild($point->cloneNode());
            }

            $segmentsToRemove[] = $segment;
        }

        foreach ($segmentsToRemove as $segment) {
            $trk->removeChild($segment);
        }

        return $document->saveXML();
    }
}
