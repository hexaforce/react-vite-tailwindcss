async function getVideoOption(videoBlob) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')

    video.onloadeddata = () => {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      canvas.toBlob((poster) => {
        video.pause()
        resolve({
          poster,
          duration: video.duration,
          videoWidth: video.videoWidth,
          videoHeight: video.videoHeight,
        })
      }, 'image/jpeg')
    }
    video.onerror = (error) => {
      reject(error)
    }
    video.src = URL.createObjectURL(videoBlob)
    video.play()
  })
}

async function getAudioOption(AudioBlob) {
  return new Promise((resolve, reject) => {
    const Audio = document.createElement('Audio')
    Audio.onloadeddata = () => {
      resolve({
        duration: Audio.duration,
        volume: Audio.volume,
      })
    }
    Audio.onerror = (error) => {
      reject(error)
    }
    Audio.src = URL.createObjectURL(AudioBlob)
  })
}

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

async function upload(token, files, createMediaLibrary, setOpenFileUpload, refetch, setLoading) {
  for (const objectURL of Object.keys(files)) {
    const fileBlob = files[objectURL]
    const createMediaLibraryInput = {
      file_name: fileBlob.name,
      file_type: fileBlob.type,
      file_size: fileBlob.size,
      file_last_modified: new Date(fileBlob.lastModified).toISOString(),
    }
    if (fileBlob.type.match('video.*')) {
      const videoOption = await getVideoOption(fileBlob)
      createMediaLibraryInput.file_width = videoOption.videoWidth
      createMediaLibraryInput.file_height = videoOption.videoHeight
      createMediaLibraryInput.file_duration = videoOption.duration
      const imageOption = await getImageOption(videoOption.poster, 264, 164)
      createMediaLibraryInput.wasabi_file_key = await uploadFileToS3(token, 'fpv-japan-public', fileBlob, imageOption.thumbnail)
      const response = await createMediaLibrary({ variables: { createMediaLibraryInput } })
      console.log('response:', response.data)
    }
    if (fileBlob.type.match('image.*')) {
      const imageOption = await getImageOption(fileBlob, 264, 164)
      createMediaLibraryInput.file_width = imageOption.imageWidth
      createMediaLibraryInput.file_height = imageOption.imageHeight
      createMediaLibraryInput.wasabi_file_key = await uploadFileToS3(token, 'fpv-japan-public', fileBlob, imageOption.thumbnail)
      const response = await createMediaLibrary({ variables: { createMediaLibraryInput } })
      console.log('response:', response.data)
    }
    if (fileBlob.type.match('audio.*')) {
      const audioOption = await getAudioOption(fileBlob)
      createMediaLibraryInput.file_duration = audioOption.duration
      createMediaLibraryInput.wasabi_file_key = await uploadFileToS3(token, 'fpv-japan-public', fileBlob)
      const response = await createMediaLibrary({ variables: { createMediaLibraryInput } })
      console.log('response:', response.data)
    }

    refetch()
    setLoading(false)
    setOpenFileUpload(false)
  }
}

export { upload }
