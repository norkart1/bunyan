import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context"; // Correct import path
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";

const SectionIdContext = createContext<
  | {
      sectionId: string;
      setSectionId: React.Dispatch<React.SetStateAction<string>>;
    }
  | undefined
>(undefined);

export const useSection = () => {
  const context = useContext(SectionIdContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const createApolloClient = (sectionId: string) => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        // Check for specific token expiration error
        if (message.includes("UnauthorizedTokenExpiredError")) {
          console.error("Token has expired, redirecting to login.");
          // Clear token from storage
          localStorage.removeItem("token");
          // Redirect to login page
          window.location.href = `/login?redirect=${location.pathname}`; // Replace with your login route
          return;
        }
        // Log detailed error with location and path information
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations
          )}, Path: ${path}`
        );

        // Optionally, display the error on the page as well
      });
    }

    if (networkError) {
      console.error(`[Network error]: ${networkError}`);

      // Optionally, display network error on the page as well
    }
  });

  // Authentication link for setting headers
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
        sectionId: sectionId,
      },
    };
  });

  // HTTP link for API endpoint
  const httpLink = new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_API_URI,
    credentials: "include",
  });

  // WebSocket link for subscriptions
  const wsLink = new GraphQLWsLink(
    createClient({
      url: import.meta.env.VITE_GRAPHQL_WS_URI, // e.g., ws://server.buniyan.tech/graphql
      connectionParams: {
        authToken: localStorage.getItem("token"),
      },
    })
  );

  // Split link to route based on operation type
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    authLink.concat(errorLink.concat(httpLink))
  );

  // Create Apollo Client instance
  return new ApolloClient({
    link: splitLink, // Combine links for authentication and error handling
    cache: new InMemoryCache(),
    credentials: "include", // Include cookies with requests
  });
};

const ApolloClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sectionId, setSectionId] = useState(
    localStorage.getItem("section") || ""
  );
  const [client, setClient] = useState<ApolloClient<any>>(
    createApolloClient(sectionId)
  );

  useEffect(() => {
    setClient(createApolloClient(sectionId));
  }, [sectionId]);

  return (
    <SectionIdContext.Provider value={{ sectionId, setSectionId }}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </SectionIdContext.Provider>
  );
};

export default ApolloClientProvider;
