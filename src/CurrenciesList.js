import { FlatList, StyleSheet } from "react-native";
import { configureNextEaseAnim } from "./api/animation";
import useCurrenciesQuery from "./api/useCurrenciesQuery";
import CurrencyItem from "./CurrencyItem";
import KeyboardAvoidingLayout from "./KeyboardAvoidingLayout";
import ListFooter from "./ListFooter";

const CurrenciesList = () => {
  const { data, isFetching, refetch } = useCurrenciesQuery();

  const onRefresh = async () => {
    await refetch();
    configureNextEaseAnim();
  }

  return (
    <>
      <KeyboardAvoidingLayout>
        <FlatList
          data={data}
          refreshing={isFetching}
          // update btc-price when user pulls down
          onRefresh={onRefresh}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => <CurrencyItem {...item} />}
          contentContainerStyle={styles.container}
        />
      </KeyboardAvoidingLayout>
      <ListFooter />
    </>
  )
};

export default CurrenciesList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgb(229 231 235)",
    flexGrow: 1
  },
});