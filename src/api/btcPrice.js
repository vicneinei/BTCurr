
/**
 * @returns {Promise<{[key: string]: {rate_for_amount: string, rate_float: number, rate: string}}>}
 */
const getBTCPrice = async () => {
  try {
    const curr = await getBTCCurrenciesPrice();
    return curr;

    // return Object.entries(curr).map(([code, value]) => {
    //   const rate = value.rate_float.toString();
    //   return {
    //     code,
    //     rate_for_amount: rate,
    //     rate_float: value.rate_float,
    //     rate,
    //   };
    // });
  } catch (e) {
    console.log(e);
  }
};

const getBTCUSDPrice = async () => {
  const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
  const data = await response.json();
  const bpi = {};

  for (const [key, value] of Object.entries(data.bpi)) {
    const rate = value.rate_float.toString();
    bpi[key] = {
      rate_for_amount: rate,
      rate_float: value.rate_float,
      rate
    };
  }

  return { bpi, time: data.time.updatedISO };
};

const getBTCCurrenciesPrice = async () => {
  return getBTCUSDPrice();

  // const response = await fetch(`https://api.getgeoapi.com/v2/currency/convert?api_key=coincoin&from=USD&amount=${amount}&format=json`);

  // if (response.ok) {
  //   return (await data.json()).rates;
  // }
  // console.log('error:', response.status);
  // return {};
};


export const btcPriceQueryOpt = {
  queryKey: ['btc-price'],
  queryFn: getBTCPrice,
};