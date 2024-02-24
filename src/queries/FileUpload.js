import { gql } from '@apollo/client'

const LIST_OBJECTS = gql`
  query ListObjects($Name: String!, $Marker: Int!, $MaxKeys: Int!) {
    listObjectsV2(Name: $Name, Marker: $Marker, MaxKeys: $MaxKeys) {
      Contents {
        Key
        LastModified
        ETag
        Size
        StorageClass
      }
      Name
      Prefix
      MaxKeys
      KeyCount
    }
  }
`
// const { loading, error, data } = useQuery(LIST_OBJECTS, {
//   variables: {
//     Name: 'fpv-japan-public',
//     Marker: 0,
//     MaxKeys: 1000,
//   },
// })
const GET_POST_OBJECTS = gql`
  query GetPostObjects($names: [String!]!) {
    postObjectV4(names: $names) {
      Objects {
        action
        method
        enctype
        acl
        key
        # xAmzCredential
        # xAmzAlgorithm
        # xAmzDate
        # policy
      }
    }
  }
`
// const { loading, error, data, refetch } = useQuery(CREATE_PRESIGNED_REQUEST, {
//   variables: { fileNames: names, command: 'PutObject', expires: '+2 minutes' },
//   skip: !submitClicked,
// })

// const [submitClicked, setSubmitClicked] = useState(false)
// const [names, setNames] = useState([])
// const { loading, error, data, refetch } = useQuery(GET_POST_OBJECTS, {
//   variables: { names },
//   skip: !submitClicked,
// })

// useEffect(() => {
//   if (loading || !data) return
//   // Object.keys(files).map((objectURL) => {
//   //   const fileBlob = files[objectURL]
//   //   const presignedUrl = data.createPresignedRequest.find((result) => result.fileName === fileBlob.name).presignedUrl
//   //   uploadPresignedUrl(fileBlob, presignedUrl)
//   // })
// }, [loading, error, data, files])

const CREATE_PRESIGNED_REQUEST = gql`
  query CreatePresignedRequest($fileNames: [String!]!, $command: String!, $expires: String!) {
    createPresignedRequest(fileNames: $fileNames, command: $command, expires: $expires) {
      fileName
      presignedUrl
    }
  }
`
async function uploadPresignedUrl(token, fileBlob, presignUrl) {
  try {
    const formData = new FormData()
    formData.append('file', fileBlob)
    formData.append('key', fileBlob.name)
    const response = await fetch(presignUrl, {
      method: 'POST',
      body: formData,
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      var parser = new DOMParser()
      var xmlDoc = parser.parseFromString(await response.text(), 'text/xml')
      var code = xmlDoc.getElementsByTagName('Code')[0].textContent
      var message = xmlDoc.getElementsByTagName('Message')[0].textContent
      throw new Error(`Code: ${code} Message: ${message}`)
    }
    console.log('File uploaded successfully')
  } catch (error) {
    console.error(error.message)
  }
}

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
        video.stop()
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

async function getImageOption(ImageBlob) {
  return new Promise((resolve, reject) => {
    const Image = document.createElement('img')
    Image.onload = () => {
      resolve({
        imageWidth: Image.width,
        imageHeight: Image.height,
      })
    }
    Image.onerror = (error) => {
      reject(error)
    }
    Image.src = URL.createObjectURL(ImageBlob)
  })
}

async function uploadFileToS3(token, bucket, fileBlob, thumbnailType) {
  try {
    const wasabi = new FormData()
    wasabi.append('bucket', bucket)
    wasabi.append('file', fileBlob)

    if (fileBlob.type.match('video.*')) {
      const videoOption = await getVideoOption(fileBlob)
      wasabi.append('poster', videoOption.poster)
      wasabi.append('duration', videoOption.duration)
      wasabi.append('width', videoOption.videoWidth)
      wasabi.append('height', videoOption.videoHeight)
    }

    if (fileBlob.type.match('image.*')) {
      const imageOption = await getImageOption(fileBlob)
      wasabi.append('width', imageOption.imageWidth)
      wasabi.append('height', imageOption.imageHeight)
    }

    if (fileBlob.type.match('audio.*')) {
      const audioOption = await getAudioOption(fileBlob)
      console.log(audioOption)
      wasabi.append('duration', audioOption.duration)
      wasabi.append('volume', audioOption.volume)
    }

    wasabi.append('thumbnailType', thumbnailType)
    const response = await fetch(`${import.meta.env.VITE_REST_ENDPOINT}/wasabi`, {
      method: 'POST',
      body: wasabi,
      headers: { Authorization: `Bearer ${token}` },
    })
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error(error.message)
  }
}

async function downloadFilesFromS3(token, bucket, fileKeys, thumbnail) {
  const downloadFileFromS3s = fileKeys.map((fileKey) => downloadFileFromS3(token, bucket, fileKey, thumbnail))
  return await Promise.all(downloadFileFromS3s)
}

async function downloadFileFromS3(token, bucket, wasabi_file_key, thumbnail) {
  try {
    const wasabi = new FormData()
    wasabi.append('bucket', bucket)
    wasabi.append('fileKey', thumbnail ? `${wasabi_file_key}_thumbnail` : wasabi_file_key)
    const response = await fetch(`${import.meta.env.VITE_REST_ENDPOINT}/wasabi2`, {
      method: 'POST',
      body: wasabi,
      headers: { Authorization: `Bearer ${token}` },
    })
    if (response.ok) {
      const fileBlob = await response.blob()
      return {
        wasabi_file_key: wasabi_file_key,
        fileBlob: fileBlob,
      }
    } else {
      return {
        wasabi_file_key: wasabi_file_key,
        fileBlob: null,
      }
    }
  } catch (error) {
    console.error(error.message)
  }
}

const fileSize = (size) => {
  return size > 1024 ? (size > 1048576 ? Math.round(size / 1048576) + 'mb' : Math.round(size / 1024) + 'kb') : size + 'b'
}

export { GET_POST_OBJECTS, CREATE_PRESIGNED_REQUEST, LIST_OBJECTS, uploadFileToS3, downloadFilesFromS3, downloadFileFromS3, uploadPresignedUrl, fileSize }
