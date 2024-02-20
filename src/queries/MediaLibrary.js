import { gql } from '@apollo/client'

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

const ALL_MEDIA_LIBRARY_QUERY = gql`
  query AllMediaLibraryQuery {
    allMediaLibrarys {
      id
      is_public
      file_name
      file_type
      file_size
      wasabi_file_key
      registered_at
    }
  }
`

const CREATE_MEDIA_LIBRARY_MUTATION = gql`
  mutation CreateMediaLibraryMutation($createMediaLibraryInput: CreateMediaLibraryInput!) {
    createMediaLibrary(createMediaLibraryInput: $createMediaLibraryInput) {
      id
      is_public
      file_name
      file_type
      file_size
      wasabi_file_key
      registered_at
    }
  }
`

export { ASSETS_QUERY, ALL_MEDIA_LIBRARY_QUERY, CREATE_MEDIA_LIBRARY_MUTATION }
