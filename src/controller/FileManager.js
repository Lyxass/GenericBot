const fs = require('fs');

class FileManager{
    static readFiles = function(bot){
        fs.readFile('../msg.txt', 'utf8', function (err, data) {
            if (err) throw err;
            bot.messageTab = data.split("\n");
            for (const element of bot.messageTab) {
                bot.textMSG += element.substring(0, element.indexOf(bot.indexSymbol)) + "\n"
            }
        });

        fs.readFile('../audio.txt', 'utf8', function (err, data) {
            if (err) throw err;
            bot.audioTab = data.split("\n");
            for (const element of bot.audioTab) {
                bot.audioMSG += element.substring(0, element.indexOf(bot.indexSymbol)) + "\n"
            }
        });
    }
}

module.exports = FileManager;