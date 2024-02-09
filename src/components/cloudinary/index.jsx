import './index.css'
import { Cloudinary } from '@cloudinary/url-gen'
import {
  AdvancedImage, // AdvancedVideo, accessibility, responsive, lazyload, placeholder
} from '@cloudinary/react'
import { fill } from '@cloudinary/url-gen/actions/resize'

export default function CloudinaryImage() {
  const c = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      // apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
      // apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
    },
  })

  return (
    <div className='App-body'>
      <AdvancedImage cldImg={c.image('test/f9fnmvpmrttdrty1ub6o').resize(fill().width(200).height(300))} />
      {/* <AdvancedImage cldImg={myImage} plugins={[lazyload(), responsive(100), placeholder()]} /> */}
    </div>
  )
}
