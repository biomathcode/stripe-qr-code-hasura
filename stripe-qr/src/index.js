import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split, 
  HttpLink
} from "@apollo/client";

import { createClient } from 'graphql-ws';
import {GraphQLWsLink} from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';


const httpLink = new HttpLink({
  uri: 'https://pratik-todo.hasura.app/v1/graphql',
  headers: {
    "x-hasura-admin-secret": process.env.REACT_APP_HASURA_SECRET
  }
});


const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://pratik-todo.hasura.app/v1/graphql',
  connectionParams: {
    headers: {
      'x-hasura-admin-secret': process.env.REACT_APP_HASURA_SECRET
    }
  },
  retryAttempts: 10
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});



ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
    <App />

    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


