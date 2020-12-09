class BotView {
    static notInChannelError = function (message) {
        message.reply('Please join a voice channel before using this command.');
    }

}

module.exports = BotView;