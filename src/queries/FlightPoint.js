import { gql } from '@apollo/client'

const FLIGHT_POINT_QUERY = gql`
  query FlightPointQuery($id: ID!) {
    flightPoint(id: $id) {
      id
      latitude
      longitude
      title
      create_user
      marker_image
      registered_at
    }
  }
`

const ALL_FLIGHT_POINTS_QUERY = gql`
  query AllFlightPointQuery {
    allFlightPoints {
      id
      latitude
      longitude
      title
      create_user
      marker_image
      registered_at
    }
  }
`

const CREATE_FLIGHT_POINT_MUTATION = gql`
  mutation CreateFlightPointMutation($createFlightPointInput: CreateFlightPointInput!) {
    createFlightPoint(createFlightPointInput: $createFlightPointInput) {
      id
      latitude
      longitude
      title
      create_user
      marker_image
      registered_at
    }
  }
`

const UPDATE_FLIGHT_POINT_MUTATION = gql`
  mutation UpdateFlightPointMutation($flightPoint: UpdateFlightPointInput!) {
    updateFlightPoint(flightPoint: $flightPoint) {
      id
      latitude
      longitude
      title
      create_user
      marker_image
      registered_at
    }
  }
`

const DELETE_FLIGHT_POINT_MUTATION = gql`
  mutation DeleteFlightPointMutation($id: ID!) {
    deleteFlightPoint(id: $id) {
      id
      latitude
      longitude
      title
      create_user
      marker_image
      registered_at
    }
  }
`

export { FLIGHT_POINT_QUERY, ALL_FLIGHT_POINTS_QUERY, CREATE_FLIGHT_POINT_MUTATION, UPDATE_FLIGHT_POINT_MUTATION, DELETE_FLIGHT_POINT_MUTATION }
