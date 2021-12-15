import { useEffect } from 'react'
import { useLeafletContext } from '@react-leaflet/core'
import { useMap } from 'react-leaflet'
import * as L from 'leaflet';
import 'leaflet-gpx';
import 'leaflet.locatecontrol'


type GpxTraceProps = {
  gpxFile: string,
}

const GpxTrace = ({ gpxFile }: GpxTraceProps) => {
  const context = useLeafletContext()
  const map = useMap()

  useEffect(() => {
    new L.GPX(
      gpxFile,
      {
        async: true,
        marker_options: {
          startIconUrl: '/images/map/starting-point-pin.png',
          endIconUrl: '/images/map/ending-point-pin.png',
          shadowUrl: undefined,
        }
      }
    ).on('loaded', function (e) {
      map.fitBounds(e.target.getBounds());
      // map.addControl(t);
      L.control.locate().addTo(map);
    }).addTo(map);
  }, [gpxFile, map])

  return null
}

export default GpxTrace;
