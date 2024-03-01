import { useQuery } from '@tanstack/react-query';
import { queryClient } from '../const/queryClient';

const KEY = ["btc-amount"];

export const setPreferredBTCAmount = async (amount) =>
  queryClient.setQueryData(KEY, amount);

export const usePreferredBTCAmountQuery = () =>
  useQuery({
    queryKey: KEY,
    queryFn: () => 1,
    staleTime: Infinity,
    gcTime: Infinity
  });