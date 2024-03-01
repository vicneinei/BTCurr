import { TextInput } from "react-native";
import { convertCurrenciesFromAmount } from "./api/convert";
import { useDebounceFn } from "./api/useDebouceFn";

const PriceInput = ({ code, price, style }) => {
  const convertCurrenciesFromText = (text) => {
    const amount = parseFloat(text.replace(/,/g, "."));
    if (!isNaN(amount) && amount > 0)
      convertCurrenciesFromAmount(amount, code);
  }

  const debounceConvertCurrencies = useDebounceFn(convertCurrenciesFromText, 400);

  const onChange = (text) => text ? debounceConvertCurrencies(text) : null;

  return (
    <TextInput
      keyboardType="numeric"
      style={style}
      defaultValue={price}
      onChangeText={onChange}
    />
  )
};

export default PriceInput;