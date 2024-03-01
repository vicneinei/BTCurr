import { SafeAreaView } from 'react-native';
import { QueryClientProvider } from '@tanstack/react-query'
import CurrenciesList from './src/CurrenciesList';
import { queryClient } from './src/const/queryClient';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView className="flex-1 bg-white">
        <CurrenciesList />
      </SafeAreaView>
    </QueryClientProvider>
  );
}