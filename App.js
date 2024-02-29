import { SafeAreaView } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import CurrenciesList from './src/CurrenciesList';

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView className="flex-1">
        <CurrenciesList />
      </SafeAreaView>
    </QueryClientProvider>
  );
}