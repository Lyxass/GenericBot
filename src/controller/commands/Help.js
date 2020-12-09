const HelpView = require("../../view/commands/HelpView.js")
class Help{
    constructor(message,bot) {
        HelpView.sendHelp(message,bot);
    }

}
module.exports = Help;