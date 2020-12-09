const Bot = require("./controller/Bot.js");

const Help = require("./controller/commands/Help.js");
const Kick = require("./controller/commands/Kick.js");
const Stop = require("./controller/commands/Stop.js");
const Game = require("./controller/commands/Game.js");
const Join = require("./controller/commands/Join.js");

const Discord = require('discord.js');
let bot = new Discord.Client();
const token = "Nzg0MTg5NDYzOTY1ODU5OTIw.X8lrWQ.psbkP1k8gOzqbdMYMIElTlBnJrk";


bot.on("ready", () => {
    Bot.init(bot);
    bot.user.setActivity('!help', {type: 'WATCHING'}).then()
    console.log("Ready");

});

bot.on("message", (message) => {

    if (message.author.bot) {
        return;
    }
    let msg = message.content.toLowerCase();


    if (msg.startsWith("!stop")) {
        new Stop(message,bot);
    } else if (msg.startsWith("!join")) {
        new Join(message,bot);
    } else if (msg.startsWith("!help")) {
        new Help(message,bot);
    } else if (msg.startsWith("!game")) {
        new Game(message,bot);
    } else if (msg.startsWith("!kick")) {
        new Kick(message,bot);

    }else{
        Bot.readMessage(message, msg, false,bot);
        Bot.readMessage(message, msg, true,bot);
    }
});


bot.on('messageReactionAdd', (reaction, user) => {
    let message = reaction.message, emoji = reaction.emoji;
    if(bot.currentGame !== undefined && message === bot.currentGame.getMessage()){
        bot.currentGame.checkPlayerAnswer(message, bot, reaction,emoji);
    }
});

bot.login(token).then();

module.exports = bot;