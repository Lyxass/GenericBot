const BotView = require("../../view/BotView.js");
const UserDAO = require("../../model/UserDAO.js");
const KickView = require("../../view/commands/KickView.js")


class Kick{
    constructor(message,bot) {
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
                                KickView.kickLeft(message,user,res);
                            });
                        })
                    })
                } else {
                 KickView.noKickLeft(message,bot);
                }
            })
        }
    }
}
module.exports = Kick