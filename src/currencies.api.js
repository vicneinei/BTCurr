import AsyncStorage from '@react-native-async-storage/async-storage';

const CURRENCIES_KEY = 'currencies';

export const addCurrencyToPreferred = async (currency) => {
  const currencies = await getPreferredCurrencies();
  const index = currencies.indexOf(currency);
  if (index === -1) {
    currencies.push(currency);
    await setPreferredCurrencies(currencies);
  }
};

export const removeCurrencyFromPreferred = async (currency) => {
  const currencies = await getPreferredCurrencies();
  const index = currencies.indexOf(currency);
  if (index !== -1) {
    currencies.splice(index, 1);
    await setPreferredCurrencies(currencies);
  }
}

const setPreferredCurrencies = async (currencies) =>
  AsyncStorage.setItem(CURRENCIES_KEY, JSON.stringify(currencies));

export const getPreferredCurrencies = async () => {
  const jsonValue = await AsyncStorage.getItem(CURRENCIES_KEY);
  return jsonValue != null ? JSON.parse(jsonValue) : [];
}