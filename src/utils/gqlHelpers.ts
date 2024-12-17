// import { gql } from '@apollo/client';

// /**
//  * Infers the GraphQL type for a given JavaScript value.
//  * Supports Scalars, Lists, and Custom Input types.
//  */
// const inferGraphQLType = (value: unknown): string => {
//   if (typeof value === 'number') {
//     return Number.isInteger(value) ? 'Int' : 'Float';
//   }
//   if (typeof value === 'boolean') return 'Boolean';
//   if (typeof value === 'string') return 'String';
//   if (Array.isArray(value)) {
//     const elementType = inferGraphQLType(value[0]);
//     return `[${elementType}]`;
//   }
//   if (typeof value === 'object' && value !== null) {
//     return 'CustomInput'; // Replace with your actual custom input type if applicable
//   }
//   throw new Error(`Unsupported variable type: ${typeof value}`);
// };

// /**
//  * Builds a dynamic GraphQL query with variables.
//  */
// export const buildQuery = (
//   entity: string,
//   fields: string[],
//   variables: Record<string, unknown> = {}
// ) => {
//   const variableDefinitions = Object.entries(variables)
//     .map(([key, value]) => `$${key}: ${inferGraphQLType(value)}`)
//     .join(', ');

//   const variableAssignments = Object.keys(variables)
//     .map((key) => `${key}: $${key}`)
//     .join(', ');
// console.log(variableAssignments);

//   return gql`
//     query Get${entity.charAt(0).toUpperCase() + entity.slice(1)}(${variableDefinitions}) {
//       ${entity}(${variableAssignments}) {
//         ${fields.join('\n')}
//       }
//     }
//   `;
// };

// /**
//  * Builds a dynamic GraphQL mutation with variables.
//  */
// export const buildMutation = (
//   mutationName: string,
//   fields: string[],
//   variables: Record<string, unknown> = {}
// ) => {
//   const variableDefinitions = Object.entries(variables)
//     .map(([key, value]) => `$${key}: ${inferGraphQLType(value)}`)
//     .join(', ');

//   const variableAssignments = Object.keys(variables)
//     .map((key) => `${key}: $${key}`)
//     .join(', ');

//   return gql`
//     mutation ${mutationName.charAt(0).toUpperCase() + mutationName.slice(1)}(${variableDefinitions}) {
//       ${mutationName}(${variableAssignments}) {
//         ${fields.join('\n')}
//       }
//     }
//   `;
// };

// /**
//  * Builds a dynamic GraphQL subscription with variables.
//  */
// export const buildSubscription = (
//   subscriptionName: string,
//   fields: string[],
//   variables: Record<string, unknown> = {}
// ) => {
//   const variableDefinitions = Object.entries(variables)
//     .map(([key, value]) => `$${key}: ${inferGraphQLType(value)}`)
//     .join(', ');

//   const variableAssignments = Object.keys(variables)
//     .map((key) => `${key}: $${key}`)
//     .join(', ');

//   return gql`
//     subscription ${subscriptionName.charAt(0).toUpperCase() + subscriptionName.slice(1)}(${variableDefinitions}) {
//       ${subscriptionName}(${variableAssignments}) {
//         ${fields.join('\n')}
//       }
//     }
//   `;
// };

import { gql } from "@apollo/client";

export const buildDynamicQuery = ({
  operationType,
  operationName,
  entity,
  variables,
  fields,
}: {
  operationType: "query" | "mutation";
  operationName?: string;
  entity: string;
  variables?: Record<string, string>; // Explicitly define types, e.g., { limit: "Int!", offset: "Int!" }
  fields?: (string | { [key: string]: string[] })[];
}) => {
  const variableDefinitions = variables
    ? `(${Object.entries(variables)
        .map(([key, type]) => `$${key}: ${type}`)
        .join(", ")})`
    : "";

  const entityArguments = variables
    ? `(${Object.keys(variables)
        .map((key) => `${key}: $${key}`)
        .join(", ")})`
    : "";

  const buildFields = (fieldsList: (string | { [key: string]: string[] })[]): string =>
    fieldsList
      .map((field) =>
        typeof field === "string"
          ? field
          : `${Object.keys(field)[0]} { ${buildFields(Object.values(field)[0])} }`
      )
      .join(" ");

  const selectedFields = fields ? `{ ${buildFields(fields)} }` : "";

  return gql`
    ${operationType} ${operationName || ""} ${variableDefinitions} {
      ${entity} ${entityArguments} 
        ${selectedFields}
      
    }
  `;
};