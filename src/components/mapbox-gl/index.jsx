import { useState, useEffect } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
import { downloadFileFromS3, downloadFilesFromS3 } from '@/queries/FileUpload'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import { ALL_FLIGHT_POINTS_QUERY } from '@/queries/FlightPoint'
import { Loading } from '@/assets/Loading'

MapBox.propTypes = {
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,

  selectPoint: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  setSelectPoint: PropTypes.func.isRequired,

  selectMarker: PropTypes.shape({
    id: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    create_user: PropTypes.string.isRequired,
    marker_image: PropTypes.string.isRequired,
    registered_at: PropTypes.string.isRequired,
  }),
  setSelectMarker: PropTypes.func.isRequired,

  openPointForm: PropTypes.bool.isRequired,
  setOpenPointForm: PropTypes.func.isRequired,
}

export default function MapBox({ editMode, setEditMode, selectPoint, setSelectPoint, selectMarker, setSelectMarker, openPointForm, setOpenPointForm }) {
  const { getIdTokenClaims } = useAuth0()

  const { loading, error, data, refetch } = useQuery(ALL_FLIGHT_POINTS_QUERY)
  const [loading2, setLoading2] = useState(true)
  const [thumbnailImages, setThumbnailImages] = useState([])
  useEffect(() => {
    async function getThumbnailImages() {
      const token = (await getIdTokenClaims()).__raw
      const images = await downloadFilesFromS3(
        token,
        import.meta.env.VITE_WASABI_BUCKET,
        data?.allFlightPoints.map((m) => m.marker_image),
        true,
      )
      setThumbnailImages(images)
      setLoading2(false)
    }
    if (!loading && !error) {
      getThumbnailImages()
    }
  }, [data, loading, error, getIdTokenClaims])
  function thumbnail(flightPoint) {
    const thumbnail = thumbnailImages.find((t) => t.wasabi_file_key === flightPoint.marker_image)
    if (!thumbnail || !thumbnail.fileBlob) return <QuestionMarkCircleIcon />
    const imgOption = { width: 50, height: 50, display: 'block', border: 'none', borderRadius: '50%', cursor: 'pointer', padding: 0 }
    const imgUrl = URL.createObjectURL(thumbnail.fileBlob)
    return <img style={imgOption} src={imgUrl} alt={flightPoint.title} />
  }

  const [currentBlob, setCurrentBlob] = useState(null)
  useEffect(() => {
    if (!selectMarker) return
    async function getCurrentBlob() {
      const token = (await getIdTokenClaims()).__raw
      const target = await downloadFileFromS3(token, import.meta.env.VITE_WASABI_BUCKET, selectMarker.marker_image, false)
      setCurrentBlob(target.fileBlob)
    }
    getCurrentBlob()
  }, [getIdTokenClaims, selectMarker])

  useEffect(() => {
    if (openPointForm) return
    setEditMode(false)
    setSelectPoint(null)
    refetch()
  }, [openPointForm, setEditMode, setSelectPoint, refetch])

  if (loading || loading2) return <Loading />
  if (error) return <div>Error: {error.message}</div>

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
        // setSelectMarker(null)
        editMode &&
          setSelectPoint({
            latitude: event.lngLat.lat,
            longitude: event.lngLat.lng,
          })
      }}
    >
      {!editMode &&
        data?.allFlightPoints.map((flightPoint) => {
          return (
            <Marker
              key={flightPoint.id}
              latitude={flightPoint.latitude}
              longitude={flightPoint.longitude}
              onClick={() => {
                setCurrentBlob(null)
                setSelectMarker(flightPoint)
              }}
            >
              {thumbnail(flightPoint)}
            </Marker>
          )
        })}

      {!editMode && selectMarker && (
        <Popup latitude={selectMarker.latitude} longitude={selectMarker.longitude} closeButton={true} closeOnClick={false} onClose={() => setSelectMarker(null)}>
          {currentBlob ? <img src={URL.createObjectURL(currentBlob)} alt={selectMarker.create_user} /> : <div>Loading...</div>}
        </Popup>
      )}

      {editMode && selectPoint && (
        <Popup latitude={selectPoint.latitude} longitude={selectPoint.longitude} closeButton={false} closeOnClick={false} onClose={() => setSelectPoint(null)}>
          <button type='button' onClick={() => setOpenPointForm(true)} className='rounded-md bg-indigo-600 px-3 py-2 text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
            ここに追加
          </button>
        </Popup>
      )}
    </Map>
  )
}
