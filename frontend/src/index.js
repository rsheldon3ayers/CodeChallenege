import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:7777/graphql',
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
);
