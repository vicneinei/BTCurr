import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { addCurrencyToPreferred, removeCurrencyFromPreferred } from "./currencies.api";

const PreferredButton = ({ code, preferred: preferredProp }) => {
  const [preferred, setPreferred] = useState(preferredProp);

  const onPress = () => {
    // update state to update icon's style immediately, list position keeps the same
    setPreferred(!preferred);
    return preferred
      ? removeCurrencyFromPreferred(code)
      : addCurrencyToPreferred(code);
  }

  const iconName = preferred ? "star" : "staro";
  return (
    <TouchableOpacity onPress={onPress}>
      <AntDesign name={iconName} size={24} color="gold" />
    </TouchableOpacity>
  )
};

export default PreferredButton;