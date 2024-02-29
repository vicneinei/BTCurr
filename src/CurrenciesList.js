import { FlatList } from "react-native";
import CurrencyItem from "./CurrencyItem";
import { useBTCPriceQuery } from "./btcPrice.api";

const CurrenciesList = () => {
  const { data, isPending, refetch } = useBTCPriceQuery();

  return (
    <FlatList
      className="flex-1 w-full mt-10"
      data={data}
      refreshing={isPending}
      // update prices and preferred's positions when user pulls down
      onRefresh={refetch}
      keyExtractor={(item) => item.code}
      renderItem={({ item }) => (
        <CurrencyItem
          code={item.code}
          price={item.rate_for_amount}
          preferred={item.preferred}
        />
      )}
    />
  )
};

export default CurrenciesList;