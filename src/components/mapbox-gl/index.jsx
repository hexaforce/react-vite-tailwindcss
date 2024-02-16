import { useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const data = [
  {
    id: 1,
    latitude: 35.7030639,
    longitude: 139.7690916,
    src: 'https://placekitten.com/50/50',
    content: 'ここは何ですか？',
  },
  {
    id: 0,
    latitude: 35.7050639,
    longitude: 139.7690916,
    src: 'https://placekitten.com/50/50',
    content: 'ここは何ですか？',
  },
  {
    id: 2,
    latitude: 35.7030639,
    longitude: 139.7660916,
    src: 'https://placekitten.com/50/50',
    content: 'ここは何ですか？',
  },
  {
    id: 3,
    latitude: 35.7050639,
    longitude: 139.7660916,
    src: 'https://placekitten.com/50/50',
    content: 'ここは何ですか？',
  },
]

export default function MapBox() {
  const [popupInfo, setPopupInfo] = useState(null)

  const MarkerClick = (latitude, longitude) => {
    setPopupInfo(null)
    setPopupInfo({
      latitude: latitude,
      longitude: longitude,
      content: 'ここは何ですか？',
    })
  }

  return (
    <Map
      initialViewState={{
        latitude: 35.7030639,
        longitude: 139.7690916,
        zoom: 16,
      }}
      style={{ width: '100%', height: '80vh'}}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      // mapStyle='mapbox://styles/mapbox/satellite-v9'
      // mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      mapboxAccessToken='pk.eyJ1IjoicmVsaWNzOSIsImEiOiJjbHMzNHlwbDIwNDczMmtvM2xhNWR0ZzVtIn0.whCzeh6XW7ju4Ja6DR0imw'
    >
      {data.map((d) => {
        return (
          <Marker key={d.id} draggable latitude={d.latitude} longitude={d.longitude}>
            <img style={{ display: 'block', border: 'none', borderRadius: '50%', cursor: 'pointer', padding: 0 }} src='https://placekitten.com/50/50' alt='Marker' onClick={() => MarkerClick(d.latitude,d.longitude)} />
          </Marker>
        )
      })}
      {popupInfo && (
        <Popup latitude={popupInfo.latitude} longitude={popupInfo.longitude} closeButton={true} closeOnClick={false} onClose={() => setPopupInfo(null)}>
          <img src='https://placekitten.com/150/150' alt='Marker'></img>
        </Popup>
      )}
    </Map>
  )
}
