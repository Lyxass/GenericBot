const Game = require("./Game.js");
const UserDAO = require("./model/UserDAO.js");

const Discord = require('discord.js');
let bot = new Discord.Client();
const token = "Nzg0MTg5NDYzOTY1ODU5OTIw.X8lrWQ.psbkP1k8gOzqbdMYMIElTlBnJrk";
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const sqlite3 = require('sqlite3').verbose();



let db = new sqlite3.Database('bdd.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

bot.indexSymbol = '#';
bot.methodeSymbol = '$';
bot.messageTab = [];
bot.audioTab = [];
bot.textMSG = "";
bot.audioMSG;
bot.currentVoiceChannel;
bot.currentGame = undefined;

const fs = require('fs');

fs.readFile('../msg.txt', 'utf8', function (err, data) {
    if (err) throw err;
    bot.messageTab = data.split("\n");
});

fs.readFile('../audio.txt', 'utf8', function (err, data) {
    if (err) throw err;
    bot.audioTab = data.split("\n");
});


function sound(message, path) {
    bot.currentVoiceChannel = message.member.voice.channel;
    if (!bot.currentVoiceChannel) {
        return message.reply('Please join a voice channel before using this command.');
    }
    bot.currentVoiceChannel.join().then(connection => {
        const dispatcher = connection.play("../" + path, {volume: 0.5});
        dispatcher.on("speaking", value => {
            // if (!value) {
            //
            //     voiceChannel.leave();
            // }
        });
    }).catch(err => console.log(err));
}

function joinAudio(message) {
    bot.currentVoiceChannel = message.member.voice.channel;
    if (!bot.currentVoiceChannel) {
        return message.reply('Please join a voice channel before using this command.');
    }
    bot.currentVoiceChannel.join().catch(err => console.log(err));
}


function readMessage(message, msg, isSound) {
    let tab, index, nb;
    if (isSound) {
        tab = bot.audioTab
    } else {
        tab = bot.messageTab
    }
    console.log(tab)
    for (const element of tab) {
        index = element.substring(0, element.indexOf(bot.indexSymbol))
        nb = element.charAt(element.indexOf(bot.methodeSymbol) + bot.methodeSymbol.length)
        index = index.toLowerCase();

        if (nb === "1") {
            if (msg.startsWith(index)) {
                console.log("$1")
                response(isSound, message, element)
                return;
            }

        } else if (nb === "2") {
            if (msg.indexOf(index) >= 0) {
                console.log("$2")
                response(isSound, message, element)
                return;

            }
        } else if (nb === "3") {
            if (msg.endsWith(index)) {
                console.log("$3")
                response(isSound, message, element)
                return;
            }

        } else {
            if (!element === '') {
                console.log("Fichier mal rempli");
                return;
            }
        }
    }
}


function response(isSound, message, element) {
    if (isSound) {
        sound(message, element.substring(element.indexOf(bot.indexSymbol) + bot.indexSymbol.length, element.indexOf(bot.methodeSymbol)))
    } else {
        message.channel.send(element.substring(element.indexOf(bot.indexSymbol) + bot.indexSymbol.length, element.indexOf(bot.methodeSymbol)));
    }
}



function game(message) {
    Game.CreateGame(message,bot);
    // var request = new XMLHttpRequest()
    //
    // request.open('GET', 'https://www.openquizzdb.org/api.php?key=DD4C57PARY&choice=4&categ=sciences');
    //
    // request.responseType = "json";
    //
    // request.send()
    //
    // request.onload = function () {
    //     try {
    //         let responseString = request.responseText;
    //         let res = JSON.parse(responseString);
    //         console.log(res);
    //         console.log(res.results);
    //         console.log(res.results[0].question);
    //         console.log(res.results.question);
    //         shuffle(res.results[0].autres_choix);
    //
    //         bot.currentGame = new Game(res.results[0].question, res.results[0].autres_choix, res.results[0].reponse_correcte, winner);
    //         //message.channel.send("@everyone");
    //         message.channel.send(bot.currentGame.toString())
    //             .then(msg => {
    //                 msg.react('\u0031\u20E3');
    //                 msg.react('\u0032\u20E3');
    //                 msg.react('\u0033\u20E3');
    //                 msg.react('\u0034\u20E3');
    //                 bot.currentGame.setMessage(msg);
    //
    //
    //             });
    //
    //     } catch (e) {
    //         message.channel.send("An error occured with the api");
    //     }
    //
    //
    // }
}


bot.on("ready", () => {
    let tab;
    console.log("Ready");
    tab = bot.messageTab
    bot.textMSG = "";

    for (const element of tab) {
        bot.textMSG += element.substring(0, element.indexOf(bot.indexSymbol)) + "\n"
    }

    tab = bot.audioTab
    bot.audioMSG = "";

    for (const element of tab) {
        bot.audioMSG += element.substring(0, element.indexOf(bot.indexSymbol)) + "\n"
    }
    bot.user.setActivity('!help', {type: 'WATCHING'})

});

bot.on("message", (message) => {

    if (message.author.bot) {
        return;
    }
    let msg = message.content.toLowerCase();


    if (msg.startsWith("!stop")) {
        console.log(bot.currentVoiceChannel);
        if (!(bot.currentVoiceChannel === undefined)) {
            bot.currentVoiceChannel.leave();
            bot.currentVoiceChannel = undefined;
        }
    }
    else if (msg.startsWith("!join")) {
        joinAudio(message);
    }
    else if (msg.startsWith("!help")) {
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
        });
    }
    else if (msg.startsWith("!game")) {
        game(message);
    }
    else if (msg.startsWith("!kick")) {
        if (bot.currentVoiceChannel === undefined) {
            message.channel.send("Je dois être dans le vocal pour faire cette chose horrible !")
        } else if (message.content.indexOf("<@!") > -1) {
            let id = message.content.substring(message.content.indexOf("<@!") + 3, message.content.indexOf("<@!") + 21);
            UserDAO.getNumberKickById(db, id, (err, res) => {
                if (res > 0) {
                    bot.users.fetch(id).then(user => {
                        bot.currentVoiceChannel.members.get(id).voice.kick();
                        UserDAO.setNumberKickById(db, id, res - 1, (e, r) => {
                            UserDAO.getNumberKickById(db, id, (err, res) => {
                                message.channel.send(user.username + " , tu peux encore kick " + res+ " personnes.");
                            });
                        })
                    })
                } else {
                    message.channel.send("Bas alors " + message.author.username + " !? Faut gagner pour kick des gens ! Loser !")
                }
            })
            //bot.currentVoiceChannel.channel.members
        }

    }

    readMessage(message, msg, false)
    readMessage(message, msg, true)
});


bot.on('messageReactionAdd', (reaction, user) => {
    let message = reaction.message, emoji = reaction.emoji;
    bot.currentGame.checkAnswer(message,bot,reaction);
});

bot.login(token);

module.exports = bot;