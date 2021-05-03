const { Telegraf } = require('telegraf'); // Creating Telegraph Package Form Telegraph API
const dotenv = require("dotenv");
dotenv.config();


const bot = new Telegraf(process.env.BOT_TOKEN); // using bot token to launch bot

bot.use((ctx) => {
    ctx.reply("Hi Human!!")
})
bot.launch();