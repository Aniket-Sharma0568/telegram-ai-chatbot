// index.js file
//STEPS:
//create folder->goto terminal->"npm init", package.json will be installed

// goto telegraf npm on google.
//goto official website, there you will get this command->"npm i telegraf", type on terminal
//since we are using common js moduling , we used require to import telegraf module

const { Telegraf } = require('telegraf');
//dotenv npm-> "npm i dotenv" on terminal->write this command to import
require('dotenv').config();
// goto botfather on telegram->start->/newbot->give name->give username->copy the API
// this API key is unique to me but it is not safe, if it get exposed anybody else can use it. There are mechanisms to hide it.
// MECHANISM- dotenv package. it is a module that loads enviornment variables
// console.log(process.env);

const bot=new Telegraf(process.env.BOT_TOKEN);
// takes callback function
bot.start((ctx) => ctx.reply('Welcome to Yogesh\'s algo bot'));

// Groq AI (FREE)
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/*t.command('quit', async (ctx) => {
  // Explicit usage
  await ctx.telegram.leaveChat(ctx.message.chat.id)

  // Using context shortcut
  await ctx.leaveChat()
})*/ // quit does not work with private chats. it gives error.

//bot.on('text',(cxt)=>cxt.reply('sorry, i dont understand humans'));

bot.on("text", async (ctx) => {
  const userMessage = ctx.message.text;

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "user", content: userMessage }
      ],
    });

    const reply = completion.choices[0].message.content;
    ctx.reply(reply);
  } catch (err) {
    console.error(err);
    ctx.reply("Error: Something went wrong!");
  }
});


bot.launch();