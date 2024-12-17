import { useQuery } from "@apollo/client";
import { buildDynamicQuery } from "../gqlHelpers";

export const useDynamicQuery = ({
  operationName,
  entity,
  variables,
  variableTypes,  // New parameter to accept variable types
  fields,
}: {
  operationName?: string;
  entity: string;
  variables?: Record<string, any>;
  variableTypes?: Record<string, string>;  // Allow passing variable types explicitly
  fields?: (string | { [key: string]: string[] })[];
}) => {
  // Building the query with variable types if provided
  const query = buildDynamicQuery({
    operationType: "query",
    operationName,
    entity,
    variables: variables
      ? Object.fromEntries(
          Object.keys(variables).map((key) => [
            key,
            variableTypes?.[key] || "String!",  // Use the passed type or default to "String!"
          ])
        )
      : undefined,
    fields,
  });

  // Use Apollo's useQuery hook to execute the query
  const { data, loading, error } = useQuery(query, {
    variables,
  });

  return { data, loading, error };
};
