import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import App from './App.tsx'
import './styles/index.css'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom'

const client = new ApolloClient({
  uri: 'http://localhost:4001/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <BrowserRouter>
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
      </BrowserRouter>
  </React.StrictMode>,
)


