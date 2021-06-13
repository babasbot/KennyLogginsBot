const { Telegraf } = require("telegraf");
const axios = require("axios");
const { camelizeKeys } = require("humps");

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);
const coinGecko = axios.create({ baseURL: "https://api.coingecko.com" });

const donateCommand = (ctx) => {
  message =
    "If you find this bot helpful, please consider donating to 0xcD1CAe9313DEd1BEa9f1F02450dE30601b3A6912. <3";

  ctx.telegram.sendMessage(ctx.message.chat.id, message);
};

const titanCommand = async (ctx) => {
  const response = await coinGecko.get("/api/v3/simple/price", {
    params: {
      ids: "iron-titanium-token",
      vs_currencies: "usd",
    },
  });

  const price = camelizeKeys(response.data).ironTitaniumToken.usd;

  ctx.telegram.sendMessage(ctx.message.chat.id, `1 TITAN = ${price} US$`);
};

bot.command("donate", donateCommand);
bot.command("start", donateCommand);
bot.command("titan", titanCommand);

bot.launch();
