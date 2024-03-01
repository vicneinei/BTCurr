import { cryptos } from "../const/cryptos";
import { setPreferredBTCAmount } from "./preferredBTCAmount";
import { queryClient } from "../const/queryClient";

export const convertCurrenciesFromAmount = async (amount, fromCurrency) => {
  const crypto = cryptos.find(c => c.code === fromCurrency);

  let rate = crypto?.rate_float;
  if (!rate) {
    const data = queryClient.getQueryData(["btc-price"]);
    rate = data[fromCurrency]?.rate_float;
  }

  if (typeof rate !== "number")
    throw new Error("Currency not found");

  const ratio = amount / rate;

  setPreferredBTCAmount(ratio);
};