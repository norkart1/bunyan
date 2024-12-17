import { useMutation } from "@apollo/client";
import { buildDynamicQuery } from "../gqlHelpers";

export const useDynamicMutation = ({
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
  // Building the mutation query with variable types if provided
  const mutation = buildDynamicQuery({
    operationType: "mutation",
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

  // Use Apollo's useMutation hook to execute the mutation
  const [executeMutation, { data, loading, error }] = useMutation(mutation);

  // Function to trigger mutation with passed variables
  const mutate = (vars?: Record<string, any>) =>
    executeMutation({ variables: vars });

  return { mutate, data, loading, error };
};
