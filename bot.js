var Discord = require('discord.js');
var bot = new Discord.Client();
const token = "";
let lastHelloCommandDate;
var isReady = true;
lastUserMessage = {};

indexSymbol = '#'
methodeSymbol = '$'
let messageTab, audioTab

var fs = require('fs');
fs.readFile('msg.txt', 'utf8', function (err, data) {
    if (err) throw err;
    messageTab = data.split("\n");
});

fs.readFile('audio.txt', 'utf8', function (err, data) {
    if (err) throw err;
    audioTab = data.split("\n");
});


function sound(message, path) {
    isReady = false;
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
        return message.reply('Please join a voice channel before using this command.');
    }
    voiceChannel.join().then(connection => {
        const dispatcher = connection.play(path, {volume: 0.5});
        dispatcher.on("speaking", value => {
            if (!value) {
                voiceChannel.leave();
            }
        });
    }).catch(err => console.log(err));
    isReady = true;
}

function readMessage(message, msg, isSound) {
    if(isSound){
        tab = audioTab
    }
    else{
        tab = messageTab
    }
    for (const element of tab) {
        index = element.substring(0, element.indexOf(indexSymbol))
        nb = element.charAt(element.indexOf(methodeSymbol) + methodeSymbol.length)

        if (nb === "1") {
            if (msg.startsWith(index)) {
                response(isSound,message,element)
            }
            return;
        } else if (nb === "2") {
            if (msg.indexOf(index) >= 0) {
                response(isSound,message,element)
            }
            return;
        } else if (nb === "3") {
            if (msg.endsWith(index)) {
                response(isSound,message,element)
            }

            return;
        } else {
            if (!element === '') {
                console.log("Fichier mal rempli");
            }
            return;
        }

    }
}


function response(isSound,message,element) {
    if (isSound) {
        sound(message, element.substring(element.indexOf(indexSymbol) + indexSymbol.length, element.indexOf(methodeSymbol)))
    } else {
        message.channel.send(element.substring(element.indexOf(indexSymbol) + indexSymbol.length, element.indexOf(methodeSymbol)));
    }
}

function httpGet(theUrl) {
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

bot.on("ready", () => {
    console.log("I am ready!");
    console.log(messageTab);
    console.log(audioTab);
    bot.user.setActivity('!commande', {type: 'WATCHING'})
});

bot.on("message", (message) => {
        if (message.author.bot) {
            return;
        }
        msg = message.content.toLowerCase();
        readMessage(message,msg,false)
        readMessage(message,msg,true)
    }
);

bot.login(token)
