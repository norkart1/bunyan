import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { environment } from '@/constants/environment';

// HTTP link for queries and mutations
const httpLink = new HttpLink({
  uri: environment.graphqlEndpoint,
  credentials: 'include', // Include cookies in the headers
});

// WebSocket link for subscriptions
const wsLink = new WebSocketLink({
  uri: environment.graphqlWsEndpoint, // WebSocket endpoint (e.g., ws://server.buniyan.tech/graphql)
  options: {
    reconnect: true, // Auto-reconnect on disconnection
  },
});

// Split link based on operation type (query/mutation vs. subscription)
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Apollo Client setup
const client = new ApolloClient({
  link: errorLink.concat(splitLink),
  cache: new InMemoryCache(),
  credentials : 'include'
});

export default client;
