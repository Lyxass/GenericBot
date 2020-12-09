const FileManager = require("./FileManager.js");
const BDDConnexion = require("../model/BDDConnexion.js");
const BotView = require("../view/BotView.js");


class Bot {
    static joinAudio = function (message, bot,callback) {
        bot.currentVoiceChannel = message.member.voice.channel;
        if (!bot.currentVoiceChannel) {
            return BotView.notInChannelError(message);
        }
        bot.currentVoiceChannel.join().then(callback()).catch(err => console.log(err));
    }

    static init = function (bot) {

        bot.indexSymbol = '#';
        bot.methodeSymbol = '$';
        bot.messageTab = [];
        bot.audioTab = [];
        bot.textMSG = "";
        bot.audioMSG = "";
        bot.currentVoiceChannel = undefined;
        bot.currentGame = undefined;

        FileManager.readFiles(bot);
        BDDConnexion.initConnexion(bot);
    }

    static readMessage = function (message, msg, isSound, bot) {
        let tab, index, nb;
        if (isSound) {
            tab = bot.audioTab
        } else {
            tab = bot.messageTab
        }
        for (const element of tab) {
            index = element.substring(0, element.indexOf(bot.indexSymbol))
            nb = element.charAt(element.indexOf(bot.methodeSymbol) + bot.methodeSymbol.length)
            index = index.toLowerCase();

            if (nb === "1") {
                if (msg.startsWith(index)) {
                    Bot._response(isSound, message, element, bot)
                    return;
                }

            } else if (nb === "2") {
                if (msg.indexOf(index) >= 0) {
                    Bot._response(isSound, message, element, bot)
                    return;

                }
            } else if (nb === "3") {
                if (msg.endsWith(index)) {
                    Bot._response(isSound, message, element, bot)
                    return;
                }

            } else {
                console.log("Fichier mal rempli");
                return;
            }
        }
    }

    static _response = function (isSound, message, element, bot) {
        if (isSound) {
            Bot._playSound(message, element.substring(element.indexOf(bot.indexSymbol) + bot.indexSymbol.length, element.indexOf(bot.methodeSymbol)),bot)
        } else {
            message.channel.send(element.substring(element.indexOf(bot.indexSymbol) + bot.indexSymbol.length, element.indexOf(bot.methodeSymbol)));
        }
    }

    static _playSound = function(message, path,bot) {
        bot.currentVoiceChannel = message.member.voice.channel;
        if (!bot.currentVoiceChannel) {
            return BotView.notInChannelError(message);
        }
        bot.currentVoiceChannel.join().then(connection => {
            path = "../" + path;
            console.log("Play song " + path)
            const dispatcher = connection.play(path, {volume: 0.5});
            dispatcher.on("speaking", value => {});
        }).catch(err => console.log(err));
    }

}

module.exports = Bot;