import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider} from '@apollo/client'
import App from './App.tsx'
import './styles/index.css'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom'
import client from './apolloClient';
import { AuthProvider } from './context/authContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <React.StrictMode>
        <App />
        </React.StrictMode>
      </BrowserRouter>
    </ApolloProvider>
  </AuthProvider>,
)