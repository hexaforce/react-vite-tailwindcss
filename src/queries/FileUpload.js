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

async function uploadFileToS3(token, bucket, fileBlob) {
  try {
    const wasabi = new FormData()
    wasabi.append('bucket', bucket)
    wasabi.append('file', fileBlob)
    const response = await fetch('http://localhost:8001/api/wasabi', {
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

async function downloadFilesFromS3(token, bucket, fileKeys) {
  const downloadFileFromS3s = fileKeys.map((fileKey) => downloadFileFromS3(token, bucket, fileKey))
  return await Promise.all(downloadFileFromS3s)
}

async function downloadFileFromS3(token, bucket, fileKey) {
  try {
    const wasabi = new FormData()
    wasabi.append('bucket', bucket)
    wasabi.append('fileKey', fileKey)
    const response = await fetch('http://localhost:8001/api/wasabi2', {
      method: 'POST',
      body: wasabi,
      headers: { Authorization: `Bearer ${token}` },
    })
    if (response.ok) {
      const fileBlob = await response.blob()
      return {
        wasabi_file_key: fileKey,
        objectURL: URL.createObjectURL(fileBlob),
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
