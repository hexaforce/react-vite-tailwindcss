import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from '@/App'
// import { useAuth0 } from "@auth0/auth0-react";
import {  createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
});

const authLink = setContext( (_, { headers }) => {
  // const { getAccessTokenSilently } = useAuth0();
  // const token = await getAccessTokenSilently();
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_DOMAIN}
      clientId={import.meta.env.VITE_CLIENT_ID}
      onRedirectCallback={(appState, user) => {
  // const { getAccessTokenSilently } = useAuth0();
  // const token = await getAccessTokenSilently();
        console.log("appState:",appState)
        console.log("user:",user)
        // console.log("token:",token)
      }}
      authorizationParams={{
        audience: import.meta.env.VITE_AUDIENCE,
        redirect_uri: window.location.origin,
      }}
    >
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Auth0Provider>
  </React.StrictMode>,
)
