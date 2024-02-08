import Map, { Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function MapBox() {
  return (
    <Map
      initialViewState={{
        latitude: 35.7030639,
        longitude: 139.7690916,
        zoom: 16,
      }}
      style={{ width: '100%', height: 545 }}
      // style={{ width: '100%', height: '100%' }}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      // mapStyle='mapbox://styles/mapbox/satellite-v9'
      mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
    >
      <Marker latitude={35.7030639} longitude={139.7690916} color='red' />
    </Map>
  )
}
