import { Hike } from '../../../lib/types'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import GpxTrace from './GpxTrace'
import getHikeGpxPath from '../../../lib/getHikeGpxPath'

type MapProps = {
  hike: Hike,
}

const Map = ({ hike }: MapProps) => {
  return (
    <div className="map" style={{ height: '500px' }}>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          detectRetina
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <GpxTrace gpxFile={getHikeGpxPath(hike)} />
      </MapContainer>
    </div>
  )
};

export default Map;
