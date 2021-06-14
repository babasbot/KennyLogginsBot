const axios = require("axios");
const { camelizeKeys } = require("humps");

const api = axios.create({ baseURL: "https://api.coingecko.com" });

const coins = async (coinId) => {
  const response = await api.get(`/api/v3/coins/${coinId}`, {
    params: {
      localization: false,
    },
  });

  return camelizeKeys(response.data);
};

module.exports = {
  coins,
};
