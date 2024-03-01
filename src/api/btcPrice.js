/**
 * @returns {Promise<{[key: string]: {rate_for_amount: string, rate_float: number}}>}
 */
const getBTCRates = async () => {
  const { rate, time } = await getBTCUSDRate();

  const response = await fetch(
    process.env.EXPO_PUBLIC_GETGEO_BASE_URL
    + `&amount=${rate}&api_key=${process.env.EXPO_PUBLIC_GETGEO_KEY}`
  );

  if (response.ok) {
    const data = await response.json();
    for (const key in data.rates)
      data.rates[key].rate_float = parseFloat(data.rates[key].rate_for_amount);
    return { bpi: data.rates, time };
  }
  throw new Error('Network response was not ok.');
};

const getBTCUSDRate = async () => {
  const response = await fetch(process.env.EXPO_PUBLIC_COINDESK_URL);
  const data = await response.json();

  return { rate: data.bpi.USD.rate_float, time: data.time.updatedISO };
};


export const btcPriceQueryOpt = {
  queryKey: ['btc-rates'],
  queryFn: getBTCRates,
};