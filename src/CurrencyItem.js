import React, { memo } from "react";
import { StyleSheet, Text, View } from "react-native";
import PreferredButton from "./PreferredButton";
import PriceInput from "./PriceInput";
import { usePreferredBTCAmountQuery } from "./api/preferredBTCAmount";
import { FontAwesome5 } from '@expo/vector-icons';

const precision = 10e12;

const getCurrencySymbol = (currency) => {
  try {
    return (0)
      .toLocaleString('en-US', { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 })
      .replace(/\d/g, '')
      .trim();
  } catch { return currency; }
}

const CurrencySymbol = memo(({ code }) => <Text adjustsFontSizeToFit numberOfLines={1} className="text-center text-xl text-slate-500 font-semibold">{getCurrencySymbol(code)}</Text>);

const CurrencyItem = memo(
  ({ code, rate_float, preferred, crypto, icon }) => {
    const { data: ratio } = usePreferredBTCAmountQuery();
    return (
      <View className="flex-row justify-between items-center my-1 h-10">
        <Text className="flex-auto w-16 text-center font-semibold">{code}</Text>
        <View className="flex-auto w-64 bg-white rounded-lg justify-center">
          <PriceInput
            className="flex-1 p-2"
            price={typeof ratio === 'number' ? (Math.round((rate_float * ratio) * precision) / precision).toString() : ''}
            code={code}
          />
          <View className="absolute px-1 right-0 bg-gray flex-1 w-8 h-full rounded-r-lg justify-center">
            {
              icon ? (
                <FontAwesome5 style={styles.textCenter} name={icon.name} color={icon.color} size={24} />
              ) : <CurrencySymbol code={code} />
            }
          </View>
        </View>
        {
          !crypto ? (
            <PreferredButton code={code} preferred={preferred} className={preferredButtonStyle} />
          ) : <View className={preferredButtonStyle} />
        }
      </View >
    )
  }
);

const preferredButtonStyle = "flex-auto w-16 items-center";

export default CurrencyItem;

const styles = StyleSheet.create({
  textCenter: { textAlign: "center" },
});