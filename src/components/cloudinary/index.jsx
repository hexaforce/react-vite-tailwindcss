import './index.css'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage, AdvancedVideo, accessibility, responsive, lazyload, placeholder } from '@cloudinary/react'
import { fill } from '@cloudinary/url-gen/actions/resize'

export default function CloudinaryImage() {

  const cld = new Cloudinary({
    cloud: {
      cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY,
      apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
    },
  })

  const myImage = cld.image('test/f9fnmvpmrttdrty1ub6o')

  myImage.resize(fill().width(200).height(300))

  return (
    <div className='App-body'>
      <div>
        <AdvancedImage cldImg={myImage} />
        {/* <AdvancedImage cldImg={myImage} plugins={[lazyload(), responsive(100), placeholder()]} /> */}
      </div>
    </div>
  )
}
