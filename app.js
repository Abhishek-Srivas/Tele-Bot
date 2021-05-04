const { Telegraf } = require("telegraf"); // Creating Telegraph Package Form Telegraph API
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN); // using bot token to launch bot

// a middleware to reply for and msg
// bot.use((ctx) => {
//     ctx.reply("Hi Human!!")
// })

// This will give reply for /start command
bot.start((ctx) => {
  ctx.reply("The Bot has Started");
});

// This will give reply for /help command
bot.help((ctx) => {
  ctx.reply(
    `This Bot Can Perform Following commands
    - /start
    - /help
    - /Tell_Fortune :- to get a fortune message./n
    - /say :- will reply back with the text you write after it. 
    - /About_Dev :- To know more about me.
    For ex:- (/say Hello user) will reply hello user/n
    - It can reply back to your hello.
    - Try sending some sticker.
    `
  );
});

// This will give reply when a sticker is sent
bot.on("sticker", (ctx) => {
  ctx.reply("Cool Sticker!!");
});

// This will give reply when user types hello in the chat.
bot.hears("hello", (ctx) => {
  ctx.reply("Hello Sir, How are You");
});

// Custom Commands
bot.command("say", (ctx) => {
  // /say text will reply the text written by user.
  const msgArray = ctx.message.text.split(" ");
  msgArray.shift();
  const message = msgArray.join(" ");

  ctx.reply(message);
});

bot.command("Tell_Fortune", (ctx) => {
  // /Tell_Fortune Will tell you a fortune
  const url = "http://yerkee.com/api/fortune";

  axios.get(url).then((res) => {
    ctx.reply(res.data.fortune);
  });
});

bot.command("About_Dev", (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id,'Know About ME',{
    reply_markup:{
      inline_keyboard:[
        [{text:"LinkedIn", url:"https://www.linkedin.com/in/abhishek-srivas-8421611a1/"},{text:"Github", url:"https://github.com/AbhishekSrivas114319"}],
      
      ]
    }
  })
});


bot.launch();
