const Bot = require("../Bot.js")

class Join{
    constructor(message,bot) {
        Bot.joinAudio(message,bot);
    }
}
module.exports = Join