import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { Auth0Provider } from '@auth0/auth0-react'
import App from '@/App'

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_DOMAIN}
      clientId={import.meta.env.VITE_CLIENT_ID}
      onRedirectCallback={(appState, user) => {
        console.log(appState)
        console.log(user)
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
