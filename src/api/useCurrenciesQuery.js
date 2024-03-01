import { useMemo } from 'react';
import { useLocales } from "expo-localization";
import { useQueries } from '@tanstack/react-query';
import { btcPriceQueryOpt } from './btcPrice';
import { preferredCurrenciesQueryOpt } from './preferredCurrencies';
import { cryptos } from '../const/cryptos';

const useCurrenciesQuery = () => {
  const locales = useLocales();

  const [{
    data: currenciesPrices,
    refetch,
    isFetching
  }, {
    data: preferredCurr,
  }] = useQueries({
    queries: [
      btcPriceQueryOpt,
      preferredCurrenciesQueryOpt,
    ]
  })
  const data = useMemo(() => {
    if (!currenciesPrices?.bpi) return [];

    const notPreferredCurrencies = { ...currenciesPrices.bpi };

    const localCurrency = locales[0]?.currencyCode;
    const localNotPreferred = [];

    if (localCurrency in notPreferredCurrencies) {
      const idx = preferredCurr ? preferredCurr.indexOf(localCurrency) : -1;
      if (idx !== -1) {
        if (idx !== 0) {
          preferredCurr.splice(idx, 1);
          preferredCurr.unshift(localCurrency);
        }
      } else {
        localNotPreferred.push({ code: localCurrency, ...notPreferredCurrencies[localCurrency] });
        delete notPreferredCurrencies[localCurrency];
      }
    }

    return cryptos.concat(
      preferredCurr?.reduce(
        (ac, code) => {
          if (code in notPreferredCurrencies) {
            ac.push({ code, ...notPreferredCurrencies[code], preferred: true });
            delete notPreferredCurrencies[code];
          }
          return ac;
        }, []
      ) ?? [],
      localNotPreferred,
      Object.entries(notPreferredCurrencies).map(([code, value]) => ({ code, ...value }))
    );
  }, [currenciesPrices?.time, preferredCurr]);

  return {
    data,
    isFetching,
    refetch
  }
};

export default useCurrenciesQuery;