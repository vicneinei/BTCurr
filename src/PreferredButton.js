import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { addCurrencyToPreferred, removeCurrencyFromPreferred } from "./api/preferredCurrencies";
import { configureNextEaseAnim } from "./api/animation";
import { useDebounceFn } from "./api/useDebouceFn";

const PreferredButton = ({ code, preferred: preferredProp, style }) => {
  const [preferred, setPreferred] = useState(preferredProp);

  const debounceRefresh = useDebounceFn(
    () => queryClient.invalidateQueries({
      queryKey: ["preferred-currencies"]
    })
  );

  const queryClient = useQueryClient();

  const onPress = async () => {
    // update state to update icon's style immediately, list position keeps the same
    configureNextEaseAnim();
    setPreferred(!preferred);
    await (
      !preferred ? addCurrencyToPreferred(code) : removeCurrencyFromPreferred(code)
    );
    debounceRefresh();
  }

  const iconName = preferred ? "star" : "staro";
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <AntDesign name={iconName} size={24} color="gold" />
    </TouchableOpacity>
  )
};

export default PreferredButton;