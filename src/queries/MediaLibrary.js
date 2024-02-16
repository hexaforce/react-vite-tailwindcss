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

export { ASSETS_QUERY }
