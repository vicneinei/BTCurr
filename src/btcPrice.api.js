import { getLocales } from 'expo-localization';
import { useQuery } from '@tanstack/react-query'
import { getPreferredCurrencies } from './currencies.api';

/**
 * @returns {Promise<{code: string, rate_for_amount: number, rate: number}[]>}
 */
const getBTCPrice = async () => {
  const [curr, preferredCurr, locales] = await Promise.all([
    getBTCCurrenciesPrice(),
    getPreferredCurrencies(),
    getLocales()
  ]);

  let localCurr = locales[0]?.currencyCode;

  // first, the preferred currencies, then the device currency, then the rest
  const orderedCurr = preferredCurr.reduce(
    (ac, code) => {
      const tmp = deleteKeyAndReturnVal(curr, code);
      if (tmp) {
        const data = { code, ...tmp, preferred: true };
        if (code === localCurr) {
          localCurr = null;
          ac.unshift(data);
        } else
          ac.push(data);
      }
      return ac;
    }, []) ?? [];

  if (localCurr) {
    const tmp = deleteKeyAndReturnVal(curr, localCurr);
    if (tmp)
      orderedCurr.push({ code: localCurr, ...tmp });
  }

  return orderedCurr
    .concat(
      Object.entries(curr).map(
        ([code, data]) => ({ code, ...data })
      )
    );
};

const deleteKeyAndReturnVal = (obj, key) => {
  const tmp = obj[key];
  delete obj[key];
  return tmp;
};

const getBTCEURPrice = async () => {
  const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
  const data = await response.json();
  return data.bpi.EUR.rate_float;
};

const getBTCCurrenciesPrice = async () => {
  const eurPrice = await getBTCEURPrice();

  const data = await fetch(`https://api.getgeoapi.com/v2/currency/convert?api_key=coincoin&from=EUR&amount=${eurPrice}&format=json`);

  return (await data.json()).rates;
};

export const useBTCPriceQuery = () =>
  useQuery({
    queryKey: ['btc-price'],
    queryFn: getBTCPrice,
    staleTime: 0,
    gcTime: 0
  });