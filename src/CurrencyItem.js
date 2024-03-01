import React, { memo } from "react";
import { Text, View } from "react-native";
import PreferredButton from "./PreferredButton";
import PriceInput from "./PriceInput";
import { usePreferredBTCAmountQuery } from "./api/preferredBTCAmount";
import { FontAwesome5 } from '@expo/vector-icons';

const precision = 10e12;

const CurrencyItem = ({ code, rate_float, preferred, crypto, icon }) => {
  const { data: ratio } = usePreferredBTCAmountQuery();
  return (
    <View className="flex-row justify-between items-center my-1">
      <Text className="flex-auto w-16 text-center font-semibold">{code}</Text>
      <View className="flex-auto w-64 bg-white rounded-lg justify-center">
        <PriceInput
          className="flex-1 p-2 text-center"
          price={(Math.round((rate_float * ratio) * precision) / precision).toString()}
          code={code}
        />
        {
          icon && (
            <Text className="absolute right-0 w-6 bg-white text-center">
              <FontAwesome5 name={icon.name} color={icon.color} size={24} />
            </Text>
          )
        }
      </View>
      {!crypto ? (
        <PreferredButton code={code} preferred={preferred} className={preferredButtonStyle} />
      ) : <View className={preferredButtonStyle} />}
    </View>
  )
};

const preferredButtonStyle = "flex-auto w-16 items-center";

export default memo(CurrencyItem);