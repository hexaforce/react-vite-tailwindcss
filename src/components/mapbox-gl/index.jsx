import { useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import PropTypes from 'prop-types'

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

MapBox.propTypes = {
  editMode: PropTypes.bool.isRequired,
  selectPoint: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  setSelectPoint: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
}

export default function MapBox(props) {
  const { editMode, selectPoint, setSelectPoint, setOpen } = props
  const [markerInfo, setMarkerInfo] = useState(null)

  const MarkerClick = (latitude, longitude) => {
    setMarkerInfo(null)
    setMarkerInfo({
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
      style={{ width: '100%', height: '80vh' }}
      mapStyle='mapbox://styles/mapbox/streets-v11'
      // mapStyle='mapbox://styles/mapbox/satellite-v11'
      // mapboxAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
      mapboxAccessToken='pk.eyJ1IjoicmVsaWNzOSIsImEiOiJjbHMzNHlwbDIwNDczMmtvM2xhNWR0ZzVtIn0.whCzeh6XW7ju4Ja6DR0imw'
      onClick={(event) => {
        editMode &&
          setSelectPoint({
            latitude: event.lngLat.lat,
            longitude: event.lngLat.lng,
          })
      }}
    >
      {!editMode &&
        data.map((d) => {
          return (
            <Marker key={d.id} draggable latitude={d.latitude} longitude={d.longitude}>
              <img style={{ display: 'block', border: 'none', borderRadius: '50%', cursor: 'pointer', padding: 0 }} src={d.src} alt='Marker' onClick={() => MarkerClick(d.latitude, d.longitude)} />
            </Marker>
          )
        })}
      {editMode && selectPoint && (
        <Popup latitude={selectPoint.latitude} longitude={selectPoint.longitude} closeButton={false} closeOnClick={false} onClose={() => setSelectPoint(null)}>
          <button type='button' onClick={() => setOpen(true)} className='rounded-md bg-indigo-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            ここに追加
          </button>
        </Popup>
      )}
      {!editMode && markerInfo && (
        <Popup latitude={markerInfo.latitude} longitude={markerInfo.longitude} closeButton={true} closeOnClick={false} onClose={() => setMarkerInfo(null)}>
          <img src='https://placekitten.com/150/150' alt='Marker'></img>
        </Popup>
      )}
    </Map>
  )
}
