import { useRef, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { configureNextEaseAnim } from "./api/animation";
import useCurrenciesQuery from "./api/useCurrenciesQuery";
import CurrencyItem from "./CurrencyItem";
import KeyboardAvoidingLayout from "./KeyboardAvoidingLayout";
import ListFooter from "./ListFooter";
import { InvalidatePreferredCtxProvider } from "./InvalidatePreferredCtx";

const CurrenciesList = () => {
  const { data, isFetching, refetch } = useCurrenciesQuery();

  const onRefresh = async () => {
    await refetch();
    configureNextEaseAnim();
  }

  const [showTopButton, setShowTopButton] = useState(false);
  const setShowTopAnim = (show) => {
    configureNextEaseAnim();
    setShowTopButton(show);
  }

  const listRef = useRef(null);
  const scrollToTop = () => listRef.current?.scrollToOffset({ offset: 0 });

  const onScroll = (ev) => {
    if (ev.nativeEvent.contentOffset.y > 100) {
      if (!showTopButton)
        setShowTopAnim(true);
    } else if (showTopButton)
      setShowTopAnim(false);
  };

  return (
    <>
      <KeyboardAvoidingLayout>
        <InvalidatePreferredCtxProvider>
          <FlatList
            onScroll={onScroll}
            ref={listRef}
            data={data}
            refreshing={isFetching}
            onRefresh={onRefresh}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => <CurrencyItem {...item} />}
            contentContainerStyle={styles.container}
            initialNumToRender={20}
            getItemLayout={(_, index) => ({ length: 48, offset: 48 * index, index })}
            removeClippedSubviews={false}
          />
        </InvalidatePreferredCtxProvider>
      </KeyboardAvoidingLayout>
      <ListFooter>
        {showTopButton && (
          <TouchableOpacity className="absolute -top-10" onPress={scrollToTop}>
            <AntDesign name="upcircleo" size={28} color="black" />
          </TouchableOpacity>)}
      </ListFooter>
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