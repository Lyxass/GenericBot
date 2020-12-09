class Stop{
    constructor(message,bot) {
        if (!(bot.currentVoiceChannel === undefined)) {
            bot.currentVoiceChannel.leave();
            bot.currentVoiceChannel = undefined;
        }
    }

}
module.exports = Stop