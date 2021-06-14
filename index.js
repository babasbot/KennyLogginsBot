const { Telegraf } = require("telegraf");
const coingecko = require("./src/coinGecko");

const bot = new Telegraf(process.env.TELEGRAM_API_KEY);

const donateCommand = (ctx) => {
  message =
    "If you find this bot helpful, please consider donating to 0xcD1CAe9313DEd1BEa9f1F02450dE30601b3A6912. <3";

  ctx.reply(message);
};

const currentPrice = async (ctx, coinId) => {
  const data = await coingecko.coins(coinId);

  const symbol = data.symbol;
  const price = data.marketData.currentPrice.usd;

  const message = `1 ${symbol.toUpperCase()} = ${price} US$`;

  ctx.reply(message);
};

const coins = [
  {
    id: "iron-titanium-token",
    symbol: "titan",
  },
  {
    id: "ethereum",
    symbol: "eth",
  },
  {
    id: "bitcoin",
    symbol: "btc",
  },
  {
    id: "binance-coin",
    symbol: "bnb",
  },
  {
    id: "diamond-dnd",
    symbol: "dnd",
  },
  {
    id: "steel",
    symbol: "steel",
  },
  {
    id: "waultswap-polygon",
    symbol: "wexpoly",
  },
];

bot.command("start", donateCommand);
bot.command("donate", donateCommand);

coins.forEach((coin) => {
  bot.command(coin.symbol, (ctx) => currentPrice(ctx, coin.id));
});

bot.launch();
