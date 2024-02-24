async function getImageOption(ImageBlob, thumbnailWidth, thumbnailHeight) {
  return new Promise((resolve, reject) => {
    const Image = document.createElement('img')

    Image.onload = () => {
      var canvas = document.createElement('canvas')
      var ctx = canvas.getContext('2d')

      var imageAspectRatio = Image.width / Image.height
      var targetAspectRatio = thumbnailWidth / thumbnailHeight

      var clipWidth, clipHeight
      if (targetAspectRatio > imageAspectRatio) {
        clipWidth = Image.width
        clipHeight = Image.width / targetAspectRatio
      } else {
        clipWidth = Image.height * targetAspectRatio
        clipHeight = Image.height
      }

      var clipX = (Image.width - clipWidth) / 2
      var clipY = (Image.height - clipHeight) / 2

      canvas.width = thumbnailWidth
      canvas.height = thumbnailHeight

      ctx.drawImage(Image, clipX, clipY, clipWidth, clipHeight, 0, 0, thumbnailWidth, thumbnailHeight)

      canvas.toBlob((thumbnail) => {
        resolve({
          thumbnail,
          imageWidth: Image.width,
          imageHeight: Image.height,
        })
      }, 'image/jpeg')
    }

    Image.onerror = (error) => {
      reject(error)
    }

    Image.src = URL.createObjectURL(ImageBlob)
  })
}

async function uploadFileToS3(token, bucket, fileBlob, thumbnail) {
  try {
    const wasabi = new FormData()
    wasabi.append('bucket', bucket)
    wasabi.append('file', fileBlob)
    wasabi.append('thumbnail', thumbnail)
    const response = await fetch(`${import.meta.env.VITE_REST_ENDPOINT}/wasabi`, {
      method: 'POST',
      body: wasabi,
      headers: { Authorization: `Bearer ${token}` },
    })
    if (response.ok) {
      return (await response.json()).wasabi_file_key
    }
  } catch (error) {
    console.error(error.message)
  }
}

async function upload(token, formData, createFlightPoint) {
  const imageOption = await getImageOption(formData.markerImage, 120, 120)
  const createFlightPointInput = {
    latitude: formData.latitude,
    longitude: formData.longitude,
    title: formData.title,
  }
  createFlightPointInput.marker_image = await uploadFileToS3(token, 'fpv-japan-public', formData.markerImage, imageOption.thumbnail)
  const response = await createFlightPoint({ variables: { createFlightPointInput } })
  console.log('response:', response.data)
}

export { upload }
