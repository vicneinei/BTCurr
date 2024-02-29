import React, { useMemo } from "react";
import { Text, View } from "react-native";
import PreferredButton from "./PreferredButton";

const CurrencyItem = ({ code, price, preferred }) => {
  const priceStr = useMemo(() => {
    try {
      return Intl.NumberFormat("en-US", {
        style: "currency",
        currency: code
      }).format(price);
    } catch (e) {
      return code + price;
    }
  }, [price])


  return (
    <View className="flex-row justify-between my-1 px-2">
      <Text>{code}</Text>
      <Text>{priceStr}</Text>
      <PreferredButton code={code} preferred={preferred} />
    </View>
  )
};

export default CurrencyItem;