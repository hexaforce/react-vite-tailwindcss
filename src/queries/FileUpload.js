import { gql } from '@apollo/client'

const LIST_OBJECTS = gql`
  query ListObjects {
    listObjectsV2 {
      Contents {
        Key
        LastModified
        ETag
        Size
        StorageClass
      }
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
async function uploadFileToS3(fileBlob, presignUrl) {
  try {
    const formData = new FormData()
    formData.append('file', fileBlob)
    formData.append('key', fileBlob.name)
    const response = await fetch(presignUrl, {
      method: 'POST',
      body: formData,
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

const fileSize = (size) => {
  return size > 1024 ? (size > 1048576 ? Math.round(size / 1048576) + 'mb' : Math.round(size / 1024) + 'kb') : size + 'b'
}

export { GET_POST_OBJECTS, CREATE_PRESIGNED_REQUEST, LIST_OBJECTS, uploadFileToS3, fileSize }
