import { useSubscription } from '@apollo/client';
import { buildSubscription } from '@/utils/gqlHelpers';

/**
 * Subscribes to real-time data dynamically from a GraphQL API.
 * @param subscriptionName - The name of the subscription (e.g., 'districtUpdates').
 * @param fields - The fields to retrieve.
 * @param variables - Subscription variables (optional).
 */
export const useSubscriptionData = (
  subscriptionName: string,
  fields: string[],
  variables: Record<string, unknown> = {}
) => {
  const subscription = buildSubscription(subscriptionName, fields, variables);
  const { data, loading, error } = useSubscription(subscription, { variables });

  return { data, loading, error };
};
