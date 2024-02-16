import { gql } from '@apollo/client'

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    allUsers {
      id
      email
      registered_at
    }
  }
`

const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      email
    }
  }
`
export { ALL_USERS_QUERY, CREATE_USER }
