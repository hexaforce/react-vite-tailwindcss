import React from 'react'

import { useAuth0 } from '@auth0/auth0-react'

import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import PropTypes from 'prop-types'

const TOKEN_TYPE = 'id'

const ApolloProviderWithAuth0 = ({ children }) => {
  const { getAccessTokenSilently, getIdTokenClaims } = useAuth0()

  const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  })

  const authLink = setContext(async (_, { headers, ...rest }) => {
    let token
    try {
      if (TOKEN_TYPE === 'id') token = (await getIdTokenClaims()).__raw
      if (TOKEN_TYPE === 'access') token = await getAccessTokenSilently()
    } catch (error) {
      console.log(error)
    }

    if (!token) return { headers, ...rest }

    return {
      ...rest,
      headers: {
        ...headers,
        authorization: `Bearer ${token}`,
      },
    }
  })

  const client = React.useRef()

  if (!client.current) {
    client.current = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    })
  }

  return <ApolloProvider client={client.current}>{children}</ApolloProvider>
}

ApolloProviderWithAuth0.propTypes = {
  children: PropTypes.node.isRequired,
}

export { ApolloProviderWithAuth0 }
