const Game = require("./controller/Game.js");
const UserDAO = require("./model/UserDAO.js");
const Bot = require("./controller/Bot.js");
const BotView = require("./view/BotView.js");

const Discord = require('discord.js');
let bot = new Discord.Client();
const token = "Nzg0MTg5NDYzOTY1ODU5OTIw.X8lrWQ.psbkP1k8gOzqbdMYMIElTlBnJrk";




bot.indexSymbol = '#';
bot.methodeSymbol = '$';
bot.messageTab = [];
bot.audioTab = [];
bot.textMSG = "";
bot.audioMSG = "";
bot.currentVoiceChannel = undefined;
bot.currentGame = undefined;





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
        if (!(bot.currentVoiceChannel === undefined)) {
            bot.currentVoiceChannel.leave();
            bot.currentVoiceChannel = undefined;
        }
    } else if (msg.startsWith("!join")) {
        Bot.joinAudio(message,bot);
    } else if (msg.startsWith("!help")) {
        message.channel.send({
            embed: {
                color: 3447003,
                author: {
                    name: "Lucas",
                    icon_url: "https://media.discordapp.net/attachments/675318777113608199/780429706755178516/cozeau.png"
                },
                title: "Commandes memebot",
                fields: [{
                    name: "Texte",
                    value: "" + bot.textMSG
                },
                    {
                        name: "Audio",
                        value: "" + bot.audioMSG
                    },
                    {
                        name: "Autres",
                        value: "!help : Affiche l'aide \n !join : Fait rejoindre le bot dans ton channel audio \n !stop : Déconnecte le bot de son channel audio  \n !kick nomJoueur : Kick le joueur du channel vocal si bous avez gagné un jeu."
                    }
                ],
                timestamp: new Date(),
                footer: {
                    text: "© par Lucas Gazeau"
                }
            }
        }).then();
    } else if (msg.startsWith("!game")) {
        Game.CreateGame(message, bot);
    } else if (msg.startsWith("!kick")) {
        if (bot.currentVoiceChannel === undefined) {
            return BotView.notInChannelError(message);
        } else if (message.content.indexOf("<@!") > -1) {
            let id = message.content.substring(message.content.indexOf("<@!") + 3, message.content.indexOf("<@!") + 21);
            UserDAO.getNumberKickById(bot.db, id, (err, res) => {
                if (res > 0) {
                    bot.users.fetch(id).then(user => {
                        bot.currentVoiceChannel.members.get(id).voice.kick().then();
                        UserDAO.setNumberKickById(bot.db, id, res - 1, (e, r) => {
                            UserDAO.getNumberKickById(bot.db, id, (err, res) => {
                                message.channel.send(user.username + " , tu peux encore kick " + res + " personnes.");
                            });
                        })
                    })
                } else {
                    message.channel.send("Bas alors " + message.author.username + " !? Faut gagner pour kick des gens ! Loser !")
                }
            })
        }

    }

    Bot.readMessage(message, msg, false,bot);
    Bot.readMessage(message, msg, true,bot);
});


bot.on('messageReactionAdd', (reaction, user) => {
    let message = reaction.message, emoji = reaction.emoji;
    bot.currentGame.checkAnswer(message, bot, reaction,emoji);
});

bot.login(token).then();

module.exports = bot;