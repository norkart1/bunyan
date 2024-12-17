// import { useQuery, useMutation } from '@apollo/client';
// import { buildGraphQLOperation } from '../gqlHelpers';

// /**
//  * Dynamic GraphQL Query Hook
//  * @param operationName - Name of the query operation
//  * @param entity - GraphQL entity to fetch
//  * @param fields - Array of fields to fetch (supports subfields)
//  * @param variables - Variables with their values
//  * @returns { loading, error, data }
//  */
// export const useDynamicQuery = (
//   operationName: string,
//   entity: string,
//   fields?: (string | { [key: string]: string[] })[],
//   variables?: Record<string, any>,
// ) => {
//   const query = buildGraphQLOperation('query', operationName, entity, fields, variables);
//   const { loading, error, data } = useQuery(query, { variables });

//   return { loading, error, data };
// };

// /**
//  * Dynamic GraphQL Mutation Hook
//  * @param operationName - Name of the mutation operation
//  * @param entity - GraphQL entity to mutate
//  * @param fields - Fields to fetch after mutation
//  * @param variables - Variables with their types
//  * @returns { mutate, loading, error, data }
//  */
// export const useDynamicMutation = (
//   operationName: string,
//   entity: string,
//   fields?: (string | { [key: string]: string[] })[],
//   variables?: Record<string, string>,
// ) => {
//   const mutation = buildGraphQLOperation('mutation', operationName, entity, fields, variables);

//   const [mutate, { loading, error, data }] = useMutation(mutation);

//   return { mutate, loading, error, data };
// };
