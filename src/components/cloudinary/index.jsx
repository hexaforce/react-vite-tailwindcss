import './index.css'
import { Cloudinary } from '@cloudinary/url-gen'
import {
  AdvancedImage, // AdvancedVideo, accessibility, responsive, lazyload, placeholder
} from '@cloudinary/react'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { gql, useQuery } from '@apollo/client'

const ASSETS_QUERY = gql`
  query Assets {
    assets {
      next_cursor
      resources {
        asset_id
        public_id
        format
        version
        resource_type
        type
        created_at
        bytes
        width
        height
        folder
        url
        secure_url
      }
    }
  }
`

export default function CloudinaryImage() {
  const { loading, error, data } = useQuery(ASSETS_QUERY)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  const c = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      // apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
      // apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
    },
  })

  return (
    <div className='App-body'>
      <ul>
        {data.assets.resources.map((asset) => (
          <li key={asset.asset_id}>
            <AdvancedImage cldImg={c.image(asset.public_id).resize(fill().width(200).height(300))} />
            {/* <AdvancedImage cldImg={myImage} plugins={[lazyload(), responsive(100), placeholder()]} /> */}
            <p>Asset ID: {asset.asset_id}</p>
            <p>Public ID: {asset.public_id}</p>
            <p>Format: {asset.format}</p>
            <p>Version: {asset.version}</p>
            <p>Resource Type: {asset.resource_type}</p>
            <p>Type: {asset.type}</p>
            <p>Created At: {asset.created_at}</p>
            <p>Bytes: {asset.bytes}</p>
            <p>Width: {asset.width}</p>
            <p>Height: {asset.height}</p>
            <p>Folder: {asset.folder}</p>
            <p>URL: {asset.url}</p>
            <p>Secure URL: {asset.secure_url}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
