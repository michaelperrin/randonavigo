import { Hike } from '@/lib/types'
import { MapContainer, TileLayer } from 'react-leaflet'
import GpxTrace from './GpxTrace'
import getHikeGpxPath from '@/lib/getHikeGpxPath'

type MapProps = {
  hike: Hike,
}

const Map = ({ hike }: MapProps) => {
  return (
    <div>
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} className="h-64 md:h-52">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          detectRetina
        />
        {/* <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        <GpxTrace gpxFile={getHikeGpxPath(hike)} />
      </MapContainer>
    </div>
  )
};

export default Map;
